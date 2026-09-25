import { createFileRoute } from "@tanstack/react-router";
import { CalendarPlus, QuoteIcon, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useSiteStore } from "@/lib/site-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Team Portal — FoodĒwà Labs" },
      {
        name: "description",
        content:
          "Internal FoodĒwà Labs portal for publishing new webinars and Mindset Monday quotes.",
      },
      { property: "og:title", content: "Team Portal — FoodĒwà Labs" },
      {
        property: "og:description",
        content: "Add webinars and quotes that appear across the FoodĒwà Labs website.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const emptyWebinar = {
  title: "",
  date: "",
  time: "",
  speaker: "",
  credentials: "",
  zoomLink: "",
  summary: "",
};
const emptyQuote = { text: "", author: "", theme: "Career Roadmap" };

function AdminPage() {
  const { addWebinar, addQuote, resetAll, webinars, quotes } = useSiteStore();
  const [w, setW] = useState(emptyWebinar);
  const [q, setQ] = useState(emptyQuote);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading
          eyebrow="Team Portal"
          green="Publish once,"
          orange="it shows up everywhere."
          description="Anything added here appears immediately on the Home, Events and Mindset pages and is saved in this browser."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <form
              className="surface-card space-y-3 p-7"
              onSubmit={(e) => {
                e.preventDefault();
                addWebinar(w);
                setW(emptyWebinar);
                toast.success("Webinar published to the Events page.");
              }}
            >
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-primary">
                <CalendarPlus size={18} className="text-accent" /> Add a webinar
              </h3>
              <Input label="Title" value={w.title} onChange={(v) => setW({ ...w, title: v })} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Date"
                  type="date"
                  value={w.date}
                  onChange={(v) => setW({ ...w, date: v })}
                />
                <Input
                  label="Time"
                  value={w.time}
                  placeholder="6:00 PM WAT"
                  onChange={(v) => setW({ ...w, time: v })}
                />
              </div>
              <Input
                label="Speaker"
                value={w.speaker}
                onChange={(v) => setW({ ...w, speaker: v })}
              />
              <Input
                label="Speaker credentials"
                value={w.credentials}
                onChange={(v) => setW({ ...w, credentials: v })}
              />
              <Input
                label="Zoom link"
                value={w.zoomLink}
                placeholder="https://zoom.us/j/..."
                onChange={(v) => setW({ ...w, zoomLink: v })}
              />
              <Input
                label="Short summary"
                value={w.summary}
                onChange={(v) => setW({ ...w, summary: v })}
              />
              <button
                type="submit"
                className="inline-flex rounded-full gradient-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
              >
                Publish webinar
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <form
              className="surface-card space-y-3 p-7"
              onSubmit={(e) => {
                e.preventDefault();
                addQuote(q);
                setQ(emptyQuote);
                toast.success("Quote added to Mindset Monday.");
              }}
            >
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-primary">
                <QuoteIcon size={18} className="text-accent" /> Add a mindset quote
              </h3>
              <label className="block text-sm">
                <span className="font-medium text-primary">Quote text</span>
                <textarea
                  required
                  rows={4}
                  value={q.text}
                  onChange={(e) => setQ({ ...q, text: e.target.value })}
                  className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
              </label>
              <Input label="Author" value={q.author} onChange={(v) => setQ({ ...q, author: v })} />
              <label className="block text-sm">
                <span className="font-medium text-primary">Theme</span>
                <select
                  value={q.theme}
                  onChange={(e) => setQ({ ...q, theme: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
                >
                  <option>Career Roadmap</option>
                  <option>Food Safety</option>
                  <option>Nutrition Facts</option>
                </select>
              </label>
              <button
                type="submit"
                className="inline-flex rounded-full gradient-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
              >
                Publish quote
              </button>
            </form>
          </Reveal>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-border p-5 text-sm text-muted-foreground">
          <span>
            Currently live: {webinars.length} webinars · {quotes.length} quotes
          </span>
          <button
            type="button"
            onClick={() => {
              resetAll();
              toast("Content reset to the defaults.");
            }}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-semibold text-primary hover:border-accent hover:text-accent"
          >
            <RotateCcw size={15} /> Reset content
          </button>
        </div>
      </div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-primary">{label}</span>
      <input
        required
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}
