import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Materials } from "@/components/Materials";
import { ProductsServices } from "@/components/ProductsServices";
import { WallArtSpecialty } from "@/components/WallArtSpecialty";
import { SocialProof } from "@/components/SocialProof";
import { BlogPlaceholder } from "@/components/BlogPlaceholder";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Materials />
      <ProductsServices />
      <WallArtSpecialty />
      <SocialProof />
      <BlogPlaceholder />
      <CallToAction />
      <Footer />
    </main>
  );
}
