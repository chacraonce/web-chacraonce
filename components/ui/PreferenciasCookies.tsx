"use client";

import { privacidad } from "@/content/site";
import { reabrirAviso, useConsentimiento } from "@/lib/consentimiento";

const textos = privacidad.preferencias;

export function PreferenciasCookies() {
  const estado = useConsentimiento();
  return (
    <div className="mt-5 flex flex-col items-start gap-4">
      <p aria-live="polite" className="min-h-[1.75em] text-parrafo text-blanco">
        {estado === "pendiente" ? null : textos.estado[estado ?? "sinElegir"]}
      </p>
      <button
        type="button"
        onClick={reabrirAviso}
        className="inline-flex h-[50px] w-full items-center justify-center border-2 border-blanco px-6 text-boton text-blanco transition-colors hover:bg-blanco hover:text-negro sm:w-auto"
      >
        {textos.boton}
      </button>
    </div>
  );
}
