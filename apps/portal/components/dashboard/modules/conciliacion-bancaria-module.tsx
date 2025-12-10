"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Building2, RefreshCw, CheckCircle2, Clock, Sparkles, Link2, AlertTriangle, MoreHorizontal } from "lucide-react"

const banks = [
  {
    id: 1,
    name: "Bancolombia",
    account: "****4532",
    balance: 125430000,
    pending: 12,
    synced: "Hace 5 min",
    status: "connected",
  },
  {
    id: 2,
    name: "Davivienda",
    account: "****7821",
    balance: 48750000,
    pending: 5,
    synced: "Hace 10 min",
    status: "connected",
  },
  { id: 3, name: "BBVA", account: "****3345", balance: 32100000, pending: 3, synced: "Hace 1 hora", status: "warning" },
]

const transactions = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Pago Proveedor ABC",
    bank: -5400000,
    erp: -5400000,
    status: "matched",
    type: "egreso",
  },
  {
    id: 2,
    date: "2024-01-15",
    description: "Cobro Factura #1234",
    bank: 12500000,
    erp: 12500000,
    status: "matched",
    type: "ingreso",
  },
  {
    id: 3,
    date: "2024-01-14",
    description: "Transferencia Desconocida",
    bank: 3200000,
    erp: null,
    status: "unmatched",
    type: "ingreso",
  },
  {
    id: 4,
    date: "2024-01-14",
    description: "Pago Nómina",
    bank: -45000000,
    erp: -45000000,
    status: "matched",
    type: "egreso",
  },
  {
    id: 5,
    date: "2024-01-13",
    description: "Comisión Bancaria",
    bank: -125000,
    erp: null,
    status: "unmatched",
    type: "egreso",
  },
]

export function ConciliacionBancariaModule() {
  const [activeTab, setActiveTab] = useState("conciliacion")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Conciliación Bancaria</h1>
          <p className="text-muted-foreground">Sincroniza y concilia movimientos bancarios automáticamente</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sincronizar Todo
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Sparkles className="h-4 w-4 mr-2" />
            Conciliar con AI
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Saldo Total Bancos</p>
                <p className="text-2xl font-bold">{formatCurrency(206280000)}</p>
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
                <p className="text-sm text-muted-foreground">Conciliados</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <Progress value={85} className="mt-2 h-1" />
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold">20</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Diferencia</p>
                <p className="text-2xl font-bold text-yellow-400">{formatCurrency(3075000)}</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bancos Conectados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {banks.map((bank) => (
          <Card key={bank.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Building2 className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">{bank.name}</p>
                    <p className="text-sm text-muted-foreground">{bank.account}</p>
                  </div>
                </div>
                <Badge
                  className={
                    bank.status === "connected" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  }
                >
                  {bank.status === "connected" ? "Conectado" : "Revisar"}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saldo</span>
                  <span className="font-medium">{formatCurrency(bank.balance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pendientes</span>
                  <span className="text-yellow-400">{bank.pending}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sincronizado</span>
                  <span>{bank.synced}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3 bg-transparent" size="sm">
                <RefreshCw className="h-3 w-3 mr-2" />
                Sincronizar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="conciliacion">Conciliación</TabsTrigger>
          <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          <TabsTrigger value="reglas">Reglas Automáticas</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="conciliacion" className="space-y-4">
          <Card className="bg-card border-border">
            <ScrollArea className="h-[400px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Fecha</th>
                    <th className="text-left p-4 font-medium">Descripción</th>
                    <th className="text-right p-4 font-medium">Banco</th>
                    <th className="text-right p-4 font-medium">ERP</th>
                    <th className="text-center p-4 font-medium">Estado</th>
                    <th className="text-left p-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-border hover:bg-muted/30">
                      <td className="p-4 text-muted-foreground">{tx.date}</td>
                      <td className="p-4 font-medium">{tx.description}</td>
                      <td className={`p-4 text-right ${tx.bank < 0 ? "text-red-400" : "text-green-400"}`}>
                        {formatCurrency(tx.bank)}
                      </td>
                      <td
                        className={`p-4 text-right ${tx.erp ? (tx.erp < 0 ? "text-red-400" : "text-green-400") : "text-muted-foreground"}`}
                      >
                        {tx.erp ? formatCurrency(tx.erp) : "—"}
                      </td>
                      <td className="p-4 text-center">
                        {tx.status === "matched" ? (
                          <Badge className="bg-green-500/20 text-green-400">Conciliado</Badge>
                        ) : (
                          <Badge className="bg-yellow-500/20 text-yellow-400">Pendiente</Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          {tx.status === "unmatched" && (
                            <Button variant="ghost" size="sm" className="text-teal-400">
                              <Link2 className="h-4 w-4 mr-1" />
                              Vincular
                            </Button>
                          )}
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="pendientes">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">20 transacciones pendientes de conciliar</p>
          </Card>
        </TabsContent>

        <TabsContent value="reglas">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Configura reglas automáticas de conciliación</p>
          </Card>
        </TabsContent>

        <TabsContent value="historial">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Historial de conciliaciones realizadas</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
