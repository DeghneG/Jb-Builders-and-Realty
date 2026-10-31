import { SITE, SERVICES, PROJECTS } from "./data";

export type Reply = {
  text: string;
  chips?: string[];
  links?: { label: string; href: string }[];
};

export const GREETING: Reply = {
  text: "Hi! I'm the JB Builders and Realty assistant. I can tell you about our services, projects, Build Now, Pay Later, and how to reach us.",
  chips: ["What services do you offer?", "Build Now, Pay Later", "Show your projects", "How do I contact you?"],
};

const MORE_CHIPS = ["Services", "Projects", "Build Now, Pay Later", "Where do you work?", "Contact us"];

const CONTACT_LINKS = [
  { label: SITE.phone1, href: SITE.phone1Href },
  { label: SITE.phone2, href: SITE.phone2Href },
  { label: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Facebook page", href: SITE.facebook },
];

const CONTACT_LINE = `Call ${SITE.phone1} or ${SITE.phone2}, email ${SITE.email}, or message us on Facebook.`;

type Rule = { keys: RegExp; reply: Reply };

// Ordered: the first match wins, so specific topics come before broad ones.
const RULES: Rule[] = [
  {
    keys: /\b(thanks?|thank you|salamat|ok(ay)?|great|nice)\b/,
    reply: { text: "You're welcome! Anything else about JB Builders and Realty?", chips: MORE_CHIPS },
  },
  {
    keys: /\b(bye|goodbye|see you)\b/,
    reply: { text: "Thank you for visiting JB Builders and Realty. To God be all the glory!" },
  },
  {
    keys: /(pay later|build now|installment|financ|payment|pay in|loan|utang|hulog)/,
    reply: {
      text: "Build Now, Pay Later lets you start your home or commercial project without waiting until everything is saved up. Message or call us with your project and we'll walk you through how it works.",
      chips: ["How do I contact you?", "Cost estimates"],
      links: [{ label: SITE.phone1, href: SITE.phone1Href }],
    },
  },
  {
    keys: /(permit|occupancy|papel|documents?)/,
    reply: {
      text: "Yes. We handle building and occupancy permit processing, so you don't have to chase the paperwork yourself.",
      chips: ["Services", "Contact us"],
    },
  },
  {
    keys: /(estimate|how much|magkano|price|cost|quote|rate|budget)/,
    reply: {
      text: "We offer building cost estimates. Prices depend on the size, design and materials of each project, so we don't post fixed rates. Send us your plans or idea and we'll prepare an estimate.",
      chips: ["Contact us", "Build Now, Pay Later"],
      links: [{ label: SITE.phone1, href: SITE.phone1Href }],
    },
  },
  {
    keys: /(inspect|supervis|monitor)/,
    reply: {
      text: "We provide site inspection and supervision, so your project is checked on the ground while it's being built.",
      chips: ["Services", "Contact us"],
    },
  },
  {
    keys: /(interior|furnish|perspective)/,
    reply: {
      text: "For interiors we offer interior perspective plans, interior design + build services and interior works.",
      chips: ["Services", "Show your projects"],
    },
  },
  {
    keys: /(renovat|repair|restor|remodel|ayos)/,
    reply: {
      text: "Yes, we do repair and renovation, as well as restorations of existing buildings and homes.",
      chips: ["Contact us", "Cost estimates"],
    },
  },
  {
    keys: /(road|concrete|bridge|pool|swimming|heavy equipment|infrastructure|farm)/,
    reply: {
      text: "Beyond buildings, we build concrete roads (including farm-to-market roads), bridges and swimming pools, and we have heavy equipment for site works.",
      chips: ["Show your projects", "Contact us"],
    },
  },
  {
    keys: /(real estate|realty|house and lot|land development|developer)/,
    reply: {
      text: "JB Builders and Realty is also a real estate developer. We design and build homes and buildings, and develop land in Lucena City and Tayabas City.",
      chips: ["Services", "Where do you work?"],
    },
  },
  {
    keys: /(architect|design|blueprint|structural|electrical|plumbing|engineer|landscape|floor plan|plans)/,
    reply: {
      text: "Our design services include architectural design, civil engineering design, structural, electrical & plumbing plans, interior perspective plans, commercial and landscape architecture.",
      chips: ["Services", "Cost estimates"],
    },
  },
  {
    keys: /(project|portfolio|past work|gallery|sample|municipal|school|residen|commercial|you built|completed)/,
    reply: {
      text: `Some of our work:\n${PROJECTS.map((p) => `• ${p.title} (${p.place})`).join("\n")}\n\nScroll to the Projects section to browse the photos.`,
      chips: ["Services", "Contact us"],
      links: [{ label: "Go to Projects", href: "#projects" }],
    },
  },
  {
    keys: /(service|offer|what do you do|what can you|do you do|construction|build)/,
    reply: {
      text: `Here is what we do:\n${SERVICES.map((s) => `${s.n} ${s.title}: ${s.items.join(", ")}`).join("\n")}`,
      chips: ["Build Now, Pay Later", "Show your projects", "Contact us"],
      links: [{ label: "Go to Services", href: "#services" }],
    },
  },
  {
    keys: /(where (do|are|is) (you|your|jb)|location|address|saan|service area|areas? (you|do)|serve|tayabas|lucena|lucban|quezon|office|visit|map)/,
    reply: {
      text: `We're based in ${SITE.base} and serve Lucena City and Tayabas City, with projects across Quezon including Lucban. Message us before visiting so we can set a time.`,
      chips: ["Contact us", "Services"],
    },
  },
  {
    keys: /(contact|call you|phone|your number|mobile|email|facebook|\bfb\b|message you|reach|inquir|viber)/,
    reply: { text: CONTACT_LINE, chips: ["Where do you work?", "Build Now, Pay Later"], links: CONTACT_LINKS },
  },
  {
    keys: /(office hours|opening hours|what time|are you open|open on|oras)/,
    reply: {
      text: `We haven't posted office hours online, so please call or message first. ${CONTACT_LINE}`,
      links: CONTACT_LINKS,
    },
  },
  {
    keys: /(who are you|who is jb|about (you|jb|the company)|since when|founded|how long|history|company|experience|jb builders|abadilla)/,
    reply: {
      text: `JB Builders and Realty Development has been building in Quezon Province since ${SITE.founded}. We design and build homes, commercial buildings, schools, municipal halls and roads, and develop real estate in Lucena City and Tayabas City.`,
      chips: ["Services", "Show your projects"],
    },
  },
  {
    keys: /^(hi|hello|hey|good (morning|afternoon|evening)|kumusta|hola|po)\b/,
    reply: GREETING,
  },
];

export function answer(input: string): Reply {
  const q = input.toLowerCase().trim();
  for (const r of RULES) if (r.keys.test(q)) return r.reply;
  return {
    text: "Sorry, I can only help with questions about JB Builders and Realty: our services, projects, Build Now, Pay Later, location and contact details. For anything else, you can reach our team directly.",
    chips: MORE_CHIPS,
    links: [{ label: SITE.phone1, href: SITE.phone1Href }],
  };
}

