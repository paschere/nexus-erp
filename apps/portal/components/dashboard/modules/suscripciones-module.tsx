"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingUp, Users, Plus, Download, AlertTriangle, DollarSign } from "lucide-react"

const subscriptions = [
  {
    id: 1,
    client: "ABC Corp",
    plan: "Enterprise",
    mrr: 5000000,
    status: "active",
    nextBilling: "2024-02-01",
    since: "2023-01-15",
  },
  {
    id: 2,
    client: "XYZ Ltda",
    plan: "Professional",
    mrr: 2500000,
    status: "active",
    nextBilling: "2024-02-05",
    since: "2023-03-20",
  },
  {
    id: 3,
    client: "Tech Solutions",
    plan: "Starter",
    mrr: 500000,
    status: "churned",
    nextBilling: null,
    since: "2023-06-10",
  },
  {
    id: 4,
    client: "Global Trade",
    plan: "Enterprise",
    mrr: 5000000,
    status: "active",
    nextBilling: "2024-02-10",
    since: "2022-11-01",
  },
  {
    id: 5,
    client: "Innova SAS",
    plan: "Professional",
    mrr: 2500000,
    status: "trial",
    nextBilling: "2024-01-25",
    since: "2024-01-10",
  },
]

export function SuscripcionesModule() {
  const [activeTab, setActiveTab] = useState("suscripciones")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  const totalMRR = subscriptions.filter((s) => s.status === "active").reduce((sum, s) => sum + s.mrr, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Suscripciones</h1>
          <p className="text-muted-foreground">Gestión de ingresos recurrentes y clientes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Suscripción
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">MRR</p>
                <p className="text-2xl font-bold">{formatCurrency(totalMRR)}</p>
              </div>
              <div className="p-3 bg-teal-500/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-teal-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-400">
              <TrendingUp className="h-3 w-3" />
              <span>+12% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Suscriptores Activos</p>
                <p className="text-2xl font-bold">47</p>
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
                <p className="text-sm text-muted-foreground">Churn Rate</p>
                <p className="text-2xl font-bold">2.3%</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">LTV Promedio</p>
                <p className="text-2xl font-bold">{formatCurrency(45000000)}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="suscripciones">Suscripciones</TabsTrigger>
          <TabsTrigger value="planes">Planes</TabsTrigger>
          <TabsTrigger value="renovaciones">Renovaciones</TabsTrigger>
          <TabsTrigger value="metricas">Métricas</TabsTrigger>
        </TabsList>

        <TabsContent value="suscripciones" className="space-y-4">
          <Card className="bg-card border-border">
            <ScrollArea className="h-[400px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Cliente</th>
                    <th className="text-left p-4 font-medium">Plan</th>
                    <th className="text-right p-4 font-medium">MRR</th>
                    <th className="text-center p-4 font-medium">Estado</th>
                    <th className="text-left p-4 font-medium">Próximo Cobro</th>
                    <th className="text-left p-4 font-medium">Cliente Desde</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-b border-border hover:bg-muted/30">
                      <td className="p-4 font-medium">{sub.client}</td>
                      <td className="p-4">
                        <Badge variant="outline">{sub.plan}</Badge>
                      </td>
                      <td className="p-4 text-right font-medium">{formatCurrency(sub.mrr)}</td>
                      <td className="p-4 text-center">
                        {sub.status === "active" && <Badge className="bg-green-500/20 text-green-400">Activa</Badge>}
                        {sub.status === "trial" && <Badge className="bg-blue-500/20 text-blue-400">Trial</Badge>}
                        {sub.status === "churned" && <Badge className="bg-red-500/20 text-red-400">Cancelada</Badge>}
                      </td>
                      <td className="p-4 text-muted-foreground">{sub.nextBilling || "—"}</td>
                      <td className="p-4 text-muted-foreground">{sub.since}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="planes">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Configuración de planes de suscripción</p>
          </Card>
        </TabsContent>

        <TabsContent value="renovaciones">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Próximas renovaciones y vencimientos</p>
          </Card>
        </TabsContent>

        <TabsContent value="metricas">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Métricas SaaS: ARPU, CAC, LTV, Churn</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
