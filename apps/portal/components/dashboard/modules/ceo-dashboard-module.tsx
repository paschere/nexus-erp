"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Brain,
  Download,
  RefreshCw,
  PieChart,
  BarChart3,
  Activity,
  Wallet,
  Flame,
  ChevronRight,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export default function CEODashboardModule() {
  const [period, setPeriod] = useState("month")
  const [compareMode, setCompareMode] = useState(false)

  const revenueData = [
    { month: "Ene", actual: 850, budget: 800, lastYear: 720 },
    { month: "Feb", actual: 920, budget: 850, lastYear: 780 },
    { month: "Mar", actual: 1100, budget: 900, lastYear: 850 },
    { month: "Abr", actual: 980, budget: 950, lastYear: 890 },
    { month: "May", actual: 1250, budget: 1000, lastYear: 920 },
    { month: "Jun", actual: 1180, budget: 1050, lastYear: 980 },
  ]

  const kpis = [
    { label: "Ingresos", value: "$2.85B", change: 18.5, target: 95, icon: DollarSign, color: "text-emerald-500" },
    { label: "EBITDA", value: "$485M", change: 12.3, target: 88, icon: TrendingUp, color: "text-blue-500" },
    { label: "Margen Neto", value: "17.2%", change: 2.1, target: 92, icon: PieChart, color: "text-purple-500" },
    { label: "Cash Flow", value: "$320M", change: -5.2, target: 78, icon: Wallet, color: "text-amber-500" },
  ]

  const businessUnits = [
    { name: "Retail", revenue: 1200, margin: 22, growth: 15, employees: 450 },
    { name: "B2B", revenue: 890, margin: 18, growth: 28, employees: 120 },
    { name: "E-Commerce", revenue: 560, margin: 25, growth: 45, employees: 85 },
    { name: "Servicios", revenue: 200, margin: 35, growth: 8, employees: 65 },
  ]

  const alerts = [
    { type: "critical", message: "Cash flow proyectado bajo para Q3", module: "Tesorería" },
    { type: "warning", message: "Inventario sobre-stock en 3 categorías", module: "Inventario" },
    { type: "info", message: "Meta de ventas Q2 alcanzada al 95%", module: "Ventas" },
    { type: "success", message: "Margen operativo mejoró 2.3 pp", module: "Finanzas" },
  ]

  const radarData = [
    { subject: "Ventas", A: 85, fullMark: 100 },
    { subject: "Operaciones", A: 78, fullMark: 100 },
    { subject: "Finanzas", A: 92, fullMark: 100 },
    { subject: "RRHH", A: 70, fullMark: 100 },
    { subject: "Calidad", A: 88, fullMark: 100 },
    { subject: "Innovación", A: 65, fullMark: 100 },
  ]

  const marketShare = [
    { name: "NEXUS Corp", value: 28, color: "#2dd4bf" },
    { name: "Competidor A", value: 22, color: "#64748b" },
    { name: "Competidor B", value: 18, color: "#94a3b8" },
    { name: "Competidor C", value: 15, color: "#cbd5e1" },
    { name: "Otros", value: 17, color: "#e2e8f0" },
  ]

  return (
    <div className="space-y-6">
      {/* Header Ejecutivo */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Ejecutivo</h1>
          <p className="text-muted-foreground">Vista consolidada del negocio - Actualizado hace 5 min</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mes</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => setCompareMode(!compareMode)}>
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Brain className="h-4 w-4 mr-2" />
            Análisis AI
          </Button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-background/80 ${kpi.color}`}>
                  <kpi.icon className="h-6 w-6" />
                </div>
                <Badge
                  variant={kpi.change >= 0 ? "default" : "destructive"}
                  className={kpi.change >= 0 ? "bg-emerald-500/20 text-emerald-400" : ""}
                >
                  {kpi.change >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(kpi.change)}%
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{kpi.value}</div>
              <div className="text-sm text-muted-foreground mb-3">{kpi.label}</div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>vs Meta</span>
                  <span>{kpi.target}%</span>
                </div>
                <Progress value={kpi.target} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alertas Ejecutivas */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Alertas Ejecutivas
            </CardTitle>
            <Button variant="ghost" size="sm">
              Ver todas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border ${
                  alert.type === "critical"
                    ? "border-red-500/50 bg-red-500/10"
                    : alert.type === "warning"
                      ? "border-amber-500/50 bg-amber-500/10"
                      : alert.type === "success"
                        ? "border-emerald-500/50 bg-emerald-500/10"
                        : "border-blue-500/50 bg-blue-500/10"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {alert.type === "critical" ? (
                    <Flame className="h-4 w-4 text-red-500" />
                  ) : alert.type === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  ) : alert.type === "success" ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Activity className="h-4 w-4 text-blue-500" />
                  )}
                  <Badge variant="outline" className="text-xs">
                    {alert.module}
                  </Badge>
                </div>
                <p className="text-sm">{alert.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        {/* Gráfico de Ingresos */}
        <Card className="col-span-2 bg-card/50 border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Ingresos vs Presupuesto vs Año Anterior</CardTitle>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-teal-500" />
                  <span>Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Presupuesto</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500" />
                  <span>Año Anterior</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                  <Area type="monotone" dataKey="actual" stroke="#2dd4bf" fill="url(#colorActual)" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="budget"
                    stroke="#3b82f6"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line type="monotone" dataKey="lastYear" stroke="#64748b" strokeWidth={1} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Radar de Performance */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Scorecard Organizacional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" stroke="#888" />
                  <PolarRadiusAxis stroke="#888" />
                  <Radar name="Performance" dataKey="A" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Unidades de Negocio */}
        <Card className="col-span-2 bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Performance por Unidad de Negocio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {businessUnits.map((unit) => (
                <div
                  key={unit.name}
                  className="p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-teal-500/20">
                        <Building2 className="h-5 w-5 text-teal-500" />
                      </div>
                      <div>
                        <div className="font-semibold">{unit.name}</div>
                        <div className="text-sm text-muted-foreground">{unit.employees} empleados</div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Ingresos</div>
                      <div className="text-lg font-bold">${unit.revenue}M</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Margen</div>
                      <div className="text-lg font-bold">{unit.margin}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Crecimiento</div>
                      <div className="text-lg font-bold text-emerald-500">+{unit.growth}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Share */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Participación de Mercado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={marketShare}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                  >
                    {marketShare.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {marketShare.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
