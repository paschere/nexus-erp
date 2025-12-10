"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Check,
  Star,
  Download,
  CreditCard,
  Package,
  Zap,
  Users,
  Calendar,
  Crown,
  Rocket,
  BarChart3,
  FileText,
  Wallet,
  Factory,
  ShoppingCart,
  Truck,
  Settings,
  HelpCircle,
  MessageSquare,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const modulosDisponibles = [
  {
    id: "ecommerce-b2b",
    nombre: "E-Commerce B2B",
    descripcion: "Portal de ventas B2B con catálogos, precios personalizados y pedidos en línea",
    precio: 299000,
    precioAnual: 2990000,
    categoria: "ventas",
    instalado: true,
    rating: 4.8,
    usuarios: 1250,
    icon: ShoppingCart,
    color: "text-blue-400",
    features: ["Catálogos personalizados", "Precios por cliente", "Pedidos en línea", "Integración con inventario"],
  },
  {
    id: "manufactura-mrp",
    nombre: "Manufactura MRP",
    descripcion: "Planificación de recursos de manufactura, BOM, órdenes de producción",
    precio: 499000,
    precioAnual: 4990000,
    categoria: "produccion",
    instalado: true,
    rating: 4.9,
    usuarios: 890,
    icon: Factory,
    color: "text-orange-400",
    features: ["Bill of Materials", "Órdenes de producción", "Planificación capacidad", "Control de piso"],
  },
  {
    id: "field-service",
    nombre: "Field Service",
    descripcion: "Gestión de servicios en campo, técnicos, rutas y órdenes de trabajo",
    precio: 349000,
    precioAnual: 3490000,
    categoria: "operaciones",
    instalado: false,
    rating: 4.7,
    usuarios: 560,
    icon: Truck,
    color: "text-green-400",
    features: ["Gestión de técnicos", "Rutas optimizadas", "Órdenes de trabajo", "App móvil"],
  },
  {
    id: "business-intelligence",
    nombre: "Business Intelligence",
    descripcion: "Dashboards avanzados, reportes personalizados y análisis predictivo con AI",
    precio: 599000,
    precioAnual: 5990000,
    categoria: "analytics",
    instalado: false,
    rating: 4.9,
    usuarios: 2100,
    icon: BarChart3,
    color: "text-purple-400",
    popular: true,
    features: ["Dashboards personalizados", "Reportes automáticos", "Análisis predictivo", "Exportación avanzada"],
  },
  {
    id: "gestion-documental",
    nombre: "Gestión Documental Pro",
    descripcion: "Almacenamiento ilimitado, OCR, workflows de aprobación y firma digital",
    precio: 249000,
    precioAnual: 2490000,
    categoria: "productividad",
    instalado: true,
    rating: 4.6,
    usuarios: 1800,
    icon: FileText,
    color: "text-cyan-400",
    features: ["OCR automático", "Firma digital", "Workflows aprobación", "Almacenamiento ilimitado"],
  },
  {
    id: "tesoreria-avanzada",
    nombre: "Tesorería Avanzada",
    descripcion: "Conciliación bancaria automática, proyecciones de flujo y alertas inteligentes",
    precio: 399000,
    precioAnual: 3990000,
    categoria: "finanzas",
    instalado: false,
    rating: 4.8,
    usuarios: 720,
    icon: Wallet,
    color: "text-emerald-400",
    features: ["Conciliación automática", "Proyecciones flujo", "Multi-banco", "Alertas inteligentes"],
  },
]

const planActual = {
  nombre: "Professional",
  precio: 1499000,
  usuarios: 25,
  usuariosUsados: 18,
  almacenamiento: 100,
  almacenamientoUsado: 67,
  proximaFactura: "2024-02-15",
  modulosIncluidos: 8,
}

const facturasNexus = [
  {
    id: "INV-2024-001",
    fecha: "2024-01-15",
    concepto: "Plan Professional - Enero 2024",
    valor: 1499000,
    estado: "pagada",
  },
  { id: "INV-2024-002", fecha: "2024-01-15", concepto: "Módulo E-Commerce B2B", valor: 299000, estado: "pagada" },
  {
    id: "INV-2023-012",
    fecha: "2023-12-15",
    concepto: "Plan Professional - Diciembre 2023",
    valor: 1499000,
    estado: "pagada",
  },
  {
    id: "INV-2023-011",
    fecha: "2023-11-15",
    concepto: "Plan Professional - Noviembre 2023",
    valor: 1499000,
    estado: "pagada",
  },
]

const planes = [
  {
    id: "starter",
    nombre: "Starter",
    precio: 599000,
    descripcion: "Para pequeñas empresas que inician",
    usuarios: 5,
    almacenamiento: 20,
    modulos: 3,
    features: ["Contabilidad básica", "Inventario", "Facturación electrónica", "Soporte por email"],
  },
  {
    id: "professional",
    nombre: "Professional",
    precio: 1499000,
    descripcion: "Para empresas en crecimiento",
    usuarios: 25,
    almacenamiento: 100,
    modulos: 8,
    popular: true,
    features: [
      "Todo de Starter",
      "Manufactura MRP",
      "CRM avanzado",
      "Reportes personalizados",
      "API access",
      "Soporte prioritario",
    ],
  },
  {
    id: "enterprise",
    nombre: "Enterprise",
    precio: null,
    descripcion: "Para grandes corporaciones",
    usuarios: "Ilimitados",
    almacenamiento: "Ilimitado",
    modulos: "Todos",
    features: [
      "Todo de Professional",
      "Multi-tenant",
      "SSO/SAML",
      "SLA garantizado",
      "Gerente de cuenta dedicado",
      "Personalización avanzada",
    ],
  },
]

export function MarketplaceModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategoria, setFilterCategoria] = useState("todos")
  const [showUpgrade, setShowUpgrade] = useState(false)

  const filteredModulos = modulosDisponibles.filter((m) => {
    const matchSearch =
      m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategoria = filterCategoria === "todos" || m.categoria === filterCategoria
    return matchSearch && matchCategoria
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">NEXUS Marketplace</h1>
          <p className="text-muted-foreground">Expande las capacidades de tu ERP con módulos adicionales</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <HelpCircle className="h-4 w-4" />
            Centro de Ayuda
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <MessageSquare className="h-4 w-4" />
            Contactar Ventas
          </Button>
        </div>
      </div>

      {/* Plan Actual */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-blue-500/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <Crown className="h-7 w-7 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-foreground">Plan {planActual.nombre}</h2>
                  <Badge className="bg-primary/20 text-primary border-primary/30">Activo</Badge>
                </div>
                <p className="text-muted-foreground mt-1">
                  ${planActual.precio.toLocaleString()} COP/mes • Próxima factura: {planActual.proximaFactura}
                </p>
                <div className="grid grid-cols-3 gap-6 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Usuarios</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress
                        value={(planActual.usuariosUsados / planActual.usuarios) * 100}
                        className="h-2 flex-1"
                      />
                      <span className="text-sm font-medium">
                        {planActual.usuariosUsados}/{planActual.usuarios}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Almacenamiento</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress
                        value={(planActual.almacenamientoUsado / planActual.almacenamiento) * 100}
                        className="h-2 flex-1"
                      />
                      <span className="text-sm font-medium">
                        {planActual.almacenamientoUsado}/{planActual.almacenamiento} GB
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Módulos</p>
                    <p className="text-sm font-medium mt-1">{planActual.modulosIncluidos} activos</p>
                  </div>
                </div>
              </div>
            </div>
            <Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Rocket className="h-4 w-4" />
                  Mejorar Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Elige tu Plan</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4 py-4">
                  {planes.map((plan) => (
                    <Card key={plan.id} className={`relative ${plan.popular ? "border-primary" : "border-border"}`}>
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge className="bg-primary text-primary-foreground">Más Popular</Badge>
                        </div>
                      )}
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold">{plan.nombre}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{plan.descripcion}</p>
                        <div className="mt-4">
                          {plan.precio ? (
                            <>
                              <span className="text-3xl font-bold">${(plan.precio / 1000).toFixed(0)}K</span>
                              <span className="text-muted-foreground">/mes</span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold">Contactar</span>
                          )}
                        </div>
                        <div className="space-y-2 mt-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{plan.usuarios} usuarios</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span>{plan.almacenamiento} GB almacenamiento</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-muted-foreground" />
                            <span>{plan.modulos} módulos</span>
                          </div>
                        </div>
                        <div className="border-t border-border mt-4 pt-4 space-y-2">
                          {plan.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-primary" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className={`w-full mt-4 ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.id === "professional" ? "Plan Actual" : plan.precio ? "Seleccionar" : "Contactar"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="modulos" className="w-full">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="modulos">Módulos Adicionales</TabsTrigger>
          <TabsTrigger value="instalados">Mis Módulos</TabsTrigger>
          <TabsTrigger value="facturacion">Facturación</TabsTrigger>
          <TabsTrigger value="configuracion">Configuración Cuenta</TabsTrigger>
        </TabsList>

        <TabsContent value="modulos" className="mt-6">
          {/* Search and Filter */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar módulos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-muted/50"
              />
            </div>
            <div className="flex gap-2">
              {["todos", "ventas", "produccion", "finanzas", "analytics", "productividad"].map((cat) => (
                <Button
                  key={cat}
                  variant={filterCategoria === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategoria(cat)}
                  className={filterCategoria === cat ? "bg-primary" : ""}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModulos.map((modulo) => (
              <Card key={modulo.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${modulo.color}`}>
                        <modulo.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{modulo.nombre}</h3>
                          {modulo.popular && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{modulo.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{modulo.usuarios} empresas</span>
                        </div>
                      </div>
                    </div>
                    {modulo.instalado && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Check className="h-3 w-3 mr-1" />
                        Instalado
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{modulo.descripcion}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {modulo.features.slice(0, 3).map((feature, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <div>
                      <span className="text-lg font-bold text-foreground">${(modulo.precio / 1000).toFixed(0)}K</span>
                      <span className="text-sm text-muted-foreground">/mes</span>
                    </div>
                    <Button
                      variant={modulo.instalado ? "outline" : "default"}
                      size="sm"
                      className={!modulo.instalado ? "bg-primary hover:bg-primary/90" : ""}
                    >
                      {modulo.instalado ? (
                        <>
                          <Settings className="h-4 w-4 mr-1" />
                          Configurar
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-1" />
                          Instalar
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="instalados" className="mt-6">
          <div className="space-y-4">
            {modulosDisponibles
              .filter((m) => m.instalado)
              .map((modulo) => (
                <Card key={modulo.id} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${modulo.color}`}
                        >
                          <modulo.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{modulo.nombre}</h3>
                          <p className="text-sm text-muted-foreground">{modulo.descripcion}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">${(modulo.precio / 1000).toFixed(0)}K/mes</p>
                          <p className="text-xs text-muted-foreground">Renovación automática</p>
                        </div>
                        <Switch defaultChecked />
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="facturacion" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Método de pago */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Método de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 rounded bg-blue-500/20 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Visa •••• 4532</p>
                    <p className="text-xs text-muted-foreground">Vence 12/26</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Cambiar
                  </Button>
                </div>
                <Button variant="outline" className="w-full mt-3 gap-2 bg-transparent">
                  <Plus className="h-4 w-4" />
                  Agregar método de pago
                </Button>
              </CardContent>
            </Card>

            {/* Datos de facturación */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Datos de Facturación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Razón Social</p>
                  <p className="font-medium">Mi Empresa S.A.S</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">NIT</p>
                  <p className="font-medium">900.123.456-7</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dirección</p>
                  <p className="font-medium">Cra 7 #123-45, Bogotá</p>
                </div>
                <Button variant="outline" className="w-full mt-2 bg-transparent">
                  Editar datos
                </Button>
              </CardContent>
            </Card>

            {/* Próxima factura */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Próxima Factura</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-3xl font-bold text-foreground">$2.097K</p>
                  <p className="text-sm text-muted-foreground mt-1">COP</p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">15 de Febrero, 2024</span>
                  </div>
                </div>
                <div className="space-y-2 mt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan Professional</span>
                    <span>$1.499K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">E-Commerce B2B</span>
                    <span>$299K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manufactura MRP</span>
                    <span>$299K</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historial de facturas */}
          <Card className="bg-card border-border mt-6">
            <CardHeader>
              <CardTitle className="text-base">Historial de Facturas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead>Factura</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Concepto</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facturasNexus.map((factura) => (
                      <TableRow key={factura.id} className="border-border">
                        <TableCell className="font-medium text-primary">{factura.id}</TableCell>
                        <TableCell className="text-muted-foreground">{factura.fecha}</TableCell>
                        <TableCell>{factura.concepto}</TableCell>
                        <TableCell className="text-right font-medium">${(factura.valor / 1000).toFixed(0)}K</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <Check className="h-3 w-3 mr-1" />
                            Pagada
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Download className="h-4 w-4" />
                            PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracion" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Datos de la Cuenta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Nombre de la Empresa</label>
                    <Input defaultValue="Mi Empresa S.A.S" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">NIT</label>
                    <Input defaultValue="900.123.456-7" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Email Principal</label>
                    <Input defaultValue="admin@miempresa.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Teléfono</label>
                    <Input defaultValue="+57 601 234 5678" />
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90">Guardar Cambios</Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Notificaciones de Facturación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Recordatorio de pago", desc: "3 días antes del vencimiento" },
                  { label: "Confirmación de pago", desc: "Al procesar el pago" },
                  { label: "Nuevos módulos disponibles", desc: "Cuando hay actualizaciones" },
                  { label: "Resumen mensual", desc: "Primer día del mes" },
                ].map((notif, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{notif.label}</p>
                      <p className="text-xs text-muted-foreground">{notif.desc}</p>
                    </div>
                    <Switch defaultChecked={i < 2} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Add Table import
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
