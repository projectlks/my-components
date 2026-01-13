import SideBar from '@/comp/sidebar/SideBar'

import React from 'react'

// import { ReactLenis } from "@studio-freight/react-lenis";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        // <ReactLenis root>
        // <div className="w-screen h-screen overflow-hidden">
        //     {/* TOP BAR */}
        //     <TopBar />

        <div className=" flex h-[calc(100vh-68px)] bg-white dark:bg-black ">


            {/* NAV BAR */}
            <SideBar />


            {/* MAIN CONTENT */}



            <main className="flex-1 max-h-full overflow-y-auto">

                {children}
            </main>


        </div>

        // </div>
        // </ReactLenis>
    )
}
