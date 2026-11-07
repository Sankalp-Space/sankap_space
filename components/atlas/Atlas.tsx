"use client";

import dynamic from "next/dynamic";
import ScrollDriver from "./ScrollDriver";

const AtlasCanvas = dynamic(() => import("./AtlasCanvas"), {
  ssr: false,
  loading: () => null,
});

/** Fixed WebGL sky behind the whole story. The page reads fine without it. */
export default function Atlas() {
  return (
    <>
      <ScrollDriver />
      <div className="fixed inset-0 z-0" aria-hidden="true" style={{ background: "radial-gradient(120% 90% at 70% 40%, #13235e 0%, #0a1238 70%)" }}>
        <AtlasCanvas />
      </div>
    </>
  );
}
