import BasicFAQ from '@/comp/accordions/BasicFAQ'
import SectionHeader from '@/comp/SectionHeader'
import { BASE_URL } from "@/libs/env";
import ProjectHeader from '@/comp/ProjectHeader';
import CodeBlock from '@/comp/CodeBlock';
import { BasicFAQCode } from '@/code/accordions/BasicFAQCode';
import { AccordionSolutionsCode } from '@/code/accordions/AccordionSolutionsCode';
import AccordionSolutions from '@/comp/accordions/AccordionSolutions';
import VerticalAccordion from '@/comp/carousels/VerticalAccordion';


export default function page() {
    return (
        <>

            <SectionHeader
                parentLabel="Components"
                parentHref="/components"
                currentLabel="Accordions"
                title="Accordions"
            />


            <div className="px-3 py-4 md:px-4 md:py-4 flex flex-col space-y-8 md:space-y-12">


                <ProjectHeader
                    title="Vertical Accordion"
                    link={`${BASE_URL}/components/accordions`}
                    view={<VerticalAccordion />}
                    code={<CodeBlock code={BasicFAQCode} language="tsx" />}
                />


                <ProjectHeader
                    title="Basic FAQ"
                    link={`${BASE_URL}/components/accordions`}
                    view={<BasicFAQ />}
                    code={<CodeBlock code={BasicFAQCode} language="tsx" />}
                />


                <ProjectHeader
                    title="Accordion Solutions"
                    link={`${BASE_URL}/components/accordions`}
                    view={<AccordionSolutions />}
                    code={<CodeBlock code={AccordionSolutionsCode} language="tsx" />} />






            </div>

            {/* <BasicFAQ /> */}
        </>
    )
}
