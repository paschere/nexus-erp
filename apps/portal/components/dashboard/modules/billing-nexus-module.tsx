"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  CreditCard,
  Check,
  Zap,
  Building2,
  Users,
  HardDrive,
  Download,
  ChevronRight,
  Sparkles,
  Package,
  Plus,
  ExternalLink,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const planes = [
  {
    id: "starter",
    nombre: "Starter",
    precio: 299000,
    periodo: "mes",
    descripcion: "Ideal para pequeños negocios",
    popular: false,
    features: [
      "5 usuarios",
      "2 módulos incluidos",
      "1 punto de venta",
      "5GB almacenamiento",
      "Soporte email",
      "Actualizaciones mensuales",
    ],
    limites: { usuarios: 5, modulos: 2, pos: 1, storage: 5 },
  },
  {
    id: "professional",
    nombre: "Professional",
    precio: 799000,
    periodo: "mes",
    descripcion: "Para empresas en crecimiento",
    popular: true,
    features: [
      "25 usuarios",
      "8 módulos incluidos",
      "5 puntos de venta",
      "50GB almacenamiento",
      "Soporte prioritario",
      "API Access",
      "Flow Builder",
      "Reportes avanzados",
    ],
    limites: { usuarios: 25, modulos: 8, pos: 5, storage: 50 },
  },
  {
    id: "enterprise",
    nombre: "Enterprise",
    precio: 2499000,
    periodo: "mes",
    descripcion: "Para grandes organizaciones",
    popular: false,
    features: [
      "Usuarios ilimitados",
      "Todos los módulos",
      "Puntos de venta ilimitados",
      "500GB almacenamiento",
      "Soporte 24/7 dedicado",
      "API avanzada",
      "Flow Builder Pro",
      "White-label",
      "Multi-tenant",
      "SLA garantizado",
    ],
    limites: { usuarios: -1, modulos: -1, pos: -1, storage: 500 },
  },
]

const modulosDisponibles = [
  { id: "contabilidad", nombre: "Contabilidad", precio: 99000, incluido: true, categoria: "Finanzas" },
  { id: "inventario", nombre: "Inventario", precio: 99000, incluido: true, categoria: "Operaciones" },
  { id: "ventas", nombre: "Ventas / CRM", precio: 149000, incluido: true, categoria: "Comercial" },
  { id: "compras", nombre: "Compras", precio: 99000, incluido: true, categoria: "Operaciones" },
  { id: "pos", nombre: "POS Retail", precio: 149000, incluido: true, categoria: "Comercial" },
  { id: "manufactura", nombre: "Manufactura MRP", precio: 199000, incluido: false, categoria: "Producción" },
  { id: "calidad", nombre: "Control de Calidad", precio: 149000, incluido: false, categoria: "Producción" },
  { id: "rrhh", nombre: "Recursos Humanos", precio: 149000, incluido: true, categoria: "Gestión" },
  { id: "proyectos", nombre: "Proyectos", precio: 99000, incluido: false, categoria: "Gestión" },
  { id: "ecommerce", nombre: "E-Commerce B2B", precio: 249000, incluido: false, categoria: "Comercial" },
  { id: "field-service", nombre: "Field Service", precio: 199000, incluido: false, categoria: "Operaciones" },
  { id: "grc", nombre: "GRC", precio: 199000, incluido: false, categoria: "Cumplimiento" },
]

const historialFacturas = [
  {
    numero: "INV-2024-012",
    fecha: "2024-12-01",
    concepto: "Plan Professional - Diciembre",
    valor: 799000,
    estado: "pagada",
  },
  {
    numero: "INV-2024-011",
    fecha: "2024-11-01",
    concepto: "Plan Professional - Noviembre",
    valor: 799000,
    estado: "pagada",
  },
  {
    numero: "INV-2024-010",
    fecha: "2024-10-01",
    concepto: "Plan Professional - Octubre",
    valor: 799000,
    estado: "pagada",
  },
  {
    numero: "INV-2024-009",
    fecha: "2024-09-01",
    concepto: "Plan Professional - Septiembre",
    valor: 799000,
    estado: "pagada",
  },
]

const metodoPago = {
  tipo: "Tarjeta de crédito",
  marca: "Visa",
  ultimos4: "4242",
  vencimiento: "12/26",
}

export function BillingNexusModule() {
  const [activeTab, setActiveTab] = useState("suscripcion")
  const [planActual] = useState("professional")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  const planSeleccionado = planes.find((p) => p.id === planActual)
  const usoActual = { usuarios: 12, modulos: 6, pos: 3, storage: 18.5 }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Billing & Suscripción</h1>
          <p className="text-muted-foreground">Gestiona tu plan, módulos y facturación con NEXUS ERP</p>
        </div>
        <Badge variant="outline" className="text-primary border-primary/30">
          <Sparkles className="h-3 w-3 mr-1" />
          Plan {planSeleccionado?.nombre}
        </Badge>
      </div>

      {/* Resumen de Suscripción */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-5 w-5 text-primary" />
              <Badge className="bg-primary/20 text-primary">Activo</Badge>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(planSeleccionado?.precio || 0)}</p>
            <p className="text-sm text-muted-foreground">Plan {planSeleccionado?.nombre} / mes</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <Users className="h-5 w-5 text-muted-foreground mb-2" />
            <p className="text-2xl font-bold">
              {usoActual.usuarios} / {planSeleccionado?.limites.usuarios}
            </p>
            <p className="text-sm text-muted-foreground">Usuarios activos</p>
            <Progress
              value={(usoActual.usuarios / (planSeleccionado?.limites.usuarios || 1)) * 100}
              className="mt-2 h-1.5"
            />
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <Package className="h-5 w-5 text-muted-foreground mb-2" />
            <p className="text-2xl font-bold">
              {usoActual.modulos} / {planSeleccionado?.limites.modulos}
            </p>
            <p className="text-sm text-muted-foreground">Módulos activos</p>
            <Progress
              value={(usoActual.modulos / (planSeleccionado?.limites.modulos || 1)) * 100}
              className="mt-2 h-1.5"
            />
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <HardDrive className="h-5 w-5 text-muted-foreground mb-2" />
            <p className="text-2xl font-bold">
              {usoActual.storage} GB / {planSeleccionado?.limites.storage} GB
            </p>
            <p className="text-sm text-muted-foreground">Almacenamiento</p>
            <Progress
              value={(usoActual.storage / (planSeleccionado?.limites.storage || 1)) * 100}
              className="mt-2 h-1.5"
            />
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="suscripcion">Mi Suscripción</TabsTrigger>
          <TabsTrigger value="planes">Planes</TabsTrigger>
          <TabsTrigger value="modulos">Módulos</TabsTrigger>
          <TabsTrigger value="facturacion">Facturación</TabsTrigger>
        </TabsList>

        {/* Mi Suscripción */}
        <TabsContent value="suscripcion" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Detalles del Plan */}
            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Detalles de tu Plan</CardTitle>
                <CardDescription>Plan {planSeleccionado?.nombre} - Renovación mensual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground mb-1">Próxima facturación</p>
                    <p className="font-bold text-lg">1 Enero, 2025</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(planSeleccionado?.precio || 0)}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground mb-1">Ciclo de facturación</p>
                    <p className="font-bold text-lg">Mensual</p>
                    <p className="text-sm text-muted-foreground">Ahorra 20% con anual</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium">Características incluidas:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {planSeleccionado?.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button variant="outline" className="bg-transparent">
                    Cambiar a Anual
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    Upgrade Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Método de Pago */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Método de Pago</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border border-border bg-secondary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• {metodoPago.ultimos4}</p>
                      <p className="text-xs text-muted-foreground">Vence {metodoPago.vencimiento}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-500/30">
                    Principal
                  </Badge>
                </div>

                <Button variant="outline" className="w-full bg-transparent gap-2">
                  <CreditCard className="h-4 w-4" />
                  Cambiar método de pago
                </Button>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Datos de facturación</p>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">Mi Empresa S.A.S</p>
                    <p className="text-muted-foreground">NIT: 900.123.456-7</p>
                    <p className="text-muted-foreground">facturacion@miempresa.com</p>
                  </div>
                  <Button variant="link" className="px-0 text-xs text-primary">
                    Editar datos <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Planes */}
        <TabsContent value="planes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {planes.map((plan) => (
              <Card
                key={plan.id}
                className={`bg-card border-border relative ${plan.popular ? "border-primary ring-1 ring-primary" : ""} ${plan.id === planActual ? "bg-primary/5" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">Más Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-lg">{plan.nombre}</CardTitle>
                  <CardDescription>{plan.descripcion}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold">{formatCurrency(plan.precio)}</span>
                    <span className="text-muted-foreground">/{plan.periodo}</span>
                  </div>

                  <div className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${plan.id === planActual ? "bg-secondary text-foreground" : ""}`}
                    variant={plan.id === planActual ? "outline" : "default"}
                  >
                    {plan.id === planActual ? "Plan Actual" : "Seleccionar"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">¿Necesitas algo personalizado?</h3>
                    <p className="text-sm text-muted-foreground">
                      Contáctanos para planes enterprise con características a medida
                    </p>
                  </div>
                </div>
                <Button className="gap-2">
                  Contactar Ventas <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Módulos */}
        <TabsContent value="modulos" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Módulos Disponibles</CardTitle>
                  <CardDescription>Activa módulos adicionales según tus necesidades</CardDescription>
                </div>
                <Badge variant="outline">
                  {modulosDisponibles.filter((m) => m.incluido).length} de {modulosDisponibles.length} activos
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modulosDisponibles.map((modulo) => (
                  <div
                    key={modulo.id}
                    className={`p-4 rounded-lg border ${modulo.incluido ? "border-primary/50 bg-primary/5" : "border-border bg-secondary/20"}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{modulo.nombre}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {modulo.categoria}
                        </Badge>
                      </div>
                      {modulo.incluido ? (
                        <Badge className="bg-green-500/20 text-green-500">Activo</Badge>
                      ) : (
                        <span className="text-sm font-medium">+{formatCurrency(modulo.precio)}/mes</span>
                      )}
                    </div>
                    {!modulo.incluido && (
                      <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                        <Plus className="h-3 w-3 mr-1" />
                        Activar
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Facturación */}
        <TabsContent value="facturacion" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Historial de Facturación</CardTitle>
                  <CardDescription>Todas tus facturas de NEXUS ERP</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Exportar Todo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Factura</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Concepto</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="w-[100px]">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historialFacturas.map((factura) => (
                    <TableRow key={factura.numero} className="border-border">
                      <TableCell className="font-mono text-sm">{factura.numero}</TableCell>
                      <TableCell>{factura.fecha}</TableCell>
                      <TableCell>{factura.concepto}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(factura.valor)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-500 border-green-500/30">
                          <Check className="h-3 w-3 mr-1" />
                          {factura.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Download className="h-3 w-3" />
                          PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
