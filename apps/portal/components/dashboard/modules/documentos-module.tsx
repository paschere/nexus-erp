"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Folder,
  Upload,
  Download,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Share2,
  Star,
  Clock,
  Grid3X3,
  List,
  Filter,
  FolderPlus,
  File,
  FileImage,
  FileSpreadsheet,
  FileVideo,
  FilePen as FilePdf,
  FileArchive,
  Link2,
  Users,
} from "lucide-react"

const carpetas = [
  { id: 1, nombre: "Facturas", archivos: 234, color: "bg-blue-500" },
  { id: 2, nombre: "Contratos", archivos: 45, color: "bg-green-500" },
  { id: 3, nombre: "Nóminas", archivos: 156, color: "bg-purple-500" },
  { id: 4, nombre: "Reportes", archivos: 89, color: "bg-orange-500" },
  { id: 5, nombre: "Certificados", archivos: 23, color: "bg-pink-500" },
  { id: 6, nombre: "Legal", archivos: 67, color: "bg-red-500" },
]

const documentos = [
  {
    id: 1,
    nombre: "Factura-2024-001245.pdf",
    tipo: "PDF",
    tamaño: "245 KB",
    carpeta: "Facturas",
    fecha: "Hoy, 10:30 AM",
    usuario: "Carlos R.",
    compartido: false,
    favorito: true,
  },
  {
    id: 2,
    nombre: "Contrato-Proveedor-ABC.docx",
    tipo: "Word",
    tamaño: "1.2 MB",
    carpeta: "Contratos",
    fecha: "Ayer",
    usuario: "María G.",
    compartido: true,
    favorito: false,
  },
  {
    id: 3,
    nombre: "Nómina-Enero-2024.xlsx",
    tipo: "Excel",
    tamaño: "890 KB",
    carpeta: "Nóminas",
    fecha: "15 Ene 2024",
    usuario: "Ana M.",
    compartido: false,
    favorito: true,
  },
  {
    id: 4,
    nombre: "Certificado-Camara-Comercio.pdf",
    tipo: "PDF",
    tamaño: "156 KB",
    carpeta: "Certificados",
    fecha: "10 Ene 2024",
    usuario: "Pedro L.",
    compartido: true,
    favorito: false,
  },
  {
    id: 5,
    nombre: "Inventario-Fotos.zip",
    tipo: "ZIP",
    tamaño: "45.6 MB",
    carpeta: "Reportes",
    fecha: "8 Ene 2024",
    usuario: "Juan P.",
    compartido: false,
    favorito: false,
  },
]

const getFileIcon = (tipo: string) => {
  switch (tipo) {
    case "PDF":
      return <FilePdf className="h-5 w-5 text-red-400" />
    case "Excel":
      return <FileSpreadsheet className="h-5 w-5 text-green-400" />
    case "Word":
      return <FileText className="h-5 w-5 text-blue-400" />
    case "Image":
      return <FileImage className="h-5 w-5 text-purple-400" />
    case "Video":
      return <FileVideo className="h-5 w-5 text-pink-400" />
    case "ZIP":
      return <FileArchive className="h-5 w-5 text-yellow-400" />
    default:
      return <File className="h-5 w-5 text-muted-foreground" />
  }
}

export function DocumentosModule() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [searchTerm, setSearchTerm] = useState("")

  const almacenamientoUsado = 12.4
  const almacenamientoTotal = 50

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestión Documental</h1>
          <p className="text-muted-foreground">Almacena, organiza y comparte documentos de tu empresa</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FolderPlus className="h-4 w-4 mr-2" />
            Nueva Carpeta
          </Button>
          <Button size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Subir Archivos
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Documentos</p>
                <p className="text-2xl font-bold">614</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Carpetas</p>
                <p className="text-2xl font-bold">{carpetas.length}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Folder className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compartidos</p>
                <p className="text-2xl font-bold text-green-400">28</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Share2 className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Almacenamiento</p>
                <span className="text-sm">
                  {almacenamientoUsado} / {almacenamientoTotal} GB
                </span>
              </div>
              <Progress value={(almacenamientoUsado / almacenamientoTotal) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="recientes">Recientes</TabsTrigger>
            <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
            <TabsTrigger value="compartidos">Compartidos</TabsTrigger>
            <TabsTrigger value="papelera">Papelera</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="todos" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar documentos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="word">Word</SelectItem>
                <SelectItem value="image">Imágenes</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Carpeta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {carpetas.map((carpeta) => (
                  <SelectItem key={carpeta.id} value={carpeta.id.toString()}>
                    {carpeta.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Folders */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Carpetas</h3>
            <div className="grid grid-cols-6 gap-3">
              {carpetas.map((carpeta) => (
                <Card
                  key={carpeta.id}
                  className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className={`h-12 w-12 rounded-lg ${carpeta.color}/20 flex items-center justify-center`}>
                        <Folder
                          className={`h-6 w-6 ${carpeta.color.replace("bg-", "text-").replace("-500", "-400")}`}
                        />
                      </div>
                      <p className="font-medium text-sm truncate w-full">{carpeta.nombre}</p>
                      <p className="text-xs text-muted-foreground">{carpeta.archivos} archivos</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Files */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Archivos Recientes</h3>
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Nombre</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Carpeta</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tamaño</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Modificado</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Por</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentos.map((doc) => (
                      <tr key={doc.id} className="border-b border-border hover:bg-muted/30">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {getFileIcon(doc.tipo)}
                            <span className="font-medium">{doc.nombre}</span>
                            {doc.favorito && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                            {doc.compartido && <Users className="h-4 w-4 text-green-400" />}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="secondary">{doc.carpeta}</Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{doc.tamaño}</td>
                        <td className="p-4 text-sm text-muted-foreground">{doc.fecha}</td>
                        <td className="p-4 text-sm">{doc.usuario}</td>
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
                                Ver
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Descargar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Compartir
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link2 className="h-4 w-4 mr-2" />
                                Copiar Enlace
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Star className="h-4 w-4 mr-2" />
                                {doc.favorito ? "Quitar de Favoritos" : "Agregar a Favoritos"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Renombrar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Folder className="h-4 w-4 mr-2" />
                                Mover a...
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
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
          </div>
        </TabsContent>

        <TabsContent value="recientes">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Documentos Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documentos.slice(0, 4).map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.tipo)}
                      <div>
                        <p className="font-medium">{doc.nombre}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.fecha} por {doc.usuario}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favoritos">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                Favoritos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documentos
                  .filter((d) => d.favorito)
                  .map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(doc.tipo)}
                        <div>
                          <p className="font-medium">{doc.nombre}</p>
                          <p className="text-sm text-muted-foreground">{doc.carpeta}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compartidos">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Share2 className="h-5 w-5 text-green-400" />
                Compartidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documentos
                  .filter((d) => d.compartido)
                  .map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(doc.tipo)}
                        <div>
                          <p className="font-medium">{doc.nombre}</p>
                          <p className="text-sm text-muted-foreground">{doc.carpeta}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-green-400 border-green-400/50">
                          <Users className="h-3 w-3 mr-1" />
                          Compartido
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="papelera">
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <Trash2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Papelera Vacía</h3>
                  <p className="text-muted-foreground">Los archivos eliminados aparecerán aquí durante 30 días</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
