import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  green,
  orange,
  description,
  align = "left",
}: {
  eyebrow?: string;
  green: string;
  orange?: string;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 font-display text-[0.68rem] font-bold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] text-primary sm:text-4xl">
        {green} {orange ? <span className="text-accent">{orange}</span> : null}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  );
}
