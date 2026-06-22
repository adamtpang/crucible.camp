import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Pitch } from "@/components/sections/Pitch";
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
