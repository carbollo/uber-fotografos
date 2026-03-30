 "use client";

 import * as React from "react";
 import maplibregl from "maplibre-gl";
 import "maplibre-gl/dist/maplibre-gl.css";

 const MapContext = React.createContext<maplibregl.Map | null>(null);

 type MapProps = {
   center: [number, number];
   zoom?: number;
   children?: React.ReactNode;
 };

  export function Map({ center, zoom = 12, children }: MapProps) {
   const containerRef = React.useRef<HTMLDivElement | null>(null);
   const [map, setMap] = React.useState<maplibregl.Map | null>(null);

   // Inicializar el mapa solo una vez
   React.useEffect(() => {
     if (!containerRef.current) return;

     const instance = new maplibregl.Map({
       container: containerRef.current,
       style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
       center,
       zoom,
     });

     instance.on("load", () => {
       instance.resize();
     });

     setMap(instance);

     return () => {
       instance.remove();
       setMap(null);
     };
   }, []); // Array de dependencias vacío para que no se recree

   // Volar a la nueva posición cuando cambie el center o zoom
   React.useEffect(() => {
     if (map) {
       map.flyTo({
         center,
         zoom,
         essential: true,
         duration: 1500, // Animación suave de 1.5s
       });
     }
   }, [map, center[0], center[1], zoom]);

   return (
    <MapContext.Provider value={map}>
      <div
        ref={containerRef}
        className="absolute inset-0 h-full w-full"
      >
        {children}
      </div>
    </MapContext.Provider>
  );
 }

 type MapPopupProps = {
   longitude: number;
   latitude: number;
   onClose?: () => void;
   children?: React.ReactNode;
   className?: string;
   closeButton?: boolean;
   focusAfterOpen?: boolean;
   closeOnClick?: boolean;
 };

 export function MapPopup({
   longitude,
   latitude,
   children,
   className,
 }: MapPopupProps) {
   const map = React.useContext(MapContext);
   const [position, setPosition] = React.useState<{ x: number; y: number } | null>(
     null,
   );

   React.useEffect(() => {
     if (!map) return;

     const updatePosition = () => {
       const p = map.project([longitude, latitude]);
       setPosition({ x: p.x, y: p.y });
     };

     updatePosition();
     map.on("move", updatePosition);
     map.on("zoom", updatePosition);

     return () => {
       map.off("move", updatePosition);
       map.off("zoom", updatePosition);
     };
   }, [map, longitude, latitude]);

   if (!map || !position) return null;

   return (
     <div
       style={{
         position: "absolute",
         left: position.x,
         top: position.y,
         transform: "translate(-50%, -100%)",
       }}
       className={`z-10 ${
         className ?? ""
       }`}
     >
       {children}
     </div>
   );
 }

