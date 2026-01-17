import Image from "next/image";
import { ReactNode } from "react";

interface CarouselCardProps {
  backgroundColor: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "center" | "top" | "bottom" | "left" | "right";
  imageSize?: "small" | "medium" | "large" | "full";
  text?: string;
  textColor?: string;
  bottomText?: string;
  bottomTextColor?: string;
  className?: string;
  onClick?: () => void;
  customContent?: ReactNode;
}

export default function CarouselCard({
  backgroundColor,
  imageSrc,
  imageAlt = "",
  imagePosition = "center",
  imageSize = "medium",
  text,
  textColor = "black",
  bottomText,
  bottomTextColor = "black",
  className = "",
  onClick,
  customContent,
}: CarouselCardProps) {
  const getImagePositionClasses = () => {
    switch (imagePosition) {
      case "top":
        return "items-start justify-center pt-4";
      case "bottom":
        return "items-end justify-center";
      case "left":
        return "items-center justify-start pl-4";
      case "right":
        return "items-center justify-end pr-4";
      default:
        return "items-center justify-center";
    }
  };

  const getImageSizeClasses = () => {
    switch (imageSize) {
      case "small":
        return "w-24 sm:w-28 lg:w-32 xl:w-36";
      case "large":
        return "w-48 sm:w-56 lg:w-64 xl:w-72";
      case "full":
        return "w-[85%] h-[85%]";
      default:
        return "w-32 sm:w-36 lg:w-40 xl:w-48";
    }
  };

  const arrowIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.2"
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    );
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div
        className={`w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-xl flex overflow-hidden ${getImagePositionClasses()} ${onClick ? "cursor-pointer hover:opacity-90 transition-opacity" : ""}`}
        style={{ backgroundColor }}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        {customContent ? (
          customContent
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1632}
            height={1558}
            className={`object-contain rounded-lg ${getImageSizeClasses()}`}
            style={{ height: imageSize === "full" ? "85%" : "auto" }}
            draggable={false}
          />
        ) : null}
        {text && (
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-sm font-medium" style={{ color: textColor }}>
              {text}
            </p>
          </div>
        )}
      </div>
      {bottomText && (
        <div
          className="mt-3 flex items-center group"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          <p
            className="text-lg font-medium pr-2"
            style={{ color: bottomTextColor }}
          >
            {bottomText}
          </p>
          <div className="transition-transform duration-200 ease-out group-hover:translate-x-1">
            {arrowIcon()}
          </div>
        </div>
      )}
    </div>
  );
}
