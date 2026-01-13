"use client";

import { BasicFAQCode } from "@/code/accordions/BasicFAQCode";
import BasicFAQ from "@/comp/accordions/BasicFAQ";
import CodeBlock from "@/comp/CodeBlock";
import ProjectHeader from "@/comp/ProjectHeader";
import SectionHeader from "@/comp/SectionHeader";
import { BASE_URL } from "@/libs/env";

export default function Page() {
  return (
    <>
      {/* Header */}
  

      <SectionHeader
        parentLabel="Components"
        parentHref="/components"
        currentLabel="FAQ"
        title="FAQ"
      />


      {/* Content */}
      <div className="px-3 py-4 md:px-4 md:py-4 flex flex-col space-y-8 md:space-y-12">
        <ProjectHeader
          title="Basic FAQ"
          link={`${BASE_URL}/components/faq`}
          view={<BasicFAQ />}
          code={<CodeBlock code={BasicFAQCode} language="tsx" />}
        />



     
      </div>
    </>
  );
}
