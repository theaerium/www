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
  backgroundColor = "#390007",
  textColor = "#FFF5F0",
  fontSize = "medium",
  onClick,
  className = "",
  hoverColor,
  padding = "px-6 py-3",
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
    e.currentTarget.style.boxShadow = "1px 1px 0px #FD870B";
    e.currentTarget.style.transform = "translate(2px, 2px)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = backgroundColor;
    e.currentTarget.style.boxShadow = "3px 3px 0px #FD870B";
    e.currentTarget.style.transform = "translate(0, 0)";
  };

  return (
    <button
      onClick={onClick}
      className={`${padding} font-semibold uppercase tracking-wider flex items-center ${text ? "gap-2" : ""} ${fontSizeClasses[fontSize as keyof typeof fontSizeClasses]} ${className}`}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        border: "2px solid #FD870B",
        boxShadow: "3px 3px 0px #FD870B",
        fontFamily: "var(--font-body)",
        letterSpacing: "0.1em",
        transition: "all 0.1s ease",
        cursor: "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text && <span>{text}</span>}
      {icon}
    </button>
  );
}
