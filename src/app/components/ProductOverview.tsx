import Image from "next/image";

export default function ProductOverview() {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Headlines */}
        <div className="max-w-5xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal text-black leading-tight">
            Aeri handles your supply chain from BOM to buy, giving you new
            insights into costs and savings opportunities.
          </h2>
          <p className="mt-6 text-xl sm:text-2xl lg:text-3xl text-gray-600 leading-snug">
            Built by Aerium, tailored to your business alongside your team.
          </p>
        </div>

        {/* Product screenshot with framed image pattern */}
        <div
          className="mt-12 sm:mt-16 rounded-2xl relative p-6 sm:p-8 lg:p-10"
          style={{
            backgroundColor: "#FCE5CD",
            backgroundImage: "url(/brand/logo-thin.svg)",
            backgroundSize: "150%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* White overlay with product image */}
          <div className="relative bg-white rounded-lg overflow-hidden p-4 sm:p-6 lg:p-8">
            <Image
              src="/ui/platform_full.svg"
              alt="Aerium platform overview"
              width={1512}
              height={982}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
