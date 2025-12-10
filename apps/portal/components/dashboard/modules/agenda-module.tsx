"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Video,
  Phone,
  Bell,
  Sparkles,
  CheckCircle,
  Circle,
  Flag,
} from "lucide-react"

const eventos = [
  {
    id: 1,
    titulo: "Reunión con Cliente ABC",
    tipo: "reunion",
    fecha: "2024-01-15",
    horaInicio: "09:00",
    horaFin: "10:00",
    ubicacion: "Sala de Juntas A",
    participantes: ["María García", "Carlos López"],
    color: "bg-blue-500",
    modulo: "ventas",
  },
  {
    id: 2,
    titulo: "Revisión de Inventario",
    tipo: "tarea",
    fecha: "2024-01-15",
    horaInicio: "11:00",
    horaFin: "12:00",
    ubicacion: "Bodega Principal",
    participantes: ["Ana Martínez"],
    color: "bg-yellow-500",
    modulo: "inventario",
  },
  {
    id: 3,
    titulo: "Llamada con Proveedor",
    tipo: "llamada",
    fecha: "2024-01-15",
    horaInicio: "14:00",
    horaFin: "14:30",
    ubicacion: "Virtual",
    participantes: ["Pedro Rodríguez"],
    color: "bg-green-500",
    modulo: "compras",
  },
  {
    id: 4,
    titulo: "Cierre Contable Mensual",
    tipo: "recordatorio",
    fecha: "2024-01-15",
    horaInicio: "16:00",
    horaFin: "18:00",
    ubicacion: "",
    participantes: ["Laura Sánchez", "Juan Pérez"],
    color: "bg-purple-500",
    modulo: "contabilidad",
  },
]

const tareasPendientes = [
  {
    id: 1,
    titulo: "Enviar cotización a Tech Solutions",
    prioridad: "alta",
    vencimiento: "Hoy",
    modulo: "ventas",
    completada: false,
  },
  {
    id: 2,
    titulo: "Revisar orden de compra #OC-2024-089",
    prioridad: "media",
    vencimiento: "Mañana",
    modulo: "compras",
    completada: false,
  },
  {
    id: 3,
    titulo: "Aprobar solicitud de vacaciones",
    prioridad: "baja",
    vencimiento: "Esta semana",
    modulo: "rrhh",
    completada: true,
  },
  {
    id: 4,
    titulo: "Conciliar cuenta bancaria",
    prioridad: "alta",
    vencimiento: "Hoy",
    modulo: "contabilidad",
    completada: false,
  },
]

const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

export function AgendaModule() {
  const [vistaActual, setVistaActual] = useState<"dia" | "semana" | "mes">("semana")
  const [fechaActual, setFechaActual] = useState(new Date(2024, 0, 15))
  const [showNewEvent, setShowNewEvent] = useState(false)

  const getTipoIcon = (tipo: string) => {
    const icons: Record<string, any> = {
      reunion: Users,
      llamada: Phone,
      tarea: CheckCircle,
      recordatorio: Bell,
      video: Video,
    }
    return icons[tipo] || Calendar
  }

  const getPrioridadColor = (prioridad: string) => {
    const colors: Record<string, string> = {
      alta: "text-red-400",
      media: "text-yellow-400",
      baja: "text-green-400",
    }
    return colors[prioridad]
  }

  const generarDiasMes = () => {
    const primerDia = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1)
    const ultimoDia = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0)
    const dias = []

    // Días del mes anterior
    for (let i = 0; i < primerDia.getDay(); i++) {
      const dia = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), -i)
      dias.unshift({ fecha: dia, otroMes: true })
    }

    // Días del mes actual
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      dias.push({ fecha: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), i), otroMes: false })
    }

    return dias
  }

  const horasDelDia = Array.from({ length: 12 }, (_, i) => i + 7) // 7am a 6pm

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agenda</h1>
          <p className="text-muted-foreground">Gestiona tu calendario y tareas</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Sparkles className="h-4 w-4" />
            Programar con AI
          </Button>
          <Dialog open={showNewEvent} onOpenChange={setShowNewEvent}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary">
                <Plus className="h-4 w-4" />
                Nuevo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Nuevo Evento</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input placeholder="Nombre del evento" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reunion">Reunión</SelectItem>
                        <SelectItem value="llamada">Llamada</SelectItem>
                        <SelectItem value="tarea">Tarea</SelectItem>
                        <SelectItem value="recordatorio">Recordatorio</SelectItem>
                        <SelectItem value="video">Videollamada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Módulo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Relacionar con" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ventas">Ventas</SelectItem>
                        <SelectItem value="compras">Compras</SelectItem>
                        <SelectItem value="inventario">Inventario</SelectItem>
                        <SelectItem value="contabilidad">Contabilidad</SelectItem>
                        <SelectItem value="rrhh">RRHH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Hora Inicio</Label>
                    <Input type="time" />
                  </div>
                  <div className="space-y-2">
                    <Label>Hora Fin</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ubicación</Label>
                  <Input placeholder="Lugar o enlace de videoconferencia" />
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Textarea placeholder="Detalles del evento..." rows={3} />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewEvent(false)}>
                  Cancelar
                </Button>
                <Button className="bg-primary">Crear Evento</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Calendario y Eventos */}
        <div className="col-span-3 space-y-4">
          {/* Controles del calendario */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setFechaActual(new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-lg font-semibold min-w-[180px] text-center">
                    {meses[fechaActual.getMonth()]} {fechaActual.getFullYear()}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setFechaActual(new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setFechaActual(new Date())}>
                    Hoy
                  </Button>
                </div>
                <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                  {(["dia", "semana", "mes"] as const).map((vista) => (
                    <Button
                      key={vista}
                      variant={vistaActual === vista ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setVistaActual(vista)}
                      className="capitalize"
                    >
                      {vista}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vista del calendario */}
          {vistaActual === "mes" && (
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="grid grid-cols-7 gap-1">
                  {diasSemana.map((dia) => (
                    <div key={dia} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {dia}
                    </div>
                  ))}
                  {generarDiasMes().map((dia, i) => (
                    <div
                      key={i}
                      className={`min-h-[80px] p-1 border border-border rounded-lg ${
                        dia.otroMes ? "opacity-30" : ""
                      } ${dia.fecha.getDate() === 15 ? "bg-primary/10 border-primary/50" : ""}`}
                    >
                      <span className="text-sm">{dia.fecha.getDate()}</span>
                      {dia.fecha.getDate() === 15 && !dia.otroMes && (
                        <div className="space-y-1 mt-1">
                          {eventos.slice(0, 2).map((ev) => (
                            <div key={ev.id} className={`text-xs p-1 rounded ${ev.color} text-white truncate`}>
                              {ev.titulo}
                            </div>
                          ))}
                          {eventos.length > 2 && (
                            <div className="text-xs text-muted-foreground">+{eventos.length - 2} más</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {vistaActual === "semana" && (
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="grid grid-cols-8">
                  {/* Header de horas */}
                  <div className="border-r border-border"></div>
                  {["Lun 15", "Mar 16", "Mié 17", "Jue 18", "Vie 19", "Sáb 20", "Dom 21"].map((dia) => (
                    <div key={dia} className="text-center py-3 border-b border-border font-medium text-sm">
                      {dia}
                    </div>
                  ))}

                  {/* Grid de horas */}
                  {horasDelDia.map((hora) => (
                    <>
                      <div
                        key={`hora-${hora}`}
                        className="text-xs text-muted-foreground p-2 border-r border-border text-right"
                      >
                        {hora}:00
                      </div>
                      {Array.from({ length: 7 }).map((_, diaIdx) => (
                        <div key={`${hora}-${diaIdx}`} className="border-b border-r border-border h-12 relative">
                          {diaIdx === 0 && hora === 9 && (
                            <div className="absolute inset-1 bg-blue-500 rounded text-white text-xs p-1 overflow-hidden">
                              Reunión Cliente
                            </div>
                          )}
                          {diaIdx === 0 && hora === 11 && (
                            <div className="absolute inset-1 bg-yellow-500 rounded text-white text-xs p-1 overflow-hidden">
                              Rev. Inventario
                            </div>
                          )}
                          {diaIdx === 0 && hora === 14 && (
                            <div
                              className="absolute inset-1 bg-green-500 rounded text-white text-xs p-1 overflow-hidden"
                              style={{ height: "24px" }}
                            >
                              Llamada
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {vistaActual === "dia" && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Lunes, 15 de Enero 2024</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {eventos.map((evento) => {
                  const Icon = getTipoIcon(evento.tipo)
                  return (
                    <div
                      key={evento.id}
                      className="flex gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className={`w-1 rounded-full ${evento.color}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{evento.titulo}</h3>
                          <Badge variant="outline" className="text-xs">
                            {evento.modulo}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {evento.horaInicio} - {evento.horaFin}
                          </span>
                          {evento.ubicacion && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {evento.ubicacion}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Icon className="h-3 w-3" />
                            {evento.tipo}
                          </span>
                        </div>
                        {evento.participantes.length > 0 && (
                          <div className="flex items-center gap-2 mt-2">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <div className="flex -space-x-2">
                              {evento.participantes.map((p, i) => (
                                <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                  <AvatarFallback className="text-xs bg-primary/20">{p.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Panel lateral - Tareas */}
        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Tareas Pendientes</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {tareasPendientes.map((tarea) => (
                <div
                  key={tarea.id}
                  className={`flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
                    tarea.completada ? "opacity-50" : ""
                  }`}
                >
                  <button className="mt-0.5">
                    {tarea.completada ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${tarea.completada ? "line-through" : ""}`}>{tarea.titulo}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Flag className={`h-3 w-3 ${getPrioridadColor(tarea.prioridad)}`} />
                      <span className="text-xs text-muted-foreground">{tarea.vencimiento}</span>
                      <Badge variant="outline" className="text-xs">
                        {tarea.modulo}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {eventos.slice(0, 3).map((evento) => (
                <div key={evento.id} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${evento.color}`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{evento.titulo}</p>
                    <p className="text-xs text-muted-foreground">{evento.horaInicio}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/20 to-blue-500/20 border-primary/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-medium">Sugerencia AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Tienes 3 reuniones seguidas mañana. ¿Quieres que reagende una para tener tiempo de preparación?
              </p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline">
                  Ignorar
                </Button>
                <Button size="sm" className="bg-primary">
                  Optimizar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
