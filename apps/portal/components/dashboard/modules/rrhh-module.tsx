"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Users,
  UserPlus,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Sparkles,
  Bot,
  Send,
  AlertTriangle,
  Lightbulb,
  Heart,
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { ScrollArea } from "@/components/ui/scroll-area"

const kpis = [
  { label: "Total Empleados", value: "248", change: "+12", trend: "up", icon: Users },
  { label: "Vacantes Activas", value: "8", change: "+3", trend: "up", icon: Briefcase },
  { label: "Rotación Anual", value: "8.2%", change: "-1.5%", trend: "down", icon: TrendingUp },
  { label: "Capacitaciones Mes", value: "15", change: "+5", trend: "up", icon: GraduationCap },
]

const departamentos = [
  { nombre: "Producción", empleados: 85, color: "hsl(var(--chart-1))" },
  { nombre: "Ventas", empleados: 42, color: "hsl(var(--chart-2))" },
  { nombre: "Administración", empleados: 38, color: "hsl(var(--chart-3))" },
  { nombre: "TI", empleados: 28, color: "hsl(var(--chart-4))" },
  { nombre: "Logística", empleados: 35, color: "hsl(var(--chart-5))" },
  { nombre: "RRHH", empleados: 20, color: "hsl(var(--chart-1))" },
]

const empleadosDestacados = [
  { nombre: "María García", cargo: "Gerente de Ventas", departamento: "Ventas", antiguedad: "5 años", rating: 98 },
  {
    nombre: "Carlos López",
    cargo: "Líder de Producción",
    departamento: "Producción",
    antiguedad: "8 años",
    rating: 96,
  },
  { nombre: "Ana Rodríguez", cargo: "Desarrolladora Senior", departamento: "TI", antiguedad: "3 años", rating: 95 },
  {
    nombre: "Pedro Martínez",
    cargo: "Contador Principal",
    departamento: "Administración",
    antiguedad: "6 años",
    rating: 94,
  },
]

const proximosEventos = [
  { tipo: "cumpleaños", titulo: "Cumpleaños de María García", fecha: "Hoy", icono: Award },
  { tipo: "vacaciones", titulo: "Inicio vacaciones - Carlos L.", fecha: "Mañana", icono: Calendar },
  { tipo: "capacitacion", titulo: "Capacitación ISO 9001", fecha: "15 Dic", icono: GraduationCap },
  { tipo: "evaluacion", titulo: "Evaluaciones de desempeño", fecha: "20 Dic", icono: Clock },
]

const nominaResumen = [
  { concepto: "Salarios Base", valor: 458000000 },
  { concepto: "Auxilio Transporte", valor: 32500000 },
  { concepto: "Horas Extra", valor: 28400000 },
  { concepto: "Bonificaciones", valor: 45200000 },
  { concepto: "Deducciones", valor: -89500000 },
]

const aiInsights = [
  {
    type: "warning",
    title: "Riesgo de rotación",
    description: "3 empleados clave muestran señales de desvinculación según análisis de comportamiento.",
    icon: AlertTriangle,
  },
  {
    type: "success",
    title: "Talento a promover",
    description: "Ana Rodríguez cumple todos los criterios para ascenso a Tech Lead.",
    icon: Lightbulb,
  },
  {
    type: "info",
    title: "Clima laboral",
    description: "El índice de satisfacción subió 12% después del programa de bienestar.",
    icon: Heart,
  },
]

export function RRHHModule() {
  const [showAiPanel, setShowAiPanel] = useState(false)
  const [aiChat, setAiChat] = useState("")
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Hola, soy tu asistente de Recursos Humanos AI. Puedo ayudarte a analizar clima laboral, identificar talento, optimizar nómina, y predecir rotación. ¿En qué te ayudo hoy?",
    },
  ])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  const sendAiMessage = () => {
    if (!aiChat.trim()) return
    setChatMessages([...chatMessages, { role: "user", content: aiChat }])
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "He analizado los datos de los últimos 6 meses. Los empleados con mayor riesgo de rotación son aquellos en el departamento de TI con salarios por debajo del percentil 50 del mercado. Recomiendo ajustar la banda salarial y ofrecer opciones de trabajo remoto para retener el talento.",
        },
      ])
    }, 1500)
    setAiChat("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recursos Humanos</h1>
          <p className="text-muted-foreground">Gestión de personal, nómina y desarrollo organizacional</p>
        </div>
        <div className="flex gap-2">
          <Button variant={showAiPanel ? "default" : "outline"} size="sm" onClick={() => setShowAiPanel(!showAiPanel)}>
            <Sparkles className="h-4 w-4 mr-2" />
            People Analytics AI
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Ver Calendario
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Nuevo Empleado
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
                ? "border-l-yellow-500"
                : insight.type === "success"
                  ? "border-l-green-500"
                  : "border-l-pink-500"
            }`}
          >
            <CardContent className="p-3 flex items-start gap-3">
              <div
                className={`p-1.5 rounded-lg ${
                  insight.type === "warning"
                    ? "bg-yellow-500/10"
                    : insight.type === "success"
                      ? "bg-green-500/10"
                      : "bg-pink-500/10"
                }`}
              >
                <insight.icon
                  className={`h-4 w-4 ${
                    insight.type === "warning"
                      ? "text-yellow-500"
                      : insight.type === "success"
                        ? "text-green-500"
                        : "text-pink-500"
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

      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <Card key={kpi.label} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <kpi.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant={kpi.trend === "up" ? "default" : "secondary"} className="text-xs">
                      {kpi.change}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Distribución por Departamento */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Por Departamento</CardTitle>
                <CardDescription>Distribución de empleados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departamentos}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="empleados"
                      >
                        {departamentos.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {departamentos.map((dep) => (
                    <div key={dep.nombre} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dep.color }} />
                      <span className="text-xs text-muted-foreground">{dep.nombre}</span>
                      <span className="text-xs font-medium ml-auto">{dep.empleados}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Empleados Destacados */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Empleados Destacados</CardTitle>
                <CardDescription>Mejor desempeño del mes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {empleadosDestacados.map((emp) => (
                  <div key={emp.nombre} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {emp.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{emp.nombre}</p>
                      <p className="text-xs text-muted-foreground">{emp.cargo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{emp.rating}%</p>
                      <p className="text-xs text-muted-foreground">{emp.antiguedad}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Próximos Eventos */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Próximos Eventos</CardTitle>
                <CardDescription>Calendario de RRHH</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {proximosEventos.map((evento, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <evento.icono className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{evento.titulo}</p>
                      <p className="text-xs text-muted-foreground">{evento.fecha}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Resumen Nómina */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Resumen de Nómina</CardTitle>
              <CardDescription>Diciembre 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {nominaResumen.map((item) => (
                  <div key={item.concepto} className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">{item.concepto}</p>
                    <p className={`text-lg font-bold ${item.valor < 0 ? "text-red-500" : "text-foreground"}`}>
                      {formatCurrency(item.valor)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-lg bg-primary/10 flex items-center justify-between">
                <span className="font-medium">Total Nómina a Pagar</span>
                <span className="text-2xl font-bold text-primary">{formatCurrency(474600000)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Panel */}
        {showAiPanel && (
          <Card className="w-80 h-fit sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                People Analytics AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-72 pr-4">
                <div className="space-y-4">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex gap-2">
                <Input
                  placeholder="Pregunta algo..."
                  value={aiChat}
                  onChange={(e) => setAiChat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendAiMessage()}
                />
                <Button size="icon" onClick={sendAiMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Riesgo rotación", "Clima laboral", "Plan sucesión"].map((q) => (
                  <Badge
                    key={q}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 text-xs"
                    onClick={() => setAiChat(q)}
                  >
                    {q}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
