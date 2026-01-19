"use client";

import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function BackBtn() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer mr-4"
      role="button"
      tabIndex={0}
      aria-label="Go back"
      onKeyDown={(e) => e.key === 'Enter' && router.back()}
    >
      <ChevronLeftIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-100" aria-hidden="true" />
    </div>

  );
}
