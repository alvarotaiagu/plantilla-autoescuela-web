# CARRIL DEZ — plantilla de autoescuela

> **Sitio de demostración. CARRIL DEZ es un negocio ficticio.** Nombre,
> dirección, teléfono, horarios, equipo, vehículos, preguntas del test y
> **todos los importes, incluidas las tasas**, son datos de muestra inventados
> para enseñar la plantilla. No corresponden a ninguna autoescuela real ni a
> ninguna tarifa o tasa oficial vigente. La página lleva `noindex, nofollow` y no
> publica valoraciones en sus datos estructurados.

**Demo:** https://alvarotaiagu.github.io/plantilla-autoescuela-web/

Web estática: HTML + CSS + un `main.js`. Sin framework, sin build, sin backend y
sin npm. GSAP, ScrollTrigger y Lenis por CDN; si el CDN cae, la página se lee
entera, el test sigue corrigiendo y el tramo activo se sigue marcando.

---

## El concepto: «Carril»

Sacarse el carné es un camino con tramos, y esta web es ese camino:

- **La página entera es un carril.** El hero tiene la línea discontinua de un
  carril real, inclinada y en movimiento con el scroll.
- **La sección central es la carretera**: un trazado SVG que baja por la
  izquierda mientras los seis tramos —matrícula, teórica, test, examen teórico,
  prácticas y examen práctico— pasan por la derecha. Un coche recorre el trazado
  con el scroll, la parte recorrida se pinta en cian y un cartel fijo abajo dice
  en qué tramo estás. Ese cartel no es adorno: es el índice de la sección.
- **Los permisos son señales**: círculos con la letra del permiso dentro.
- **El test corrige de verdad**, con su explicación por pregunta, porque es lo
  que un alumno quiere tocar antes de matricularse.

Todo el movimiento dice lo mismo: se avanza, y se sabe por dónde vas.

## Registro visual

| | |
|---|---|
| **Paleta** | fondo `#0B0D10`, panel `#14181F`, línea `#262D38`, acero `#39414D`, humo `#A5AEBB`, hueso `#E7ECF2` y un único acento: cian eléctrico `#23E5FF` |
| **Tipografía** | Saira Condensed (titulares, rótulos y cifras), Space Grotesk (texto) |
| **Movimiento protagonista** | el coche recorriendo el trazado de la ruta con scrub, pintando el camino hecho |
| **Tono** | señalética nocturna, alto contraste, honesto con los plazos |

## Mapa de secciones

1. **Hero** — la línea del carril y la promesa: enseñar a conducir, no a aprobar.
2. **Franja** — marquesina de permisos ligada a la velocidad del scroll.
3. **01 · La ruta** — la carretera SVG y los seis tramos (protagonista).
4. **02 · Permisos** — seis tarjetas-señal: B, A2, A, AM, B+E y recuperación de puntos.
5. **03 · Precios** — aviso grande de importes inventados + tabla con las tasas
   marcadas como ficticias.
6. **04 · Test** — tres preguntas de muestra que se corrigen en la propia página.
7. **05 · Aula y flota** — tres ilustraciones, cuatro contadores y el equipo.
8. **06 · Preguntas** — acordeón nativo (`<details>`).
9. **07 · Matrícula** — formulario de muestra, datos y mapa solo bajo clic.
10. **Pie** — sello de demostración y enlaces legales.

## Recursos de movimiento

| Recurso | Dónde |
|---|---|
| Lenis como único motor de scroll | toda la página (`lerp: 0.16`) |
| Revelado palabra a palabra | todos los titulares con `data-revelar` |
| Trazado SVG scrubbeado + marcador sobre el camino | la ruta (protagonista) |
| Marquesina ligada a la velocidad del scroll | franja de permisos |
| Paralaje del carril | línea discontinua del hero |
| Contadores | cifras del aula |
| Botones magnéticos | todos los `[data-iman]` |
| Cursor contextual | cambia sobre permisos, tramos, test e ilustraciones |
| Tramo activo con observador de intersección | funciona también sin GSAP |

## Qué tocar para reskinear a un cliente real

1. **Datos del negocio.** `index.html` (bloque `ld+json`, sección `#matricula` y
   pie), `aviso-legal.html`, `manifest.json` y este README. Busca `carrildez`,
   `981 00 00 00`, `Rúa da Pista` y `Arteixo`.
2. **Precios y tasas.** Es lo más delicado del sector. La tabla está aislada en
   `#precios`; hay que poner los importes vigentes, **la tasa oficial real del
   año en curso**, dejar claro que se paga aparte y quitar tanto las marcas
   «ficticia» como el aviso grande de la cabecera de la sección.
3. **Quitar el sello de demostración**: el comentario HTML de la primera línea de
   cada página, el párrafo `.sello` del pie, el `<meta name="robots">` y los
   avisos de este README.
4. **Paleta.** Las variables de `:root` en `css/style.css`; el acento vive en
   `--cian`.
5. **Tipografía.** El `<link>` de Google Fonts en las tres páginas y las
   variables `--display` y `--texto`.
6. **La ruta.** Los seis `<li class="hito">` y el trazado SVG comparten la
   sección. Si el cliente tiene cinco tramos en vez de seis, se borra un `<li>`:
   el recorrido del coche se calcula sobre la longitud real del `path`, así que
   no hay nada que ajustar a mano. Para cambiar la forma de la carretera basta
   con editar la `d` de los cuatro `path` (llevan la misma).
7. **Test.** Cada `<li class="pregunta">` lleva `data-correcta` con la letra
   buena y la explicación en `data-explica` del párrafo `.respuesta`. Añadir
   preguntas es copiar un `<li>` y cambiar el `name` de los `input`.
8. **Vehículos.** `assets/vehiculo-*.svg` son ilustraciones; con un cliente real
   se sustituyen por fotos de su flota manteniendo `width`, `height`,
   `loading="lazy"` y el `alt`.

## Decisiones tomadas

- **Precios y tasas marcados tres veces**: en el aviso de la sección, en las
  filas de la tabla y en el sello del pie. Una autoescuela de demostración con
  una tasa que parezca oficial es un problema, no un detalle.
- **Ninguna estadística de aprobados.** Es la cifra que todo el sector publica y
  la que más fácil es inventar sin querer. Las preguntas frecuentes lo dicen
  expresamente: no damos plazos cerrados.
- **Las preguntas del test son propias** y así se advierte: no son oficiales ni
  proceden de ningún banco de exámenes.
- **Sin retratos ni fotos.** No hay generador de imágenes y una foto de archivo
  presentada como «Noa, profesora de moto» sería una persona real usada como
  personaje. El equipo se presenta con inicial, nombre y función.
- **El coche se coloca escribiendo el atributo `transform` del `<g>`**, y el CSS
  no toca ese transform: una regla de CSS pisa el atributo y deja el marcador
  clavado en el origen. Trampa ya pagada en otra plantilla.
- **El tramo activo es contenido**, no movimiento: se marca con un observador de
  intersección y sigue funcionando sin GSAP y con movimiento reducido.
- **El mapa no existe hasta que lo pides**, para que el aviso de «sin cookies de
  terceros» sea verdad.

## Verificación

Ver `screenshots/`: capturas a 1440×900 y 390×844, más las pasadas con GSAP
bloqueado y con `prefers-reduced-motion: reduce`.

## Licencia de uso

Plantilla de muestra propiedad de su autor. El contenido es ficticio y no puede
presentarse como un negocio real.

---

## La cortina de entrada

Obligatoria en toda la biblioteca, y **el gesto sale del concepto de esta
plantilla**, no es la misma cortina repintada: aquí se **pinta la línea discontinua** de arriba abajo y el carril se abre en dos, con el filo interior curvado, como una calzada que se separa.

La mecánica es la de siempre: línea de tiempo encadenada, `expo.inOut`, borde
curvo y **entrega limpia al hero** —el revelado del titular arranca mientras la
cortina todavía se está yendo, no después—.

**Se retira siempre.** Sin GSAP y con `prefers-reduced-motion` la hoja de estilos
ni la pinta (`html:not(.has-motion) .cortina{display:none}`), y con movimiento hay
una red de seguridad por tiempo en `main.js` que la quita y lanza el arranque
pase lo que pase, para que la página no pueda quedarse tapada si una animación se
atasca o las tipografías no resuelven.
