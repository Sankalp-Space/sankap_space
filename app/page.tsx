import Atlas from "@/components/atlas/Atlas";
import Cursor from "@/components/atlas/Cursor";
import { Nav, Readout } from "@/components/atlas/Chrome";
import { Launch } from "@/components/sections/Launch";
import { Origin } from "@/components/sections/Origin";
import { Toolkit } from "@/components/sections/Toolkit";
import { Missions } from "@/components/sections/Missions";
import { FlightLog } from "@/components/sections/FlightLog";
import { Transmission } from "@/components/sections/Transmission";
import { jsonLd } from "@/lib/site";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
      />
      <Atlas />
      <Nav />
      <Readout />
      <Cursor />
      <main className="relative z-10">
        <Launch />
        <Origin />
        <Toolkit />
        <Missions />
        <FlightLog />
        <Transmission />
      </main>
    </>
  );
}
