import Image from "next/image";
import { equipo } from "@/content/site";
import { IntroSeccion } from "@/components/ui/IntroSeccion";

export function NuestroEquipo() {
  return (
    <section id="equipo" aria-labelledby="equipo-titulo" className="seccion flex">
      <div className="contenedor flex flex-col justify-center py-12 md:py-16 xl:py-6">
        <IntroSeccion
          id="equipo-titulo"
          chip={equipo.chip}
          titulo={equipo.titulo}
          bajada={equipo.bajada}
          className="max-w-[896px]"
        />

        {/* 1 por fila hasta 639, 2 de 640 a 767 (la tercera centrada) y 3 por fila desde 768 */}
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-x-4 lg:gap-x-6 xl:mt-9">
          {equipo.personas.map((p) => (
            <li
              key={p.nombre}
              className="bg-gris-card px-[30px] py-8 sm:max-md:odd:last:col-span-2 sm:max-md:odd:last:w-[calc(50%-12px)] sm:max-md:odd:last:justify-self-center md:px-5 lg:px-[30px] xl:min-h-[251px]"
            >
              <h3 className="text-titulo-card text-blanco">{p.nombre}</h3>
              <p className="mt-1 text-[10px] leading-[18px] text-rol sm:min-h-[36px]">{p.rol}</p>
              <p className="mt-3 text-p-card text-beige">{p.descripcion}</p>
            </li>
          ))}
        </ul>

        {/* Mismo margen que arriba de las cards (mt-10 / xl:mt-9) para que queden a igual distancia del título y de la foto */}
        <div className="relative mt-10 h-[180px] xl:mt-9 w-full md:h-[200px] xl:h-[218px]">
          <Image
            src={equipo.banda.src}
            alt={equipo.banda.alt}
            fill
            sizes="(min-width: 1280px) 1128px, 100vw"
            className="object-cover object-[center_62%]"
          />
        </div>
      </div>
    </section>
  );
}
