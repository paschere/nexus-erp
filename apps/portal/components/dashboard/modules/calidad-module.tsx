"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, ClipboardCheck, AlertTriangle, CheckCircle2, XCircle, FileText, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const qualityTrend = [
  { semana: "S1", aprobados: 95, rechazados: 5 },
  { semana: "S2", aprobados: 92, rechazados: 8 },
  { semana: "S3", aprobados: 97, rechazados: 3 },
  { semana: "S4", aprobados: 94, rechazados: 6 },
]

const inspections = [
  { id: "INS-456", tipo: "Recepción", lote: "LOT-2024-1234", resultado: "Aprobado", fecha: "Hoy 15:30" },
  { id: "INS-455", tipo: "Producción", lote: "LOT-2024-1233", resultado: "No Conforme", fecha: "Hoy 12:15" },
  { id: "INS-454", tipo: "Final", lote: "LOT-2024-1232", resultado: "Aprobado", fecha: "Hoy 10:00" },
  { id: "INS-453", tipo: "Recepción", lote: "LOT-2024-1231", resultado: "Aprobado", fecha: "Ayer 16:45" },
]

const nonConformities = [
  { id: "NC-089", descripcion: "Defecto dimensional en componente", severidad: "Mayor", estado: "Abierta" },
  { id: "NC-088", descripcion: "Contaminación en materia prima", severidad: "Crítica", estado: "En revisión" },
  { id: "NC-087", descripcion: "Error de etiquetado", severidad: "Menor", estado: "Cerrada" },
]

export function CalidadModule() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Control de Calidad</h1>
          <p className="text-muted-foreground">Inspecciones y trazabilidad</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <FileText className="h-4 w-4" />
            Reportes
          </Button>
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
            Nueva Inspección
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">94.2%</p>
                <p className="text-sm text-muted-foreground">Tasa aprobación</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <ClipboardCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">47</p>
                <p className="text-sm text-muted-foreground">Inspecciones hoy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">NC pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-2/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">+2.3%</p>
                <p className="text-sm text-muted-foreground">vs mes anterior</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Trend Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Tendencia de Calidad</CardTitle>
            <CardDescription>Últimas 4 semanas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={qualityTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="semana" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="aprobados"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ fill: "#22c55e" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rechazados"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: "#ef4444" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Inspections */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Inspecciones Recientes</CardTitle>
            <CardDescription>Últimos registros</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {inspections.map((ins) => (
              <div key={ins.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      ins.resultado === "Aprobado" ? "bg-green-500/20" : "bg-red-500/20"
                    }`}
                  >
                    {ins.resultado === "Aprobado" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{ins.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {ins.tipo} - {ins.lote}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className={
                      ins.resultado === "Aprobado"
                        ? "text-green-500 border-green-500/30"
                        : "text-red-500 border-red-500/30"
                    }
                  >
                    {ins.resultado}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{ins.fecha}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Non Conformities */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">No Conformidades</CardTitle>
            <CardDescription>Gestión de incidencias de calidad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {nonConformities.map((nc) => (
                <div key={nc.id} className="p-4 rounded-lg border border-border bg-secondary/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{nc.id}</span>
                    <Badge
                      variant="outline"
                      className={
                        nc.severidad === "Crítica"
                          ? "text-red-500 border-red-500/30"
                          : nc.severidad === "Mayor"
                            ? "text-yellow-500 border-yellow-500/30"
                            : "text-blue-500 border-blue-500/30"
                      }
                    >
                      {nc.severidad}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{nc.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{nc.estado}</Badge>
                    <Button variant="ghost" size="sm">
                      Ver detalle
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
