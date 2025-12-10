"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Wallet, TrendingUp, TrendingDown, AlertTriangle, Plus, Download } from "lucide-react"

const budgetAreas = [
  { id: 1, name: "Ventas", budget: 150000000, executed: 125000000, status: "ok" },
  { id: 2, name: "Marketing", budget: 50000000, executed: 52000000, status: "warning" },
  { id: 3, name: "Operaciones", budget: 200000000, executed: 180000000, status: "ok" },
  { id: 4, name: "Tecnología", budget: 80000000, executed: 95000000, status: "exceeded" },
  { id: 5, name: "RRHH", budget: 120000000, executed: 110000000, status: "ok" },
]

export function PresupuestoModule() {
  const [activeTab, setActiveTab] = useState("ejecucion")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  const totalBudget = budgetAreas.reduce((sum, a) => sum + a.budget, 0)
  const totalExecuted = budgetAreas.reduce((sum, a) => sum + a.executed, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Presupuesto Financiero</h1>
          <p className="text-muted-foreground">Control presupuestario por áreas y centros de costo</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Presupuesto
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Presupuesto Total</p>
                <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
              </div>
              <div className="p-3 bg-teal-500/20 rounded-lg">
                <Wallet className="h-6 w-6 text-teal-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ejecutado</p>
                <p className="text-2xl font-bold">{formatCurrency(totalExecuted)}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <Progress value={(totalExecuted / totalBudget) * 100} className="mt-2 h-1" />
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Disponible</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(totalBudget - totalExecuted)}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <TrendingDown className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Áreas en Alerta</p>
                <p className="text-2xl font-bold text-yellow-400">2</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="ejecucion">Ejecución</TabsTrigger>
          <TabsTrigger value="areas">Por Área</TabsTrigger>
          <TabsTrigger value="solicitudes">Solicitudes</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="ejecucion" className="space-y-4">
          <Card className="bg-card border-border">
            <ScrollArea className="h-[400px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Área</th>
                    <th className="text-right p-4 font-medium">Presupuesto</th>
                    <th className="text-right p-4 font-medium">Ejecutado</th>
                    <th className="text-center p-4 font-medium">% Ejecución</th>
                    <th className="text-right p-4 font-medium">Disponible</th>
                    <th className="text-center p-4 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetAreas.map((area) => {
                    const percentage = (area.executed / area.budget) * 100
                    const available = area.budget - area.executed
                    return (
                      <tr key={area.id} className="border-b border-border hover:bg-muted/30">
                        <td className="p-4 font-medium">{area.name}</td>
                        <td className="p-4 text-right">{formatCurrency(area.budget)}</td>
                        <td className="p-4 text-right">{formatCurrency(area.executed)}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Progress value={Math.min(percentage, 100)} className="h-2 flex-1" />
                            <span className="text-sm">{Math.round(percentage)}%</span>
                          </div>
                        </td>
                        <td className={`p-4 text-right ${available < 0 ? "text-red-400" : "text-green-400"}`}>
                          {formatCurrency(available)}
                        </td>
                        <td className="p-4 text-center">
                          {area.status === "ok" && <Badge className="bg-green-500/20 text-green-400">Normal</Badge>}
                          {area.status === "warning" && (
                            <Badge className="bg-yellow-500/20 text-yellow-400">Alerta</Badge>
                          )}
                          {area.status === "exceeded" && <Badge className="bg-red-500/20 text-red-400">Excedido</Badge>}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="areas">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Detalle por área y centro de costo</p>
          </Card>
        </TabsContent>

        <TabsContent value="solicitudes">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Solicitudes de ampliación de presupuesto</p>
          </Card>
        </TabsContent>

        <TabsContent value="historico">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Histórico de presupuestos anteriores</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
