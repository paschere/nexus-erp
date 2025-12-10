"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Users,
  UserPlus,
  Search,
  MoreHorizontal,
  Shield,
  Mail,
  Phone,
  Building2,
  Clock,
  Key,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Filter,
  Download,
  Upload,
  ShieldCheck,
  Eye,
  Lock,
  Unlock,
} from "lucide-react"

const usuarios = [
  {
    id: 1,
    nombre: "Carlos Rodríguez",
    email: "carlos@empresa.com",
    telefono: "+57 300 123 4567",
    rol: "Administrador",
    departamento: "TI",
    estado: "activo",
    ultimoAcceso: "Hace 5 min",
    avatar: null,
    permisos: ["todos"],
  },
  {
    id: 2,
    nombre: "María García",
    email: "maria@empresa.com",
    telefono: "+57 301 234 5678",
    rol: "Contador",
    departamento: "Finanzas",
    estado: "activo",
    ultimoAcceso: "Hace 1 hora",
    avatar: null,
    permisos: ["contabilidad", "tesoreria", "reportes"],
  },
  {
    id: 3,
    nombre: "Juan Pérez",
    email: "juan@empresa.com",
    telefono: "+57 302 345 6789",
    rol: "Vendedor",
    departamento: "Ventas",
    estado: "activo",
    ultimoAcceso: "Hace 2 horas",
    avatar: null,
    permisos: ["ventas", "inventario", "pos"],
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    email: "ana@empresa.com",
    telefono: "+57 303 456 7890",
    rol: "Gerente RRHH",
    departamento: "Recursos Humanos",
    estado: "activo",
    ultimoAcceso: "Ayer",
    avatar: null,
    permisos: ["rrhh", "reportes"],
  },
  {
    id: 5,
    nombre: "Pedro López",
    email: "pedro@empresa.com",
    telefono: "+57 304 567 8901",
    rol: "Bodeguero",
    departamento: "Operaciones",
    estado: "inactivo",
    ultimoAcceso: "Hace 1 semana",
    avatar: null,
    permisos: ["inventario"],
  },
]

const roles = [
  {
    id: 1,
    nombre: "Administrador",
    descripcion: "Acceso completo al sistema",
    usuarios: 2,
    color: "bg-red-500/20 text-red-400",
    permisos: ["todos"],
  },
  {
    id: 2,
    nombre: "Contador",
    descripcion: "Gestión financiera y contable",
    usuarios: 3,
    color: "bg-blue-500/20 text-blue-400",
    permisos: ["contabilidad", "tesoreria", "reportes", "activos"],
  },
  {
    id: 3,
    nombre: "Vendedor",
    descripcion: "Ventas y atención al cliente",
    usuarios: 8,
    color: "bg-green-500/20 text-green-400",
    permisos: ["ventas", "pos", "inventario:ver"],
  },
  {
    id: 4,
    nombre: "Gerente",
    descripcion: "Supervisión y reportes",
    usuarios: 4,
    color: "bg-purple-500/20 text-purple-400",
    permisos: ["reportes", "dashboard", "todos:ver"],
  },
  {
    id: 5,
    nombre: "Bodeguero",
    descripcion: "Control de inventario",
    usuarios: 5,
    color: "bg-orange-500/20 text-orange-400",
    permisos: ["inventario", "compras:ver"],
  },
]

const modulos = [
  { id: "dashboard", nombre: "Dashboard", permisos: ["ver"] },
  { id: "ventas", nombre: "Ventas / CRM", permisos: ["ver", "crear", "editar", "eliminar"] },
  { id: "compras", nombre: "Compras", permisos: ["ver", "crear", "editar", "eliminar", "aprobar"] },
  { id: "inventario", nombre: "Inventario", permisos: ["ver", "crear", "editar", "eliminar", "ajustar"] },
  { id: "contabilidad", nombre: "Contabilidad", permisos: ["ver", "crear", "editar", "eliminar", "cerrar"] },
  { id: "rrhh", nombre: "Recursos Humanos", permisos: ["ver", "crear", "editar", "eliminar"] },
  { id: "manufactura", nombre: "Manufactura", permisos: ["ver", "crear", "editar", "eliminar"] },
  { id: "pos", nombre: "POS Retail", permisos: ["ver", "vender", "anular", "cierres"] },
]

export function UsuariosModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRol, setSelectedRol] = useState<(typeof roles)[0] | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">Administra usuarios, roles y permisos del sistema</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Usuario</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label>Nombre Completo</Label>
                  <Input placeholder="Nombre del usuario" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="correo@empresa.com" />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input placeholder="+57 300 000 0000" />
                </div>
                <div className="space-y-2">
                  <Label>Rol</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((rol) => (
                        <SelectItem key={rol.id} value={rol.id.toString()}>
                          {rol.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Departamento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ti">TI</SelectItem>
                      <SelectItem value="finanzas">Finanzas</SelectItem>
                      <SelectItem value="ventas">Ventas</SelectItem>
                      <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                      <SelectItem value="operaciones">Operaciones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Punto de Venta</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Asignar POS (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pos1">POS Principal - Bogotá</SelectItem>
                      <SelectItem value="pos2">POS Sucursal - Medellín</SelectItem>
                      <SelectItem value="pos3">POS Sucursal - Cali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch id="enviar-invitacion" defaultChecked />
                    <Label htmlFor="enviar-invitacion">Enviar invitación por email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="2fa" />
                    <Label htmlFor="2fa">Requerir 2FA</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Crear Usuario</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Usuarios</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Activos</p>
                <p className="text-2xl font-bold text-green-400">21</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inactivos</p>
                <p className="text-2xl font-bold text-yellow-400">3</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <UserX className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Roles</p>
                <p className="text-2xl font-bold">{roles.length}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usuarios" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="roles">Roles y Permisos</TabsTrigger>
          <TabsTrigger value="sesiones">Sesiones Activas</TabsTrigger>
          <TabsTrigger value="auditoria">Auditoría</TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios por nombre, email o rol..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {roles.map((rol) => (
                  <SelectItem key={rol.id} value={rol.id.toString()}>
                    {rol.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="activo">Activos</SelectItem>
                <SelectItem value="inactivo">Inactivos</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Users Table */}
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Usuario</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Contacto</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Rol</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Departamento</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Estado</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Último Acceso</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id} className="border-b border-border hover:bg-muted/30">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={usuario.avatar || undefined} />
                            <AvatarFallback className="bg-primary/20 text-primary text-sm">
                              {usuario.nombre
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{usuario.nombre}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {usuario.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {usuario.telefono}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary" className={roles.find((r) => r.nombre === usuario.rol)?.color}>
                          {usuario.rol}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          {usuario.departamento}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={usuario.estado === "activo" ? "default" : "secondary"}>
                          {usuario.estado === "activo" ? "Activo" : "Inactivo"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {usuario.ultimoAcceso}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Key className="h-4 w-4 mr-2" />
                              Resetear Contraseña
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ShieldCheck className="h-4 w-4 mr-2" />
                              Cambiar Permisos
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {usuario.estado === "activo" ? (
                                <>
                                  <Lock className="h-4 w-4 mr-2" />
                                  Desactivar
                                </>
                              ) : (
                                <>
                                  <Unlock className="h-4 w-4 mr-2" />
                                  Activar
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
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

        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Roles List */}
            <Card className="bg-card border-border col-span-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Roles</CardTitle>
                  <Button size="sm" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Nuevo Rol
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {roles.map((rol) => (
                  <div
                    key={rol.id}
                    onClick={() => setSelectedRol(rol)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedRol?.id === rol.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{rol.nombre}</p>
                        <p className="text-sm text-muted-foreground">{rol.descripcion}</p>
                      </div>
                      <Badge variant="secondary">{rol.usuarios} usuarios</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Permissions Matrix */}
            <Card className="bg-card border-border col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Permisos {selectedRol && `- ${selectedRol.nombre}`}</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedRol ? (
                  <div className="space-y-4">
                    {modulos.map((modulo) => (
                      <div key={modulo.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-medium">{modulo.nombre}</p>
                          <div className="flex items-center gap-2">
                            <Switch id={`all-${modulo.id}`} />
                            <Label htmlFor={`all-${modulo.id}`} className="text-sm">
                              Acceso Completo
                            </Label>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {modulo.permisos.map((permiso) => (
                            <div key={permiso} className="flex items-center gap-2">
                              <Checkbox id={`${modulo.id}-${permiso}`} />
                              <Label htmlFor={`${modulo.id}-${permiso}`} className="text-sm capitalize">
                                {permiso}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline">Cancelar</Button>
                      <Button>Guardar Permisos</Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Selecciona un rol para ver y editar sus permisos
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sesiones" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Sesiones Activas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usuarios
                  .filter((u) => u.estado === "activo")
                  .slice(0, 4)
                  .map((usuario) => (
                    <div
                      key={usuario.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/20 text-primary">
                            {usuario.nombre
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{usuario.nombre}</p>
                          <p className="text-sm text-muted-foreground">{usuario.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-sm">Chrome / Windows</p>
                          <p className="text-xs text-muted-foreground">IP: 192.168.1.{usuario.id + 100}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-green-400">Activa</p>
                          <p className="text-xs text-muted-foreground">{usuario.ultimoAcceso}</p>
                        </div>
                        <Button variant="outline" size="sm" className="text-red-400 border-red-400/50 bg-transparent">
                          Cerrar Sesión
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auditoria" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Log de Auditoría</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { usuario: "Carlos Rodríguez", accion: "Inicio de sesión", modulo: "Sistema", tiempo: "Hace 5 min" },
                  {
                    usuario: "María García",
                    accion: "Creó factura #4521",
                    modulo: "Contabilidad",
                    tiempo: "Hace 15 min",
                  },
                  {
                    usuario: "Juan Pérez",
                    accion: "Actualizó producto SKU-001",
                    modulo: "Inventario",
                    tiempo: "Hace 30 min",
                  },
                  {
                    usuario: "Ana Martínez",
                    accion: "Exportó reporte de nómina",
                    modulo: "RRHH",
                    tiempo: "Hace 1 hora",
                  },
                  {
                    usuario: "Carlos Rodríguez",
                    accion: "Modificó permisos de rol Vendedor",
                    modulo: "Usuarios",
                    tiempo: "Hace 2 horas",
                  },
                ].map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {log.usuario
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{log.usuario}</span> {log.accion}
                        </p>
                        <p className="text-xs text-muted-foreground">{log.modulo}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{log.tiempo}</span>
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
