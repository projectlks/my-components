"use client";

import BackBtn from "@/comp/BackBtn";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-950 bg-gray-50">
      <Player
        autoplay
        loop
        src="/comingSoon.json"
        style={{ width: "100%", maxWidth: "500px" }}
        aria-label="404 Page Not Found Animation"
      />

      <div className="absolute top-3 left-3 z-50">
        <BackBtn />
      </div>
    </div>
  );
}
