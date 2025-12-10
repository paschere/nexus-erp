"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building2, Plus, Users, ArrowRightLeft, Download, TrendingUp } from "lucide-react"

const companies = [
  { id: 1, name: "NEXUS Holdings", nit: "900.123.456-7", type: "Matriz", users: 45, status: "active" },
  { id: 2, name: "NEXUS Distribución", nit: "900.234.567-8", type: "Filial", users: 23, status: "active" },
  { id: 3, name: "NEXUS Retail", nit: "900.345.678-9", type: "Filial", users: 34, status: "active" },
  { id: 4, name: "NEXUS Tech", nit: "900.456.789-0", type: "Filial", users: 12, status: "inactive" },
]

const intercompanyTx = [
  { id: 1, from: "NEXUS Holdings", to: "NEXUS Distribución", amount: 150000000, type: "Préstamo", date: "2024-01-15" },
  { id: 2, from: "NEXUS Distribución", to: "NEXUS Retail", amount: 45000000, type: "Venta", date: "2024-01-14" },
  { id: 3, from: "NEXUS Retail", to: "NEXUS Holdings", amount: 28000000, type: "Dividendos", date: "2024-01-10" },
]

export function MultiEmpresaModule() {
  const [activeTab, setActiveTab] = useState("empresas")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Multi-Empresa</h1>
          <p className="text-muted-foreground">Gestión de grupos empresariales y consolidación</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Consolidar
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Empresa
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Empresas</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="p-3 bg-teal-500/20 rounded-lg">
                <Building2 className="h-6 w-6 text-teal-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Usuarios Totales</p>
                <p className="text-2xl font-bold">114</p>
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
                <p className="text-sm text-muted-foreground">Ingresos Consolidados</p>
                <p className="text-2xl font-bold">{formatCurrency(2500000000)}</p>
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
                <p className="text-sm text-muted-foreground">Tx Intercompañía</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <ArrowRightLeft className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="empresas">Empresas</TabsTrigger>
          <TabsTrigger value="intercompania">Intercompañía</TabsTrigger>
          <TabsTrigger value="consolidacion">Consolidación</TabsTrigger>
          <TabsTrigger value="permisos">Permisos</TabsTrigger>
        </TabsList>

        <TabsContent value="empresas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companies.map((company) => (
              <Card
                key={company.id}
                className="bg-card border-border hover:border-teal-500/50 cursor-pointer transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-teal-500/20 rounded-lg">
                        <Building2 className="h-5 w-5 text-teal-400" />
                      </div>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-sm text-muted-foreground">NIT: {company.nit}</p>
                      </div>
                    </div>
                    <Badge
                      className={
                        company.type === "Matriz" ? "bg-teal-500/20 text-teal-400" : "bg-blue-500/20 text-blue-400"
                      }
                    >
                      {company.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{company.users} usuarios</span>
                    </div>
                    <Badge
                      className={
                        company.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                      }
                    >
                      {company.status === "active" ? "Activa" : "Inactiva"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="intercompania" className="space-y-4">
          <Card className="bg-card border-border">
            <ScrollArea className="h-[300px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Origen</th>
                    <th className="text-left p-4 font-medium">Destino</th>
                    <th className="text-left p-4 font-medium">Tipo</th>
                    <th className="text-right p-4 font-medium">Monto</th>
                    <th className="text-left p-4 font-medium">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {intercompanyTx.map((tx) => (
                    <tr key={tx.id} className="border-b border-border hover:bg-muted/30">
                      <td className="p-4">{tx.from}</td>
                      <td className="p-4">{tx.to}</td>
                      <td className="p-4">
                        <Badge variant="outline">{tx.type}</Badge>
                      </td>
                      <td className="p-4 text-right font-medium">{formatCurrency(tx.amount)}</td>
                      <td className="p-4 text-muted-foreground">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="consolidacion">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Estados financieros consolidados del grupo</p>
          </Card>
        </TabsContent>

        <TabsContent value="permisos">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Configuración de permisos cross-empresa</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
