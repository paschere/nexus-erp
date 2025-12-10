"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Truck, MapPin, Clock, CheckCircle2, Navigation, Phone, Wrench } from "lucide-react"

const technicians = [
  {
    id: 1,
    nombre: "Carlos Gómez",
    estado: "En ruta",
    ordenes: 3,
    ubicacion: "Zona Norte",
    foto: "/colombian-male-technician.jpg",
  },
  {
    id: 2,
    nombre: "María López",
    estado: "En servicio",
    ordenes: 2,
    ubicacion: "Centro",
    foto: "/colombian-female-technician.jpg",
  },
  {
    id: 3,
    nombre: "Juan Rodríguez",
    estado: "Disponible",
    ordenes: 0,
    ubicacion: "Base",
    foto: "/colombian-male-worker.jpg",
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    estado: "En ruta",
    ordenes: 4,
    ubicacion: "Zona Sur",
    foto: "/colombian-female-professional.jpg",
  },
]

const serviceOrders = [
  {
    id: "OS-2345",
    cliente: "Empresa ABC",
    tipo: "Mantenimiento",
    tecnico: "Carlos Gómez",
    hora: "14:00",
    estado: "En camino",
  },
  {
    id: "OS-2344",
    cliente: "Tienda XYZ",
    tipo: "Instalación",
    tecnico: "María López",
    hora: "15:30",
    estado: "En proceso",
  },
  {
    id: "OS-2343",
    cliente: "Oficina 123",
    tipo: "Reparación",
    tecnico: "Ana Martínez",
    hora: "16:00",
    estado: "Pendiente",
  },
  {
    id: "OS-2342",
    cliente: "Local Centro",
    tipo: "Inspección",
    tecnico: "Carlos Gómez",
    hora: "17:30",
    estado: "Pendiente",
  },
]

export function FieldServiceModule() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Field Service</h1>
          <p className="text-muted-foreground">Gestión de técnicos en campo</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <MapPin className="h-4 w-4" />
            Ver Mapa
          </Button>
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
            Nueva OS
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Truck className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">OS activas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Navigation className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-sm text-muted-foreground">Técnicos en campo</p>
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
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">Completadas hoy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">45 min</p>
                <p className="text-sm text-muted-foreground">Tiempo prom.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Technicians */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Técnicos</CardTitle>
            <CardDescription>Estado en tiempo real</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {technicians.map((tech) => (
              <div key={tech.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={tech.foto || "/placeholder.svg"} />
                    <AvatarFallback>{tech.nombre.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{tech.nombre}</p>
                    <p className="text-sm text-muted-foreground">{tech.ubicacion}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className={
                      tech.estado === "Disponible"
                        ? "text-green-500 border-green-500/30"
                        : tech.estado === "En servicio"
                          ? "text-blue-500 border-blue-500/30"
                          : "text-yellow-500 border-yellow-500/30"
                    }
                  >
                    {tech.estado}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{tech.ordenes} órdenes</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Service Orders */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Órdenes de Servicio</CardTitle>
            <CardDescription>Programación del día</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {serviceOrders.map((os) => (
              <div
                key={os.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{os.id}</span>
                      <Badge variant="secondary">{os.tipo}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{os.cliente}</p>
                    <p className="text-xs text-muted-foreground">Técnico: {os.tecnico}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className={
                      os.estado === "En proceso"
                        ? "text-blue-500 border-blue-500/30"
                        : os.estado === "En camino"
                          ? "text-yellow-500 border-yellow-500/30"
                          : "text-muted-foreground border-border"
                    }
                  >
                    {os.estado}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center justify-end gap-1">
                    <Clock className="h-3 w-3" />
                    {os.hora}
                  </p>
                  <div className="flex items-center gap-1 mt-2 justify-end">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
