"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-zinc-50">
      <div className="w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">
        <h1 className="text-3xl font-semibold">
          Uber de fotógrafos y vídeo
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Elige cómo quieres usar la plataforma.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link
            href="/buscar"
            className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 transition hover:border-emerald-400 hover:bg-zinc-900"
          >
            <div>
              <h2 className="text-lg font-medium">
                Quiero contratar fotógrafos / vídeo
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Entra al mapa, explora profesionales cercanos y reserva para tu
                evento.
              </p>
            </div>
            <span className="mt-4 text-sm text-emerald-400 group-hover:underline">
              Acceder como cliente →
            </span>
          </Link>

          <Link
            href="/profesionales"
            className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 transition hover:border-sky-400 hover:bg-zinc-900"
          >
            <div>
              <h2 className="text-lg font-medium">
                Soy fotógrafo / cámara / vídeo
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Crea tu perfil, indica tu zona y aparece en el mapa para que te
                contraten.
              </p>
            </div>
            <span className="mt-4 text-sm text-sky-400 group-hover:underline">
              Acceder como profesional →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
