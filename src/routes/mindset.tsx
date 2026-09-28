import { createFileRoute } from '@tanstack/react-router'
import { Search, X, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
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
  const [theme, setTheme] = useState("All");
  const [search, setSearch] = useState("");

  const themes = useMemo(() => {
    const uniqueThemes = Array.from(new Set(quotes.map((q) => q.theme)));
    return ["All", ...uniqueThemes];
  }, [quotes]);

  const themeCounts = useMemo(() => {
    const counts: Record<string, number> = { All: quotes.length };
    quotes.forEach((q) => {
      counts[q.theme] = (counts[q.theme] || 0) + 1;
    });
    return counts;
  }, [quotes]);

  const list = useMemo(() => {
    return quotes.filter((q) => {
      const matchesTheme = theme === "All" || q.theme === theme;
      if (!matchesTheme) return false;
      if (!search.trim()) return true;
      const term = search.toLowerCase();
      return (
        q.text.toLowerCase().includes(term) ||
        q.theme.toLowerCase().includes(term) ||
        (q.caption && q.caption.toLowerCase().includes(term)) ||
        q.author.toLowerCase().includes(term)
      );
    });
  }, [quotes, theme, search]);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Mindset Monday"
          green="Words that move"
          orange="careers forward."
          description="Copy any card for your status, slide deck or study group. New quotes and official flyers land every week."
        />

        {/* Search and filters bar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search quotes, topics, or keywords..."
              className="w-full rounded-full border border-border bg-card py-2 pl-9 pr-9 text-xs outline-none transition-colors focus:border-accent"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Sparkles size={14} className="text-accent" />
            <span>Showing {list.length} of {quotes.length} cards</span>
          </div>
        </div>

        {/* Theme Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {themes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-200 ${
                theme === t
                  ? "border-transparent gradient-accent text-accent-foreground shadow-xs"
                  : "border-border text-muted-foreground hover:border-accent hover:text-accent bg-card"
              }`}
            >
              <span>{t}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[0.65rem] font-bold ${
                  theme === t
                    ? "bg-black/20 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {themeCounts[t] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        {list.length > 0 ? (
          <RevealGroup key={`${theme}-${search}`} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((q) => (
              <RevealItem key={q.id}>
                <QuoteCard quote={q} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <div className="mt-16 rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="font-display text-base font-bold text-primary">No quotes match your search.</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try a different keyword or reset your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setTheme("All");
                setSearch("");
              }}
              className="mt-4 inline-flex rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
