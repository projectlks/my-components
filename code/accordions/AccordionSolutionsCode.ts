export const AccordionSolutionsCode = `

"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const cards = [
  {
    title: "Individuals",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos laudantium in iusto iure aliquam commodi possimus eaque sit recusandae incidunt?",
    videoUrl:
      "https://media2.giphy.com/media/SsTcO55LJDBsI/giphy.gif?cid=ecf05e47hfid50hu34mzkabzoy46hrftyl6g6656uygzmnpy&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  },
  {
    title: "Startups",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos laudantium in iusto iure aliquam commodi possimus eaque sit recusandae incidunt?",
    videoUrl:
      "https://media3.giphy.com/media/3oz8xR9wKr8TaazlQc/giphy.gif?cid=ecf05e47izzshtedbk9y9dv6f5yvdsbakp7tth2n58vsdd7p&ep=v1_gifs_search&rid=giphy.gif&ct=g&quot;",
  },
  {
    title: "Enterprise",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos laudantium in iusto iure aliquam commodi possimus eaque sit recusandae incidunt?",
    videoUrl:
      "https://media1.giphy.com/media/VkMV9TldsPd28/giphy.gif?cid=ecf05e478ipd21u861g034loyqpc66eseytcl7lzjbk1wqrh&ep=v1_gifs_search&rid=giphy.gif&ct=g&quot;",
  },
];

export default function AccordionSolutions() {
  const [openIndex, setOpenIndex] = useState(0); // default: first card open

  return (
    <div className=" bg-white dark:bg-gray-950 p-6">

      <div className="w-full max-w-5xl mx-auto grid gap-8 grid-cols-1 lg:grid-cols-[1fr_350px] ">
        <div className="flex flex-col gap-4">
          {cards.map((card, index) => {
            const isOpen = index === openIndex;

            return (
              <div
                key={index}
                className="p-0.5 rounded-lg relative overflow-hidden cursor-pointer group"
                onClick={() => setOpenIndex(index)}
              >
                {/* Card content */}
                <div
                  className="p-6 rounded-[7px] bg-white dark:bg-gray-950 flex flex-col justify-between relative z-20 transition-[height] duration-300 ease-in-out"
                  style={{ height: isOpen ? "240px" : "72px" }}
                >
                  <div>
                    <p className="text-xl font-medium w-fit bg-linear-to-r from-violet-600 to-indigo-600 dark:form-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
                      {card.title}
                    </p>
                    <p
                      className={\`mt-4 dark:text-gray-400  text-gray-600 transition-opacity duration-300                       \${isOpen ? "opacity-100" : "opacity-0"
                        } \`}
                    >
                      {card.text}
                    </p>
                  </div>

                  <button
                    className={\`-ml-6 -mr-6 -mb-6 mt-4 py-2 rounded-b-md flex items-center justify-center gap-1 bg-linear-to-r  from-violet-600   to-indigo-600  dark:from-violet-500 dark:to-indigo-500 text-white transition-opacity duration-300                \${isOpen ? "opacity-100" : "opacity-0"
                      }   \`}
                  >
                    <span>Learn more</span>
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Gradient overlays */}
                <div
                  className="absolute inset-0 z-10 bg-linear-to-r from-violet-600 to-indigo-600 transition-opacity duration-300"
                  style={{ opacity: isOpen ? 1 : 0 }}
                ></div>
                <div className="absolute inset-0 z-0 bg-slate-200 dark:bg-slate-500"></div>
              </div>
            );
          })}
        </div>

        {/* Video / image */}
        <div
          className="bg-slate-300 rounded-2xl aspect-4/3 lg:aspect-auto"
          style={{
            backgroundImage: \`url(\${cards[openIndex].videoUrl}) \`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </div>

  );
}


`