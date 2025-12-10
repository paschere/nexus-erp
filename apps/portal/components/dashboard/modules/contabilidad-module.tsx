"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  FileText,
  DollarSign,
  CreditCard,
  PiggyBank,
  Receipt,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

const kpis = [
  { label: "Ingresos Mes", value: "$458.2M", change: "+12.4%", trend: "up", icon: TrendingUp },
  { label: "Gastos Mes", value: "$312.8M", change: "+3.2%", trend: "up", icon: TrendingDown },
  { label: "Utilidad Neta", value: "$145.4M", change: "+28.1%", trend: "up", icon: PiggyBank },
  { label: "Cuentas por Cobrar", value: "$89.2M", change: "-5.3%", trend: "down", icon: Receipt },
]

const balanceData = [
  { mes: "Jul", ingresos: 380, gastos: 290 },
  { mes: "Ago", ingresos: 420, gastos: 310 },
  { mes: "Sep", ingresos: 390, gastos: 285 },
  { mes: "Oct", ingresos: 445, gastos: 305 },
  { mes: "Nov", ingresos: 410, gastos: 295 },
  { mes: "Dic", ingresos: 458, gastos: 312 },
]

const cuentas = [
  { codigo: "1105", nombre: "Caja General", tipo: "Activo", saldo: 45200000, movimiento: "débito" },
  { codigo: "1110", nombre: "Bancos Nacionales", tipo: "Activo", saldo: 892400000, movimiento: "débito" },
  { codigo: "1305", nombre: "Clientes Nacionales", tipo: "Activo", saldo: 234500000, movimiento: "débito" },
  { codigo: "2105", nombre: "Obligaciones Financieras", tipo: "Pasivo", saldo: 156000000, movimiento: "crédito" },
  { codigo: "2205", nombre: "Proveedores Nacionales", tipo: "Pasivo", saldo: 89300000, movimiento: "crédito" },
  { codigo: "4135", nombre: "Comercio Mayor y Menor", tipo: "Ingreso", saldo: 458200000, movimiento: "crédito" },
]

const comprobantes = [
  { numero: "CE-2024-1234", tipo: "Egreso", fecha: "Hoy", valor: 12500000, estado: "aprobado" },
  { numero: "CI-2024-0892", tipo: "Ingreso", fecha: "Hoy", valor: 45800000, estado: "aprobado" },
  { numero: "NC-2024-0156", tipo: "Nota Crédito", fecha: "Ayer", valor: 3200000, estado: "pendiente" },
  { numero: "CE-2024-1233", tipo: "Egreso", fecha: "Ayer", valor: 8900000, estado: "aprobado" },
]

const aiInsights = [
  {
    type: "warning",
    title: "Anomalía detectada",
    description: "Gasto inusual de $45M en cuenta 5195 - Gastos Diversos. 340% sobre el promedio mensual.",
    action: "Revisar",
  },
  {
    type: "success",
    title: "Oportunidad de ahorro",
    description: "El proveedor ABC tiene facturas duplicadas por $12.3M en los últimos 3 meses.",
    action: "Ver detalles",
  },
  {
    type: "info",
    title: "Cierre contable",
    description: "5 cuentas pendientes de conciliar antes del cierre mensual del 31 de diciembre.",
    action: "Conciliar",
  },
]

export function ContabilidadModule() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contabilidad</h1>
          <p className="text-muted-foreground">Plan de cuentas, comprobantes y estados financieros</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Estados Financieros
          </Button>
          <Button size="sm">
            <Calculator className="h-4 w-4 mr-2" />
            Nuevo Comprobante
          </Button>
        </div>
      </div>

      {/* AI Insights Bar */}
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
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{insight.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{insight.description}</p>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0 text-xs">
                {insight.action} <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico Balance */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Balance Mensual</CardTitle>
              <CardDescription>Comparativo ingresos vs gastos (millones COP)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={balanceData}>
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
                    <Bar dataKey="ingresos" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Ingresos" />
                    <Bar dataKey="gastos" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Gastos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Comprobantes Recientes */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Comprobantes Recientes</CardTitle>
              <CardDescription>Últimos movimientos contables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comprobantes.map((comp) => (
                  <div key={comp.numero} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          comp.tipo === "Ingreso"
                            ? "bg-green-500/10"
                            : comp.tipo === "Egreso"
                              ? "bg-red-500/10"
                              : "bg-blue-500/10"
                        }`}
                      >
                        {comp.tipo === "Ingreso" ? (
                          <DollarSign className="h-4 w-4 text-green-500" />
                        ) : comp.tipo === "Egreso" ? (
                          <CreditCard className="h-4 w-4 text-red-500" />
                        ) : (
                          <FileText className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-mono text-sm">{comp.numero}</p>
                        <p className="text-xs text-muted-foreground">
                          {comp.tipo} - {comp.fecha}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(comp.valor)}</p>
                      <Badge variant={comp.estado === "aprobado" ? "default" : "secondary"} className="text-xs">
                        {comp.estado}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Plan de Cuentas */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Plan de Cuentas PUC</CardTitle>
            <CardDescription>Cuentas contables según normativa colombiana</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Naturaleza</TableHead>
                  <TableHead className="text-right">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cuentas.map((cuenta) => (
                  <TableRow key={cuenta.codigo} className="border-border">
                    <TableCell className="font-mono">{cuenta.codigo}</TableCell>
                    <TableCell className="font-medium">{cuenta.nombre}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {cuenta.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize text-muted-foreground">{cuenta.movimiento}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(cuenta.saldo)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
