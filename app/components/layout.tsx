import SideBar from '@/comp/sidebar/SideBar'
import TopBar from '@/comp/TopBar'
import React from 'react'

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-screen h-screen overflow-hidden">
            {/* TOP BAR */}
            <TopBar />

            <div className=" flex h-[calc(100vh-64px)] ">


                {/* NAV BAR */}
                <SideBar />


                {/* MAIN CONTENT */}
                <main className="flex-1 max-h-full overflow-y-auto">

                    {children}
                </main>

            </div>

        </div>
    )
}
