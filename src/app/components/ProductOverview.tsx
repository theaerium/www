import Image from "next/image";

export default function ProductOverview() {
  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
      style={{ background: "#FFF8F5" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Headlines */}
        <div className="max-w-7xl">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "#390007",
            }}
          >
            Aeri handles your supply chain from BOM to buy, giving you new
            insights into cost drivers and savings opportunities.
          </h2>
          <p
            className="mt-6 text-xl sm:text-2xl lg:text-3xl leading-snug"
            style={{ color: "#6B3030" }}
          >
            Built by Aerium, tailored to your business alongside your team.
          </p>
        </div>

        {/* Product screenshot with retro frame */}
        <div
          className="mt-12 sm:mt-16 p-1"
          style={{
            border: "2px solid #FD870B",
            boxShadow: "4px 4px 0px #FD870B",
            background: "#FAEEE8",
          }}
        >
          {/* Dark header bar */}
          <div
            style={{
              background: "#390007",
              padding: "0.5rem 1.25rem",
              borderBottom: "2px solid #FD870B",
            }}
          >
            <span
              className="text-xs uppercase tracking-widest font-bold"
              style={{ color: "#FD870B" }}
            >
              Aeri Overview
            </span>
          </div>
          {/* Image */}
          <div className="p-4 sm:p-6 lg:p-8" style={{ background: "#FFF8F5" }}>
            <div
              className="overflow-hidden"
              style={{
                border: "2px inset #E0C4B8",
                background: "#fff",
                padding: "0.5rem",
              }}
            >
              <Image
                src="/ui/platform_full.svg"
                alt="Aeri overview"
                width={1512}
                height={982}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
