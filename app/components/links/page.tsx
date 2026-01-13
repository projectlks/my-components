import { CardLinkCode } from '@/code/links/CardLinkCode'
import CodeBlock from '@/comp/CodeBlock'
import CardLink from '@/comp/links/CardLink'
import HoverImageLinks from '@/comp/links/HoverImageLinks'
import { RevealLinks } from '@/comp/links/RevealLinks'
import ProjectHeader from '@/comp/ProjectHeader'
import SectionHeader from '@/comp/SectionHeader'
import { BASE_URL } from '@/libs/env'
import { LinkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Bars3Icon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
import { JSX } from 'react'

export default function Page() {

    const components: { title: string; href: string; icon: JSX.Element }[] = [
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
    ]
    return (

        <>
            <SectionHeader
                parentLabel="Components"
                parentHref="/components"
                currentLabel="Links"
                title="Links"
            />




            <div className="px-3 py-4 md:px-4 md:py-4 flex flex-col space-y-8 md:space-y-12">



                <ProjectHeader
                    title="Card Link"
                    link={`${BASE_URL}/components/links`}
                    view={<CardLink title='Menus' components={components} />}
                    code={<CodeBlock code={CardLinkCode} language="tsx" />}
                />


                <ProjectHeader
                    title="Card Link"
                    link={`${BASE_URL}/components/links`}
                    view={<RevealLinks />}
                    code={<CodeBlock code={CardLinkCode} language="tsx" />}
                />

                
                <ProjectHeader
                    title="Card Link"
                    link={`${BASE_URL}/components/links`}
                    view={<HoverImageLinks />}
                    code={<CodeBlock code={CardLinkCode} language="tsx" />}
                />
            </div>

        </>


    )
}


