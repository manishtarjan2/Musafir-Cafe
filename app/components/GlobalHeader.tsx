import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "Books", href: "/books" },
  { label: "Thoughts", href: "/thoughts" },
  { label: "Discover", href: "/discover" },
];

interface GlobalHeaderProps {
  title: string;
}

export default function GlobalHeader({ title }: GlobalHeaderProps) {
  return (
    <header className="flex justify-between items-center p-8 bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10 max-md:flex-col max-md:gap-4 max-md:p-4">
      <h1 className="text-2xl font-bold m-0 text-slate-900 flex items-center gap-2">
        {title}
      </h1>
      <nav className="flex gap-6 font-medium text-sm text-slate-500 max-md:flex-wrap max-md:justify-center">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="no-underline text-inherit hover:text-indigo-600 transition-colors">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
