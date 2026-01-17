import Header from "./components/header";
import Footer from "./components/footer";
import Hero from "./components/hero";
import CarouselSection from "./components/CarouselSection";
import DetailCardsSection from "./components/DetailCardsSection";
import TestimonialSection from "./components/TestimonialSection";
import FAQSection from "./components/FAQSection";

export default function NewVersionPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <CarouselSection />
        <DetailCardsSection />
        {/*<TestimonialSection />*/}
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
