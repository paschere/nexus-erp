"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Activity,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  LogIn,
  LogOut,
  Settings,
  Users,
  Clock,
  MapPin,
  Monitor,
  Smartphone,
  Globe,
  Shield,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  ChevronRight,
} from "lucide-react"

const logs = [
  {
    id: 1,
    usuario: "María García",
    accion: "crear",
    modulo: "Ventas",
    recurso: "Factura FE-2024-00456",
    ip: "192.168.1.100",
    dispositivo: "desktop",
    navegador: "Chrome 120",
    fecha: "2024-01-15 09:45:23",
    detalles: { cliente: "Industrias ABC", total: 15680000 },
  },
  {
    id: 2,
    usuario: "Carlos López",
    accion: "editar",
    modulo: "Inventario",
    recurso: "Producto SKU-001",
    ip: "192.168.1.105",
    dispositivo: "desktop",
    navegador: "Firefox 121",
    fecha: "2024-01-15 09:30:15",
    detalles: { campo: "stock", anterior: 100, nuevo: 85 },
  },
  {
    id: 3,
    usuario: "Ana Martínez",
    accion: "eliminar",
    modulo: "Compras",
    recurso: "Orden OC-2024-087",
    ip: "192.168.1.110",
    dispositivo: "mobile",
    navegador: "Safari iOS",
    fecha: "2024-01-15 09:15:08",
    detalles: { motivo: "Duplicada" },
  },
  {
    id: 4,
    usuario: "Pedro Rodríguez",
    accion: "login",
    modulo: "Sistema",
    recurso: "Sesión",
    ip: "201.234.56.78",
    dispositivo: "desktop",
    navegador: "Edge 120",
    fecha: "2024-01-15 09:00:00",
    detalles: { ubicacion: "Medellín, Colombia" },
  },
  {
    id: 5,
    usuario: "Laura Sánchez",
    accion: "exportar",
    modulo: "Reportes",
    recurso: "Reporte Ventas Enero",
    ip: "192.168.1.115",
    dispositivo: "desktop",
    navegador: "Chrome 120",
    fecha: "2024-01-15 08:45:30",
    detalles: { formato: "PDF", registros: 1250 },
  },
  {
    id: 6,
    usuario: "Sistema",
    accion: "automatico",
    modulo: "Facturación",
    recurso: "Transmisión DIAN",
    ip: "localhost",
    dispositivo: "server",
    navegador: "N/A",
    fecha: "2024-01-15 08:30:00",
    detalles: { facturas: 12, estado: "exitoso" },
  },
]

const sesionesActivas = [
  {
    id: 1,
    usuario: "María García",
    rol: "Gerente",
    ip: "192.168.1.100",
    inicio: "09:00",
    dispositivo: "desktop",
    ubicacion: "Bogotá",
  },
  {
    id: 2,
    usuario: "Carlos López",
    rol: "Analista",
    ip: "192.168.1.105",
    inicio: "08:30",
    dispositivo: "desktop",
    ubicacion: "Bogotá",
  },
  {
    id: 3,
    usuario: "Ana Martínez",
    rol: "Contador",
    ip: "192.168.1.110",
    inicio: "08:45",
    dispositivo: "mobile",
    ubicacion: "Medellín",
  },
]

export function AuditoriaModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [moduloFilter, setModuloFilter] = useState("todos")
  const [accionFilter, setAccionFilter] = useState("todas")

  const getAccionIcon = (accion: string) => {
    const icons: Record<string, { icon: any; color: string; bg: string }> = {
      crear: { icon: Plus, color: "text-green-400", bg: "bg-green-500/20" },
      editar: { icon: Edit, color: "text-blue-400", bg: "bg-blue-500/20" },
      eliminar: { icon: Trash2, color: "text-red-400", bg: "bg-red-500/20" },
      ver: { icon: Eye, color: "text-gray-400", bg: "bg-gray-500/20" },
      login: { icon: LogIn, color: "text-primary", bg: "bg-primary/20" },
      logout: { icon: LogOut, color: "text-yellow-400", bg: "bg-yellow-500/20" },
      exportar: { icon: Download, color: "text-purple-400", bg: "bg-purple-500/20" },
      automatico: { icon: RefreshCw, color: "text-cyan-400", bg: "bg-cyan-500/20" },
      config: { icon: Settings, color: "text-orange-400", bg: "bg-orange-500/20" },
    }
    return icons[accion] || icons.ver
  }

  const getDispositivoIcon = (dispositivo: string) => {
    if (dispositivo === "mobile") return Smartphone
    if (dispositivo === "server") return Globe
    return Monitor
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Auditoría y Logs</h1>
          <p className="text-muted-foreground">Registro de actividades y trazabilidad del sistema</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar Logs
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Eventos Hoy</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <Activity className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Usuarios Activos</p>
                <p className="text-2xl font-bold">{sesionesActivas.length}</p>
              </div>
              <Users className="h-8 w-8 text-green-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alertas de Seguridad</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Shield className="h-8 w-8 text-yellow-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Errores Sistema</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="logs">Registro de Actividad</TabsTrigger>
          <TabsTrigger value="sesiones">Sesiones Activas</TabsTrigger>
          <TabsTrigger value="seguridad">Eventos de Seguridad</TabsTrigger>
          <TabsTrigger value="cambios">Historial de Cambios</TabsTrigger>
        </TabsList>

        <TabsContent value="logs">
          <Card className="bg-card border-border">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Registro de Actividad</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar en logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64 bg-muted/50"
                    />
                  </div>
                  <Select value={moduloFilter} onValueChange={setModuloFilter}>
                    <SelectTrigger className="w-36 bg-muted/50">
                      <SelectValue placeholder="Módulo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="ventas">Ventas</SelectItem>
                      <SelectItem value="inventario">Inventario</SelectItem>
                      <SelectItem value="compras">Compras</SelectItem>
                      <SelectItem value="sistema">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={accionFilter} onValueChange={setAccionFilter}>
                    <SelectTrigger className="w-36 bg-muted/50">
                      <SelectValue placeholder="Acción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="crear">Crear</SelectItem>
                      <SelectItem value="editar">Editar</SelectItem>
                      <SelectItem value="eliminar">Eliminar</SelectItem>
                      <SelectItem value="login">Login</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="divide-y divide-border">
                  {logs.map((log) => {
                    const accionStyle = getAccionIcon(log.accion)
                    const AccionIcon = accionStyle.icon
                    const DispositivoIcon = getDispositivoIcon(log.dispositivo)

                    return (
                      <div key={log.id} className="p-4 hover:bg-muted/20 cursor-pointer transition-colors">
                        <div className="flex items-start gap-4">
                          <div
                            className={`h-10 w-10 rounded-lg ${accionStyle.bg} flex items-center justify-center shrink-0`}
                          >
                            <AccionIcon className={`h-5 w-5 ${accionStyle.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{log.usuario}</span>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                <Badge variant="outline" className="capitalize">
                                  {log.accion}
                                </Badge>
                                <span className="text-muted-foreground">{log.recurso}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">{log.fecha}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Badge variant="secondary" className="text-xs">
                                  {log.modulo}
                                </Badge>
                              </span>
                              <span className="flex items-center gap-1">
                                <Globe className="h-3 w-3" /> {log.ip}
                              </span>
                              <span className="flex items-center gap-1">
                                <DispositivoIcon className="h-3 w-3" /> {log.navegador}
                              </span>
                            </div>
                            {log.detalles && (
                              <div className="mt-2 p-2 bg-muted/30 rounded text-xs font-mono">
                                {JSON.stringify(log.detalles)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sesiones">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Sesiones Activas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sesionesActivas.map((sesion) => {
                  const DispositivoIcon = getDispositivoIcon(sesion.dispositivo)
                  return (
                    <div key={sesion.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/20 text-primary">
                            {sesion.usuario.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{sesion.usuario}</p>
                          <p className="text-sm text-muted-foreground">{sesion.rol}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> Desde {sesion.inicio}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="h-4 w-4" /> {sesion.ip}
                        </span>
                        <span className="flex items-center gap-1">
                          <DispositivoIcon className="h-4 w-4" /> {sesion.dispositivo}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {sesion.ubicacion}
                        </span>
                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                          Cerrar Sesión
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad">
          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-400" />
              <h3 className="text-lg font-medium mb-2">Sin Eventos de Seguridad</h3>
              <p className="text-muted-foreground">No se han detectado eventos de seguridad en las últimas 24 horas</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cambios">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Historial de Cambios en Registros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {logs
                  .filter((l) => l.accion === "editar")
                  .map((log) => (
                    <div key={log.id} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-primary/20">{log.usuario.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{log.usuario}</span>
                          <span className="text-muted-foreground text-sm">modificó</span>
                          <Badge variant="outline">{log.recurso}</Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{log.fecha}</span>
                      </div>
                      {log.detalles && "campo" in log.detalles && (
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            Campo: <strong>{(log.detalles as any).campo}</strong>
                          </span>
                          <span className="text-red-400 line-through">{(log.detalles as any).anterior}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          <span className="text-green-400">{(log.detalles as any).nuevo}</span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
