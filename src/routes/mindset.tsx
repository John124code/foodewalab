import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QuoteCard } from "@/components/site/QuoteCard";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useSiteStore } from "@/lib/site-store";

export const Route = createFileRoute("/mindset")({
  head: () => ({
    meta: [
      { title: "Mindset & Quotes — FoodĒwà Labs" },
      {
        name: "description",
        content:
          "Mindset Monday quote cards on career roadmaps, food safety and nutrition facts — copy or share in one click.",
      },
      { property: "og:title", content: "Mindset & Quotes — FoodĒwà Labs" },
      {
        property: "og:description",
        content: "Shareable motivation for food professionals, refreshed every Monday.",
      },
    ],
  }),
  component: MindsetPage,
});

function MindsetPage() {
  const { quotes } = useSiteStore();
  const themes = ["All", ...Array.from(new Set(quotes.map((q) => q.theme)))];
  const [theme, setTheme] = useState("All");
  const list = theme === "All" ? quotes : quotes.filter((q) => q.theme === theme);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Mindset Monday"
          green="Words that move"
          orange="careers forward."
          description="Copy any card for your status, slide deck or study group. New quotes land every week."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {themes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                theme === t
                  ? "border-transparent gradient-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <RevealGroup key={theme} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((q) => (
            <RevealItem key={q.id}>
              <QuoteCard quote={q} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
