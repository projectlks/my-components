"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

const imgs = [
  "/download.jpg",
  "/download.jpg",
  "/download.jpg",
  "/download.jpg",
  "/download.jpg",
  "/1.png",
];

const AUTO_DELAY = 5000;   // auto slide interval
const RESUME_DELAY = 4000; // after swipe delay

export default function SwipeCarousel() {
  const [imgIndex, setImgIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ------------------------
  // helpers
  // ------------------------
  const stopAuto = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAuto = () => {
    stopAuto();
    intervalRef.current = setInterval(() => {
      swipe("right");
    }, AUTO_DELAY);
  };

  const resumeLater = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      startAuto();
    }, RESUME_DELAY);
  };

  const swipe = (direction: "left" | "right") => {
    setImgIndex((prev) => {
      if (direction === "left") {
        return prev === 0 ? imgs.length - 1 : prev - 1;
      }
      return prev === imgs.length - 1 ? 0 : prev + 1;
    });
  };

  // ------------------------
  // swipe handlers
  // ------------------------
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      stopAuto();
      swipe("right");
      resumeLater();
    },
    onSwipedRight: () => {
      stopAuto();
      swipe("left");
      resumeLater();
    },
    trackMouse: true,
    delta: 50,
    preventScrollOnSwipe: true,
  });

  // ------------------------
  // auto slide start
  // ------------------------
  useEffect(() => {
    startAuto();
    return () => {
      stopAuto();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-neutral-950 py-8">
      <div
        {...handlers}
        className="pointer-events-auto flex cursor-grab items-center active:cursor-grabbing transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{
          transform: `translateX(-${imgIndex * 100}%) translateZ(0px)`,
          userSelect: "none",
          touchAction: "pan-y",
        }}
      >
        <Images imgIndex={imgIndex} />
      </div>

      <Dots
        imgIndex={imgIndex}
        setImgIndex={(idx) => {
          stopAuto();
          setImgIndex(idx);
          resumeLater();
        }}
      />

      <GradientEdges />
    </div>
  );
}

// ------------------------
// Images
// ------------------------
const Images = ({ imgIndex }: { imgIndex: number }) => {
  return (
    <>
      {imgs.map((imgSrc, idx) => (
        <div
          key={idx}
          className="aspect-video max-h-140 w-full shrink-0 rounded-xl bg-neutral-800 object-cover transition-transform duration-500"
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `scale(${imgIndex === idx ? 0.95 : 0.85})`,
          }}
        />
      ))}
    </>
  );
};

// ------------------------
// Dots
// ------------------------
const Dots = ({
  imgIndex,
  setImgIndex,
}: {
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {imgs.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setImgIndex(idx)}
          className={`h-3 w-3 rounded-full transition-colors ${idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
            }`}
        />
      ))}
    </div>
  );
};

// ------------------------
// Gradient
// ------------------------
const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[10vw] bg-linear-to-r from-neutral-950/60 to-neutral-950/0" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[10vw] bg-linear-to-l from-neutral-950/60 to-neutral-950/0" />
    </>
  );
};
