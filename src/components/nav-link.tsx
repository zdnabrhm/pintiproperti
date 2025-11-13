interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <a href={href} className="group relative block text-sm lg:text-base">
      {children}
      <span
        className="text-primary absolute top-0 left-0 transition-[clip-path] duration-700 will-change-transform [clip-path:polygon(0%_100%,100%_100%,100%_100%,0%_100%)] group-hover:duration-500 group-hover:[clip-path:polygon(0%_100%,100%_100%,100%_0%,0%_0%)]"
        aria-hidden="true"
      >
        {children}
      </span>
    </a>
  );
}
