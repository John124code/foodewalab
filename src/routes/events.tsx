import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { WebinarCard } from "@/components/site/WebinarCard";
import { useSiteStore } from "@/lib/site-store";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Webinars — FoodĒwà Labs" },
      {
        name: "description",
        content:
          "Upcoming live sessions and past replays for food scientists and nutritionists. RSVP free to any FoodĒwà Labs webinar.",
      },
      { property: "og:title", content: "Events & Webinars — FoodĒwà Labs" },
      {
        property: "og:description",
        content: "Live sessions, speaker bios and replays from the FoodĒwà Labs community.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { webinars } = useSiteStore();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const list = webinars.filter((w) => w.status === tab);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading
          eyebrow="Events"
          green="Learn live,"
          orange="then keep the replay."
          description="Every FoodĒwà session is free. Reserve a seat for what is coming, or catch up on what you missed."
        />

        <div className="mt-8 inline-flex rounded-full border border-border bg-card p-1">
          {(
            [
              ["upcoming", "Upcoming Live Sessions"],
              ["past", "Past Replays & Slides"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                tab === key
                  ? "gradient-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <RevealGroup key={tab} className="mt-8 grid gap-5">
          {list.map((w) => (
            <RevealItem key={w.id}>
              <WebinarCard webinar={w} />
            </RevealItem>
          ))}
          {list.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              <p className="font-display text-base font-semibold text-primary">No past replays yet</p>
              <p className="mt-1 text-sm">
                This October 7 webinar is FoodĒwà Labs' inaugural event! Make sure to reserve your seat for our first live session.
              </p>
              <button
                type="button"
                onClick={() => setTab("upcoming")}
                className="mt-4 inline-flex items-center gap-2 rounded-full gradient-accent px-5 py-2 text-xs font-semibold text-accent-foreground"
              >
                View Upcoming Event
              </button>
            </div>
          ) : null}
        </RevealGroup>
      </div>
    </section>
  );
}
