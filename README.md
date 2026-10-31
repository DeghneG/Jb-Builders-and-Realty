# JB Builders and Realty: website proposal

Marketing site concept for **JB Builders and Realty** (Tayabas City and Lucena City, Quezon Province).
Built with Next.js, Tailwind CSS and GSAP. No backend or external APIs: everything is static.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## What's in it

- **Hero**: hexagon photo window (from the logo) with a rolling headline word and slideshow
- **Before and after**: draggable slider using same-site photo pairs
- **Projects**: filterable cards with hover photo preview and a swipeable gallery
- **Services**, **Build Now, Pay Later**, interactive **service map** (Leaflet + OpenStreetMap)
- **Chatbot**: scripted answers drawn only from JB Builders content (`lib/chatbot.ts`)
- **Contact form**: opens the visitor's email app (proposal build, no server)

## Where things live

| Path | Purpose |
| --- | --- |
| `app/` | page, layout, global styles |
| `components/` | page sections and widgets |
| `lib/data.ts` | services, projects, contact details (edit content here) |
| `lib/chatbot.ts` | chatbot questions and answers |
| `public/images/` | optimized project photos |
| `public/brand/` | logo variants |

Images are served as AVIF/WebP through `next/image`. Project photos are the company's own.
