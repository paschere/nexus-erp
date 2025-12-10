"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, Factory, Layers, Clock, CheckCircle2, AlertTriangle, Play, Pause, MoreHorizontal } from "lucide-react"

const productionOrders = [
  {
    id: "OP-0895",
    producto: "SKU-A1234",
    cantidad: 500,
    progreso: 78,
    estado: "En proceso",
    inicio: "14:30",
    estimado: "18:45",
  },
  {
    id: "OP-0894",
    producto: "SKU-B5678",
    cantidad: 250,
    progreso: 100,
    estado: "Completado",
    inicio: "08:00",
    estimado: "12:30",
  },
  {
    id: "OP-0893",
    producto: "SKU-C9012",
    cantidad: 1000,
    progreso: 45,
    estado: "En proceso",
    inicio: "10:15",
    estimado: "20:00",
  },
  {
    id: "OP-0892",
    producto: "SKU-D3456",
    cantidad: 150,
    progreso: 0,
    estado: "Pendiente",
    inicio: "-",
    estimado: "Mañana",
  },
]

const bomItems = [
  { componente: "Materia Prima A", disponible: 2500, requerido: 1800, unidad: "kg" },
  { componente: "Componente B", disponible: 450, requerido: 500, unidad: "uds" },
  { componente: "Empaque C", disponible: 3200, requerido: 2000, unidad: "uds" },
  { componente: "Etiqueta D", disponible: 5000, requerido: 2000, unidad: "uds" },
]

export function ManufacturaModule() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manufactura MRP</h1>
          <p className="text-muted-foreground">Gestión de producción y materiales</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Layers className="h-4 w-4" />
            Ver BOM
          </Button>
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
            Nueva OP
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Play className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-sm text-muted-foreground">En proceso</p>
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
                <p className="text-2xl font-bold text-foreground">7</p>
                <p className="text-sm text-muted-foreground">Pendientes</p>
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
                <p className="text-2xl font-bold text-foreground">23</p>
                <p className="text-sm text-muted-foreground">Completadas hoy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Factory className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">87%</p>
                <p className="text-sm text-muted-foreground">Eficiencia</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Orders */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Órdenes de Producción</CardTitle>
            <CardDescription>Seguimiento en tiempo real</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {productionOrders.map((order) => (
              <div key={order.id} className="p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground">{order.id}</span>
                    <Badge
                      variant="outline"
                      className={
                        order.estado === "Completado"
                          ? "text-green-500 border-green-500/30"
                          : order.estado === "En proceso"
                            ? "text-blue-500 border-blue-500/30"
                            : "text-yellow-500 border-yellow-500/30"
                      }
                    >
                      {order.estado}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {order.estado === "En proceso" && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pause className="h-4 w-4" />
                      </Button>
                    )}
                    {order.estado === "Pendiente" && (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500">
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-muted-foreground">Producto</p>
                    <p className="text-foreground font-medium">{order.producto}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cantidad</p>
                    <p className="text-foreground font-medium">{order.cantidad} uds</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Inicio</p>
                    <p className="text-foreground font-medium">{order.inicio}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Estimado</p>
                    <p className="text-foreground font-medium">{order.estimado}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={order.progreso} className="flex-1 h-2" />
                  <span className="text-sm font-medium text-foreground w-12">{order.progreso}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* BOM Status */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Estado de Materiales</CardTitle>
            <CardDescription>Disponibilidad para producción</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {bomItems.map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{item.componente}</span>
                  {item.disponible >= item.requerido ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.disponible.toLocaleString()} / {item.requerido.toLocaleString()} {item.unidad}
                  </span>
                  <span className={item.disponible >= item.requerido ? "text-green-500" : "text-yellow-500"}>
                    {Math.round((item.disponible / item.requerido) * 100)}%
                  </span>
                </div>
                <Progress
                  value={Math.min(100, (item.disponible / item.requerido) * 100)}
                  className={`h-1.5 mt-2 ${item.disponible < item.requerido ? "[&>div]:bg-yellow-500" : ""}`}
                />
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2 bg-transparent">
              Ver Lista Completa
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
