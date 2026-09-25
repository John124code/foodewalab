import { createFileRoute } from "@tanstack/react-router";
import { Compass, Eye, Linkedin, Target, Twitter } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Team — FoodĒwà Labs" },
      {
        name: "description",
        content:
          "Our aim, vision and mission, what the FoodĒwà Lab represents, and the team behind the community.",
      },
      { property: "og:title", content: "About & Team — FoodĒwà Labs" },
      {
        property: "og:description",
        content: "Meet the people reimagining nutrition and empowering food professionals.",
      },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    icon: Target,
    title: "Our Aim",
    body: "To make food science and nutrition knowledge practical, accessible and career-ready for every student and early-career professional.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "A generation of food professionals who lead innovation in safety, nutrition and product development across Africa and beyond.",
  },
  {
    icon: Compass,
    title: "Our Mission",
    body: "To train, connect and equip through free live sessions, applied lab projects and an active peer community.",
  },
];

const labMeaning = [
  {
    letter: "L",
    title: "Learning",
    body: "Structured, evidence-based content that fills the gap between curriculum and industry practice.",
  },
  {
    letter: "A",
    title: "Applied",
    body: "Hands-on product development, sensory work and data projects run with real briefs.",
  },
  {
    letter: "B",
    title: "Belonging",
    body: "A community where questions are welcome and opportunities get shared, not hoarded.",
  },
];

const team = [
  { group: "Leadership", members: [{ name: "Pappy", role: "Founder & Visionary Lead" }] },
  {
    group: "Programs",
    members: [
      { name: "Blessing Omofoye", role: "Program Coordinator" },
      { name: "Phebe", role: "Program Coordinator" },
    ],
  },
  { group: "Engineering", members: [{ name: "Miracle Olaoye", role: "Lead Web Developer" }] },
  {
    group: "Creative & Content",
    members: [
      { name: "Damilare Victor", role: "Creative Designer" },
      { name: "Faith Samuel", role: "Lead Content Creator & Video Producer" },
      { name: "Iyanuoluwa", role: "Content Creation Officer" },
      { name: "Victory", role: "Content Creation Officer" },
    ],
  },
  {
    group: "Community",
    members: [
      { name: "Temiloluwa", role: "Community Engagement Officer" },
      { name: "Ruth", role: "Community Engagement Officer" },
    ],
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

function AboutPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="About Us"
            green="We exist so a food degree"
            orange="never feels like a dead end."
            description="FoodĒwà Labs is a learning and research community for food scientists, nutritionists and technologists who want their knowledge to travel further than the lecture hall."
          />

          <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
            {principles.map((p) => (
              <RevealItem key={p.title}>
                <div className="surface-card h-full p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
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

      <section className="bg-warm py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="FoodĒwà Lab"
            green="What the Lab"
            orange="actually represents."
          />
          <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
            {labMeaning.map((l) => (
              <RevealItem key={l.letter}>
                <div className="surface-card flex h-full gap-4 p-7">
                  <span className="font-display text-4xl font-extrabold text-accent">
                    {l.letter}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-primary">{l.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.body}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="The Team" green="People behind" orange="the community." />

          <div className="mt-10 space-y-10">
            {team.map((g) => (
              <div key={g.group}>
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-accent">
                  {g.group}
                </h3>
                <RevealGroup className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {g.members.map((m) => (
                    <RevealItem key={m.name}>
                      <div className="surface-card h-full p-6 text-center">
                        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full gradient-green font-display text-lg font-bold text-primary-foreground">
                          {initials(m.name)}
                        </span>
                        <h4 className="mt-4 font-display text-base font-bold text-primary">
                          {m.name}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {m.role}
                        </p>
                        <div className="mt-4 flex justify-center gap-3 text-primary/70">
                          <a
                            href="https://linkedin.com"
                            aria-label={`${m.name} on LinkedIn`}
                            className="hover:text-accent"
                          >
                            <Linkedin size={16} />
                          </a>
                          <a
                            href="https://twitter.com"
                            aria-label={`${m.name} on Twitter`}
                            className="hover:text-accent"
                          >
                            <Twitter size={16} />
                          </a>
                        </div>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
