import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Webinar = {
  id: string;
  title: string;
  date: string;
  time: string;
  speaker: string;
  credentials: string;
  zoomLink: string;
  status: "upcoming" | "past";
  summary: string;
};

export type Quote = {
  id: string;
  text: string;
  author: string;
  theme: string;
};

const defaultWebinars: Webinar[] = [
  {
    id: "w1",
    title: "Your Food Degree, Ten Career Doors",
    date: "2026-10-11",
    time: "6:00 PM WAT",
    speaker: "Dr. Adaeze Nwosu",
    credentials: "PhD Food Science, Product Development Lead",
    zoomLink: "https://zoom.us/j/foodewa-careers",
    status: "upcoming",
    summary:
      "A practical roadmap from classroom theory to product development, QA, regulatory affairs and nutrition consulting.",
  },
  {
    id: "w2",
    title: "Food Safety Systems That Actually Pass Audits",
    date: "2026-10-25",
    time: "5:30 PM WAT",
    speaker: "Engr. Tunde Bakare",
    credentials: "HACCP Lead Auditor, ISO 22000 Consultant",
    zoomLink: "https://zoom.us/j/foodewa-safety",
    status: "upcoming",
    summary:
      "Documentation, verification and the small habits that separate a compliant plant from a closed one.",
  },
  {
    id: "w3",
    title: "Nutrition Communication Without the Noise",
    date: "2026-08-16",
    time: "6:00 PM WAT",
    speaker: "Blessing Omofoye",
    credentials: "RDN, Public Health Nutritionist",
    zoomLink: "https://zoom.us/j/foodewa-comms",
    status: "past",
    summary:
      "How to translate evidence into messages families actually act on. Replay and slides available.",
  },
  {
    id: "w4",
    title: "Building a Food Lab on a Student Budget",
    date: "2026-07-12",
    time: "4:00 PM WAT",
    speaker: "Miracle Olaoye",
    credentials: "Lead Web Developer, FoodĒwà Lab",
    zoomLink: "https://zoom.us/j/foodewa-lab",
    status: "past",
    summary:
      "Low-cost instrumentation, open datasets and digital tools for early-career researchers.",
  },
];

const defaultQuotes: Quote[] = [
  {
    id: "q1",
    text: "Your food degree can take you further than the four walls of a laboratory.",
    author: "Pappy",
    theme: "Career Roadmap",
  },
  {
    id: "q2",
    text: "Food safety is not paperwork. It is the promise you keep to a stranger's family.",
    author: "Tunde Bakare",
    theme: "Food Safety",
  },
  {
    id: "q3",
    text: "Nutrition made simple is nutrition that gets practised.",
    author: "Blessing Omofoye",
    theme: "Nutrition Facts",
  },
  {
    id: "q4",
    text: "Start where the equipment is limited. Curiosity scales faster than budgets.",
    author: "Miracle Olaoye",
    theme: "Career Roadmap",
  },
  {
    id: "q5",
    text: "Every label you design is a conversation with someone who is trying to eat better.",
    author: "Damilare Victor",
    theme: "Nutrition Facts",
  },
  {
    id: "q6",
    text: "Discipline in the process room shows up on the shelf life.",
    author: "Phebe",
    theme: "Food Safety",
  },
];

type SiteStore = {
  webinars: Webinar[];
  quotes: Quote[];
  addWebinar: (w: Omit<Webinar, "id" | "status">) => void;
  addQuote: (q: Omit<Quote, "id">) => void;
  resetAll: () => void;
};

const STORAGE_KEY = "foodewa-store-v1";
const SiteStoreContext = createContext<SiteStore | null>(null);

export function SiteStoreProvider({ children }: { children: ReactNode }) {
  const [webinars, setWebinars] = useState<Webinar[]>(defaultWebinars);
  const [quotes, setQuotes] = useState<Quote[]>(defaultQuotes);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { webinars?: Webinar[]; quotes?: Quote[] };
      if (parsed.webinars?.length) setWebinars(parsed.webinars);
      if (parsed.quotes?.length) setQuotes(parsed.quotes);
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ webinars, quotes }));
    } catch {
      /* storage unavailable */
    }
  }, [webinars, quotes]);

  const addWebinar = useCallback((w: Omit<Webinar, "id" | "status">) => {
    const isPast = new Date(w.date).getTime() < Date.now();
    setWebinars((prev) => [
      { ...w, id: crypto.randomUUID(), status: isPast ? "past" : "upcoming" },
      ...prev,
    ]);
  }, []);

  const addQuote = useCallback((q: Omit<Quote, "id">) => {
    setQuotes((prev) => [{ ...q, id: crypto.randomUUID() }, ...prev]);
  }, []);

  const resetAll = useCallback(() => {
    setWebinars(defaultWebinars);
    setQuotes(defaultQuotes);
  }, []);

  const value = useMemo(
    () => ({ webinars, quotes, addWebinar, addQuote, resetAll }),
    [webinars, quotes, addWebinar, addQuote, resetAll],
  );

  return <SiteStoreContext.Provider value={value}>{children}</SiteStoreContext.Provider>;
}

export function useSiteStore() {
  const ctx = useContext(SiteStoreContext);
  if (!ctx) throw new Error("useSiteStore must be used inside SiteStoreProvider");
  return ctx;
}

export function formatEventDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function dateParts(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return { day: "--", month: "" };
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
  };
}
