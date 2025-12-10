"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Factory,
  Store,
  Truck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Zap,
  Users,
  Package,
  FileText,
  Calendar,
  ChevronRight,
  Brain,
  Lightbulb,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const revenueData = [
  { month: "Ene", ventas: 4200, costos: 2400, utilidad: 1800 },
  { month: "Feb", ventas: 3800, costos: 2210, utilidad: 1590 },
  { month: "Mar", ventas: 5100, costos: 2900, utilidad: 2200 },
  { month: "Abr", ventas: 4600, costos: 2600, utilidad: 2000 },
  { month: "May", ventas: 5800, costos: 3100, utilidad: 2700 },
  { month: "Jun", ventas: 6200, costos: 3400, utilidad: 2800 },
]

const modulePerformance = [
  { name: "E-Commerce", value: 35, color: "#6366f1" },
  { name: "POS", value: 28, color: "#22c55e" },
  { name: "Field Service", value: 22, color: "#f59e0b" },
  { name: "Manufactura", value: 15, color: "#ec4899" },
]

const recentActivity = [
  {
    id: 1,
    type: "order",
    title: "Pedido #1284",
    desc: "Distribuidora ABC - $4.5M",
    status: "processing",
    time: "Hace 5 min",
  },
  {
    id: 2,
    type: "production",
    title: "OP-0892",
    desc: "Lote completado - 500 uds",
    status: "success",
    time: "Hace 12 min",
  },
  {
    id: 3,
    type: "quality",
    title: "Inspección #456",
    desc: "No conformidad detectada",
    status: "warning",
    time: "Hace 25 min",
  },
  { id: 4, type: "service", title: "OS-2341", desc: "Técnico en camino", status: "processing", time: "Hace 32 min" },
  {
    id: 5,
    type: "invoice",
    title: "FE-2024-1567",
    desc: "Factura emitida - $12.8M",
    status: "success",
    time: "Hace 45 min",
  },
]

const aiInsights = [
  {
    tipo: "alerta",
    mensaje: "Stock crítico en 3 productos: Se recomienda generar orden de compra",
    prioridad: "alta",
    accion: "Ver productos",
  },
  {
    tipo: "oportunidad",
    mensaje: "Cliente ABC Corp no ha comprado en 30 días. Histórico: $45M/mes",
    prioridad: "media",
    accion: "Contactar",
  },
  {
    tipo: "prediccion",
    mensaje: "Ventas proyectadas Diciembre: $6.8M (+9.7% vs mes anterior)",
    prioridad: "info",
    accion: "Ver análisis",
  },
  {
    tipo: "automatizacion",
    mensaje: "5 facturas pendientes de envío. ¿Deseas enviarlas automáticamente?",
    prioridad: "media",
    accion: "Enviar",
  },
]

const quickStats = [
  { label: "Facturas Hoy", value: "23", change: "+5", icon: FileText },
  { label: "Pedidos Pendientes", value: "12", change: "-3", icon: Package },
  { label: "Clientes Activos", value: "156", change: "+8", icon: Users },
  { label: "Tareas Vencidas", value: "4", change: "+2", icon: Calendar, alert: true },
]

const topProductos = [
  { nombre: "Motor Eléctrico 5HP", ventas: 45, ingresos: "$85.5M" },
  { nombre: "Válvula Control DN50", ventas: 38, ingresos: "$45.6M" },
  { nombre: "Sensor PT100", ventas: 120, ingresos: "$36.0M" },
  { nombre: "PLC Siemens S7-1200", ventas: 15, ingresos: "$30.0M" },
]

export function MainDashboard() {
  const [showAIPanel, setShowAIPanel] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido de vuelta. Aquí está el resumen de tu negocio.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </Button>
          <Badge variant="outline" className="text-primary border-primary/30">
            <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
            En tiempo real
          </Badge>
        </div>
      </div>

      {/* AI Insights Bar */}
      {showAIPanel && (
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">NEXUS AI Insights</p>
                <p className="text-xs text-muted-foreground">4 recomendaciones basadas en tus datos</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowAIPanel(false)}>
                Ocultar
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-background/50 border border-border/50">
                  <div className="flex items-start gap-2 mb-2">
                    {insight.tipo === "alerta" && <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />}
                    {insight.tipo === "oportunidad" && <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />}
                    {insight.tipo === "prediccion" && <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />}
                    {insight.tipo === "automatizacion" && <Zap className="h-4 w-4 text-blue-500 mt-0.5" />}
                    <p className="text-xs leading-relaxed flex-1">{insight.mensaje}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full h-7 text-xs text-primary">
                    {insight.accion} <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Ventas Hoy"
          value="$12.4M"
          change="+12.5%"
          trend="up"
          icon={ShoppingCart}
          color="text-chart-1"
          subtitle="156 transacciones"
        />
        <KPICard
          title="Producción"
          value="847 uds"
          change="+8.2%"
          trend="up"
          icon={Factory}
          color="text-chart-3"
          subtitle="12 órdenes activas"
        />
        <KPICard
          title="Ventas POS"
          value="$3.2M"
          change="-2.4%"
          trend="down"
          icon={Store}
          color="text-chart-5"
          subtitle="4 tiendas online"
        />
        <KPICard
          title="Servicios"
          value="23 activos"
          change="+5"
          trend="up"
          icon={Truck}
          color="text-chart-2"
          subtitle="8 técnicos en campo"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Ingresos vs Costos vs Utilidad</CardTitle>
              <CardDescription>Últimos 6 meses en millones COP</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                <span className="w-2 h-2 rounded-full bg-primary mr-1.5" />
                Ventas
              </Badge>
              <Badge variant="outline" className="text-xs">
                <span className="w-2 h-2 rounded-full bg-chart-2 mr-1.5" />
                Costos
              </Badge>
              <Badge variant="outline" className="text-xs">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5" />
                Utilidad
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="ventas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="utilidad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value}M`, ""]}
                  />
                  <Area
                    type="monotone"
                    dataKey="ventas"
                    stroke="#2dd4bf"
                    fillOpacity={1}
                    fill="url(#ventas)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="costos"
                    stroke="#6366f1"
                    fill="transparent"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Area
                    type="monotone"
                    dataKey="utilidad"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#utilidad)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Resumen Rápido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stat.alert ? "bg-red-500/10" : "bg-primary/10"}`}>
                      <stat.icon className={`h-4 w-4 ${stat.alert ? "text-red-500" : "text-primary"}`} />
                    </div>
                    <span className="text-sm">{stat.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{stat.value}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Module Distribution */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Distribución por Módulo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={modulePerformance}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={55}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {modulePerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {modulePerformance.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                    <span className="text-xs font-medium ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Actividad Reciente</CardTitle>
              <CardDescription>Últimas operaciones del sistema</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              Ver todo <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px]">
              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        item.status === "success"
                          ? "bg-green-500/20 text-green-500"
                          : item.status === "warning"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-blue-500/20 text-blue-500"
                      }`}
                    >
                      {item.status === "success" ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : item.status === "warning" ? (
                        <AlertTriangle className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7 ml-2">
                        <ArrowUpRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Top Productos</CardTitle>
            <CardDescription>Más vendidos este mes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProductos.map((producto, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{producto.nombre}</p>
                  <p className="text-xs text-muted-foreground">{producto.ventas} vendidos</p>
                </div>
                <span className="text-sm font-bold">{producto.ingresos}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2 bg-transparent">
              Ver todos los productos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface KPICardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ElementType
  color: string
  subtitle?: string
}

function KPICard({ title, value, change, trend, icon: Icon, color, subtitle }: KPICardProps) {
  return (
    <Card className="bg-card border-border hover:border-primary/30 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${color}`}>
            <Icon className="h-6 w-6" />
          </div>
          <Badge
            variant="outline"
            className={trend === "up" ? "text-green-500 border-green-500/30" : "text-red-500 border-red-500/30"}
          >
            {trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {change}
          </Badge>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
