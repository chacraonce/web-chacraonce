"use client";

import { useEffect } from "react";

/**
 * Hace aparecer (fade + subida corta) cada elemento con el atributo data-revelar
 * cuando entra en pantalla. Los que entran juntos (una fila de cards) salen escalonados.
 * Los que ya se ven al cargar quedan como están. Estilos y animación en globals.css.
 */
export function RevelarAlScroll() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        const nuevas = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
        nuevas.forEach((entrada, i) => {
          const el = entrada.target as HTMLElement;
          el.style.setProperty("--orden", String(Math.min(i, 5)));
          el.dataset.visible = "animar";
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    for (const el of document.querySelectorAll<HTMLElement>("[data-revelar]")) {
      if (el.dataset.visible) continue;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.dataset.visible = "ya";
      else observer.observe(el);
    }
    // Recién ahora se ocultan las que faltan (siempre fuera de pantalla), así nada parpadea.
    document.documentElement.dataset.revelarActivo = "";

    return () => {
      observer.disconnect();
      delete document.documentElement.dataset.revelarActivo;
    };
  }, []);

  return null;
}
