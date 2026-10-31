"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LMap, Marker } from "leaflet";

// City / municipality centres (WGS84). Tayabas City is the home office.
export const PLACES = [
  { key: "tayabas", name: "Tayabas City", detail: "Home office", lat: 14.0259, lng: 121.5933 },
  { key: "lucena", name: "Lucena City", detail: "Commercial projects & service area", lat: 13.9373, lng: 121.6171 },
  { key: "lucban", name: "Lucban", detail: "Municipal Hall project", lat: 14.1139, lng: 121.5566 },
] as const;

const label = (p: (typeof PLACES)[number], active: boolean) =>
  active ? `<b>${p.name}</b><span class="map-label-detail">${p.detail}</span>` : p.name;

export default function ServiceMap({
  active,
  fly,
  onActive,
}: {
  active: string | null;
  /** true when the hover came from the list: the map pans to the place. Pin hovers never move the map. */
  fly: boolean;
  onActive: (key: string | null, fromMap?: boolean) => void;
}) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<LMap | null>(null);
  const markers = useRef<Record<string, Marker>>({});
  const bounds = useRef<import("leaflet").LatLngBounds | null>(null);
  const onActiveRef = useRef(onActive);
  onActiveRef.current = onActive;

  // Build the map once, only when it is about to scroll into view (keeps Leaflet off the critical path)
  useEffect(() => {
    let cancelled = false;
    const host = el.current;
    if (!host) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        init();
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(host);

    async function init() {
      const L = (await import("leaflet")).default;
      if (cancelled || !el.current) return;

      const m = L.map(el.current, { scrollWheelZoom: false, zoomControl: true });
      map.current = m;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(m);

      const pts = PLACES.map((p) => L.latLng(p.lat, p.lng));
      pts.slice(1).forEach((p) => L.polyline([pts[0], p], { color: "#8a6a3a", weight: 2, dashArray: "6 8" }).addTo(m));

      PLACES.forEach((p) => {
        const mk = L.marker([p.lat, p.lng], {
          icon: L.divIcon({ className: "", html: '<div class="map-pin"></div>', iconSize: [18, 18], iconAnchor: [9, 9] }),
          keyboard: true,
          title: `${p.name}: ${p.detail}`,
        })
          .addTo(m)
          .bindTooltip(label(p, false), { permanent: true, direction: "right", offset: [14, 0], className: "map-label" });
        mk.on("mouseover focus", () => onActiveRef.current(p.key, true));
        mk.on("mouseout blur", () => onActiveRef.current(null, true));
        mk.on("click", () => onActiveRef.current(p.key, true));
        markers.current[p.key] = mk;
      });

      bounds.current = L.latLngBounds(pts);
      m.fitBounds(bounds.current, { padding: [70, 90] });
      // Wheel zoom turns on after a click, so page scrolling is never hijacked.
      m.on("click", () => m.scrollWheelZoom.enable());
      m.on("mouseout", () => m.scrollWheelZoom.disable());
    }

    return () => {
      cancelled = true;
      io.disconnect();
      map.current?.remove();
      map.current = null;
      markers.current = {};
    };
  }, []);

  // React to hover from either the pins or the list
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    PLACES.forEach((p) => {
      const mk = markers.current[p.key];
      if (!mk) return;
      const on = p.key === active;
      mk.getElement()?.querySelector(".map-pin")?.classList.toggle("active", on);
      mk.setZIndexOffset(on ? 1000 : 0);
      mk.setTooltipContent(label(p, on));
      mk.getTooltip()?.getElement()?.classList.toggle("map-label-active", on);
    });
    if (!fly) return;
    const target = PLACES.find((p) => p.key === active);
    if (target) m.flyTo([target.lat, target.lng], 12, { duration: 0.9 });
    else if (bounds.current) m.flyToBounds(bounds.current, { padding: [70, 90], duration: 0.9 });
  }, [active, fly]);

  return (
    <div
      ref={el}
      className="absolute inset-0 z-0"
      role="application"
      aria-label="Interactive map of Tayabas City, Lucena City and Lucban. Hover a pin for details; click the map to enable scroll zoom."
    />
  );
}
