export const SITE = {
  name: "JB Builders and Realty",
  tagline: "We build the home you want.",
  phone1: "0961 814 4460",
  phone1Href: "tel:+639618144460",
  phone2: "0923 2699 303",
  phone2Href: "tel:+639232699303",
  email: "jb_abadilla@yahoo.com",
  facebook: "https://www.facebook.com/profile.php?id=61571045952678",
  founded: 2017,
  base: "Tayabas City, Quezon Province",
};

export const SERVICES = [
  {
    n: "01",
    title: "Design",
    blurb: "From first sketch to approved plans.",
    items: [
      "Architectural design",
      "Civil engineering design",
      "Structural, electrical & plumbing plans",
      "Interior perspective plans",
    ],
  },
  {
    n: "02",
    title: "Build",
    blurb: "Residential, commercial and public works, built to last.",
    items: [
      "Construction",
      "Interior works",
      "Repair & renovation",
      "Concrete roads, swimming pools & heavy equipment",
    ],
  },
  {
    n: "03",
    title: "Develop",
    blurb: "Land, homes and buildings under one roof.",
    items: [
      "Real estate development",
      "Residential design + build",
      "Commercial architecture",
      "Landscape architecture",
    ],
  },
  {
    n: "04",
    title: "Support",
    blurb: "The paperwork and oversight, handled.",
    items: [
      "Building & occupancy permit processing",
      "Site inspection & supervision",
      "Building cost estimates",
    ],
  },
];

export type Category =
  | "Institutional"
  | "Commercial"
  | "Residential"
  | "Infrastructure"
  | "Site works";

export type Project = {
  slug: string;
  title: string;
  place: string;
  category: Category;
  blurb: string;
  images: string[];
};

const img = (names: string[]) => names.map((n) => `/images/${n}`);

export const PROJECTS: Project[] = [
  {
    slug: "lucban-municipal-hall",
    blurb: "A two-storey municipal hall with a colonnaded entrance and glazed facade, built for the Lucban local government.",
    title: "Lucban Municipal Hall",
    place: "Lucban, Quezon",
    category: "Institutional",
    images: img(["hall-1.jpg", "hall-2.jpg", "hall-3.jpg", "hall-4.jpg", "hall-5.jpg"]),
  },
  {
    slug: "isabang-elementary-school",
    blurb: "A multi-storey school building with open corridors and exterior stairways, completed in Isabang, Tayabas City.",
    title: "Isabang Elementary School",
    place: "Isabang, Tayabas City",
    category: "Institutional",
    images: img(["school-1.jpg", "school-2.jpg", "school-3.jpg", "school-4.jpg", "school-5.jpg", "school-6.jpg"]),
  },
  {
    slug: "two-storey-commercial",
    blurb: "A two-storey commercial building designed and built by us, from approved design through groundbreaking in Lucena City.",
    title: "Two-Storey Commercial Building",
    place: "Lucena City",
    category: "Commercial",
    images: img(["commercial-render-1.jpg", "commercial-render-2.jpg", "commercial-gb-1.jpg", "commercial-gb-2.jpg", "commercial-gb-3.jpg"]),
  },
  {
    slug: "three-storey-commercial",
    blurb: "A three-storey commercial building on Enriquez Street, from site works to finished interiors.",
    title: "Three-Storey Commercial Building",
    place: "Enriquez St., Brgy. 1, Lucena City",
    category: "Commercial",
    images: img(["building-1.jpg", "building-2.jpg", "building-3.jpg"]),
  },
  {
    slug: "dapdap-residence",
    blurb: "A three-storey family home with a roof deck, finished with tiled floors and a marble-clad bathroom.",
    title: "Three-Storey Residence with Roof Deck",
    place: "Dapdap, Tayabas City",
    category: "Residential",
    images: img(["home-1.jpg", "home-2.jpg", "home-3.jpg", "home-4.jpg", "home-5.jpg"]),
  },
  {
    slug: "farm-to-market-roads",
    blurb: "Concrete farm-to-market roads that give farmers and residents reliable access to market.",
    title: "Farm-to-Market Roads",
    place: "Isabang & Camella Homes, Tayabas City",
    category: "Infrastructure",
    images: img(["road-1.jpg", "road-2.jpg", "road-3.jpg", "road-4.jpg", "road-5.jpg"]),
  },
  {
    slug: "concrete-bridge",
    blurb: "A concrete bridge with painted safety railings and road markings.",
    title: "Concrete Bridge",
    place: "Quezon Province",
    category: "Infrastructure",
    images: img(["bridge-1.jpg"]),
  },
  {
    slug: "site-works",
    blurb: "Waterproofing membranes, overnight concrete pours, shoring, roofing and flooring: the work behind every finished building.",
    title: "Roofing, Waterproofing & Concrete Works",
    place: "Tayabas & Lucena",
    category: "Site works",
    images: img(["waterproof-1.jpg", "waterproof-2.jpg", "pour-1.jpg", "pour-2.jpg", "roofing-1.jpg", "shoring-1.jpg", "shoring-2.jpg", "floor-1.jpg", "floor-2.jpg"]),
  },
];

export const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Institutional",
  "Commercial",
  "Residential",
  "Infrastructure",
  "Site works",
];

