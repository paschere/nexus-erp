"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Send,
  Copy,
  Clock,
  TrendingUp,
  DollarSign,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  ArrowRight,
  Calculator,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const cotizaciones = [
  {
    id: "COT-2024-001",
    cliente: "Industrias ABC S.A.S",
    contacto: "María García",
    email: "maria@industriasabc.com",
    fecha: "2024-01-15",
    vencimiento: "2024-01-30",
    total: 45680000,
    estado: "enviada",
    probabilidad: 75,
    productos: 8,
    seguimientos: 3,
  },
  {
    id: "COT-2024-002",
    cliente: "Comercial XYZ Ltda",
    contacto: "Carlos Rodríguez",
    email: "carlos@comercialxyz.com",
    fecha: "2024-01-14",
    vencimiento: "2024-01-29",
    total: 28350000,
    estado: "negociacion",
    probabilidad: 60,
    productos: 5,
    seguimientos: 5,
  },
  {
    id: "COT-2024-003",
    cliente: "Tech Solutions",
    contacto: "Ana Martínez",
    email: "ana@techsolutions.co",
    fecha: "2024-01-13",
    vencimiento: "2024-01-28",
    total: 156200000,
    estado: "borrador",
    probabilidad: 30,
    productos: 15,
    seguimientos: 1,
  },
  {
    id: "COT-2024-004",
    cliente: "Grupo Empresarial Norte",
    contacto: "Pedro López",
    email: "pedro@grupnorte.com",
    fecha: "2024-01-12",
    vencimiento: "2024-01-27",
    total: 89450000,
    estado: "ganada",
    probabilidad: 100,
    productos: 12,
    seguimientos: 7,
  },
  {
    id: "COT-2024-005",
    cliente: "Distribuidora Sur",
    contacto: "Laura Sánchez",
    email: "laura@distrisur.com",
    fecha: "2024-01-10",
    vencimiento: "2024-01-25",
    total: 34800000,
    estado: "perdida",
    probabilidad: 0,
    productos: 6,
    seguimientos: 4,
  },
]

const plantillas = [
  { id: 1, nombre: "Cotización Estándar", productos: 0, uso: 156 },
  { id: 2, nombre: "Proyecto Enterprise", productos: 10, uso: 89 },
  { id: 3, nombre: "Servicios Mensuales", productos: 5, uso: 67 },
  { id: 4, nombre: "Mantenimiento Anual", productos: 3, uso: 45 },
]

export function CotizacionesModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [estadoFilter, setEstadoFilter] = useState("todos")
  const [showNewQuote, setShowNewQuote] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<(typeof cotizaciones)[0] | null>(null)

  const getEstadoBadge = (estado: string) => {
    const styles: Record<string, string> = {
      borrador: "bg-gray-500/20 text-gray-400",
      enviada: "bg-blue-500/20 text-blue-400",
      negociacion: "bg-yellow-500/20 text-yellow-400",
      ganada: "bg-green-500/20 text-green-400",
      perdida: "bg-red-500/20 text-red-400",
    }
    const labels: Record<string, string> = {
      borrador: "Borrador",
      enviada: "Enviada",
      negociacion: "Negociación",
      ganada: "Ganada",
      perdida: "Perdida",
    }
    return <Badge className={styles[estado]}>{labels[estado]}</Badge>
  }

  const stats = {
    total: cotizaciones.length,
    valorTotal: cotizaciones.reduce((acc, c) => acc + c.total, 0),
    tasaConversion: Math.round((cotizaciones.filter((c) => c.estado === "ganada").length / cotizaciones.length) * 100),
    promedioVenta: Math.round(
      cotizaciones.filter((c) => c.estado === "ganada").reduce((acc, c) => acc + c.total, 0) /
        cotizaciones.filter((c) => c.estado === "ganada").length,
    ),
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cotizaciones</h1>
          <p className="text-muted-foreground">Gestiona propuestas comerciales y presupuestos</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Sparkles className="h-4 w-4" />
            Generar con AI
          </Button>
          <Dialog open={showNewQuote} onOpenChange={setShowNewQuote}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary">
                <Plus className="h-4 w-4" />
                Nueva Cotización
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Nueva Cotización</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[70vh] pr-4">
                <div className="space-y-6 py-4">
                  {/* Cliente */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Cliente</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Industrias ABC S.A.S</SelectItem>
                          <SelectItem value="2">Comercial XYZ Ltda</SelectItem>
                          <SelectItem value="3">Tech Solutions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Contacto</Label>
                      <Input placeholder="Nombre del contacto" />
                    </div>
                  </div>

                  {/* Fechas */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Fecha</Label>
                      <Input type="date" defaultValue="2024-01-15" />
                    </div>
                    <div className="space-y-2">
                      <Label>Válida hasta</Label>
                      <Input type="date" defaultValue="2024-01-30" />
                    </div>
                    <div className="space-y-2">
                      <Label>Moneda</Label>
                      <Select defaultValue="cop">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cop">COP - Peso Colombiano</SelectItem>
                          <SelectItem value="usd">USD - Dólar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Productos */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Productos / Servicios</Label>
                      <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                        <Plus className="h-3 w-3" /> Agregar línea
                      </Button>
                    </div>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left p-3 font-medium">Producto</th>
                            <th className="text-center p-3 font-medium w-20">Cant.</th>
                            <th className="text-right p-3 font-medium w-32">Precio</th>
                            <th className="text-center p-3 font-medium w-20">Desc.</th>
                            <th className="text-right p-3 font-medium w-32">Subtotal</th>
                            <th className="w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-border">
                            <td className="p-2">
                              <Select>
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="Seleccionar..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">Licencia NEXUS ERP</SelectItem>
                                  <SelectItem value="2">Implementación</SelectItem>
                                  <SelectItem value="3">Capacitación</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="p-2">
                              <Input type="number" className="h-8 text-center" defaultValue="1" />
                            </td>
                            <td className="p-2">
                              <Input type="number" className="h-8 text-right" defaultValue="5000000" />
                            </td>
                            <td className="p-2">
                              <Input type="number" className="h-8 text-center" defaultValue="0" />
                            </td>
                            <td className="p-2 text-right font-medium">$5,000,000</td>
                            <td className="p-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Totales */}
                  <div className="flex justify-end">
                    <div className="w-72 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>$5,000,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">IVA (19%)</span>
                        <span>$950,000</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-border font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">$5,950,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Notas */}
                  <div className="space-y-2">
                    <Label>Notas / Términos</Label>
                    <Textarea placeholder="Condiciones de pago, garantías, observaciones..." rows={3} />
                  </div>
                </div>
              </ScrollArea>
              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setShowNewQuote(false)}>
                  Cancelar
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <FileText className="h-4 w-4" /> Guardar Borrador
                </Button>
                <Button className="gap-2 bg-primary">
                  <Send className="h-4 w-4" /> Guardar y Enviar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cotizaciones Activas</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor en Pipeline</p>
                <p className="text-2xl font-bold">${(stats.valorTotal / 1000000).toFixed(0)}M</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasa Conversión</p>
                <p className="text-2xl font-bold">{stats.tasaConversion}%</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ticket Promedio</p>
                <p className="text-2xl font-bold">${(stats.promedioVenta / 1000000).toFixed(1)}M</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Calculator className="h-5 w-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="lista" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="lista">Lista</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="plantillas">Plantillas</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cotizaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64 bg-muted/50"
              />
            </div>
            <Select value={estadoFilter} onValueChange={setEstadoFilter}>
              <SelectTrigger className="w-40 bg-muted/50">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="borrador">Borrador</SelectItem>
                <SelectItem value="enviada">Enviada</SelectItem>
                <SelectItem value="negociacion">Negociación</SelectItem>
                <SelectItem value="ganada">Ganada</SelectItem>
                <SelectItem value="perdida">Perdida</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="lista">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr className="text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">Cotización</th>
                    <th className="p-4 font-medium">Cliente</th>
                    <th className="p-4 font-medium">Fecha</th>
                    <th className="p-4 font-medium">Vencimiento</th>
                    <th className="p-4 font-medium text-right">Total</th>
                    <th className="p-4 font-medium">Estado</th>
                    <th className="p-4 font-medium text-center">Prob.</th>
                    <th className="p-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {cotizaciones.map((cot) => (
                    <tr
                      key={cot.id}
                      className="border-t border-border hover:bg-muted/20 cursor-pointer"
                      onClick={() => setSelectedQuote(cot)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="font-medium">{cot.id}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{cot.cliente}</p>
                          <p className="text-sm text-muted-foreground">{cot.contacto}</p>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{cot.fecha}</td>
                      <td className="p-4 text-muted-foreground">{cot.vencimiento}</td>
                      <td className="p-4 text-right font-medium">${cot.total.toLocaleString()}</td>
                      <td className="p-4">{getEstadoBadge(cot.estado)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Progress value={cot.probabilidad} className="h-2 w-16" />
                          <span className="text-sm text-muted-foreground">{cot.probabilidad}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" /> Ver
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" /> Duplicar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 mr-2" /> Enviar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ArrowRight className="h-4 w-4 mr-2" /> Convertir a Venta
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" /> Descargar PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400">
                              <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline">
          <div className="grid grid-cols-5 gap-4">
            {["borrador", "enviada", "negociacion", "ganada", "perdida"].map((estado) => (
              <div key={estado} className="space-y-3">
                <div className="flex items-center justify-between px-2">
                  <h3 className="font-medium capitalize">{estado}</h3>
                  <Badge variant="secondary">{cotizaciones.filter((c) => c.estado === estado).length}</Badge>
                </div>
                <div className="space-y-2">
                  {cotizaciones
                    .filter((c) => c.estado === estado)
                    .map((cot) => (
                      <Card
                        key={cot.id}
                        className="bg-card border-border hover:border-primary/50 cursor-pointer transition-colors"
                      >
                        <CardContent className="p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{cot.id}</span>
                            <span className="text-xs text-muted-foreground">{cot.probabilidad}%</span>
                          </div>
                          <p className="font-medium text-sm">{cot.cliente}</p>
                          <p className="text-lg font-bold text-primary">${(cot.total / 1000000).toFixed(1)}M</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Vence: {cot.vencimiento}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plantillas">
          <div className="grid grid-cols-4 gap-4">
            {plantillas.map((plantilla) => (
              <Card
                key={plantilla.id}
                className="bg-card border-border hover:border-primary/50 cursor-pointer transition-colors"
              >
                <CardContent className="p-4 space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">{plantilla.nombre}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{plantilla.productos} productos</span>
                    <span>{plantilla.uso} usos</span>
                  </div>
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <Plus className="h-4 w-4" /> Usar Plantilla
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Card className="bg-card border-border border-dashed hover:border-primary/50 cursor-pointer transition-colors">
              <CardContent className="p-4 h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <Plus className="h-8 w-8" />
                <span>Nueva Plantilla</span>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Conversión por Mes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end gap-2">
                  {[65, 72, 58, 80, 75, 85].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-primary/20 rounded-t" style={{ height: `${val * 2}px` }}>
                        <div className="w-full bg-primary rounded-t" style={{ height: `${val}%` }}></div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {["Ago", "Sep", "Oct", "Nov", "Dic", "Ene"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Razones de Pérdida</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { razon: "Precio muy alto", porcentaje: 35 },
                  { razon: "Competencia", porcentaje: 25 },
                  { razon: "No responde", porcentaje: 20 },
                  { razon: "Proyecto cancelado", porcentaje: 12 },
                  { razon: "Otros", porcentaje: 8 },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.razon}</span>
                      <span className="text-muted-foreground">{item.porcentaje}%</span>
                    </div>
                    <Progress value={item.porcentaje} className="h-2" />
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
