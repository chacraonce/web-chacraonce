# Chacra Once — web onepage

Web de Chacra Once (constructora boutique, Montevideo) hecha con **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**, lista para publicar en **Netlify** desde GitHub.

Dominio: https://chacraonce.com.uy

## Requisitos

- Node.js 20.9 o superior (recomendado 22)
- npm

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # desarrollo en http://localhost:3000
npm run build    # build de producción
npm run start    # servir el build localmente
npm run lint     # revisar el código
```

## Estructura

```
app/
  layout.tsx          fuente, metadata, favicon y aviso de cookies (que carga Google Analytics)
  page.tsx            une todas las secciones en una sola página
  privacidad/         página /privacidad (política de privacidad y preferencias de cookies)
  globals.css         tokens de diseño (colores, estilos de texto, contenedor, scroll)
  sitemap.ts, robots.ts
  fonts/              JetBrains Mono variable
components/
  sections/           Navbar, Inicio, NuestroProposito, NuestroEquipo, PorQueElegirnos,
                      ComoTrabajamos, QueHacemos, NuestrosProyectos, Contacto, Footer
  ui/                 botones, íconos, cards, formulario, WhatsApp flotante, aviso de cookies
content/site.ts       TODOS los textos, links e imágenes (también los de cookies y privacidad)
lib/consentimiento.ts guarda la elección de cookies y manda los eventos a Analytics
public/
  img/                imágenes de las secciones (WebP)
  img/lapuente/       imágenes provisorias del proyecto Lapuente
  img/chacraonce/     imágenes del proyecto Casa unifamiliar
  ACCA-PLP-ATP-2UN-R06-260925.pdf
  __forms.html        formulario oculto para que Netlify detecte "contacto"
  favicon.*           favicon adaptable (claro/oscuro)
```

## Editar contenido

Todo el texto, los links (WhatsApp, email, Instagram) y las rutas de imágenes están en `content/site.ts`. No hace falta tocar los componentes.

### Reemplazar las imágenes de Lapuente

1. Copiá las imágenes definitivas en `public/img/lapuente/`. Usá WebP de hasta 2560 px de ancho para que el repo no pese de más (un JPG también funciona; Next.js las optimiza solo al servirlas).
2. En `content/site.ts`, dentro de `lapuente.imagenes`, cambiá `src` y `alt`. La **primera** es la imagen grande; las siguientes cuatro son las miniaturas.

### Reemplazar el PDF de Lapuente

Reemplazá `public/ACCA-PLP-ATP-2UN-R06-260925.pdf`. Si el archivo nuevo tiene otro nombre, actualizá `pdf` en `content/site.ts`.

### Carrusel de proyectos

`proyectos.lista` en `content/site.ts` tiene Lapuente y Casa unifamiliar, en ese orden. Para agregar un proyecto, creá otro objeto como `lapuente` y sumalo a la lista; con uno solo, las flechas y los indicadores se ocultan solos. El carrusel no da la vuelta: las flechas se atenúan en la primera y en la última card.

El campo opcional `estado` (por ejemplo `"En construcción"`) muestra una etiqueta sobre la imagen principal del proyecto.

### Animación de las cards

Las cards aparecen con un fade y una subida corta cuando entran en pantalla; las que entran juntas salen escalonadas. Para animar otro elemento, agregale el atributo `data-revelar` (por ejemplo `<li data-revelar ...>`). La lógica está en `components/ui/RevelarAlScroll.tsx` y la duración, el recorrido y el escalonado en `app/globals.css` (bloque "Aparición de las cards"). Sin JavaScript, con "reducir movimiento" activado en el sistema o al imprimir, las cards se ven siempre, sin animación.
## Deploy en Netlify

1. Subí el proyecto a un repositorio de GitHub.
2. En Netlify: **Add new site → Import an existing project → GitHub** y elegí el repo.
3. Netlify detecta Next.js solo. La configuración está en `netlify.toml` (build `npm run build`).
4. **Google Analytics 4**: ver la sección de abajo.
5. **Dominio**: Domain management → Add a domain → `chacraonce.com.uy`, y seguí los pasos de DNS que indica Netlify.

## Google Analytics y cookies

- El ID de medición (`G-BTV88Z86MW`, flujo "Web Chacra Once") está en `netlify.toml` como `NEXT_PUBLIC_GA_ID`, solo para producción. Los deploy previews y `npm run dev` no cargan Analytics ni muestran el aviso. Para cambiar el ID, editá ese valor (y el nombre de la cookie `_ga_…` en `privacidad`, en `content/site.ts`) y hacé un nuevo deploy.
- **Aviso de cookies**: Analytics se carga solo si la persona toca **Aceptar**. Si rechaza o no elige, no se carga nada. La elección se puede cambiar desde `/privacidad`.
- **No pegues el `<script>` de gtag.js que muestra Google**: Analytics ya se carga desde `components/ui/AvisoCookies.tsx`. Si además lo agregás a mano, cada visita se cuenta dos veces.
- **Contactos por el formulario**: cada envío exitoso manda el evento `generate_lead` (con `form_name: contacto`). Para verlo como conversión: Analytics → **Administrar → Eventos clave → Nuevo evento clave** → `generate_lead`.
- Analytics solo cuenta a quienes aceptaron las cookies. El total exacto de mensajes está en Netlify → **Forms**.
- Los textos del aviso y de la política están en `content/site.ts` (`cookies` y `privacidad`). Si cambiás algo importante de la política, actualizá la fecha.

## Formulario de contacto (Netlify Forms)

- El formulario se llama `contacto`. Netlify lo detecta en el deploy gracias a `public/__forms.html`.
- **Activar la detección (una sola vez)**: Netlify → **Forms → Enable form detection**, y después hacé un nuevo deploy. Sin esto Netlify no registra el form y los envíos dan error.
- Si agregás o cambiás campos en `components/ui/FormularioContacto.tsx`, actualizá también `public/__forms.html` con los mismos `name`.
- Los envíos se ven en Netlify → **Forms**.
- **Notificaciones por email**: Netlify → **Forms → Submission notifications → Add notification → Email notification**, elegí el form `contacto` y el correo contacto@chacraonce.com.uy. Netlify le manda a esa casilla un correo de confirmación: hasta que alguien toque **Confirm**, no llegan las notificaciones.
- Los correos llegan desde `formresponses@netlify.com` (conviene revisar spam la primera vez). Como el campo se llama `email`, al tocar "Responder" se le contesta directo a quien escribió.
- El formulario solo funciona en Netlify (deploy o deploy preview); con `npm run dev` el envío da error.
- Tiene honeypot anti-spam (`bot-field`). Netlify además filtra spam con Akismet.

## Comportamiento responsive

- Diseño base: 1440 px. Breakpoints: mobile < 768, tablet 768–1279, desktop ≥ 1280.
- Desde 1024 px: navbar completo (hamburguesa solo por debajo), card de proyecto con el formato de escritorio y flechas del carrusel a los lados de la card.
- El contenido vive en un contenedor de 1128 px; a más de 1440 px solo crecen los márgenes y las imágenes a sangre (hero y contacto) se estiran.
- Desktop: cada sección ocupa la pantalla. En tablet y mobile las secciones crecen lo necesario. El scroll es libre (sin encaje entre secciones).
- Los textos se achican con `clamp()` entre 375 y 1440 px (tokens en `app/globals.css`).
