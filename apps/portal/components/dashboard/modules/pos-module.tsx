"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  Store,
  CreditCard,
  Banknote,
  Receipt,
  Users,
  TrendingUp,
  MapPin,
  Search,
  Barcode,
  Plus,
  Minus,
  Trash2,
  Printer,
  Monitor,
  Smartphone,
  Tablet,
  Scale,
  QrCode,
  DollarSign,
  Percent,
  ShoppingBag,
  Clock,
  User,
  Gift,
  Wallet,
  Building2,
  Send,
  ChevronRight,
  Settings,
  RefreshCw,
  X,
  Package,
  Zap,
  Pause,
  Play,
  RotateCcw,
  Split,
  FileText,
  Calculator,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Grid3X3,
  List,
  LayoutGrid,
  Star,
  Heart,
  History,
  Download,
  MoreVertical,
  BarChart3,
  Target,
  Sparkles,
  Bot,
  Mic,
  Camera,
  ScanLine,
  CircleDollarSign,
  CheckCircle2,
  Coffee,
  Box,
  Cpu,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

// Datos de ejemplo expandidos
const salesByHour = [
  { hora: "6am", ventas: 12, meta: 20 },
  { hora: "8am", ventas: 45, meta: 50 },
  { hora: "10am", ventas: 120, meta: 100 },
  { hora: "12pm", ventas: 280, meta: 250 },
  { hora: "2pm", ventas: 190, meta: 200 },
  { hora: "4pm", ventas: 150, meta: 180 },
  { hora: "6pm", ventas: 220, meta: 200 },
  { hora: "8pm", ventas: 180, meta: 150 },
]

const salesByPaymentMethod = [
  { name: "Efectivo", value: 35, color: "#22c55e" },
  { name: "Débito", value: 28, color: "#3b82f6" },
  { name: "Crédito", value: 22, color: "#a855f7" },
  { name: "Nequi", value: 10, color: "#ec4899" },
  { name: "Daviplata", value: 5, color: "#ef4444" },
]

const stores = [
  {
    id: 1,
    nombre: "Tienda Centro",
    direccion: "Calle 72 #10-25",
    ciudad: "Bogotá",
    ventas: 4250000,
    transacciones: 156,
    estado: "online",
    cajas: 3,
    cajasActivas: 2,
    empleados: 8,
    turnoActual: "Mañana",
  },
  {
    id: 2,
    nombre: "Tienda Norte",
    direccion: "Av. 19 #134-50",
    ciudad: "Bogotá",
    ventas: 3180000,
    transacciones: 124,
    estado: "online",
    cajas: 2,
    cajasActivas: 2,
    empleados: 6,
    turnoActual: "Mañana",
  },
  {
    id: 3,
    nombre: "Tienda Medellín",
    direccion: "Cra 43A #1-50",
    ciudad: "Medellín",
    ventas: 2890000,
    transacciones: 98,
    estado: "offline",
    cajas: 2,
    cajasActivas: 0,
    empleados: 5,
    turnoActual: "Cerrada",
  },
  {
    id: 4,
    nombre: "Tienda Cali",
    direccion: "Av. 6N #23-45",
    ciudad: "Cali",
    ventas: 1920000,
    transacciones: 67,
    estado: "online",
    cajas: 1,
    cajasActivas: 1,
    empleados: 4,
    turnoActual: "Tarde",
  },
]

const cajeros = [
  {
    id: 1,
    nombre: "María García",
    avatar: "MG",
    caja: 1,
    turno: "6am - 2pm",
    ventas: 1850000,
    transacciones: 67,
    estado: "activo",
    tiempoPromedio: "1.2 min",
  },
  {
    id: 2,
    nombre: "Carlos Rodríguez",
    avatar: "CR",
    caja: 2,
    turno: "6am - 2pm",
    ventas: 2100000,
    transacciones: 78,
    estado: "activo",
    tiempoPromedio: "1.0 min",
  },
  {
    id: 3,
    nombre: "Ana Martínez",
    avatar: "AM",
    caja: 3,
    turno: "2pm - 10pm",
    ventas: 0,
    transacciones: 0,
    estado: "pendiente",
    tiempoPromedio: "-",
  },
  {
    id: 4,
    nombre: "Juan López",
    avatar: "JL",
    caja: null,
    turno: "2pm - 10pm",
    ventas: 0,
    transacciones: 0,
    estado: "descanso",
    tiempoPromedio: "-",
  },
]

const devices = [
  {
    id: 1,
    tipo: "Impresora Térmica",
    modelo: "Epson TM-T20III",
    puerto: "USB001",
    estado: "conectado",
    bateria: null,
    ultimaActividad: "Hace 2 min",
  },
  {
    id: 2,
    tipo: "Lector de Códigos",
    modelo: "Honeywell 1900g",
    puerto: "USB002",
    estado: "conectado",
    bateria: null,
    ultimaActividad: "Hace 30 seg",
  },
  {
    id: 3,
    tipo: "Báscula Digital",
    modelo: "CAS SW-1",
    puerto: "COM3",
    estado: "conectado",
    bateria: null,
    ultimaActividad: "Hace 5 min",
  },
  {
    id: 4,
    tipo: "Datáfono",
    modelo: "Ingenico Move 5000",
    puerto: "Bluetooth",
    estado: "conectado",
    bateria: 85,
    ultimaActividad: "Hace 1 min",
  },
  {
    id: 5,
    tipo: "Cajón de Dinero",
    modelo: "APG Series 4000",
    puerto: "RJ11",
    estado: "conectado",
    bateria: null,
    ultimaActividad: "Hace 3 min",
  },
  {
    id: 6,
    tipo: "Pantalla Cliente",
    modelo: "Epson DM-D110",
    puerto: "USB003",
    estado: "conectado",
    bateria: null,
    ultimaActividad: "Ahora",
  },
  {
    id: 7,
    tipo: "Scanner de mano",
    modelo: "Zebra DS2208",
    puerto: "Bluetooth",
    estado: "desconectado",
    bateria: 12,
    ultimaActividad: "Hace 2 hrs",
  },
  {
    id: 8,
    tipo: "Tablet POS",
    modelo: "Samsung Galaxy Tab A8",
    puerto: "WiFi",
    estado: "conectado",
    bateria: 72,
    ultimaActividad: "Ahora",
  },
]

const categorias = [
  { id: "todos", nombre: "Todos", icono: Grid3X3, color: "text-primary" },
  { id: "favoritos", nombre: "Favoritos", icono: Star, color: "text-yellow-500" },
  { id: "abarrotes", nombre: "Abarrotes", icono: Package, color: "text-orange-500" },
  { id: "lacteos", nombre: "Lácteos", icono: Box, color: "text-blue-500" },
  { id: "carnes", nombre: "Carnes", icono: Target, color: "text-red-500" },
  { id: "frutas", nombre: "Frutas/Verduras", icono: Heart, color: "text-green-500" },
  { id: "bebidas", nombre: "Bebidas", icono: Coffee, color: "text-purple-500" },
  { id: "aseo", nombre: "Aseo", icono: Sparkles, color: "text-cyan-500" },
]

const productos = [
  {
    id: 1,
    codigo: "7701234567890",
    nombre: "Aceite de Oliva Extra Virgen 500ml",
    precio: 42500,
    stock: 45,
    categoria: "abarrotes",
    favorito: true,
    imagen: null,
    iva: 19,
    descuento: 0,
  },
  {
    id: 2,
    codigo: "7701234567891",
    nombre: "Arroz Diana 1kg",
    precio: 5200,
    stock: 120,
    categoria: "abarrotes",
    favorito: true,
    imagen: null,
    iva: 0,
    descuento: 0,
  },
  {
    id: 3,
    codigo: "7701234567892",
    nombre: "Leche Entera Alquería 1L",
    precio: 4800,
    stock: 80,
    categoria: "lacteos",
    favorito: true,
    imagen: null,
    iva: 0,
    descuento: 5,
  },
  {
    id: 4,
    codigo: "7701234567893",
    nombre: "Pan Tajado Bimbo",
    precio: 8900,
    stock: 35,
    categoria: "abarrotes",
    favorito: false,
    imagen: null,
    iva: 0,
    descuento: 0,
  },
  {
    id: 5,
    codigo: "7701234567894",
    nombre: "Café Juan Valdez 500g",
    precio: 32000,
    stock: 25,
    categoria: "bebidas",
    favorito: true,
    imagen: null,
    iva: 19,
    descuento: 10,
  },
  {
    id: 6,
    codigo: "7701234567895",
    nombre: "Jabón Dove 135g",
    precio: 7500,
    stock: 60,
    categoria: "aseo",
    favorito: false,
    imagen: null,
    iva: 19,
    descuento: 0,
  },
  {
    id: 7,
    codigo: "7701234567896",
    nombre: "Pechuga de Pollo kg",
    precio: 16900,
    stock: 30,
    categoria: "carnes",
    favorito: false,
    imagen: null,
    iva: 0,
    descuento: 0,
    pesable: true,
  },
  {
    id: 8,
    codigo: "7701234567897",
    nombre: "Banano kg",
    precio: 2500,
    stock: 50,
    categoria: "frutas",
    favorito: false,
    imagen: null,
    iva: 0,
    descuento: 0,
    pesable: true,
  },
  {
    id: 9,
    codigo: "7701234567898",
    nombre: "Coca-Cola 2L",
    precio: 7200,
    stock: 100,
    categoria: "bebidas",
    favorito: true,
    imagen: null,
    iva: 19,
    descuento: 0,
  },
  {
    id: 10,
    codigo: "7701234567899",
    nombre: "Queso Campesino 500g",
    precio: 18500,
    stock: 20,
    categoria: "lacteos",
    favorito: false,
    imagen: null,
    iva: 0,
    descuento: 0,
  },
  {
    id: 11,
    codigo: "7701234567900",
    nombre: "Huevos AAA x30",
    precio: 21000,
    stock: 40,
    categoria: "abarrotes",
    favorito: true,
    imagen: null,
    iva: 0,
    descuento: 0,
  },
  {
    id: 12,
    codigo: "7701234567901",
    nombre: "Detergente Ariel 3kg",
    precio: 38500,
    stock: 15,
    categoria: "aseo",
    favorito: false,
    imagen: null,
    iva: 19,
    descuento: 15,
  },
]

const clientes = [
  {
    id: 1,
    nombre: "María Fernanda López",
    documento: "1098765432",
    tipo: "CC",
    telefono: "3001234567",
    email: "maria@email.com",
    puntos: 2500,
    nivel: "Gold",
  },
  {
    id: 2,
    nombre: "Empresa ABC S.A.S",
    documento: "900123456-1",
    tipo: "NIT",
    telefono: "6012345678",
    email: "compras@abc.com",
    puntos: 15000,
    nivel: "Platinum",
  },
  {
    id: 3,
    nombre: "Juan Carlos Pérez",
    documento: "79876543",
    tipo: "CC",
    telefono: "3109876543",
    email: "juan@email.com",
    puntos: 800,
    nivel: "Silver",
  },
]

const metodoPago = [
  { id: "efectivo", nombre: "Efectivo", icono: Banknote, color: "text-green-500", bgColor: "bg-green-500/10" },
  { id: "debito", nombre: "Débito", icono: CreditCard, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { id: "credito", nombre: "Crédito", icono: CreditCard, color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { id: "nequi", nombre: "Nequi", icono: Smartphone, color: "text-pink-500", bgColor: "bg-pink-500/10" },
  { id: "daviplata", nombre: "Daviplata", icono: Wallet, color: "text-red-500", bgColor: "bg-red-500/10" },
  { id: "pse", nombre: "PSE", icono: Building2, color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
  { id: "mixto", nombre: "Mixto", icono: Split, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  {
    id: "credito_tienda",
    nombre: "Crédito Tienda",
    icono: FileText,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
]

const transaccionesRecientes = [
  {
    id: "TXN-001",
    hora: "10:45",
    cliente: "María López",
    items: 5,
    total: 125600,
    estado: "completada",
    metodo: "Efectivo",
  },
  {
    id: "TXN-002",
    hora: "10:32",
    cliente: "Cliente General",
    items: 3,
    total: 45200,
    estado: "completada",
    metodo: "Débito",
  },
  {
    id: "TXN-003",
    hora: "10:28",
    cliente: "Empresa ABC",
    items: 12,
    total: 890500,
    estado: "completada",
    metodo: "Crédito",
  },
  { id: "TXN-004", hora: "10:15", cliente: "Juan Pérez", items: 2, total: 32000, estado: "anulada", metodo: "Nequi" },
  {
    id: "TXN-005",
    hora: "10:02",
    cliente: "Cliente General",
    items: 8,
    total: 156800,
    estado: "completada",
    metodo: "Efectivo",
  },
]

export function POSModule() {
  const [activeTab, setActiveTab] = useState("terminal")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoriaActiva, setCategoriaActiva] = useState("todos")
  const [vistaProductos, setVistaProductos] = useState<"grid" | "list">("grid")
  const [carrito, setCarrito] = useState<
    {
      id: number
      nombre: string
      precio: number
      cantidad: number
      iva: number
      descuento: number
      pesable?: boolean
    }[]
  >([])
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState("efectivo")
  const [clienteSeleccionado, setClienteSeleccionado] = useState<(typeof clientes)[0] | null>(null)
  const [descuentoGlobal, setDescuentoGlobal] = useState(0)
  const [showClienteModal, setShowClienteModal] = useState(false)
  const [showCobroModal, setShowCobroModal] = useState(false)
  const [showCierreModal, setShowCierreModal] = useState(false)
  const [showAperturaModal, setShowAperturaModal] = useState(false)
  const [showDevolucionModal, setShowDevolucionModal] = useState(false)
  const [showProductoModal, setShowProductoModal] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState<(typeof productos)[0] | null>(null)
  const [montoRecibido, setMontoRecibido] = useState("")
  const [cajaAbierta, setCajaAbierta] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [notaVenta, setNotaVenta] = useState("")
  const [ventaEnPausa, setVentaEnPausa] = useState<typeof carrito | null>(null)

  // Cálculos del carrito
  const calcularSubtotal = useCallback(() => {
    return carrito.reduce((acc, item) => {
      const precioConDescuento = item.precio * (1 - item.descuento / 100)
      return acc + precioConDescuento * item.cantidad
    }, 0)
  }, [carrito])

  const calcularIVA = useCallback(() => {
    return carrito.reduce((acc, item) => {
      const precioConDescuento = item.precio * (1 - item.descuento / 100)
      return acc + (precioConDescuento * item.cantidad * item.iva) / 100
    }, 0)
  }, [carrito])

  const calcularDescuentos = useCallback(() => {
    const descuentosProductos = carrito.reduce((acc, item) => {
      return acc + (item.precio * item.cantidad * item.descuento) / 100
    }, 0)
    const subtotal = calcularSubtotal()
    const descuentoGlobalMonto = (subtotal * descuentoGlobal) / 100
    return descuentosProductos + descuentoGlobalMonto
  }, [carrito, descuentoGlobal, calcularSubtotal])

  const subtotal = calcularSubtotal()
  const iva = calcularIVA()
  const descuentos = calcularDescuentos()
  const total = subtotal + iva - (subtotal * descuentoGlobal) / 100
  const cambio = montoRecibido ? Number.parseFloat(montoRecibido) - total : 0

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  const agregarAlCarrito = (producto: (typeof productos)[0]) => {
    if (producto.pesable) {
      setProductoSeleccionado(producto)
      setShowProductoModal(true)
      return
    }

    const existe = carrito.find((item) => item.id === producto.id)
    if (existe) {
      setCarrito(carrito.map((item) => (item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)))
    } else {
      setCarrito([
        ...carrito,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
          iva: producto.iva,
          descuento: producto.descuento,
        },
      ])
    }
    if (soundEnabled) {
      // Sonido de beep
    }
  }

  const modificarCantidad = (id: number, delta: number) => {
    setCarrito(
      carrito
        .map((item) => {
          if (item.id === id) {
            const nuevaCantidad = item.cantidad + delta
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : item
          }
          return item
        })
        .filter((item) => item.cantidad > 0),
    )
  }

  const eliminarDelCarrito = (id: number) => {
    setCarrito(carrito.filter((item) => item.id !== id))
  }

  const limpiarCarrito = () => {
    setCarrito([])
    setClienteSeleccionado(null)
    setDescuentoGlobal(0)
    setNotaVenta("")
  }

  const pausarVenta = () => {
    if (carrito.length > 0) {
      setVentaEnPausa(carrito)
      limpiarCarrito()
    }
  }

  const recuperarVenta = () => {
    if (ventaEnPausa) {
      setCarrito(ventaEnPausa)
      setVentaEnPausa(null)
    }
  }

  const productosFiltrados = productos.filter((p) => {
    const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || p.codigo.includes(searchTerm)
    const matchCategoria =
      categoriaActiva === "todos" || (categoriaActiva === "favoritos" ? p.favorito : p.categoria === categoriaActiva)
    return matchSearch && matchCategoria
  })

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <div className={`h-full ${fullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">POS Retail</h1>
            <p className="text-muted-foreground text-sm">Punto de venta inteligente</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cajaAbierta ? "text-green-500 border-green-500/30" : "text-red-500 border-red-500/30"}
            >
              {cajaAbierta ? <Unlock className="h-3 w-3 mr-1" /> : <Lock className="h-3 w-3 mr-1" />}
              Caja {cajaAbierta ? "Abierta" : "Cerrada"}
            </Badge>
            <Badge variant="outline" className="text-blue-500 border-blue-500/30">
              <User className="h-3 w-3 mr-1" />
              María García
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              Turno: 6am - 2pm
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {ventaEnPausa && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-yellow-500/10 border-yellow-500/30 text-yellow-500"
              onClick={recuperarVenta}
            >
              <Play className="h-4 w-4" />
              Recuperar Venta ({ventaEnPausa.length} items)
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="bg-transparent"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" className="bg-transparent" onClick={() => setFullscreen(!fullscreen)}>
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={() => setShowDevolucionModal(true)}
          >
            <RotateCcw className="h-4 w-4" />
            Devolución
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={() => setShowCierreModal(true)}>
            <Receipt className="h-4 w-4" />
            Cierre
          </Button>
          {!cajaAbierta ? (
            <Button size="sm" className="gap-2" onClick={() => setShowAperturaModal(true)}>
              <Store className="h-4 w-4" />
              Abrir Caja
            </Button>
          ) : (
            <Button size="sm" variant="destructive" className="gap-2" onClick={() => setCajaAbierta(false)}>
              <Lock className="h-4 w-4" />
              Cerrar Caja
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="terminal" className="gap-2">
            <Monitor className="h-4 w-4" />
            Terminal
          </TabsTrigger>
          <TabsTrigger value="tiendas" className="gap-2">
            <Store className="h-4 w-4" />
            Tiendas
          </TabsTrigger>
          <TabsTrigger value="cajeros" className="gap-2">
            <Users className="h-4 w-4" />
            Cajeros
          </TabsTrigger>
          <TabsTrigger value="dispositivos" className="gap-2">
            <Cpu className="h-4 w-4" />
            Dispositivos
          </TabsTrigger>
          <TabsTrigger value="reportes" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Reportes
          </TabsTrigger>
          <TabsTrigger value="historial" className="gap-2">
            <History className="h-4 w-4" />
            Historial
          </TabsTrigger>
        </TabsList>

        {/* Terminal de Venta */}
        <TabsContent value="terminal" className="space-y-4 mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ height: "calc(100vh - 220px)" }}>
            {/* Panel de Productos */}
            <div className="lg:col-span-2 flex flex-col gap-3 min-h-0">
              {/* Búsqueda y Herramientas */}
              <Card className="bg-card border-border shrink-0">
                <CardContent className="p-3">
                  <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar producto, escanear código o usar comando de voz..."
                        className="pl-10 pr-20 bg-secondary/50 border-border h-12 text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mic className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" size="icon" className="bg-transparent h-12 w-12">
                      <Barcode className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-transparent h-12 w-12">
                      <QrCode className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-transparent h-12 w-12">
                      <Scale className="h-5 w-5" />
                    </Button>
                    <Separator orientation="vertical" className="h-8" />
                    <Button
                      variant="outline"
                      size="icon"
                      className={`h-12 w-12 ${vistaProductos === "grid" ? "bg-primary/20" : "bg-transparent"}`}
                      onClick={() => setVistaProductos("grid")}
                    >
                      <LayoutGrid className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`h-12 w-12 ${vistaProductos === "list" ? "bg-primary/20" : "bg-transparent"}`}
                      onClick={() => setVistaProductos("list")}
                    >
                      <List className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Categorías */}
              <div className="flex gap-2 overflow-x-auto pb-1 shrink-0">
                {categorias.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={categoriaActiva === cat.id ? "default" : "outline"}
                    size="sm"
                    className={`gap-2 shrink-0 ${categoriaActiva === cat.id ? "" : "bg-transparent"}`}
                    onClick={() => setCategoriaActiva(cat.id)}
                  >
                    <cat.icono className={`h-4 w-4 ${categoriaActiva === cat.id ? "" : cat.color}`} />
                    {cat.nombre}
                  </Button>
                ))}
              </div>

              {/* Grid de Productos */}
              <Card className="bg-card border-border flex-1 overflow-hidden min-h-0">
                <ScrollArea className="h-full">
                  <div className="p-3">
                    {vistaProductos === "grid" ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                        {productosFiltrados.map((producto) => (
                          <button
                            key={producto.id}
                            onClick={() => agregarAlCarrito(producto)}
                            className="p-3 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 hover:border-primary/50 transition-all text-left group relative"
                          >
                            {producto.favorito && (
                              <Star className="absolute top-2 right-2 h-4 w-4 text-yellow-500 fill-yellow-500" />
                            )}
                            {producto.descuento > 0 && (
                              <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                                -{producto.descuento}%
                              </Badge>
                            )}
                            <div className="aspect-square rounded-lg bg-muted/50 mb-2 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              {producto.pesable ? (
                                <Scale className="h-10 w-10 text-muted-foreground/50" />
                              ) : (
                                <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
                              )}
                            </div>
                            <p className="text-sm font-medium line-clamp-2 mb-1 min-h-[2.5rem]">{producto.nombre}</p>
                            <div className="flex items-center justify-between">
                              <div>
                                {producto.descuento > 0 ? (
                                  <>
                                    <span className="text-xs text-muted-foreground line-through">
                                      {formatCurrency(producto.precio)}
                                    </span>
                                    <span className="text-sm font-bold text-primary block">
                                      {formatCurrency(producto.precio * (1 - producto.descuento / 100))}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-sm font-bold text-primary">
                                    {formatCurrency(producto.precio)}
                                  </span>
                                )}
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-xs ${producto.stock < 10 ? "text-red-500 border-red-500/30" : ""}`}
                              >
                                {producto.stock} uds
                              </Badge>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {productosFiltrados.map((producto) => (
                          <button
                            key={producto.id}
                            onClick={() => agregarAlCarrito(producto)}
                            className="w-full p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/60 hover:border-primary/50 transition-all flex items-center gap-4"
                          >
                            <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                              <ShoppingBag className="h-6 w-6 text-muted-foreground/50" />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-medium">{producto.nombre}</p>
                              <p className="text-xs text-muted-foreground">Código: {producto.codigo}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">{formatCurrency(producto.precio)}</p>
                              <Badge variant="outline" className="text-xs">
                                {producto.stock} uds
                              </Badge>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </Card>

              {/* Accesos Rápidos */}
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" className="bg-transparent gap-2 flex-1">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Producto Rápido (F2)
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent gap-2 flex-1">
                  <Calculator className="h-4 w-4 text-blue-500" />
                  Calculadora (F3)
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent gap-2 flex-1">
                  <Bot className="h-4 w-4 text-purple-500" />
                  Asistente AI (F4)
                </Button>
              </div>
            </div>

            {/* Panel de Carrito */}
            <Card className="bg-card border-border flex flex-col min-h-0">
              <CardHeader className="py-3 border-b border-border shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm">Ticket de Venta</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {totalItems} items
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={pausarVenta}
                      disabled={carrito.length === 0}
                    >
                      <Pause className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive"
                      onClick={limpiarCarrito}
                      disabled={carrito.length === 0}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                {/* Cliente */}
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent text-xs justify-start h-10"
                    onClick={() => setShowClienteModal(true)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <p className="font-medium">{clienteSeleccionado?.nombre || "Cliente General"}</p>
                      {clienteSeleccionado && (
                        <p className="text-muted-foreground text-[10px]">
                          {clienteSeleccionado.tipo}: {clienteSeleccionado.documento}
                        </p>
                      )}
                    </div>
                  </Button>
                  {clienteSeleccionado && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setClienteSeleccionado(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>

              {/* Items del Carrito */}
              <ScrollArea className="flex-1 min-h-0">
                <div className="p-3 space-y-2">
                  {carrito.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <ShoppingBag className="h-12 w-12 mb-3 opacity-50" />
                      <p className="text-sm">Carrito vacío</p>
                      <p className="text-xs">Escanea o busca productos</p>
                    </div>
                  ) : (
                    carrito.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30 group">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{item.nombre}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">{formatCurrency(item.precio)} c/u</p>
                            {item.descuento > 0 && (
                              <Badge className="text-[10px] bg-red-500/20 text-red-500 h-4">-{item.descuento}%</Badge>
                            )}
                            {item.iva > 0 && (
                              <Badge variant="outline" className="text-[10px] h-4">
                                IVA {item.iva}%
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => modificarCantidad(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            value={item.cantidad}
                            onChange={(e) => {
                              const val = Number.parseInt(e.target.value) || 0
                              if (val > 0) {
                                setCarrito(carrito.map((i) => (i.id === item.id ? { ...i, cantidad: val } : i)))
                              }
                            }}
                            className="w-12 h-7 text-center text-sm bg-secondary/50 px-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => modificarCantidad(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => eliminarDelCarrito(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm font-bold w-24 text-right">
                          {formatCurrency(item.precio * item.cantidad * (1 - item.descuento / 100))}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>

              {/* Nota de venta */}
              {carrito.length > 0 && (
                <div className="px-3 pb-2 shrink-0">
                  <Input
                    placeholder="Agregar nota a la venta..."
                    value={notaVenta}
                    onChange={(e) => setNotaVenta(e.target.value)}
                    className="text-xs bg-secondary/50 h-8"
                  />
                </div>
              )}

              {/* Totales */}
              <div className="p-3 border-t border-border space-y-1 shrink-0 bg-secondary/20">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IVA</span>
                  <span>{formatCurrency(iva)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Percent className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Dcto. Global</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={descuentoGlobal}
                      onChange={(e) => setDescuentoGlobal(Number(e.target.value))}
                      className="w-14 h-6 text-xs text-right bg-secondary/50"
                      max={100}
                      min={0}
                    />
                    <span className="text-xs text-muted-foreground">%</span>
                  </div>
                </div>
                {descuentos > 0 && (
                  <div className="flex justify-between text-sm text-green-500">
                    <span>Ahorro total</span>
                    <span>-{formatCurrency(descuentos)}</span>
                  </div>
                )}
                {clienteSeleccionado && (
                  <div className="flex justify-between text-sm text-yellow-500">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Puntos a acumular
                    </span>
                    <span>+{Math.floor(total / 1000)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between text-xl font-bold">
                  <span>TOTAL</span>
                  <span className="text-primary">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Métodos de Pago */}
              <div className="p-3 border-t border-border shrink-0">
                <p className="text-xs text-muted-foreground mb-2">Método de Pago</p>
                <div className="grid grid-cols-4 gap-1">
                  {metodoPago.map((mp) => (
                    <Button
                      key={mp.id}
                      variant={metodoPagoSeleccionado === mp.id ? "default" : "outline"}
                      size="sm"
                      className={`h-14 flex-col gap-1 text-[10px] ${metodoPagoSeleccionado === mp.id ? "" : "bg-transparent"}`}
                      onClick={() => setMetodoPagoSeleccionado(mp.id)}
                    >
                      <mp.icono className={`h-5 w-5 ${metodoPagoSeleccionado === mp.id ? "" : mp.color}`} />
                      {mp.nombre}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Acciones */}
              <div className="p-3 border-t border-border space-y-2 shrink-0">
                <Button
                  className="w-full gap-2 h-14 text-lg"
                  size="lg"
                  disabled={carrito.length === 0 || !cajaAbierta}
                  onClick={() => setShowCobroModal(true)}
                >
                  <CircleDollarSign className="h-6 w-6" />
                  Cobrar {formatCurrency(total)}
                </Button>
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent gap-1 text-xs h-9">
                    <Gift className="h-3 w-3" />
                    Cupón
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent gap-1 text-xs h-9">
                    <FileText className="h-3 w-3" />
                    Cotizar
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent gap-1 text-xs h-9">
                    <Send className="h-3 w-3" />
                    Apartar
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent gap-1 text-xs h-9">
                    <Printer className="h-3 w-3" />
                    Imprimir
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Tiendas */}
        <TabsContent value="tiendas" className="space-y-4">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Banknote className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">$12.2M</p>
                    <p className="text-xs text-muted-foreground">Ventas hoy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Receipt className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">445</p>
                    <p className="text-xs text-muted-foreground">Transacciones</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">$27.4K</p>
                    <p className="text-xs text-muted-foreground">Ticket promedio</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">+8.5%</p>
                    <p className="text-xs text-muted-foreground">vs ayer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Store className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">4/4</p>
                    <p className="text-xs text-muted-foreground">Tiendas activas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ventas por hora */}
            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Ventas por Hora</CardTitle>
                <CardDescription>Comparación con meta del día</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesByHour}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="hora" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                      />
                      <Legend />
                      <Bar dataKey="ventas" name="Ventas" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="meta" name="Meta" fill="#475569" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Métodos de pago */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Métodos de Pago</CardTitle>
                <CardDescription>Distribución del día</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={salesByPaymentMethod}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {salesByPaymentMethod.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grid de Tiendas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stores.map((store) => (
              <Card
                key={store.id}
                className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${store.estado === "online" ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
                      />
                      <span className="font-medium text-foreground">{store.nombre}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        store.estado === "online"
                          ? "text-green-500 border-green-500/30"
                          : "text-red-500 border-red-500/30"
                      }
                    >
                      {store.estado}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">
                        {store.direccion}, {store.ciudad}
                      </span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Ventas</p>
                        <p className="font-bold">{formatCurrency(store.ventas)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Transacciones</p>
                        <p className="font-bold">{store.transacciones}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Cajas</p>
                        <p className="font-bold">
                          {store.cajasActivas}/{store.cajas}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Empleados</p>
                        <p className="font-bold">{store.empleados}</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-3 gap-1">
                    Ver detalle <ChevronRight className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Cajeros */}
        <TabsContent value="cajeros" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cajeros.map((cajero) => (
              <Card key={cajero.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                        cajero.estado === "activo"
                          ? "bg-green-500/20 text-green-500"
                          : cajero.estado === "pendiente"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {cajero.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{cajero.nombre}</p>
                      <p className="text-xs text-muted-foreground">{cajero.turno}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        cajero.estado === "activo"
                          ? "text-green-500 border-green-500/30"
                          : cajero.estado === "pendiente"
                            ? "text-yellow-500 border-yellow-500/30"
                            : "text-muted-foreground"
                      }
                    >
                      {cajero.estado}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Caja asignada</span>
                      <span className="font-medium">{cajero.caja ? `Caja ${cajero.caja}` : "Sin asignar"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ventas</span>
                      <span className="font-medium">{formatCurrency(cajero.ventas)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Transacciones</span>
                      <span className="font-medium">{cajero.transacciones}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tiempo promedio</span>
                      <span className="font-medium">{cajero.tiempoPromedio}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Dispositivos */}
        <TabsContent value="dispositivos" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Dispositivos Conectados</CardTitle>
                  <CardDescription>Gestión de periféricos del punto de venta</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <RefreshCw className="h-4 w-4" />
                    Escanear
                  </Button>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Agregar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className="p-4 rounded-lg border border-border bg-secondary/30 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`p-2 rounded-lg ${device.estado === "conectado" ? "bg-green-500/20" : "bg-red-500/20"}`}
                      >
                        {device.tipo.includes("Impresora") && (
                          <Printer
                            className={`h-5 w-5 ${device.estado === "conectado" ? "text-green-500" : "text-red-500"}`}
                          />
                        )}
                        {device.tipo.includes("Lector") && (
                          <Barcode
                            className={`h-5 w-5 ${device.estado === "conectado" ? "text-green-500" : "text-red-500"}`}
                          />
                        )}
                        {device.tipo.includes("Báscula") && (
                          <Scale
                            className={`h-5 w-5 ${device.estado === "conectado" ? "text-green-500" : "text-red-500"}`}
                          />
                        )}
                        {device.tipo.includes("Datáfono") && (
                          <CreditCard
                            className={`h-5 w-5 ${device.estado === "conectado" ? "text-green-500" : "text-red-500"}`}
                          />
                        )}
                        {device.tipo.includes("Cajón") && (
                          <DollarSign
                            className={`h-5 w-5 ${device.estado === "conectado" ? "text-green-500" : "text-red-500"}`}
                          />
                        )}
                        {device.tipo.includes("Pantalla") && (
                          <Monitor
                            className={`h-5 w-5 ${device.estado === "conectado" ? "text-green-500" : "text-red-500"}`}
                          />
                        )}
                        {device.tipo.includes("Scanner") && (
                          <ScanLine
                            className={`h-5 w-5 ${device.estado === "conectado" ? "text-green-500" : "text-red-500"}`}
                          />
                        )}
                        {device.tipo.includes("Tablet") && (
                          <Tablet
                            className={`h-5 w-5 ${device.estado === "conectado" ? "text-green-500" : "text-red-500"}`}
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {device.bateria !== null && (
                          <Badge
                            variant="outline"
                            className={
                              device.bateria < 20
                                ? "text-red-500"
                                : device.bateria < 50
                                  ? "text-yellow-500"
                                  : "text-green-500"
                            }
                          >
                            {device.bateria}%
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className={
                            device.estado === "conectado"
                              ? "text-green-500 border-green-500/30"
                              : "text-red-500 border-red-500/30"
                          }
                        >
                          {device.estado}
                        </Badge>
                      </div>
                    </div>
                    <p className="font-medium text-sm mb-1">{device.tipo}</p>
                    <p className="text-xs text-muted-foreground">{device.modelo}</p>
                    <p className="text-xs text-muted-foreground mt-1">Puerto: {device.puerto}</p>
                    <p className="text-xs text-muted-foreground">Última actividad: {device.ultimaActividad}</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent text-xs">
                        Probar
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reportes */}
        <TabsContent value="reportes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { titulo: "Ventas del Día", descripcion: "Reporte detallado por hora y cajero", icon: Receipt },
              { titulo: "Cierre de Caja", descripcion: "Resumen de arqueo y diferencias", icon: DollarSign },
              { titulo: "Productos Vendidos", descripcion: "Top productos y categorías", icon: ShoppingBag },
              { titulo: "Métodos de Pago", descripcion: "Distribución por tipo de pago", icon: CreditCard },
              { titulo: "Devoluciones", descripcion: "Notas crédito y anulaciones", icon: RotateCcw },
              { titulo: "Rendimiento Cajeros", descripcion: "Métricas por empleado", icon: Users },
            ].map((reporte, idx) => (
              <Card
                key={idx}
                className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <reporte.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{reporte.titulo}</p>
                      <p className="text-xs text-muted-foreground">{reporte.descripcion}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Historial */}
        <TabsContent value="historial" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Transacciones Recientes</CardTitle>
                <div className="flex gap-2">
                  <Input placeholder="Buscar transacción..." className="w-64 bg-secondary/50" />
                  <Button variant="outline" className="bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {transaccionesRecientes.map((txn) => (
                  <div
                    key={txn.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${txn.estado === "completada" ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <div className="w-24">
                      <p className="font-mono text-sm">{txn.id}</p>
                      <p className="text-xs text-muted-foreground">{txn.hora}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{txn.cliente}</p>
                      <p className="text-xs text-muted-foreground">
                        {txn.items} items · {txn.metodo}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(txn.total)}</p>
                      <Badge
                        variant="outline"
                        className={txn.estado === "completada" ? "text-green-500" : "text-red-500"}
                      >
                        {txn.estado}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Cliente */}
      <Dialog open={showClienteModal} onOpenChange={setShowClienteModal}>
        <DialogContent className="max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle>Seleccionar Cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Buscar por nombre o documento..." className="bg-secondary/50" />
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {clientes.map((cliente) => (
                  <button
                    key={cliente.id}
                    className="w-full p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 text-left transition-colors"
                    onClick={() => {
                      setClienteSeleccionado(cliente)
                      setShowClienteModal(false)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{cliente.nombre}</p>
                        <p className="text-xs text-muted-foreground">
                          {cliente.tipo}: {cliente.documento}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            cliente.nivel === "Platinum"
                              ? "bg-purple-500"
                              : cliente.nivel === "Gold"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                          }
                        >
                          {cliente.nivel}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{cliente.puntos} puntos</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              Crear Nuevo Cliente
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Cobro */}
      <Dialog open={showCobroModal} onOpenChange={setShowCobroModal}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle>Procesar Pago</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/10 text-center">
              <p className="text-sm text-muted-foreground">Total a cobrar</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(total)}</p>
            </div>

            <div className="space-y-2">
              <Label>Método de pago: {metodoPago.find((m) => m.id === metodoPagoSeleccionado)?.nombre}</Label>
              {metodoPagoSeleccionado === "efectivo" && (
                <>
                  <Input
                    type="number"
                    placeholder="Monto recibido"
                    value={montoRecibido}
                    onChange={(e) => setMontoRecibido(e.target.value)}
                    className="text-2xl h-14 text-center bg-secondary/50"
                  />
                  <div className="grid grid-cols-4 gap-2">
                    {[50000, 100000, 150000, 200000].map((monto) => (
                      <Button
                        key={monto}
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                        onClick={() => setMontoRecibido(monto.toString())}
                      >
                        {formatCurrency(monto)}
                      </Button>
                    ))}
                  </div>
                  {Number.parseFloat(montoRecibido) >= total && (
                    <div className="p-3 rounded-lg bg-green-500/10 text-center">
                      <p className="text-sm text-muted-foreground">Cambio a devolver</p>
                      <p className="text-2xl font-bold text-green-500">{formatCurrency(cambio)}</p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowCobroModal(false)}>
                Cancelar
              </Button>
              <Button
                className="flex-1 gap-2"
                disabled={metodoPagoSeleccionado === "efectivo" && Number.parseFloat(montoRecibido) < total}
              >
                <CheckCircle2 className="h-4 w-4" />
                Confirmar Pago
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
