"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  MoreHorizontal,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const orderData = [
  { day: "Lun", pedidos: 45 },
  { day: "Mar", pedidos: 52 },
  { day: "Mie", pedidos: 38 },
  { day: "Jue", pedidos: 61 },
  { day: "Vie", pedidos: 55 },
  { day: "Sab", pedidos: 32 },
  { day: "Dom", pedidos: 18 },
]

const recentOrders = [
  {
    id: "PED-1284",
    cliente: "Distribuidora ABC",
    valor: "$4,250,000",
    items: 12,
    estado: "Procesando",
    fecha: "Hoy 14:32",
  },
  { id: "PED-1283", cliente: "Comercial XYZ", valor: "$2,890,000", items: 8, estado: "Enviado", fecha: "Hoy 11:15" },
  {
    id: "PED-1282",
    cliente: "SuperMart S.A.",
    valor: "$7,420,000",
    items: 24,
    estado: "Completado",
    fecha: "Ayer 16:45",
  },
  { id: "PED-1281", cliente: "Mayorista 123", valor: "$1,650,000", items: 5, estado: "Pendiente", fecha: "Ayer 09:20" },
  { id: "PED-1280", cliente: "Tiendas Unidas", valor: "$3,180,000", items: 15, estado: "Completado", fecha: "15 Jun" },
]

export function EcommerceModule() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">E-Commerce B2B</h1>
          <p className="text-muted-foreground">Portal web para clientes mayoristas</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
            Nuevo Pedido
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-chart-2/20 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-chart-2" />
              </div>
            </div>
            <p className="text-2xl font-bold mt-4 text-foreground">156</p>
            <p className="text-sm text-muted-foreground">Pedidos este mes</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold mt-4 text-foreground">$89.4M</p>
            <p className="text-sm text-muted-foreground">Ventas totales</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-chart-3" />
              </div>
            </div>
            <p className="text-2xl font-bold mt-4 text-foreground">47</p>
            <p className="text-sm text-muted-foreground">Clientes activos</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-chart-5/20 flex items-center justify-center">
                <Package className="h-5 w-5 text-chart-5" />
              </div>
            </div>
            <p className="text-2xl font-bold mt-4 text-foreground">$573K</p>
            <p className="text-sm text-muted-foreground">Ticket promedio</p>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Chart */}
        <Card className="lg:col-span-1 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Pedidos por Día</CardTitle>
            <CardDescription>Última semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="pedidos" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Pedidos Recientes</CardTitle>
                <CardDescription>Gestión de órdenes B2B</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar..." className="pl-9 w-48 h-9" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Pedido</TableHead>
                  <TableHead className="text-muted-foreground">Cliente</TableHead>
                  <TableHead className="text-muted-foreground">Valor</TableHead>
                  <TableHead className="text-muted-foreground">Items</TableHead>
                  <TableHead className="text-muted-foreground">Estado</TableHead>
                  <TableHead className="text-muted-foreground"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id} className="border-border">
                    <TableCell className="font-medium text-foreground">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-secondary text-foreground text-xs">
                            {order.cliente.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-foreground">{order.cliente}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{order.valor}</TableCell>
                    <TableCell className="text-foreground">{order.items}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          order.estado === "Completado"
                            ? "text-green-500 border-green-500/30"
                            : order.estado === "Procesando"
                              ? "text-blue-500 border-blue-500/30"
                              : order.estado === "Enviado"
                                ? "text-purple-500 border-purple-500/30"
                                : "text-yellow-500 border-yellow-500/30"
                        }
                      >
                        {order.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
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
