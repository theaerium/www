import Image from "next/image";

interface FeatureSectionProps {
  id?: string;
  label: string;
  headline: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
}

export default function FeatureSection({
  id,
  label,
  headline,
  bullets,
  imageSrc,
  imageAlt,
}: FeatureSectionProps) {
  return (
    <section
      id={id}
      className="px-4 sm:px-6 lg:px-8 scroll-mt-44"
      style={{ background: "#FFF8F5" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left: Text content */}
          <div className="flex-1 lg:max-w-[55%]">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "#390007",
              }}
            >
              {headline}
            </h2>
            <div className="mt-10 space-y-6">
              {bullets.map((bullet, i) => (
                <div
                  key={i}
                  className="bevel-box"
                  style={{ borderLeft: "3px solid #FD870B" }}
                >
                  <p
                    className="text-lg sm:text-xl leading-relaxed"
                    style={{ color: "#4A1018" }}
                  >
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Retro framed image */}
          <div className="flex-1 lg:max-w-[45%] w-full">
            <div
              style={{
                border: "2px solid #FD870B",
                boxShadow: "3px 3px 0px #FD870B",
              }}
            >
              {/* Dark header bar */}
              <div
                style={{
                  background: "#390007",
                  padding: "0.5rem 1rem",
                  borderBottom: "2px solid #FD870B",
                }}
              >
                <span
                  className="text-xs uppercase tracking-widest font-bold"
                  style={{ color: "#FD870B" }}
                >
                  {label}
                </span>
              </div>
              {/* Image content */}
              <div className="p-4 sm:p-6" style={{ background: "#FAEEE8" }}>
                <div
                  className="overflow-hidden"
                  style={{
                    border: "2px inset #E0C4B8",
                    background: "#fff",
                    padding: "0.5rem",
                  }}
                >
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={552}
                    height={728}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Retro divider between sections */}
        <hr
          className="fancy"
          style={{ marginTop: "4rem", marginBottom: "4rem" }}
        />
      </div>
    </section>
  );
}
