import theme from "@/app/config/theme";

export default function SecurityCard() {
  return (
    <div
      className="relative py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: theme.colors.orange }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <p className="text-lg font-medium tracking-widest text-white uppercase mb-4">
          Security & Data Protection
        </p>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white max-w-5xl leading-tight">
          Your data never leaves your cloud. We deploy on AWS, Azure, GCP, or on
          your servers, and implement access controls and tracability to ensure
          your data stays protected.
        </h3>
      </div>
    </div>
  );
}
