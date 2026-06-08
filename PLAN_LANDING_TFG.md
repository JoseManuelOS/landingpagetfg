# Plan landing page TFG Roomate

## Resumen del producto

Roomate es una app Flutter para pisos compartidos. Centraliza finanzas, tareas y convivencia: gastos compartidos, deudas simplificadas, presupuestos, suscripciones, pagos, lista de la compra, chat, notificaciones, analisis con IA, OCR de tickets y exportacion PDF.

La landing debe vender el TFG como producto real y como proyecto tecnico solido. Debe explicar rapido que problema resuelve, mostrar pantallas reales y transmitir una sensacion moderna parecida al portfolio: scroll suave, animaciones por seccion, cards con reveal, textos tecnicos con efecto flicker y transiciones cuidadas.

## Audiencia

- Evaluadores del TFG: necesitan entender alcance, arquitectura y calidad tecnica.
- Estudiantes y companeros de piso: necesitan ver utilidad inmediata.
- Reclutadores o visitantes del portfolio: necesitan percibir producto, criterio visual y capacidad tecnica.

## Mensajes clave

- "Gestiona gastos, tareas y convivencia desde un solo lugar."
- "IA para entender el estado del piso."
- "OCR para convertir tickets en gastos."
- "Deudas simplificadas y presupuestos claros."
- "Seguridad por hogar con Supabase RLS."

## Assets reutilizables

Usar assets reales del TFG, enlazados desde la landing con rutas relativas al repo raiz del monorepo o copiandolos a `landingpage/src/assets/roomate/` durante la implementacion.

| Asset | Uso recomendado |
| --- | --- |
| `../tfg/tfg/assets/portada.png` | Mockup principal del hero |
| `../tfg/tfg/assets/screen_inicio.png` | Seccion dashboard / estado del piso |
| `../tfg/tfg/assets/screen_finanzas.png` | Seccion finanzas / presupuestos / deudas |
| `../tfg/tfg/assets/screen_tareas.png` | Seccion tareas / organizacion |
| `../tfg/tfg/assets/icono.png` | Favicon, logo, marca en header |

## Arquitectura frontend propuesta

Stack recomendado:

- Vue 3 + Vite + TypeScript.
- SCSS con variables de color, spacing, z-index y breakpoints.
- GSAP + ScrollTrigger para timelines, reveals y scrub por scroll.
- Lenis para scroll suave.
- Three.js para escena hero con teléfono 3D y waypoints por sección, estilo portfolio.

Estructura recomendada:

```text
landingpage/
  src/
    assets/
      roomate/
    components/
      AppHeader.vue
      AppearingText.vue
      FeatureCard.vue
      PhoneMockup.vue
      SectionBand.vue
      TechBadge.vue
    composables/
      useLenisScroll.ts
      useReducedMotion.ts
      useScrollAnimations.ts
      useThreeScene.ts
    three/
      core/        # renderer.ts, camera.ts, scene.ts
      objects/     # phoneMockup.ts con textura de screenshot
    animations/
      scenes.ts    # pesos in/out por sección
      waypoints.ts # posición/focus cámara con blending
    styles/
      index.scss
      variables.scss
      colors.scss
      reset.scss
    App.vue
    main.ts
```

## Direccion visual

La identidad debe partir de Roomate, no del portfolio copiado literalmente.

Paleta:

- Fondo principal: `#09090B`.
- Superficie: `#18181B`.
- Superficie elevada: `#27272A`.
- Indigo marca: `#6366F1`.
- Cyan IA/OCR: `#22D3EE`.
- Verde dinero/resuelto: `#10B981`.
- Ambar alertas/presupuesto: `#F59E0B`.
- Texto principal: `#F4F4F5`.
- Texto secundario: `#A1A1AA`.

Reglas visuales:

- Evitar landing dominada solo por morado.
- Usar screenshots reales como primera prueba visual.
- Mantener radio maximo de cards en 8px salvo mockups de telefono.
- No meter cards dentro de cards.
- Usar bandas de seccion full-width, no secciones flotantes aisladas.
- Hero con producto visible en primer viewport.

## Secciones de landing

### 1. Hero

Objetivo: que en 5 segundos se entienda marca, utilidad y calidad visual.

Contenido:

- H1: `Roomate`.
- Claim: `Gastos, tareas y convivencia de piso en una sola app.`
- Copy: `Controla quien paga, que falta por hacer y como evoluciona el mes con IA, OCR y finanzas compartidas.`
- CTA principal: `Ver proyecto`. // URL placeholder hasta confirmar repositorio público y memoria final
- CTA secundario: `Ver memoria`. // URL placeholder hasta confirmar repositorio público y memoria final
- Visual: escena Three.js con plano/box 3D y textura `portada.png` (material PBR ligero, bevel sutil, iluminación suave).
- Badges: `Flutter`, `Supabase`, `IA`, `OCR`, `Stripe`.

Animacion:

- Cámara perspectiva FOV ~38°, parallax cursor (intensidad 1, lerp 0.6), patrón equivalente a `portfolio/src/three/core/camera.ts`.
- Waypoints por sección (hero, problema, finanzas, tareas, ia, seguridad, showcase, cierre) con `position` + `focus` y blending por pesos scroll-driven (mismo modelo que `portfolio/src/animations/scenes.ts` + `waypoints.ts`).
- Entrada inicial: title reveal + `AppearingText` flicker en badges + cámara desliza a waypoint hero.
- Badge inclinado tipo banner del portfolio.

### 2. Problema / solucion

Objetivo: explicar dolor real.

Copy preliminar:

- Problema: `En un piso compartido, los gastos, tareas y pagos acaban repartidos entre chats, notas y memoria.`
- Solucion: `Roomate une finanzas, responsabilidades y comunicacion en un espacio comun por hogar.`

Bloques:

- `Gastos dispersos` -> gastos categorizados y repartos.
- `Deudas confusas` -> deudas simplificadas.
- `Tareas olvidadas` -> asignacion, calendario y estado.
- `Poca visibilidad` -> dashboard, stats e IA.

Animacion:

- Cards reveal con `scale 0.92 -> 1`, `opacity 0 -> 1`.
- Iconos/etiquetas con delay escalonado.

### 3. Finanzas claras

Objetivo: mostrar nucleo del producto.

Visual: `screen_finanzas.png`.

Contenido:

- Gastos compartidos.
- Division por miembros.
- Presupuestos mensuales.
- Estadisticas por categoria.
- Pagos y deudas.
- Exportacion PDF de informe mensual.

Copy:

`Registra gastos, reparte importes y entiende el mes con presupuestos, stats y reportes exportables.`

Animacion:

- Screenshot entra con scale imagen `1.12 -> 1`.
- Numeros o chips financieros con ScrollTrigger.
- Acento verde para deudas resueltas y ambar para presupuesto.

### 4. Tareas y convivencia

Objetivo: ampliar Roomate mas alla de gastos.

Visual: `screen_tareas.png`.

Contenido:

- Tareas del hogar.
- Filtros: todas, mias, completadas.
- Vista calendario.
- Prioridades y fechas.
- Lista de compra.
- Actividad reciente.

Copy:

`Convierte acuerdos del piso en tareas visibles, asignadas y faciles de seguir.`

Animacion:

- Timeline horizontal o vertical con estados `HOY`, `ESTA SEMANA`, `MAS TARDE`.
- Items con reveal escalonado.

### 5. IA, OCR y automatizacion

Objetivo: destacar valor diferencial.

Contenido:

- IA analiza el estado del hogar.
- Chat con IA.
- Sugerencias de tareas.
- OCR extrae importe, comercio, fecha y categoria de tickets.
- Notificaciones push con Firebase.
- Edge Functions para procesos backend.

Copy:

`Roomate no solo guarda datos: ayuda a interpretarlos y reduce trabajo manual.`

Animacion:

- Texto flicker tipo `AppearingText.vue` en etiquetas `IA`, `OCR`, `RLS`, `FCM`.
- Bloques tecnicos aparecen con `ScrollTrigger`.
- Lineas sutiles conectan ticket -> gasto -> resumen.

### 6. Seguridad y arquitectura TFG

Objetivo: convencer a evaluadores tecnicos.

Contenido tecnico (verificado contra `pubspec.yaml` y `supabase/` del repo TFG):

| Capa | Tecnología confirmada |
| --- | --- |
| Cliente | Flutter 3.11+, Riverpod 2.6.1, GoRouter 14.8.1, fl_chart 0.70.2 |
| Auth | Supabase Auth + Google Sign-In 7.2.0 |
| DB | PostgreSQL Supabase, 14 tablas, RLS por hogar |
| RPC | `calculate_simplified_debts`, `calculate_debts`, `get_budget_status` |
| Edge Functions | `household-ai`, `create-payment-intent`, `event-notifications`, `subscription-reminders` |
| Pagos | Stripe 11.4.0 + PaymentIntent vía Edge Function |
| Push | Firebase Messaging 16.1.3 + `flutter_local_notifications` 17.2.4 |
| OCR | Google ML Kit Text Recognition 0.15.0 |
| Export | `pdf` 3.12.0 + `printing` 5.14.3 (informe mensual) |

Copy:

`Arquitectura pensada para datos sensibles: cada hogar ve solo su informacion y las operaciones criticas viven en backend.`

Animacion:

- Diagrama por capas con reveal:
  - Cliente Flutter.
  - Estado/Navegacion.
  - Supabase/Postgres/RLS.
  - Edge Functions.
  - Servicios externos.
- Efecto de flujo con pequenos puntos o barras, sin saturar.

### 7. Showcase de pantallas

Objetivo: dejar evidencia visual fuerte.

Visuales:

- `screen_inicio.png`
- `screen_finanzas.png`
- `screen_tareas.png`

Layout:

- Desktop: tres mockups en carrusel horizontal o grid asimetrico.
- Mobile: stack vertical con sticky labels.

Animacion:

- Parallax leve por screenshot.
- Hover en desktop: levantar mockup y enfocar.
- Sin hover obligatorio en mobile.

### 8. Cierre / CTA

Objetivo: finalizar con accion clara.

Contenido:

- `Roomate demuestra producto, backend seguro y experiencia mobile completa.`
- CTA: `Ver repositorio`. // URL placeholder hasta confirmar repositorio público y memoria final
- CTA: `Descargar memoria`. // URL placeholder hasta confirmar repositorio público y memoria final
- CTA: `Contactar`. // URL placeholder hasta confirmar repositorio público y memoria final

Animacion:

- Fondo con banda final.
- CTA aparece desde abajo con opacity.
- Header puede cambiar tema o contraste al entrar en cierre.

## Plan de animaciones inspirado en portfolio

Nota: `portfolio/` es read-only. Reimplementar primitivas dentro de `landingpage/` (no copiar archivos):

- `AppearingText.vue` propio con flicker char pool + timeline GSAP. Fallback inmediato si `prefers-reduced-motion`.
- `Banner.vue` con `scaleX` background sincronizado con reveal de texto.
- `FeatureCard.vue` reveal `scale 0.92 -> 1` + opacity vía ScrollTrigger.
- `useScroll.ts` con Lenis + GSAP ticker (`gsap.ticker.add` llamando `lenis.raf`), patrón equivalente a `portfolio/src/composables/useScroll.ts`.

Patrones a reutilizar conceptualmente:

- `Lenis`: scroll suave con `lerp` bajo, similar a `useScroll.ts`.
- `ScrollTrigger`: reveals y scrub por seccion.
- `AppearingText`: flicker para palabras tecnicas, evitando usarlo en parrafos largos.
- `Banner`: badge inclinado con fondo que escala en X.
- `PreviewCard`: reveal de card e imagen con scale.
- `ProjectBackground`: overlay/fondo con translate vertical para transiciones de bloque.
- `sceneWeights/waypoints`: si se usa Three.js, mover camara por pesos de seccion; si no, aplicar idea a mockups con parallax.

Timelines recomendadas:

```ts
// Hero
gsap.timeline()  
  .from(".hero-title", { y: 40, opacity: 0, duration: 0.8, ease: "power2.out" })
  .from(".hero-copy", { y: 24, opacity: 0, duration: 0.5 }, "-=0.35")
  .from(".hero-phone", { y: 32, rotate: -3, opacity: 0, duration: 0.8 }, "-=0.35");
```

```ts
// Card reveal
gsap.fromTo(".feature-card",
  { opacity: 0, scale: 0.92, y: 24 },
  {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.45,
    stagger: 0.08,
    ease: "power1.out",
    scrollTrigger: { trigger: ".features", start: "top 75%" }
  }
);
```

```ts
// Screenshot parallax
gsap.to(".screen-showcase img", {
  yPercent: -8,
  ease: "none",
  scrollTrigger: {
    trigger: ".screen-showcase",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});
```

Reduced motion:

- Si `prefers-reduced-motion: reduce`, desactivar Lenis y timelines scrub.
- Mostrar textos finales sin flicker.
- Mantener imagenes estaticas.

## Checklist de implementacion

- Crear proyecto Vite si `landingpage` aun solo tiene README.
- Instalar dependencias: `vue`, `typescript`, `vite`, `sass`, `gsap`, `lenis`, opcional `three`.
- Copiar assets de TFG a `landingpage/src/assets/roomate/` (no importar desde `../tfg/`, ese dir es read-only y los assets deben vivir dentro del root del proyecto landingpage para el bundler).
- Definir variables SCSS de colores, spacing, radius, typography y z-index.
- Implementar componentes base: header, phone mockup, badge tecnico, feature card, section band.
- Implementar secciones en `App.vue`.
- Implementar `useLenisScroll.ts`.
- Implementar `useScrollAnimations.ts` con cleanup de timelines.
- Implementar `AppearingText.vue` con fallback reduced motion.
- Revisar responsive desktop/tablet/mobile.
- Anadir metadata SEO: title, description, og image si existe.
- Preparar CTA reales cuando existan URLs definitivas.

## Checklist QA

Responsive:

- Hero muestra `Roomate` y mockup visible en primer viewport.
- En mobile no hay texto cortado ni botones desbordados.
- Screenshots mantienen aspect ratio y no tapan copy.
- Se ve una pista de la siguiente seccion bajo hero.

Accesibilidad:

- Contraste AA en texto principal y botones.
- `alt` descriptivo en screenshots.
- Navegacion por teclado visible.
- `prefers-reduced-motion` respetado.
- CTAs con labels claros.

Performance:

- Convertir screenshots a WebP si el peso es alto.
- Usar `loading="lazy"` fuera del hero.
- Lazy-load del módulo Three.js. Mostrar mockup 2D fallback (`<img src="portada.png">`) hasta que la escena esté lista.
- Reducir DPR del renderer a `min(devicePixelRatio, 1.5)`.
- Pausar render cuando el hero quede fuera de viewport (IntersectionObserver, mismo patrón que `portfolio/src/features/home/components/Home.vue`).
- Si `prefers-reduced-motion: reduce`: desactivar escena 3D y mostrar mockup `<img>` estático.
- Evitar animar propiedades que causen layout; preferir transform/opacity.

Build:

- Ejecutar `npm run build`.
- Revisar consola sin errores.
- Probar desktop y mobile con capturas Playwright.
- Revisar Lighthouse basico: Performance, Accessibility, SEO.

## Criterios de aceptacion

- Landing comunica que Roomate resuelve finanzas y convivencia de pisos compartidos.
- Primer viewport contiene marca, claim y visual real de producto.
- Animaciones recuerdan al portfolio: suaves, por scroll, con reveals y detalles tipo flicker/banner.
- Identidad visual pertenece a Roomate: oscura, tecnica, con acentos indigo/cyan/verde/ambar.
- Evaluador tecnico entiende stack, seguridad y alcance del TFG.
- Usuario no tecnico entiende problema y beneficio.

## Restricciones

- `../tfg/` es solo lectura.
- `../portfolio/` es solo lectura.
- Cambios de implementacion deben ocurrir solo en `landingpage/`.
- No copiar modelos, sonidos ni assets propios del portfolio.
- Usar portfolio como referencia de movimiento y estructura, no como plantilla literal.
