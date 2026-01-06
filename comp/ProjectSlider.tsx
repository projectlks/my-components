

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useSwipeable } from "react-swipeable";

type Project = {
  id: number;
  name: string;
  tech: string;
  image: string;
  description: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "Enterprise ERP Implementation",
    tech: "SAP, Oracle",
    image: "/2.png",
    description:
      "Implemented a complete ERP solution for a manufacturing company, integrating finance, supply chain, and HR modules.",
  },
  {
    id: 2,
    name: "Smart Office Automation",
    tech: "IoT, Python",
    image: "/1.png",
    description:
      "Automated lighting, HVAC, and security systems for corporate offices using IoT sensors and cloud dashboards.",
  },
  {
    id: 3,
    name: "Network Infrastructure Upgrade",
    tech: "Cisco, Juniper",
    image: "/1.png",

    description:
      "Upgraded enterprise network for faster connectivity and improved security across multiple branches.",
  },
  {
    id: 4,
    name: "Data Center Modernization",
    tech: "VMware, AWS",
    image: "/1.png",

    description:
      "Migrated on-premise infrastructure to a hybrid cloud environment with virtualized servers and storage.",
  },
  {
    id: 5,
    name: "Unified Communication System",
    tech: "Microsoft Teams, Zoom",
    image: "/1.png",

    description:
      "Implemented company-wide unified communication systems including video conferencing and chat integration.",
  },
  {
    id: 6,
    name: "IoT-based Factory Monitoring",
    tech: "IoT, Node.js, React",
    image: "/1.png",

    description:
      "Real-time monitoring of production lines using IoT devices and dashboard visualizations.",
  },
  {
    id: 7,
    name: "Cybersecurity Assessment & Hardening",
    tech: "Fortinet, Palo Alto",
    image: "/1.png",

    description:
      "Performed security assessment and implemented best practices to protect corporate networks from threats.",
  },
];

export default function ProjectsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [translate, setTranslate] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const CARD_WIDTH = 350;
  const GAP = 20;
  const CARD_TOTAL = CARD_WIDTH + GAP;

  // responsive visible cards
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1280) setVisibleCards(3);
      else if (window.innerWidth >= 768) setVisibleCards(2);
      else setVisibleCards(1);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxTranslate = 0;
  const minTranslate = Math.min(
    0,
    -((projects.length - visibleCards) * CARD_TOTAL)
  );

  const scrollLeft = () =>
    setTranslate((prev) => Math.min(prev + CARD_TOTAL, maxTranslate));

  const scrollRight = () =>
    setTranslate((prev) => Math.max(prev - CARD_TOTAL, minTranslate));

  const handlers = useSwipeable({
    onSwipedLeft: scrollRight,
    onSwipedRight: scrollLeft,
    trackMouse: true,
  });

  return (



    <>


      
      <section className="bg-neutral-100 border border-neutral-300 py-8">

        <div className="relative overflow-hidden     p-4">
          <div ref={sliderRef} className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-semibold mb-4">The Team Blog</h2>

              <div className="flex gap-2">
                <button
                  onClick={scrollLeft}
                  disabled={translate === maxTranslate}
                  className={`rounded-lg border border-neutral-400 bg-white p-1.5 text-2xl transition-opacity ${translate === maxTranslate
                    ? "opacity-30 cursor-not-allowed"
                    : " opacity-60 hover:opacity-100"
                    }`}
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </button>

                <button
                  onClick={scrollRight}
                  disabled={translate === minTranslate}
                  className={`rounded-lg border border-neutral-400 bg-white p-1.5 text-2xl transition-opacity  ${translate === minTranslate
                    ? "opacity-30 cursor-not-allowed"
                    : " opacity-60 hover:opacity-100"
                    }`}
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slider */}
            <div {...handlers} className="overflow-visible">
              <div
                className="flex gap-5 transition-transform duration-300 ease-out py-2"
                style={{
                  transform: `translateX(${translate}px)`,
                  willChange: "transform",
                }}
              >
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="shrink-0 w-87.5 hover:-translate-y-1 transition-transform"
                  >
                    <div className="relative h-50 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tech.split(", ").map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg font-medium text-neutral-900">
                      {project.name}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </>

  );
}
