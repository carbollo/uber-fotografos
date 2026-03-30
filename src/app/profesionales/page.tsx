 "use client";

 import { useState } from "react";

 type ServiceType = "foto" | "video" | "sonido" | "dron";

 export default function ProfesionalesPage() {
   const [name, setName] = useState("");
   const [city, setCity] = useState("");
   const [service, setService] = useState<ServiceType>("foto");
   const [bio, setBio] = useState("");
   const [price, setPrice] = useState("");
   const [saved, setSaved] = useState(false);

   function handleSubmit(e: React.FormEvent) {
     e.preventDefault();
     setSaved(true);
     setTimeout(() => setSaved(false), 2500);
   }

   return (
     <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-zinc-50">
       <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">
         <h1 className="text-2xl font-semibold">
           Soy fotógrafo / cámara / vídeo
         </h1>
         <p className="mt-2 text-sm text-zinc-400">
           Completa tu perfil básico. Más adelante esto se guardará en la
           base de datos y aparecerás en el mapa de clientes.
         </p>

         <form onSubmit={handleSubmit} className="mt-6 space-y-4">
           <div>
             <label className="block text-sm font-medium text-zinc-200">
               Nombre y apellidos
             </label>
             <input
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none ring-emerald-500/40 focus:ring-2"
               placeholder="Ej. Lucía Martínez"
               required
             />
           </div>

           <div>
             <label className="block text-sm font-medium text-zinc-200">
               Ciudad / zona principal
             </label>
             <input
               value={city}
               onChange={(e) => setCity(e.target.value)}
               className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none ring-emerald-500/40 focus:ring-2"
               placeholder="Ej. Madrid centro"
               required
             />
           </div>

           <div>
             <label className="block text-sm font-medium text-zinc-200">
               Tipo de servicio principal
             </label>
             <select
               value={service}
               onChange={(e) => setService(e.target.value as ServiceType)}
               className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none ring-emerald-500/40 focus:ring-2"
             >
               <option value="foto">Fotografía</option>
               <option value="video">Vídeo</option>
               <option value="sonido">Sonido</option>
               <option value="dron">Dron / aéreo</option>
             </select>
           </div>

           <div>
             <label className="block text-sm font-medium text-zinc-200">
               Descripción corta
             </label>
             <textarea
               value={bio}
               onChange={(e) => setBio(e.target.value)}
               rows={3}
               className="mt-1 w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none ring-emerald-500/40 focus:ring-2"
               placeholder="Cuenta en una frase qué tipo de trabajos haces."
             />
           </div>

           <div>
             <label className="block text-sm font-medium text-zinc-200">
               Precio orientativo por evento (€)
             </label>
             <input
               type="number"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
               className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none ring-emerald-500/40 focus:ring-2"
               placeholder="Ej. 250"
             />
           </div>

           <button
             type="submit"
             className="mt-2 w-full rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-emerald-400"
           >
             Guardar perfil
           </button>

           {saved && (
             <p className="text-center text-sm text-emerald-400">
               Perfil guardado (demo). En la siguiente fase se conectará con el
               mapa de clientes.
             </p>
           )}
         </form>
       </div>
     </div>
   );
 }

