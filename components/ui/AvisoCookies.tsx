"use client";

import { useEffect, useRef } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cookies } from "@/content/site";
import { debeEnfocarAviso, guardarConsentimiento, useConsentimiento } from "@/lib/consentimiento";

/**
 * Único lugar donde se carga Google Analytics: solo si la persona aceptó las cookies.
 * Mientras no eligió, muestra el aviso. No agregues el <script> de gtag.js a mano: contaría doble.
 */
export function AvisoCookies({ gaId }: { gaId: string }) {
  const estado = useConsentimiento();
  if (estado === "aceptadas") return <GoogleAnalytics gaId={gaId} />;
  if (estado === null) return <Aviso />;
  return null;
}

function Aviso() {
  const ref = useRef<HTMLElement>(null);

  // Si se abrió desde "Cambiar preferencias", el foco pasa al aviso (útil con teclado).
  useEffect(() => {
    if (debeEnfocarAviso()) ref.current?.focus();
  }, []);

  return (
    <section
      ref={ref}
      tabIndex={-1}
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-blanco/15 bg-gris-card px-[var(--gutter)] pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5 shadow-[0_-8px_24px_rgba(0,0,0,.35)] motion-safe:animate-[aparecer_.3s_ease-out] md:bottom-8 md:left-8 md:right-auto md:max-w-[440px] md:border md:p-6"
    >
      <p className="text-p-card text-beige">
        {cookies.texto}{" "}
        <a href={cookies.link.href} className="text-blanco underline underline-offset-2 transition-colors hover:text-ocre">
          {cookies.link.label}
        </a>
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => guardarConsentimiento("rechazadas")}
          className="h-[43px] flex-1 border-2 border-blanco text-[12px] font-bold text-blanco transition-colors hover:bg-blanco hover:text-negro"
        >
          {cookies.rechazar}
        </button>
        <button
          type="button"
          onClick={() => guardarConsentimiento("aceptadas")}
          className="h-[43px] flex-1 border-2 border-ocre bg-ocre text-[12px] font-bold text-texto-boton transition-colors hover:border-[#cdb596] hover:bg-[#cdb596]"
        >
          {cookies.aceptar}
        </button>
      </div>
    </section>
  );
}
