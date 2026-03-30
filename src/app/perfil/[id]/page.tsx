"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Star,
  GraduationCap,
  Briefcase,
  ChevronLeft,
} from "lucide-react";

// Datos de prueba para simular una base de datos
const mockProfiles: Record<string, any> = {
  "1": {
    name: "Lucía Martínez",
    role: "Fotógrafa de bodas",
    rating: 4.9,
    reviews: 128,
    location: "Madrid Centro",
    price: "Desde 800€",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    about:
      "Especialista en capturar momentos únicos y naturales. Más de 5 años documentando historias de amor con un estilo documental y cinematográfico. Me encanta la luz natural y pasar desapercibida para captar la esencia real de tu evento.",
    education: [
      "Grado en Comunicación Audiovisual - Universidad Complutense",
      "Máster en Fotografía de Autor - Centro EFTI",
    ],
    experience: [
      "Fotógrafa principal en 'Bodas de Cine' (2020 - Actualidad)",
      "Freelance para revistas de estilo de vida (2018 - 2020)",
      "Asistente de iluminación en Estudio 54 (2017 - 2018)",
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400",
    ],
  },
  "2": {
    name: "Carlos Gómez",
    role: "Videógrafo eventos",
    rating: 4.8,
    reviews: 85,
    location: "Madrid Norte",
    price: "Desde 600€",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    about:
      "Operador de cámara y editor de vídeo. Realizo aftermovies para eventos corporativos, conciertos y festivales. Dispongo de equipo propio (Sony FX3, estabilizadores, dron).",
    education: [
      "Técnico Superior en Realización de Proyectos Audiovisuales",
      "Certificado Oficial Piloto de Drones (AESA)",
    ],
    experience: [
      "Videógrafo freelance para agencias de eventos (2019 - Actualidad)",
      "Operador de cámara en 'Live Nation España' (2021 - 2023)",
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=400",
    ],
  },
};

export default function PerfilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<"about" | "portfolio">("about");

  // Si no existe el ID en los mock, usamos un fallback genérico
  const pro = mockProfiles[id] || {
    ...mockProfiles["1"],
    name: `Profesional #${id}`,
    avatar: `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150`,
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-24 text-zinc-50">
      {/* Cabecera con foto de portada y botón volver */}
      <div className="relative h-48 w-full bg-zinc-900 sm:h-64">
        <img
          src={pro.portfolio[0]}
          alt="Cover"
          className="h-full w-full object-cover opacity-40"
        />
        <Link
          href="/buscar"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950/50 backdrop-blur-md transition hover:bg-zinc-900"
        >
          <ChevronLeft className="h-6 w-6" />
        </Link>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Foto de perfil superpuesta y botón de acción */}
        <div className="relative -mt-16 mb-4 flex items-end justify-between">
          <img
            src={pro.avatar}
            alt={pro.name}
            className="h-32 w-32 rounded-full border-4 border-zinc-950 bg-zinc-800 object-cover"
          />
          <div className="mb-2">
            <button className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-medium text-zinc-950 transition hover:bg-emerald-400">
              Contactar
            </button>
          </div>
        </div>

        {/* Información Básica */}
        <div>
          <h1 className="text-2xl font-bold">{pro.name}</h1>
          <p className="text-zinc-400">{pro.role}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-300">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{pro.rating}</span>
              <span className="text-zinc-500">({pro.reviews} reseñas)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-zinc-500" />
              {pro.location}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-emerald-400">{pro.price}</span>
            </div>
          </div>
        </div>

        {/* Pestañas (Tabs) */}
        <div className="mt-8 flex border-b border-zinc-800">
          <button
            onClick={() => setActiveTab("about")}
            className={`px-4 pb-3 text-sm font-medium transition-colors ${
              activeTab === "about"
                ? "border-b-2 border-emerald-400 text-emerald-400"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Sobre mí
          </button>
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`px-4 pb-3 text-sm font-medium transition-colors ${
              activeTab === "portfolio"
                ? "border-b-2 border-emerald-400 text-emerald-400"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Portfolio
          </button>
        </div>

        {/* Contenido de las Pestañas */}
        <div className="py-6">
          {activeTab === "about" ? (
            <div className="space-y-8">
              {/* Descripción */}
              <section>
                <h3 className="text-lg font-semibold">Descripción</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {pro.about}
                </p>
              </section>

              {/* Titulación */}
              <section>
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <GraduationCap className="h-5 w-5 text-zinc-500" />
                  Titulación
                </h3>
                <ul className="mt-3 space-y-3">
                  {pro.education.map((edu: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-zinc-400"
                    >
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500/50" />
                      {edu}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Experiencia Laboral */}
              <section>
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Briefcase className="h-5 w-5 text-zinc-500" />
                  Experiencia laboral
                </h3>
                <ul className="mt-3 space-y-3">
                  {pro.experience.map((exp: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-zinc-400"
                    >
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500/50" />
                      {exp}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          ) : (
            /* Portfolio Grid */
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {pro.portfolio.map((img: string, i: number) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-xl bg-zinc-900"
                >
                  <img
                    src={img}
                    alt={`Portfolio ${i}`}
                    className="h-full w-full object-cover transition hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Barra inferior fija (Sticky Bottom Bar) */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-900 bg-zinc-950/90 p-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-200">
              Reserva tu fecha
            </p>
            <p className="text-xs text-zinc-500">Respuesta en menos de 1h</p>
          </div>
          <button className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-emerald-400">
            Solicitar presupuesto
          </button>
        </div>
      </div>
    </div>
  );
}