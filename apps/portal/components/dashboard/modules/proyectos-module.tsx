"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { FolderKanban, Plus, Clock, CheckCircle, AlertTriangle, Calendar, Zap, Target } from "lucide-react"

const kpis = [
  { label: "Proyectos Activos", value: "12", icon: FolderKanban },
  { label: "Tareas Pendientes", value: "47", icon: Clock },
  { label: "Completadas Hoy", value: "8", icon: CheckCircle },
  { label: "En Riesgo", value: "2", icon: AlertTriangle },
]

const proyectos = [
  {
    nombre: "Implementación ERP Fase 2",
    cliente: "Interno",
    progreso: 68,
    estado: "en_progreso",
    fechaFin: "15 Ene 2025",
    equipo: ["MG", "CL", "AR"],
    tareas: { total: 45, completadas: 31 },
  },
  {
    nombre: "Migración Sistema Contable",
    cliente: "Grupo ABC",
    progreso: 85,
    estado: "en_progreso",
    fechaFin: "20 Dic 2024",
    equipo: ["PM", "JR"],
    tareas: { total: 28, completadas: 24 },
  },
  {
    nombre: "Desarrollo App Móvil",
    cliente: "Comercial XYZ",
    progreso: 35,
    estado: "en_riesgo",
    fechaFin: "28 Feb 2025",
    equipo: ["AR", "LS", "MG", "CL"],
    tareas: { total: 62, completadas: 22 },
  },
  {
    nombre: "Auditoría de Procesos",
    cliente: "Industrias Delta",
    progreso: 100,
    estado: "completado",
    fechaFin: "01 Dic 2024",
    equipo: ["JR", "PM"],
    tareas: { total: 15, completadas: 15 },
  },
]

const tareasPendientes = [
  { titulo: "Revisar documentación técnica", proyecto: "ERP Fase 2", prioridad: "alta", vence: "Hoy" },
  { titulo: "Configurar módulo de inventarios", proyecto: "ERP Fase 2", prioridad: "media", vence: "Mañana" },
  { titulo: "Pruebas de integración contable", proyecto: "Migración Contable", prioridad: "alta", vence: "Hoy" },
  { titulo: "Diseño UI pantalla principal", proyecto: "App Móvil", prioridad: "media", vence: "10 Dic" },
  { titulo: "Reunión de seguimiento cliente", proyecto: "App Móvil", prioridad: "baja", vence: "12 Dic" },
]

const aiInsights = [
  {
    type: "warning",
    title: "Proyecto en riesgo",
    description: "App Móvil tiene 40% de retraso. Se recomienda reasignar 2 recursos.",
    icon: AlertTriangle,
  },
  {
    type: "success",
    title: "Optimización detectada",
    description: "Puedes paralelizar 3 tareas en ERP Fase 2 y ahorrar 5 días.",
    icon: Zap,
  },
  {
    type: "info",
    title: "Deadline cercano",
    description: "Migración Contable vence en 13 días. 4 tareas críticas pendientes.",
    icon: Target,
  },
]

const getEstadoConfig = (estado: string) => {
  switch (estado) {
    case "completado":
      return { label: "Completado", color: "bg-green-500/10 text-green-500" }
    case "en_progreso":
      return { label: "En Progreso", color: "bg-blue-500/10 text-blue-500" }
    case "en_riesgo":
      return { label: "En Riesgo", color: "bg-red-500/10 text-red-500" }
    case "pausado":
      return { label: "Pausado", color: "bg-yellow-500/10 text-yellow-500" }
    default:
      return { label: estado, color: "bg-muted text-muted-foreground" }
  }
}

const getPrioridadConfig = (prioridad: string) => {
  switch (prioridad) {
    case "alta":
      return "destructive"
    case "media":
      return "default"
    case "baja":
      return "secondary"
    default:
      return "outline"
  }
}

export function ProyectosModule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Proyectos</h1>
          <p className="text-muted-foreground">Gestión de proyectos, tareas y recursos</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Proyecto
          </Button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {aiInsights.map((insight, i) => (
          <Card
            key={i}
            className={`border-l-4 ${
              insight.type === "warning"
                ? "border-l-red-500"
                : insight.type === "success"
                  ? "border-l-green-500"
                  : "border-l-blue-500"
            }`}
          >
            <CardContent className="p-3 flex items-start gap-3">
              <div
                className={`p-1.5 rounded-lg ${
                  insight.type === "warning"
                    ? "bg-red-500/10"
                    : insight.type === "success"
                      ? "bg-green-500/10"
                      : "bg-blue-500/10"
                }`}
              >
                <insight.icon
                  className={`h-4 w-4 ${
                    insight.type === "warning"
                      ? "text-red-500"
                      : insight.type === "success"
                        ? "text-green-500"
                        : "text-blue-500"
                  }`}
                />
              </div>
              <div>
                <p className="text-sm font-medium">{insight.title}</p>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <kpi.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Proyectos */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold">Proyectos Activos</h2>
            {proyectos.map((proyecto) => {
              const estadoConfig = getEstadoConfig(proyecto.estado)
              return (
                <Card key={proyecto.nombre} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{proyecto.nombre}</h3>
                        <p className="text-sm text-muted-foreground">{proyecto.cliente}</p>
                      </div>
                      <Badge className={estadoConfig.color}>{estadoConfig.label}</Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progreso</span>
                          <span className="font-medium">{proyecto.progreso}%</span>
                        </div>
                        <Progress value={proyecto.progreso} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {proyecto.equipo.map((miembro) => (
                              <Avatar key={miembro} className="h-7 w-7 border-2 border-background">
                                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                  {miembro}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {proyecto.tareas.completadas}/{proyecto.tareas.total} tareas
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {proyecto.fechaFin}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Tareas Pendientes */}
          <Card className="bg-card border-border h-fit">
            <CardHeader>
              <CardTitle className="text-lg">Mis Tareas</CardTitle>
              <CardDescription>Pendientes por completar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {tareasPendientes.map((tarea, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/50 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium">{tarea.titulo}</p>
                    <Badge
                      variant={
                        getPrioridadConfig(tarea.prioridad) as "default" | "secondary" | "destructive" | "outline"
                      }
                      className="text-xs shrink-0"
                    >
                      {tarea.prioridad}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{tarea.proyecto}</span>
                    <span className={tarea.vence === "Hoy" ? "text-red-500 font-medium" : ""}>
                      Vence: {tarea.vence}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
