interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  onClick?: () => void;
  className?: string;
  hoverColor?: string;
  padding?: string;
}

export default function Button({
  text,
  icon,
  backgroundColor = "#667EEA",
  textColor = "white",
  fontSize = "medium",
  onClick,
  className = "",
  hoverColor,
  padding = "px-6 py-4",
}: ButtonProps) {
  const fontSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xl: "text-xl",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (hoverColor) {
      e.currentTarget.style.backgroundColor = hoverColor;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = backgroundColor;
  };

  return (
    <button
      onClick={onClick}
      className={`${padding} rounded-lg font-medium transition-colors duration-200 flex items-center ${text && !className.includes("justify-between") ? "space-x-2" : ""} ${fontSizeClasses[fontSize as keyof typeof fontSizeClasses]} ${className} group relative overflow-hidden`}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text && (
        <div className="relative h-full flex items-center overflow-hidden">
          <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
            {text}
          </span>
          <span className="block absolute top-0 left-0 transition-transform duration-300 ease-out group-hover:translate-y-0 translate-y-full h-full flex items-center">
            {text}
          </span>
        </div>
      )}
      {icon}
    </button>
  );
}
