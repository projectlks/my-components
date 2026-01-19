"use client"

import { useEffect, useRef } from "react"


import {
    SiReact,
    SiVite,
    SiJavascript,
    SiTypescript,
    SiTailwindcss,
    SiGit,
    SiGithub,
    SiHtml5,
    SiCss3,
    SiNodedotjs,
    SiNextdotjs,
    SiPython,
    SiDocker,
    SiAmazon,
    SiGooglecloud,
    SiMongodb,
    SiPostgresql,
    SiKubernetes,
    SiLinux,
    SiFirebase,

    SiRedux,
    SiExpress,
    SiGraphql,
    SiJest,
    SiWebpack,
    SiBabel,
    SiNpm,
    SiYarn,
    SiVercel,
    SiNetlify,
    SiMysql,
    SiRedis,
    SiElectron,
    SiFigma,
    SiPostman,
    SiUbuntu,
    SiDigitalocean,
    SiCloudflare,
    SiStripe,
    SiPrisma,
} from "react-icons/si"


// Array 1
export const logos1 = [
    SiReact,
    SiVite,
    SiJavascript,
    SiTypescript,
    SiTailwindcss,
    SiGit,
    SiGithub,
    SiHtml5,
    SiCss3,
    SiNodedotjs,
    SiNextdotjs,
    SiPython,
    SiDocker,
    SiAmazon,
    SiGooglecloud,
    SiMongodb,
    SiPostgresql,
    SiKubernetes,
    SiLinux,
    SiFirebase,
]

// Array 2 (different order)
export const logos2 = [
    SiRedux,
    SiExpress,
    SiGraphql,
    SiJest,
    SiWebpack,
    SiBabel,
    SiNpm,
    SiYarn,
    SiVercel,
    SiNetlify,
    SiMysql,
    SiRedis,
    SiElectron,
    SiFigma,
    SiPostman,
    SiUbuntu,
    SiDigitalocean,
    SiCloudflare,
    SiStripe,
    SiPrisma,
]



export default function DoubleScrollingLogos() {
    const contentRef1 = useRef<HTMLDivElement>(null)
    const contentRef2 = useRef<HTMLDivElement>(null)

    useEffect(() => {



        let x1 = 0
        let x2 = 0

        const el1 = contentRef1.current
        const el2 = contentRef2.current
        if (!el1 || !el2) return

        const speed = 0.5

        const animate = () => {
            // Row 1 → left
            x1 -= speed
            el1.style.transform = `translateX(${x1}px)`
            if (Math.abs(x1) > el1.scrollWidth / 2) {
                x1 = 0
            }

            // Row 2 → right
            x2 += speed
            el2.style.transform = `translateX(${x2}px)`
            if (x2 > el2.scrollWidth / 2) {
                x2 = 0
            }

            requestAnimationFrame(animate)
        }

        animate()




    }, [])


    return (



        <>



            <div className="relative z-10 p-5   flex flex-col justify-center bg-white dark:bg-gray-950 mx-auto">

                <div className="overflow-x-hidden relative w-full ">
                    <div
                        ref={contentRef1}
                        className="flex w-max   items-center "
                    >
                        {[...logos1, ...logos1].map((Icon, idx) => (
                            <div
                                key={idx}
                                className="w-16 md:w-24 h-16 md:h-24 flex justify-center mr-4 items-center  hover:bg-slate-200 dark:hover:bg-slate-900 text-gray-950 dark:text-gray-50 transition-colors"
                            >
                                <Icon key={idx} className="h-9 w-9 md:w-12 md:h-12 text-current" />
                            </div>
                        ))}
                    </div>



                    <div
                        ref={contentRef2}
                        className="flex w-max wrapper mt-4 -translate-x-1/2 items-center "
                    >
                        {[...logos2, ...logos2].map((Icon, idx) => (
                            <div
                                key={idx}
                                className="w-16 md:w-24 h-16 md:h-24 flex justify-center mr-4 items-center  hover:bg-slate-200 dark:hover:bg-slate-900 text-gray-950 dark:text-gray-50 transition-colors"
                            >
                                <Icon key={idx} className="h-9 w-9 md:w-12 md:h-12 text-current" />
                            </div>
                        ))}
                    </div>


                </div>
            </div>


        </>

    )
}


