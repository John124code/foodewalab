import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, FlaskConical, Newspaper, Users } from "lucide-react";
import { HeroVideo } from "@/components/site/HeroVideo";
import { QuoteCard } from "@/components/site/QuoteCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { WebinarCard } from "@/components/site/WebinarCard";
import { useSiteStore } from "@/lib/site-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FoodĒwà Labs — Reimagining Nutrition. Empowering Food Professionals." },
      {
        name: "description",
        content:
          "Join FoodĒwà Labs for free webinars, Mindset Monday quotes and a community built for food scientists and nutritionists.",
      },
      {
        property: "og:title",
        content: "FoodĒwà Labs — Reimagining Nutrition. Empowering Food Professionals.",
      },
      {
        property: "og:description",
        content:
          "Free webinars, mindset resources and a growing community for food professionals.",
      },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    icon: BookOpen,
    title: "Education & Training",
    body: "Live webinars, short courses and career clinics that translate food science theory into employable skill.",
  },
  {
    icon: FlaskConical,
    title: "FoodĒwà Lab",
    body: "Applied research, product development sprints and open data projects run with student and early-career teams.",
  },
  {
    icon: Users,
    title: "Community Hub",
    body: "A peer network of nutritionists, technologists and QA professionals sharing roles, briefs and mentorship.",
  },
];

function Index() {
  const { webinars, quotes } = useSiteStore();
  const nextWebinar = webinars.find((w) => w.status === "upcoming");
  const featuredQuote = quotes[0];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-soft blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-primary"
            >
              <Newspaper size={14} className="text-accent" /> Industry Insight & News
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-4xl font-extrabold leading-[1.08] text-primary sm:text-5xl lg:text-[3.4rem]"
            >
              Reimagining Nutrition.{" "}
              <span className="text-accent">Empowering Food Professionals.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
            >
              FoodĒwà Labs turns food science, nutrition and technology knowledge into real career
              momentum — through free live sessions, applied lab work and a community that answers
              when you ask.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Join Community <ArrowRight size={16} />
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                Explore Webinars
              </Link>
            </motion.div>
          </div>

          <HeroVideo />
        </div>
      </section>

      <section className="bg-warm py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Mindset Monday"
            green="Spotlight for the week,"
            orange="straight from the community."
          />
          {featuredQuote ? (
            <Reveal delay={0.1} className="mt-8 max-w-2xl">
              <QuoteCard quote={featuredQuote} featured />
            </Reveal>
          ) : null}
        </div>
      </section>

      {nextWebinar ? (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading
              eyebrow="Upcoming Webinar"
              green="Next live session"
              orange="is free to attend."
            />
            <Reveal delay={0.1} className="mt-8">
              <WebinarCard webinar={nextWebinar} />
            </Reveal>
            <Reveal delay={0.2} className="mt-6">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
              >
                See all sessions and replays <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="bg-warm py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Core Pillars"
            green="Three ways we build"
            orange="food professionals."
            align="center"
          />
          <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <RevealItem key={p.title}>
                <div className="surface-card h-full p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <p.icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-primary">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
