"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Layout,
  Plus,
  GripVertical,
  Type,
  ImageIcon,
  Square,
  Columns,
  Trash2,
  Copy,
  Eye,
  Save,
  Undo,
  Redo,
  Smartphone,
  Monitor,
  Tablet,
  Sparkles,
  Upload,
  Play,
  Pause,
  Globe,
  Code,
  Layers,
  MousePointer,
  Video,
  FileText,
  Star,
  MessageSquare,
  Mail,
  Check,
  Menu,
  Minimize2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Section {
  id: string
  type: string
  content: Record<string, any>
}

const sectionTypes = [
  { id: "hero", icon: Layout, label: "Hero", category: "headers" },
  { id: "navbar", icon: Menu, label: "Navbar", category: "headers" },
  { id: "features", icon: Layers, label: "Features", category: "content" },
  { id: "pricing", icon: FileText, label: "Pricing", category: "content" },
  { id: "testimonials", icon: MessageSquare, label: "Testimonios", category: "content" },
  { id: "team", icon: Star, label: "Equipo", category: "content" },
  { id: "gallery", icon: ImageIcon, label: "Galería", category: "content" },
  { id: "video", icon: Video, label: "Video", category: "content" },
  { id: "cta", icon: MousePointer, label: "CTA", category: "actions" },
  { id: "contact", icon: Mail, label: "Contacto", category: "actions" },
  { id: "form", icon: FileText, label: "Formulario", category: "actions" },
  { id: "footer", icon: Square, label: "Footer", category: "footers" },
  { id: "text", icon: Type, label: "Texto", category: "basic" },
  { id: "image", icon: ImageIcon, label: "Imagen", category: "basic" },
  { id: "button", icon: MousePointer, label: "Botón", category: "basic" },
  { id: "divider", icon: Columns, label: "Divisor", category: "basic" },
]

const templates = [
  { id: "1", name: "SaaS Startup", preview: "bg-gradient-to-br from-indigo-500 to-purple-600" },
  { id: "2", name: "Agencia Creativa", preview: "bg-gradient-to-br from-orange-400 to-pink-500" },
  { id: "3", name: "E-commerce", preview: "bg-gradient-to-br from-emerald-400 to-teal-500" },
  { id: "4", name: "Portafolio", preview: "bg-gradient-to-br from-slate-600 to-slate-800" },
  { id: "5", name: "App Móvil", preview: "bg-gradient-to-br from-blue-500 to-cyan-400" },
  { id: "6", name: "Restaurante", preview: "bg-gradient-to-br from-amber-500 to-red-500" },
]

export function LandingBuilderModule() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      type: "navbar",
      content: { logo: "NEXUS", links: ["Inicio", "Características", "Precios", "Contacto"] },
    },
    {
      id: "2",
      type: "hero",
      content: {
        title: "Bienvenido a NEXUS",
        subtitle: "La solución ERP más completa para tu empresa",
        cta: "Comenzar Ahora",
      },
    },
    { id: "3", type: "features", content: {} },
    { id: "4", type: "pricing", content: {} },
    { id: "5", type: "cta", content: { title: "¿Listo para empezar?", button: "Contactar Ventas" } },
    { id: "6", type: "footer", content: {} },
  ])
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isPreview, setIsPreview] = useState(false)

  const addSection = (type: string) => {
    const sectionType = sectionTypes.find((s) => s.id === type)
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      content: {},
    }
    setSections([...sections, newSection])
    setSelectedSection(newSection)
  }

  const removeSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id))
    if (selectedSection?.id === id) setSelectedSection(null)
  }

  const renderSectionPreview = (section: Section) => {
    switch (section.type) {
      case "navbar":
        return (
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-lg">{section.content.logo || "Logo"}</span>
            <div className="flex gap-4 text-sm text-muted-foreground">
              {(section.content.links || ["Link 1", "Link 2", "Link 3"]).map((link: string, i: number) => (
                <span key={i}>{link}</span>
              ))}
            </div>
            <Button size="sm">CTA</Button>
          </div>
        )
      case "hero":
        return (
          <div className="py-20 px-8 text-center bg-gradient-to-br from-primary/10 to-chart-2/10">
            <h1 className="text-4xl font-bold mb-4">{section.content.title || "Título Principal"}</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {section.content.subtitle || "Subtítulo descriptivo de tu landing page"}
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg">{section.content.cta || "Comenzar"}</Button>
              <Button size="lg" variant="outline">
                Saber más
              </Button>
            </div>
          </div>
        )
      case "features":
        return (
          <div className="py-16 px-8">
            <h2 className="text-2xl font-bold text-center mb-8">Características</h2>
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center p-6 rounded-lg bg-muted/50">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Feature {i}</h3>
                  <p className="text-sm text-muted-foreground">Descripción de la característica</p>
                </div>
              ))}
            </div>
          </div>
        )
      case "pricing":
        return (
          <div className="py-16 px-8 bg-muted/30">
            <h2 className="text-2xl font-bold text-center mb-8">Precios</h2>
            <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
              {["Básico", "Pro", "Enterprise"].map((plan, i) => (
                <div
                  key={plan}
                  className={cn("p-6 rounded-lg border bg-background", i === 1 && "border-primary ring-2 ring-primary")}
                >
                  <h3 className="font-semibold mb-2">{plan}</h3>
                  <p className="text-3xl font-bold mb-4">
                    ${[29, 79, 199][i]}
                    <span className="text-sm font-normal">/mes</span>
                  </p>
                  <ul className="space-y-2 mb-6 text-sm">
                    {["Feature 1", "Feature 2", "Feature 3"].map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={i === 1 ? "default" : "outline"}>
                    Elegir Plan
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )
      case "testimonials":
        return (
          <div className="py-16 px-8">
            <h2 className="text-2xl font-bold text-center mb-8">Testimonios</h2>
            <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[1, 2].map((i) => (
                <div key={i} className="p-6 rounded-lg border">
                  <p className="text-muted-foreground mb-4">
                    "Excelente producto, nos ha ayudado mucho en nuestra empresa."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div>
                      <p className="font-medium">Cliente {i}</p>
                      <p className="text-sm text-muted-foreground">CEO, Empresa</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case "cta":
        return (
          <div className="py-16 px-8 bg-primary text-primary-foreground text-center">
            <h2 className="text-2xl font-bold mb-4">{section.content.title || "¿Listo para empezar?"}</h2>
            <p className="mb-8 opacity-90">Únete a miles de empresas que ya confían en nosotros</p>
            <Button size="lg" variant="secondary">
              {section.content.button || "Comenzar Gratis"}
            </Button>
          </div>
        )
      case "contact":
        return (
          <div className="py-16 px-8">
            <h2 className="text-2xl font-bold text-center mb-8">Contacto</h2>
            <div className="max-w-md mx-auto space-y-4">
              <Input placeholder="Nombre" />
              <Input placeholder="Email" />
              <textarea className="w-full p-3 rounded-lg border bg-background" placeholder="Mensaje" rows={4} />
              <Button className="w-full">Enviar Mensaje</Button>
            </div>
          </div>
        )
      case "footer":
        return (
          <div className="py-12 px-8 bg-muted/50 border-t">
            <div className="grid grid-cols-4 gap-8 mb-8">
              <div>
                <span className="font-bold text-lg">NEXUS</span>
                <p className="text-sm text-muted-foreground mt-2">La solución ERP más completa</p>
              </div>
              {["Producto", "Empresa", "Legal"].map((col) => (
                <div key={col}>
                  <p className="font-medium mb-3">{col}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-muted-foreground border-t pt-8">
              © 2025 NEXUS ERP. Todos los derechos reservados.
            </div>
          </div>
        )
      default:
        return (
          <div className="py-12 px-8 text-center text-muted-foreground">
            <span>Sección: {section.type}</span>
          </div>
        )
    }
  }

  if (isBuilderOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col">
        {/* Header */}
        <div className="h-14 border-b bg-card flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setIsBuilderOpen(false)}>
              <Minimize2 className="h-4 w-4 mr-2" />
              Cerrar
            </Button>
            <div className="h-6 w-px bg-border" />
            <Input value="Mi Landing Page" className="w-64 h-8 bg-background" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "desktop" ? "secondary" : "ghost"}
                size="icon"
                className="h-7 w-7"
                onClick={() => setViewMode("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "tablet" ? "secondary" : "ghost"}
                size="icon"
                className="h-7 w-7"
                onClick={() => setViewMode("tablet")}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "secondary" : "ghost"}
                size="icon"
                className="h-7 w-7"
                onClick={() => setViewMode("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            <div className="h-6 w-px bg-border" />

            <Button variant="ghost" size="icon">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Redo className="h-4 w-4" />
            </Button>

            <div className="h-6 w-px bg-border" />

            <Button variant={isPreview ? "secondary" : "ghost"} size="sm" onClick={() => setIsPreview(!isPreview)}>
              {isPreview ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isPreview ? "Editar" : "Preview"}
            </Button>

            <Button variant="ghost" size="sm">
              <Code className="h-4 w-4 mr-2" />
              HTML
            </Button>

            <Button variant="ghost" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Publicar
            </Button>

            <Button size="sm" className="bg-primary">
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
          </div>
        </div>

        <div className="flex-1 flex min-h-0">
          {/* Left Panel */}
          {!isPreview && (
            <div className="w-72 border-r bg-card flex flex-col">
              <Tabs defaultValue="sections" className="flex-1 flex flex-col">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-10 px-2">
                  <TabsTrigger value="sections" className="text-xs">
                    Secciones
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="text-xs">
                    Templates
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="text-xs">
                    AI
                  </TabsTrigger>
                </TabsList>

                <ScrollArea className="flex-1">
                  <TabsContent value="sections" className="p-3 m-0 space-y-4">
                    {["headers", "content", "actions", "footers", "basic"].map((category) => (
                      <div key={category}>
                        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase">{category}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {sectionTypes
                            .filter((s) => s.category === category)
                            .map((section) => (
                              <button
                                key={section.id}
                                onClick={() => addSection(section.id)}
                                className="flex flex-col items-center gap-1 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                              >
                                <section.icon className="h-5 w-5 text-muted-foreground" />
                                <span className="text-xs">{section.label}</span>
                              </button>
                            ))}
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="templates" className="p-3 m-0 space-y-3">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        className="w-full rounded-lg border overflow-hidden hover:border-primary transition-all"
                      >
                        <div className={cn("h-24", template.preview)} />
                        <div className="p-2 text-left">
                          <span className="text-sm font-medium">{template.name}</span>
                        </div>
                      </button>
                    ))}
                  </TabsContent>

                  <TabsContent value="ai" className="p-3 m-0">
                    <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">Generar con AI</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">Describe tu landing page y la AI la creará.</p>
                      <textarea
                        placeholder="Ej: Una landing page para un SaaS de productividad con hero, features, pricing y contacto..."
                        className="w-full h-24 text-sm p-2 rounded border bg-background resize-none"
                      />
                      <Button size="sm" className="w-full mt-2">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generar
                      </Button>
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </div>
          )}

          {/* Canvas */}
          <div className="flex-1 bg-muted/30 p-6 overflow-auto">
            <div
              className={cn(
                "mx-auto bg-background rounded-xl border shadow-sm overflow-hidden transition-all",
                viewMode === "desktop" && "w-full max-w-5xl",
                viewMode === "tablet" && "w-[768px]",
                viewMode === "mobile" && "w-[375px]",
              )}
            >
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  onClick={() => !isPreview && setSelectedSection(section)}
                  className={cn(
                    "relative group transition-all",
                    !isPreview && "hover:ring-2 hover:ring-primary/50",
                    selectedSection?.id === section.id && "ring-2 ring-primary",
                  )}
                >
                  {!isPreview && (
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Button variant="secondary" size="icon" className="h-7 w-7">
                        <GripVertical className="h-4 w-4" />
                      </Button>
                      <Button variant="secondary" size="icon" className="h-7 w-7">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeSection(section.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {renderSectionPreview(section)}
                </div>
              ))}

              {!isPreview && (
                <button
                  onClick={() => addSection("text")}
                  className="w-full py-8 border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-all"
                >
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Agregar Sección</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Panel */}
          {!isPreview && selectedSection && (
            <div className="w-72 border-l bg-card">
              <div className="p-3 border-b flex items-center justify-between">
                <h3 className="font-medium text-sm">Propiedades</h3>
                <Badge variant="outline" className="text-xs">
                  {selectedSection.type}
                </Badge>
              </div>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="p-3 space-y-4">
                  <Tabs defaultValue="content">
                    <TabsList className="w-full">
                      <TabsTrigger value="content" className="flex-1 text-xs">
                        Contenido
                      </TabsTrigger>
                      <TabsTrigger value="style" className="flex-1 text-xs">
                        Estilo
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="content" className="space-y-3 mt-3">
                      {selectedSection.type === "hero" && (
                        <>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Título</label>
                            <Input value={selectedSection.content.title || ""} className="mt-1 h-8" />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Subtítulo</label>
                            <textarea
                              value={selectedSection.content.subtitle || ""}
                              className="mt-1 w-full p-2 text-sm rounded border bg-background"
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Botón CTA</label>
                            <Input value={selectedSection.content.cta || ""} className="mt-1 h-8" />
                          </div>
                        </>
                      )}
                      {selectedSection.type === "navbar" && (
                        <>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Logo</label>
                            <Input value={selectedSection.content.logo || ""} className="mt-1 h-8" />
                          </div>
                        </>
                      )}
                      {selectedSection.type === "cta" && (
                        <>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Título</label>
                            <Input value={selectedSection.content.title || ""} className="mt-1 h-8" />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Botón</label>
                            <Input value={selectedSection.content.button || ""} className="mt-1 h-8" />
                          </div>
                        </>
                      )}
                    </TabsContent>
                    <TabsContent value="style" className="space-y-3 mt-3">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Padding</label>
                        <div className="grid grid-cols-4 gap-1 mt-1">
                          {["S", "M", "L", "XL"].map((size) => (
                            <Button key={size} variant="outline" size="sm" className="h-8 bg-transparent">
                              {size}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Fondo</label>
                        <div className="flex gap-2 mt-1">
                          {["bg-background", "bg-muted", "bg-primary", "bg-gradient"].map((bg) => (
                            <button
                              key={bg}
                              className={cn(
                                "w-8 h-8 rounded border",
                                bg === "bg-gradient" ? "bg-gradient-to-r from-primary to-chart-2" : bg,
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-destructive bg-transparent"
                      onClick={() => removeSection(selectedSection.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar Sección
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Landing Page Builder</h1>
          <p className="text-muted-foreground">Crea landing pages profesionales sin código</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button onClick={() => setIsBuilderOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Landing
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Layout className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Landing Pages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Publicadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">12.4k</p>
                <p className="text-xs text-muted-foreground">Visitas Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <MousePointer className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">3.2%</p>
                <p className="text-xs text-muted-foreground">Conversión</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Templates Populares</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="bg-card border-border hover:border-primary/50 cursor-pointer transition-all overflow-hidden"
              onClick={() => setIsBuilderOpen(true)}
            >
              <div className={cn("h-24", template.preview)} />
              <CardContent className="p-3">
                <p className="text-sm font-medium">{template.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* My Pages */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Mis Landing Pages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Producto Principal", status: "Publicada", views: 4520, conversion: 3.8 },
            { name: "Campaña Black Friday", status: "Borrador", views: 0, conversion: 0 },
            { name: "Webinar Registro", status: "Publicada", views: 2340, conversion: 5.2 },
          ].map((page, i) => (
            <Card
              key={i}
              className="bg-card border-border hover:border-primary/50 cursor-pointer transition-all"
              onClick={() => setIsBuilderOpen(true)}
            >
              <CardContent className="p-0">
                <div className="h-32 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <Layout className="h-12 w-12 text-muted-foreground/30" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{page.name}</h3>
                    <Badge variant={page.status === "Publicada" ? "default" : "secondary"} className="text-xs">
                      {page.status}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{page.views.toLocaleString()} visitas</span>
                    <span>{page.conversion}% conversión</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card
            className="bg-card border-dashed border-2 hover:border-primary cursor-pointer transition-all"
            onClick={() => setIsBuilderOpen(true)}
          >
            <CardContent className="h-full flex flex-col items-center justify-center p-6 text-muted-foreground hover:text-primary transition-colors">
              <Plus className="h-12 w-12 mb-2" />
              <p className="font-medium">Nueva Landing</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
