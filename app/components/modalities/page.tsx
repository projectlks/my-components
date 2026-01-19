import { DoubleScrollingLogosCode } from '@/code/testimonials/DoubleScrollingLogosCode'
import CodeBlock from '@/comp/CodeBlock'
import ModalitiesSection from '@/comp/modalities/ModalitiesSection'
import ProjectHeader from '@/comp/ProjectHeader'
import SectionHeader from '@/comp/SectionHeader'
import { BASE_URL } from '@/libs/env'

export default function page() {
    return (
        <>


            <SectionHeader
                parentLabel="Components"
                parentHref="/components"
                currentLabel="Modalities"
                title="Modalities"
            />

            <div className="px-3 py-4 md:px-4 md:py-4 flex flex-col space-y-8 md:space-y-12">
                <ProjectHeader
                    title="ModalitiesSection"
                    link={`${BASE_URL}/components/modalities`}
                    view={<ModalitiesSection />}
                    code={<CodeBlock code={DoubleScrollingLogosCode} language="tsx" />}
                />





            </div>

        </>

    )
}
