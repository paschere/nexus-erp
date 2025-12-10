"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Truck,
  MapPin,
  Fuel,
  Clock,
  Navigation,
  ThermometerSun,
  Gauge,
  Plus,
  Calendar,
  Route,
  Package,
  User,
  Radio,
} from "lucide-react"

export default function FlotasModule() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)

  const stats = [
    { label: "Vehículos Activos", value: "24/28", icon: Truck, color: "text-emerald-500" },
    { label: "En Ruta", value: "18", icon: Route, color: "text-blue-500" },
    { label: "Km Hoy", value: "1,847", icon: Navigation, color: "text-purple-500" },
    { label: "Combustible", value: "$2.8M", icon: Fuel, color: "text-amber-500" },
  ]

  const vehicles = [
    {
      id: "VH-001",
      plate: "ABC-123",
      type: "Camión",
      driver: "Juan Pérez",
      status: "active",
      location: "Bogotá - Calle 80",
      fuel: 75,
      speed: 45,
      temp: 22,
      nextMaint: "5 días",
    },
    {
      id: "VH-002",
      plate: "DEF-456",
      type: "Furgón",
      driver: "María García",
      status: "active",
      location: "Medellín - Las Palmas",
      fuel: 45,
      speed: 60,
      temp: 4,
      nextMaint: "12 días",
    },
    {
      id: "VH-003",
      plate: "GHI-789",
      type: "Van",
      driver: "Carlos López",
      status: "idle",
      location: "Cali - Depot Central",
      fuel: 90,
      speed: 0,
      temp: null,
      nextMaint: "3 días",
    },
    {
      id: "VH-004",
      plate: "JKL-012",
      type: "Camión",
      driver: "Ana Martínez",
      status: "maintenance",
      location: "Taller Principal",
      fuel: 30,
      speed: 0,
      temp: null,
      nextMaint: "Hoy",
    },
  ]

  const deliveries = [
    { id: "ENT-001", vehicle: "VH-001", client: "TechCorp", eta: "14:30", status: "in_progress", packages: 12 },
    { id: "ENT-002", vehicle: "VH-002", client: "Industrias ABC", eta: "15:45", status: "in_progress", packages: 8 },
    { id: "ENT-003", vehicle: "VH-001", client: "Comercial XYZ", eta: "16:20", status: "pending", packages: 5 },
    { id: "ENT-004", vehicle: "VH-003", client: "Grupo Delta", eta: "09:00", status: "completed", packages: 15 },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500/20 text-emerald-400">En Ruta</Badge>
      case "idle":
        return <Badge className="bg-blue-500/20 text-blue-400">Disponible</Badge>
      case "maintenance":
        return <Badge className="bg-amber-500/20 text-amber-400">Mantenimiento</Badge>
      case "offline":
        return <Badge className="bg-red-500/20 text-red-400">Fuera de Línea</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Flotas</h1>
          <p className="text-muted-foreground">Monitoreo y control de vehículos en tiempo real</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Radio className="h-4 w-4 mr-2" />
            GPS en Vivo
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Vehículo
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-background/80 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Mapa */}
        <Card className="col-span-2 bg-card/50 border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Mapa en Tiempo Real</CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  En Ruta: 18
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Disponibles: 4
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  Mantenimiento: 2
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] rounded-lg bg-slate-900 relative overflow-hidden">
              {/* Mapa placeholder */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2dd4bf" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>

              {/* Vehicle markers */}
              {vehicles
                .filter((v) => v.status !== "maintenance")
                .map((vehicle, i) => (
                  <div
                    key={vehicle.id}
                    className={`absolute cursor-pointer transition-transform hover:scale-110 ${
                      selectedVehicle === vehicle.id ? "z-10" : ""
                    }`}
                    style={{
                      left: `${20 + i * 25}%`,
                      top: `${30 + (i % 2) * 30}%`,
                    }}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div
                      className={`p-2 rounded-full ${
                        vehicle.status === "active" ? "bg-emerald-500" : "bg-blue-500"
                      } shadow-lg`}
                    >
                      <Truck className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-background/90 px-2 py-0.5 rounded">
                      {vehicle.plate}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Lista de Vehículos */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Vehículos</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedVehicle === vehicle.id
                        ? "bg-teal-500/20 border border-teal-500/50"
                        : "bg-background/50 hover:bg-background/80"
                    }`}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{vehicle.plate}</span>
                      </div>
                      {getStatusBadge(vehicle.status)}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      <User className="h-3 w-3 inline mr-1" />
                      {vehicle.driver}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {vehicle.location}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div className="text-center p-1 rounded bg-background/50">
                        <Fuel className="h-3 w-3 mx-auto mb-1 text-amber-500" />
                        <span className="text-xs">{vehicle.fuel}%</span>
                      </div>
                      <div className="text-center p-1 rounded bg-background/50">
                        <Gauge className="h-3 w-3 mx-auto mb-1 text-blue-500" />
                        <span className="text-xs">{vehicle.speed} km/h</span>
                      </div>
                      {vehicle.temp !== null && (
                        <div className="text-center p-1 rounded bg-background/50">
                          <ThermometerSun className="h-3 w-3 mx-auto mb-1 text-cyan-500" />
                          <span className="text-xs">{vehicle.temp}°C</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Entregas */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Entregas del Día</CardTitle>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Ver Calendario
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {deliveries.map((delivery) => (
              <div key={delivery.id} className="p-4 rounded-lg bg-background/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{delivery.id}</span>
                  <Badge
                    className={
                      delivery.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : delivery.status === "in_progress"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-amber-500/20 text-amber-400"
                    }
                  >
                    {delivery.status === "completed"
                      ? "Entregado"
                      : delivery.status === "in_progress"
                        ? "En Camino"
                        : "Pendiente"}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{delivery.client}</div>
                <div className="flex items-center justify-between mt-3 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    ETA: {delivery.eta}
                  </span>
                  <span className="flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    {delivery.packages}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
