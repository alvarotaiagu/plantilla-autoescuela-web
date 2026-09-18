/* ==========================================================================
   CARRIL DEZ — plantilla de demostración (negocio ficticio)
   Concepto «Carril». HTML + CSS + este archivo. GSAP, ScrollTrigger y Lenis
   por CDN. Sin ellos la página se lee entera: el test corrige, el tramo activo
   se marca y la carretera se ve completa.
   ========================================================================== */

(function () {
  "use strict";

  var raiz = document.documentElement;
  var mqReducido = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reducido = mqReducido.matches;
  var gsapListo = !!(window.gsap && window.ScrollTrigger);
  var movimiento = gsapListo && !reducido;

  if (gsapListo) { window.gsap.registerPlugin(window.ScrollTrigger); }
  if (movimiento) { raiz.classList.add("has-motion"); }

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ======================================================================
     1. CONTENIDO — con o sin movimiento
     ====================================================================== */

  /* --- 1.1 Menú ---------------------------------------------------------- */
  (function menu() {
    var boton = $("#hamburguesa"), nav = $("#nav");
    if (!boton || !nav) { return; }
    function cerrar() {
      boton.setAttribute("aria-expanded", "false");
      boton.setAttribute("aria-label", "Abrir menú");
      nav.classList.remove("esta-abierto");
    }
    boton.addEventListener("click", function () {
      var abierto = boton.getAttribute("aria-expanded") === "true";
      boton.setAttribute("aria-expanded", abierto ? "false" : "true");
      boton.setAttribute("aria-label", abierto ? "Abrir menú" : "Cerrar menú");
      nav.classList.toggle("esta-abierto", !abierto);
    });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", cerrar); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("esta-abierto")) { cerrar(); boton.focus(); }
    });
  })();

  /* --- 1.2 Cookies -------------------------------------------------------- */
  (function cookies() {
    var banner = $("#cookie-banner"), ok = $("#cookie-ok");
    if (!banner || !ok) { return; }
    var CLAVE = "carrildez-cookies";
    var aceptado = false;
    try { aceptado = localStorage.getItem(CLAVE) === "1"; } catch (e) {}
    if (!aceptado) { banner.hidden = false; }
    ok.addEventListener("click", function () {
      banner.hidden = true;
      try { localStorage.setItem(CLAVE, "1"); } catch (e) {}
    });
  })();

  /* --- 1.3 Mapa bajo clic --------------------------------------------------- */
  (function mapa() {
    var boton = $("#mapa-boton"), caja = $("#mapa");
    if (!boton || !caja) { return; }
    boton.addEventListener("click", function () {
      var marco = document.createElement("iframe");
      marco.src = "https://www.google.com/maps?q=Arteixo+A+Coruna&output=embed";
      marco.title = "Mapa de la zona de Arteixo, A Coruña (dirección ficticia)";
      marco.loading = "lazy";
      marco.referrerPolicy = "no-referrer-when-downgrade";
      marco.setAttribute("width", "600");
      marco.setAttribute("height", "320");
      caja.insertBefore(marco, boton.nextSibling);
      boton.remove();
    });
  })();

  /* --- 1.4 Formulario de muestra -------------------------------------------- */
  (function formulario() {
    var form = $("#formulario"), salida = $("#formulario-respuesta");
    if (!form || !salida) { return; }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = $("#f-nombre").value.trim();
      var tel = $("#f-tel").value.trim();
      if (!nombre || !tel || !$("#f-ok").checked) {
        salida.textContent = "Faltan el nombre, el teléfono o el aviso legal.";
        return;
      }
      salida.textContent = "Demostración: no se envía nada. Te llamaríamos, " + nombre + ".";
      form.reset();
    });
  })();

  /* --- 1.5 Test de muestra: corrige de verdad -------------------------------- */
  (function test() {
    var caja = $("#test-caja"), marcador = $("#test-marcador");
    if (!caja || !marcador) { return; }
    var preguntas = $$(".pregunta", caja);

    caja.addEventListener("submit", function (e) {
      e.preventDefault();
      var aciertos = 0, sinContestar = 0;
      preguntas.forEach(function (p) {
        var elegida = $("input:checked", p);
        var respuesta = $(".respuesta", p);
        p.classList.add("esta-corregida");
        p.classList.remove("es-correcta", "es-fallo");
        if (!elegida) {
          sinContestar++;
          respuesta.textContent = "Sin contestar. " + respuesta.dataset.explica;
          p.classList.add("es-fallo");
          return;
        }
        if (elegida.value === p.dataset.correcta) {
          aciertos++;
          p.classList.add("es-correcta");
          respuesta.textContent = "Correcta. " + respuesta.dataset.explica;
        } else {
          p.classList.add("es-fallo");
          respuesta.textContent = "No es esa. " + respuesta.dataset.explica;
        }
      });
      marcador.textContent = aciertos + " de " + preguntas.length + " correctas" +
        (sinContestar ? " · " + sinContestar + " sin contestar" : "");
    });

    caja.addEventListener("reset", function () {
      preguntas.forEach(function (p) {
        p.classList.remove("esta-corregida", "es-correcta", "es-fallo");
        $(".respuesta", p).textContent = "";
      });
      marcador.textContent = "Sin corregir";
    });
  })();

  /* --- 1.6 Tramo activo de la ruta ------------------------------------------
     Es contenido, no adorno: se marca también sin GSAP y con movimiento
     reducido, porque dice por dónde va el recorrido. */
  (function tramoActivo() {
    var hitos = $$(".hito");
    var aviso = $("#ruta-aviso");
    if (!hitos.length) { return; }

    function marcar(hito) {
      hitos.forEach(function (h) { h.classList.toggle("esta-activa", h === hito); });
      if (aviso) {
        aviso.textContent = $(".hito-num", hito).textContent + " · " + $("h3", hito).textContent;
      }
    }
    marcar(hitos[0]);

    if (!("IntersectionObserver" in window)) { return; }
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { if (e.isIntersecting) { marcar(e.target); } });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    hitos.forEach(function (h) { io.observe(h); });
  })();

  /* ======================================================================
     2. MOVIMIENTO
     ====================================================================== */
  if (!movimiento) { return; }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;

  /* --- 2.1 Lenis ------------------------------------------------------------ */
  var lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.16, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var destino = document.querySelector(a.getAttribute("href"));
        if (!destino) { return; }
        e.preventDefault();
        lenis.scrollTo(destino, { offset: -80 });
      });
    });
  }

  /* --- 2.2 Una sola vez, en cuanto entra ------------------------------------
     Un ScrollTrigger con `once` no dispara si el elemento ya está en pantalla
     cuando se crea (el hero). El observador de intersección sí. */
  function alEntrar(el, hacer) {
    if (!("IntersectionObserver" in window)) { hacer(); return; }
    var io = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); hacer(); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.04 });
    io.observe(el);
  }

  /* --- 2.3 Titulares palabra a palabra --------------------------------------- */
  function titulares() {
    $$("[data-revelar]").forEach(function (el) {
      var texto = (el.textContent || "").replace(/\s+/g, " ").trim();
      el.setAttribute("aria-label", texto);
      el.textContent = "";
      var frag = document.createDocumentFragment();
      var partes = [];
      texto.split(" ").forEach(function (palabra) {
        var caja = document.createElement("span");
        caja.className = "palabra";
        caja.setAttribute("aria-hidden", "true");
        var dentro = document.createElement("i");
        dentro.textContent = palabra;
        caja.appendChild(dentro);
        frag.appendChild(caja);
        frag.appendChild(document.createTextNode(" "));
        partes.push(dentro);
      });
      el.appendChild(frag);
      /* y:0 a propósito: GSAP lee el translate3d del CSS como `y` en píxeles,
         no como yPercent, y sin esto la palabra se queda abajo. */
      gsap.set(partes, { y: 0, yPercent: 112 });
      alEntrar(el, function () {
        gsap.to(partes, { yPercent: 0, duration: 0.7, ease: "power3.out", stagger: 0.045 });
      });
    });
  }

  function apariciones() {
    $$("[data-aparecer]").forEach(function (el, i) {
      alEntrar(el, function () {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: (i % 4) * 0.07 });
      });
    });
  }

  /* --- 2.4 El carril del hero se mueve con el scroll -------------------------- */
  function carrilHero() {
    var carril = $("#linea-carril");
    if (!carril) { return; }
    gsap.to(carril, {
      y: 260, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.4 }
    });
  }

  /* --- 2.5 Franja ligada a la velocidad del scroll ---------------------------- */
  function franja() {
    var pista = $("#franja-pista");
    if (!pista) { return; }
    var bucle = gsap.to(pista, { xPercent: -50, duration: 22, ease: "none", repeat: -1 });
    var vuelta;
    ScrollTrigger.create({
      onUpdate: function (self) {
        bucle.timeScale(1 + Math.min(Math.abs(self.getVelocity()) / 700, 5));
        clearTimeout(vuelta);
        vuelta = setTimeout(function () { gsap.to(bucle, { timeScale: 1, duration: 0.8 }); }, 140);
      }
    });
  }

  /* --- 2.6 LA RUTA: el coche recorre el trazado con el scroll ------------------
     Sin plugins: la posición sale de getPointAtLength y se escribe en el
     atributo transform del <g>. Por eso el CSS no toca ese transform. */
  function ruta() {
    var escena = $(".ruta-escena");
    var camino = $("#recorrido");
    var coche = $("#coche");
    if (!escena || !camino || !coche || !camino.getTotalLength) { return; }

    var largo = camino.getTotalLength();
    camino.style.setProperty("--largo", largo);
    gsap.set(camino, { strokeDasharray: largo, strokeDashoffset: largo });

    function colocar(p) {
      var d = Math.max(Math.min(p, 1), 0) * largo;
      var punto = camino.getPointAtLength(d);
      var siguiente = camino.getPointAtLength(Math.min(d + 6, largo));
      var angulo = Math.atan2(siguiente.y - punto.y, siguiente.x - punto.x) * 180 / Math.PI - 90;
      coche.setAttribute("transform",
        "translate(" + punto.x.toFixed(1) + "," + punto.y.toFixed(1) + ") rotate(" + angulo.toFixed(1) + ")");
      camino.style.strokeDashoffset = (largo * (1 - Math.max(Math.min(p, 1), 0))).toFixed(1);
    }

    colocar(0);
    ScrollTrigger.create({
      trigger: escena,
      start: "top 62%",
      end: "bottom 85%",
      scrub: 0.4,
      invalidateOnRefresh: true,
      onUpdate: function (self) { colocar(self.progress); }
    });
  }

  /* --- 2.7 Contadores --------------------------------------------------------- */
  function contadores() {
    $$(".contador").forEach(function (el) {
      var hasta = parseFloat(el.dataset.hasta || el.textContent) || 0;
      var estado = { v: 0 };
      el.textContent = "0";
      alEntrar(el, function () {
        gsap.to(estado, {
          v: hasta, duration: 1.3, ease: "power2.out",
          onUpdate: function () { el.textContent = Math.round(estado.v); }
        });
      });
    });
  }

  /* --- 2.8 Imanes y cursor ---------------------------------------------------- */
  function imanes() {
    if (!window.matchMedia("(hover:hover)").matches) { return; }
    $$("[data-iman]").forEach(function (el) {
      var aX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      var aY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
      el.addEventListener("mousemove", function (e) {
        var c = el.getBoundingClientRect();
        aX((e.clientX - (c.left + c.width / 2)) * 0.3);
        aY((e.clientY - (c.top + c.height / 2)) * 0.42);
      });
      el.addEventListener("mouseleave", function () { aX(0); aY(0); });
    });
  }

  function cursor() {
    var caja = $("#cursor"), texto = $("#cursor-texto");
    if (!caja || !window.matchMedia("(hover:hover)").matches) { return; }
    var aX = gsap.quickTo(caja, "x", { duration: 0.2, ease: "power3.out" });
    var aY = gsap.quickTo(caja, "y", { duration: 0.2, ease: "power3.out" });
    window.addEventListener("mousemove", function (e) { aX(e.clientX); aY(e.clientY); }, { passive: true });

    [
      { sel: ".permiso", txt: "permiso" },
      { sel: ".vehiculo img", txt: "ilustración" },
      { sel: ".pregunta", txt: "test" },
      { sel: ".hito", txt: "tramo" }
    ].forEach(function (g) {
      $$(g.sel).forEach(function (el) {
        el.addEventListener("mouseenter", function () { caja.classList.add("es-grande"); texto.textContent = g.txt; });
        el.addEventListener("mouseleave", function () { caja.classList.remove("es-grande"); texto.textContent = ""; });
      });
    });
    $$("a, button").forEach(function (el) {
      el.addEventListener("mouseenter", function () { caja.classList.add("es-grande"); });
      el.addEventListener("mouseleave", function () { caja.classList.remove("es-grande"); });
    });
  }

  /* --- 2.9 Arranque ----------------------------------------------------------- */
  function arrancar() {
    titulares();
    apariciones();
    carrilHero();
    franja();
    ruta();
    contadores();
    imanes();
    cursor();
    ScrollTrigger.refresh();
  }


  /* --- Cortina de entrada ---------------------------------------------------
     El gesto sale del concepto; la mecánica es la misma en toda la biblioteca.
     Se retira SIEMPRE: sin GSAP y con movimiento reducido la hoja de estilos ni
     la pinta, y aquí abajo hay una red de seguridad por tiempo. */
  var elCortina = $("#cortina");
  var cortinaFuera = false;

  function quitarCortina() {
    if (cortinaFuera) { return; }
    cortinaFuera = true;
    if (elCortina) { elCortina.classList.add("esta-fuera"); }
    if (lenis) { lenis.start(); }
  }

  function cortina(alHero) {
    if (!elCortina) { alHero(); return; }
    if (lenis) { lenis.stop(); }
    try { window.scrollTo(0, 0); } catch (e) {}
    var tl = gsap.timeline({ onComplete: quitarCortina });
    tl.fromTo(".cortina-linea", { scaleY: 0 },
        { scaleY: 1, svgOrigin: "12 6", duration: .9, ease: "expo.inOut" })
      .to(".cortina-marca", { opacity: 1, duration: .45, ease: "power2.out" }, "-=.3")
      .add(alHero, "+=.12")
      .to(".cortina-centro", { opacity: 0, duration: .3, ease: "power2.in" })
      .to(".cortina-hoja--izq", { xPercent: -101, borderRadius: 0, duration: 1.1, ease: "expo.inOut" }, "-=.1")
      .to(".cortina-hoja--der", { xPercent: 101, borderRadius: 0, duration: 1.1, ease: "expo.inOut" }, "<");
  }

  var yaArranco = false;
  function arrancarUnaVez() { if (yaArranco) { return; } yaArranco = true; arrancar(); }
  function abrirLaPagina() { cortina(arrancarUnaVez); }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(abrirLaPagina);
  } else {
    window.addEventListener("load", abrirLaPagina);
  }

  /* Red de seguridad: si las tipografías no resuelven, si una animación se
     atasca o si algo revienta a mitad, ni la cortina se queda puesta ni el
     arranque se pierde. */
  setTimeout(function () { quitarCortina(); arrancarUnaVez(); }, 4600);

  if (mqReducido.addEventListener) {
    mqReducido.addEventListener("change", function () { window.location.reload(); });
  }
})();
