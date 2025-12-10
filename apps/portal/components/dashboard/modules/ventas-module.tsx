"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, DollarSign, Users, Phone, Mail, Calendar } from "lucide-react"
import { Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts"

const kpis = [
  { label: "Ventas del Mes", value: "$1.2B", change: "+18.5%", trend: "up", icon: DollarSign },
  { label: "Nuevos Clientes", value: "34", change: "+12", trend: "up", icon: Users },
  { label: "Oportunidades", value: "89", change: "+15", trend: "up", icon: Target },
  { label: "Tasa de Cierre", value: "32%", change: "+4.2%", trend: "up", icon: TrendingUp },
]

const ventasMensuales = [
  { mes: "Jul", ventas: 850, meta: 800 },
  { mes: "Ago", ventas: 920, meta: 850 },
  { mes: "Sep", ventas: 880, meta: 900 },
  { mes: "Oct", ventas: 1050, meta: 950 },
  { mes: "Nov", ventas: 1120, meta: 1000 },
  { mes: "Dic", ventas: 1200, meta: 1100 },
]

const pipeline = [
  { etapa: "Prospección", valor: 450000000, cantidad: 25, color: "bg-chart-1" },
  { etapa: "Calificación", valor: 320000000, cantidad: 18, color: "bg-chart-2" },
  { etapa: "Propuesta", valor: 280000000, cantidad: 12, color: "bg-chart-3" },
  { etapa: "Negociación", valor: 180000000, cantidad: 8, color: "bg-chart-4" },
  { etapa: "Cierre", valor: 120000000, cantidad: 5, color: "bg-chart-5" },
]

const oportunidadesRecientes = [
  { cliente: "Industrias ABC S.A.", valor: 85000000, probabilidad: 80, vendedor: "María G.", etapa: "Negociación" },
  { cliente: "Comercializadora XYZ", valor: 45000000, probabilidad: 60, vendedor: "Carlos L.", etapa: "Propuesta" },
  { cliente: "Grupo Empresarial Delta", valor: 120000000, probabilidad: 40, vendedor: "Ana R.", etapa: "Calificación" },
  { cliente: "Manufacturas del Norte", valor: 65000000, probabilidad: 90, vendedor: "Pedro M.", etapa: "Cierre" },
]

const actividadesHoy = [
  { tipo: "llamada", titulo: "Llamada con Industrias ABC", hora: "10:00 AM", cliente: "Juan Pérez" },
  { tipo: "email", titulo: "Enviar cotización XYZ", hora: "11:30 AM", cliente: "María López" },
  { tipo: "reunion", titulo: "Demo producto - Delta", hora: "3:00 PM", cliente: "Carlos Ruiz" },
  { tipo: "llamada", titulo: "Seguimiento propuesta", hora: "4:30 PM", cliente: "Ana Gómez" },
]

export function VentasModule() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  const totalPipeline = pipeline.reduce((acc, item) => acc + item.valor, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ventas / CRM</h1>
          <p className="text-muted-foreground">Pipeline de ventas, oportunidades y gestión de clientes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Clientes
          </Button>
          <Button size="sm">
            <Target className="h-4 w-4 mr-2" />
            Nueva Oportunidad
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-primary/10">
                  <kpi.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="default" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
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
        {/* Gráfico de Ventas */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Tendencia de Ventas</CardTitle>
            <CardDescription>Ventas vs Meta (millones COP)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ventasMensuales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="ventas"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                    name="Ventas"
                  />
                  <Line
                    type="monotone"
                    dataKey="meta"
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="5 5"
                    name="Meta"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Actividades del Día */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Actividades de Hoy</CardTitle>
            <CardDescription>Tu agenda comercial</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {actividadesHoy.map((act, i) => (
              <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div
                  className={`p-2 rounded-lg ${
                    act.tipo === "llamada"
                      ? "bg-green-500/10"
                      : act.tipo === "email"
                        ? "bg-blue-500/10"
                        : "bg-purple-500/10"
                  }`}
                >
                  {act.tipo === "llamada" ? (
                    <Phone className="h-4 w-4 text-green-500" />
                  ) : act.tipo === "email" ? (
                    <Mail className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Calendar className="h-4 w-4 text-purple-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{act.titulo}</p>
                  <p className="text-xs text-muted-foreground">{act.cliente}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{act.hora}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Pipeline de Ventas */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Pipeline de Ventas</CardTitle>
          <CardDescription>Total en pipeline: {formatCurrency(totalPipeline)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            {pipeline.map((etapa) => (
              <div
                key={etapa.etapa}
                className={`${etapa.color} h-3 rounded-full transition-all`}
                style={{ width: `${(etapa.valor / totalPipeline) * 100}%` }}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {pipeline.map((etapa) => (
              <div key={etapa.etapa} className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium">{etapa.etapa}</p>
                <p className="text-lg font-bold">{formatCurrency(etapa.valor)}</p>
                <p className="text-xs text-muted-foreground">{etapa.cantidad} oportunidades</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Oportunidades Recientes */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Oportunidades Destacadas</CardTitle>
          <CardDescription>Mayor probabilidad de cierre</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {oportunidadesRecientes.map((op) => (
              <div key={op.cliente} className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium">{op.cliente}</p>
                    <p className="text-sm text-muted-foreground">{op.vendedor}</p>
                  </div>
                  <Badge variant="outline">{op.etapa}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{formatCurrency(op.valor)}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={op.probabilidad} className="w-20 h-2" />
                    <span className="text-sm font-medium">{op.probabilidad}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
