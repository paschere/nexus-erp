"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Building,
  Banknote,
  AlertTriangle,
  Lightbulb,
  Target,
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

const kpis = [
  { label: "Saldo Total", value: "$1.8B", change: "+5.2%", trend: "up", icon: Wallet },
  { label: "Ingresos Hoy", value: "$124M", change: "+18.5%", trend: "up", icon: TrendingUp },
  { label: "Egresos Hoy", value: "$89M", change: "+8.2%", trend: "up", icon: TrendingDown },
  { label: "Flujo Neto", value: "$35M", change: "+24.1%", trend: "up", icon: ArrowUpDown },
]

const flujoData = [
  { dia: "Lun", ingresos: 95, egresos: 72 },
  { dia: "Mar", ingresos: 110, egresos: 85 },
  { dia: "Mié", ingresos: 88, egresos: 65 },
  { dia: "Jue", ingresos: 135, egresos: 98 },
  { dia: "Vie", ingresos: 124, egresos: 89 },
  { dia: "Sáb", ingresos: 45, egresos: 32 },
  { dia: "Hoy", ingresos: 124, egresos: 89 },
]

const cuentasBancarias = [
  { banco: "Bancolombia", cuenta: "****4521", tipo: "Corriente", saldo: 892400000, moneda: "COP" },
  { banco: "Banco de Bogotá", cuenta: "****7832", tipo: "Ahorros", saldo: 456200000, moneda: "COP" },
  { banco: "Davivienda", cuenta: "****1245", tipo: "Corriente", saldo: 324800000, moneda: "COP" },
  { banco: "BBVA", cuenta: "****9087", tipo: "Corriente", saldo: 178500000, moneda: "COP" },
]

const movimientosRecientes = [
  { tipo: "ingreso", concepto: "Pago Cliente ABC S.A.", valor: 45800000, fecha: "Hoy 14:30" },
  { tipo: "egreso", concepto: "Pago Proveedores", valor: 23400000, fecha: "Hoy 11:20" },
  { tipo: "ingreso", concepto: "Recaudo Cartera", valor: 32100000, fecha: "Hoy 10:15" },
  { tipo: "egreso", concepto: "Nómina Quincenal", valor: 89500000, fecha: "Ayer 16:00" },
  { tipo: "transferencia", concepto: "Traslado entre cuentas", valor: 50000000, fecha: "Ayer 09:30" },
]

const aiInsights = [
  {
    type: "warning",
    title: "Flujo de caja negativo",
    description: "Proyección: -$45M el 15 de diciembre por nómina + proveedores.",
    icon: AlertTriangle,
  },
  {
    type: "success",
    title: "Oportunidad de inversión",
    description: "$200M disponibles en cuenta con 0% rendimiento. CDT a 90 días rinde 11.5% EA.",
    icon: Lightbulb,
  },
  {
    type: "info",
    title: "Recaudo pendiente",
    description: "5 facturas vencidas por $89M. Cliente ABC tiene $45M hace 32 días.",
    icon: Target,
  },
]

export function TesoreriaModule() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tesorería</h1>
          <p className="text-muted-foreground">Gestión de flujo de caja y cuentas bancarias</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Transferencia
          </Button>
          <Button size="sm">
            <Banknote className="h-4 w-4 mr-2" />
            Nuevo Movimiento
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <kpi.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="default" className="text-xs">
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
          {/* Flujo de Caja */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Flujo de Caja Semanal</CardTitle>
              <CardDescription>Ingresos vs Egresos (millones COP)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={flujoData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="dia" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                      dataKey="ingresos"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.2}
                      name="Ingresos"
                    />
                    <Area
                      type="monotone"
                      dataKey="egresos"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.2}
                      name="Egresos"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cuentas Bancarias */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Cuentas Bancarias</CardTitle>
              <CardDescription>Saldos actualizados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {cuentasBancarias.map((cuenta) => (
                <div key={cuenta.cuenta} className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Building className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{cuenta.banco}</p>
                      <p className="text-xs text-muted-foreground">
                        {cuenta.tipo} {cuenta.cuenta}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold">{formatCurrency(cuenta.saldo)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Movimientos Recientes */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Movimientos Recientes</CardTitle>
            <CardDescription>Últimas transacciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {movimientosRecientes.map((mov, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${mov.tipo === "ingreso" ? "bg-green-500/10" : mov.tipo === "egreso" ? "bg-red-500/10" : "bg-blue-500/10"}`}
                    >
                      {mov.tipo === "ingreso" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : mov.tipo === "egreso" ? (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      ) : (
                        <ArrowUpDown className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{mov.concepto}</p>
                      <p className="text-xs text-muted-foreground">{mov.fecha}</p>
                    </div>
                  </div>
                  <p
                    className={`font-bold ${mov.tipo === "ingreso" ? "text-green-500" : mov.tipo === "egreso" ? "text-red-500" : "text-foreground"}`}
                  >
                    {mov.tipo === "ingreso" ? "+" : mov.tipo === "egreso" ? "-" : ""}
                    {formatCurrency(mov.valor)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
