"use client";

import { useState, FormEvent } from "react";
import { Map, MapPopup } from "@/components/ui/map";
import { Search, MapPin } from "lucide-react";
import Link from "next/link";

type Photographer = {
  id: number;
  name: string;
  role: string;
  latitude: number;
  longitude: number;
  rating: number;
  distance: string;
};

const photographers: Photographer[] = [
  {
    id: 1,
    name: "Lucía Martínez",
    role: "Fotógrafa de bodas",
    latitude: 40.4168,
    longitude: -3.7038,
    rating: 4.9,
    distance: "1.2 km",
  },
  {
    id: 2,
    name: "Carlos Gómez",
    role: "Videógrafo eventos",
    latitude: 40.4183,
    longitude: -3.7057,
    rating: 4.8,
    distance: "2.1 km",
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    role: "Cámara para conciertos",
    latitude: 40.42,
    longitude: -3.6997,
    rating: 4.7,
    distance: "3.4 km",
  },
];

// Fórmula de Haversine para calcular distancia en km
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radio de la tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function BuscarPage() {
  const [selected, setSelected] = useState<Photographer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([-3.7038, 40.4168]); // Madrid por defecto
  const [mapZoom, setMapZoom] = useState(13);
  const [results, setResults] = useState<Photographer[]>(photographers);
  const [isSearching, setIsSearching] = useState(false);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      // Usamos Nominatim (OpenStreetMap) para geocodificar la dirección gratis
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        setMapCenter([lon, lat]);
        setMapZoom(13);

        // Recalcular distancias y ordenar
        const updatedResults = photographers
          .map((pro) => {
            const dist = getDistanceFromLatLonInKm(lat, lon, pro.latitude, pro.longitude);
            return {
              ...pro,
              distNumber: dist,
              distance: dist < 1 ? `${(dist * 1000).toFixed(0)} m` : `${dist.toFixed(1)} km`,
            };
          })
          .sort((a: any, b: any) => a.distNumber - b.distNumber);

        setResults(updatedResults);
        setSelected(updatedResults[0]); // Seleccionar el más cercano automáticamente
      } else {
        alert("No se encontró la dirección.");
      }
    } catch (error) {
      console.error("Error buscando dirección:", error);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-zinc-950 text-zinc-50">
      {/* Barra superior tipo Uber */}
      <header className="absolute left-0 right-0 top-0 z-20 flex flex-col gap-3 border-b border-zinc-900 bg-zinc-950/95 px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Uber Fotos</h1>
            <p className="text-xs text-zinc-400">
              Encuentra profesionales cerca
            </p>
          </div>
          <button className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
            Hoy · Ahora
          </button>
        </div>

        {/* Buscador */}
        <form onSubmit={handleSearch} className="relative flex w-full items-center">
          <MapPin className="absolute left-3 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="¿Dónde es tu evento?"
            className="w-full rounded-xl bg-zinc-900 py-3 pl-10 pr-12 text-sm text-zinc-100 outline-none ring-emerald-500/50 focus:ring-2"
          />
          <button type="submit" className="absolute right-2 rounded-lg bg-emerald-500 p-1.5 text-zinc-950 hover:bg-emerald-400 disabled:opacity-50" disabled={isSearching}>
            <Search className="h-4 w-4" />
          </button>
        </form>
      </header>

      {/* Mapa a pantalla completa */}
      <main className="absolute inset-0 z-0">
        <Map center={mapCenter} zoom={mapZoom}>
          {selected && (
            <MapPopup
              longitude={selected.longitude}
              latitude={selected.latitude}
              className="rounded-2xl bg-zinc-900/95 p-3 text-zinc-50 shadow-xl hover:bg-zinc-800 transition cursor-pointer"
            >
              <Link href={`/perfil/${selected.id}`} className="block space-y-1">
                <h3 className="text-sm font-semibold">{selected.name}</h3>
                <p className="text-xs text-zinc-400">{selected.role}</p>
                <p className="text-xs text-zinc-400">
                  ★ {selected.rating.toFixed(1)} · {selected.distance}
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-400">
                  Ver perfil →
                </p>
              </Link>
            </MapPopup>
          )}
        </Map>
      </main>

      {/* Bottom sheet con lista de profesionales */}
      <section className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-4">
        <div className="pointer-events-auto w-full max-w-3xl rounded-t-3xl bg-zinc-950/95 pb-4 shadow-[0_-12px_40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-center py-2">
            <span className="h-1 w-12 rounded-full bg-zinc-700" />
          </div>

          <div className="px-4">
            <h2 className="text-sm font-medium text-zinc-200">
              Profesionales cercanos
            </h2>
            <p className="text-xs text-zinc-500">
              Toca una tarjeta para centrar en el mapa.
            </p>
          </div>

          <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-2">
            {results.map((pro) => (
              <button
                key={pro.id}
                onClick={() => {
                  setSelected(pro);
                  setMapCenter([pro.longitude, pro.latitude]);
                  setMapZoom(15); // Zoom más cercano al profesional
                }}
                className={`min-w-[220px] flex-shrink-0 rounded-2xl border px-3 py-3 text-left text-xs transition ${
                  selected?.id === pro.id
                    ? "border-emerald-400 bg-zinc-900"
                    : "border-zinc-800 bg-zinc-900/80 hover:border-zinc-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{pro.name}</span>
                  <span className="text-[10px] text-emerald-400">
                    {pro.distance}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-zinc-400">{pro.role}</p>
                <p className="mt-1 text-[11px] text-yellow-400">
                  ★ {pro.rating.toFixed(1)} · Seguro incluido
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

