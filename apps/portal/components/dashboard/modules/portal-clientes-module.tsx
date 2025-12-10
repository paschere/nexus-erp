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
  Globe,
  Users,
  FileText,
  ShoppingCart,
  MessageSquare,
  Settings,
  Eye,
  ExternalLink,
  CreditCard,
  Package,
  Truck,
  HelpCircle,
  BarChart3,
  Plus,
  Copy,
  RefreshCw,
  QrCode,
} from "lucide-react"

export default function PortalClientesModule() {
  const [portalEnabled, setPortalEnabled] = useState(true)

  const stats = [
    { label: "Clientes Registrados", value: "2,847", change: 12, icon: Users },
    { label: "Sesiones Hoy", value: "456", change: 8, icon: Eye },
    { label: "Pedidos Online", value: "89", change: 23, icon: ShoppingCart },
    { label: "Tickets Abiertos", value: "12", change: -15, icon: MessageSquare },
  ]

  const recentActivity = [
    { client: "TechCorp S.A.S", action: "Descargó factura FV-2024-1547", time: "Hace 5 min", type: "document" },
    { client: "Industrias ABC", action: "Creó nuevo pedido #PED-892", time: "Hace 12 min", type: "order" },
    { client: "Comercial XYZ", action: "Actualizó datos de contacto", time: "Hace 25 min", type: "profile" },
    { client: "Grupo Delta", action: "Abrió ticket de soporte #TK-456", time: "Hace 1 hora", type: "ticket" },
    { client: "MegaTech", action: "Realizó pago de $5,200,000", time: "Hace 2 horas", type: "payment" },
  ]

  const portalModules = [
    { id: "invoices", name: "Facturas", description: "Ver y descargar facturas", enabled: true, icon: FileText },
    { id: "orders", name: "Pedidos", description: "Crear y seguir pedidos", enabled: true, icon: ShoppingCart },
    { id: "products", name: "Catálogo", description: "Ver productos y precios", enabled: true, icon: Package },
    { id: "shipping", name: "Envíos", description: "Rastrear entregas", enabled: true, icon: Truck },
    { id: "payments", name: "Pagos", description: "Historial y métodos de pago", enabled: true, icon: CreditCard },
    { id: "support", name: "Soporte", description: "Tickets y FAQ", enabled: true, icon: HelpCircle },
    { id: "reports", name: "Reportes", description: "Estadísticas de compras", enabled: false, icon: BarChart3 },
    { id: "quotes", name: "Cotizaciones", description: "Solicitar cotizaciones", enabled: false, icon: FileText },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "order":
        return <ShoppingCart className="h-4 w-4 text-emerald-500" />
      case "profile":
        return <Users className="h-4 w-4 text-purple-500" />
      case "ticket":
        return <MessageSquare className="h-4 w-4 text-amber-500" />
      case "payment":
        return <CreditCard className="h-4 w-4 text-teal-500" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portal de Clientes</h1>
          <p className="text-muted-foreground">Configura el autoservicio para tus clientes</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 border border-border/50">
            <div className={`w-2 h-2 rounded-full ${portalEnabled ? "bg-emerald-500" : "bg-red-500"}`} />
            <span className="text-sm">{portalEnabled ? "Portal Activo" : "Portal Inactivo"}</span>
            <Switch checked={portalEnabled} onCheckedChange={setPortalEnabled} />
          </div>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Vista Previa
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <ExternalLink className="h-4 w-4 mr-2" />
            Ir al Portal
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-teal-500/20 text-teal-500">
                  <stat.icon className="h-5 w-5" />
                </div>
                <Badge
                  className={stat.change >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}
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

      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList className="bg-background/50">
          <TabsTrigger value="modules">Módulos</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="access">Acceso</TabsTrigger>
          <TabsTrigger value="activity">Actividad</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          <div className="grid grid-cols-3 gap-6">
            {/* Módulos Disponibles */}
            <Card className="col-span-2 bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Módulos del Portal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {portalModules.map((module) => (
                    <div
                      key={module.id}
                      className={`p-4 rounded-lg border transition-colors ${
                        module.enabled ? "bg-teal-500/10 border-teal-500/30" : "bg-background/50 border-border/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${module.enabled ? "bg-teal-500/20 text-teal-500" : "bg-muted text-muted-foreground"}`}
                          >
                            <module.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">{module.name}</div>
                            <div className="text-xs text-muted-foreground">{module.description}</div>
                          </div>
                        </div>
                        <Switch checked={module.enabled} />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Settings className="h-3 w-3 mr-1" />
                          Configurar
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* URL del Portal */}
            <div className="space-y-4">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">URL del Portal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-background/80 border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">URL Pública</div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-teal-400 flex-1 truncate">
                        https://portal.nexus-erp.co/empresa123
                      </code>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <QrCode className="h-4 w-4 mr-1" />
                      QR Code
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Regenerar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Actividad Reciente */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {recentActivity.map((activity, i) => (
                        <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-background/50">
                          <div className="p-2 rounded-lg bg-background/80">{getActivityIcon(activity.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{activity.client}</div>
                            <div className="text-xs text-muted-foreground truncate">{activity.action}</div>
                            <div className="text-xs text-muted-foreground">{activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Personalización Visual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Logo de la Empresa</Label>
                    <div className="mt-2 p-8 border-2 border-dashed border-border/50 rounded-lg text-center">
                      <Plus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Arrastra o haz clic para subir</p>
                    </div>
                  </div>
                  <div>
                    <Label>Color Primario</Label>
                    <div className="flex gap-2 mt-2">
                      {["#2dd4bf", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"].map((color) => (
                        <button
                          key={color}
                          className="w-10 h-10 rounded-lg border-2 border-transparent hover:border-white transition-colors"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <div className="text-sm text-muted-foreground mb-2">Vista Previa</div>
                  <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                    <Globe className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-12">Configuración de Acceso - En desarrollo</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-12">
                Registro de Actividad Completo - En desarrollo
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-12">
                Configuración de Notificaciones - En desarrollo
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
