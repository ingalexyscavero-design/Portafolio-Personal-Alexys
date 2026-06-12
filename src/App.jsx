import React, { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Mail, Download, ArrowRight, ArrowLeft, ArrowUpRight,
  Menu, X, ChevronLeft, ChevronRight, MapPin, CircleCheck, Layers, Database, Wrench,
  Sparkles, Monitor, Award, ExternalLink, FolderGit2, ArrowUp,
} from "lucide-react";

/* ============================================================
   DATOS DEL PORTAFOLIO — edita todo desde aquí.
   Nada más abajo necesita tocarse para cambiar contenido.
   ============================================================ */

const DATOS = {
  nombre: "Alexys Cavero",
  titulo: "Desarrollador Web Junior · Automatización e IA · Estudiante de Ingeniería de Sistemas",
  descripcion:
    "Construyo soluciones web modernas que resuelven problemas reales: plataformas para negocios, automatización con inteligencia artificial y aplicaciones que ya están en producción.",
  ubicacion: "Ica, Perú",
  disponible: "Disponible para oportunidades",
  email: "contacto@ejemplo.com",            // ← reemplazar
  github: "https://github.com/usuario",     // ← reemplazar
  linkedin: "https://linkedin.com/in/usuario", // ← reemplazar
  cvUrl: "#",                                // ← reemplazar con la ruta real del CV (ej. /cv-alexys-cavero.pdf)

  /* FOTOS — placeholders de Unsplash (licencia libre).
     Reemplázalas por tus fotos reales y capturas de tus proyectos.
     Si una URL falla, el sitio muestra automáticamente un degradado. */
  fotos: {
    perfil: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=70",   // ← TU FOTO
    sobreMi: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1100&q=70", // ← tu espacio de trabajo
  },

  indicadores: [
    { valor: "4+", etiqueta: "proyectos en producción real" },
    { valor: "12+", etiqueta: "tecnologías en uso activo" },
    { valor: "100%", etiqueta: "proyectos nacidos de necesidades reales" },
  ],

  sobreMi: {
    intro:
      "No colecciono tutoriales: construyo software que la gente usa. Cofundé Conecta Systems, una consultora de desarrollo web en Ica, y combino la universidad con proyectos reales para clientes, negocios locales y campañas sociales.",
    puntos: [
      {
        titulo: "Desarrollo web end-to-end",
        texto: "Frontend con React, Vite y Tailwind; backend con Java Spring Boot, Node y Supabase. Despliegue continuo en Netlify.",
      },
      {
        titulo: "Automatización con IA",
        texto: "Integro Claude, GPT y Gemini en flujos reales: generación automática de contenido, funciones programadas y asistentes para negocios.",
      },
      {
        titulo: "Resolución de problemas",
        texto: "Cada proyecto parte de una necesidad concreta: una ruta de ventas, una campaña benéfica, una academia. Primero el problema, después el código.",
      },
      {
        titulo: "Aprendizaje continuo",
        texto: "Estudiante de Ingeniería de Sistemas (UTP) con práctica constante leyendo y escribiendo código de nivel producción.",
      },
    ],
  },

  tecnologias: [
    {
      categoria: "Frontend",
      icono: "monitor",
      descripcion: "Interfaces rápidas, accesibles y mantenibles.",
      items: [
        { nombre: "React", slug: "react", color: "61DAFB", detalle: "Componentización y estado predecible en SPAs reales." },
        { nombre: "Tailwind CSS", slug: "tailwindcss", color: "38BDF8", detalle: "Diseño consistente sin CSS muerto ni hojas gigantes." },
        { nombre: "Vite", slug: "vite", color: "9499FF", detalle: "Builds instantáneos y DX moderna en todos mis proyectos." },
        { nombre: "TypeScript", slug: "typescript", color: "3178C6", detalle: "Tipado para detectar errores antes de llegar al usuario." },
      ],
    },
    {
      categoria: "Backend",
      icono: "layers",
      descripcion: "APIs y lógica de negocio sólidas.",
      items: [
        { nombre: "Java · Spring Boot", slug: "spring", color: "6DB33F", detalle: "Microservicios y lógica empresarial en entorno financiero real." },
        { nombre: "Node.js", slug: "nodedotjs", color: "5FA04E", detalle: "Funciones serverless y automatizaciones programadas." },
        { nombre: "APIs REST", slug: "", color: "", detalle: "Diseño de contratos claros entre frontend y backend." },
      ],
    },
    {
      categoria: "Base de datos",
      icono: "database",
      descripcion: "Modelado y consultas pensadas para crecer.",
      items: [
        { nombre: "SQL Server", slug: "", color: "", detalle: "Procedimientos almacenados y trazabilidad en sistemas empresariales." },
        { nombre: "PostgreSQL · Supabase", slug: "supabase", color: "3FCF8E", detalle: "Backend-as-a-service con auth y realtime para productos ágiles." },
        { nombre: "MySQL", slug: "mysql", color: "4479A1", detalle: "Diseño relacional y normalización desde cero." },
      ],
    },
    {
      categoria: "Herramientas",
      icono: "wrench",
      descripcion: "Flujo de trabajo profesional de punta a punta.",
      items: [
        { nombre: "Git · GitHub", slug: "github", color: "E9EDF2", detalle: "Control de versiones y trabajo colaborativo." },
        { nombre: "Netlify", slug: "netlify", color: "00C7B7", detalle: "CI/CD, funciones serverless y Blobs en producción." },
        { nombre: "Docker", slug: "docker", color: "2496ED", detalle: "Entornos reproducibles para desarrollo y despliegue." },
        { nombre: "Power BI", slug: "", color: "", detalle: "Dashboards y modelado estrella para inteligencia de negocio." },
      ],
    },
    {
      categoria: "IA y Automatización",
      icono: "sparkles",
      descripcion: "La IA como multiplicador, no como adorno.",
      items: [
        { nombre: "Claude", slug: "claude", color: "D97757", detalle: "Par de programación y motor de generación de documentos y código." },
        { nombre: "GPT · Gemini", slug: "openai", color: "E9EDF2", detalle: "Pipelines de contenido automatizado vía API en producción." },
        { nombre: "NotebookLM", slug: "", color: "", detalle: "Investigación y síntesis de documentación técnica." },
        { nombre: "n8n", slug: "n8n", color: "EA4B71", detalle: "Orquestación de flujos sin reinventar integraciones." },
      ],
    },
  ],

  // CERTIFICADOS — contenido simulado, reemplazar con los reales.
  certificados: [
    {
      codigo: "CERT-01",
      imagen: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=70", // ← reemplazar con imagen real del certificado
      nombre: "Desarrollo Web Full Stack",
      institucion: "Institución de ejemplo",
      fecha: "2025",
      descripcion: "Certificación en construcción de aplicaciones web modernas con React y Node.js. (Placeholder)",
    },
    {
      codigo: "CERT-02",
      imagen: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=70", // ← reemplazar con imagen real del certificado
      nombre: "Bases de Datos con SQL Server",
      institucion: "Institución de ejemplo",
      fecha: "2025",
      descripcion: "Diseño, consultas avanzadas y procedimientos almacenados. (Placeholder)",
    },
    {
      codigo: "CERT-03",
      imagen: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=70", // ← reemplazar con imagen real del certificado
      nombre: "Inteligencia Artificial Aplicada",
      institucion: "Institución de ejemplo",
      fecha: "2024",
      descripcion: "Integración de modelos de lenguaje en productos reales. (Placeholder)",
    },
    {
      codigo: "CERT-04",
      imagen: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=70", // ← reemplazar con imagen real del certificado
      nombre: "Scrum Foundation",
      institucion: "Institución de ejemplo",
      fecha: "2024",
      descripcion: "Fundamentos de gestión ágil de proyectos de software. (Placeholder)",
    },
  ],

  /* PROYECTOS
     categoria: "implementado" | "negocio" | "personal"
     Los enlaces demo/repo son placeholders. */
  proyectos: [
    {
      id: "memorias-de-noel",
      codigo: "PRJ-01",
      categoria: "implementado",
      nombre: "Memorias de Noel",
      corto: "Plataforma web para una campaña benéfica navideña con muro interactivo de notas y gestión de voluntarios.",
      problema: "La campaña coordinaba donaciones y voluntarios por WhatsApp, sin orden ni visibilidad.",
      resultado: "Usada en una campaña real: centralizó inscripciones y dio identidad pública al proyecto.",
      stack: ["React", "Supabase", "Netlify", "Tailwind"],
      gradiente: ["#7F1D1D", "#B45309"],
      imagen: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=900&q=70", // ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Aplicación web para una campaña navideña de caridad: un muro estilo corcho donde los participantes dejan notas, más un flujo de registro de voluntarios. Diseñada, construida y desplegada en producción para una campaña real.",
        problemaLargo:
          "La organización gestionaba todo por mensajes sueltos: no había un lugar único para inscribirse como voluntario, registrar aportes ni mostrar el avance de la campaña al público.",
        solucion:
          "Una SPA con un muro interactivo de notas adhesivas (cada nota es un mensaje o compromiso), formulario de voluntarios con validación y panel de datos respaldado por Supabase. Despliegue automatizado en Netlify.",
        arquitectura:
          "Frontend React + Vite consumiendo Supabase como backend (PostgreSQL + API autogenerada). Sin servidor propio: la infraestructura serverless mantiene el costo en cero para la ONG.",
        stackDetalle: {
          frontend: ["React + Vite — SPA ligera de carga rápida", "Tailwind CSS — estética de corcho y notas con utilidades"],
          backend: ["Supabase — auth, API REST y realtime sin backend propio"],
          baseDatos: ["PostgreSQL (Supabase) — notas, voluntarios y aportes"],
          herramientas: ["Netlify — despliegue continuo desde Git", "GitHub — control de versiones"],
          ia: ["Claude — aceleración del desarrollo y revisión de código"],
        },
        decisiones: [
          {
            titulo: "Supabase en lugar de backend propio",
            texto: "Para una ONG sin presupuesto, un backend dedicado era inviable. Supabase dio base de datos, API y seguridad por fila con costo cero y tiempo de desarrollo mínimo.",
          },
          {
            titulo: "UI temática sin sacrificar usabilidad",
            texto: "El muro de corcho aporta identidad, pero los flujos críticos (inscribirse, donar) se mantienen como formularios simples y directos.",
          },
        ],
        impacto:
          "La campaña tuvo por primera vez un canal digital propio: inscripciones ordenadas, visibilidad pública y una base reutilizable para futuras ediciones.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "vistony-ruta-nazca",
      codigo: "PRJ-02",
      categoria: "implementado",
      nombre: "Vistony · Ruta Nazca",
      corto: "App móvil de ventas en campo con 286 clientes geocodificados, ruta optimizada por GPS y registro diario de avance.",
      problema: "Un vendedor de lubricantes recorría su ruta sin mapa, sin orden de visitas y llevando las ventas en papel.",
      resultado: "Usada a diario en campo: ruta ordenada por cercanía, catálogo digital y carga de ventas desde Excel.",
      stack: ["JavaScript", "Leaflet", "Geolocalización", "Excel"],
      gradiente: ["#0C4A6E", "#0E7490"],
      imagen: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=70", // ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Aplicación móvil (archivo único HTML, sin instalación) para un vendedor de lubricantes que cubre la ruta de Nazca: mapa con 286 clientes geocodificados, orden de visitas por GPS, catálogo de productos y seguimiento de avance diario.",
        problemaLargo:
          "El vendedor manejaba su cartera en cuadernos: direcciones imprecisas, visitas desordenadas que alargaban la jornada y cero trazabilidad de qué cliente compró qué.",
        solucion:
          "Una app que funciona offline-first en el celular: geocodifiqué los 286 clientes, ordené la ruta por proximidad GPS en tiempo real y agregué catálogo, marcado de visitas y carga de ventas históricas desde Excel.",
        arquitectura:
          "Un único archivo HTML con JavaScript vanilla: cero dependencias de servidor, funciona desde el sistema de archivos del teléfono. Leaflet para el mapa y la API de geolocalización del navegador para la posición en vivo.",
        stackDetalle: {
          frontend: ["HTML + JavaScript vanilla — máxima compatibilidad en gama media", "Leaflet — mapas interactivos open source"],
          backend: ["Sin servidor — decisión deliberada por el contexto de uso"],
          baseDatos: ["Datos embebidos + importación de Excel (SheetJS)"],
          herramientas: ["Geocodificación de 286 direcciones reales", "API de Geolocalización del navegador"],
          ia: ["Claude — limpieza y geocodificación masiva de la cartera de clientes"],
        },
        decisiones: [
          {
            titulo: "Archivo único en lugar de app instalable",
            texto: "El usuario final no es técnico y la zona tiene conectividad irregular. Un HTML autocontenido elimina instalación, actualizaciones y dependencia de internet.",
          },
          {
            titulo: "Orden de ruta por proximidad real",
            texto: "En vez de una lista fija, la app reordena los clientes según la posición GPS actual: la jornada se adapta a dónde está el vendedor en cada momento.",
          },
        ],
        impacto:
          "Jornadas de venta más cortas y ordenadas, cartera de clientes digitalizada por primera vez y datos de venta listos para análisis.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "academia-barnard",
      codigo: "PRJ-03",
      categoria: "implementado",
      nombre: "Academia Barnard",
      corto: "Sitio web institucional para una academia, desarrollado como proyecto cliente de Conecta Systems.",
      problema: "La academia no tenía presencia digital: captaba alumnos solo por recomendación y volantes.",
      resultado: "Proyecto entregado y facturado a cliente real; primer canal digital de captación de la academia.",
      stack: ["React", "Tailwind", "Netlify"],
      gradiente: ["#1E3A8A", "#3730A3"],
      imagen: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=70", // ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Sitio institucional para una academia: oferta académica, horarios, docentes y canal de contacto directo. Uno de los primeros proyectos comerciales de Conecta Systems, entregado a un cliente real.",
        problemaLargo:
          "La academia dependía del boca a boca. Los padres no tenían dónde verificar horarios, precios ni metodología, y la competencia con presencia web captaba a los alumnos que buscaban en Google.",
        solucion:
          "Un sitio rápido y claro, pensado para el padre de familia que decide en minutos: propuesta de valor visible de inmediato, información académica organizada y botón de contacto por WhatsApp en todo momento.",
        arquitectura:
          "SPA en React con contenido estructurado en datos (fácil de actualizar sin tocar componentes), desplegada en Netlify con dominio propio.",
        stackDetalle: {
          frontend: ["React + Vite — base mantenible para futuras secciones", "Tailwind CSS — sistema visual consistente"],
          backend: ["Estático — sin necesidades dinámicas en esta fase"],
          baseDatos: ["No aplica — contenido gestionado como datos del proyecto"],
          herramientas: ["Netlify — hosting y despliegue continuo", "Git — versionado del proyecto"],
          ia: ["Claude — prototipado rápido de secciones y copywriting"],
        },
        decisiones: [
          {
            titulo: "Contenido como datos, no hardcodeado",
            texto: "Horarios y cursos viven en objetos de datos separados de la UI: el mantenimiento posterior no requiere entender React a fondo.",
          },
          {
            titulo: "WhatsApp como conversión principal",
            texto: "En el mercado local, los padres no llenan formularios: escriben. El CTA principal abre una conversación directa, no un formulario que nadie responde.",
          },
        ],
        impacto:
          "Primer proyecto facturado de Conecta Systems y primera presencia digital de la academia, con un canal de captación medible.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "academia-lubricantes",
      codigo: "PRJ-04",
      categoria: "negocio",
      nombre: "Mini-academia de Lubricantes",
      corto: "Plataforma educativa para capacitar vendedores de lubricantes: lecciones, progreso y evaluaciones.",
      problema: "Capacitar vendedores nuevos dependía de que alguien con experiencia tuviera tiempo de enseñarles.",
      resultado: "Plataforma desplegada en Netlify con contenido estructurado por niveles y seguimiento de progreso.",
      stack: ["React", "Vite", "Tailwind"],
      gradiente: ["#14532D", "#15803D"],
      imagen: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=70", // ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Plataforma de microaprendizaje para el área comercial de lubricantes: lecciones cortas sobre productos y técnicas de venta, con progreso persistente y evaluaciones por módulo.",
        problemaLargo:
          "El conocimiento del producto vivía en la cabeza de los vendedores antiguos. Cada incorporación nueva implicaba semanas de acompañamiento informal y errores frente al cliente.",
        solucion:
          "Convertí el conocimiento del negocio en módulos estructurados: qué producto recomendar según el vehículo, objeciones frecuentes y práctica con evaluaciones. El vendedor avanza a su ritmo desde el celular.",
        arquitectura:
          "SPA React + Vite con persistencia local del progreso (sin necesidad de cuentas en la fase inicial), desplegada en Netlify para acceso inmediato desde cualquier dispositivo.",
        stackDetalle: {
          frontend: ["React + Vite — navegación instantánea entre lecciones", "Tailwind CSS — UI clara optimizada para móvil"],
          backend: ["Sin backend en fase 1 — reduce fricción y costo"],
          baseDatos: ["Persistencia local del progreso del alumno"],
          herramientas: ["Netlify — despliegue y acceso por URL simple"],
          ia: ["Claude — estructuración pedagógica del contenido técnico"],
        },
        decisiones: [
          {
            titulo: "Sin login en la primera fase",
            texto: "Pedir cuentas a vendedores de campo mata la adopción. El progreso se guarda en el dispositivo; la autenticación queda para cuando el volumen lo justifique.",
          },
          {
            titulo: "Lecciones de 3 minutos",
            texto: "El contenido está fragmentado para consumirse entre visitas a clientes, no en sesiones largas que nadie completa.",
          },
        ],
        impacto:
          "El conocimiento comercial dejó de depender de personas específicas: ahora es un activo digital del negocio, reutilizable con cada incorporación.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "aiverse-os",
      codigo: "PRJ-05",
      categoria: "personal",
      nombre: "AIVERSE OS",
      corto: "Dashboard personal con IA: noticias generadas automáticamente con Gemini, funciones programadas y reportes PDF.",
      problema: "Mantenerse al día en tecnología exigía revisar decenas de fuentes manualmente cada día.",
      resultado: "Sistema autónomo en producción: cada mañana genera y almacena un resumen de noticias sin intervención.",
      stack: ["React", "Netlify Functions", "Gemini API", "Netlify Blobs"],
      gradiente: ["#312E81", "#6D28D9"],
      imagen: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=70", // ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Sistema operativo personal en el navegador: un dashboard que centraliza noticias tecnológicas generadas por IA, documentos descargables y herramientas propias. El módulo central es un pipeline autónomo de noticias con Gemini.",
        problemaLargo:
          "Quería un resumen diario de noticias tecnológicas relevantes sin pagar suscripciones ni revisar fuentes a mano, y que el sistema funcionara solo, incluso sin abrir la aplicación.",
        solucion:
          "Una Netlify Function programada (cron) invoca la API de Gemini cada mañana, genera el resumen del día y lo persiste en Netlify Blobs. El frontend solo lee contenido ya generado: carga instantánea y costo de API mínimo.",
        arquitectura:
          "Tres capas desacopladas: frontend React (lectura), funciones serverless programadas (generación) y Netlify Blobs (almacenamiento). El frontend nunca llama a la IA directamente.",
        stackDetalle: {
          frontend: ["React + Vite — dashboard modular por widgets", "Tailwind CSS — tema oscuro tipo sistema operativo"],
          backend: ["Netlify Functions — generación programada sin servidor propio", "Scheduled Functions (cron) — ejecución diaria autónoma"],
          baseDatos: ["Netlify Blobs — almacenamiento clave-valor de los resúmenes generados"],
          herramientas: ["Netlify — plataforma única para todo el ciclo", "GitHub — despliegue continuo"],
          ia: ["Gemini API — generación del contenido de noticias", "Claude — diseño de la arquitectura del pipeline"],
        },
        decisiones: [
          {
            titulo: "Generación programada, no bajo demanda",
            texto: "Llamar a la IA en cada visita sería lento y caro. Generar una vez al día y servir desde Blobs da latencia de milisegundos y costo casi cero.",
          },
          {
            titulo: "Desacoplar lectura de generación",
            texto: "Si la API de Gemini falla, el dashboard sigue mostrando el último contenido válido: el fallo de un proveedor externo no rompe la experiencia.",
          },
        ],
        impacto:
          "Un sistema de información personal totalmente autónomo, y el aprendizaje práctico de arquitecturas serverless con jobs programados, aplicable directamente a proyectos de clientes.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "panel-hipico",
      codigo: "PRJ-06",
      categoria: "personal",
      nombre: "Panel de Análisis Hípico",
      corto: "Herramienta de análisis de carreras de caballos: estadísticas históricas y comparación de rendimiento.",
      problema: "Analizar carreras implicaba cruzar datos dispersos a mano antes de cada jornada.",
      resultado: "Herramienta de uso real que ordena la información y reduce el análisis previo de horas a minutos.",
      stack: ["React", "Vite", "Visualización de datos"],
      gradiente: ["#7C2D12", "#A16207"],
      imagen: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=900&q=70", // ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Aplicación web construida para un usuario real (un familiar aficionado a la hípica) que centraliza estadísticas de caballos, jinetes y resultados históricos para analizar carreras con datos en lugar de intuición.",
        problemaLargo:
          "El análisis previo a cada jornada era artesanal: apuntes en papel, memoria y planillas sueltas. Información valiosa se perdía y comparar rendimiento entre jornadas era casi imposible.",
        solucion:
          "Un panel que estructura el historial por caballo y jinete, calcula métricas de rendimiento y permite comparar participantes de una carrera lado a lado antes de decidir.",
        arquitectura:
          "SPA React con capa de datos normalizada (caballos, jinetes, carreras, resultados) y componentes de visualización reutilizables para las comparativas.",
        stackDetalle: {
          frontend: ["React + Vite — interacción fluida con tablas y filtros", "Visualización de datos — comparativas gráficas de rendimiento"],
          backend: ["Sin backend — datos gestionados localmente en esta fase"],
          baseDatos: ["Modelo de datos normalizado en el cliente"],
          herramientas: ["Netlify — acceso desde cualquier dispositivo"],
          ia: ["Claude — diseño del modelo de datos del dominio hípico"],
        },
        decisiones: [
          {
            titulo: "Modelar el dominio antes que la UI",
            texto: "El valor está en las relaciones caballo-jinete-carrera. Definir bien ese modelo primero hizo que las vistas comparativas fueran triviales de construir.",
          },
          {
            titulo: "Construir para un usuario real",
            texto: "Cada iteración se validó con el usuario final. Funcionalidades que parecían obvias se descartaron porque no las usaba; otras nacieron de verlo trabajar.",
          },
        ],
        impacto:
          "Práctica real de levantamiento de requerimientos con un usuario no técnico y de modelado de un dominio de datos complejo desde cero.",
        demo: "#",
        repo: "#",
      },
    },
  ],
};

const CATEGORIAS = [
  { id: "implementado", titulo: "Proyectos implementados", nota: "Ya en uso por organizaciones, negocios o clientes reales." },
  { id: "negocio", titulo: "Soluciones para empresas y negocios", nota: "Aplicaciones orientadas a resolver problemas operativos reales." },
  { id: "personal", titulo: "Proyectos personales", nota: "Iniciativas propias para explorar y dominar nuevas tecnologías." },
];

/* ============================================================
   TEMA ÚNICO — paleta oscura del sitio
   ============================================================ */

const TEMA = {
  bg: "#07090D",
  surface: "#0D1117",
  surface2: "#121823",
  border: "#243042",
  borderSoft: "#1A2330",
  text: "#E9EDF2",
  muted: "#93A0B4",
  faint: "#5E6B7E",
  accent: "#E8983E",       // cobre — acento principal
  accentText: "#F3B566",
  accentSoft: "rgba(232,152,62,0.12)",
  accent2: "#22D3EE",      // cian — acento secundario
  ok: "#4ADE80",
};

const MONO = 'ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace';
const SANS = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

/* ============================================================
   HOOKS Y UTILIDADES
   ============================================================ */

const movReducido = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Revela elementos al entrar en viewport (respeta prefers-reduced-motion)
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (movReducido()) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Contador animado: "12+" → cuenta de 0 a 12 y conserva el sufijo
function Contador({ valor, visible }) {
  const m = String(valor).match(/^(\d+)(.*)$/);
  const fin = m ? parseInt(m[1], 10) : 0;
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    if (movReducido() || !m) { setN(fin); return; }
    let raf; const t0 = performance.now(); const dur = 1400;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      setN(Math.round(fin * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, fin]);
  if (!m) return <>{valor}</>;
  return <>{n}{m[2]}</>;
}

/* Foto con degradado de respaldo: si la imagen no carga,
   se muestra el degradado del proyecto en su lugar. */
function Foto({ src, alt = "", gradiente = ["#121823", "#1A2330"], className = "", style = {}, children }) {
  const [falla, setFalla] = useState(false);
  return (
    <div
      className={`relative overflow-hidden zoomable ${className}`}
      style={{ background: `linear-gradient(135deg, ${gradiente[0]}, ${gradiente[1]})`, ...style }}
    >
      {!falla && src && (
        <img
          src={src} alt={alt} loading="lazy"
          onError={() => setFalla(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {children}
    </div>
  );
}

/* Logo real de cada tecnología (Simple Icons CDN).
   Si el logo no existe o no carga, muestra una insignia con la inicial. */
function IconoTech({ t, slug, color, nombre, tam = 22 }) {
  const [falla, setFalla] = useState(false);
  const caja = tam + 14;
  if (!slug || falla) {
    return (
      <span
        className="flex items-center justify-center rounded-lg font-bold shrink-0"
        style={{
          width: caja, height: caja, fontFamily: MONO, fontSize: tam * 0.5,
          color: t.accentText, background: t.accentSoft, border: `1px solid ${t.borderSoft}`,
        }}
        aria-hidden
      >
        {nombre.charAt(0)}
      </span>
    );
  }
  return (
    <span
      className="flex items-center justify-center rounded-lg shrink-0"
      style={{ width: caja, height: caja, background: t.surface2, border: `1px solid ${t.borderSoft}` }}
    >
      <img
        src={`https://cdn.simpleicons.org/${slug}/${color}`}
        width={tam} height={tam} alt={nombre} loading="lazy"
        onError={() => setFalla(true)}
      />
    </span>
  );
}

// Tarjeta con inclinación 3D y foco de luz que sigue al cursor
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (movReducido() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ref.current.style.transform =
      `perspective(900px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 5}deg) translateY(-4px)`;
    ref.current.style.setProperty("--mx", `${x * 100}%`);
    ref.current.style.setProperty("--my", `${y * 100}%`);
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div
      ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={`h-full ${className}`}
      style={{ transition: "transform 0.25s ease", willChange: "transform" }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   ATMÓSFERA GLOBAL — aurora, grano de película y luz de cursor
   ============================================================ */

// Grano de película (SVG embebido, sin peticiones externas)
const GRANO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E";

function FondoGlobal({ t }) {
  const quieta = movReducido();
  return (
    <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Aurora cobre */}
      <div
        className="absolute rounded-full"
        style={{
          top: "-18%", left: "-12%", width: "55vw", height: "55vw", minWidth: 480, minHeight: 480,
          background: `radial-gradient(circle, rgba(232,152,62,0.13), transparent 62%)`,
          filter: "blur(70px)",
          animation: quieta ? "none" : "deriva1 22s ease-in-out infinite",
        }}
      />
      {/* Aurora cian */}
      <div
        className="absolute rounded-full"
        style={{
          bottom: "-22%", right: "-14%", width: "50vw", height: "50vw", minWidth: 420, minHeight: 420,
          background: `radial-gradient(circle, rgba(34,211,238,0.09), transparent 62%)`,
          filter: "blur(70px)",
          animation: quieta ? "none" : "deriva2 28s ease-in-out infinite",
        }}
      />
      {/* Aurora central tenue */}
      <div
        className="absolute rounded-full"
        style={{
          top: "35%", left: "30%", width: "40vw", height: "40vw",
          background: `radial-gradient(circle, rgba(232,152,62,0.05), transparent 60%)`,
          filter: "blur(80px)",
          animation: quieta ? "none" : "deriva1 30s ease-in-out infinite reverse",
        }}
      />
      {/* Grano de película sobre todo */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url("${GRANO}")`, opacity: 0.05, mixBlendMode: "overlay" }}
      />
    </div>
  );
}

// Halo que sigue al cursor por toda la página (solo con mouse)
function LuzCursor() {
  const ref = useRef(null);
  useEffect(() => {
    if (movReducido() || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = null;
    const f = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.background =
            `radial-gradient(560px circle at ${e.clientX}px ${e.clientY}px, rgba(232,152,62,0.055), transparent 70%)`;
        }
        raf = null;
      });
    };
    window.addEventListener("mousemove", f, { passive: true });
    return () => window.removeEventListener("mousemove", f);
  }, []);
  return <div ref={ref} aria-hidden className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />;
}

// Barra de progreso de lectura (parte superior)
function BarraProgreso({ t }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      setP(h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1));
    };
    window.addEventListener("scroll", f, { passive: true });
    f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div
      className="fixed top-0 left-0 h-0.5"
      style={{ zIndex: 70, width: `${p * 100}%`, background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})`, transition: "width 0.1s linear" }}
    />
  );
}

// Botón flotante para volver arriba
function VolverArriba({ t }) {
  const [ver, setVer] = useState(false);
  useEffect(() => {
    const f = () => setVer(window.scrollY > 600);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <button
      type="button"
      aria-label="Volver arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
      style={{
        zIndex: 60, background: t.accent, color: "#14100A",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        opacity: ver ? 1 : 0, pointerEvents: ver ? "auto" : "none",
        transform: ver ? "translateY(0)" : "translateY(16px)",
      }}
    >
      <ArrowUp size={18} />
    </button>
  );
}

// Marquesina infinita de tecnologías, ahora con logos reales
function Marquesina({ t }) {
  const items = DATOS.tecnologias.flatMap((c) => c.items);
  const doble = [...items, ...items];
  const mascara = "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)";
  return (
    <Reveal>
      <div
        className="marquesina relative overflow-hidden py-3 mb-12 rounded-xl"
        style={{ border: `1px solid ${t.borderSoft}`, background: "rgba(13,17,23,0.6)", maskImage: mascara, WebkitMaskImage: mascara }}
      >
        <div className="pista flex items-center gap-9 w-max" style={{ animation: movReducido() ? "none" : "marquesina 32s linear infinite" }}>
          {doble.map((item, i) => (
            <span key={i} className="flex items-center gap-2.5 shrink-0">
              <IconoTech t={t} slug={item.slug} color={item.color} nombre={item.nombre} tam={16} />
              <span style={{ fontFamily: MONO, fontSize: 12.5, color: t.muted }}>{item.nombre}</span>
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// Etiqueta monoespaciada estilo "ficha técnica" — firma visual del sitio
function Eyebrow({ t, children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", color: t.accentText, textTransform: "uppercase" }}>
        {children}
      </span>
      <span className="flex-1 h-px" style={{ background: t.borderSoft, maxWidth: 64 }} />
    </div>
  );
}

function Chip({ t, children }) {
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-md"
      style={{ fontFamily: MONO, fontSize: 11, color: t.muted, background: t.surface2, border: `1px solid ${t.borderSoft}` }}
    >
      {children}
    </span>
  );
}

function Boton({ t, primario, icono: Icono, children, href, onClick, descarga }) {
  const base = "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:-translate-y-0.5";
  const clase = primario ? base + " btn-brillo" : base;
  const estilo = primario
    ? { background: t.accent, color: "#14100A", boxShadow: "0 4px 18px rgba(232,152,62,0.28)" }
    : { background: "rgba(13,17,23,0.5)", color: t.text, border: `1px solid ${t.border}` };
  const props = { className: clase, style: estilo, onClick };
  if (href !== undefined) {
    return (
      <a href={href} {...props} {...(descarga ? { download: true } : {})} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {Icono && <Icono size={16} strokeWidth={2} />}
        {children}
      </a>
    );
  }
  return (
    <button type="button" {...props}>
      {Icono && <Icono size={16} strokeWidth={2} />}
      {children}
    </button>
  );
}

/* ============================================================
   NAVEGACIÓN
   ============================================================ */

const SECCIONES = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "tecnologias", label: "Tecnologías" },
  { id: "certificados", label: "Certificados" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
];

function Nav({ t, irASeccion, enDetalle, volver }) {
  const [abierto, setAbierto] = useState(false);
  const [conFondo, setConFondo] = useState(false);

  useEffect(() => {
    const onScroll = () => setConFondo(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const click = (id) => { setAbierto(false); enDetalle ? volver(id) : irASeccion(id); };

  return (
    <header
      className="fixed top-0 left-0 right-0"
      style={{
        zIndex: 50,
        background: conFondo || abierto ? "rgba(7,9,13,0.82)" : "transparent",
        backdropFilter: conFondo || abierto ? "blur(14px)" : "none",
        borderBottom: `1px solid ${conFondo || abierto ? t.borderSoft : "transparent"}`,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <nav className="max-w-5xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <button type="button" onClick={() => click("inicio")} className="group flex items-center gap-2.5" style={{ color: t.text }}>
          <span
            className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-sm transition-transform duration-300 group-hover:rotate-12"
            style={{ background: `linear-gradient(135deg, ${t.accent}, #C77622)`, color: "#14100A", fontFamily: MONO }}
          >
            A
          </span>
          <span className="font-semibold text-sm tracking-tight hidden sm:block">{DATOS.nombre}</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {SECCIONES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => click(s.id)}
              className="px-3 py-2 rounded-md text-sm transition-colors duration-200"
              style={{ color: t.muted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = t.accentText)}
              onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setAbierto(!abierto)}
          aria-label="Menú"
          className="flex md:hidden w-9 h-9 rounded-lg items-center justify-center"
          style={{ border: `1px solid ${t.border}`, color: t.text }}
        >
          {abierto ? <X size={17} /> : <Menu size={17} />}
        </button>
      </nav>

      {abierto && (
        <div className="md:hidden px-5 pb-4 flex flex-col gap-1" style={{ borderTop: `1px solid ${t.borderSoft}` }}>
          {SECCIONES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => click(s.id)}
              className="text-left px-3 py-3 rounded-md text-sm font-medium"
              style={{ color: t.text }}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO — foto con anillo giratorio, orbes y contadores
   ============================================================ */

function Hero({ t, irASeccion }) {
  const [refStats, statsVisible] = useReveal();
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20 px-5 md:px-8">
      {/* Cuadrícula técnica que se desvanece */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
        {/* Columna de texto */}
        <div className="lg:col-span-3">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7"
              style={{ border: `1px solid ${t.border}`, background: "rgba(13,17,23,0.6)" }}
            >
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: t.ok }} />
                <span className="relative inline-flex rounded-full w-2 h-2" style={{ background: t.ok }} />
              </span>
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: t.muted }}>
                {DATOS.disponible.toUpperCase()}
              </span>
            </div>
          </Reveal>

          <h1
            className="font-extrabold tracking-tight mb-5"
            style={{ color: t.text, fontSize: "clamp(2.4rem, 6vw, 4.2rem)", lineHeight: 1.05 }}
          >
            {DATOS.nombre.split(" ").map((palabra, i) => (
              <span key={i} className="palabra" style={{ animationDelay: `${180 + i * 140}ms` }}>
                {palabra}{"\u00A0"}
              </span>
            ))}
          </h1>

          <Reveal delay={140}>
            <p style={{ fontFamily: MONO, fontSize: "clamp(0.78rem, 1.6vw, 0.95rem)", color: t.accentText, letterSpacing: "0.02em" }} className="mb-5">
              {DATOS.titulo}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-9" style={{ color: t.muted }}>
              {DATOS.descripcion}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="flex flex-wrap items-center gap-3">
              <Boton t={t} primario icono={Download} href={DATOS.cvUrl} descarga>Descargar CV</Boton>
              <Boton t={t} icono={ArrowRight} onClick={() => irASeccion("proyectos")}>Ver proyectos</Boton>
              <Boton t={t} icono={Github} href={DATOS.github}>GitHub</Boton>
              <Boton t={t} icono={Linkedin} href={DATOS.linkedin}>LinkedIn</Boton>
              <Boton t={t} icono={Mail} onClick={() => irASeccion("contacto")}>Contacto</Boton>
            </div>
          </Reveal>
        </div>

        {/* Columna de foto — reemplaza DATOS.fotos.perfil por tu foto real */}
        <Reveal delay={300} className="lg:col-span-2">
          <div className="relative max-w-xs mx-auto lg:max-w-none">
            {/* Anillo de luz giratorio detrás de la foto */}
            <div
              aria-hidden
              className="absolute rounded-3xl"
              style={{
                inset: -10,
                background: `conic-gradient(from 0deg, ${t.accent}, transparent 25%, ${t.accent2}, transparent 60%, ${t.accent})`,
                filter: "blur(14px)", opacity: 0.4,
                animation: movReducido() ? "none" : "girar 9s linear infinite",
              }}
            />
            <Foto
              src={DATOS.fotos.perfil}
              alt={`Foto de ${DATOS.nombre}`}
              gradiente={["#121823", "#2A1F10"]}
              className="rounded-2xl"
              style={{ aspectRatio: "4 / 5", boxShadow: "0 24px 60px rgba(0,0,0,0.45)", border: `1px solid ${t.border}` }}
            >
              <div
                className="absolute inset-x-0 bottom-0 px-4 py-3"
                style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}
              >
                <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", color: "rgba(255,255,255,0.9)" }}>
                  {DATOS.ubicacion.toUpperCase()} · CONECTA SYSTEMS
                </span>
              </div>
            </Foto>
            {/* Insignia flotante */}
            <div
              className="absolute flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
              style={{
                bottom: -16, left: -16, background: t.surface, border: `1px solid ${t.border}`,
                boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
                animation: movReducido() ? "none" : "flotar 6s ease-in-out infinite",
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: t.ok }} />
              <span style={{ fontFamily: MONO, fontSize: 11, color: t.text }}>4+ proyectos en producción</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Indicadores con contador animado */}
      <div ref={refStats} className="relative max-w-5xl mx-auto mt-14">
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-xl overflow-hidden"
          style={{
            background: t.borderSoft, border: `1px solid ${t.borderSoft}`,
            opacity: statsVisible ? 1 : 0, transform: statsVisible ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.65s ease 120ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) 120ms",
          }}
        >
          {DATOS.indicadores.map((ind) => (
            <div key={ind.etiqueta} className="p-5" style={{ background: "rgba(13,17,23,0.7)" }}>
              <div className="text-2xl font-bold mb-1" style={{ color: t.text }}>
                <Contador valor={ind.valor} visible={statsVisible} />
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: t.faint, letterSpacing: "0.04em" }}>{ind.etiqueta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SOBRE MÍ
   ============================================================ */

function SobreMi({ t }) {
  return (
    <section id="sobre-mi" className="py-16 md:py-24 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <Eyebrow t={t}>Sobre mí</Eyebrow>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" style={{ color: t.text }}>
            Software con propósito, no proyectos de práctica
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 items-start mt-8">
          {/* Foto — reemplaza DATOS.fotos.sobreMi por una foto tuya trabajando */}
          <Reveal delay={80} className="lg:col-span-2">
            <div className="relative">
              <div
                aria-hidden
                className="absolute rounded-xl"
                style={{ inset: 0, transform: "translate(-12px, 12px)", background: t.accentSoft }}
              />
              <Foto
                src={DATOS.fotos.sobreMi}
                alt="Espacio de trabajo"
                gradiente={["#121823", "#26190B"]}
                className="rounded-xl"
                style={{ aspectRatio: "4 / 3", border: `1px solid ${t.borderSoft}` }}
              >
                <div
                  className="absolute inset-x-0 bottom-0 px-4 py-2.5"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.12em", color: "rgba(255,255,255,0.88)" }}>
                    // CÓDIGO QUE LLEGA A PRODUCCIÓN
                  </span>
                </div>
              </Foto>
            </div>
          </Reveal>

          <div className="lg:col-span-3">
            <Reveal delay={120}>
              <p className="leading-relaxed mb-7" style={{ color: t.muted }}>
                {DATOS.sobreMi.intro}
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {DATOS.sobreMi.puntos.map((p, i) => (
                <Reveal key={p.titulo} delay={160 + i * 70}>
                  <div
                    className="h-full p-5 rounded-xl transition-all duration-200 hover:-translate-y-1"
                    style={{ background: "rgba(13,17,23,0.65)", border: `1px solid ${t.borderSoft}` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CircleCheck size={15} style={{ color: t.accentText }} />
                      <h3 className="font-semibold text-sm" style={{ color: t.text }}>{p.titulo}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: t.muted }}>{p.texto}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TECNOLOGÍAS — logos reales con nombre y propósito
   ============================================================ */

const ICONOS_CAT = { monitor: Monitor, layers: Layers, database: Database, wrench: Wrench, sparkles: Sparkles };

function Tecnologias({ t }) {
  return (
    <section id="tecnologias" className="py-16 md:py-24 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <Eyebrow t={t}>Stack tecnológico</Eyebrow>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" style={{ color: t.text }}>
            Herramientas elegidas con criterio
          </h2>
          <p className="max-w-2xl leading-relaxed mb-10" style={{ color: t.muted }}>
            Cada tecnología de esta lista está en uso real en mis proyectos. No es una colección de logos: es el stack con el que entrego software.
          </p>
        </Reveal>

        <Marquesina t={t} />

        <div className="grid md:grid-cols-2 gap-4">
          {DATOS.tecnologias.map((cat, i) => {
            const Icono = ICONOS_CAT[cat.icono] || Layers;
            return (
              <Reveal key={cat.categoria} delay={i * 60} className={i === DATOS.tecnologias.length - 1 ? "md:col-span-2" : ""}>
                <TiltCard>
                  <div className="group relative h-full p-5 md:p-6 rounded-xl overflow-hidden" style={{ background: "rgba(13,17,23,0.65)", border: `1px solid ${t.borderSoft}` }}>
                    <div className="foco absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: t.accentSoft, color: t.accentText }}>
                          <Icono size={16} />
                        </span>
                        <h3 className="font-semibold" style={{ color: t.text }}>{cat.categoria}</h3>
                      </div>
                      <p className="text-sm mb-5" style={{ color: t.faint }}>{cat.descripcion}</p>
                      <div className={`grid gap-3.5 ${i === DATOS.tecnologias.length - 1 ? "sm:grid-cols-2" : ""}`}>
                        {cat.items.map((item) => (
                          <div key={item.nombre} className="flex items-start gap-3">
                            <IconoTech t={t} slug={item.slug} color={item.color} nombre={item.nombre} />
                            <div className="min-w-0">
                              <div className="font-medium text-sm" style={{ color: t.text }}>{item.nombre}</div>
                              <div className="text-sm leading-snug" style={{ color: t.muted }}>{item.detalle}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CERTIFICADOS — carrusel deslizable: agrega los que quieras
   al array DATOS.certificados y el diseño no cambia.
   ============================================================ */

function Certificados({ t }) {
  const [activo, setActivo] = useState(null);
  const pista = useRef(null);
  const desplazar = (dir) => pista.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  const total = DATOS.certificados.length;

  return (
    <section id="certificados" className="py-16 md:py-24 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-2">
            <div>
              <Eyebrow t={t}>Certificados</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: t.text }}>
                Formación que respalda la práctica
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                type="button" aria-label="Anterior" onClick={() => desplazar(-1)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: `1px solid ${t.border}`, color: t.text, background: "rgba(13,17,23,0.6)" }}
              >
                <ChevronLeft size={17} />
              </button>
              <button
                type="button" aria-label="Siguiente" onClick={() => desplazar(1)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: `1px solid ${t.border}`, color: t.text, background: "rgba(13,17,23,0.6)" }}
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
          <p className="mb-7" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: t.faint }}>
            {String(total).padStart(2, "0")} CERTIFICADOS · DESLIZA PARA VER MÁS →
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div
            ref={pista}
            className="sin-scroll flex gap-4 overflow-x-auto pb-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {DATOS.certificados.map((c) => (
              <button
                key={c.codigo}
                type="button"
                onClick={() => setActivo(c)}
                className="group w-64 shrink-0 text-left rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1"
                style={{ background: "rgba(13,17,23,0.65)", border: `1px solid ${t.borderSoft}`, scrollSnapAlign: "start" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.borderSoft)}
              >
                <Foto src={c.imagen} alt={c.nombre} gradiente={["#121823", "#2A1F10"]} className="h-32" style={{ borderBottom: `1px solid ${t.borderSoft}` }}>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 30%, rgba(0,0,0,0.55))" }} />
                  <div className="absolute bottom-2 left-3 flex items-center gap-2">
                    <Award size={15} style={{ color: t.accentText }} />
                    <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.92)" }}>{c.codigo}</span>
                  </div>
                </Foto>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1 leading-snug" style={{ color: t.text }}>{c.nombre}</h3>
                  <p style={{ fontFamily: MONO, fontSize: 11, color: t.faint }} className="mb-2">
                    {c.institucion} · {c.fecha}
                  </p>
                  <span className="text-xs font-medium inline-flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-0.5" style={{ color: t.accentText }}>
                    Ver detalle <ArrowUpRight size={12} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Modal de certificado */}
      {activo && (
        <div
          className="fixed inset-0 flex items-center justify-center p-5"
          style={{ zIndex: 60, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
          onClick={() => setActivo(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl overflow-hidden modal-entrada"
            style={{ background: t.surface, border: `1px solid ${t.border}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <Foto src={activo.imagen} alt={activo.nombre} gradiente={["#121823", "#2A1F10"]} className="h-48">
              <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 40%, rgba(0,0,0,0.6))" }} />
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <Award size={18} style={{ color: t.accentText }} />
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.92)" }}>
                  {activo.codigo} · IMAGEN DEL CERTIFICADO
                </span>
              </div>
            </Foto>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-1" style={{ color: t.text }}>{activo.nombre}</h3>
              <p style={{ fontFamily: MONO, fontSize: 12, color: t.accentText }} className="mb-3">
                {activo.institucion} · {activo.fecha}
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: t.muted }}>{activo.descripcion}</p>
              <Boton t={t} onClick={() => setActivo(null)}>Cerrar</Boton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   PROYECTOS — filtros por pestaña y rejilla de 2 columnas:
   agrega proyectos al array y el diseño escala solo.
   ============================================================ */

function MiniaturaProyecto({ t, p, alta }) {
  return (
    <Foto
      src={p.imagen}
      alt={p.nombre}
      gradiente={p.gradiente}
      className={`flex items-end ${alta ? "h-48 md:h-64" : "h-44"}`}
    >
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(150deg, ${p.gradiente[0]}CC 0%, ${p.gradiente[1]}55 55%, transparent 100%)` }}
      />
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <span
        className="relative m-3 px-2 py-1 rounded"
        style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.94)", background: "rgba(0,0,0,0.45)" }}
      >
        {p.codigo} · {CATEGORIAS.find((c) => c.id === p.categoria)?.titulo.toUpperCase()}
      </span>
    </Foto>
  );
}

function FilaDato({ t, etiqueta, children }) {
  return (
    <div className="flex gap-2.5 items-start">
      <span className="shrink-0 mt-0.5 w-20" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: t.accentText }}>
        {etiqueta}
      </span>
      <p className="text-sm leading-snug" style={{ color: t.muted }}>{children}</p>
    </div>
  );
}

function TarjetaProyecto({ t, p, abrir, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard>
        <button
          type="button"
          onClick={() => abrir(p.id)}
          className="group relative w-full h-full text-left rounded-xl overflow-hidden transition-all duration-200"
          style={{ background: "rgba(13,17,23,0.65)", border: `1px solid ${t.borderSoft}` }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.borderSoft)}
        >
          <div className="foco absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ zIndex: 2 }} />
          <MiniaturaProyecto t={t} p={p} />
          <div className="p-5">
            <h3 className="font-bold text-base mb-1.5" style={{ color: t.text }}>{p.nombre}</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: t.muted }}>{p.corto}</p>
            <div className="space-y-2.5 mb-4 pb-4" style={{ borderBottom: `1px solid ${t.borderSoft}` }}>
              <FilaDato t={t} etiqueta="PROBLEMA">{p.problema}</FilaDato>
              <FilaDato t={t} etiqueta="RESULTADO">{p.resultado}</FilaDato>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.stack.map((s) => <Chip key={s} t={t}>{s}</Chip>)}
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium transition-transform duration-200 group-hover:translate-x-1" style={{ color: t.accentText }}>
              Ver caso completo <ArrowRight size={15} />
            </span>
          </div>
        </button>
      </TiltCard>
    </Reveal>
  );
}

function Proyectos({ t, abrir }) {
  const [filtro, setFiltro] = useState("todos");
  const pestanas = [
    { id: "todos", label: "Todos", n: DATOS.proyectos.length },
    ...CATEGORIAS.map((c) => ({
      id: c.id,
      label: c.titulo.replace("Proyectos ", "").replace("Soluciones para ", "").replace(/^./, (m) => m.toUpperCase()),
      n: DATOS.proyectos.filter((p) => p.categoria === c.id).length,
    })),
  ];
  const lista = filtro === "todos" ? DATOS.proyectos : DATOS.proyectos.filter((p) => p.categoria === filtro);
  const nota = CATEGORIAS.find((c) => c.id === filtro)?.nota;

  return (
    <section id="proyectos" className="py-16 md:py-24 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <Eyebrow t={t}>Proyectos</Eyebrow>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" style={{ color: t.text }}>
            Problemas reales, soluciones en producción
          </h2>
          <p className="max-w-2xl leading-relaxed mb-8" style={{ color: t.muted }}>
            Cada proyecto incluye su caso completo: el problema, la solución, la arquitectura y las decisiones técnicas detrás.
          </p>
        </Reveal>

        {/* Pestañas de filtro */}
        <Reveal delay={60}>
          <div className="flex flex-wrap gap-2 mb-3">
            {pestanas.map((tab) => {
              const activa = filtro === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFiltro(tab.id)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    background: activa ? t.accent : "rgba(13,17,23,0.6)",
                    color: activa ? "#14100A" : t.muted,
                    border: `1px solid ${activa ? t.accent : t.border}`,
                  }}
                >
                  {tab.label}
                  <span className="ml-1.5" style={{ fontFamily: MONO, fontSize: 11, opacity: 0.75 }}>{tab.n}</span>
                </button>
              );
            })}
          </div>
          <p className="text-sm mb-8" style={{ color: t.faint, minHeight: 20 }}>
            {nota || "Todo mi trabajo: implementado, para negocios y personal."}
          </p>
        </Reveal>

        {/* Rejilla de 2 columnas: crece hacia abajo sin apiñarse */}
        <div key={filtro} className="grid md:grid-cols-2 gap-5">
          {lista.map((p, i) => (
            <TarjetaProyecto key={p.id} t={t} p={p} abrir={abrir} delay={Math.min(i, 5) * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PÁGINA INDIVIDUAL DE PROYECTO
   ============================================================ */

const GRUPOS_STACK = [
  ["frontend", "Frontend"],
  ["backend", "Backend"],
  ["baseDatos", "Base de datos"],
  ["herramientas", "Herramientas"],
  ["ia", "Inteligencia Artificial"],
];

function SeccionDetalle({ t, etiqueta, titulo, children }) {
  return (
    <Reveal className="mb-10">
      <Eyebrow t={t}>{etiqueta}</Eyebrow>
      {titulo && <h2 className="text-xl font-bold tracking-tight mb-3" style={{ color: t.text }}>{titulo}</h2>}
      {children}
    </Reveal>
  );
}

function PaginaProyecto({ t, proyecto: p, volver }) {
  const d = p.detalle;
  return (
    <main className="pt-24 pb-20 px-5 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <button
            type="button"
            onClick={() => volver("proyectos")}
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-transform duration-200 hover:-translate-x-1"
            style={{ color: t.muted }}
          >
            <ArrowLeft size={15} /> Volver a proyectos
          </button>
        </Reveal>

        <Reveal delay={60}>
          <div className="rounded-xl overflow-hidden mb-8" style={{ border: `1px solid ${t.borderSoft}`, boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }}>
            <MiniaturaProyecto t={t} p={p} alta />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3" style={{ color: t.text }}>
            {p.nombre}
          </h1>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {p.stack.map((s) => <Chip key={s} t={t}>{s}</Chip>)}
          </div>
          <div className="flex flex-wrap gap-3 mb-12">
            <Boton t={t} primario icono={ExternalLink} href={d.demo}>Ver demo</Boton>
            <Boton t={t} icono={FolderGit2} href={d.repo}>Código en GitHub</Boton>
          </div>
        </Reveal>

        <SeccionDetalle t={t} etiqueta="Resumen ejecutivo">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.resumen}</p>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Problema" titulo="¿Qué necesidad existía?">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.problemaLargo}</p>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Solución" titulo="¿Cómo se resolvió?">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.solucion}</p>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Arquitectura" titulo="Enfoque técnico">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.arquitectura}</p>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Stack tecnológico">
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${t.borderSoft}` }}>
            {GRUPOS_STACK.map(([clave, titulo], i) =>
              d.stackDetalle[clave]?.length ? (
                <div
                  key={clave}
                  className="p-4 md:p-5 grid md:grid-cols-3 gap-1 md:gap-4"
                  style={{ background: i % 2 ? t.surface2 : "rgba(13,17,23,0.65)", borderTop: i ? `1px solid ${t.borderSoft}` : "none" }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: t.accentText }} className="uppercase pt-0.5">
                    {titulo}
                  </span>
                  <ul className="space-y-1.5 md:col-span-2">
                    {d.stackDetalle[clave].map((item) => (
                      <li key={item} className="text-sm leading-snug" style={{ color: t.muted }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Decisiones técnicas" titulo="Criterio detrás del código">
          <div className="space-y-4">
            {d.decisiones.map((dec) => (
              <div key={dec.titulo} className="p-5 rounded-xl transition-transform duration-200 hover:-translate-y-0.5" style={{ background: "rgba(13,17,23,0.65)", border: `1px solid ${t.borderSoft}` }}>
                <h3 className="font-semibold text-sm mb-1.5" style={{ color: t.text }}>{dec.titulo}</h3>
                <p className="text-sm leading-relaxed" style={{ color: t.muted }}>{dec.texto}</p>
              </div>
            ))}
          </div>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Resultado" titulo="Impacto del proyecto">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.impacto}</p>
        </SeccionDetalle>

        <Reveal>
          <div className="flex flex-wrap gap-3 pt-2">
            <Boton t={t} primario icono={ExternalLink} href={d.demo}>Ver demo</Boton>
            <Boton t={t} icono={FolderGit2} href={d.repo}>Código en GitHub</Boton>
            <Boton t={t} icono={ArrowLeft} onClick={() => volver("proyectos")}>Más proyectos</Boton>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

/* ============================================================
   CONTACTO Y FOOTER
   ============================================================ */

function Contacto({ t }) {
  const canales = [
    { icono: Mail, etiqueta: "Email", valor: DATOS.email, href: `mailto:${DATOS.email}` },
    { icono: Github, etiqueta: "GitHub", valor: "Ver repositorios", href: DATOS.github },
    { icono: Linkedin, etiqueta: "LinkedIn", valor: "Perfil profesional", href: DATOS.linkedin },
  ];
  return (
    <section id="contacto" className="py-16 md:py-24 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div
          className="relative overflow-hidden rounded-2xl p-8 md:p-12 text-center"
          style={{ background: "rgba(13,17,23,0.75)", border: `1px solid ${t.borderSoft}` }}
        >
          <div
            aria-hidden
            className="absolute pointer-events-none rounded-full"
            style={{
              top: -120, left: "50%", marginLeft: -200, width: 400, height: 240,
              background: "radial-gradient(ellipse, rgba(232,152,62,0.13), transparent 70%)",
              animation: movReducido() ? "none" : "flotar 10s ease-in-out infinite",
            }}
          />
          <Reveal>
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", color: t.accentText }}>CONTACTO</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-3" style={{ color: t.text }}>
              ¿Buscas un desarrollador junior que ya entrega en producción?
            </h2>
            <p className="max-w-xl mx-auto leading-relaxed mb-8" style={{ color: t.muted }}>
              Estoy abierto a oportunidades de desarrollo web, automatización e IA. Respondo rápido y con gusto conversamos sobre cómo puedo aportar a tu equipo.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative flex flex-col sm:flex-row justify-center gap-3 mb-8">
              {canales.map((c) => (
                <a
                  key={c.etiqueta}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-left transition-all duration-200 hover:-translate-y-1"
                  style={{ background: t.surface2, border: `1px solid ${t.borderSoft}` }}
                >
                  <c.icono size={17} style={{ color: t.accentText }} />
                  <span>
                    <span className="block text-xs" style={{ fontFamily: MONO, color: t.faint }}>{c.etiqueta}</span>
                    <span className="block text-sm font-medium" style={{ color: t.text }}>{c.valor}</span>
                  </span>
                </a>
              ))}
            </div>
            <Boton t={t} primario icono={Mail} href={`mailto:${DATOS.email}`}>Escríbeme ahora</Boton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="py-8 px-5 md:px-8" style={{ borderTop: `1px solid ${t.borderSoft}` }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-sm" style={{ color: t.faint }}>
          © {new Date().getFullYear()} {DATOS.nombre} · Hecho con React y criterio.
        </span>
        <span className="inline-flex items-center gap-1.5" style={{ fontFamily: MONO, fontSize: 11, color: t.faint }}>
          <MapPin size={12} /> {DATOS.ubicacion}
        </span>
      </div>
    </footer>
  );
}

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  const t = TEMA;
  const [vista, setVista] = useState({ pagina: "home" }); // {pagina:'home'} | {pagina:'proyecto', id}

  const irASeccion = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const abrirProyecto = (id) => {
    setVista({ pagina: "proyecto", id });
    window.scrollTo({ top: 0 });
  };

  const volver = (seccion) => {
    setVista({ pagina: "home" });
    requestAnimationFrame(() => setTimeout(() => irASeccion(seccion || "proyectos"), 60));
  };

  const proyectoActivo = vista.pagina === "proyecto" ? DATOS.proyectos.find((p) => p.id === vista.id) : null;

  return (
    <div style={{ background: t.bg, color: t.text, fontFamily: SANS, minHeight: "100vh" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes flotar { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(10px, -16px); } }
        @keyframes deriva1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(70px, 50px) scale(1.18); } }
        @keyframes deriva2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-60px, -40px) scale(1.12); } }
        @keyframes girar { to { transform: rotate(360deg); } }
        @keyframes marquesina { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes aparecerPalabra { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalEntrada { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .palabra { display: inline-block; animation: aparecerPalabra 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .modal-entrada { animation: modalEntrada 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .marquesina:hover .pista { animation-play-state: paused; }
        .btn-brillo { position: relative; overflow: hidden; }
        .btn-brillo::after {
          content: ""; position: absolute; top: 0; left: -130%; width: 55%; height: 100%;
          background: linear-gradient(105deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-18deg); transition: left 0.55s ease;
        }
        .btn-brillo:hover::after { left: 150%; }
        .zoomable img { transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
        .group:hover .zoomable img, .zoomable:hover img { transform: scale(1.07); }
        .foco { background: radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), ${t.accentSoft}, transparent 65%); }
        .sin-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .sin-scroll::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        ::selection { background: ${t.accent}; color: #14100A; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${t.accent}; outline-offset: 2px; border-radius: 6px; }
      `}</style>

      <FondoGlobal t={t} />
      <LuzCursor />
      <BarraProgreso t={t} />

      <Nav
        t={t}
        irASeccion={irASeccion}
        enDetalle={vista.pagina === "proyecto"}
        volver={volver}
      />

      <div className="relative" style={{ zIndex: 2 }}>
        {proyectoActivo ? (
          <PaginaProyecto t={t} proyecto={proyectoActivo} volver={volver} />
        ) : (
          <main>
            <Hero t={t} irASeccion={irASeccion} />
            <SobreMi t={t} />
            <Tecnologias t={t} />
            <Certificados t={t} />
            <Proyectos t={t} abrir={abrirProyecto} />
            <Contacto t={t} />
          </main>
        )}
        <Footer t={t} />
      </div>

      <VolverArriba t={t} />
    </div>
  );
}
