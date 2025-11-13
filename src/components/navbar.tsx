import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/nav-link";

export function Navbar() {
  return (
    <header>
      <nav
        aria-label="Global"
        className="font-montserrat flex items-baseline justify-between p-5 py-6 lg:px-8"
      >
        {/* Logo */}
        <a href="/#" className="-m-1.5 p-1.5 font-semibold lg:text-xl">
          <span className="sr-only">Pinti Properti</span>
          Pinti Properti
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-baseline lg:flex lg:gap-x-12">
          <NavLink href="/#">About</NavLink>
          <NavLink href="/#">Services</NavLink>
          <NavLink href="/#">Testimonials</NavLink>
          <Button asChild className="bg-accent">
            <a href="/#">
              Contact Us <span aria-hidden="true">&rarr;</span>
            </a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <Button asChild className="bg-accent text-sm">
            <a href="/#">
              Contact Us <span aria-hidden="true">&rarr;</span>
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}
