
export const CardLinkCode = `

"use client"

import { ChevronDoubleRightIcon, ChevronDownIcon, LinkIcon, Bars3Icon } from "@heroicons/react/24/outline"
import Link from "next/link"
import React from "react"

interface ComponentItem {
  title: string
  href: string
  icon: React.ReactNode
}

const components: ComponentItem[] = [
  {
    title: "Navbars",
    href: "/components/navbars",
    icon: <Bars3Icon className="size-5" />,
  },
  {
    title: "Carousels",
    href: "/components/carousels",
    icon: <ChevronDoubleRightIcon className="size-5" />,
  },
  {
    title: "Accordions",
    href: "/components/accordions",
    icon: <ChevronDownIcon className="size-5" />,
  },
  {
    title: "Links",
    href: "/components/links",
    icon: <LinkIcon className="size-5" />,
  },
]

const CardLink = () => {
  return (
    <>
 <div className="my-8 @container max-w-6xl mx-auto ">
        <h2 className="mb-5 text-xl font-semibold">MENU</h2>

        <div className="grid grid-cols-1 gap-4     @md:grid-cols-2 
      @2xl:grid-cols-3 @4xl:grid-cols-4 
  " >
          {components
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((component) => (
              <CardLinkItem
                key={component.title}
                title={component.title}
                href={component.href}
                icon={component.icon}
              />
            ))}
        </div>
      </div>


      {/* CSS Animation */}
      <style>{\`        @keyframes disk-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .disk-spin {
          animation: disk-spin 8s linear infinite;
          transform-origin: center;
          will-change: transform;
          animation-play-state: paused;
        }

        .group:hover .disk-spin {
          animation-play-state: running;
        }
      \`}</style>

    </>
  )
}

interface CardLinkItemProps {
  title: string
  href: string
  icon: React.ReactNode
}

const CardLinkItem = ({ title, href, icon }: CardLinkItemProps) => {
  return (
    <Link
      href={href}
      className="
        group relative w-full overflow-hidden
        rounded-tr-3xl
        border border-gray-200 dark:border-gray-800
        bg-white dark:bg-gray-950
        p-6 transition-transform duration-300
        hover:-translate-x-1 hover:-translate-y-1
        hover:border-indigo-500 dark:hover:border-indigo-400
        hover:shadow-[6px_6px_0_0_rgba(99,102,241,0.25)]
        dark:hover:shadow-[6px_6px_0_0_rgba(99,102,241,0.35)]
      "
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className="
            flex h-11 min-w-11 items-center justify-center
            rounded-full
            border border-gray-300 dark:border-gray-700
            text-indigo-500 dark:text-indigo-400
            disk-spin
            group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40
            group-hover:border-indigo-500 dark:group-hover:border-indigo-400
          "
        >
          {icon}
        </div>

        {/* Text */}
        <div className="relative">
          <h1 className="text-xl font-bold capitalize text-gray-900  dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {title}
          </h1>
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full" />
        </div>
      </div>


    </Link>
  )
}

export default CardLink



`
