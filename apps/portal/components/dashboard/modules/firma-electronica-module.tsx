"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FileSignature,
  Upload,
  Download,
  Clock,
  CheckCircle2,
  Users,
  FileText,
  Send,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Shield,
  Key,
} from "lucide-react"

const documents = [
  {
    id: 1,
    name: "Contrato de Servicios - ABC Corp",
    type: "Contrato",
    status: "pending",
    signers: 3,
    signed: 1,
    created: "2024-01-15",
    expires: "2024-01-22",
  },
  {
    id: 2,
    name: "NDA - Proyecto Innovación",
    type: "NDA",
    status: "completed",
    signers: 2,
    signed: 2,
    created: "2024-01-14",
    expires: null,
  },
  {
    id: 3,
    name: "Acuerdo Comercial - XYZ Ltda",
    type: "Acuerdo",
    status: "pending",
    signers: 4,
    signed: 2,
    created: "2024-01-13",
    expires: "2024-01-20",
  },
  {
    id: 4,
    name: "Anexo Técnico - Licitación 2024",
    type: "Anexo",
    status: "draft",
    signers: 0,
    signed: 0,
    created: "2024-01-12",
    expires: null,
  },
  {
    id: 5,
    name: "Contrato Laboral - Juan Pérez",
    type: "Laboral",
    status: "rejected",
    signers: 2,
    signed: 1,
    created: "2024-01-11",
    expires: null,
  },
]

const templates = [
  { id: 1, name: "Contrato de Servicios", uses: 45, fields: 12 },
  { id: 2, name: "NDA Estándar", uses: 32, fields: 8 },
  { id: 3, name: "Contrato Laboral", uses: 28, fields: 15 },
  { id: 4, name: "Acuerdo de Confidencialidad", uses: 21, fields: 6 },
]

const certificates = [
  {
    id: 1,
    name: "Certificado Empresarial",
    provider: "Certicámara",
    status: "active",
    expires: "2025-06-15",
    type: "Firma Avanzada",
  },
  {
    id: 2,
    name: "Certificado Personal CEO",
    provider: "GSE",
    status: "active",
    expires: "2024-12-01",
    type: "Firma Cualificada",
  },
]

export function FirmaElectronicaModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("documentos")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400">Completado</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400">Pendiente</Badge>
      case "draft":
        return <Badge className="bg-gray-500/20 text-gray-400">Borrador</Badge>
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-400">Rechazado</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Firma Electrónica</h1>
          <p className="text-muted-foreground">Gestiona documentos y firmas digitales certificadas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Subir Documento
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Documento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Documentos Activos</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="p-3 bg-teal-500/20 rounded-lg">
                <FileSignature className="h-6 w-6 text-teal-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendientes de Firma</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completados este Mes</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Certificados Activos</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="plantillas">Plantillas</TabsTrigger>
          <TabsTrigger value="certificados">Certificados</TabsTrigger>
          <TabsTrigger value="auditoria">Auditoría</TabsTrigger>
        </TabsList>

        <TabsContent value="documentos" className="space-y-4">
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
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          <Card className="bg-card border-border">
            <ScrollArea className="h-[400px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Documento</th>
                    <th className="text-left p-4 font-medium">Tipo</th>
                    <th className="text-left p-4 font-medium">Estado</th>
                    <th className="text-left p-4 font-medium">Firmantes</th>
                    <th className="text-left p-4 font-medium">Creado</th>
                    <th className="text-left p-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id} className="border-b border-border hover:bg-muted/30">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="p-4">{doc.type}</td>
                      <td className="p-4">{getStatusBadge(doc.status)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {doc.signed}/{doc.signers}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{doc.created}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="plantillas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="bg-card border-border hover:border-teal-500/50 cursor-pointer transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                      <FileText className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-muted-foreground">{template.fields} campos</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Usado {template.uses} veces</span>
                    <Button variant="ghost" size="sm">
                      Usar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="bg-card border-border border-dashed hover:border-teal-500/50 cursor-pointer transition-colors">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[120px]">
                <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Nueva Plantilla</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certificados" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <Card key={cert.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-green-500/20 rounded-lg">
                        <Key className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">{cert.provider}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Activo</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tipo</span>
                      <span>{cert.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Vence</span>
                      <span>{cert.expires}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="auditoria" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Historial de Actividad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Documento firmado", doc: "Contrato ABC Corp", user: "María García", time: "Hace 2 horas" },
                  { action: "Documento enviado", doc: "NDA Proyecto", user: "Carlos López", time: "Hace 4 horas" },
                  { action: "Firma rechazada", doc: "Contrato Laboral", user: "Juan Pérez", time: "Hace 1 día" },
                  { action: "Documento creado", doc: "Anexo Técnico", user: "Admin", time: "Hace 2 días" },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                    <div className="p-2 bg-teal-500/20 rounded-full">
                      <FileSignature className="h-4 w-4 text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{log.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {log.doc} - {log.user}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">{log.time}</span>
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
