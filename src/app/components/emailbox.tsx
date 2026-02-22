interface EmailBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function EmailBox({ placeholder, value, onChange }: EmailBoxProps) {
  return (
    <div className="relative w-full">
      <input
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none"
        style={{
          background: "#FFF8F5",
          color: "#390007",
          border: "2px solid #FD870B",
          boxShadow: "3px 3px 0px #FD870B",
          fontFamily: "var(--font-body)",
        }}
      />
    </div>
  )
}
