import { useSyncExternalStore } from "react";
import { sendGAEvent } from "@next/third-parties/google";

// Elección de la persona sobre las cookies de Google Analytics.
// Se guarda en el navegador (localStorage), no en una cookie.
export type Consentimiento = "aceptadas" | "rechazadas" | null;

const CLAVE = "chacra-cookies";
const EVENTO = "chacra-cookies";

// Respaldo por si el navegador bloquea el almacenamiento: la elección dura hasta recargar.
let enMemoria: Consentimiento = null;
let enfocarAlAbrir = false;

function leer(): Consentimiento {
  try {
    const valor = window.localStorage.getItem(CLAVE);
    if (valor === "aceptadas" || valor === "rechazadas") return valor;
  } catch {
    // Almacenamiento bloqueado: se usa el respaldo en memoria.
  }
  return enMemoria;
}

function suscribir(aviso: () => void) {
  window.addEventListener(EVENTO, aviso);
  window.addEventListener("storage", aviso);
  return () => {
    window.removeEventListener(EVENTO, aviso);
    window.removeEventListener("storage", aviso);
  };
}

/** "pendiente" en el servidor y durante la hidratación, hasta poder leer el navegador. */
export function useConsentimiento(): Consentimiento | "pendiente" {
  return useSyncExternalStore(suscribir, leer, () => "pendiente");
}

function gaCargado() {
  return "dataLayer" in window;
}

// Borra _ga y _ga_<ID>. Google las guarda en el dominio principal (.chacraonce.com.uy),
// así que se prueba con el host y con cada dominio padre.
function borrarCookiesGA() {
  const nombres = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => n === "_ga" || n.startsWith("_ga_"));
  const partes = window.location.hostname.split(".");
  const dominios = partes.map((_, i) => partes.slice(i).join(".")).filter((d) => d.includes("."));
  for (const nombre of nombres) {
    document.cookie = `${nombre}=; Max-Age=0; path=/`;
    for (const dominio of dominios) {
      document.cookie = `${nombre}=; Max-Age=0; path=/; domain=${dominio}`;
    }
  }
}

export function guardarConsentimiento(valor: Consentimiento) {
  enMemoria = valor;
  try {
    if (valor) window.localStorage.setItem(CLAVE, valor);
    else window.localStorage.removeItem(CLAVE);
  } catch {
    // Almacenamiento bloqueado: queda el respaldo en memoria.
  }
  if (valor === "rechazadas") {
    borrarCookiesGA();
    // Si Analytics ya estaba cargado en esta página, recargar es la única forma de apagarlo.
    if (gaCargado()) {
      window.location.reload();
      return;
    }
  }
  window.dispatchEvent(new Event(EVENTO));
}

/** Vuelve a mostrar el aviso de cookies (botón de la página de privacidad). */
export function reabrirAviso() {
  enfocarAlAbrir = true;
  guardarConsentimiento(null);
}

/** true una sola vez después de reabrirAviso(), para mover el foco al aviso. */
export function debeEnfocarAviso() {
  const valor = enfocarAlAbrir;
  enfocarAlAbrir = false;
  return valor;
}

/**
 * Manda un evento a Google Analytics, solo si la persona aceptó las cookies
 * y Analytics está cargado (en `npm run dev` y en los deploy previews no lo está).
 */
export function registrarEvento(nombre: string, parametros: Record<string, string | number> = {}) {
  if (leer() !== "aceptadas" || !gaCargado()) return;
  sendGAEvent("event", nombre, parametros);
}
