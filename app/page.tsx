
import Link from "next/link";
import { ArrowRightIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
      {/* ================= BACKGROUND ================= */}
      <div
        className="absolute inset-0 top-16 z-0 flex items-center justify-center overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {[150, 400, 700, 1000].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-gray-800/10 dark:border-gray-200/10"
            style={{ width: size, height: size }}
          />
        ))}

        {/* Orbit circles */}
        {/* Orbit 1 – Blue */}
        <div className="absolute h-10 w-10 rounded-full bg-blue-400 dark:bg-blue-500 animate-orbit1-alt" />
        <div className="absolute h-12 w-12 rounded-full bg-blue-600 dark:bg-blue-400 animate-orbit1" />

        {/* Orbit 2 – Green */}
        <div className="absolute h-16 w-16 rounded-full bg-green-400 dark:bg-green-500 animate-orbit2" />
        <div className="absolute h-14 w-14 rounded-full bg-green-600 dark:bg-green-400 animate-orbit2-alt" />

        {/* Orbit 3 – Red */}
        <div className="absolute h-20 w-20 rounded-full bg-red-400 dark:bg-red-500 animate-orbit3" />
        <div className="absolute h-16 w-16 rounded-full bg-red-600 dark:bg-red-400 animate-orbit3-alt" />

      </div>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-28 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Beautiful UI Components
            <span className="block text-indigo-600 dark:text-indigo-400">
              for Next.js & Tailwind CSS
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Ready-to-use, copy-paste React components built with Tailwind CSS.
            Fully responsive, accessible, and customizable.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/components"
              className="inline-flex items-center gap-2 rounded bg-indigo-600 px-6 py-3 font-medium text-white  hover:bg-indigo-500"
            >
              Browse Components
              <ArrowRightIcon className="h-5 w-5" />
            </Link>

            <Link
              href="https://github.com/projectlks/my-components"
              className="flex items-center gap-2 rounded border border-gray-300 px-6 py-3 font-medium  hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900 backdrop-blur-xs"
            >
              <GitHubIcon />
              GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-3">
            <Feature
              title="Copy & Paste"
              description="No installation required. Just copy the component code and use it in your project."
              icon={<CopyIcon />}
            />

            <Feature
              title="Tailwind First"
              description="Built entirely with Tailwind CSS so you can customize everything easily."
              icon={<TailwindIcon />}
            />

            <Feature
              title="Dark Mode"
              description="Every component supports dark mode out of the box."
              icon={<MoonIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
            />
          </div>
        </div>
      </section>



      {/* ss */}

      <section className="py-20">
        <h2 className="text-3xl font-bold text-center">Component Categories</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {["Buttons", "Cards", "Modals", "Forms"].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-gray-200 p-6 text-center dark:border-gray-800"
            >
              <h3 className="font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </section>


      {/* ================= FOOTER ================= */}
      <footer>
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Your UI Library. Built with Next.js.
        </div>
      </footer>
    </main>
  );
}

/* ================= FEATURE COMPONENT ================= */
function Feature({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-200/30 p-6 backdrop-blur-xs dark:border-gray-800 dark:bg-gray-900/30">
      <div className="mb-4 flex aspect-square w-12 items-center justify-center rounded border border-gray-300 bg-gray-100/30 text-2xl backdrop-blur-xs dark:border-gray-700 dark:bg-gray-800/30">
        {icon}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

/* ================= ICONS ================= */
function GitHubIcon() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12
        0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
        0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
        C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729
        1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305
        3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
        0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176
        0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405
        1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23
        .645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22
        0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22
        0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57
        C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="h-6 w-6 fill-[#06B6D4]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Tailwind CSS</title>
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624
        C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624
        C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624
        c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624
        C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x={9} y={9} width={13} height={13} rx={2} />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
