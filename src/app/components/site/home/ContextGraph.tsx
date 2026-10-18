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
  type EntityCluster,
  type GraphNode,
} from "./contextGraphData";

const BURGUNDY = 0x6b0f1a;
const INK = 0x111111;
const CAMERA_DISTANCE = 18;
const BASE_PITCH = 0.3;
const PATH_SAMPLES = 160;
const REVEAL_MS = 900;
const MOBILE_BREAKPOINT = 900;

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

function artboardToWorld(node: { x: number; y: number; z?: number }) {
  return new THREE.Vector3(
    (node.x - ARTBOARD.graphCenterX) / 100,
    -(node.y - ARTBOARD.graphCenterY) / 100,
    node.z ?? 0,
  );
}

// A cluster lies flat in the xz-plane; seen from the camera's pitch its
// square footprint reads as the wide diamond in the mock.
function clusterHalfDepth(cluster: EntityCluster) {
  return cluster.height / 200 / Math.sin(BASE_PITCH);
}

function buildCluster(cluster: EntityCluster, random: () => number) {
  const center = artboardToWorld(cluster);
  const halfWidth = cluster.width / 200;
  const halfDepth = clusterHalfDepth(cluster);
  const points: THREE.Vector3[] = [];
  const grays: number[] = [];
  for (let i = 0; i < cluster.density; i++) {
    const a = random() * 2 - 1;
    const b = random() * 2 - 1;
    const u = (a + b) / 2;
    const v = (a - b) / 2;
    points.push(new THREE.Vector3(center.x + u * halfWidth, center.y + (random() - 0.5) * 0.06, center.z + v * halfDepth));
    grays.push(0.08 + random() * 0.5);
  }
  return { center, points, grays, halfDepth };
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
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
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

function markerPoints(positions: THREE.Vector3[], color: THREE.ColorRepresentation, size: number, map: THREE.Texture, opacity = 1) {
  const geometry = new THREE.BufferGeometry().setFromPoints(positions);
  const material = new THREE.PointsMaterial({
    color,
    size,
    map,
    transparent: true,
    opacity,
    alphaTest: 0.05,
    sizeAttenuation: false,
    depthWrite: false,
  });
  return new THREE.Points(geometry, material);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

type Layout = { width: number; height: number; unitPx: number; centerX: number; offsetY: number; mobile: boolean };

function computeLayout(width: number, height: number): Layout {
  const mobile = width < MOBILE_BREAKPOINT;
  if (mobile) {
    // Leaves room on the right for the longest labels and below for the callout.
    const unitPx = Math.min(width / 10.6, height / 13.4);
    return { width, height, unitPx, centerX: width / 2 - unitPx * 0.55, offsetY: -0.9 * unitPx, mobile };
  }
  const unitPx = Math.min(100, width / 14.4, height / 11.2);
  // Nudged down so the agents clear the fixed nav when the section is pinned to the top.
  return { width, height, unitPx, centerX: width - 4.4 * unitPx, offsetY: 0.45 * unitPx, mobile };
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

    // Nodes
    const worldById = new Map<string, THREE.Vector3>();
    for (const node of [...AGENTS, ...RECORDS, ...SOURCES]) worldById.set(node.id, artboardToWorld(node));

    const clusters = new Map(ENTITIES.map((entity) => [entity.id, buildCluster(entity, random)]));
    const clusterPoints = [...clusters.values()].flatMap((c) => c.points);
    for (const [id, cluster] of clusters) worldById.set(id, cluster.center);

    const clusterGeometry = track(new THREE.BufferGeometry().setFromPoints(clusterPoints));
    const grays = [...clusters.values()].flatMap((c) => c.grays);
    const clusterColors = new Float32Array(grays.flatMap((gray) => [gray, gray, gray]));
    clusterGeometry.setAttribute("color", new THREE.BufferAttribute(clusterColors, 3));
    const clusterMaterial = track(
      new THREE.PointsMaterial({ size: 3, vertexColors: true, map: filledSquare, transparent: true, alphaTest: 0.05, sizeAttenuation: false }),
    );
    scene.add(new THREE.Points(clusterGeometry, clusterMaterial));

    const noisePoints: THREE.Vector3[] = [];
    for (let i = 0; i < 70; i++) {
      noisePoints.push(
        artboardToWorld({ x: 590 + random() * 780, y: 470 + random() * 420, z: (random() - 0.5) * 2.4 }),
      );
    }
    const noise = markerPoints(noisePoints, 0x8a8486, 3.2, filledSquare, 0.85);
    const agents = markerPoints(AGENTS.map((n) => worldById.get(n.id)!), 0x1c1c1c, 9, filledSquare);
    const records = markerPoints(RECORDS.map((n) => worldById.get(n.id)!), 0x2b2b2b, 7, filledSquare);
    const sources = markerPoints(SOURCES.map((n) => worldById.get(n.id)!), 0x555052, 10, hollowSquare);
    for (const points of [noise, agents, records, sources]) {
      scene.add(points);
      track(points.geometry);
      track(points.material as THREE.Material);
    }

    // Ambient wiring
    const pick = <T,>(list: T[]) => list[Math.floor(random() * list.length)];
    const segments: number[] = [];
    const connect = (a: THREE.Vector3, b: THREE.Vector3) => segments.push(a.x, a.y, a.z, b.x, b.y, b.z);
    for (const [source, feeds] of Object.entries(SOURCE_FEEDS)) {
      for (const record of feeds) connect(worldById.get(source)!, worldById.get(record)!);
      for (let i = 0; i < 3; i++) connect(worldById.get(source)!, pick(clusterPoints));
    }
    for (const record of RECORDS) for (let i = 0; i < 7; i++) connect(worldById.get(record.id)!, pick(clusterPoints));
    for (const agent of AGENTS) for (let i = 0; i < 26; i++) connect(worldById.get(agent.id)!, pick(clusterPoints));
    for (const point of noisePoints) {
      connect(point, pick(clusterPoints));
      if (random() > 0.5) connect(point, worldById.get(pick(RECORDS).id)!);
    }
    const wiringGeometry = track(new THREE.BufferGeometry());
    wiringGeometry.setAttribute("position", new THREE.Float32BufferAttribute(segments, 3));
    const wiringMaterial = track(new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.065, depthWrite: false }));
    scene.add(new THREE.LineSegments(wiringGeometry, wiringMaterial));

    // Curated paths: each passes through one specific point in every cluster it crosses
    const pathStops = CURATED_PATHS.map((path, pathIndex) =>
      path.nodes.map((id) => {
        const cluster = clusters.get(id);
        if (!cluster) return worldById.get(id)!;
        const nearCentre = cluster.points.filter((p) => p.distanceTo(cluster.center) < 0.45 * cluster.halfDepth);
        return (nearCentre.length ? nearCentre : cluster.points)[(pathIndex * 17 + 5) % (nearCentre.length || cluster.points.length)];
      }),
    );

    const highlightMaterial = track(
      new LineMaterial({ color: BURGUNDY, linewidth: 2, transparent: true, depthTest: false }),
    );
    const highlightGeometry = track(new LineGeometry());
    const highlight = new Line2(highlightGeometry, highlightMaterial);
    highlight.renderOrder = 2;
    scene.add(highlight);

    const highlightMarkerGeometry = track(new THREE.BufferGeometry());
    const highlightMarkers = new THREE.Points(
      highlightMarkerGeometry,
      track(new THREE.PointsMaterial({ color: BURGUNDY, size: 8, map: dot, transparent: true, alphaTest: 0.05, sizeAttenuation: false, depthTest: false })),
    );
    highlightMarkers.renderOrder = 3;
    scene.add(highlightMarkers);

    let stopFractions: number[] = [];
    let revealStart = 0;
    let shownPath = -1;

    const showPath = (pathIndex: number, now: number) => {
      const stops = pathStops[pathIndex];
      const lengths = stops.slice(1).map((p, i) => p.distanceTo(stops[i]));
      const total = lengths.reduce((a, b) => a + b, 0);
      stopFractions = [0];
      lengths.reduce((acc, len) => {
        stopFractions.push((acc + len) / total);
        return acc + len;
      }, 0);

      const samples: number[] = [];
      for (let s = 0; s <= PATH_SAMPLES; s++) {
        const f = s / PATH_SAMPLES;
        const leg = Math.max(0, stopFractions.findIndex((sf) => sf >= f) - 1);
        const span = stopFractions[leg + 1] - stopFractions[leg] || 1;
        const p = stops[leg].clone().lerp(stops[leg + 1], (f - stopFractions[leg]) / span);
        samples.push(p.x, p.y, p.z);
      }
      highlightGeometry.setPositions(samples);
      highlightMarkerGeometry.setFromPoints(stops);
      highlightMarkerGeometry.setDrawRange(0, 0);
      highlightGeometry.instanceCount = 0;
      revealStart = reducedMotion ? now - REVEAL_MS : now;
      shownPath = pathIndex;
    };

    // Layout + camera
    let layout = computeLayout(container.clientWidth, container.clientHeight);
    const applyLayout = () => {
      layout = computeLayout(container.clientWidth, container.clientHeight);
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
    };
    applyLayout();
    const resizeObserver = new ResizeObserver(applyLayout);
    resizeObserver.observe(container);

    // Pointer: nearest curated node (or its label) under the cursor picks the path
    const screen = new Map<string, { x: number; y: number }>();
    const pointer = { x: 0, y: 0, inside: false, nx: 0, ny: 0 };
    const hoverTarget = () => {
      let best: string | null = null;
      let bestDistance = Infinity;
      for (const id of new Set(CURATED_PATHS.flatMap((p) => p.nodes))) {
        const pos = screen.get(id);
        const label = labelRefs.current.get(id);
        if (!pos) continue;
        const node = NODE_BY_ID.get(id)!;
        const radius = node.kind === "entity" ? 70 : 22;
        let distance = Math.hypot(pointer.x - pos.x, pointer.y - pos.y);
        if (label && node.kind !== "entity") {
          const labelLeft = pos.x + 10;
          const labelRight = labelLeft + label.offsetWidth;
          if (pointer.x >= labelLeft && pointer.x <= labelRight && Math.abs(pointer.y - pos.y) < 12) distance = 0;
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
      const target = hoverTarget();
      container.style.cursor = target ? "pointer" : "";
      if (target) selectPath(pathForNode(target, activePathRef.current));
    };
    const onPointerLeave = () => {
      pointer.inside = false;
      container.style.cursor = "";
      selectPath(0);
    };
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    // Render loop, paused while off screen
    let frame = 0;
    let visible = false;
    let yaw = 0;
    let pitch = BASE_PITCH;
    const projected = new THREE.Vector3();
    const startTime = performance.now();

    const project = (v: THREE.Vector3) => {
      projected.copy(v).project(camera);
      return { x: ((projected.x + 1) / 2) * layout.width, y: ((1 - projected.y) / 2) * layout.height };
    };

    const render = (now: number) => {
      frame = visible ? requestAnimationFrame(render) : 0;
      if (shownPath !== activePathRef.current) showPath(activePathRef.current, now);

      const t = (now - startTime) / 1000;
      const targetYaw = reducedMotion ? 0 : Math.sin(t * 0.12) * 0.16 + (pointer.inside ? pointer.nx * 0.06 : 0);
      const targetPitch = BASE_PITCH + (reducedMotion || !pointer.inside ? 0 : pointer.ny * 0.03);
      yaw += (targetYaw - yaw) * 0.05;
      pitch += (targetPitch - pitch) * 0.05;
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

      const activeNodes = CURATED_PATHS[shownPath]?.nodes ?? [];
      for (const node of LABELLED_NODES) {
        const el = labelRefs.current.get(node.id);
        if (!el) continue;
        let anchor = worldById.get(node.id)!;
        const cluster = clusters.get(node.id);
        if (cluster) anchor = anchor.clone().add(new THREE.Vector3(0, 0.05, -cluster.halfDepth));
        const pos = project(worldById.get(node.id)!);
        screen.set(node.id, pos);
        const labelPos = cluster ? project(anchor) : pos;
        el.style.transform = `translate3d(${labelPos.x.toFixed(1)}px, ${labelPos.y.toFixed(1)}px, 0)`;
        const stopIndex = activeNodes.indexOf(node.id);
        el.classList.toggle("is-active", stopIndex >= 0 && progress + 0.001 >= stopFractions[stopIndex]);
      }

      // Callout sits beside the leg from the record up into the first cluster
      const stops = pathStops[shownPath];
      const callout = calloutRef.current;
      if (stops && callout && layout.mobile) {
        callout.style.transform = `translate3d(16px, ${(layout.height - callout.offsetHeight - 12).toFixed(1)}px, 0)`;
        callout.style.opacity = String(Math.min(1, Math.max(0, (progress - 0.35) / 0.4)));
      } else if (stops && callout) {
        const mid = project(stops[1].clone().lerp(stops[2], 0.45));
        const placeRight = mid.x - callout.offsetWidth - 28 < layout.width * 0.42;
        const x = placeRight ? mid.x + 28 : mid.x - callout.offsetWidth - 28;
        const clampedX = Math.min(Math.max(x, 8), layout.width - callout.offsetWidth - 8);
        callout.style.transform = `translate3d(${clampedX.toFixed(1)}px, ${(mid.y - callout.offsetHeight / 2).toFixed(1)}px, 0)`;
        callout.style.opacity = String(Math.min(1, Math.max(0, (progress - 0.35) / 0.4)));
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
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
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
