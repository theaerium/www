import { useId } from "react";

// Geometry from the final logo file (public/site/aerium-logo.svg), cropped to its ink.
const VIEW_BOX = { x: 0, y: 112, width: 1717, height: 369 };
const WORDMARK =
  "M448.36 409L526.12 153.4H567.88L645.64 409H612.52L547 181.48L481.48 409H448.36ZM487.6 336.28L498.4 306.04H595.6L606.4 336.28H487.6ZM687.259 409V153.4H842.779V183.64H718.219V266.08H838.459V295.6H718.219V378.76H845.659V409H687.259ZM895.919 409V153.4H973.679C1000.56 153.4 1021.8 160.24 1037.4 173.92C1053 187.36 1060.8 205.96 1060.8 229.72C1060.8 241.72 1058.04 252.4 1052.52 261.76C1047 270.88 1039.92 278.08 1031.28 283.36C1022.64 288.64 1013.76 291.64 1004.64 292.36L1003.2 288.04C1020.24 289 1032.96 293.08 1041.36 300.28C1050 307.48 1055.04 319.24 1056.48 335.56L1062.96 409H1032L1025.88 339.52C1025.16 331.6 1023.24 325.24 1020.12 320.44C1017.24 315.4 1012.56 311.8 1006.08 309.64C999.839 307.24 991.199 306.04 980.159 306.04H926.879V409H895.919ZM926.879 275.8H973.679C991.439 275.8 1005 271.84 1014.36 263.92C1023.72 255.76 1028.4 244.36 1028.4 229.72C1028.4 214.84 1023.72 203.44 1014.36 195.52C1005 187.6 991.439 183.64 973.679 183.64H926.879V275.8ZM1115.38 409V378.76H1179.1V183.64H1115.38V153.4H1273.78V183.64H1210.06V378.76H1273.78V409H1115.38ZM1410.44 414.76C1383.56 414.76 1362.44 406.24 1347.08 389.2C1331.72 372.16 1324.04 349 1324.04 319.72V153.4H1355V319.72C1355 340.84 1359.68 356.92 1369.04 367.96C1378.64 379 1392.44 384.52 1410.44 384.52C1428.44 384.52 1442.12 379 1451.48 367.96C1461.08 356.92 1465.88 340.84 1465.88 319.72V153.4H1496.84V319.72C1496.84 349 1489.16 372.16 1473.8 389.2C1458.44 406.24 1437.32 414.76 1410.44 414.76ZM1612.62 380.2L1564.38 182.2H1567.26V409H1536.3V153.4H1583.1L1633.5 363.64H1619.1L1669.5 153.4H1716.3V409H1685.34V182.2H1688.22L1639.98 380.2H1612.62Z";
// Bottom layer first; each layer overlaps the one below it.
const LAYERS = [
  "M0 373.358L198.5 287.147L397 373.358L198.5 480.845L0 373.358Z",
  "M0 286.335L198.5 200.123L397 286.335L198.5 393.821L0 286.335Z",
  "M0 198.5L198.5 112.289L397 198.5L198.5 305.986L0 198.5Z",
];

/**
 * The Aerium lockup: stacked mark and wordmark. `gap` should match the surface behind the logo, since it
 * draws the line separating the layers.
 */
export default function AeriumLogo({ color = "#111111", gap = "#FFFFFF", height = 22 }: { color?: string; gap?: string; height?: number }) {
  const id = useId();
  // The file's separator is a 3-unit inner stroke, under a pixel at nav size; keep it at least 1px on screen.
  const separatorWidth = Math.max(6, (2 * VIEW_BOX.height) / height);

  return (
    <svg
      width={(height * VIEW_BOX.width) / VIEW_BOX.height}
      height={height}
      viewBox={`${VIEW_BOX.x} ${VIEW_BOX.y} ${VIEW_BOX.width} ${VIEW_BOX.height}`}
      role="img"
      aria-label="Aerium"
      style={{ flexShrink: 0, display: "block" }}
    >
      <path d={WORDMARK} fill={color} />
      {LAYERS.map((layer, i) => (
        <g key={layer}>
          <path d={layer} fill={color} />
          <mask id={`${id}-${i}`} fill="white">
            <path d={layer} />
          </mask>
          <path d={layer} stroke={gap} strokeWidth={separatorWidth} fill="none" mask={`url(#${id}-${i})`} />
        </g>
      ))}
    </svg>
  );
}
