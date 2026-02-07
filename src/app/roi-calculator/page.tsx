import { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";
import ROICalculator from "../components/ROICalculator";

export const metadata: Metadata = {
  title: "ROI Calculator | Aerium",
  description:
    "Estimate your potential savings with Aerium. Calculate the ROI of automating your supply chain procurement workflows.",
};

export default function ROICalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="pt-32 pb-16 flex-1">
        <ROICalculator />
      </main>
      <Footer />
    </div>
  );
}
