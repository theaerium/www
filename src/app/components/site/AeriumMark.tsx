/** Three stacked layers; the stroke matches the surface so the layers read as separated. */
export default function AeriumMark({
  fill = "#FFFFFF",
  stroke = "#111111",
  size = 24,
}: {
  fill?: string;
  stroke?: string;
  size?: number;
}) {
  return (
    <svg
      width={(size * 26) / 24}
      height={size}
      viewBox="-14 196 772 720"
      aria-hidden="true"
      style={{ flexShrink: 0, display: "block" }}
    >
      <path d="M0 699.893L372.106 538.281L744.212 699.893L372.106 901.386Z" fill={fill} stroke={stroke} strokeWidth="36" strokeLinejoin="round" />
      <path d="M0 536.759L372.106 375.147L744.212 536.759L372.106 738.252Z" fill={fill} stroke={stroke} strokeWidth="36" strokeLinejoin="round" />
      <path d="M0 372.107L372.106 210.496L744.212 372.107L372.106 573.6Z" fill={fill} stroke={stroke} strokeWidth="36" strokeLinejoin="round" />
    </svg>
  );
}
