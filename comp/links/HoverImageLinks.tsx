"use client";

import { useEffect, useRef } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface Item {
  heading: string;
  subheading: string;
  imgSrc: string;
  href: string;
}

const items: Item[] = [
  {
    heading: "About",
    subheading: "Learn what we do here",
    imgSrc: "/imgs/random/11.jpg",
    href: "#",
  },
  {
    heading: "Clients",
    subheading: "We work with great people",
    imgSrc: "/imgs/random/6.jpg",
    href: "#",
  },
  {
    heading: "Portfolio",
    subheading: "Our work speaks for itself",
    imgSrc: "/imgs/random/4.jpg",
    href: "#",
  },
  {
    heading: "Careers",
    subheading: "We want cool people",
    imgSrc: "/imgs/random/5.jpg",
    href: "#",
  },
];

export default function HoverImageLinks() {
  return (
    <section className="bg-neutral-950 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        {items.map((item) => (
          <HoverLink key={item.heading} {...item} />
        ))}
      </div>
    </section>
  );
}

function HoverLink({ heading, subheading, imgSrc, href }: Item) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  // target (mouse)
  const target = useRef({ x: 0, y: 0 });
  // animated (lerp)
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf: number;

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;

      const el = ref.current;
      if (el) {
        const img = el.querySelector(
          "[data-hover-image]"
        ) as HTMLElement | null;

        if (img) {
          const top = 50 + current.current.y * -20; // 40% ↔ 60%
          const left = 65 + current.current.x * -10; // 60% ↔ 70%

          img.style.top = `${top}%`;
          img.style.left = `${left}%`;
        }
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);





  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.current.x = x / rect.width - 0.5;
    target.current.y = y / rect.height - 0.5;
  };

  const handleMouseLeave = () => {
    target.current.x = 0;
    target.current.y = 0;
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500
         md:py-8"
    >
      {/* TEXT */}
      <div>
        <h3 className="relative z-10 text-4xl font-bold text-neutral-500  duration-500 group-hover:text-neutral-50 md:text-6xl transform ease-in-out transition-transform group-hover:-translate-x-8 ">
          {heading.split("").map((l, i) => (
            <span key={i} className="letter inline-block transition-transform duration-500 transform group-hover:translate-x-8" style={{
              transitionDelay: `${100 + (i * 50)}ms`,
            }} >
              {l}
            </span>
          ))}
        </h3>
        <p className="relative z-10 mt-2 text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </p>
      </div>

      {/* HOVER IMAGE */}
      <Image
        width={200}
        height={200}
        data-hover-image
        src={imgSrc}
        alt={heading}
        className="pointer-events-none absolute h-24 w-32 z-99 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-xl object-cover shadow-xl transition-transform duration-400 group-hover:scale-100 md:h-48 md:w-64 -rotate-12 group-hover:rotate-12"
        style={{ top: "50%", left: "65%" }}
      />

      {/* ARROW (HEROICONS) */}
      <div className="relative z-10 translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <ArrowRightIcon className="h-12 w-12 text-neutral-50" />
      </div>

      <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-neutral-50  transition-all duration-750 group-hover:w-full" />

    </Link>
  );
}
