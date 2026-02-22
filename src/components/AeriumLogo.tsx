import Link from "next/link";
import Image from "next/image";
import AeriumLogoSvg from "@/components/AeriumLogo_no_background.svg";

interface AeriumLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizePx = {
  sm: 32,
  md: 48,
  lg: 64,
};

export default function AeriumLogo({
  className = "",
  size = "md"
}: AeriumLogoProps) {
  const px = sizePx[size];

  return (
    <Link
      href="/"
      className={`inline-block transition-opacity hover:opacity-80 ${className}`}
      aria-label="Aerium Home"
    >
      <Image
        src={AeriumLogoSvg}
        alt="Aerium"
        width={px}
        height={px}
      />
    </Link>
  );
}
