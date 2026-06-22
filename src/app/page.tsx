import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Pitch } from "@/components/sections/Pitch";
import { Audiences } from "@/components/sections/Audiences";
import { Kpis } from "@/components/sections/Kpis";
import { Tracks } from "@/components/sections/Tracks";
import { RunOfShow } from "@/components/sections/RunOfShow";
import { Judges } from "@/components/sections/Judges";
import { Rsvp } from "@/components/sections/Rsvp";
import { Partners } from "@/components/sections/Partners";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pitch />
        <Audiences />
        <Kpis />
        <Tracks />
        <RunOfShow />
        <Judges />
        <Rsvp />
        <Partners />
      </main>
      <Footer />
    </>
  );
}
