"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { RotateCcw, Search, Plus, Filter, CheckCircle, Clock, DollarSign, FileText, ArrowRight } from "lucide-react"

export default function GarantiasModule() {
  const [searchTerm, setSearchTerm] = useState("")

  const stats = [
    { label: "RMA Abiertos", value: "34", change: -12, icon: RotateCcw, color: "text-amber-500" },
    { label: "En Proceso", value: "18", change: 5, icon: Clock, color: "text-blue-500" },
    { label: "Resueltos (Mes)", value: "89", change: 23, icon: CheckCircle, color: "text-emerald-500" },
    { label: "Costo Garantías", value: "$12.5M", change: -8, icon: DollarSign, color: "text-red-500" },
  ]

  const rmaList = [
    {
      id: "RMA-2024-001",
      client: "TechCorp S.A.S",
      product: "Motor Eléctrico 5HP",
      reason: "Defecto de fábrica",
      status: "pending",
      date: "2024-06-15",
      value: 850000,
      priority: "high",
    },
    {
      id: "RMA-2024-002",
      client: "Industrias ABC",
      product: "Válvula de Control",
      reason: "Falla en operación",
      status: "in_transit",
      date: "2024-06-14",
      value: 320000,
      priority: "medium",
    },
    {
      id: "RMA-2024-003",
      client: "Comercial XYZ",
      product: "Sensor de Temperatura",
      reason: "No enciende",
      status: "inspecting",
      date: "2024-06-13",
      value: 180000,
      priority: "low",
    },
    {
      id: "RMA-2024-004",
      client: "Grupo Delta",
      product: "PLC Controller",
      reason: "Error de software",
      status: "approved",
      date: "2024-06-12",
      value: 1250000,
      priority: "high",
    },
    {
      id: "RMA-2024-005",
      client: "MegaTech",
      product: "Bomba Centrífuga",
      reason: "Fuga de aceite",
      status: "completed",
      date: "2024-06-10",
      value: 680000,
      priority: "medium",
    },
  ]

  const reasonStats = [
    { reason: "Defecto de fábrica", count: 45, percentage: 35 },
    { reason: "Daño en transporte", count: 28, percentage: 22 },
    { reason: "Uso inadecuado", count: 23, percentage: 18 },
    { reason: "Falla prematura", count: 19, percentage: 15 },
    { reason: "Otros", count: 13, percentage: 10 },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500/20 text-amber-400">Pendiente</Badge>
      case "in_transit":
        return <Badge className="bg-blue-500/20 text-blue-400">En Tránsito</Badge>
      case "inspecting":
        return <Badge className="bg-purple-500/20 text-purple-400">Inspección</Badge>
      case "approved":
        return <Badge className="bg-emerald-500/20 text-emerald-400">Aprobado</Badge>
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-400">Rechazado</Badge>
      case "completed":
        return <Badge className="bg-slate-500/20 text-slate-400">Completado</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>
      case "medium":
        return <Badge className="bg-amber-500/20 text-amber-400">Media</Badge>
      case "low":
        return <Badge variant="outline">Baja</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Garantías y Devoluciones</h1>
          <p className="text-muted-foreground">Gestión de RMA y servicio post-venta</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Reportes
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Solicitud
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl bg-background/80 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <Badge
                  className={stat.change >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}
                >
                  {stat.change >= 0 ? "+" : ""}
                  {stat.change}%
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="rma" className="space-y-4">
        <TabsList className="bg-background/50">
          <TabsTrigger value="rma">Solicitudes RMA</TabsTrigger>
          <TabsTrigger value="process">Proceso</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          <TabsTrigger value="policies">Políticas</TabsTrigger>
        </TabsList>

        <TabsContent value="rma" className="space-y-4">
          <div className="grid grid-cols-3 gap-6">
            {/* Lista RMA */}
            <Card className="col-span-2 bg-card/50 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Solicitudes de Garantía</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar RMA..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-64 bg-background/50"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[450px]">
                  <div className="space-y-3">
                    {rmaList.map((rma) => (
                      <div
                        key={rma.id}
                        className="p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border border-transparent hover:border-teal-500/30"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-amber-500/20">
                              <RotateCcw className="h-4 w-4 text-amber-500" />
                            </div>
                            <div>
                              <div className="font-semibold flex items-center gap-2">
                                {rma.id}
                                {getStatusBadge(rma.status)}
                                {getPriorityBadge(rma.priority)}
                              </div>
                              <div className="text-sm text-muted-foreground">{rma.client}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">${rma.value.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{rma.date}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Producto</div>
                            <div className="font-medium">{rma.product}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Motivo</div>
                            <div className="font-medium">{rma.reason}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Panel Lateral */}
            <div className="space-y-4">
              {/* Flujo de Proceso */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Flujo de RMA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Solicitud", "En Tránsito", "Inspección", "Decisión", "Resolución"].map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            i < 3 ? "bg-teal-500 text-white" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <span className={i < 3 ? "font-medium" : "text-muted-foreground"}>{step}</span>
                        {i < 4 && <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Motivos de Devolución */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Motivos de Devolución</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reasonStats.map((item) => (
                      <div key={item.reason}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.reason}</span>
                          <span className="text-muted-foreground">{item.count}</span>
                        </div>
                        <Progress value={item.percentage} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="process">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-12">Gestión de Proceso RMA - En desarrollo</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-12">Analíticas de Garantías - En desarrollo</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-12">Políticas de Garantía - En desarrollo</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
