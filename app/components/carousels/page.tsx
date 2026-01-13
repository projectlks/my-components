"use client";

import { blogPostCarousel } from "@/code/carousels/blog-post";
import SwipeCarousel from "@/comp/carousels/SwipeCarousel";
import CodeBlock from "@/comp/CodeBlock";
import ProjectHeader from "@/comp/ProjectHeader";
import ProjectsSlider from "@/comp/ProjectSlider";
import SectionHeader from "@/comp/SectionHeader";
import { BASE_URL } from "@/libs/env";

export default function Page() {
  return (
    <>
      {/* Header */}
  

      <SectionHeader
        parentLabel="Components"
        parentHref="/components"
        currentLabel="Carousels"
        title="Carousels"
      />


      {/* Content */}
      <div className="px-3 py-4 md:px-4 md:py-4 flex flex-col space-y-8 md:space-y-12">
        <ProjectHeader
          title="Blog Post Carousel"
          link={`${BASE_URL}/components/carousels`}
          view={<ProjectsSlider />}
          code={<CodeBlock code={blogPostCarousel} language="tsx" />}
        />



        <ProjectHeader
          title="Blog Post Carousel"
          link={`${BASE_URL}/components/carousels`}
          view={<SwipeCarousel />}
          code={<CodeBlock code={blogPostCarousel} language="tsx" />}
        />


        {/* <ProjectHeader
          title="Blog Post Carousel"
          link={`${BASE_URL}/components/carousels`}
          view={<HorizontalScrollCarousel />}
          code={<CodeBlock code={blogPostCarousel} language="tsx" />}
        /> */}
      </div>
    </>
  );
}
