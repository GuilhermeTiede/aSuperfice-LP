import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProductsServices } from "@/components/ProductsServices";
import { Materials } from "@/components/Materials";
import { HowItWorks } from "@/components/HowItWorks";
import { CorporateProjects } from "@/components/CorporateProjects";
import { WallArtSpecialty } from "@/components/WallArtSpecialty";
import { SocialProof } from "@/components/SocialProof";
import { FAQ } from "@/components/FAQ";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <ProductsServices />
      <Materials />
      <WallArtSpecialty />
      <HowItWorks />
      <CorporateProjects />
      <SocialProof />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  );
}
