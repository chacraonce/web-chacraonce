import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PreferenciasCookies } from "@/components/ui/PreferenciasCookies";
import { SITE_URL, contacto, privacidad } from "@/content/site";

const descripcion = "Qué datos recibe la web de Chacra Once, para qué los usamos y cómo ejercer tus derechos.";

export const metadata: Metadata = {
  title: "Política de privacidad | Chacra Once",
  description: descripcion,
  alternates: { canonical: "/privacidad" },
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: `${SITE_URL}/privacidad`,
    siteName: "Chacra Once",
    title: "Política de privacidad | Chacra Once",
    description: descripcion,
  },
};

// Sin ID de Analytics (npm run dev, deploy previews) no hay cookies que elegir.
const gaId = process.env.NEXT_PUBLIC_GA_ID;

/** Convierte el correo de contacto en un link dentro del texto. */
function conEmail(texto: string): ReactNode[] {
  return texto.split(contacto.email).flatMap((parte, i) =>
    i === 0
      ? [parte]
      : [
          <a
            key={i}
            href={`mailto:${contacto.email}`}
            className="text-blanco underline underline-offset-2 transition-colors hover:text-ocre"
          >
            {contacto.email}
          </a>,
          parte,
        ],
  );
}

export default function Privacidad() {
  return (
    <>
      <Navbar prefijo="/" />
      <main className="pt-[var(--navbar-h)]">
        <article className="contenedor py-14 md:py-20">
          <div className="max-w-[760px]">
            <h1 className="text-a1 text-blanco">{privacidad.titulo}</h1>
            <p className="mt-2 text-a4 text-label">Última actualización: {privacidad.actualizada}</p>
            <p className="mt-8 text-parrafo text-beige">{privacidad.intro}</p>

            {privacidad.secciones.map((s) => (
              <section key={s.titulo} className="mt-10">
                <h2 className="text-fase text-blanco">{s.titulo}</h2>
                {s.parrafos?.map((p) => (
                  <p key={p} className="mt-3 text-parrafo text-beige">
                    {conEmail(p)}
                  </p>
                ))}
                {s.lista ? (
                  <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-parrafo text-beige marker:text-ocre">
                    {s.lista.map((item) => (
                      <li key={item}>{conEmail(item)}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {gaId ? (
              <section className="mt-10">
                <h2 className="text-fase text-blanco">{privacidad.preferencias.titulo}</h2>
                <p className="mt-3 text-parrafo text-beige">{privacidad.preferencias.texto}</p>
                <PreferenciasCookies />
              </section>
            ) : null}
          </div>
        </article>
      </main>
      <Footer prefijo="/" />
    </>
  );
}
