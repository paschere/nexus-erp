"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  Settings,
  CheckCheck,
  Clock,
  Package,
  DollarSign,
  Users,
  FileText,
  ShoppingCart,
  Factory,
  Calculator,
  Shield,
  Sparkles,
} from "lucide-react"

const notificaciones = [
  {
    id: 1,
    tipo: "alerta",
    titulo: "Stock Crítico - Producto A1",
    mensaje: "El producto 'Motor Eléctrico 5HP' ha llegado al nivel mínimo de stock (5 unidades)",
    modulo: "inventario",
    fecha: "Hace 5 min",
    leida: false,
    accion: "Ver Inventario",
  },
  {
    id: 2,
    tipo: "exito",
    titulo: "Factura Aceptada por DIAN",
    mensaje: "La factura FE-2024-00456 fue aceptada exitosamente. CUDE: abc123...",
    modulo: "facturacion",
    fecha: "Hace 15 min",
    leida: false,
    accion: "Ver Factura",
  },
  {
    id: 3,
    tipo: "info",
    titulo: "Nueva Orden de Compra",
    mensaje: "Se ha generado automáticamente la OC-2024-089 para reabastecer inventario",
    modulo: "compras",
    fecha: "Hace 1 hora",
    leida: false,
    accion: "Ver Orden",
  },
  {
    id: 4,
    tipo: "advertencia",
    titulo: "Cotización por Vencer",
    mensaje: "La cotización COT-2024-001 vence mañana. Cliente: Industrias ABC",
    modulo: "ventas",
    fecha: "Hace 2 horas",
    leida: true,
    accion: "Ver Cotización",
  },
  {
    id: 5,
    tipo: "error",
    titulo: "Error en Sincronización Bancaria",
    mensaje: "No se pudo conectar con Bancolombia. Reintentando en 5 minutos...",
    modulo: "tesoreria",
    fecha: "Hace 3 horas",
    leida: true,
    accion: "Reintentar",
  },
  {
    id: 6,
    tipo: "info",
    titulo: "Nuevo Empleado Registrado",
    mensaje: "Juan Pérez ha sido agregado al sistema. Pendiente configuración de accesos.",
    modulo: "rrhh",
    fecha: "Hace 5 horas",
    leida: true,
    accion: "Configurar",
  },
  {
    id: 7,
    tipo: "exito",
    titulo: "Backup Completado",
    mensaje: "El respaldo automático de la base de datos se completó exitosamente",
    modulo: "sistema",
    fecha: "Ayer",
    leida: true,
    accion: null,
  },
]

const configuracionNotificaciones = [
  {
    categoria: "Inventario",
    items: [
      { id: "stock_bajo", label: "Stock bajo", email: true, push: true, app: true },
      { id: "stock_critico", label: "Stock crítico", email: true, push: true, app: true },
      { id: "nueva_entrada", label: "Nueva entrada", email: false, push: false, app: true },
    ],
  },
  {
    categoria: "Ventas",
    items: [
      { id: "nueva_venta", label: "Nueva venta", email: true, push: true, app: true },
      { id: "cotizacion_vence", label: "Cotización por vencer", email: true, push: true, app: true },
      { id: "meta_alcanzada", label: "Meta alcanzada", email: true, push: true, app: true },
    ],
  },
  {
    categoria: "Facturación",
    items: [
      { id: "factura_aceptada", label: "Factura aceptada DIAN", email: true, push: false, app: true },
      { id: "factura_rechazada", label: "Factura rechazada DIAN", email: true, push: true, app: true },
      { id: "resolucion_vence", label: "Resolución por vencer", email: true, push: true, app: true },
    ],
  },
  {
    categoria: "Sistema",
    items: [
      { id: "backup", label: "Backup completado", email: false, push: false, app: true },
      { id: "error_sistema", label: "Errores del sistema", email: true, push: true, app: true },
      { id: "actualizacion", label: "Actualizaciones disponibles", email: true, push: false, app: true },
    ],
  },
]

export function NotificacionesModule() {
  const [filtroTipo, setFiltroTipo] = useState("todas")
  const [notifs, setNotifs] = useState(notificaciones)

  const getTipoIcon = (tipo: string) => {
    const icons: Record<string, { icon: any; color: string; bg: string }> = {
      alerta: { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-500/20" },
      exito: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/20" },
      info: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/20" },
      advertencia: { icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-500/20" },
      error: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/20" },
    }
    return icons[tipo] || icons.info
  }

  const getModuloIcon = (modulo: string) => {
    const icons: Record<string, any> = {
      inventario: Package,
      facturacion: FileText,
      compras: ShoppingCart,
      ventas: DollarSign,
      tesoreria: Calculator,
      rrhh: Users,
      sistema: Settings,
      produccion: Factory,
      grc: Shield,
    }
    return icons[modulo] || Bell
  }

  const marcarComoLeida = (id: number) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, leida: true } : n)))
  }

  const marcarTodasLeidas = () => {
    setNotifs(notifs.map((n) => ({ ...n, leida: true })))
  }

  const noLeidas = notifs.filter((n) => !n.leida).length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Centro de Notificaciones</h1>
          <p className="text-muted-foreground">
            {noLeidas > 0 ? `Tienes ${noLeidas} notificaciones sin leer` : "Todas las notificaciones leídas"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent" onClick={marcarTodasLeidas}>
            <CheckCheck className="h-4 w-4" />
            Marcar todas como leídas
          </Button>
        </div>
      </div>

      <Tabs defaultValue="todas" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="todas" className="gap-2">
              Todas
              {noLeidas > 0 && (
                <Badge className="bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {noLeidas}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="alertas">Alertas</TabsTrigger>
            <TabsTrigger value="sistema">Sistema</TabsTrigger>
            <TabsTrigger value="configuracion">Configuración</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="todas">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="divide-y divide-border">
                  {notifs.map((notif) => {
                    const tipoStyle = getTipoIcon(notif.tipo)
                    const ModuloIcon = getModuloIcon(notif.modulo)
                    const TipoIcon = tipoStyle.icon

                    return (
                      <div
                        key={notif.id}
                        className={`p-4 hover:bg-muted/30 cursor-pointer transition-colors ${
                          !notif.leida ? "bg-primary/5" : ""
                        }`}
                        onClick={() => marcarComoLeida(notif.id)}
                      >
                        <div className="flex gap-4">
                          <div
                            className={`h-10 w-10 rounded-lg ${tipoStyle.bg} flex items-center justify-center shrink-0`}
                          >
                            <TipoIcon className={`h-5 w-5 ${tipoStyle.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <h3
                                  className={`font-medium ${!notif.leida ? "text-foreground" : "text-muted-foreground"}`}
                                >
                                  {notif.titulo}
                                </h3>
                                {!notif.leida && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                              </div>
                              <span className="text-xs text-muted-foreground shrink-0">{notif.fecha}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{notif.mensaje}</p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="outline" className="text-xs gap-1">
                                <ModuloIcon className="h-3 w-3" />
                                {notif.modulo}
                              </Badge>
                              {notif.accion && (
                                <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                                  {notif.accion}
                                </Button>
                              )}
                            </div>
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

        <TabsContent value="alertas">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="space-y-4">
                {notifs
                  .filter((n) => n.tipo === "alerta" || n.tipo === "error" || n.tipo === "advertencia")
                  .map((notif) => {
                    const tipoStyle = getTipoIcon(notif.tipo)
                    const TipoIcon = tipoStyle.icon
                    return (
                      <div key={notif.id} className={`p-4 rounded-lg ${tipoStyle.bg}`}>
                        <div className="flex items-start gap-3">
                          <TipoIcon className={`h-5 w-5 ${tipoStyle.color} shrink-0 mt-0.5`} />
                          <div>
                            <h3 className="font-medium">{notif.titulo}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{notif.mensaje}</p>
                            {notif.accion && (
                              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                                {notif.accion}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sistema">
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Sistema Operativo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Todos los servicios funcionando correctamente</p>
                <p className="text-xs text-muted-foreground mt-2">Última verificación: hace 2 min</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Próximo Backup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Programado para las 02:00 AM</p>
                <p className="text-xs text-muted-foreground mt-2">Último backup: Ayer 02:00 AM</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Actualización Disponible
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">NEXUS ERP v3.2.1 disponible</p>
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  Ver Novedades
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="configuracion">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Preferencias de Notificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {configuracionNotificaciones.map((cat) => (
                  <div key={cat.categoria}>
                    <h3 className="font-medium mb-3">{cat.categoria}</h3>
                    <div className="space-y-3">
                      {cat.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-lg"
                        >
                          <span className="text-sm">{item.label}</span>
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <Label className="text-xs text-muted-foreground">Email</Label>
                              <Switch defaultChecked={item.email} />
                            </div>
                            <div className="flex items-center gap-2">
                              <Label className="text-xs text-muted-foreground">Push</Label>
                              <Switch defaultChecked={item.push} />
                            </div>
                            <div className="flex items-center gap-2">
                              <Label className="text-xs text-muted-foreground">App</Label>
                              <Switch defaultChecked={item.app} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
