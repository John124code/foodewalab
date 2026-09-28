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
  flyerImage?: string;
};

export type Quote = {
  id: string;
  text: string;
  author: string;
  theme: string;
  image?: string;
  caption?: string;
};

const defaultWebinars: Webinar[] = [
  {
    id: "building-your-future-in-food-2026",
    title: "BUILDING YOUR FUTURE IN FOOD: Exploring Career Paths in Food Related Studies",
    date: "2026-10-07",
    time: "5:00 PM WAT (UTC +1)",
    speaker: "Mohd Safiyan & Innocent Etobenume",
    credentials: "Food Technologist & Food Scientist / Impact Advocate",
    zoomLink: "https://forms.gle/EyNRURtZjvwyugJJ6",
    status: "upcoming",
    summary:
      "Your course is not your career. It is a starting point. Beyond the classroom are career paths, industries, skills, and opportunities waiting to be explored. Live on Google Meet. Come with your questions. Leave with new possibilities.",
    flyerImage: "/october-webinar.png",
  },
];

const defaultQuotes: Quote[] = [
  {
    id: "mindset-innovation-changing-food",
    text: "INNOVATION IS CHANGING FOOD: Science + Technology + Creativity = New Possibilities.",
    author: "FoodĒwà Labs",
    theme: "Food Innovation",
    image: "/mindset/innovation-is-changing-food.jpg",
    caption:
      "Innovation has started. The way we produce, process, package, distribute, and experience food is changing. At FoodĒwà, we believe the future of food is something we can build.",
  },
  {
    id: "mindset-degree-take-you-further-fitness",
    text: "Your Food Degree Can Take You Further.",
    author: "FoodĒwà Labs",
    theme: "Career Development",
    image: "/mindset/your-food-degree-can-take-you-further.png",
    caption:
      "Don’t limit your career before you explore it. Food science and related fields can lead to research, industry, public health, product development, and so much more. Explore. Learn. Discover your path.",
  },
  {
    id: "mindset-passport-meaningful-career",
    text: "Your food degree is more than a certificate — it can be a passport to many meaningful career paths.",
    author: "FoodĒwà Labs",
    theme: "Nutrition & Health",
    image: "/mindset/nutrition-made-simple-clinical.jpg",
    caption:
      "From nutrition and food safety to product development, research, quality control, public health, entrepreneurship and beyond. Don’t limit your degree to one career path.",
  },
  {
    id: "mindset-myth-or-fact-food-safety",
    text: "MYTH OR FACT? If food smells fine, it is safe to eat.",
    author: "FoodĒwà Labs",
    theme: "Food Safety",
    image: "/mindset/myth-or-fact-food-smell.png",
    caption:
      "Myth or fact? The truth might surprise you! A food can look, smell, and even taste normal while still containing harmful microorganisms or toxins. Let's bust common food-safety myths and make smarter choices.",
  },
  {
    id: "mindset-smart-kitchen-habits",
    text: "SMART KITCHEN HABITS: Clean Is Not The Same As Safe.",
    author: "FoodĒwà Labs",
    theme: "Food Safety",
    image: "/mindset/smart-kitchen-habits.png",
    caption:
      "A clean kitchen doesn’t always mean safe food. Food safety starts with daily habits, not just a clean-looking kitchen. Small habits can prevent big problems.",
  },
  {
    id: "mindset-science-behind-what-you-eat",
    text: "The Science behind what you Eat: Taste, Preservation, Safety.",
    author: "FoodĒwà Labs",
    theme: "Food Science",
    image: "/mindset/science-behind-what-you-eat.jpg",
    caption:
      "Food is more than taste — it’s science in action. That crunch, colour, flavour, texture, and shelf life didn’t happen by accident. Behind every bite are food scientists working to make what we eat safer and more nutritious.",
  },
  {
    id: "mindset-should-food-colouring-be-banned",
    text: "FOOD THINK FRIDAY: Should Food Colouring be Banned?",
    author: "FoodĒwà Labs",
    theme: "Food Safety",
    image: "/mindset/should-food-colouring-be-banned.png",
    caption:
      "Food colouring makes products more attractive, but should appearance outweigh safety? Some have restrictions, some remain controversial. Should it be banned, or simply better regulated?",
  },
];

type SiteStore = {
  webinars: Webinar[];
  quotes: Quote[];
  addWebinar: (w: Omit<Webinar, "id" | "status">) => void;
  addQuote: (q: Omit<Quote, "id">) => void;
  resetAll: () => void;
};

const STORAGE_KEY = "foodewa-store-v10";
const SiteStoreContext = createContext<SiteStore | null>(null);

export function SiteStoreProvider({ children }: { children: ReactNode }) {
  const [webinars, setWebinars] = useState<Webinar[]>(defaultWebinars);
  const [quotes, setQuotes] = useState<Quote[]>(defaultQuotes);

  useEffect(() => {
    try {
      // Purge all legacy cache keys that held dummy demo events and quotes
      [
        "foodewa-store-v1",
        "foodewa-store-v2",
        "foodewa-store-v3",
        "foodewa-store-v4",
        "foodewa-store-v5",
        "foodewa-store-v6",
        "foodewa-store-v7",
        "foodewa-store-v8",
        "foodewa-store-v9",
      ].forEach((k) => window.localStorage.removeItem(k));

      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { webinars?: Webinar[]; quotes?: Quote[] };
      const cleaned = parsed.webinars?.filter(
        (w) => !["w1", "w2", "w3", "w4", "w-oct-2026"].includes(w.id)
      );
      if (cleaned && cleaned.length > 0) {
        setWebinars(cleaned);
      } else {
        setWebinars(defaultWebinars);
      }

      const cleanedQuotes = parsed.quotes?.filter(
        (q) => !["q1", "q2", "q3", "q4", "q5", "q6"].includes(q.id)
      );
      if (cleanedQuotes && cleanedQuotes.length > 0) {
        setQuotes(cleanedQuotes);
      } else {
        setQuotes(defaultQuotes);
      }
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
