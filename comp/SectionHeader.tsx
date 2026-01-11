"use client";

import Link from "next/link";

type SectionHeaderProps = {
  parentLabel: string;
  parentHref: string;
  currentLabel: string;
  title: string;
};

export default function SectionHeader({
  parentLabel,
  parentHref,
  currentLabel,
  title,
}: SectionHeaderProps) {
  return (
    <div className="mb-2 mt-6 flex w-full items-center justify-between gap-8 px-2 md:px-4">
      <div>
        <p className="line-clamp-1 text-sm text-neutral-500">
          <Link href={parentHref} className="hover:underline">
            {parentLabel}
          </Link>
          <span className="cursor-default"> / {currentLabel}</span>
        </p>

        <h3 className="text-4xl font-semibold">{title}</h3>
      </div>
    </div>
  );
}


