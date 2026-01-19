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

        <div className=" flex bg-white dark:bg-gray-950 h-full ">


            {/* NAV BAR */}
            <SideBar />


            {/* MAIN CONTENT */}



            <main className="flex-1  h-full overflow-y-auto">

                {children}
            </main>


        </div>

        // </div>
        // </ReactLenis>
    )
}
