"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  FileText,
  Send,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  Building2,
  TrendingUp,
  Calculator,
  FileCheck,
  Sparkles,
  Zap,
  Shield,
  Settings,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const nominasPeriodos = [
  {
    id: "NE-2024-01-Q1",
    periodo: "Enero 2024 - Quincena 1",
    fechaCorte: "2024-01-15",
    empleados: 145,
    devengados: 285600000,
    deducciones: 68540000,
    netoPagar: 217060000,
    estado: "enviada",
    cune: "abc123def456...",
  },
  {
    id: "NE-2024-01-Q2",
    periodo: "Enero 2024 - Quincena 2",
    fechaCorte: "2024-01-31",
    empleados: 147,
    devengados: 298400000,
    deducciones: 71620000,
    netoPagar: 226780000,
    estado: "procesando",
    cune: null,
  },
  {
    id: "NE-2023-12-Q2",
    periodo: "Diciembre 2023 - Quincena 2",
    fechaCorte: "2023-12-31",
    empleados: 143,
    devengados: 412500000,
    deducciones: 99000000,
    netoPagar: 313500000,
    estado: "aceptada",
    cune: "xyz789ghi012...",
  },
]

const empleadosNomina = [
  {
    id: 1,
    nombre: "María García",
    cedula: "1.234.567.890",
    cargo: "Gerente",
    salario: 8500000,
    devengado: 9200000,
    deducido: 2208000,
    neto: 6992000,
    estado: "ok",
  },
  {
    id: 2,
    nombre: "Carlos López",
    cedula: "2.345.678.901",
    cargo: "Desarrollador",
    salario: 5500000,
    devengado: 5850000,
    deducido: 1404000,
    neto: 4446000,
    estado: "ok",
  },
  {
    id: 3,
    nombre: "Ana Martínez",
    cedula: "3.456.789.012",
    cargo: "Contadora",
    salario: 4800000,
    devengado: 5100000,
    deducido: 1224000,
    neto: 3876000,
    estado: "novedad",
  },
  {
    id: 4,
    nombre: "Pedro Rodríguez",
    cedula: "4.567.890.123",
    cargo: "Vendedor",
    salario: 2500000,
    devengado: 3800000,
    deducido: 912000,
    neto: 2888000,
    estado: "ok",
  },
]

export function NominaElectronicaModule() {
  const [periodoActual, setPeriodoActual] = useState("2024-01-Q2")
  const [searchTerm, setSearchTerm] = useState("")

  const getEstadoBadge = (estado: string) => {
    const styles: Record<string, { bg: string; icon: any; label: string }> = {
      borrador: { bg: "bg-gray-500/20 text-gray-400", icon: FileText, label: "Borrador" },
      procesando: { bg: "bg-blue-500/20 text-blue-400", icon: RefreshCw, label: "Procesando" },
      enviada: { bg: "bg-yellow-500/20 text-yellow-400", icon: Send, label: "Enviada DIAN" },
      aceptada: { bg: "bg-green-500/20 text-green-400", icon: CheckCircle, label: "Aceptada" },
      rechazada: { bg: "bg-red-500/20 text-red-400", icon: XCircle, label: "Rechazada" },
    }
    const style = styles[estado]
    const Icon = style.icon
    return (
      <Badge className={style.bg}>
        <Icon className="h-3 w-3 mr-1" />
        {style.label}
      </Badge>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Nómina Electrónica</h1>
          <p className="text-muted-foreground">Generación y transmisión de nómina electrónica DIAN</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Configuración
          </Button>
          <Button className="gap-2 bg-primary">
            <Zap className="h-4 w-4" />
            Nueva Liquidación
          </Button>
        </div>
      </div>

      {/* Estado de Conexión DIAN */}
      <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="font-medium text-green-400">Conexión DIAN Activa</p>
                <p className="text-sm text-muted-foreground">Certificado válido hasta: 15 Jun 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Resolución</p>
                <p className="font-medium">18764000001234</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Rango</p>
                <p className="font-medium">1 - 10,000</p>
              </div>
              <Button variant="outline" size="sm">
                Verificar Estado
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Empleados Activos</p>
                <p className="text-2xl font-bold">147</p>
              </div>
              <Users className="h-8 w-8 text-blue-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Devengados</p>
                <p className="text-2xl font-bold">$298M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Deducciones</p>
                <p className="text-2xl font-bold">$71.6M</p>
              </div>
              <Calculator className="h-8 w-8 text-red-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Neto a Pagar</p>
                <p className="text-2xl font-bold">$226M</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transmitidas</p>
                <p className="text-2xl font-bold">24/24</p>
              </div>
              <FileCheck className="h-8 w-8 text-green-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="periodos" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="periodos">Períodos</TabsTrigger>
          <TabsTrigger value="liquidacion">Liquidación Actual</TabsTrigger>
          <TabsTrigger value="novedades">Novedades</TabsTrigger>
          <TabsTrigger value="ajustes">Notas de Ajuste</TabsTrigger>
          <TabsTrigger value="reportes">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="periodos">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Historial de Nóminas</CardTitle>
              <div className="flex items-center gap-2">
                <Select defaultValue="2024">
                  <SelectTrigger className="w-32 bg-muted/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr className="text-left text-sm text-muted-foreground">
                    <th className="p-4 font-medium">ID</th>
                    <th className="p-4 font-medium">Período</th>
                    <th className="p-4 font-medium text-center">Empleados</th>
                    <th className="p-4 font-medium text-right">Devengados</th>
                    <th className="p-4 font-medium text-right">Deducciones</th>
                    <th className="p-4 font-medium text-right">Neto</th>
                    <th className="p-4 font-medium">Estado</th>
                    <th className="p-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {nominasPeriodos.map((nomina) => (
                    <tr key={nomina.id} className="border-t border-border hover:bg-muted/20">
                      <td className="p-4">
                        <span className="font-mono text-sm">{nomina.id}</span>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{nomina.periodo}</p>
                          <p className="text-sm text-muted-foreground">Corte: {nomina.fechaCorte}</p>
                        </div>
                      </td>
                      <td className="p-4 text-center">{nomina.empleados}</td>
                      <td className="p-4 text-right font-medium">${(nomina.devengados / 1000000).toFixed(1)}M</td>
                      <td className="p-4 text-right text-red-400">${(nomina.deducciones / 1000000).toFixed(1)}M</td>
                      <td className="p-4 text-right font-bold text-primary">
                        ${(nomina.netoPagar / 1000000).toFixed(1)}M
                      </td>
                      <td className="p-4">{getEstadoBadge(nomina.estado)}</td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" /> Ver Detalle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" /> Descargar XML
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" /> Colillas de Pago
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 mr-2" /> Reenviar DIAN
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

        <TabsContent value="liquidacion">
          <div className="space-y-4">
            {/* Barra de acciones */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar empleado..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-64 bg-muted/50"
                  />
                </div>
                <Select defaultValue="todos">
                  <SelectTrigger className="w-40 bg-muted/50">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="novedades">Con Novedades</SelectItem>
                    <SelectItem value="ok">Sin Novedades</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Sparkles className="h-4 w-4" />
                  Calcular con AI
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Upload className="h-4 w-4" />
                  Importar Novedades
                </Button>
                <Button className="gap-2 bg-primary">
                  <Send className="h-4 w-4" />
                  Transmitir a DIAN
                </Button>
              </div>
            </div>

            {/* Tabla de empleados */}
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="p-4 font-medium">Empleado</th>
                      <th className="p-4 font-medium">Cédula</th>
                      <th className="p-4 font-medium">Cargo</th>
                      <th className="p-4 font-medium text-right">Salario Base</th>
                      <th className="p-4 font-medium text-right">Devengado</th>
                      <th className="p-4 font-medium text-right">Deducido</th>
                      <th className="p-4 font-medium text-right">Neto</th>
                      <th className="p-4 font-medium text-center">Estado</th>
                      <th className="p-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {empleadosNomina.map((emp) => (
                      <tr
                        key={emp.id}
                        className={`border-t border-border hover:bg-muted/20 ${emp.estado === "novedad" ? "bg-yellow-500/5" : ""}`}
                      >
                        <td className="p-4 font-medium">{emp.nombre}</td>
                        <td className="p-4 text-muted-foreground">{emp.cedula}</td>
                        <td className="p-4">{emp.cargo}</td>
                        <td className="p-4 text-right">${emp.salario.toLocaleString()}</td>
                        <td className="p-4 text-right text-green-400">${emp.devengado.toLocaleString()}</td>
                        <td className="p-4 text-right text-red-400">${emp.deducido.toLocaleString()}</td>
                        <td className="p-4 text-right font-bold">${emp.neto.toLocaleString()}</td>
                        <td className="p-4 text-center">
                          {emp.estado === "ok" ? (
                            <CheckCircle className="h-5 w-5 text-green-400 mx-auto" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-yellow-400 mx-auto" />
                          )}
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            Ver Detalle
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="novedades">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Novedades del Período</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { tipo: "Incapacidad", empleado: "Ana Martínez", dias: 3, valor: 480000 },
                { tipo: "Horas Extra", empleado: "Pedro Rodríguez", dias: 12, valor: 650000 },
                { tipo: "Licencia", empleado: "Juan Pérez", dias: 2, valor: 0 },
                { tipo: "Comisiones", empleado: "Laura Gómez", dias: 0, valor: 1200000 },
              ].map((nov, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{nov.tipo}</Badge>
                    <span className="font-medium">{nov.empleado}</span>
                    {nov.dias > 0 && <span className="text-sm text-muted-foreground">{nov.dias} días</span>}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`font-bold ${nov.valor > 0 ? "text-green-400" : "text-muted-foreground"}`}>
                      {nov.valor > 0 ? `+$${nov.valor.toLocaleString()}` : "-"}
                    </span>
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Plus className="h-4 w-4" /> Agregar Novedad
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ajustes">
          <Card className="bg-card border-border p-8 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-medium mb-2">Notas de Ajuste</h3>
            <p className="text-muted-foreground mb-4">Genera notas de ajuste para corregir nóminas ya transmitidas</p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Nueva Nota de Ajuste
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="reportes">
          <div className="grid grid-cols-3 gap-4">
            {[
              { titulo: "Colillas de Pago", desc: "PDF individual por empleado", icon: FileText },
              { titulo: "Resumen de Nómina", desc: "Consolidado del período", icon: Calculator },
              { titulo: "Archivo Bancario", desc: "Dispersión de pagos", icon: Building2 },
              { titulo: "Provisiones", desc: "Cesantías, primas, vacaciones", icon: DollarSign },
              { titulo: "Seguridad Social", desc: "PILA - Aportes", icon: Shield },
              { titulo: "Certificados", desc: "Ingresos y retenciones", icon: FileCheck },
            ].map((rep) => (
              <Card
                key={rep.titulo}
                className="bg-card border-border hover:border-primary/50 cursor-pointer transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <rep.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{rep.titulo}</h3>
                      <p className="text-sm text-muted-foreground">{rep.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)
