"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  BookOpen,
  Video,
  FileText,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  Play,
  Clock,
  Star,
  ChevronRight,
  Sparkles,
  Settings,
  Package,
  Calculator,
  ShoppingCart,
  Factory,
  BarChart3,
  HelpCircle,
  ArrowRight,
  Headphones,
  Send,
  ThumbsUp,
  ThumbsDown,
  Bot,
  GraduationCap,
  Target,
  Rocket,
  Newspaper,
} from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "inicio", label: "Inicio Rápido", icon: Rocket, color: "text-green-500" },
  { id: "ventas", label: "Ventas & CRM", icon: Target, color: "text-blue-500" },
  { id: "inventario", label: "Inventario", icon: Package, color: "text-orange-500" },
  { id: "contabilidad", label: "Contabilidad", icon: Calculator, color: "text-purple-500" },
  { id: "manufactura", label: "Manufactura", icon: Factory, color: "text-cyan-500" },
  { id: "pos", label: "Punto de Venta", icon: ShoppingCart, color: "text-pink-500" },
  { id: "reportes", label: "Reportes", icon: BarChart3, color: "text-yellow-500" },
  { id: "configuracion", label: "Configuración", icon: Settings, color: "text-gray-500" },
]

const popularArticles = [
  { id: 1, title: "Cómo crear tu primera factura electrónica", category: "Facturación", views: 15420, rating: 4.9 },
  { id: 2, title: "Configuración inicial del sistema", category: "Inicio", views: 12350, rating: 4.8 },
  { id: 3, title: "Gestión de inventario: Guía completa", category: "Inventario", views: 9870, rating: 4.7 },
  { id: 4, title: "Crear automatizaciones con Flow Builder", category: "Automatización", views: 8540, rating: 4.9 },
  { id: 5, title: "Integración con la DIAN paso a paso", category: "Facturación", views: 7650, rating: 4.8 },
  { id: 6, title: "Reportes personalizados con AI", category: "Reportes", views: 6230, rating: 4.6 },
]

const videoTutorials = [
  { id: 1, title: "Tour completo de NEXUS ERP", duration: "15:30", thumbnail: "intro", views: 25000 },
  { id: 2, title: "Configurar punto de venta", duration: "12:45", thumbnail: "pos", views: 18500 },
  { id: 3, title: "Facturación electrónica DIAN", duration: "20:00", thumbnail: "facturacion", views: 15200 },
  { id: 4, title: "Flow Builder: Automatiza todo", duration: "18:20", thumbnail: "flow", views: 12800 },
  { id: 5, title: "Reportes con inteligencia artificial", duration: "10:15", thumbnail: "ai", views: 9600 },
  { id: 6, title: "Gestión de inventario avanzada", duration: "14:50", thumbnail: "inventario", views: 8400 },
]

const faqItems = [
  {
    question: "¿Cómo configuro la facturación electrónica con la DIAN?",
    answer:
      "Para configurar la facturación electrónica, ve a Configuración > Facturación DIAN. Necesitarás tu certificado digital y la resolución de numeración. NEXUS AI puede guiarte paso a paso en el proceso.",
    category: "Facturación",
  },
  {
    question: "¿Puedo usar NEXUS ERP en múltiples puntos de venta?",
    answer:
      "Sí, NEXUS ERP soporta múltiples puntos de venta. Cada POS puede tener su propia configuración de cajas, impresoras y usuarios. La sincronización es en tiempo real.",
    category: "POS",
  },
  {
    question: "¿Cómo funcionan las automatizaciones del Flow Builder?",
    answer:
      "El Flow Builder permite crear flujos de trabajo automatizados sin código. Puedes conectar triggers (eventos) con acciones y usar lógica condicional. También puedes usar AI para generar flujos desde lenguaje natural.",
    category: "Automatización",
  },
  {
    question: "¿Qué integraciones tiene disponibles NEXUS ERP?",
    answer:
      "NEXUS ERP se integra con: DIAN (facturación electrónica), bancos colombianos (Bancolombia, Davivienda), pasarelas de pago (PSE, Nequi), e-commerce (Shopify, WooCommerce), y más de 50 aplicaciones via API.",
    category: "Integraciones",
  },
  {
    question: "¿Cómo exporto mis datos para contabilidad?",
    answer:
      "Puedes exportar datos en múltiples formatos (Excel, PDF, CSV) desde cualquier módulo. También puedes programar exportaciones automáticas y enviarlas por email o sincronizar directamente con tu software contable.",
    category: "Contabilidad",
  },
]

const learningPaths = [
  {
    id: 1,
    title: "Fundamentos de NEXUS ERP",
    description: "Aprende los conceptos básicos del sistema",
    modules: 8,
    duration: "2 horas",
    progress: 0,
    level: "Principiante",
  },
  {
    id: 2,
    title: "Domina las Ventas",
    description: "Todo sobre CRM, cotizaciones y facturación",
    modules: 12,
    duration: "4 horas",
    progress: 0,
    level: "Intermedio",
  },
  {
    id: 3,
    title: "Automatización Avanzada",
    description: "Crea flujos complejos con Flow Builder",
    modules: 10,
    duration: "3 horas",
    progress: 0,
    level: "Avanzado",
  },
  {
    id: 4,
    title: "Certificación NEXUS Pro",
    description: "Conviértete en experto certificado",
    modules: 20,
    duration: "8 horas",
    progress: 0,
    level: "Experto",
  },
]

const releaseNotes = [
  { version: "3.5.0", date: "15 Ene 2024", title: "Flow Builder con AI", type: "feature" },
  { version: "3.4.2", date: "10 Ene 2024", title: "Mejoras en rendimiento POS", type: "improvement" },
  { version: "3.4.1", date: "5 Ene 2024", title: "Corrección facturación DIAN", type: "fix" },
  { version: "3.4.0", date: "1 Ene 2024", title: "Dashboard Builder", type: "feature" },
]

export function AyudaModule() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("inicio")
  const [aiQuestion, setAiQuestion] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isAiThinking, setIsAiThinking] = useState(false)

  const handleAiQuestion = () => {
    if (!aiQuestion.trim()) return
    setIsAiThinking(true)
    setTimeout(() => {
      setAiResponse(
        `Basándome en tu pregunta sobre "${aiQuestion}", aquí está mi respuesta:\n\nNEXUS ERP ofrece una solución completa para este caso. Te recomiendo seguir estos pasos:\n\n1. **Accede al módulo correspondiente** desde el menú lateral\n2. **Configura los parámetros iniciales** según tus necesidades\n3. **Utiliza el asistente AI** integrado para optimizar el proceso\n\n¿Necesitas más detalles sobre algún paso específico?`,
      )
      setIsAiThinking(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Centro de Ayuda</h1>
          <p className="text-muted-foreground">Documentación, tutoriales y soporte para NEXUS ERP</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <MessageCircle className="h-4 w-4" />
            Chat en Vivo
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-primary to-blue-600">
            <Headphones className="h-4 w-4" />
            Contactar Soporte
          </Button>
        </div>
      </div>

      {/* Search Hero */}
      <Card className="bg-gradient-to-br from-primary/10 via-blue-500/5 to-violet-500/10 border-primary/20">
        <CardContent className="pt-8 pb-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/25">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold">¿En qué podemos ayudarte?</h2>
            <p className="text-muted-foreground">Busca en nuestra documentación o pregunta directamente a NEXUS AI</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar artículos, tutoriales, preguntas frecuentes..."
                className="pl-12 h-14 text-lg rounded-xl bg-background/80 border-border/50"
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg">Buscar</Button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground">Búsquedas populares:</span>
              {["facturación electrónica", "inventario", "flow builder", "reportes"].map((term) => (
                <Badge
                  key={term}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary/20 hover:text-primary"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="documentacion" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 h-auto flex-wrap">
          <TabsTrigger value="documentacion" className="gap-2 data-[state=active]:bg-background">
            <BookOpen className="h-4 w-4" />
            Documentación
          </TabsTrigger>
          <TabsTrigger value="videos" className="gap-2 data-[state=active]:bg-background">
            <Video className="h-4 w-4" />
            Video Tutoriales
          </TabsTrigger>
          <TabsTrigger value="ai" className="gap-2 data-[state=active]:bg-background">
            <Bot className="h-4 w-4" />
            Pregunta a AI
          </TabsTrigger>
          <TabsTrigger value="faq" className="gap-2 data-[state=active]:bg-background">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="cursos" className="gap-2 data-[state=active]:bg-background">
            <GraduationCap className="h-4 w-4" />
            Cursos
          </TabsTrigger>
          <TabsTrigger value="novedades" className="gap-2 data-[state=active]:bg-background">
            <Newspaper className="h-4 w-4" />
            Novedades
          </TabsTrigger>
        </TabsList>

        {/* Documentation Tab */}
        <TabsContent value="documentacion" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Categories Sidebar */}
            <Card className="md:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Categorías</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                        selectedCategory === cat.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <cat.icon className={cn("h-4 w-4", cat.color)} />
                      {cat.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Articles */}
            <div className="md:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Artículos Populares</h3>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  Ver todos <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid gap-3">
                {popularArticles.map((article) => (
                  <Card key={article.id} className="hover:border-primary/30 transition-colors cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium group-hover:text-primary transition-colors">{article.title}</h4>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <Badge variant="secondary" className="text-[10px]">
                                {article.category}
                              </Badge>
                              <span>{article.views.toLocaleString()} vistas</span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                {article.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Video Tutorials Tab */}
        <TabsContent value="videos" className="space-y-6 mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoTutorials.map((video) => (
              <Card
                key={video.id}
                className="overflow-hidden hover:border-primary/30 transition-colors cursor-pointer group"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-blue-500/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-primary ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    {video.duration}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-medium group-hover:text-primary transition-colors">{video.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{video.views.toLocaleString()} visualizaciones</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI Assistant Tab */}
        <TabsContent value="ai" className="mt-6">
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/25 mb-4">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <CardTitle>Pregunta a NEXUS AI</CardTitle>
              <CardDescription>Obtén respuestas instantáneas sobre cualquier funcionalidad del ERP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Escribe tu pregunta aquí... Por ejemplo: ¿Cómo configuro la facturación electrónica?"
                  className="min-h-[100px] resize-none"
                />
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {["¿Cómo creo un flujo?", "Configurar POS", "Exportar reportes"].map((q) => (
                      <Badge
                        key={q}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                        onClick={() => setAiQuestion(q)}
                      >
                        {q}
                      </Badge>
                    ))}
                  </div>
                  <Button onClick={handleAiQuestion} disabled={isAiThinking} className="gap-2">
                    {isAiThinking ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Pensando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Preguntar
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {aiResponse && (
                <Card className="bg-muted/30 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shrink-0">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="prose prose-sm max-w-none">
                          {aiResponse.split("\n").map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                          <span className="text-xs text-muted-foreground">¿Te fue útil?</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-green-500/10 hover:text-green-500"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-red-500/10 hover:text-red-500"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-4 mt-6">
          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((faq, i) => (
              <Card key={i} className="overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <HelpCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">{faq.question}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-4 pb-4 pl-[60px]">
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    <Badge variant="secondary" className="mt-2 text-[10px]">
                      {faq.category}
                    </Badge>
                  </div>
                </details>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="cursos" className="space-y-6 mt-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {learningPaths.map((path) => (
              <Card key={path.id} className="hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <Badge
                      variant={
                        path.level === "Principiante"
                          ? "secondary"
                          : path.level === "Intermedio"
                            ? "default"
                            : path.level === "Avanzado"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {path.level}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-lg mb-1">{path.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{path.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>{path.modules} módulos</span>
                    <span>{path.duration}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progreso</span>
                      <span>{path.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full transition-all"
                        style={{ width: `${path.progress}%` }}
                      />
                    </div>
                  </div>
                  <Button className="w-full mt-4 gap-2">
                    {path.progress > 0 ? "Continuar" : "Comenzar"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Release Notes Tab */}
        <TabsContent value="novedades" className="space-y-4 mt-6">
          <div className="max-w-3xl mx-auto space-y-3">
            {releaseNotes.map((note, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        note.type === "feature" ? "default" : note.type === "improvement" ? "secondary" : "outline"
                      }
                      className={cn(
                        note.type === "feature" && "bg-green-500/20 text-green-500 border-green-500/30",
                        note.type === "improvement" && "bg-blue-500/20 text-blue-500 border-blue-500/30",
                        note.type === "fix" && "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
                      )}
                    >
                      {note.type === "feature"
                        ? "Nueva función"
                        : note.type === "improvement"
                          ? "Mejora"
                          : "Corrección"}
                    </Badge>
                    <div className="flex-1">
                      <h4 className="font-medium">{note.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        v{note.version} • {note.date}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Ver más <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Contact Support */}
      <Card className="bg-gradient-to-r from-muted/50 to-muted/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Headphones className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">¿Necesitas más ayuda?</h3>
                <p className="text-sm text-muted-foreground">Nuestro equipo de soporte está disponible 24/7</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Phone className="h-4 w-4" />
                +57 1 234 5678
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Mail className="h-4 w-4" />
                soporte@nexuserp.co
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-primary to-blue-600">
                <MessageCircle className="h-4 w-4" />
                Abrir Ticket
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
