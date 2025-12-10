"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FileText,
  Search,
  Plus,
  Filter,
  DollarSign,
  Clock,
  Bell,
  MoreHorizontal,
  Eye,
  Edit,
  Download,
  Shield,
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

export default function ContratosModule() {
  const [searchTerm, setSearchTerm] = useState("")

  const stats = [
    { label: "Contratos Activos", value: "127", change: 8, icon: FileText, color: "text-teal-500" },
    { label: "Valor Total", value: "$4.2M", change: 15, icon: DollarSign, color: "text-emerald-500" },
    { label: "Por Renovar (30d)", value: "18", change: -3, icon: Clock, color: "text-amber-500" },
    { label: "SLA Cumplido", value: "94.5%", change: 2.1, icon: Shield, color: "text-blue-500" },
  ]

  const contracts = [
    {
      id: "CTR-001",
      client: "TechCorp S.A.S",
      type: "Servicio",
      value: 125000,
      startDate: "2024-01-15",
      endDate: "2025-01-14",
      status: "active",
      progress: 75,
      sla: 98,
    },
    {
      id: "CTR-002",
      client: "Industrias ABC",
      type: "Licencia",
      value: 89000,
      startDate: "2024-03-01",
      endDate: "2024-12-31",
      status: "expiring",
      progress: 85,
      sla: 95,
    },
    {
      id: "CTR-003",
      client: "Comercial XYZ",
      type: "Mantenimiento",
      value: 45000,
      startDate: "2024-06-01",
      endDate: "2025-05-31",
      status: "active",
      progress: 25,
      sla: 100,
    },
    {
      id: "CTR-004",
      client: "Grupo Delta",
      type: "Consultoría",
      value: 280000,
      startDate: "2023-09-01",
      endDate: "2024-08-31",
      status: "renewal",
      progress: 95,
      sla: 92,
    },
    {
      id: "CTR-005",
      client: "Empresa Omega",
      type: "Servicio",
      value: 156000,
      startDate: "2024-02-15",
      endDate: "2025-02-14",
      status: "active",
      progress: 60,
      sla: 97,
    },
  ]

  const contractTypes = [
    { name: "Servicio", value: 45, color: "#2dd4bf" },
    { name: "Licencia", value: 25, color: "#3b82f6" },
    { name: "Mantenimiento", value: 18, color: "#8b5cf6" },
    { name: "Consultoría", value: 12, color: "#f59e0b" },
  ]

  const renewalData = [
    { month: "Jul", renovaciones: 5, nuevos: 3 },
    { month: "Ago", renovaciones: 8, nuevos: 4 },
    { month: "Sep", renovaciones: 12, nuevos: 6 },
    { month: "Oct", renovaciones: 7, nuevos: 5 },
    { month: "Nov", renovaciones: 15, nuevos: 8 },
    { month: "Dic", renovaciones: 10, nuevos: 4 },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500/20 text-emerald-400">Activo</Badge>
      case "expiring":
        return <Badge className="bg-amber-500/20 text-amber-400">Por Vencer</Badge>
      case "renewal":
        return <Badge className="bg-blue-500/20 text-blue-400">En Renovación</Badge>
      case "expired":
        return <Badge className="bg-red-500/20 text-red-400">Vencido</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Contratos</h1>
          <p className="text-muted-foreground">Administra contratos, SLAs y renovaciones</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Contrato
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
                  variant={stat.change >= 0 ? "default" : "destructive"}
                  className={stat.change >= 0 ? "bg-emerald-500/20 text-emerald-400" : ""}
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

      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList className="bg-background/50">
          <TabsTrigger value="contracts">Contratos</TabsTrigger>
          <TabsTrigger value="renewals">Renovaciones</TabsTrigger>
          <TabsTrigger value="sla">SLA Monitor</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          <div className="grid grid-cols-3 gap-6">
            {/* Lista de Contratos */}
            <Card className="col-span-2 bg-card/50 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Contratos</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar contratos..."
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
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {contracts.map((contract) => (
                      <div
                        key={contract.id}
                        className="p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border border-transparent hover:border-teal-500/30"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-teal-500/20">
                              <FileText className="h-4 w-4 text-teal-500" />
                            </div>
                            <div>
                              <div className="font-semibold flex items-center gap-2">
                                {contract.id}
                                {getStatusBadge(contract.status)}
                              </div>
                              <div className="text-sm text-muted-foreground">{contract.client}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Tipo</div>
                            <div className="font-medium">{contract.type}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Valor</div>
                            <div className="font-medium">${contract.value.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Vigencia</div>
                            <div className="font-medium">{contract.endDate}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">SLA</div>
                            <div
                              className={`font-medium ${contract.sla >= 95 ? "text-emerald-500" : contract.sla >= 90 ? "text-amber-500" : "text-red-500"}`}
                            >
                              {contract.sla}%
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progreso del contrato</span>
                            <span>{contract.progress}%</span>
                          </div>
                          <Progress value={contract.progress} className="h-1.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Panel Lateral */}
            <div className="space-y-4">
              {/* Por Tipo */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Por Tipo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={contractTypes} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                          {contractTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {contractTypes.map((type) => (
                      <div key={type.name} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: type.color }} />
                        <span>{type.name}</span>
                        <span className="ml-auto font-medium">{type.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alertas */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Bell className="h-4 w-4 text-amber-500" />
                    Próximos Vencimientos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Industrias ABC</span>
                        <Badge className="bg-amber-500/20 text-amber-400">15 días</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Licencia - $89,000</div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Grupo Delta</span>
                        <Badge className="bg-red-500/20 text-red-400">5 días</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Consultoría - $280,000</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">MegaTech</span>
                        <Badge variant="outline">28 días</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Servicio - $67,000</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="renewals">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Tendencia de Renovaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={renewalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                    <Area
                      type="monotone"
                      dataKey="renovaciones"
                      stackId="1"
                      stroke="#2dd4bf"
                      fill="#2dd4bf"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="nuevos"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sla">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-12">Monitor de SLA - En desarrollo</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-12">Plantillas de Contratos - En desarrollo</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
