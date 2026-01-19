"use client"

import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/solid";
import Link from "next/link";


export default function ModalitiesSection() {
    return (
        <section className="bg-[#F7F9FA] dark:bg-gray-900 text-slate-900 dark:text-slate-100">
            <div className="mx-auto @container max-w-6xl px-6 py-16 space-y-12">

                {/* Heading */}
                <div className="grid @5xl:gap-22 gap-8  grid-cols-1 @5xl:grid-cols-[1.5fr_1fr] mb-14 ">
                    <h2 className="text-[48px] leading-tight ">
                        Modern skills need a modern learning approach
                    </h2>
                    <p className="text-[19px] leading-normal  text-slate-600 dark:text-slate-300">
                        Learning solutions shouldn’t be one-size-fits-all. For effective training,
                        you need the right skills and the right modalities. That’s where we come in.
                    </p>
                </div>


                <div>

                    {/* Image + Video */}
                    <div
                        className="relative  @5xl:bg-[url('https://business.udemy.com/wp-content/uploads/2024/12/learning-ecosystem-var-c.jpg.webp')] bg-none @5xl:bg-white dark:bg-gray-850  overflow-hidden bg-cover bg-center @5xl:h-55 py-8 rounded-t-3xl  "

                    >

                        <div className="grid grid-cols-[1fr_4fr] gap-4 max-w-[320px]  pl-8  ">

                            <span className="flex h-20 min-w-20 items-center  justify-center rounded-full bg-white/90 group-hover:scale-105 transition">
                                <PlayIcon className="h-8 w-8 text-black" />
                            </span>

                            <div className="text-left hidden b w-full md:block">
                                <p className="font-semibold @5xl:text-white">
                                    AI at Udemy: Product overview
                                </p>
                                <p className="text-sm @5xl:text-gray-300">1:38</p>
                            </div>
                        </div>
                    </div>



                    <Modality />


                </div>

            </div>
        </section>
    );
}


function Modality() {
    return (
        <div className="@container ">
            <div className="grid grid-cols-1  @5xl:grid-cols-4 @5xl:bg-white bg-[#199fa3] dark:bg-teal-400
 @5xl:dark:bg-gray-700  p-6  
            
            rounded-3xl py-10 
            @5xl:rounded-b-3xl
                 @5xl:rounded-t-none

            
            ">

                {modalities.map((mod, index) => (
                    <Link key={mod.description}
                        href={mod.href}
                        className="group p-6 pr-0 text-gray-950 bg-white dark:bg-gray-700 dark:text-gray-200 text-[24px]  hover:-translate-y-2 hover:-mt-px hover:-ml-px ease-in-out duration-[0.4s] mb-6 transition-transform  hover:border border-gray-300 dark:border-gray-600  rounded-3xl "
                    >
                        <div className={` group-hover:border-none pr-6 h-full  ${index === modalities.length - 1 ? "" : "border-gray-300 dark:border-gray-600 border-r"} `}>

                            <div className="flex rounded-full border w-10 aspect-square mb-6 -rotate-45 justify-center items-center transition-all group-hover:bg-indigo-600 group-hover:dark:bg-indigo-400 group-hover:border-indigo-600 group-hover:dark:border-indigo-400 border-gray-950 dark:border-gray-200">
                                <ArrowRightIcon className="size-6 group-hover:text-white  " />
                            </div>

                            <h3 className="text-2xl mb-6 group-hover:text-indigo-600  group-hover:dark:text-indigo-400 leading-tight">
                                {mod.title}
                            </h3>

                            <p className="text-base text-gray-500 dark:text-gray-400  leading-5.5">
                                {mod.description}
                            </p>
                        </div>

                    </Link >
                ))}
            </div >

        </div>
    );
}



const modalities = [
    {
        title: "On-Demand Learning",
        href: "/on-demand-learning/",
        description:
            "Provide anytime access to the latest business, tech, leadership, and soft skills courses all in one learning platform.",
    },
    {
        title: "Hands-On Learning",
        href: "/immersive-learning/",
        description:
            "Boost tech skills faster with Udemy Business Pro learn-by-doing technical projects.",
    },
    {
        title: "Cohort Learning",
        href: "/cohort-learning/",
        description:
            "Grow your leaders with guided, self-paced leadership programs.",
    },
    {
        title: "Professional Services",
        href: "/services/",
        description:
            "Get the expertise and support you need to achieve your goals faster.",
    },
];
