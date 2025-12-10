"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  Building2,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Star,
  StarOff,
  MoreHorizontal,
  TrendingUp,
  DollarSign,
  Calendar,
  FileText,
  Tag,
  Eye,
  Edit,
  Download,
  Upload,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const kpis = [
  { label: "Total Contactos", value: "2,456", change: "+45", icon: Users },
  { label: "Clientes Activos", value: "892", change: "+12", icon: Building2 },
  { label: "Leads Este Mes", value: "156", change: "+28", icon: TrendingUp },
  { label: "Valor Potencial", value: "$890M", change: "+15%", icon: DollarSign },
]

const contactos = [
  {
    id: 1,
    nombre: "Carlos Rodríguez",
    empresa: "Constructora ABC S.A.S",
    cargo: "Gerente de Compras",
    email: "carlos.rodriguez@abc.com",
    telefono: "+57 310 234 5678",
    ciudad: "Bogotá",
    tipo: "cliente",
    segmento: "Enterprise",
    valor: 450000000,
    ultimoContacto: "2024-12-05",
    favorito: true,
    tags: ["VIP", "Construcción"],
  },
  {
    id: 2,
    nombre: "María González",
    empresa: "Distribuidora XYZ Ltda",
    cargo: "Directora Comercial",
    email: "maria.gonzalez@xyz.com",
    telefono: "+57 315 876 5432",
    ciudad: "Medellín",
    tipo: "cliente",
    segmento: "PYME",
    valor: 180000000,
    ultimoContacto: "2024-12-06",
    favorito: false,
    tags: ["Distribución"],
  },
  {
    id: 3,
    nombre: "Andrés Martínez",
    empresa: "Industrias Delta S.A.",
    cargo: "Jefe de Operaciones",
    email: "andres.martinez@delta.co",
    telefono: "+57 320 111 2233",
    ciudad: "Cali",
    tipo: "lead",
    segmento: "Enterprise",
    valor: 320000000,
    ultimoContacto: "2024-12-04",
    favorito: true,
    tags: ["Manufactura", "Potencial"],
  },
  {
    id: 4,
    nombre: "Laura Hernández",
    empresa: "Comercializadora Norte",
    cargo: "CEO",
    email: "laura@cnorte.com",
    telefono: "+57 300 555 6666",
    ciudad: "Barranquilla",
    tipo: "prospecto",
    segmento: "PYME",
    valor: 95000000,
    ultimoContacto: "2024-12-01",
    favorito: false,
    tags: ["Retail"],
  },
  {
    id: 5,
    nombre: "Pedro Sánchez",
    empresa: "Tech Solutions S.A.S",
    cargo: "CTO",
    email: "pedro.sanchez@techsol.co",
    telefono: "+57 318 999 8888",
    ciudad: "Bogotá",
    tipo: "cliente",
    segmento: "Startup",
    valor: 65000000,
    ultimoContacto: "2024-12-07",
    favorito: false,
    tags: ["Tecnología", "SaaS"],
  },
]

const actividadReciente = [
  { tipo: "email", contacto: "Carlos Rodríguez", detalle: "Cotización enviada", fecha: "Hace 2 horas" },
  { tipo: "llamada", contacto: "María González", detalle: "Seguimiento pedido", fecha: "Hace 5 horas" },
  { tipo: "reunion", contacto: "Andrés Martínez", detalle: "Demo producto", fecha: "Ayer" },
  { tipo: "nota", contacto: "Laura Hernández", detalle: "Interesada en módulo POS", fecha: "Hace 2 días" },
]

export function ContactosModule() {
  const [activeTab, setActiveTab] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [vistaLista, setVistaLista] = useState(true)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  const contactosFiltrados = contactos.filter((c) => {
    const matchSearch =
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchTab = activeTab === "todos" || c.tipo === activeTab || (activeTab === "favoritos" && c.favorito)
    return matchSearch && matchTab
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contactos & Clientes</h1>
          <p className="text-muted-foreground">Gestión centralizada de clientes, leads y prospectos</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Upload className="h-4 w-4" />
            Importar
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Contacto
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-primary/10">
                  <kpi.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="outline" className="text-xs text-green-500">
                  {kpi.change}
                </Badge>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Lista de Contactos */}
        <div className="lg:col-span-3 space-y-4">
          {/* Filtros */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, empresa, email..."
                    className="pl-10 bg-secondary/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select defaultValue="todos-segmentos">
                  <SelectTrigger className="w-[150px] bg-secondary/50">
                    <SelectValue placeholder="Segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos-segmentos">Todos</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                    <SelectItem value="pyme">PYME</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="todas-ciudades">
                  <SelectTrigger className="w-[150px] bg-secondary/50">
                    <SelectValue placeholder="Ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas-ciudades">Todas</SelectItem>
                    <SelectItem value="bogota">Bogotá</SelectItem>
                    <SelectItem value="medellin">Medellín</SelectItem>
                    <SelectItem value="cali">Cali</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs y Lista */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-secondary/50">
                  <TabsTrigger value="todos">Todos ({contactos.length})</TabsTrigger>
                  <TabsTrigger value="cliente">
                    Clientes ({contactos.filter((c) => c.tipo === "cliente").length})
                  </TabsTrigger>
                  <TabsTrigger value="lead">Leads ({contactos.filter((c) => c.tipo === "lead").length})</TabsTrigger>
                  <TabsTrigger value="prospecto">
                    Prospectos ({contactos.filter((c) => c.tipo === "prospecto").length})
                  </TabsTrigger>
                  <TabsTrigger value="favoritos">Favoritos ({contactos.filter((c) => c.favorito).length})</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Segmento</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="w-[100px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactosFiltrados.map((contacto) => (
                    <TableRow key={contacto.id} className="border-border hover:bg-secondary/30 cursor-pointer">
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          {contacto.favorito ? (
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          ) : (
                            <StarOff className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {contacto.nombre
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{contacto.nombre}</p>
                            <p className="text-xs text-muted-foreground">{contacto.cargo}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{contacto.empresa}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-xs flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {contacto.email}
                          </p>
                          <p className="text-xs flex items-center gap-1 text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {contacto.telefono}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <Badge
                            variant="outline"
                            className={
                              contacto.tipo === "cliente"
                                ? "text-green-500 border-green-500/30"
                                : contacto.tipo === "lead"
                                  ? "text-blue-500 border-blue-500/30"
                                  : "text-yellow-500 border-yellow-500/30"
                            }
                          >
                            {contacto.tipo}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {contacto.segmento}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <p className="font-medium">{formatCurrency(contacto.valor)}</p>
                        <p className="text-xs text-muted-foreground">Último: {contacto.ultimoContacto}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-4">
          {/* Actividad Reciente */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-3">
                  {actividadReciente.map((act, idx) => (
                    <div key={idx} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                      <div
                        className={`p-1.5 rounded-lg ${
                          act.tipo === "email"
                            ? "bg-blue-500/10"
                            : act.tipo === "llamada"
                              ? "bg-green-500/10"
                              : act.tipo === "reunion"
                                ? "bg-purple-500/10"
                                : "bg-yellow-500/10"
                        }`}
                      >
                        {act.tipo === "email" && <Mail className="h-3 w-3 text-blue-500" />}
                        {act.tipo === "llamada" && <Phone className="h-3 w-3 text-green-500" />}
                        {act.tipo === "reunion" && <Calendar className="h-3 w-3 text-purple-500" />}
                        {act.tipo === "nota" && <FileText className="h-3 w-3 text-yellow-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium">{act.contacto}</p>
                        <p className="text-xs text-muted-foreground truncate">{act.detalle}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{act.fecha}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Segmentos */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Segmentos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { nombre: "Enterprise", cantidad: 45, color: "bg-purple-500" },
                { nombre: "PYME", cantidad: 120, color: "bg-blue-500" },
                { nombre: "Startup", cantidad: 32, color: "bg-green-500" },
                { nombre: "Individual", cantidad: 15, color: "bg-yellow-500" },
              ].map((seg, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/30 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${seg.color}`} />
                    <span className="text-sm">{seg.nombre}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {seg.cantidad}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tags Populares */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Tags Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "VIP",
                  "Construcción",
                  "Retail",
                  "Tecnología",
                  "Manufactura",
                  "Distribución",
                  "SaaS",
                  "Potencial",
                ].map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary/20">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
