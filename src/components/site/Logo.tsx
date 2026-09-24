import { Link } from "@tanstack/react-router";

export function Logo({ withTagline = false }: { withTagline?: boolean }) {
  return (
    <Link to="/" className="group inline-flex flex-col leading-none">
      <span className="flex items-center gap-2">
        <span className="font-display text-2xl font-extrabold tracking-tight">
          <span className="text-accent">Food</span>
          <span className="text-primary">Ēwà</span>
        </span>
        <span className="rounded-full bg-primary px-2 py-0.5 font-display text-[0.6rem] font-bold uppercase tracking-[0.18em] text-primary-foreground">
          Labs
        </span>
      </span>
      {withTagline ? (
        <span className="mt-1.5 text-[0.7rem] font-medium tracking-wide text-muted-foreground">
          Reimagining Nutrition, Empowering People
        </span>
      ) : null}
    </Link>
  );
}
