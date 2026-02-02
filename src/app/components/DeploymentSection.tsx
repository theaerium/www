import Image from "next/image";

export default function DeploymentSection() {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left: Text content */}
          <div className="flex-1 lg:max-w-[55%]">
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              Deployment
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-black leading-tight">
              Built for your team, securely
            </h2>
            <div className="mt-10 space-y-6">
              <p className="text-lg sm:text-xl lg:text-2xl text-black leading-snug">
                Aeri is customized to your business: ways of working,
                integrations, SOPs, and more
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-black leading-snug">
                Aeri can be deployed fully on-prem, giving you complete control
                over your data
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-black leading-snug">
                Add checkpoints for your team to verify Aeri&apos;s work and
                ensure everything runs smoothly
              </p>
            </div>
          </div>

          {/* Right: Photo with logo background and fde overlay */}
          <div
            className="flex-1 lg:max-w-[45%] w-full rounded-2xl p-6 sm:p-8"
            style={{
              backgroundColor: "#FCE5CD",
              backgroundImage: "url(/brand/logo-thin.svg)",
              backgroundSize: "150%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/ui/plane.png"
                alt="Airplane in flight representing global deployment"
                width={552}
                height={728}
                className="w-full h-auto"
              />
              {/* Warm overlay with blur */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: "rgba(252, 229, 205, 0.4)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                }}
              />
              {/* FDE icon overlay */}
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8">
                <Image
                  src="/ui/fde.svg"
                  alt=""
                  width={120}
                  height={212}
                  className="w-20 sm:w-24 h-auto opacity-80"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
