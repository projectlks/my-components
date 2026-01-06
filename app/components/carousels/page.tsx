"use client";

import { blogPostCarousel } from "@/code/carousels/blog-post";
import SwipeCarousel from "@/comp/carousels/SwipeCarousel";
import CodeBlock from "@/comp/CodeBlock";
import ProjectHeader from "@/comp/ProjectHeader";
import ProjectsSlider from "@/comp/ProjectSlider";
import { BASE_URL } from "@/libs/env";

export default function Page() {
  return (
    <>
      {/* Header */}
      <div className="mb-2 mt-6 flex w-full items-center justify-between gap-8 px-2 md:px-4">
        <div>
          <p className="line-clamp-1 text-sm text-neutral-500">
            <a className="hover:underline" href="/components">
              Components
            </a>
            <span className="cursor-default"> / Carousels</span>
          </p>

          <h3 className="text-4xl font-semibold">Carousels</h3>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 py-4 md:px-4 md:py-4 flex flex-col space-y-8 md:space-y-12">
        <ProjectHeader
          title="Blog Post Carousel"
          link={`${BASE_URL}/components/carousels`}
          view={<ProjectsSlider />}
          code={<CodeBlock code={blogPostCarousel} language="ts" />}
        />



        <ProjectHeader
          title="Blog Post Carousel"
          link={`${BASE_URL}/components/carousels`}
          view={<SwipeCarousel />}
          code={<CodeBlock code={blogPostCarousel} language="ts" />}
        />


        {/* <ProjectHeader
          title="Blog Post Carousel"
          link={`${BASE_URL}/components/carousels`}
          view={<HorizontalScrollCarousel />}
          code={<CodeBlock code={blogPostCarousel} language="ts" />}
        /> */}
      </div>
    </>
  );
}
