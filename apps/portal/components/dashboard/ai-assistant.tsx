"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  X,
  Send,
  Minimize2,
  Maximize2,
  Bot,
  User,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  FileText,
  Calculator,
  Package,
  Users,
  BarChart3,
  Mic,
  Paperclip,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Zap,
  MessageSquare,
  Brain,
  Wand2,
  ArrowRight,
  CheckCircle2,
  Download,
  Workflow,
  Target,
  Loader2,
  ExternalLink,
  Pin,
  ShoppingCart,
  Factory,
  Shield,
  Receipt,
  Phone,
  Warehouse,
  HelpCircle,
  Code,
  LayoutDashboard,
  Globe,
  CreditCard,
  UserPlus,
  ClipboardList,
  Truck,
  DollarSign,
  PieChart,
  Activity,
  FileBarChart,
  Scale,
  Banknote,
  HeartPulse,
  FolderKanban,
  ShieldCheck,
  Store,
  Map,
  Headphones,
  Boxes,
  FormInput,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  type?: "text" | "chart" | "table" | "code" | "image"
  data?: any
  suggestions?: string[]
  actions?: { label: string; action: string; icon?: any }[]
  isPinned?: boolean
  isLoading?: boolean
}

interface Conversation {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
  isPinned?: boolean
}

const moduleContexts: Record<
  string,
  {
    name: string
    icon: any
    color: string
    greeting: string
    quickActions: { icon: any; label: string; prompt: string }[]
    insights: { text: string; type: "positive" | "warning" | "negative" }[]
  }
> = {
  dashboard: {
    name: "Dashboard Principal",
    icon: LayoutDashboard,
    color: "from-teal-500 to-cyan-500",
    greeting:
      "Estás en el Dashboard Principal. Puedo mostrarte un resumen ejecutivo, KPIs críticos, alertas del día o cualquier métrica de tu negocio.",
    quickActions: [
      {
        icon: TrendingUp,
        label: "Resumen ejecutivo del día",
        prompt: "Dame un resumen ejecutivo del día con los KPIs más importantes",
      },
      {
        icon: AlertTriangle,
        label: "Alertas críticas",
        prompt: "¿Cuáles son las alertas críticas que requieren mi atención?",
      },
      { icon: Target, label: "KPIs vs metas", prompt: "¿Cómo vamos con los KPIs vs las metas del mes?" },
      { icon: PieChart, label: "Distribución de ingresos", prompt: "Muéstrame la distribución de ingresos por módulo" },
    ],
    insights: [
      { text: "Las ventas superaron la meta diaria en 15%", type: "positive" },
      { text: "3 facturas vencidas requieren seguimiento", type: "warning" },
      { text: "Inventario de 5 productos en nivel crítico", type: "negative" },
    ],
  },
  ventas: {
    name: "Ventas / CRM",
    icon: ShoppingCart,
    color: "from-green-500 to-emerald-500",
    greeting:
      "Estás en el módulo de Ventas/CRM. Puedo ayudarte a analizar el pipeline, identificar oportunidades, predecir cierres y optimizar tu estrategia comercial.",
    quickActions: [
      {
        icon: TrendingUp,
        label: "Análisis de pipeline",
        prompt: "Analiza mi pipeline de ventas y dame insights sobre oportunidades de cierre",
      },
      {
        icon: Users,
        label: "Clientes en riesgo de churn",
        prompt: "Identifica clientes en riesgo de churn y sugiere acciones de retención",
      },
      {
        icon: Target,
        label: "Pronóstico de ventas",
        prompt: "Genera un pronóstico de ventas para los próximos 30 días",
      },
      {
        icon: DollarSign,
        label: "Top oportunidades",
        prompt: "¿Cuáles son las top 10 oportunidades por valor que puedo cerrar este mes?",
      },
    ],
    insights: [
      { text: "Pipeline total: $2.3B - 45 oportunidades activas", type: "positive" },
      { text: "5 deals en etapa final sin actividad en 7 días", type: "warning" },
      { text: "Win rate bajó de 35% a 28% este mes", type: "negative" },
    ],
  },
  compras: {
    name: "Compras",
    icon: ClipboardList,
    color: "from-orange-500 to-amber-500",
    greeting:
      "Estás en el módulo de Compras. Puedo ayudarte a optimizar órdenes, evaluar proveedores, encontrar mejores precios y predecir necesidades de abastecimiento.",
    quickActions: [
      {
        icon: Package,
        label: "Órdenes pendientes",
        prompt: "¿Cuáles órdenes de compra están pendientes de recepción?",
      },
      {
        icon: Users,
        label: "Evaluación de proveedores",
        prompt: "Evalúa el desempeño de mis proveedores principales en los últimos 3 meses",
      },
      {
        icon: DollarSign,
        label: "Optimizar costos",
        prompt: "Identifica oportunidades de ahorro en compras recurrentes",
      },
      {
        icon: TrendingUp,
        label: "Predicción de compras",
        prompt: "Predice las necesidades de compra para el próximo mes basado en histórico",
      },
    ],
    insights: [
      { text: "5 OC por $180M pendientes de aprobación", type: "warning" },
      { text: "Proveedor ABC tiene 3 entregas retrasadas", type: "negative" },
      { text: "Ahorro potencial de $45M consolidando proveedores", type: "positive" },
    ],
  },
  inventario: {
    name: "Inventario",
    icon: Package,
    color: "from-blue-500 to-indigo-500",
    greeting:
      "Estás en el módulo de Inventario. Puedo ayudarte a optimizar stock, predecir demanda, identificar productos de baja rotación y gestionar múltiples almacenes.",
    quickActions: [
      {
        icon: AlertTriangle,
        label: "Productos críticos",
        prompt: "¿Cuáles productos están en stock crítico y necesitan reabastecimiento urgente?",
      },
      {
        icon: TrendingUp,
        label: "Predicción de demanda",
        prompt: "Predice la demanda de mis top 20 productos para las próximas 4 semanas",
      },
      {
        icon: Package,
        label: "Productos sin rotación",
        prompt: "Identifica productos sin movimiento en los últimos 90 días",
      },
      {
        icon: DollarSign,
        label: "Valorización de inventario",
        prompt: "Dame un resumen de la valorización del inventario por categoría",
      },
    ],
    insights: [
      { text: "Rotación promedio: 4.2x - Saludable", type: "positive" },
      { text: "12 productos sin movimiento en 90 días ($34M)", type: "warning" },
      { text: "5 SKUs en nivel crítico - Generar OC", type: "negative" },
    ],
  },
  contabilidad: {
    name: "Contabilidad",
    icon: Calculator,
    color: "from-purple-500 to-violet-500",
    greeting:
      "Estás en el módulo de Contabilidad. Puedo ayudarte con análisis financiero, conciliaciones, cierre contable, normativa colombiana y reportes DIAN.",
    quickActions: [
      {
        icon: FileBarChart,
        label: "Estado de resultados",
        prompt: "Genera el estado de resultados del mes actual vs mes anterior",
      },
      {
        icon: Scale,
        label: "Conciliación bancaria",
        prompt: "¿Cuál es el estado de la conciliación bancaria? ¿Hay partidas pendientes?",
      },
      {
        icon: Receipt,
        label: "Análisis de gastos",
        prompt: "Analiza los gastos por centro de costo e identifica anomalías",
      },
      {
        icon: AlertTriangle,
        label: "Alertas contables",
        prompt: "¿Hay alertas contables o discrepancias que deba revisar?",
      },
    ],
    insights: [
      { text: "Margen operacional 18.5% - Por encima del objetivo", type: "positive" },
      { text: "45 partidas de conciliación pendientes", type: "warning" },
      { text: "Cierre contable atrasado 2 días", type: "negative" },
    ],
  },
  tesoreria: {
    name: "Tesorería",
    icon: Banknote,
    color: "from-emerald-500 to-green-500",
    greeting:
      "Estás en el módulo de Tesorería. Puedo ayudarte a proyectar flujo de caja, optimizar pagos, gestionar inversiones y mantener liquidez óptima.",
    quickActions: [
      { icon: TrendingUp, label: "Proyección de flujo", prompt: "Proyecta el flujo de caja para los próximos 30 días" },
      {
        icon: DollarSign,
        label: "Pagos programados",
        prompt: "¿Cuáles son los pagos programados para esta semana y hay fondos suficientes?",
      },
      {
        icon: Banknote,
        label: "Optimizar excedentes",
        prompt: "Tenemos excedentes de efectivo, ¿qué opciones de inversión recomiendas?",
      },
      {
        icon: AlertTriangle,
        label: "Alertas de liquidez",
        prompt: "¿Hay riesgo de déficit de liquidez en los próximos 15 días?",
      },
    ],
    insights: [
      { text: "Saldo consolidado: $890M - Liquidez óptima", type: "positive" },
      { text: "Pagos de $340M esta semana - Revisar prioridades", type: "warning" },
      { text: "Déficit proyectado semana 3: $45M", type: "negative" },
    ],
  },
  rrhh: {
    name: "Recursos Humanos",
    icon: Users,
    color: "from-pink-500 to-rose-500",
    greeting:
      "Estás en el módulo de RRHH. Puedo ayudarte con análisis de nómina, rotación, clima laboral, vacantes y cumplimiento laboral colombiano.",
    quickActions: [
      {
        icon: Users,
        label: "Análisis de rotación",
        prompt: "Analiza la rotación de personal y predice posibles renuncias",
      },
      {
        icon: DollarSign,
        label: "Costo de nómina",
        prompt: "Dame un análisis detallado del costo de nómina por departamento",
      },
      {
        icon: Target,
        label: "Vacantes abiertas",
        prompt: "¿Cuáles vacantes llevan más tiempo abiertas y qué recomiendas?",
      },
      {
        icon: HeartPulse,
        label: "Clima laboral",
        prompt: "¿Cómo está el clima laboral según los últimos indicadores?",
      },
    ],
    insights: [
      { text: "Rotación 8.5% - Dentro del objetivo", type: "positive" },
      { text: "3 empleados clave identificados como riesgo de fuga", type: "warning" },
      { text: "5 vacantes sin cubrir hace más de 30 días", type: "negative" },
    ],
  },
  proyectos: {
    name: "Proyectos",
    icon: FolderKanban,
    color: "from-indigo-500 to-blue-500",
    greeting:
      "Estás en el módulo de Proyectos. Puedo ayudarte a monitorear avances, identificar cuellos de botella, optimizar recursos y predecir retrasos.",
    quickActions: [
      {
        icon: Target,
        label: "Estado de proyectos",
        prompt: "Dame un resumen del estado de todos los proyectos activos",
      },
      {
        icon: AlertTriangle,
        label: "Proyectos en riesgo",
        prompt: "¿Cuáles proyectos están en riesgo de retraso y por qué?",
      },
      {
        icon: Users,
        label: "Carga de recursos",
        prompt: "Analiza la carga de trabajo del equipo e identifica sobreasignaciones",
      },
      {
        icon: TrendingUp,
        label: "Rentabilidad",
        prompt: "¿Cuál es la rentabilidad proyectada vs real de cada proyecto?",
      },
    ],
    insights: [
      { text: "85% de proyectos en tiempo - Buen rendimiento", type: "positive" },
      { text: "Proyecto ERP tiene 2 tareas críticas retrasadas", type: "warning" },
      { text: "3 recursos con más de 120% de capacidad", type: "negative" },
    ],
  },
  manufactura: {
    name: "Manufactura / MRP",
    icon: Factory,
    color: "from-slate-500 to-zinc-500",
    greeting:
      "Estás en el módulo de Manufactura/MRP. Puedo ayudarte a planificar producción, optimizar recursos, analizar eficiencia y gestionar órdenes de producción.",
    quickActions: [
      {
        icon: Activity,
        label: "Eficiencia de planta",
        prompt: "¿Cuál es la eficiencia de planta actual y cómo se compara con el objetivo?",
      },
      { icon: Package, label: "Plan de producción", prompt: "Optimiza el plan de producción para la próxima semana" },
      {
        icon: AlertTriangle,
        label: "Cuellos de botella",
        prompt: "Identifica cuellos de botella en la línea de producción",
      },
      {
        icon: TrendingUp,
        label: "OEE por máquina",
        prompt: "Muéstrame el OEE de cada máquina e identifica las de bajo rendimiento",
      },
    ],
    insights: [
      { text: "OEE global 87% - Excelente rendimiento", type: "positive" },
      { text: "Máquina CNC-03 con 12% de tiempo inactivo", type: "warning" },
      { text: "3 órdenes de producción retrasadas", type: "negative" },
    ],
  },
  pos: {
    name: "Punto de Venta",
    icon: Store,
    color: "from-cyan-500 to-teal-500",
    greeting:
      "Estás en el módulo de Punto de Venta. Puedo ayudarte a analizar ventas por caja, turno, vendedor, y optimizar la operación retail.",
    quickActions: [
      { icon: TrendingUp, label: "Ventas del día", prompt: "¿Cómo van las ventas del día por punto de venta?" },
      { icon: Users, label: "Desempeño de cajeros", prompt: "Analiza el desempeño de cada cajero hoy" },
      { icon: Package, label: "Productos más vendidos", prompt: "¿Cuáles son los productos más vendidos hoy?" },
      {
        icon: DollarSign,
        label: "Ticket promedio",
        prompt: "¿Cómo está el ticket promedio comparado con el objetivo?",
      },
    ],
    insights: [
      { text: "Ventas del día: $45M - 12% arriba del objetivo", type: "positive" },
      { text: "Caja 3 con 15 min promedio por transacción", type: "warning" },
      { text: "Stock agotado de 3 productos de alta rotación", type: "negative" },
    ],
  },
  "facturacion-dian": {
    name: "Facturación Electrónica",
    icon: Receipt,
    color: "from-red-500 to-orange-500",
    greeting:
      "Estás en el módulo de Facturación Electrónica DIAN. Puedo ayudarte con emisión de documentos, validación, resoluciones y cumplimiento normativo.",
    quickActions: [
      {
        icon: CheckCircle2,
        label: "Estado de documentos",
        prompt: "¿Cuál es el estado de los documentos electrónicos de hoy?",
      },
      {
        icon: AlertTriangle,
        label: "Documentos rechazados",
        prompt: "¿Hay documentos rechazados por la DIAN? ¿Cuál es el error?",
      },
      {
        icon: Receipt,
        label: "Resolución vigente",
        prompt: "¿Cuántos números de factura quedan en la resolución vigente?",
      },
      { icon: FileText, label: "Reporte mensual", prompt: "Genera el reporte de facturación electrónica del mes" },
    ],
    insights: [
      { text: "98.5% de aceptación DIAN este mes", type: "positive" },
      { text: "Resolución con 234 números disponibles", type: "warning" },
      { text: "3 documentos rechazados pendientes de corrección", type: "negative" },
    ],
  },
  contactos: {
    name: "Contactos / Clientes",
    icon: UserPlus,
    color: "from-violet-500 to-purple-500",
    greeting:
      "Estás en el módulo de Contactos. Puedo ayudarte a segmentar clientes, analizar comportamiento, identificar oportunidades y gestionar relaciones.",
    quickActions: [
      {
        icon: Users,
        label: "Segmentación de clientes",
        prompt: "Segmenta mis clientes por valor y frecuencia de compra",
      },
      { icon: TrendingUp, label: "Clientes con potencial", prompt: "Identifica clientes con potencial de crecimiento" },
      {
        icon: AlertTriangle,
        label: "Clientes inactivos",
        prompt: "¿Cuáles clientes no han comprado en los últimos 60 días?",
      },
      { icon: Target, label: "Análisis RFM", prompt: "Genera un análisis RFM de mi base de clientes" },
    ],
    insights: [
      { text: "1,245 clientes activos - 15% nuevos este mes", type: "positive" },
      { text: "45 clientes sin compras en 60 días", type: "warning" },
      { text: "NPS cayó de 72 a 68 este mes", type: "negative" },
    ],
  },
  "almacen-visual": {
    name: "Almacén Visual",
    icon: Warehouse,
    color: "from-amber-500 to-yellow-500",
    greeting:
      "Estás en el módulo de Almacén Visual. Puedo ayudarte a optimizar layout, analizar flujo de productos, identificar zonas calientes y planificar picking.",
    quickActions: [
      { icon: Map, label: "Optimizar layout", prompt: "Analiza el layout actual y sugiere mejoras de distribución" },
      { icon: Activity, label: "Mapa de calor", prompt: "Genera un mapa de calor de actividad por zona" },
      { icon: Truck, label: "Optimizar picking", prompt: "Optimiza las rutas de picking para los pedidos pendientes" },
      { icon: Package, label: "Productos mal ubicados", prompt: "Identifica productos mal ubicados según su rotación" },
    ],
    insights: [
      { text: "Utilización del espacio: 78% - Óptimo", type: "positive" },
      { text: "15 productos de alta rotación en zonas lejanas", type: "warning" },
      { text: "Zona B con 23% menos eficiencia de picking", type: "negative" },
    ],
  },
  "call-center": {
    name: "Call Center AI",
    icon: Headphones,
    color: "from-rose-500 to-pink-500",
    greeting:
      "Estás en el módulo de Call Center AI. Puedo ayudarte a analizar llamadas, optimizar atención, medir satisfacción y gestionar agentes.",
    quickActions: [
      {
        icon: Phone,
        label: "Estado del call center",
        prompt: "¿Cuál es el estado actual del call center? Llamadas en espera, agentes disponibles",
      },
      { icon: TrendingUp, label: "Métricas del día", prompt: "Dame las métricas de atención del día" },
      { icon: Users, label: "Desempeño de agentes", prompt: "Analiza el desempeño de cada agente hoy" },
      {
        icon: AlertTriangle,
        label: "Casos escalados",
        prompt: "¿Cuáles casos han sido escalados y requieren atención?",
      },
    ],
    insights: [
      { text: "Tiempo promedio de espera: 45s - Excelente", type: "positive" },
      { text: "5 llamadas en espera - Pico de demanda", type: "warning" },
      { text: "2 casos escalados sin resolver", type: "negative" },
    ],
  },
  grc: {
    name: "GRC",
    icon: ShieldCheck,
    color: "from-teal-500 to-emerald-500",
    greeting:
      "Estás en el módulo de GRC. Puedo ayudarte con evaluación de riesgos, auditorías, cumplimiento normativo y gestión de controles.",
    quickActions: [
      { icon: Shield, label: "Mapa de riesgos", prompt: "Genera el mapa de riesgos actualizado con su estado" },
      { icon: CheckCircle2, label: "Estado de auditorías", prompt: "¿Cuál es el estado de las auditorías pendientes?" },
      { icon: AlertTriangle, label: "Brechas de cumplimiento", prompt: "Identifica brechas de cumplimiento normativo" },
      { icon: Target, label: "Controles vencidos", prompt: "¿Cuáles controles tienen revisión vencida?" },
    ],
    insights: [
      { text: "Índice de madurez de control: 82%", type: "positive" },
      { text: "3 riesgos en nivel alto requieren atención", type: "warning" },
      { text: "Auditoría SOX retrasada 5 días", type: "negative" },
    ],
  },
  "campos-personalizados": {
    name: "Campos Personalizados",
    icon: FormInput,
    color: "from-fuchsia-500 to-pink-500",
    greeting:
      "Estás en el módulo de Campos Personalizados. Puedo ayudarte a diseñar formularios, sugerir campos según tu industria y optimizar la captura de datos.",
    quickActions: [
      {
        icon: Wand2,
        label: "Sugerir campos",
        prompt: "Sugiere campos personalizados para mi industria y tipo de negocio",
      },
      { icon: FormInput, label: "Optimizar formulario", prompt: "Analiza mis formularios y sugiere mejoras de UX" },
      {
        icon: FileText,
        label: "Campos más usados",
        prompt: "¿Cuáles campos personalizados se usan más en el sistema?",
      },
      {
        icon: AlertTriangle,
        label: "Campos sin usar",
        prompt: "Identifica campos personalizados que no se están usando",
      },
    ],
    insights: [
      { text: "45 campos personalizados activos", type: "positive" },
      { text: "8 campos sin datos en 90 días", type: "warning" },
      { text: "3 formularios con más de 20 campos - Simplificar", type: "negative" },
    ],
  },
  "flow-builder": {
    name: "Flow Builder",
    icon: Workflow,
    color: "from-blue-500 to-violet-500",
    greeting:
      "Estás en el Flow Builder. Puedo ayudarte a crear automatizaciones, sugerir flujos según tus procesos y optimizar los existentes.",
    quickActions: [
      {
        icon: Wand2,
        label: "Crear automatización",
        prompt: "Ayúdame a crear una automatización para mi proceso de facturación",
      },
      {
        icon: Workflow,
        label: "Flujos populares",
        prompt: "¿Cuáles son los flujos de automatización más populares para un ERP?",
      },
      { icon: TrendingUp, label: "Optimizar flujos", prompt: "Analiza mis flujos existentes y sugiere optimizaciones" },
      { icon: AlertTriangle, label: "Flujos con errores", prompt: "¿Hay flujos que han fallado recientemente?" },
    ],
    insights: [
      { text: "23 flujos activos - 98.5% de éxito", type: "positive" },
      { text: "Flujo de cobranza ejecutado 145 veces hoy", type: "positive" },
      { text: "2 flujos con errores en las últimas 24h", type: "negative" },
    ],
  },
  "dashboard-builder": {
    name: "Dashboard Builder",
    icon: LayoutDashboard,
    color: "from-cyan-500 to-blue-500",
    greeting:
      "Estás en el Dashboard Builder. Puedo ayudarte a crear dashboards, sugerir visualizaciones y configurar fuentes de datos.",
    quickActions: [
      { icon: Wand2, label: "Crear dashboard", prompt: "Crea un dashboard ejecutivo con los KPIs más importantes" },
      {
        icon: BarChart3,
        label: "Sugerir visualizaciones",
        prompt: "¿Qué visualizaciones recomiendas para mis datos de ventas?",
      },
      { icon: Target, label: "Mejores prácticas", prompt: "Dame mejores prácticas para diseñar dashboards efectivos" },
      { icon: FileText, label: "Exportar reporte", prompt: "Exporta mi dashboard actual como reporte PDF" },
    ],
    insights: [
      { text: "12 dashboards personalizados creados", type: "positive" },
      { text: "Dashboard de ventas visto 234 veces este mes", type: "positive" },
      { text: "3 widgets con datos desactualizados", type: "warning" },
    ],
  },
  "landing-builder": {
    name: "Landing Builder",
    icon: Globe,
    color: "from-green-500 to-teal-500",
    greeting:
      "Estás en el Landing Builder. Puedo ayudarte a crear landing pages, optimizar conversiones y sugerir contenido.",
    quickActions: [
      { icon: Wand2, label: "Crear landing", prompt: "Crea una landing page para promocionar mi producto principal" },
      {
        icon: TrendingUp,
        label: "Optimizar conversión",
        prompt: "Analiza mi landing actual y sugiere mejoras de conversión",
      },
      {
        icon: FileText,
        label: "Sugerir contenido",
        prompt: "Sugiere copy y contenido para mi landing de captación de leads",
      },
      { icon: BarChart3, label: "Métricas de landing", prompt: "¿Cómo están performando mis landing pages?" },
    ],
    insights: [
      { text: "Landing principal: 3.2% tasa de conversión", type: "positive" },
      { text: "Tiempo promedio en página: 2:34 min", type: "positive" },
      { text: "Bounce rate 65% - Optimizar", type: "warning" },
    ],
  },
  api: {
    name: "API",
    icon: Code,
    color: "from-gray-500 to-slate-500",
    greeting:
      "Estás en el módulo de API. Puedo ayudarte a documentar endpoints, generar código de integración y monitorear uso.",
    quickActions: [
      { icon: Code, label: "Generar código", prompt: "Genera código de ejemplo para conectar con la API de ventas" },
      { icon: FileText, label: "Documentar endpoint", prompt: "Documenta el endpoint de creación de facturas" },
      {
        icon: Activity,
        label: "Métricas de uso",
        prompt: "¿Cuáles endpoints tienen más uso y cuál es su rendimiento?",
      },
      { icon: AlertTriangle, label: "Errores de API", prompt: "¿Hay errores recurrentes en algún endpoint?" },
    ],
    insights: [
      { text: "45,234 requests hoy - 99.8% exitosos", type: "positive" },
      { text: "Endpoint /facturas con latencia alta: 850ms", type: "warning" },
      { text: "API key 'prod-client' cerca del límite", type: "warning" },
    ],
  },
  billing: {
    name: "Billing NEXUS",
    icon: CreditCard,
    color: "from-violet-500 to-indigo-500",
    greeting:
      "Estás en el módulo de Billing. Puedo ayudarte a gestionar tu suscripción, optimizar costos y recomendar módulos según tu uso.",
    quickActions: [
      { icon: CreditCard, label: "Estado de suscripción", prompt: "¿Cuál es el estado actual de mi suscripción?" },
      { icon: DollarSign, label: "Optimizar costos", prompt: "¿Cómo puedo optimizar los costos de mi suscripción?" },
      { icon: Boxes, label: "Módulos recomendados", prompt: "¿Qué módulos adicionales me recomiendas según mi uso?" },
      { icon: Receipt, label: "Historial de pagos", prompt: "Muéstrame el historial de pagos de mi cuenta" },
    ],
    insights: [
      { text: "Plan Professional - $4.5M COP/mes", type: "positive" },
      { text: "Uso de almacenamiento al 78%", type: "warning" },
      { text: "Próxima factura: 15 de Febrero", type: "positive" },
    ],
  },
  ayuda: {
    name: "Centro de Ayuda",
    icon: HelpCircle,
    color: "from-sky-500 to-blue-500",
    greeting:
      "Estás en el Centro de Ayuda. Puedo responder tus preguntas, guiarte por el sistema y resolver dudas sobre cualquier funcionalidad.",
    quickActions: [
      { icon: HelpCircle, label: "¿Cómo empezar?", prompt: "¿Cómo empiezo a usar NEXUS ERP? Dame una guía rápida" },
      {
        icon: FileText,
        label: "Documentación",
        prompt: "¿Dónde encuentro la documentación del módulo de facturación?",
      },
      {
        icon: Workflow,
        label: "Tutorial de flujos",
        prompt: "Enséñame a crear mi primera automatización en Flow Builder",
      },
      { icon: Phone, label: "Contactar soporte", prompt: "Necesito hablar con soporte técnico" },
    ],
    insights: [
      { text: "98% de preguntas resueltas por AI", type: "positive" },
      { text: "Artículo más consultado: Facturación DIAN", type: "positive" },
      { text: "2 tickets de soporte abiertos", type: "warning" },
    ],
  },
}

const defaultContext = moduleContexts.dashboard

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
  onToggleExpand?: () => void
  isExpanded?: boolean
  activeModule?: string
}

export function AIAssistant({
  isOpen,
  onClose,
  onToggleExpand,
  isExpanded = false,
  activeModule = "dashboard",
}: AIAssistantProps) {
  const context = moduleContexts[activeModule] || defaultContext
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [isRecording, setIsRecording] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = moduleContexts[activeModule] || defaultContext
    setMessages([
      {
        id: "greeting",
        role: "assistant",
        content: `${ctx.greeting}\n\n¿En qué puedo ayudarte?`,
        timestamp: new Date(),
        suggestions: ctx.quickActions.map((a) => a.label),
      },
    ])
  }, [activeModule])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(messageText),
        timestamp: new Date(),
        actions: [
          { label: "Ver detalles", action: "view_details", icon: ExternalLink },
          { label: "Exportar", action: "export", icon: Download },
        ],
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase()
    const ctx = moduleContexts[activeModule] || defaultContext

    // Context-aware responses based on active module
    if (activeModule === "ventas" || activeModule === "dashboard") {
      if (q.includes("ventas") || q.includes("venta") || q.includes("resumen")) {
        return "## Resumen de Ventas - Enero 2024\n\n| Métrica | Valor | vs Anterior |\n|---------|-------|-------------|\n| Total facturado | **$980M COP** | +12.4% |\n| Unidades vendidas | **15,234** | +8.2% |\n| Ticket promedio | **$8.5M** | +3.8% |\n| Top cliente | Constructora ABC | $156M |\n\n### Insights AI\n- El segmento **Enterprise** creció 18%, superando las proyecciones\n- Los martes y jueves concentran el 45% de las ventas\n- Oportunidad: 23 clientes no han comprado en 60 días ($340M potencial)"
      }
    }

    if (activeModule === "inventario") {
      if (q.includes("crítico") || q.includes("stock") || q.includes("reabastec")) {
        return '## Productos en Stock Crítico\n\n| Producto | Stock | Mínimo | Días para agotarse | Proveedor |\n|----------|-------|--------|-------------------|----------|\n| Cemento Gris 50kg | 45 | 200 | 3 días | Argos |\n| Varilla 1/2" | 120 | 500 | 5 días | Gerdau |\n| Ladrillo H10 | 890 | 2000 | 4 días | Santafé |\n\n**Acción recomendada:** Generar OC urgente para estos 3 productos.\n\n¿Deseas que genere las órdenes de compra automáticamente con los proveedores sugeridos?'
      }
    }

    if (activeModule === "contabilidad") {
      if (q.includes("resultado") || q.includes("p&l") || q.includes("estado")) {
        return "## Estado de Resultados - Enero 2024\n\n| Cuenta | Actual | Anterior | Variación |\n|--------|--------|----------|----------|\n| **Ingresos** | $2,450M | $2,180M | +12.4% |\n| Costo de ventas | $1,470M | $1,350M | +8.9% |\n| **Utilidad bruta** | $980M | $830M | +18.1% |\n| Gastos operacionales | $520M | $490M | +6.1% |\n| **Utilidad operacional** | $460M | $340M | +35.3% |\n| Gastos financieros | $45M | $52M | -13.5% |\n| **Utilidad neta** | $415M | $288M | +44.1% |\n\n**Margen neto: 16.9%** (vs 13.2% anterior)"
      }
    }

    if (q.includes("alerta") || q.includes("crítica") || q.includes("atención")) {
      return `## Alertas del Módulo ${ctx.name}\n\n${ctx.insights.map((i, idx) => `${idx + 1}. **${i.type === "positive" ? "✅" : i.type === "warning" ? "⚠️" : "🔴"}** ${i.text}`).join("\n")}\n\n¿Deseas que tome alguna acción sobre estas alertas?`
    }

    // Default contextual response
    return `Entendido. He analizado tu solicitud en el contexto de **${ctx.name}**.\n\n### Análisis Completado\n\nBasándome en los datos actuales del módulo, puedo ofrecerte información detallada sobre esta consulta. ¿Te gustaría que profundice en algún aspecto específico?\n\n**Acciones sugeridas:**\n- Ver análisis detallado\n- Exportar datos\n- Crear automatización relacionada`
  }

  const handleQuickAction = (action: { prompt: string }) => {
    handleSend(action.prompt)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setTimeout(() => {
        const ctx = moduleContexts[activeModule] || defaultContext
        setInput(ctx.quickActions[0]?.prompt || "¿Cómo puedo ayudarte?")
        setIsRecording(false)
      }, 2000)
    }
  }

  const pinMessage = (messageId: string) => {
    setMessages((prev) => prev.map((m) => (m.id === messageId ? { ...m, isPinned: !m.isPinned } : m)))
  }

  if (!isOpen) return null

  const ModuleIcon = context.icon

  return (
    <div
      className={cn(
        "fixed z-50 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl flex flex-col transition-all duration-300 overflow-hidden",
        isExpanded ? "inset-4 rounded-2xl" : "bottom-4 right-4 w-[480px] h-[700px] rounded-2xl",
      )}
    >
      {/* Header with module context */}
      <div
        className={cn(
          "flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r",
          context.color.replace("from-", "from-").split(" ")[0] + "/10",
          "via-transparent to-transparent",
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "relative w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg",
              context.color,
            )}
          >
            <Sparkles className="h-6 w-6 text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-background"></span>
          </div>
          <div>
            <h3 className="font-bold text-foreground text-lg">NEXUS AI</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <ModuleIcon className="h-3 w-3" />
              {context.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-muted" onClick={onToggleExpand}>
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full justify-start gap-1 h-auto p-2 bg-muted/30 rounded-none border-b border-border/50">
          <TabsTrigger
            value="chat"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg gap-2 px-4"
          >
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger
            value="insights"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg gap-2 px-4"
          >
            <Lightbulb className="h-4 w-4" />
            Insights
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">
              {context.insights.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="actions"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg gap-2 px-4"
          >
            <Zap className="h-4 w-4" />
            Acciones
          </TabsTrigger>
        </TabsList>

        {/* Chat Tab */}
        <TabsContent value="chat" className="flex-1 flex flex-col m-0 overflow-hidden">
          <ScrollArea className="flex-1 px-4 py-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex gap-3 group", message.role === "user" && "flex-row-reverse")}>
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                      message.role === "assistant"
                        ? cn("bg-gradient-to-br", context.color)
                        : "bg-muted border border-border",
                    )}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="h-4 w-4 text-white" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={cn("flex-1 max-w-[85%] space-y-2", message.role === "user" && "flex flex-col items-end")}
                  >
                    <div
                      className={cn(
                        "rounded-2xl p-4 text-sm relative",
                        message.role === "assistant"
                          ? "bg-muted/50 border border-border/50"
                          : cn("bg-gradient-to-br text-white", context.color),
                      )}
                    >
                      {message.role === "assistant" && (
                        <button
                          onClick={() => pinMessage(message.id)}
                          className={cn(
                            "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted",
                            message.isPinned && "opacity-100 text-primary",
                          )}
                        >
                          <Pin className="h-3 w-3" />
                        </button>
                      )}
                      <div className="prose prose-sm max-w-none whitespace-pre-wrap">{message.content}</div>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/50 bg-transparent"
                            onClick={() => handleSend(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    {message.actions && message.role === "assistant" && (
                      <div className="flex items-center gap-2 mt-2">
                        {message.actions.map((action, idx) => (
                          <Button key={idx} variant="ghost" size="sm" className="h-7 text-xs gap-1">
                            {action.icon && <action.icon className="h-3 w-3" />}
                            {action.label}
                          </Button>
                        ))}
                        <div className="flex-1" />
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center",
                      context.color,
                    )}
                  >
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-muted/50 rounded-2xl p-4 border border-border/50">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Analizando...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border/50 bg-muted/20">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Pregunta sobre ${context.name}...`}
                  className="pr-10 h-10 rounded-xl bg-background"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-10 w-10 shrink-0", isRecording && "text-red-500 animate-pulse")}
                onClick={toggleRecording}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                className={cn("h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br", context.color)}
                onClick={() => handleSend()}
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="flex-1 m-0 overflow-hidden">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Insights de {context.name}
              </h3>

              {context.insights.map((insight, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-4 rounded-xl border",
                    insight.type === "positive" && "bg-green-500/10 border-green-500/30",
                    insight.type === "warning" && "bg-yellow-500/10 border-yellow-500/30",
                    insight.type === "negative" && "bg-red-500/10 border-red-500/30",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                        insight.type === "positive" && "bg-green-500/20",
                        insight.type === "warning" && "bg-yellow-500/20",
                        insight.type === "negative" && "bg-red-500/20",
                      )}
                    >
                      {insight.type === "positive" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                      {insight.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      {insight.type === "negative" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{insight.text}</p>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 mt-1 text-xs"
                        onClick={() => handleSend(`Cuéntame más sobre: ${insight.text}`)}
                      >
                        Analizar con AI <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-border/50">
                <Button
                  variant="outline"
                  className="w-full gap-2 bg-transparent"
                  onClick={() => handleSend("Dame un análisis completo de todos los insights")}
                >
                  <Brain className="h-4 w-4" />
                  Análisis Completo con AI
                </Button>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Quick Actions Tab */}
        <TabsContent value="actions" className="flex-1 m-0 overflow-hidden">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Acciones Rápidas - {context.name}
              </h3>

              <div className="grid gap-3">
                {context.quickActions.map((action, idx) => {
                  const ActionIcon = action.icon
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(action)}
                      className={cn(
                        "p-4 rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-all text-left group",
                        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center",
                            context.color,
                          )}
                        >
                          <ActionIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{action.label}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{action.prompt}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="pt-4 border-t border-border/50">
                <h4 className="text-xs font-medium text-muted-foreground mb-3">Acciones Globales</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2 bg-transparent"
                    onClick={() => handleSend("Crea una automatización para este módulo")}
                  >
                    <Workflow className="h-4 w-4" />
                    Crear Flujo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2 bg-transparent"
                    onClick={() => handleSend("Genera un reporte de este módulo")}
                  >
                    <FileText className="h-4 w-4" />
                    Generar Reporte
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2 bg-transparent"
                    onClick={() => handleSend("Exporta los datos de este módulo")}
                  >
                    <Download className="h-4 w-4" />
                    Exportar Datos
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2 bg-transparent"
                    onClick={() => handleSend("¿Cómo uso este módulo?")}
                  >
                    <HelpCircle className="h-4 w-4" />
                    Ayuda
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
