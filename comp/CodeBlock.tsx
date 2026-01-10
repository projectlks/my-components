"use client";

import { useEffect } from "react";
import Prism from "prismjs";

// languages
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";

// theme
import "prismjs/themes/prism-tomorrow.css";

import { toast } from "react-toastify";

type CodeBlockProps = {
  code: string;
  language: "js" | "ts" | "css" | "html";
};

export default function CodeBlock({ code, language }: CodeBlockProps) {

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    toast.success("Code copied successfully! 🎉");

  };

  return (
    <div className="relative rounded-lg h-[60vh] no-scrollbar overflow-auto bg-[#2d2d2d] px-5 md:px-10 pb-20  ">
      {/* Sticky button */}


     <button
        onClick={handleCopy}
        className="sticky top-5 float-right mb-5 h-11 rounded bg-neutral-600  p-3 text-lg text-neutral-50 transition-colors hover:bg-neutral-500"
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </button>
 

      {/* Code */}


      <pre className="m-0 whitespace-pre-wrap wrap-break-words no-scrollbar ">
        <code className={`language-${language} wrap-break-words`}>
          {code}
        </code>
      </pre>

    </div>

  );
}
