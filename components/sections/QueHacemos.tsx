import Image from "next/image";
import { queHacemos } from "@/content/site";
import { IntroSeccion } from "@/components/ui/IntroSeccion";
import { CardCompromiso } from "@/components/ui/CardCompromiso";

export function QueHacemos() {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="seccion flex">
      {/* Hasta 768: una columna (texto arriba, imagen abajo). Desde 769: imagen a la izquierda, texto y cards a la derecha.
          (48.0625rem = 769px; va en rem para que quede bien ordenado frente a md/lg)
          Mitades iguales y mismo gap que "Por qué elegirnos" para que las columnas de las dos secciones queden alineadas */}
      <div className="contenedor grid grid-cols-1 content-center gap-10 py-12 md:py-16 min-[48.0625rem]:grid-cols-2 min-[48.0625rem]:gap-8 lg:gap-12 lg:py-10 xl:gap-16">
        {/* Desde 769 no tiene alto fijo: se estira al alto de la columna de texto
            y con los márgenes negativos sobresale 9px arriba y 12px abajo de la última card */}
        <div className="relative order-2 h-[60svh] min-h-[320px] md:h-[440px] min-[48.0625rem]:order-none min-[48.0625rem]:-mb-[12px] min-[48.0625rem]:-mt-[9px] min-[48.0625rem]:h-auto min-[48.0625rem]:min-h-0">
          <Image
            src={queHacemos.imagen.src}
            alt={queHacemos.imagen.alt}
            fill
            sizes="(min-width: 1280px) 532px, (min-width: 769px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-10">
          <IntroSeccion
            id="servicios-titulo"
            chip={queHacemos.chip}
            titulo={queHacemos.titulo}
          />
          <ul className="flex flex-col gap-[29px]">
            {queHacemos.items.map((it) => (
              <CardCompromiso key={it.titulo} {...it} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
