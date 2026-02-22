import Image from "next/image";

export default function DeploymentSection() {
  return (
    <section
      className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24"
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
              Built for your team, securely
            </h2>
            <div className="mt-10 space-y-6">
              <div
                className="bevel-box"
                style={{ borderLeft: "3px solid #FD870B" }}
              >
                <p
                  className="text-lg sm:text-xl leading-relaxed"
                  style={{ color: "#4A1018" }}
                >
                  Aeri is customized to your business: ways of working,
                  integrations, SOPs, and more
                </p>
              </div>
              <div
                className="bevel-box"
                style={{ borderLeft: "3px solid #FD870B" }}
              >
                <p
                  className="text-lg sm:text-xl leading-relaxed"
                  style={{ color: "#4A1018" }}
                >
                  Aeri can be deployed fully on-prem, giving you complete control
                  over your data
                </p>
              </div>
              <div
                className="bevel-box"
                style={{ borderLeft: "3px solid #FD870B" }}
              >
                <p
                  className="text-lg sm:text-xl leading-relaxed"
                  style={{ color: "#4A1018" }}
                >
                  Add checkpoints for your team to verify Aeri&apos;s work and
                  ensure everything runs smoothly
                </p>
              </div>
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
                  Secure Deployment
                </span>
              </div>
              <div className="relative" style={{ background: "#FAEEE8" }}>
                <div
                  className="p-4 sm:p-6"
                  style={{
                    border: "2px inset #E0C4B8",
                    margin: "1rem",
                    background: "#fff",
                  }}
                >
                  <Image
                    src="/ui/plane.png"
                    alt="Airplane in flight representing global deployment"
                    width={552}
                    height={728}
                    className="w-full h-auto"
                  />
                </div>
                {/* FDE badge overlay */}
                <div
                  className="absolute bottom-8 right-8"
                  style={{
                    background: "#390007",
                    border: "2px solid #FD870B",
                    padding: "0.5rem 0.75rem",
                  }}
                >
                  <Image
                    src="/ui/fde.svg"
                    alt=""
                    width={80}
                    height={140}
                    className="w-16 h-auto"
                    style={{ filter: "brightness(0) invert(1) opacity(0.8)" }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
