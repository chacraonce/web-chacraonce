import Image from "next/image";
import { porQueElegirnos } from "@/content/site";
import { IntroSeccion } from "@/components/ui/IntroSeccion";
import { CardCompromiso } from "@/components/ui/CardCompromiso";

export function PorQueElegirnos() {
  return (
    <section id="diferencial" aria-labelledby="diferencial-titulo" className="seccion flex">
      {/* Hasta 768: una columna (texto arriba, imagen abajo). Desde 769: texto y cards a la izquierda, imagen a la derecha.
          Mitades iguales y mismo gap que "Qué hacemos" para que las columnas de las dos secciones queden alineadas */}
      <div className="contenedor grid grid-cols-1 content-center gap-10 py-12 md:py-16 min-[48.0625rem]:grid-cols-2 min-[48.0625rem]:gap-8 lg:gap-12 lg:py-10 xl:gap-16">
        <div className="flex flex-col gap-10">
          <IntroSeccion
            id="diferencial-titulo"
            chip={porQueElegirnos.chip}
            titulo={porQueElegirnos.titulo}
          />
          <ul className="flex flex-col gap-[29px]">
            {porQueElegirnos.items.map((it) => (
              <CardCompromiso key={it.titulo} {...it} />
            ))}
          </ul>
        </div>
        {/* Desde 769 no tiene alto fijo: se estira al alto de la columna de texto
            y con los márgenes negativos sobresale 9px arriba y 12px abajo de la última card */}
        <div data-zoom className="relative h-[60svh] min-h-[320px] overflow-hidden md:h-[440px] min-[48.0625rem]:-mb-[12px] min-[48.0625rem]:-mt-[9px] min-[48.0625rem]:h-auto min-[48.0625rem]:min-h-0">
          {/* Desde 769 el marco es vertical y la foto apaisada: con object-cover se dibuja a ~860 px de ancho
              aunque la columna mida 532, así que sizes pide 900 para que el navegador no la estire.
              quality 90 (habilitada en next.config.ts) porque el original es chico (1193 × 896) */}
          <Image
            src={porQueElegirnos.imagen.src}
            alt={porQueElegirnos.imagen.alt}
            fill
            quality={90}
            sizes="(min-width: 769px) 900px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
