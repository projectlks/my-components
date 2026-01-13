import Link from "next/link";

export const RevealLinks = () => {
  return (
    <section className="grid place-content-center gap-2 bg-green-300 dark:bg-green-800 px-8 py-24 text-black dark:text-white">
      <FlipLink href="#">Twitter</FlipLink>
      <FlipLink href="#">Linkedin</FlipLink>
      <FlipLink href="#">Facebook</FlipLink>
      <FlipLink href="#">Instagram</FlipLink>
    </section>
  );
};

const FlipLink = ({ children, href }: { children: string; href: string }) => {
  const DELAY: number = 75;

  return (
    <Link
      href={href}
      className="relative group block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
    >
      {/* Top layer (outgoing letters) */}
      <div>
        {children.split("").map((l, i) => (
          <span
            key={i}
            className={`inline-block transform duration-500 ease-in-out group-hover:-translate-y-[110%] transition-transform text-black dark:text-white`}
            style={{ transitionDelay: `${i * DELAY}ms` }}
          >
            {l}
          </span>
        ))}
      </div>

      {/* Bottom layer (incoming letters) */}
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <span
            key={i}
            className={`inline-block transform translate-y-[110%] duration-500 ease-in-out group-hover:translate-y-0 transition-transform text-black dark:text-white`}
            style={{ transitionDelay: `${i * DELAY}ms` }}
          >
            {l}
          </span>
        ))}
      </div>
    </Link>
  );
};
