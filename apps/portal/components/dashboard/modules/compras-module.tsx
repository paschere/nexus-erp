"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  ShoppingBag,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Sparkles,
  Bot,
  Send,
  Lightbulb,
  AlertTriangle,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { ScrollArea } from "@/components/ui/scroll-area"

const kpis = [
  { label: "Órdenes de Compra", value: "156", change: "+23", trend: "up", icon: FileText },
  { label: "Valor Total Mes", value: "$892M", change: "+15.2%", trend: "up", icon: TrendingUp },
  { label: "Proveedores Activos", value: "48", change: "+5", trend: "up", icon: ShoppingBag },
  { label: "Tiempo Entrega Prom", value: "4.2 días", change: "-0.8", trend: "down", icon: Clock },
]

const comprasPorCategoria = [
  { categoria: "Materia Prima", valor: 320 },
  { categoria: "Maquinaria", valor: 180 },
  { categoria: "Servicios", valor: 145 },
  { categoria: "Suministros", valor: 120 },
  { categoria: "Transporte", valor: 85 },
  { categoria: "Otros", valor: 42 },
]

const ordenes = [
  { numero: "OC-2024-0892", proveedor: "Aceros del Valle S.A.", fecha: "07 Dic", valor: 45800000, estado: "aprobada" },
  {
    numero: "OC-2024-0891",
    proveedor: "Químicos Industriales Ltda",
    fecha: "06 Dic",
    valor: 23400000,
    estado: "pendiente",
  },
  { numero: "OC-2024-0890", proveedor: "Repuestos y Partes SAS", fecha: "06 Dic", valor: 12300000, estado: "recibida" },
  { numero: "OC-2024-0889", proveedor: "Logística Express", fecha: "05 Dic", valor: 8900000, estado: "aprobada" },
  { numero: "OC-2024-0888", proveedor: "TecnoSoluciones", fecha: "05 Dic", valor: 156000000, estado: "pendiente" },
]

const proveedoresTop = [
  { nombre: "Aceros del Valle S.A.", compras: 12, valor: 458000000, cumplimiento: 98 },
  { nombre: "Químicos Industriales Ltda", compras: 8, valor: 234000000, cumplimiento: 95 },
  { nombre: "TecnoSoluciones", compras: 5, valor: 189000000, cumplimiento: 92 },
  { nombre: "Repuestos y Partes SAS", compras: 15, valor: 156000000, cumplimiento: 88 },
]

const aiInsights = [
  {
    type: "success",
    title: "Ahorro detectado",
    description: "3 proveedores ofrecen el mismo producto 18% más económico que tu proveedor actual.",
  },
  {
    type: "warning",
    title: "Proveedor en riesgo",
    description: "Químicos Industriales ha tenido 3 entregas tardías en el último mes.",
  },
  {
    type: "info",
    title: "Consolidación sugerida",
    description: "Puedes ahorrar $12M consolidando 5 órdenes pequeñas en una sola.",
  },
]

export function ComprasModule() {
  const [showAiPanel, setShowAiPanel] = useState(false)
  const [aiChat, setAiChat] = useState("")
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Soy tu asistente de compras AI. Puedo ayudarte a encontrar mejores precios, evaluar proveedores, optimizar órdenes de compra y predecir necesidades de inventario. ¿Qué necesitas?",
    },
  ])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  const getEstadoConfig = (estado: string) => {
    switch (estado) {
      case "aprobada":
        return { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" }
      case "pendiente":
        return { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" }
      case "recibida":
        return { icon: CheckCircle, color: "text-blue-500", bg: "bg-blue-500/10" }
      case "rechazada":
        return { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" }
      default:
        return { icon: AlertCircle, color: "text-muted-foreground", bg: "bg-muted" }
    }
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
            "He analizado los datos de compras. El proveedor con mejor relación precio-calidad para materia prima es Aceros del Valle con 98% de cumplimiento. Sin embargo, encontré que TecnoSoluciones tiene precios 12% menores para la misma categoría de productos. ¿Quieres que genere una comparativa detallada?",
        },
      ])
    }, 1500)
    setAiChat("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compras</h1>
          <p className="text-muted-foreground">Gestión de órdenes de compra y proveedores</p>
        </div>
        <div className="flex gap-2">
          <Button variant={showAiPanel ? "default" : "outline"} size="sm" onClick={() => setShowAiPanel(!showAiPanel)}>
            <Sparkles className="h-4 w-4 mr-2" />
            Asistente AI
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Cotizaciones
          </Button>
          <Button size="sm">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Nueva Orden
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
                  : "border-l-blue-500"
            }`}
          >
            <CardContent className="p-3 flex items-start gap-3">
              <div
                className={`p-1.5 rounded-lg ${
                  insight.type === "warning"
                    ? "bg-yellow-500/10"
                    : insight.type === "success"
                      ? "bg-green-500/10"
                      : "bg-blue-500/10"
                }`}
              >
                {insight.type === "warning" ? (
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                ) : insight.type === "success" ? (
                  <Lightbulb className="h-4 w-4 text-green-500" />
                ) : (
                  <Sparkles className="h-4 w-4 text-blue-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{insight.title}</p>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-6">
        <div className={`flex-1 space-y-6 ${showAiPanel ? "" : ""}`}>
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <Card key={kpi.label} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <kpi.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge
                      variant={
                        kpi.trend === "up" || (kpi.label.includes("Tiempo") && kpi.trend === "down")
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compras por Categoría */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Compras por Categoría</CardTitle>
                <CardDescription>Distribución del gasto (millones COP)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comprasPorCategoria} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis
                        dataKey="categoria"
                        type="category"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        width={100}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="valor" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Proveedores Top */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Proveedores Principales</CardTitle>
                <CardDescription>Por volumen de compras</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {proveedoresTop.map((prov) => (
                  <div key={prov.nombre} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{prov.nombre}</p>
                      <Badge variant="outline" className="text-xs">
                        {prov.compras} órdenes
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total compras</span>
                      <span className="font-medium">{formatCurrency(prov.valor)}</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Cumplimiento</span>
                        <span className="font-medium">{prov.cumplimiento}%</span>
                      </div>
                      <Progress value={prov.cumplimiento} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Órdenes de Compra */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Órdenes de Compra Recientes</CardTitle>
              <CardDescription>Últimas órdenes registradas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Número</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordenes.map((orden) => {
                    const config = getEstadoConfig(orden.estado)
                    return (
                      <TableRow key={orden.numero} className="border-border">
                        <TableCell className="font-mono text-sm">{orden.numero}</TableCell>
                        <TableCell className="font-medium">{orden.proveedor}</TableCell>
                        <TableCell className="text-muted-foreground">{orden.fecha}</TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(orden.valor)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded ${config.bg}`}>
                              <config.icon className={`h-3 w-3 ${config.color}`} />
                            </div>
                            <span className="text-sm capitalize">{orden.estado}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* AI Panel */}
        {showAiPanel && (
          <Card className="w-80 h-fit sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Asistente Compras AI
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
                {["Mejor proveedor", "Reducir costos", "Órdenes urgentes"].map((q) => (
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
