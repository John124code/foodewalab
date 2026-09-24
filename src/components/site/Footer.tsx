import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-warm">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo withTagline />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A learning community for food scientists, nutritionists and technologists building
            careers that reach beyond the laboratory bench.
          </p>
        </div>

        <div className="flex flex-wrap gap-10">
          <div className="flex flex-col gap-2 text-sm">
            <span className="font-display font-semibold text-primary">Explore</span>
            <Link to="/about" className="text-muted-foreground hover:text-accent">
              About & Team
            </Link>
            <Link to="/events" className="text-muted-foreground hover:text-accent">
              Events & Webinars
            </Link>
            <Link to="/mindset" className="text-muted-foreground hover:text-accent">
              Mindset Monday
            </Link>
            <Link to="/admin" className="text-muted-foreground hover:text-accent">
              Team Portal
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span className="font-display font-semibold text-primary">Connect</span>
            <a
              href="mailto:hello@foodewalabs.com"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent"
            >
              <Mail size={15} /> hello@foodewalabs.com
            </a>
            <div className="mt-1 flex gap-3 text-primary">
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-accent">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-accent">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-accent">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border/70 px-5 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FoodĒwà Labs. Reimagining Nutrition, Empowering People.
      </div>
    </footer>
  );
}
