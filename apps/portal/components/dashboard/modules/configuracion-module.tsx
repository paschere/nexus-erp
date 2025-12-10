"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Building2,
  Settings,
  CreditCard,
  Bell,
  Shield,
  Database,
  Palette,
  Store,
  Plus,
  Edit,
  MapPin,
  Mail,
  FileText,
  DollarSign,
  Printer,
  Receipt,
  Users,
  Key,
  Cloud,
  Plug,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Sun,
  Moon,
  Monitor,
} from "lucide-react"

const puntosVenta = [
  {
    id: 1,
    nombre: "POS Principal",
    ubicacion: "Bogotá - Centro",
    direccion: "Calle 72 #10-34",
    estado: "activo",
    cajas: 4,
    impresoras: 2,
    ultimaVenta: "Hace 5 min",
  },
  {
    id: 2,
    nombre: "Sucursal Norte",
    ubicacion: "Bogotá - Usaquén",
    direccion: "Cra 7 #116-50",
    estado: "activo",
    cajas: 2,
    impresoras: 1,
    ultimaVenta: "Hace 15 min",
  },
  {
    id: 3,
    nombre: "Sucursal Medellín",
    ubicacion: "Medellín - El Poblado",
    direccion: "Calle 10 #43D-25",
    estado: "activo",
    cajas: 3,
    impresoras: 2,
    ultimaVenta: "Hace 30 min",
  },
  {
    id: 4,
    nombre: "Sucursal Cali",
    ubicacion: "Cali - Granada",
    direccion: "Av 9N #12-45",
    estado: "inactivo",
    cajas: 2,
    impresoras: 1,
    ultimaVenta: "Hace 2 días",
  },
]

const tenants = [
  {
    id: 1,
    nombre: "Empresa Principal S.A.S",
    nit: "900.123.456-7",
    plan: "Enterprise",
    usuarios: 24,
    estado: "activo",
    vencimiento: "15 Feb 2025",
  },
  {
    id: 2,
    nombre: "Sucursal Distribuciones Ltda",
    nit: "900.234.567-8",
    plan: "Professional",
    usuarios: 12,
    estado: "activo",
    vencimiento: "15 Feb 2025",
  },
  {
    id: 3,
    nombre: "Filial Importaciones S.A",
    nit: "900.345.678-9",
    plan: "Starter",
    usuarios: 5,
    estado: "prueba",
    vencimiento: "20 Ene 2024",
  },
]

const integraciones = [
  { id: 1, nombre: "DIAN - Facturación Electrónica", estado: "conectado", icono: FileText },
  { id: 2, nombre: "Bancolombia", estado: "conectado", icono: CreditCard },
  { id: 3, nombre: "Davivienda", estado: "pendiente", icono: CreditCard },
  { id: 4, nombre: "PayU", estado: "conectado", icono: DollarSign },
  { id: 5, nombre: "Wompi", estado: "desconectado", icono: DollarSign },
  { id: 6, nombre: "Google Workspace", estado: "conectado", icono: Cloud },
  { id: 7, nombre: "Microsoft 365", estado: "desconectado", icono: Cloud },
]

export function ConfiguracionModule() {
  const [activeSection, setActiveSection] = useState("empresa")
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("dark")
  const [primaryColor, setPrimaryColor] = useState("#10b981") // default green
  const [accentColor, setAccentColor] = useState("#8b5cf6")
  const [borderRadius, setBorderRadius] = useState("0.5")
  const [fontSize, setFontSize] = useState("16")
  const [fontFamily, setFontFamily] = useState("Inter")
  const [animationSpeed, setAnimationSpeed] = useState("normal")
  const [compactMode, setCompactMode] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    if (themeMode === "dark") {
      root.setAttribute("data-theme", "dark")
    } else if (themeMode === "light") {
      root.setAttribute("data-theme", "light")
    } else {
      // system
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.setAttribute("data-theme", prefersDark ? "dark" : "light")
    }
    // </CHANGE>

    const primaryOklch = hexToOklch(primaryColor)
    root.style.setProperty("--primary", primaryOklch)
    root.style.setProperty("--sidebar-primary", primaryOklch)
    root.style.setProperty("--chart-1", primaryOklch)
    root.style.setProperty("--ring", primaryOklch)
    root.style.setProperty("--sidebar-ring", primaryOklch)
    // Also set on body for immediate application
    body.style.setProperty("--primary", primaryOklch)
    body.style.setProperty("--sidebar-primary", primaryOklch)

    const accentOklch = hexToOklch(accentColor)
    root.style.setProperty("--accent", accentOklch)
    root.style.setProperty("--chart-2", accentOklch)
    body.style.setProperty("--accent", accentOklch)

    // Apply border radius
    root.style.setProperty("--radius", `${borderRadius}rem`)
    body.style.setProperty("--radius", `${borderRadius}rem`)

    // Apply font size to body
    body.style.fontSize = `${fontSize}px`

    // Apply font family
    body.style.fontFamily =
      fontFamily === "Inter"
        ? "Inter, sans-serif"
        : fontFamily === "Geist"
          ? "Geist, sans-serif"
          : fontFamily === "System"
            ? "system-ui, sans-serif"
            : "monospace"

    // Apply animation speed
    const duration = animationSpeed === "slow" ? "0.5s" : animationSpeed === "fast" ? "0.15s" : "0.3s"
    root.style.setProperty("--transition-duration", duration)

    // Apply compact mode
    if (compactMode) {
      body.classList.add("compact-mode")
    } else {
      body.classList.remove("compact-mode")
    }

    // Save preferences
    localStorage.setItem("nexus-theme-mode", themeMode)
    localStorage.setItem("nexus-primary-color", primaryColor)
    localStorage.setItem("nexus-accent-color", accentColor)
    localStorage.setItem("nexus-border-radius", borderRadius)
    localStorage.setItem("nexus-font-size", fontSize)
    localStorage.setItem("nexus-font-family", fontFamily)
    localStorage.setItem("nexus-animation-speed", animationSpeed)
    localStorage.setItem("nexus-compact-mode", String(compactMode))

    console.log("[v0] Theme applied:", {
      themeMode,
      primaryColor,
      primaryOklch,
      accentColor,
      accentOklch,
      borderRadius,
      fontSize,
    })

    void body.offsetHeight
  }, [themeMode, primaryColor, accentColor, borderRadius, fontSize, fontFamily, animationSpeed, compactMode])

  useEffect(() => {
    const savedMode = localStorage.getItem("nexus-theme-mode") as "light" | "dark" | "system" | null
    const savedColor = localStorage.getItem("nexus-primary-color")
    const savedAccent = localStorage.getItem("nexus-accent-color")
    const savedRadius = localStorage.getItem("nexus-border-radius")
    const savedFontSize = localStorage.getItem("nexus-font-size")
    const savedFontFamily = localStorage.getItem("nexus-font-family")
    const savedAnimSpeed = localStorage.getItem("nexus-animation-speed")
    const savedCompact = localStorage.getItem("nexus-compact-mode")

    if (savedMode) setThemeMode(savedMode)
    if (savedColor) setPrimaryColor(savedColor)
    if (savedAccent) setAccentColor(savedAccent)
    if (savedRadius) setBorderRadius(savedRadius)
    if (savedFontSize) setFontSize(savedFontSize)
    if (savedFontFamily) setFontFamily(savedFontFamily)
    if (savedAnimSpeed) setAnimationSpeed(savedAnimSpeed)
    if (savedCompact) setCompactMode(savedCompact === "true")
  }, [])

  function hexToOklch(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return "0.7 0.18 165"

    const r = Number.parseInt(result[1], 16) / 255
    const g = Number.parseInt(result[2], 16) / 255
    const b = Number.parseInt(result[3], 16) / 255

    // Simple approximation for oklch
    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b
    const c = Math.sqrt((r - l) ** 2 + (g - l) ** 2 + (b - l) ** 2) * 0.4

    // Calculate hue
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0

    if (max !== min) {
      const d = max - min
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / d + 2) / 6
          break
        case b:
          h = ((r - g) / d + 4) / 6
          break
      }
    }

    h = Math.round(h * 360)

    return `${l.toFixed(2)} ${c.toFixed(2)} ${h}`
  }

  const presetColors = [
    { name: "Verde Esmeralda", value: "#10b981" },
    { name: "Azul Océano", value: "#3b82f6" },
    { name: "Púrpura Real", value: "#8b5cf6" },
    { name: "Rosa Moderno", value: "#ec4899" },
    { name: "Naranja Energético", value: "#f97316" },
    { name: "Cyan Tecnológico", value: "#06b6d4" },
    { name: "Índigo Profesional", value: "#6366f1" },
    { name: "Teal Empresarial", value: "#14b8a6" },
  ]

  const handleReset = () => {
    setThemeMode("dark")
    setPrimaryColor("#10b981")
    setAccentColor("#8b5cf6")
    setBorderRadius("0.5")
    setFontSize("16")
    setFontFamily("Inter")
    setAnimationSpeed("normal")
    setCompactMode(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
          <p className="text-muted-foreground">Administra la configuración general de tu empresa y sistema</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <Card className="bg-card border-border w-64 shrink-0 h-fit">
          <CardContent className="p-2">
            <nav className="space-y-1">
              {[
                { id: "empresa", icon: Building2, label: "Datos de Empresa" },
                { id: "tenants", icon: Users, label: "Tenants / Empresas" },
                { id: "pos", icon: Store, label: "Puntos de Venta" },
                { id: "facturacion", icon: Receipt, label: "Facturación" },
                { id: "integraciones", icon: Plug, label: "Integraciones" },
                { id: "notificaciones", icon: Bell, label: "Notificaciones" },
                { id: "seguridad", icon: Shield, label: "Seguridad" },
                { id: "apariencia", icon: Palette, label: "Apariencia" },
                { id: "respaldos", icon: Database, label: "Respaldos" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                    activeSection === item.id
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {activeSection === "empresa" && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Datos de la Empresa</CardTitle>
                <CardDescription>Información general de tu organización</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="h-24 w-24 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Building2 className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Razón Social</Label>
                        <Input defaultValue="NEXUS ERP Colombia S.A.S" />
                      </div>
                      <div className="space-y-2">
                        <Label>Nombre Comercial</Label>
                        <Input defaultValue="NEXUS ERP" />
                      </div>
                      <div className="space-y-2">
                        <Label>NIT</Label>
                        <Input defaultValue="900.123.456-7" />
                      </div>
                      <div className="space-y-2">
                        <Label>Régimen</Label>
                        <Select defaultValue="responsable">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="responsable">Responsable de IVA</SelectItem>
                            <SelectItem value="no-responsable">No Responsable de IVA</SelectItem>
                            <SelectItem value="gran-contribuyente">Gran Contribuyente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="font-medium mb-4">Información de Contacto</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Dirección Principal</Label>
                      <Input defaultValue="Calle 72 #10-34, Oficina 501" />
                    </div>
                    <div className="space-y-2">
                      <Label>Ciudad</Label>
                      <Input defaultValue="Bogotá D.C." />
                    </div>
                    <div className="space-y-2">
                      <Label>Teléfono</Label>
                      <Input defaultValue="+57 (1) 234 5678" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue="contacto@nexuserp.co" />
                    </div>
                    <div className="space-y-2">
                      <Label>Sitio Web</Label>
                      <Input defaultValue="www.nexuserp.co" />
                    </div>
                    <div className="space-y-2">
                      <Label>Representante Legal</Label>
                      <Input defaultValue="Carlos Andrés Rodríguez" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Guardar Cambios</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "tenants" && (
            <div className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Tenants / Multi-Empresa</CardTitle>
                      <CardDescription>Gestiona múltiples empresas o sucursales en una sola plataforma</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Nuevo Tenant
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Crear Nuevo Tenant</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Razón Social</Label>
                            <Input placeholder="Nombre de la empresa" />
                          </div>
                          <div className="space-y-2">
                            <Label>NIT</Label>
                            <Input placeholder="000.000.000-0" />
                          </div>
                          <div className="space-y-2">
                            <Label>Plan</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar plan" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="starter">Starter</SelectItem>
                                <SelectItem value="professional">Professional</SelectItem>
                                <SelectItem value="enterprise">Enterprise</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Límite de Usuarios</Label>
                            <Input type="number" placeholder="10" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancelar</Button>
                          <Button>Crear Tenant</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tenants.map((tenant) => (
                      <div
                        key={tenant.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{tenant.nombre}</p>
                              <Badge
                                variant={
                                  tenant.estado === "activo"
                                    ? "default"
                                    : tenant.estado === "prueba"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {tenant.estado === "activo"
                                  ? "Activo"
                                  : tenant.estado === "prueba"
                                    ? "Prueba"
                                    : "Inactivo"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">NIT: {tenant.nit}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <p className="text-sm font-medium">{tenant.plan}</p>
                            <p className="text-xs text-muted-foreground">Plan</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{tenant.usuarios}</p>
                            <p className="text-xs text-muted-foreground">Usuarios</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{tenant.vencimiento}</p>
                            <p className="text-xs text-muted-foreground">Vencimiento</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "pos" && (
            <div className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Puntos de Venta</CardTitle>
                      <CardDescription>Configura tus locales, cajas y dispositivos</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Nuevo Punto de Venta
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Configurar Punto de Venta</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                          <div className="space-y-2">
                            <Label>Nombre del Punto</Label>
                            <Input placeholder="Ej: Sucursal Centro" />
                          </div>
                          <div className="space-y-2">
                            <Label>Código</Label>
                            <Input placeholder="POS-001" />
                          </div>
                          <div className="space-y-2 col-span-2">
                            <Label>Dirección</Label>
                            <Input placeholder="Dirección completa" />
                          </div>
                          <div className="space-y-2">
                            <Label>Ciudad</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar ciudad" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bogota">Bogotá</SelectItem>
                                <SelectItem value="medellin">Medellín</SelectItem>
                                <SelectItem value="cali">Cali</SelectItem>
                                <SelectItem value="barranquilla">Barranquilla</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Teléfono</Label>
                            <Input placeholder="+57 300 000 0000" />
                          </div>
                          <div className="space-y-2">
                            <Label>Número de Cajas</Label>
                            <Input type="number" placeholder="2" />
                          </div>
                          <div className="space-y-2">
                            <Label>Responsable</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Asignar responsable" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user1">Carlos Rodríguez</SelectItem>
                                <SelectItem value="user2">María García</SelectItem>
                                <SelectItem value="user3">Juan Pérez</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-2 space-y-4 pt-4 border-t border-border">
                            <h4 className="font-medium">Dispositivos</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                                <div className="flex items-center gap-3">
                                  <Printer className="h-5 w-5 text-muted-foreground" />
                                  <span className="text-sm">Impresora de Tickets</span>
                                </div>
                                <Switch />
                              </div>
                              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                                <div className="flex items-center gap-3">
                                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                                  <span className="text-sm">Datáfono</span>
                                </div>
                                <Switch />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancelar</Button>
                          <Button>Guardar Punto de Venta</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {puntosVenta.map((pos) => (
                      <Card
                        key={pos.id}
                        className={`bg-muted/30 border ${pos.estado === "activo" ? "border-green-500/30" : "border-border"}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-10 w-10 rounded-lg flex items-center justify-center ${pos.estado === "activo" ? "bg-green-500/20" : "bg-muted"}`}
                              >
                                <Store
                                  className={`h-5 w-5 ${pos.estado === "activo" ? "text-green-400" : "text-muted-foreground"}`}
                                />
                              </div>
                              <div>
                                <p className="font-semibold">{pos.nombre}</p>
                                <p className="text-sm text-muted-foreground">{pos.ubicacion}</p>
                              </div>
                            </div>
                            <Badge variant={pos.estado === "activo" ? "default" : "secondary"}>
                              {pos.estado === "activo" ? "Activo" : "Inactivo"}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {pos.direccion}
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-border mt-3">
                              <div className="flex items-center gap-4">
                                <span className="text-muted-foreground">{pos.cajas} cajas</span>
                                <span className="text-muted-foreground">{pos.impresoras} impresoras</span>
                              </div>
                              <span className="text-xs text-muted-foreground">{pos.ultimaVenta}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-4">
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              <Settings className="h-4 w-4 mr-2" />
                              Configurar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "facturacion" && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Configuración de Facturación</CardTitle>
                <CardDescription>Parámetros de facturación electrónica DIAN</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Resolución de Facturación</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Número de Resolución</Label>
                        <Input defaultValue="18764000001234" />
                      </div>
                      <div className="space-y-2">
                        <Label>Prefijo</Label>
                        <Input defaultValue="FE" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Desde</Label>
                          <Input defaultValue="1" />
                        </div>
                        <div className="space-y-2">
                          <Label>Hasta</Label>
                          <Input defaultValue="50000" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Fecha Inicio</Label>
                          <Input type="date" defaultValue="2024-01-01" />
                        </div>
                        <div className="space-y-2">
                          <Label>Fecha Fin</Label>
                          <Input type="date" defaultValue="2025-12-31" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Certificado Digital</h4>
                    <div className="p-4 rounded-lg border border-border bg-muted/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="font-medium">Certificado Activo</span>
                        </div>
                        <Badge variant="outline" className="text-green-400 border-green-400/50">
                          Válido
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Emisor: Certicámara S.A.</p>
                        <p>Vence: 15 de Diciembre de 2025</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Renovar Certificado
                      </Button>
                    </div>
                    <div className="space-y-3 pt-4">
                      <h4 className="font-medium">Ambiente</h4>
                      <Select defaultValue="produccion">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pruebas">Pruebas (Habilitación)</SelectItem>
                          <SelectItem value="produccion">Producción</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-border">
                  <Button>Guardar Configuración</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "integraciones" && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Integraciones</CardTitle>
                <CardDescription>Conecta servicios externos con tu ERP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {integraciones.map((integracion) => (
                    <div
                      key={integracion.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            integracion.estado === "conectado"
                              ? "bg-green-500/20"
                              : integracion.estado === "pendiente"
                                ? "bg-yellow-500/20"
                                : "bg-muted"
                          }`}
                        >
                          <integracion.icono
                            className={`h-5 w-5 ${
                              integracion.estado === "conectado"
                                ? "text-green-400"
                                : integracion.estado === "pendiente"
                                  ? "text-yellow-400"
                                  : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{integracion.nombre}</p>
                          <div className="flex items-center gap-1 text-sm">
                            {integracion.estado === "conectado" && <CheckCircle className="h-3 w-3 text-green-400" />}
                            {integracion.estado === "pendiente" && <AlertCircle className="h-3 w-3 text-yellow-400" />}
                            <span
                              className={
                                integracion.estado === "conectado"
                                  ? "text-green-400"
                                  : integracion.estado === "pendiente"
                                    ? "text-yellow-400"
                                    : "text-muted-foreground"
                              }
                            >
                              {integracion.estado === "conectado"
                                ? "Conectado"
                                : integracion.estado === "pendiente"
                                  ? "Pendiente"
                                  : "Desconectado"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant={integracion.estado === "conectado" ? "outline" : "default"} size="sm">
                        {integracion.estado === "conectado" ? "Configurar" : "Conectar"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "notificaciones" && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>Configura las alertas y notificaciones del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { titulo: "Ventas", items: ["Nueva venta realizada", "Meta de ventas alcanzada", "Factura vencida"] },
                  {
                    titulo: "Inventario",
                    items: ["Stock bajo mínimo", "Producto sin movimiento", "Recepción de mercancía"],
                  },
                  {
                    titulo: "Contabilidad",
                    items: ["Cierre de período", "Conciliación bancaria", "Vencimiento de impuestos"],
                  },
                  { titulo: "Sistema", items: ["Respaldo completado", "Error en proceso", "Actualización disponible"] },
                ].map((grupo) => (
                  <div key={grupo.titulo} className="space-y-3">
                    <h4 className="font-medium">{grupo.titulo}</h4>
                    <div className="space-y-2">
                      {grupo.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <span className="text-sm">{item}</span>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center gap-2">
                              <Bell className="h-4 w-4 text-muted-foreground" />
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeSection === "seguridad" && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Seguridad</CardTitle>
                <CardDescription>Configura las políticas de seguridad del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Políticas de Contraseña</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Longitud mínima</Label>
                      <Input type="number" defaultValue="8" />
                    </div>
                    <div className="space-y-2">
                      <Label>Días de vigencia</Label>
                      <Input type="number" defaultValue="90" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Requerir mayúsculas y minúsculas",
                      "Requerir números",
                      "Requerir caracteres especiales",
                      "No permitir contraseñas anteriores",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <span className="text-sm">{item}</span>
                        <Switch defaultChecked={idx < 3} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="font-medium">Autenticación de Dos Factores (2FA)</h4>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Key className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Requerir 2FA para todos los usuarios</p>
                        <p className="text-sm text-muted-foreground">Aumenta la seguridad de las cuentas</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="font-medium">Sesiones</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tiempo de inactividad (minutos)</Label>
                      <Input type="number" defaultValue="30" />
                    </div>
                    <div className="space-y-2">
                      <Label>Máximo de sesiones simultáneas</Label>
                      <Input type="number" defaultValue="3" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Guardar Configuración</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "apariencia" && (
            <div className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Personalización de Apariencia</CardTitle>
                  <CardDescription>Personaliza los colores, fuentes y estilos de tu dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Modo de Tema */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-semibold">Modo de Tema</Label>
                        <p className="text-sm text-muted-foreground">Elige entre modo claro, oscuro o automático</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: "light", icon: Sun, label: "Claro" },
                        { value: "dark", icon: Moon, label: "Oscuro" },
                        { value: "system", icon: Monitor, label: "Sistema" },
                      ].map((mode) => (
                        <button
                          key={mode.value}
                          onClick={() => setThemeMode(mode.value as any)}
                          className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                            themeMode === mode.value
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50 hover:bg-muted/50"
                          }`}
                        >
                          <mode.icon
                            className={`h-8 w-8 ${themeMode === mode.value ? "text-primary" : "text-muted-foreground"}`}
                          />
                          <span className="font-medium">{mode.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Primario */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-semibold">Color Primario</Label>
                      <p className="text-sm text-muted-foreground">Define el color principal de tu aplicación</p>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {presetColors.map((preset) => (
                        <button
                          key={preset.value}
                          onClick={() => setPrimaryColor(preset.value)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                            primaryColor === preset.value
                              ? "border-primary scale-105"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div
                            className="h-12 w-12 rounded-full border-2 border-white/20"
                            style={{ backgroundColor: preset.value }}
                          />
                          <span className="text-xs font-medium text-center">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <Label>Color Personalizado</Label>
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="h-12 w-24 rounded-lg cursor-pointer border-2 border-border"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-32"
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  {/* Color de Acento */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-semibold">Color de Acento</Label>
                      <p className="text-sm text-muted-foreground">Color secundario para elementos destacados</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="h-12 w-24 rounded-lg cursor-pointer border-2 border-border"
                      />
                      <Input
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-32"
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  {/* Fuente */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-semibold">Familia de Fuente</Label>
                      <p className="text-sm text-muted-foreground">Selecciona la tipografía de la interfaz</p>
                    </div>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter (Sans-serif moderna)</SelectItem>
                        <SelectItem value="Geist">Geist (Sans-serif tech)</SelectItem>
                        <SelectItem value="System">System UI (Nativa)</SelectItem>
                        <SelectItem value="Mono">Monospace (Técnica)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tamaño de Fuente */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-semibold">Tamaño de Fuente Base: {fontSize}px</Label>
                      <p className="text-sm text-muted-foreground">Ajusta el tamaño general del texto</p>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="20"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Pequeño (12px)</span>
                      <span>Mediano (16px)</span>
                      <span>Grande (20px)</span>
                    </div>
                  </div>

                  {/* Radio de Bordes */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-semibold">Radio de Bordes: {borderRadius}rem</Label>
                      <p className="text-sm text-muted-foreground">Controla qué tan redondeados son los elementos</p>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1.5"
                      step="0.1"
                      value={borderRadius}
                      onChange={(e) => setBorderRadius(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Cuadrado (0)</span>
                      <span>Moderado (0.5)</span>
                      <span>Muy redondeado (1.5)</span>
                    </div>
                  </div>

                  {/* Velocidad de Animaciones */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-semibold">Velocidad de Animaciones</Label>
                      <p className="text-sm text-muted-foreground">Controla qué tan rápidas son las transiciones</p>
                    </div>
                    <Select value={animationSpeed} onValueChange={setAnimationSpeed}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">Lento (0.5s)</SelectItem>
                        <SelectItem value="normal">Normal (0.3s)</SelectItem>
                        <SelectItem value="fast">Rápido (0.15s)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Modo Compacto */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-semibold">Modo Compacto</Label>
                      <p className="text-sm text-muted-foreground">Reduce espacios para mostrar más información</p>
                    </div>
                    <Switch checked={compactMode} onCheckedChange={setCompactMode} />
                  </div>

                  {/* Vista Previa */}
                  <div className="space-y-4 p-6 rounded-xl border-2 border-border bg-muted/30">
                    <Label className="text-base font-semibold">Vista Previa</Label>
                    <div className="space-y-3">
                      <Button className="w-full">Botón Primario</Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Botón Secundario
                      </Button>
                      <Card className="p-4">
                        <p className="text-sm">Esta es una tarjeta de ejemplo con el estilo actual aplicado</p>
                      </Card>
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex justify-between pt-4 border-t border-border">
                    <Button variant="outline" onClick={handleReset}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Restablecer
                    </Button>
                    <Button>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Guardar Cambios
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "respaldos" && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Respaldos y Recuperación</CardTitle>
                <CardDescription>Configura las copias de seguridad automáticas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border border-green-500/30 bg-green-500/10">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="font-medium">Último respaldo exitoso</p>
                      <p className="text-sm text-muted-foreground">Hoy, 3:00 AM - 2.4 GB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Programación</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Frecuencia</Label>
                      <Select defaultValue="diario">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diario">Diario</SelectItem>
                          <SelectItem value="semanal">Semanal</SelectItem>
                          <SelectItem value="mensual">Mensual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Hora</Label>
                      <Input type="time" defaultValue="03:00" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="font-medium">Retención</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Diarios</Label>
                      <Input type="number" defaultValue="7" />
                    </div>
                    <div className="space-y-2">
                      <Label>Semanales</Label>
                      <Input type="number" defaultValue="4" />
                    </div>
                    <div className="space-y-2">
                      <Label>Mensuales</Label>
                      <Input type="number" defaultValue="12" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <Button variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    Crear Respaldo Ahora
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Restaurar desde Respaldo
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
