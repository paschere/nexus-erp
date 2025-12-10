"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Users, TrendingUp, Trophy, Target, Download, Percent } from "lucide-react"

const salespeople = [
  { id: 1, name: "María García", sales: 125000000, commission: 6250000, quota: 100000000, rank: 1 },
  { id: 2, name: "Carlos López", sales: 98000000, commission: 4900000, quota: 100000000, rank: 2 },
  { id: 3, name: "Ana Rodríguez", sales: 87000000, commission: 4350000, quota: 80000000, rank: 3 },
  { id: 4, name: "Juan Pérez", sales: 65000000, commission: 3250000, quota: 80000000, rank: 4 },
  { id: 5, name: "Laura Martínez", sales: 54000000, commission: 2700000, quota: 60000000, rank: 5 },
]

const commissionPlans = [
  { id: 1, name: "Plan Estándar", rate: 5, threshold: 0, status: "active" },
  { id: 2, name: "Plan Premium", rate: 7, threshold: 50000000, status: "active" },
  { id: 3, name: "Plan Enterprise", rate: 10, threshold: 100000000, status: "active" },
]

export function ComisionesModule() {
  const [activeTab, setActiveTab] = useState("vendedores")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Comisiones de Ventas</h1>
          <p className="text-muted-foreground">Gestiona comisiones y metas del equipo comercial</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <DollarSign className="h-4 w-4 mr-2" />
            Liquidar Comisiones
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Comisiones del Mes</p>
                <p className="text-2xl font-bold">{formatCurrency(21450000)}</p>
              </div>
              <div className="p-3 bg-teal-500/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-teal-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ventas Totales</p>
                <p className="text-2xl font-bold">{formatCurrency(429000000)}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Vendedores Activos</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cumplimiento Meta</p>
                <p className="text-2xl font-bold">102%</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Target className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="vendedores">Ranking Vendedores</TabsTrigger>
          <TabsTrigger value="planes">Planes de Comisión</TabsTrigger>
          <TabsTrigger value="liquidaciones">Liquidaciones</TabsTrigger>
          <TabsTrigger value="proyecciones">Proyecciones</TabsTrigger>
        </TabsList>

        <TabsContent value="vendedores" className="space-y-4">
          <Card className="bg-card border-border">
            <ScrollArea className="h-[400px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Rank</th>
                    <th className="text-left p-4 font-medium">Vendedor</th>
                    <th className="text-right p-4 font-medium">Ventas</th>
                    <th className="text-right p-4 font-medium">Meta</th>
                    <th className="text-center p-4 font-medium">Cumplimiento</th>
                    <th className="text-right p-4 font-medium">Comisión</th>
                  </tr>
                </thead>
                <tbody>
                  {salespeople.map((sp) => (
                    <tr key={sp.id} className="border-b border-border hover:bg-muted/30">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {sp.rank === 1 && <Trophy className="h-5 w-5 text-yellow-400" />}
                          {sp.rank === 2 && <Trophy className="h-5 w-5 text-gray-400" />}
                          {sp.rank === 3 && <Trophy className="h-5 w-5 text-amber-600" />}
                          {sp.rank > 3 && <span className="text-muted-foreground">#{sp.rank}</span>}
                        </div>
                      </td>
                      <td className="p-4 font-medium">{sp.name}</td>
                      <td className="p-4 text-right">{formatCurrency(sp.sales)}</td>
                      <td className="p-4 text-right text-muted-foreground">{formatCurrency(sp.quota)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Progress value={Math.min((sp.sales / sp.quota) * 100, 100)} className="h-2 flex-1" />
                          <span className={`text-sm ${sp.sales >= sp.quota ? "text-green-400" : "text-yellow-400"}`}>
                            {Math.round((sp.sales / sp.quota) * 100)}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right font-medium text-green-400">{formatCurrency(sp.commission)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="planes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {commissionPlans.map((plan) => (
              <Card key={plan.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                      <Percent className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="font-medium">{plan.name}</p>
                      <Badge className="bg-green-500/20 text-green-400">Activo</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tasa</span>
                      <span className="font-bold text-xl">{plan.rate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Desde</span>
                      <span>{formatCurrency(plan.threshold)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="liquidaciones">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Historial de liquidaciones de comisiones</p>
          </Card>
        </TabsContent>

        <TabsContent value="proyecciones">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Proyecciones de comisiones para el próximo período</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
