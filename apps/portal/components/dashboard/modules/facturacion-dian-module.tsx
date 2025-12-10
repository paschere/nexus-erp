"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  FileText,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Eye,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  FileCheck,
  FileMinus,
  FileX,
  Mail,
  MoreHorizontal,
  Zap,
  Settings,
  Shield,
  Key,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts"

const kpis = [
  { label: "Facturas Emitidas", value: "1,234", change: "+45 hoy", icon: FileText, color: "text-primary" },
  { label: "Aceptadas DIAN", value: "1,198", change: "97.1%", icon: CheckCircle2, color: "text-green-500" },
  { label: "Pendientes", value: "28", change: "-5", icon: Clock, color: "text-yellow-500" },
  { label: "Rechazadas", value: "8", change: "0.6%", icon: XCircle, color: "text-red-500" },
]

const facturasMes = [
  { semana: "Sem 1", facturas: 245, valor: 890 },
  { semana: "Sem 2", facturas: 312, valor: 1120 },
  { semana: "Sem 3", facturas: 287, valor: 980 },
  { semana: "Sem 4", facturas: 390, valor: 1450 },
]

const tiposDocumento = [
  { name: "Factura Venta", value: 65, color: "#22c55e" },
  { name: "Nota Crédito", value: 18, color: "#f59e0b" },
  { name: "Nota Débito", value: 7, color: "#6366f1" },
  { name: "Doc. Soporte", value: 10, color: "#ec4899" },
]

const facturas = [
  {
    numero: "FE-2024-001567",
    tipo: "Factura",
    cliente: "Constructora ABC S.A.S",
    nit: "900.123.456-7",
    fecha: "2024-12-07",
    valor: 12500000,
    iva: 2375000,
    total: 14875000,
    estado: "aceptada",
    cufe: "abc123def456...",
  },
  {
    numero: "FE-2024-001566",
    tipo: "Factura",
    cliente: "Distribuidora XYZ Ltda",
    nit: "800.987.654-3",
    fecha: "2024-12-07",
    valor: 8900000,
    iva: 1691000,
    total: 10591000,
    estado: "aceptada",
    cufe: "xyz789ghi012...",
  },
  {
    numero: "NC-2024-000089",
    tipo: "Nota Crédito",
    cliente: "Industrias Delta S.A.",
    nit: "860.456.789-1",
    fecha: "2024-12-07",
    valor: 2500000,
    iva: 475000,
    total: 2975000,
    estado: "pendiente",
    cufe: null,
  },
  {
    numero: "FE-2024-001565",
    tipo: "Factura",
    cliente: "Comercializadora Norte",
    nit: "901.234.567-8",
    fecha: "2024-12-06",
    valor: 45000000,
    iva: 8550000,
    total: 53550000,
    estado: "aceptada",
    cufe: "mno345pqr678...",
  },
  {
    numero: "DS-2024-000034",
    tipo: "Doc. Soporte",
    cliente: "Proveedor Informal",
    nit: "CC 12345678",
    fecha: "2024-12-06",
    valor: 1200000,
    iva: 0,
    total: 1200000,
    estado: "rechazada",
    cufe: null,
  },
]

const resolucionesDIAN = [
  {
    tipo: "Factura Electrónica",
    resolucion: "18764000001234",
    prefijo: "FE",
    desde: 1,
    hasta: 10000,
    usado: 1567,
    vigencia: "2025-06-15",
  },
  {
    tipo: "Nota Crédito",
    resolucion: "18764000001235",
    prefijo: "NC",
    desde: 1,
    hasta: 5000,
    usado: 89,
    vigencia: "2025-06-15",
  },
  {
    tipo: "Documento Soporte",
    resolucion: "18764000001236",
    prefijo: "DS",
    desde: 1,
    hasta: 2000,
    usado: 34,
    vigencia: "2025-06-15",
  },
]

export function FacturacionDIANModule() {
  const [activeTab, setActiveTab] = useState("documentos")
  const [showCrearFactura, setShowCrearFactura] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Facturación Electrónica</h1>
          <p className="text-muted-foreground">Emisión de documentos electrónicos - DIAN Colombia</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-500 border-green-500/30">
            <Shield className="h-3 w-3 mr-1" />
            Habilitado DIAN
          </Badge>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Configuración
          </Button>
          <Button size="sm" className="gap-2" onClick={() => setShowCrearFactura(true)}>
            <Plus className="h-4 w-4" />
            Nueva Factura
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-secondary`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <Badge variant="outline" className="text-xs">
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          <TabsTrigger value="resoluciones">Resoluciones</TabsTrigger>
          <TabsTrigger value="configuracion">Configuración</TabsTrigger>
        </TabsList>

        {/* Documentos */}
        <TabsContent value="documentos" className="space-y-4">
          {/* Filtros */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar por número, cliente, NIT..." className="pl-10 bg-secondary/50" />
                </div>
                <Select defaultValue="todos">
                  <SelectTrigger className="w-[150px] bg-secondary/50">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="factura">Factura</SelectItem>
                    <SelectItem value="nota-credito">Nota Crédito</SelectItem>
                    <SelectItem value="nota-debito">Nota Débito</SelectItem>
                    <SelectItem value="doc-soporte">Doc. Soporte</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="todos-estados">
                  <SelectTrigger className="w-[150px] bg-secondary/50">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos-estados">Todos</SelectItem>
                    <SelectItem value="aceptada">Aceptada</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="rechazada">Rechazada</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Calendar className="h-4 w-4" />
                  Fecha
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de Documentos */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Documentos Electrónicos</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Exportar
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <RefreshCw className="h-4 w-4" />
                    Sincronizar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Documento</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="w-[120px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facturas.map((factura) => (
                    <TableRow key={factura.numero} className="border-border">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {factura.tipo === "Factura" && <FileText className="h-4 w-4 text-primary" />}
                          {factura.tipo === "Nota Crédito" && <FileMinus className="h-4 w-4 text-yellow-500" />}
                          {factura.tipo === "Doc. Soporte" && <FileCheck className="h-4 w-4 text-purple-500" />}
                          <div>
                            <p className="font-mono text-sm font-medium">{factura.numero}</p>
                            <p className="text-xs text-muted-foreground">{factura.tipo}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{factura.cliente}</p>
                          <p className="text-xs text-muted-foreground">{factura.nit}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{factura.fecha}</TableCell>
                      <TableCell className="text-right">
                        <div>
                          <p className="font-medium">{formatCurrency(factura.total)}</p>
                          <p className="text-xs text-muted-foreground">IVA: {formatCurrency(factura.iva)}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            factura.estado === "aceptada"
                              ? "text-green-500 border-green-500/30"
                              : factura.estado === "pendiente"
                                ? "text-yellow-500 border-yellow-500/30"
                                : "text-red-500 border-red-500/30"
                          }
                        >
                          {factura.estado === "aceptada" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {factura.estado === "pendiente" && <Clock className="h-3 w-3 mr-1" />}
                          {factura.estado === "rechazada" && <XCircle className="h-3 w-3 mr-1" />}
                          {factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" title="Ver PDF">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" title="Descargar">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" title="Enviar">
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" title="Más">
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
        </TabsContent>

        {/* Estadísticas */}
        <TabsContent value="estadisticas" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Facturación Semanal */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Facturación del Mes</CardTitle>
                <CardDescription>Cantidad y valor por semana (millones COP)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={facturasMes}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="semana" stroke="#64748b" fontSize={12} />
                      <YAxis yAxisId="left" stroke="#64748b" fontSize={12} />
                      <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #334155",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar yAxisId="left" dataKey="facturas" fill="#2dd4bf" radius={[4, 4, 0, 0]} name="Facturas" />
                      <Bar yAxisId="right" dataKey="valor" fill="#6366f1" radius={[4, 4, 0, 0]} name="Valor (M)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Distribución por Tipo */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Distribución por Tipo</CardTitle>
                <CardDescription>Porcentaje de documentos emitidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tiposDocumento}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {tiposDocumento.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {tiposDocumento.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-muted-foreground">{item.name}</span>
                      <span className="text-xs font-medium ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumen Mensual */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Resumen del Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Facturado", valor: "$4,440M", icon: DollarSign },
                  { label: "IVA Generado", valor: "$843.6M", icon: TrendingUp },
                  { label: "Documentos Emitidos", valor: "1,234", icon: FileText },
                  { label: "Clientes Facturados", valor: "156", icon: Building2 },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                    <p className="text-xl font-bold">{item.valor}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resoluciones */}
        <TabsContent value="resoluciones" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Resoluciones de Numeración</CardTitle>
                  <CardDescription>Gestión de autorizaciones DIAN</CardDescription>
                </div>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Resolución
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resolucionesDIAN.map((res, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-border bg-secondary/20">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-primary border-primary/30">
                            {res.prefijo}
                          </Badge>
                          <span className="font-medium">{res.tipo}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Resolución: {res.resolucion}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Vence</p>
                        <p className="font-medium text-sm">{res.vigencia}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Rango</p>
                        <p className="font-medium">
                          {res.desde} - {res.hasta}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Usado</p>
                        <p className="font-medium">{res.usado}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Disponible</p>
                        <p className="font-medium">{res.hasta - res.usado}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Uso</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-secondary rounded-full">
                            <div
                              className="h-2 bg-primary rounded-full"
                              style={{ width: `${(res.usado / res.hasta) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs">{((res.usado / res.hasta) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configuración */}
        <TabsContent value="configuracion" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Datos del Emisor */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Datos del Emisor</CardTitle>
                <CardDescription>Información de la empresa para facturación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Razón Social</Label>
                    <Input defaultValue="Mi Empresa S.A.S" className="mt-1 bg-secondary/50" />
                  </div>
                  <div>
                    <Label className="text-xs">NIT</Label>
                    <Input defaultValue="900.123.456-7" className="mt-1 bg-secondary/50" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Dirección</Label>
                  <Input defaultValue="Cra 45 # 23-67, Bogotá D.C." className="mt-1 bg-secondary/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Teléfono</Label>
                    <Input defaultValue="+57 1 234 5678" className="mt-1 bg-secondary/50" />
                  </div>
                  <div>
                    <Label className="text-xs">Email</Label>
                    <Input defaultValue="facturacion@miempresa.com" className="mt-1 bg-secondary/50" />
                  </div>
                </div>
                <Button className="w-full">Guardar Cambios</Button>
              </CardContent>
            </Card>

            {/* Certificado Digital */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Certificado Digital</CardTitle>
                <CardDescription>Firma electrónica para documentos DIAN</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Shield className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Certificado Activo</p>
                      <p className="text-xs text-muted-foreground">Emitido por: Certicámara S.A.</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Serial</p>
                    <p className="font-mono">CERT-2024-XXXX</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Vigencia</p>
                    <p>2025-06-15</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Renovar
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Cambiar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Proveedor Tecnológico */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Proveedor Tecnológico</CardTitle>
                <CardDescription>Conexión con operador autorizado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">NEXUS PT</p>
                      <p className="text-xs text-muted-foreground">Proveedor Tecnológico Autorizado</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-500/30">
                    Conectado
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <Label className="text-xs">API Key</Label>
                    <div className="flex gap-2 mt-1">
                      <Input type="password" defaultValue="xxxxxxxxxxxxxx" className="bg-secondary/50" />
                      <Button variant="outline" size="icon" className="bg-transparent">
                        <Key className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Ambiente</Label>
                    <Select defaultValue="produccion">
                      <SelectTrigger className="bg-secondary/50 mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pruebas">Habilitación (Pruebas)</SelectItem>
                        <SelectItem value="produccion">Producción</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opciones de Envío */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Opciones de Envío</CardTitle>
                <CardDescription>Configuración de envío automático</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    label: "Envío automático al cliente",
                    desc: "Enviar factura por email al generar",
                    enabled: true,
                  },
                  { label: "Copia a contabilidad", desc: "Enviar copia al área contable", enabled: true },
                  { label: "Adjuntar XML", desc: "Incluir archivo XML en el email", enabled: false },
                  { label: "Notificar rechazo", desc: "Alertar cuando DIAN rechace", enabled: true },
                ].map((opt, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </div>
                    <Button
                      variant={opt.enabled ? "default" : "outline"}
                      size="sm"
                      className={opt.enabled ? "" : "bg-transparent"}
                    >
                      {opt.enabled ? "Activo" : "Inactivo"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal Crear Factura - Simplificado para el ejemplo */}
      {showCrearFactura && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto bg-card">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Nueva Factura Electrónica</CardTitle>
                  <CardDescription>Complete los datos para emitir la factura</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowCrearFactura(false)}>
                  <FileX className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Cliente */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cliente</Label>
                  <Select>
                    <SelectTrigger className="mt-1 bg-secondary/50">
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abc">Constructora ABC S.A.S</SelectItem>
                      <SelectItem value="xyz">Distribuidora XYZ Ltda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Forma de Pago</Label>
                  <Select>
                    <SelectTrigger className="mt-1 bg-secondary/50">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contado">Contado</SelectItem>
                      <SelectItem value="credito">Crédito</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Productos */}
              <div>
                <Label>Productos / Servicios</Label>
                <div className="mt-2 border border-border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead>Descripción</TableHead>
                        <TableHead className="w-[100px]">Cant.</TableHead>
                        <TableHead className="w-[150px]">Precio</TableHead>
                        <TableHead className="w-[100px]">IVA</TableHead>
                        <TableHead className="w-[150px] text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-border">
                        <TableCell>
                          <Input placeholder="Descripción del producto" className="bg-secondary/50" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" defaultValue="1" className="bg-secondary/50" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" placeholder="0" className="bg-secondary/50" />
                        </TableCell>
                        <TableCell>
                          <Select defaultValue="19">
                            <SelectTrigger className="bg-secondary/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0%</SelectItem>
                              <SelectItem value="5">5%</SelectItem>
                              <SelectItem value="19">19%</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right font-medium">$0</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  <Plus className="h-3 w-3 mr-1" />
                  Agregar línea
                </Button>
              </div>

              {/* Totales */}
              <div className="flex justify-end">
                <div className="w-[300px] space-y-2 p-4 rounded-lg bg-secondary/30">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">IVA</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>$0</span>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button variant="outline" className="bg-transparent" onClick={() => setShowCrearFactura(false)}>
                  Cancelar
                </Button>
                <Button variant="outline" className="bg-transparent gap-2">
                  <Eye className="h-4 w-4" />
                  Vista Previa
                </Button>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Emitir Factura
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
