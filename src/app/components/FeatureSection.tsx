import Image from "next/image";

interface FeatureSectionProps {
  label: string;
  headline: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
}

export default function FeatureSection({
  label,
  headline,
  bullets,
  imageSrc,
  imageAlt,
}: FeatureSectionProps) {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left: Text content */}
          <div className="flex-1 lg:max-w-[55%]">
            <p className="text-base sm:text-lg text-gray-700 mb-4">{label}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-black leading-tight">
              {headline}
            </h2>
            <div className="mt-10 space-y-6">
              {bullets.map((bullet, i) => (
                <p
                  key={i}
                  className="text-lg sm:text-xl lg:text-2xl text-black leading-snug"
                >
                  {bullet}
                </p>
              ))}
            </div>
          </div>

          {/* Right: Framed image */}
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
            {/* White overlay with product image */}
            <div className="relative bg-white rounded-lg overflow-hidden p-4 sm:p-6">
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
    </section>
  );
}
