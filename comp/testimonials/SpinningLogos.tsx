// import React, { useEffect, useState } from "react";
// import {
//     SiReact,
//     SiNextdotjs,
//     SiJavascript,
//     SiTypescript,
//     SiTailwindcss,
//     SiGit,
//     SiGithub,
// } from "react-icons/si";



// const CircularClock: React.FC = () => {
//     const [rotation, setRotation] = useState<number>(0);
//     const [radius, setRadius] = useState<number>(0);

//     useEffect(() => {
//         const updateRadius = () => {
//             const w = window.innerWidth;
//             setRadius(w < 640 ? (w < 480 ? 102 : 180) : 200);

//         };

//         updateRadius();
//         window.addEventListener("resize", updateRadius);
//         return () => window.removeEventListener("resize", updateRadius);
//     }, []);




//     const items = [
//         { icon: SiReact, color: "#61DAFB" },
//         { icon: SiNextdotjs, color: "#000000" },
//         { icon: SiJavascript, color: "#F7DF1E" },
//         { icon: SiTypescript, color: "#3178C6" },
//         { icon: SiTailwindcss, color: "#06B6D4" },
//         { icon: SiGit, color: "#F05032" },
//         { icon: SiGithub, color: "#181717" },
//     ];

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setRotation((prev) => (prev < 360 ? prev + 0.06 : 0));
//         }, 10);

//         return () => clearInterval(interval);
//     }, []);

//     return (

//         <>

//             <div className="sm:w-125 xs:w-100 w-62.5  justify-center flex items-center relative bg-neutral-100 mx-auto aspect-square rounded-full border border-gray-300">
//                 <div className="sm:w-75 xs:w-62.5 w-40 z-9999 aspect-square flex justify-center items-center rounded-full bg-white border border-gray-300">
//                     <span className="font-bold text-gray-950 text-2xl text-[18px]">
//                         YOUR LOGO
//                     </span>
//                 </div>

//                 <div className="absolute inset-0 flex items-center transition-all justify-center">
//                     {items.map((item, index) => {
//                         // const radius = radius
//                         const angle =
//                             ((index * 360) / items.length + rotation) *
//                             (Math.PI / 180);

//                         const x = Math.cos(angle) * radius;
//                         const y = Math.sin(angle) * radius;

//                         const Icon = item.icon;

//                         return (
//                             <div
//                                 key={index}
//                                 style={{ transform: `translate(${x}px, ${y}px)` }}
//                                 className="sm:w-20 xs:w-16 w-10  aspect-square hover:bg-slate-300 bg- forced-color-adjust-auto  rounded-full absolute flex justify-center items-center"
//                             >
//                                 <Icon
//                                     className="xs:h-9 xs:w-9 md:w-12 md:h-12 w-7 h-7 text-slate-950 "
//                                     style={{ color: item.color }}
//                                 />
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>

//         </>

//     );
// };

// export default CircularClock;

"use client";

import React, { useEffect, useState, useRef } from "react";
import {
    SiReact,
    SiNextdotjs,
    SiJavascript,
    SiTypescript,
    SiTailwindcss,
    SiGit,
    SiGithub,
} from "react-icons/si";

// List of tech icons with their colors
const items = [
    { icon: SiReact, color: "#61DAFB" },
    { icon: SiNextdotjs, color: "#000000" },
    { icon: SiJavascript, color: "#F7DF1E" },
    { icon: SiTypescript, color: "#3178C6" },
    { icon: SiTailwindcss, color: "#06B6D4" },
    { icon: SiGit, color: "#F05032" },
    { icon: SiGithub, color: "#181717" },
];

const CircularClock: React.FC = () => {
    // Refs to measure sizes of container and logo circle
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    // const logoItemRef = useRef<HTMLDivElement>(null);

    // State for rotation angle of icons
    const [rotation, setRotation] = useState(0);

    // Orbit radius (distance from center to icons)
    const [orbitRadius, setOrbitRadius] = useState(0);

    /* ==========================
       Function: calculateOrbitRadius
       Formula:
       orbitRadius = logoRadius + (containerRadius - logoRadius)/2
       Explanation:
       - logoRadius: radius of inner logo circle
       - containerRadius: radius of outer circle
       - This centers icons between logo and outer edge
    ============================ */

    const calculateOrbitRadius = (logoRadius: number, containerRadius: number, ) =>
        logoRadius + (containerRadius - logoRadius ) / 2;

    /* ==========================
       Rotation animation
       - Increment rotation by 0.06 degrees every 10ms
       - Loop back to 0 after reaching 360
    ============================ */
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setRotation((prev) => (prev + 0.06) % 360);
    //     }, 10);
    //     return () => clearInterval(interval);
    // }, []);


    useEffect(() => {
        let frameId: number;
        let lastTime: number | null = null;

        const animate = (time: number) => {
            if (lastTime !== null) {
                // const delta = time - lastTime; // ms
                // const speed = 0.00; // degree per ms, adjust this
                setRotation((prev) => (prev + 0.06) % 360);
            }
            lastTime = time;
            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, []);





    /* ==========================
       Dynamic orbit radius calculation
       - Measure container and logo sizes
       - Update orbitRadius on mount and resize
       - Keeps your design responsive
    ============================ */
    useEffect(() => {
        // container နဲ့ logo circle ရှိကြောင်းစစ်
        if (!containerRef.current || !logoRef.current) return;

        // orbit radius ကို update လုပ်မယ့် function
        const updateRadius = () => {
            // container နဲ့ logo ရဲ့ size ကို သိရန်
            const containerRect = containerRef.current!.getBoundingClientRect();
            const logoRect = logoRef.current!.getBoundingClientRect();
            // const logoItemRect = logoItemRef.current!.getBoundingClientRect();

            // logo radius = logo width ကို 2 နဲ့မျှ
            const logoRadius = logoRect.width / 2;

            // container radius = container width ကို 2 နဲ့မျှ
            const containerRadius = containerRect.width / 2;

            // const logoItemRadius = logoItemRect.width / 2;


            // orbit radius ကို formula နဲ့တွက်
            const radius = calculateOrbitRadius(logoRadius, containerRadius);

            // state ထဲသို့ set လုပ်
            setOrbitRadius(radius);
        };

        // အရင်ဆုံး load အချိန်မှာ တန်ဖိုး update လုပ်
        updateRadius();

        // Resize ဖြစ်ရင် auto update လုပ်ရန် ResizeObserver အသုံးပြု
        const ro = new ResizeObserver(updateRadius);
        ro.observe(containerRef.current); // container ကို observe
        ro.observe(logoRef.current);      // logo circle ကို observe

        // component unmount အချိန်မှာ observer ရပ်
        return () => ro.disconnect();
    }, []);


    return (
        <div
            ref={containerRef}
            className="sm:w-125 xs:w-100 w-62.5 justify-center flex items-center relative bg-neutral-100 mx-auto aspect-square rounded-full border border-gray-300"
        >
            {/* ==========================          Inner Logo Circle      ============================ */}
            <div
                ref={logoRef}
                className="sm:w-75 xs:w-62.5 w-40 z-9999 aspect-square flex justify-center items-center rounded-full bg-white border border-gray-300"
            >
                <span className="font-bold text-gray-950 text-2xl text-[18px]">
                    YOUR LOGO
                </span>
            </div>

            {/* ==========================
          Orbiting Icons Container
          - Positioned absolutely over container
          - All icons rotate around the center
      ============================ */}
            <div className="absolute inset-0 flex items-center justify-center transition-all">
                {items.map((item, index) => {
                    // Calculate angle in radians for each icon
                    const angle = ((index * 360) / items.length + rotation) * (Math.PI / 180);

                    // Convert polar coordinates to x/y for absolute positioning
                    const x = Math.cos(angle) * orbitRadius;
                    const y = Math.sin(angle) * orbitRadius;

                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            /// <reference path="" />
                            // ref={logoItemRef}

                            style={{ transform: `translate(${x}px, ${y}px)` }}
                            className="sm:w-20 xs:w-16 w-10 aspect-square hover:bg-slate-300  forced-color-adjust-auto rounded-full absolute flex justify-center items-center transition"
                        >
                            <Icon
                                className="xs:h-9 xs:w-9 md:w-12 md:h-12 w-7 h-7 text-slate-950"
                                style={{ color: item.color }}
                            />
                        </div>
                    );
                })}




            </div>
        </div>
    );
};

export default CircularClock;
