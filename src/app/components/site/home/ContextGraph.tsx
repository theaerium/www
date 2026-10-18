"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import {
  AGENTS,
  ARTBOARD,
  CURATED_PATHS,
  ENTITIES,
  RECORDS,
  SOURCES,
  SOURCE_FEEDS,
  type GraphNode,
} from "./contextGraphData";

const BURGUNDY = 0x6b0f1a;
const INK = 0x111111;
const CAMERA_DISTANCE = 18;
const BASE_PITCH = 0.3;
const PATH_SAMPLES = 160;
const REVEAL_MS = 900;
const MOBILE_BREAKPOINT = 900;
// Artboard x of the graph's right-hand edge; spreading pivots around it.
const RIGHT_EDGE_X = 1400;
// Below this artboard y the layers fan out under the copy; fully fanned at FAN_END_Y.
const FAN_START_Y = 470;
const FAN_END_Y = 980;

const LABELLED_NODES: GraphNode[] = [...AGENTS, ...ENTITIES, ...RECORDS, ...SOURCES];
const NODE_BY_ID = new Map(LABELLED_NODES.map((n) => [n.id, n]));

function seededRandom(seed: number) {
  let t = seed;
  return () => {
    t |= 0;
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(t: number) {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** How far the graph stretches horizontally: `spread` everywhere, multiplied by up to `fan` at the bottom. */
type Spread = { spread: number; fan: number };

function artboardToWorld(x: number, y: number, z: number, { spread, fan }: Spread) {
  const right = (RIGHT_EDGE_X - ARTBOARD.graphCenterX) / 100;
  const stretch = spread * (1 + (fan - 1) * smoothstep((y - FAN_START_Y) / (FAN_END_Y - FAN_START_Y)));
  const x0 = (x - ARTBOARD.graphCenterX) / 100;
  return [right - (right - x0) * stretch, -(y - ARTBOARD.graphCenterY) / 100, z] as const;
}

function squareTexture(hollow: boolean) {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#ffffff";
  if (hollow) {
    ctx.lineWidth = 9;
    ctx.strokeRect(8, 8, size - 16, size - 16);
  } else {
    ctx.fillRect(4, 4, size - 8, size - 8);
  }
  return new THREE.CanvasTexture(canvas);
}

function circleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}

type Layout = {
  width: number;
  height: number;
  unitPx: number;
  centerX: number;
  offsetY: number;
  mobile: boolean;
  spread: Spread;
};

function computeLayout(width: number, height: number, copy: { left: number; right: number } | null): Layout {
  if (width < MOBILE_BREAKPOINT || !copy) {
    // Leaves room on the right for the longest labels and below for the callout.
    const unitPx = Math.min(width / 10.6, height / 13.4);
    return { width, height, unitPx, centerX: width / 2 - unitPx * 0.55, offsetY: -0.9 * unitPx, mobile: true, spread: { spread: 1, fan: 1 } };
  }
  const unitPx = Math.min(100, width / 14.4, height / 11.2);
  const centerX = width - 4.4 * unitPx;
  const right = (RIGHT_EDGE_X - ARTBOARD.graphCenterX) / 100;
  const leftmost = (600 - ARTBOARD.graphCenterX) / 100;
  // Widen the upper layers into the gap beside the copy, then fan the lower
  // layers out underneath it so the bottom row reaches the copy's left edge.
  const topLeftLimit = (copy.right - centerX) / unitPx + 0.6;
  const spread = Math.min(1.45, Math.max(1, (right - topLeftLimit) / (right - leftmost)));
  const leftLimit = (copy.left - centerX) / unitPx;
  const fan = Math.max(1, (right - leftLimit) / ((right - leftmost) * spread));
  // Nudged down so the agents clear the fixed nav when the section is pinned to the top.
  return { width, height, unitPx, centerX, offsetY: 0.45 * unitPx, mobile: false, spread: { spread, fan } };
}

/** Index of the curated path a node belongs to, preferring the path already shown. */
function pathForNode(nodeId: string, currentPath: number) {
  if (CURATED_PATHS[currentPath]?.nodes.includes(nodeId)) return currentPath;
  return CURATED_PATHS.findIndex((p) => p.nodes.includes(nodeId));
}

export default function ContextGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef(new Map<string, HTMLDivElement>());
  const calloutRef = useRef<HTMLDivElement>(null);
  const [activePath, setActivePath] = useState(0);
  const activePathRef = useRef(0);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      setWebglFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.prepend(renderer.domElement);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    const random = seededRandom(7);
    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(item: T) => {
      disposables.push(item);
      return item;
    };
    const filledSquare = track(squareTexture(false));
    const hollowSquare = track(squareTexture(true));
    const dot = track(circleTexture());

    // ── Every point in the scene lives in one position buffer. Fixed nodes come
    // first (agents, records, sources, scattered noise), then cluster points,
    // which turn slowly around their cluster's centre each frame.
    type Anchor = { x: number; y: number; z: number };
    const fixedAnchors: Anchor[] = [];
    const indexById = new Map<string, number>();
    const addFixed = (anchor: Anchor, id?: string) => {
      if (id) indexById.set(id, fixedAnchors.length);
      fixedAnchors.push(anchor);
      return fixedAnchors.length - 1;
    };
    const ranges: Record<string, [number, number]> = {};
    for (const [group, nodes] of [
      ["agents", AGENTS],
      ["records", RECORDS],
      ["sources", SOURCES],
    ] as const) {
      const start = fixedAnchors.length;
      for (const node of nodes) addFixed({ x: node.x, y: node.y, z: node.z ?? 0 }, node.id);
      ranges[group] = [start, fixedAnchors.length];
    }
    const noiseStart = fixedAnchors.length;
    for (let i = 0; i < 80; i++) addFixed({ x: 590 + random() * 800, y: 470 + random() * 500, z: (random() - 0.5) * 2.4 });
    ranges.noise = [noiseStart, fixedAnchors.length];

    type Cluster = { id: string; anchor: Anchor; halfWidth: number; halfDepth: number; start: number; end: number; phase: number };
    const clusters: Cluster[] = [];
    const clusterLocals: number[] = [];
    const grays: number[] = [];
    let pointCount = fixedAnchors.length;
    for (const entity of ENTITIES) {
      const cluster: Cluster = {
        id: entity.id,
        anchor: { x: entity.x, y: entity.y, z: entity.z ?? 0 },
        halfWidth: entity.width / 200,
        // Flat in the xz-plane; the camera's pitch turns the square footprint into the mock's wide diamond.
        halfDepth: entity.height / 200 / Math.sin(BASE_PITCH),
        start: pointCount,
        end: pointCount + entity.density,
        phase: random() * Math.PI * 2,
      };
      for (let i = 0; i < entity.density; i++) {
        const a = random() * 2 - 1;
        const b = random() * 2 - 1;
        clusterLocals.push((a + b) / 2, (random() - 0.5) * 0.06, (a - b) / 2);
        grays.push(0.08 + random() * 0.5);
      }
      pointCount += entity.density;
      clusters.push(cluster);
    }
    const clusterById = new Map(clusters.map((c) => [c.id, c]));
    const clusterCenter = new Map<string, THREE.Vector3>();

    const positions = new Float32Array(pointCount * 3);
    const fixedWorld = new Float32Array(fixedAnchors.length * 3);

    const applySpread = (spread: Spread) => {
      fixedAnchors.forEach((a, i) => fixedWorld.set(artboardToWorld(a.x, a.y, a.z, spread), i * 3));
      for (const cluster of clusters) {
        const [x, y, z] = artboardToWorld(cluster.anchor.x, cluster.anchor.y, cluster.anchor.z, spread);
        clusterCenter.set(cluster.id, new THREE.Vector3(x, y, z));
      }
      positions.set(fixedWorld, 0);
    };

    const updateClusters = (t: number, spread: Spread) => {
      for (const cluster of clusters) {
        const center = clusterCenter.get(cluster.id)!;
        const angle = reducedMotion ? 0 : Math.sin(t * 0.16 + cluster.phase) * 0.45;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const halfWidth = cluster.halfWidth * spread.spread;
        for (let p = cluster.start; p < cluster.end; p++) {
          const l = (p - fixedAnchors.length) * 3;
          const lx = clusterLocals[l] * halfWidth;
          const lz = clusterLocals[l + 2] * cluster.halfDepth;
          positions[p * 3] = center.x + lx * cos - lz * sin;
          positions[p * 3 + 1] = center.y + clusterLocals[l + 1];
          positions[p * 3 + 2] = center.z + lx * sin + lz * cos;
        }
      }
    };

    const pointsFor = (start: number, end: number, material: THREE.PointsMaterial) => {
      const geometry = track(new THREE.BufferGeometry());
      geometry.setAttribute("position", new THREE.BufferAttribute(positions.subarray(start * 3, end * 3), 3));
      const points = new THREE.Points(geometry, track(material));
      points.frustumCulled = false;
      scene.add(points);
      return geometry;
    };
    const markerMaterial = (color: THREE.ColorRepresentation, size: number, map: THREE.Texture, opacity = 1) =>
      new THREE.PointsMaterial({ color, size, map, transparent: true, opacity, alphaTest: 0.05, sizeAttenuation: false, depthWrite: false });

    const firstCluster = fixedAnchors.length;
    const clusterGeometry = pointsFor(
      firstCluster,
      pointCount,
      new THREE.PointsMaterial({ size: 3, vertexColors: true, map: filledSquare, transparent: true, alphaTest: 0.05, sizeAttenuation: false }),
    );
    clusterGeometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(grays.flatMap((g) => [g, g, g])), 3));
    const pointGeometries = [
      clusterGeometry,
      pointsFor(...ranges.noise, markerMaterial(0x8a8486, 3.2, filledSquare, 0.85)),
      pointsFor(...ranges.agents, markerMaterial(0x1c1c1c, 9, filledSquare)),
      pointsFor(...ranges.records, markerMaterial(0x2b2b2b, 7, filledSquare)),
      pointsFor(...ranges.sources, markerMaterial(0x555052, 10, hollowSquare)),
    ];

    // ── Ambient wiring, as index pairs into the shared position buffer
    const clusterPointIndex = () => firstCluster + Math.floor(random() * (pointCount - firstCluster));
    const edges: number[] = [];
    const connect = (a: number, b: number) => edges.push(a, b);
    for (const [source, feeds] of Object.entries(SOURCE_FEEDS)) {
      for (const record of feeds) connect(indexById.get(source)!, indexById.get(record)!);
      for (let i = 0; i < 3; i++) connect(indexById.get(source)!, clusterPointIndex());
    }
    for (const record of RECORDS) for (let i = 0; i < 7; i++) connect(indexById.get(record.id)!, clusterPointIndex());
    for (const agent of AGENTS) for (let i = 0; i < 26; i++) connect(indexById.get(agent.id)!, clusterPointIndex());
    for (let n = ranges.noise[0]; n < ranges.noise[1]; n++) {
      connect(n, clusterPointIndex());
      if (random() > 0.5) connect(n, ranges.records[0] + Math.floor(random() * RECORDS.length));
    }
    const wiringPositions = new Float32Array(edges.length * 3);
    const wiringGeometry = track(new THREE.BufferGeometry());
    wiringGeometry.setAttribute("position", new THREE.BufferAttribute(wiringPositions, 3));
    const wiring = new THREE.LineSegments(
      wiringGeometry,
      track(new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.065, depthWrite: false })),
    );
    wiring.frustumCulled = false;
    scene.add(wiring);

    // ── Curated paths: each passes through one specific point in every cluster it crosses
    const pathStops = CURATED_PATHS.map((path, pathIndex) =>
      path.nodes.map((id) => {
        const cluster = clusterById.get(id);
        if (!cluster) return indexById.get(id)!;
        const nearCentre: number[] = [];
        for (let p = cluster.start; p < cluster.end; p++) {
          const l = (p - firstCluster) * 3;
          if (Math.abs(clusterLocals[l]) + Math.abs(clusterLocals[l + 2]) < 0.35) nearCentre.push(p);
        }
        return nearCentre.length ? nearCentre[(pathIndex * 17 + 5) % nearCentre.length] : cluster.start;
      }),
    );

    const highlightMaterial = track(new LineMaterial({ color: BURGUNDY, linewidth: 2, transparent: true, depthTest: false }));
    const highlightGeometry = track(new LineGeometry());
    highlightGeometry.setPositions(new Array((PATH_SAMPLES + 1) * 3).fill(0));
    const highlight = new Line2(highlightGeometry, highlightMaterial);
    highlight.renderOrder = 2;
    highlight.frustumCulled = false;
    scene.add(highlight);
    const highlightSegments = highlightGeometry.getAttribute("instanceStart") as THREE.InterleavedBufferAttribute;

    const highlightMarkerPositions = new Float32Array(6 * 3);
    const highlightMarkerGeometry = track(new THREE.BufferGeometry());
    highlightMarkerGeometry.setAttribute("position", new THREE.BufferAttribute(highlightMarkerPositions, 3));
    const highlightMarkerMaterial = track(
      new THREE.PointsMaterial({ color: BURGUNDY, size: 8, map: dot, transparent: true, alphaTest: 0.05, sizeAttenuation: false, depthTest: false }),
    );
    const highlightMarkers = new THREE.Points(highlightMarkerGeometry, highlightMarkerMaterial);
    highlightMarkers.renderOrder = 3;
    highlightMarkers.frustumCulled = false;
    scene.add(highlightMarkers);

    let stopFractions: number[] = [0];
    let revealStart = 0;
    let shownPath = -1;
    const stopPoint = (index: number) => new THREE.Vector3().fromArray(positions, index * 3);

    // Rebuilds the burgundy polyline along the shown path; runs every frame because its cluster points move.
    const updateHighlight = () => {
      const stops = pathStops[shownPath].map(stopPoint);
      const lengths = stops.slice(1).map((p, i) => p.distanceTo(stops[i]));
      const total = lengths.reduce((a, b) => a + b, 0) || 1;
      stopFractions = [0];
      let travelled = 0;
      for (const length of lengths) {
        travelled += length;
        stopFractions.push(travelled / total);
      }
      const segments = highlightSegments.data.array as Float32Array;
      const sample = new THREE.Vector3();
      let previous = stops[0].clone();
      let leg = 0;
      for (let s = 1; s <= PATH_SAMPLES; s++) {
        const f = s / PATH_SAMPLES;
        while (leg < stops.length - 2 && f > stopFractions[leg + 1]) leg++;
        const span = stopFractions[leg + 1] - stopFractions[leg] || 1;
        sample.copy(stops[leg]).lerp(stops[leg + 1], (f - stopFractions[leg]) / span);
        segments.set([previous.x, previous.y, previous.z, sample.x, sample.y, sample.z], (s - 1) * 6);
        previous.copy(sample);
      }
      highlightSegments.data.needsUpdate = true;
      stops.forEach((p, i) => highlightMarkerPositions.set([p.x, p.y, p.z], i * 3));
      highlightMarkerGeometry.attributes.position.needsUpdate = true;
      return stops;
    };

    // ── Layout + camera
    const copyBounds = () => {
      const copy = container.parentElement?.querySelectorAll(".b-graph-copy > h2, .b-graph-copy > .b-lede");
      if (!copy?.length) return null;
      const box = container.getBoundingClientRect();
      const rects = [...copy].map((el) => el.getBoundingClientRect());
      return { left: Math.min(...rects.map((r) => r.left)) - box.left, right: Math.max(...rects.map((r) => r.right)) - box.left };
    };
    let layout = computeLayout(container.clientWidth, container.clientHeight, copyBounds());
    const applyLayout = () => {
      layout = computeLayout(container.clientWidth, container.clientHeight, copyBounds());
      const { width, height, unitPx, centerX, offsetY } = layout;
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = `${width}px`;
      renderer.domElement.style.height = `${height}px`;
      const fullWidth = 2 * Math.max(centerX, width - centerX);
      const fullHeight = height + 2 * offsetY;
      camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(fullHeight / unitPx / 2 / CAMERA_DISTANCE));
      camera.aspect = fullWidth / fullHeight;
      camera.setViewOffset(fullWidth, fullHeight, fullWidth / 2 - centerX, 0, width, height);
      camera.updateProjectionMatrix();
      highlightMaterial.resolution.set(width, height);
      container.dataset.mobile = String(layout.mobile);
      applySpread(layout.spread);
    };
    applyLayout();
    const resizeObserver = new ResizeObserver(applyLayout);
    resizeObserver.observe(container);

    // ── Pointer: nearest curated node (or its label) under the cursor picks the path
    const screen = new Map<string, { x: number; y: number }>();
    const pointer = { x: 0, y: 0, inside: false, nx: 0, ny: 0 };
    const curatedIds = [...new Set(CURATED_PATHS.flatMap((p) => p.nodes))];
    let hoveredId: string | null = null;
    const hoverTarget = () => {
      let best: string | null = null;
      let bestDistance = Infinity;
      for (const id of curatedIds) {
        const pos = screen.get(id);
        const label = labelRefs.current.get(id);
        if (!pos) continue;
        const node = NODE_BY_ID.get(id)!;
        const radius = node.kind === "entity" ? 70 : 22;
        let distance = Math.hypot(pointer.x - pos.x, pointer.y - pos.y);
        if (label && node.kind !== "entity") {
          const labelLeft = pos.x + 10;
          if (pointer.x >= labelLeft && pointer.x <= labelLeft + label.offsetWidth && Math.abs(pointer.y - pos.y) < 12) distance = 0;
        }
        if (distance < radius && distance < bestDistance) {
          best = id;
          bestDistance = distance;
        }
      }
      return best;
    };

    const selectPath = (pathIndex: number) => {
      if (pathIndex < 0 || pathIndex === activePathRef.current) return;
      activePathRef.current = pathIndex;
      setActivePath(pathIndex);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.nx = (pointer.x / rect.width) * 2 - 1;
      pointer.ny = (pointer.y / rect.height) * 2 - 1;
      pointer.inside = true;
      hoveredId = hoverTarget();
      container.style.cursor = hoveredId ? "pointer" : "";
      if (hoveredId) selectPath(pathForNode(hoveredId, activePathRef.current));
    };
    const onPointerLeave = () => {
      pointer.inside = false;
      hoveredId = null;
      container.style.cursor = "";
      selectPath(0);
    };
    // Track the pointer across the whole section so the graph leans toward it even over the copy.
    const section = container.parentElement ?? container;
    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerdown", onPointerMove);
    section.addEventListener("pointerleave", onPointerLeave);

    // ── Render loop, paused while off screen
    let frame = 0;
    let visible = false;
    let yaw = 0;
    let pitch = BASE_PITCH;
    const projected = new THREE.Vector3();
    const startTime = performance.now();
    const project = (x: number, y: number, z: number) => {
      projected.set(x, y, z).project(camera);
      return { x: ((projected.x + 1) / 2) * layout.width, y: ((1 - projected.y) / 2) * layout.height };
    };

    const render = (now: number) => {
      frame = visible ? requestAnimationFrame(render) : 0;
      const t = (now - startTime) / 1000;

      if (shownPath !== activePathRef.current) {
        shownPath = activePathRef.current;
        revealStart = reducedMotion ? now - REVEAL_MS : now;
      }

      updateClusters(t, layout.spread);
      for (let e = 0; e < edges.length; e++) wiringPositions.set(positions.subarray(edges[e] * 3, edges[e] * 3 + 3), e * 3);
      wiringGeometry.attributes.position.needsUpdate = true;
      for (const geometry of pointGeometries) geometry.attributes.position.needsUpdate = true;
      const stops = updateHighlight();

      // The camera leans toward the pointer, with a slow idle sway when it is away.
      const idle = reducedMotion ? 0 : Math.sin(t * 0.12) * (pointer.inside ? 0.04 : 0.16);
      const targetYaw = idle + (pointer.inside && !reducedMotion ? pointer.nx * 0.3 : 0);
      const targetPitch = BASE_PITCH + (pointer.inside && !reducedMotion ? pointer.ny * 0.09 : 0);
      yaw += (targetYaw - yaw) * 0.06;
      pitch += (targetPitch - pitch) * 0.06;
      camera.position.set(
        Math.sin(yaw) * Math.cos(pitch) * CAMERA_DISTANCE,
        Math.sin(pitch) * CAMERA_DISTANCE,
        Math.cos(yaw) * Math.cos(pitch) * CAMERA_DISTANCE,
      );
      camera.lookAt(0, 0, 0);
      camera.updateMatrixWorld();

      const progress = easeOutCubic(Math.min(1, (now - revealStart) / REVEAL_MS));
      highlightGeometry.instanceCount = Math.round(progress * PATH_SAMPLES);
      highlightMarkerGeometry.setDrawRange(0, stopFractions.filter((f) => f <= progress + 0.001).length);
      highlightMarkerMaterial.size = 8 + (reducedMotion ? 0 : Math.sin(t * 3.2) * 1.6);

      const activeNodes = CURATED_PATHS[shownPath].nodes;
      for (const node of LABELLED_NODES) {
        const el = labelRefs.current.get(node.id);
        if (!el) continue;
        const cluster = clusterById.get(node.id);
        let pos: { x: number; y: number };
        let labelPos: { x: number; y: number };
        if (cluster) {
          const c = clusterCenter.get(cluster.id)!;
          pos = project(c.x, c.y, c.z);
          labelPos = project(c.x, c.y + 0.05, c.z - cluster.halfDepth);
        } else {
          const i = indexById.get(node.id)! * 3;
          pos = project(positions[i], positions[i + 1], positions[i + 2]);
          labelPos = pos;
        }
        screen.set(node.id, pos);
        el.style.transform = `translate3d(${labelPos.x.toFixed(1)}px, ${labelPos.y.toFixed(1)}px, 0)`;
        const stopIndex = activeNodes.indexOf(node.id);
        el.classList.toggle("is-active", stopIndex >= 0 && progress + 0.001 >= stopFractions[stopIndex]);
        el.classList.toggle("is-hovered", node.id === hoveredId);
      }

      // Callout sits beside the leg from the record up into the first cluster
      const callout = calloutRef.current;
      if (callout) {
        const opacity = String(Math.min(1, Math.max(0, (progress - 0.35) / 0.4)));
        if (layout.mobile) {
          callout.style.transform = `translate3d(16px, ${(layout.height - callout.offsetHeight - 12).toFixed(1)}px, 0)`;
        } else {
          const anchor = stops[1].clone().lerp(stops[2], 0.45);
          const mid = project(anchor.x, anchor.y, anchor.z);
          const placeRight = mid.x - callout.offsetWidth - 28 < layout.width * 0.42;
          const x = placeRight ? mid.x + 28 : mid.x - callout.offsetWidth - 28;
          const clampedX = Math.min(Math.max(x, 8), layout.width - callout.offsetWidth - 8);
          callout.style.transform = `translate3d(${clampedX.toFixed(1)}px, ${(mid.y - callout.offsetHeight / 2).toFixed(1)}px, 0)`;
        }
        callout.style.opacity = opacity;
      }

      renderer.render(scene, camera);
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(render);
    });
    intersectionObserver.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      visible = false;
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerdown", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const path = CURATED_PATHS[activePath];

  return (
    <div ref={containerRef} className={`b-graph-canvas ${webglFailed ? "is-static" : ""}`}>
      {!webglFailed &&
        LABELLED_NODES.map((node) => (
          <div
            key={node.id}
            ref={(el) => {
              if (el) labelRefs.current.set(node.id, el);
              else labelRefs.current.delete(node.id);
            }}
            className={`b-graph-label b-graph-label-${node.kind}`}
            aria-hidden="true"
          >
            <span>{node.label}</span>
          </div>
        ))}
      {!webglFailed && (
        <div ref={calloutRef} className="b-graph-callout" aria-live="polite">
          <strong>{path.title}</strong>
          <span>{path.body}</span>
        </div>
      )}
    </div>
  );
}
