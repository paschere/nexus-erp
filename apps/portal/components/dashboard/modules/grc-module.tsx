"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, Shield, FileText, Calendar, CheckCircle2, Clock, AlertOctagon, AlertTriangle, Eye } from "lucide-react"

const riskMatrix = [
  { riesgo: "Fraude interno", probabilidad: "Media", impacto: "Alto", nivel: "Alto", mitigacion: 75 },
  { riesgo: "Incumplimiento regulatorio", probabilidad: "Baja", impacto: "Alto", nivel: "Medio", mitigacion: 90 },
  { riesgo: "Fuga de datos", probabilidad: "Baja", impacto: "Crítico", nivel: "Alto", mitigacion: 60 },
  { riesgo: "Interrupción operativa", probabilidad: "Media", impacto: "Medio", nivel: "Medio", mitigacion: 85 },
]

const audits = [
  { id: "AUD-024", tipo: "Interna", area: "Financiera", fecha: "20 Dic 2024", estado: "Programada" },
  { id: "AUD-023", tipo: "Externa", area: "Operaciones", fecha: "15 Dic 2024", estado: "En curso" },
  { id: "AUD-022", tipo: "Interna", area: "TI", fecha: "10 Dic 2024", estado: "Completada" },
]

const policies = [
  { nombre: "Política de Seguridad", version: "v3.2", ultima: "15 May 2024", proxima: "15 Nov 2024" },
  { nombre: "Código de Ética", version: "v2.1", ultima: "01 Ene 2024", proxima: "01 Ene 2025" },
  { nombre: "Gestión de Riesgos", version: "v1.5", ultima: "20 Mar 2024", proxima: "20 Sep 2024" },
]

const aiInsights = [
  {
    type: "warning",
    title: "Riesgo emergente detectado",
    description: "Aumento de intentos de phishing 340%. Se recomienda capacitación urgente.",
    icon: AlertTriangle,
  },
  {
    type: "success",
    title: "Cumplimiento mejorado",
    description: "Cumplimiento SOX subió de 82% a 94% tras auditoría Q3.",
    icon: CheckCircle2,
  },
  {
    type: "info",
    title: "Auditoría próxima",
    description: "Auditoría externa DIAN programada para enero. 3 hallazgos pendientes de cierre.",
    icon: Eye,
  },
]

export function GRCModule() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">GRC</h1>
          <p className="text-muted-foreground">Gobierno, Riesgo y Cumplimiento</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <FileText className="h-4 w-4" />
            Reportes
          </Button>
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
            Nuevo Riesgo
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <AlertOctagon className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Riesgos altos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">87%</p>
                  <p className="text-sm text-muted-foreground">Cumplimiento</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">2</p>
                  <p className="text-sm text-muted-foreground">Auditorías pendientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Políticas activas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Matrix */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Matriz de Riesgos</CardTitle>
              <CardDescription>Riesgos corporativos identificados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {riskMatrix.map((risk, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-foreground">{risk.riesgo}</span>
                    <Badge
                      variant="outline"
                      className={
                        risk.nivel === "Alto"
                          ? "text-red-500 border-red-500/30"
                          : risk.nivel === "Medio"
                            ? "text-yellow-500 border-yellow-500/30"
                            : "text-green-500 border-green-500/30"
                      }
                    >
                      {risk.nivel}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">Probabilidad: </span>
                      <span className="text-foreground">{risk.probabilidad}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Impacto: </span>
                      <span className="text-foreground">{risk.impacto}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Mitigación</span>
                      <span className="text-foreground">{risk.mitigacion}%</span>
                    </div>
                    <Progress value={risk.mitigacion} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Audits & Policies */}
          <div className="space-y-6">
            {/* Audits */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Auditorías</CardTitle>
                <CardDescription>Programación y seguimiento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {audits.map((audit) => (
                  <div key={audit.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-chart-2/20 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-chart-2" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{audit.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {audit.tipo} - {audit.area}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className={
                          audit.estado === "Completada"
                            ? "text-green-500 border-green-500/30"
                            : audit.estado === "En curso"
                              ? "text-blue-500 border-blue-500/30"
                              : "text-yellow-500 border-yellow-500/30"
                        }
                      >
                        {audit.estado}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{audit.fecha}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Policies */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Políticas</CardTitle>
                <CardDescription>Documentación centralizada</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {policies.map((policy, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{policy.nombre}</p>
                        <p className="text-sm text-muted-foreground">{policy.version}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">Próxima revisión</p>
                      <p className="text-foreground">{policy.proxima}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
