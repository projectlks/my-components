"use client";
import CardLink from '@/comp/links/CardLink';
import { Bars3Icon, ChevronDoubleRightIcon, ChevronDownIcon, LinkIcon } from '@heroicons/react/24/outline'


const components = [
  { title: "Carousels", href: "/components/carousels", icon: <ChevronDoubleRightIcon className="h-5 w-5" /> },
  { title: "Buttons", href: "/components/buttons", icon: <ChevronDoubleRightIcon className="h-5 w-5" /> },
]


export default function page() {




  return (
    <div className="px-3 py-4 md:px-4 md:py-6 mx-auto max-w-6xl ">



      <h2 className="mb-4 mt-4 text-3xl font-semibold md:mt-0 md:text-4xl" >All Components</h2>


      <p
        className="mb-2 max-w-2xl text-md text-gray-600 dark:text-gray-400"
        style={{ opacity: 1, transform: "none" }}
      >
        Components are built with{" "}
        <a
          className="text-indigo-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://nextjs.org/"
        >
          Next
        </a>
        ,{" "}
        <a
          className="text-indigo-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://tailwindcss.com/"
        >
          Tailwind CSS
        </a>
        , and some combination of{" "}

        vanilla JS animations, keyframes animations, or another popular, stable
        JavaScript animation library. We do our best to keep everything up to date
        with the latest version of each package, but{" "}
        <a
          className="font-bold hover:underline"
          href="#"
        >
          let us know
        </a>{" "}
        if you run into any problems.
      </p>
      <div className='mt-8'>


        <CardLink title="Popular" components={components} />


        <CardLink title='Components' components={[
          {
            title: 'Navbars',
            href: '/components/navbars',
            icon: <Bars3Icon className="size-5" />
          },
          {
            title: 'Carousels',
            href: '/components/carousels',
            icon: <ChevronDoubleRightIcon className="size-5" />
          },
          {
            title: 'Accordions',
            href: '/components/accordions',
            icon: <ChevronDownIcon className="size-5" />
          },

          {
            title: 'Links',
            href: '/components/links',
            icon: <LinkIcon className="size-5" />
          },
        ]} />
      </div>




    </div>
  )
}



