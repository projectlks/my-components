"use client";

import { useEffect, useRef } from "react";
import Prism from "@/libs/prism";
import { toast } from "react-toastify";

type CodeBlockProps = {
  code: string;
  language: "js" | "ts" | "tsx" | "css" | "html";
};

const langMap = {
  js: "javascript",
  ts: "typescript",
  tsx: "tsx",
  css: "css",
  html: "markup",
} as const;


export default function CodeBlock({ code, language }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    toast.success("Code copied successfully! 🎉");
  };

  return (
    <div className="relative h-[60vh] overflow-auto rounded-xl no-scrollbar bg-[#0F172a] px-5 md:px-10 pb-20 no-scrollbar">

      {/* Copy Button */}


      <button
        aria-label="Copy code"
        onClick={handleCopy}
        className="sticky top-5 float-right mb-5 h-11 rounded-lg bg-white/30 p-3 text-lg text-neutral-50 backdrop-blur-md  border-white/20 transition-colors hover:bg-white/40"
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
      <pre className={`language-${langMap[language]} no-scrollbar  m-0!`}>
        <code ref={codeRef} className={`language-${langMap[language]}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}

