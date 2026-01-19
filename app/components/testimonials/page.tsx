"use client";

import { DoubleScrollingLogosCode } from "@/code/testimonials/DoubleScrollingLogosCode";
import CodeBlock from "@/comp/CodeBlock";
import ProjectHeader from "@/comp/ProjectHeader";
import SectionHeader from "@/comp/SectionHeader";
import DoubleScrollingLogos from "@/comp/testimonials/DoubleScrollingLogos";
import SpinningLogos from "@/comp/testimonials/SpinningLogos";
import { BASE_URL } from "@/libs/env";

export default function Page() {
    return (
        <>
            {/* Header */}


            <SectionHeader
                parentLabel="Components"
                parentHref="/components"
                currentLabel="Testimonials"
                title="Testimonials"
            />


            {/* Content */}
            <div className="px-3 py-4 md:px-4 md:py-4 flex flex-col space-y-8 md:space-y-12">
                <ProjectHeader
                    title="Double Scrolling Logos"
                    link={`${BASE_URL}/components/testimonials`}
                    view={<DoubleScrollingLogos />}
                    code={<CodeBlock code={DoubleScrollingLogosCode} language="tsx" />}
                />



                <ProjectHeader
                    title="Double Scrolling Logos"
                    link={`${BASE_URL}/components/testimonials`}
                    view={<SpinningLogos />}
                    code={<CodeBlock code={DoubleScrollingLogosCode} language="tsx" />}
                />


            </div>
        </>
    );
}
