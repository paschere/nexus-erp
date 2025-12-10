"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Building2,
  Target,
  Sparkles,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Users,
  TrendingUp,
  Settings,
  Rocket,
  Package,
  ShoppingCart,
  Zap,
  FileText,
  MessageSquare,
  Send,
  Bot,
  User,
  Briefcase,
  Shield,
  Globe,
  DollarSign,
  Calendar,
  Network,
} from "lucide-react"

interface OnboardingWizardProps {
  onComplete: (config: any) => void
  onClose: () => void
}

interface Message {
  role: "user" | "assistant"
  content: string
}

const STEPS = [
  { id: "company", title: "Empresa", icon: Building2 },
  { id: "business", title: "Modelo de Negocio", icon: Briefcase },
  { id: "modules", title: "Módulos", icon: Settings },
  { id: "goals", title: "Objetivos", icon: Target },
  { id: "team", title: "Estructura", icon: Users },
  { id: "integrations", title: "Integraciones", icon: Network },
  { id: "ai", title: "AI & Automatización", icon: Sparkles },
  { id: "complete", title: "Finalizar", icon: Rocket },
]

export function OnboardingWizard({ onComplete, onClose }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente virtual de NEXUS ERP. Estoy aquí para ayudarte a configurar tu empresa. ¿Cómo te puedo ayudar en este paso?",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [config, setConfig] = useState({
    // Empresa
    companyName: "",
    nit: "",
    industry: "",
    city: "",
    employees: "",
    email: "",
    phone: "",

    // Modelo de Negocio
    businessModel: "",
    targetMarket: "",
    revenue: "",
    hasInternational: false,

    // Módulos
    selectedModules: [] as string[],

    // Objetivos
    primaryGoals: [] as string[],
    growthTarget: "",
    timeframe: "",

    // Equipo
    departments: {
      ventas: 0,
      operaciones: 0,
      finanzas: 0,
      rrhh: 0,
      it: 0,
    },

    // Integraciones
    selectedIntegrations: [] as string[],

    // AI
    aiFeatures: {
      forecasting: false,
      autoApprovals: false,
      chatbot: false,
      insights: false,
      automation: false,
    },
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const stepMessages = {
      0: "Perfecto, empecemos con la información básica de tu empresa. Puedo ayudarte a rellenar estos datos. ¿Cuál es el nombre de tu empresa?",
      1: "Ahora cuéntame sobre tu modelo de negocio. ¿A qué te dedicas? ¿Retail, servicios, manufactura?",
      2: "Excelente. Ahora seleccionemos los módulos que necesitas. Basado en tu industria, te recomendaría estos módulos. ¿Quieres que te ayude a elegir?",
      3: "¿Cuáles son los objetivos principales que quieres lograr con NEXUS ERP? ¿Aumentar ventas, optimizar inventario, automatizar procesos?",
      4: "Hablemos de tu estructura organizacional. ¿Cuántas personas trabajan en cada departamento?",
      5: "¿Qué herramientas externas utilizas actualmente que quisieras integrar con NEXUS?",
      6: "Habilita las capacidades de IA que te ayudarán a optimizar tu operación. Te recomiendo empezar con Forecasting y Auto Insights.",
      7: "¡Genial! Todo está configurado. Revisa el resumen y cuando estés listo, haz clic en finalizar.",
    }

    setMessages([
      {
        role: "assistant",
        content: stepMessages[currentStep as keyof typeof stepMessages] || "¿En qué puedo ayudarte?",
      },
    ])
  }, [currentStep])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = { role: "user", content: inputMessage }
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response based on step
    setTimeout(() => {
      let aiResponse = ""

      if (currentStep === 0) {
        // Company info step
        if (inputMessage.toLowerCase().includes("empresa") || inputMessage.toLowerCase().includes("negocio")) {
          aiResponse =
            "Entiendo, voy a rellenar la información de tu empresa. ¿El nombre es correcto? También necesitaré el NIT y la ciudad."
          setConfig((prev) => ({
            ...prev,
            companyName: "Distribuidora Colombia S.A.S",
            nit: "900.123.456-7",
            city: "Bogotá",
            employees: "51-200",
          }))
        } else {
          aiResponse =
            "Claro, puedo ayudarte a configurar eso. Necesito que me digas el nombre de tu empresa, NIT, ciudad y número aproximado de empleados."
        }
      } else if (currentStep === 1) {
        // Business model
        aiResponse = "Basado en lo que me cuentas, voy a configurar tu modelo de negocio. ¿Es correcto?"
        setConfig((prev) => ({
          ...prev,
          businessModel: "b2b",
          targetMarket: "nacional",
          revenue: "500m-2b",
        }))
      } else if (currentStep === 2) {
        // Modules
        aiResponse =
          "Perfecto, te he seleccionado los módulos más importantes para tu tipo de negocio. Puedes agregar o quitar los que necesites."
        setConfig((prev) => ({
          ...prev,
          selectedModules: ["ventas", "inventario", "contabilidad", "facturacion", "compras"],
        }))
      } else {
        aiResponse =
          "Entiendo. He actualizado la configuración según tus necesidades. ¿Hay algo más en lo que pueda ayudarte?"
      }

      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }])
      setIsTyping(false)
    }, 1000)
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100

  const canProceed = () => {
    if (currentStep === 0) return config.companyName && config.nit && config.city
    if (currentStep === 1) return config.businessModel && config.targetMarket
    if (currentStep === 2) return config.selectedModules.length > 0
    if (currentStep === 3) return config.primaryGoals.length > 0
    return true
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    onComplete(config)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        // Company Information
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 mx-auto flex items-center justify-center mb-4">
                <Building2 className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Información de tu Empresa</h1>
              <p className="text-muted-foreground">Datos básicos de tu organización</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="companyName">Nombre de la Empresa *</Label>
                <Input
                  id="companyName"
                  placeholder="Ej: Distribuciones Colombia S.A.S"
                  value={config.companyName}
                  onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="nit">NIT *</Label>
                <Input
                  id="nit"
                  placeholder="900.123.456-7"
                  value={config.nit}
                  onChange={(e) => setConfig({ ...config, nit: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Industria *</Label>
                <Select value={config.industry} onValueChange={(v) => setConfig({ ...config, industry: v })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufactura</SelectItem>
                    <SelectItem value="services">Servicios</SelectItem>
                    <SelectItem value="distribution">Distribución</SelectItem>
                    <SelectItem value="technology">Tecnología</SelectItem>
                    <SelectItem value="healthcare">Salud</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city">Ciudad *</Label>
                <Input
                  id="city"
                  placeholder="Bogotá"
                  value={config.city}
                  onChange={(e) => setConfig({ ...config, city: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Número de Empleados</Label>
                <Select value={config.employees} onValueChange={(v) => setConfig({ ...config, employees: v })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201-500">201-500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="email">Email Corporativo</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contacto@empresa.com"
                  value={config.email}
                  onChange={(e) => setConfig({ ...config, email: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  placeholder="+57 300 123 4567"
                  value={config.phone}
                  onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )

      case 1:
        // Business Model
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mx-auto flex items-center justify-center mb-4">
                <Briefcase className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Modelo de Negocio</h1>
              <p className="text-muted-foreground">Ayúdanos a entender tu operación</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Tipo de Negocio *</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {[
                    { id: "b2b", label: "B2B (Empresa a Empresa)", icon: Building2 },
                    { id: "b2c", label: "B2C (Empresa a Consumidor)", icon: Users },
                    { id: "b2b2c", label: "Híbrido (B2B + B2C)", icon: Network },
                    { id: "marketplace", label: "Marketplace", icon: ShoppingCart },
                  ].map((model) => {
                    const Icon = model.icon
                    return (
                      <Card
                        key={model.id}
                        className={`p-4 cursor-pointer transition-all ${
                          config.businessModel === model.id
                            ? "border-teal-500 bg-teal-500/10"
                            : "hover:border-teal-500/50"
                        }`}
                        onClick={() => setConfig({ ...config, businessModel: model.id })}
                      >
                        <Icon className="h-6 w-6 mb-2 text-teal-500" />
                        <p className="text-sm font-medium">{model.label}</p>
                      </Card>
                    )
                  })}
                </div>
              </div>

              <div>
                <Label>Mercado Objetivo *</Label>
                <Select value={config.targetMarket} onValueChange={(v) => setConfig({ ...config, targetMarket: v })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local (Ciudad)</SelectItem>
                    <SelectItem value="regional">Regional (Departamento)</SelectItem>
                    <SelectItem value="nacional">Nacional</SelectItem>
                    <SelectItem value="internacional">Internacional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Facturación Anual Estimada</Label>
                <Select value={config.revenue} onValueChange={(v) => setConfig({ ...config, revenue: v })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-100m">Menos de $100M COP</SelectItem>
                    <SelectItem value="100m-500m">$100M - $500M COP</SelectItem>
                    <SelectItem value="500m-2b">$500M - $2B COP</SelectItem>
                    <SelectItem value="2b-10b">$2B - $10B COP</SelectItem>
                    <SelectItem value="10b+">Más de $10B COP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-teal-500" />
                  <div>
                    <p className="font-medium">Operaciones Internacionales</p>
                    <p className="text-sm text-muted-foreground">¿Tienes clientes o proveedores fuera de Colombia?</p>
                  </div>
                </div>
                <Switch
                  checked={config.hasInternational}
                  onCheckedChange={(checked) => setConfig({ ...config, hasInternational: checked })}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        // Modules
        const modules = [
          { id: "ventas", name: "Ventas & CRM", icon: TrendingUp, desc: "Gestión de clientes y oportunidades" },
          { id: "inventario", name: "Inventario", icon: Package, desc: "Control de stock y almacenes" },
          { id: "contabilidad", name: "Contabilidad", icon: FileText, desc: "Gestión contable y financiera" },
          { id: "facturacion", name: "Facturación DIAN", icon: FileText, desc: "Facturación electrónica" },
          { id: "compras", name: "Compras", icon: ShoppingCart, desc: "Órdenes y proveedores" },
          { id: "rrhh", name: "RRHH", icon: Users, desc: "Gestión de talento humano" },
          { id: "proyectos", name: "Proyectos", icon: Target, desc: "Gestión de proyectos" },
          { id: "pos", name: "POS Retail", icon: ShoppingCart, desc: "Punto de venta" },
          { id: "manufactura", name: "Manufactura", icon: Package, desc: "Producción y MRP" },
          { id: "calidad", name: "Calidad", icon: Shield, desc: "Control de calidad" },
          { id: "tesoreria", name: "Tesorería", icon: DollarSign, desc: "Flujo de caja y bancos" },
          { id: "activos", name: "Activos Fijos", icon: Building2, desc: "Gestión de activos" },
        ]

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 mx-auto flex items-center justify-center mb-4">
                <Settings className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Selecciona tus Módulos</h1>
              <p className="text-muted-foreground">Elige las funcionalidades que necesitas *</p>
              <Badge className="mt-3" variant="outline">
                {config.selectedModules.length} seleccionados
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {modules.map((module) => {
                const Icon = module.icon
                const isSelected = config.selectedModules.includes(module.id)
                return (
                  <Card
                    key={module.id}
                    className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                      isSelected ? "border-teal-500 bg-teal-500/10" : "hover:border-teal-500/50"
                    }`}
                    onClick={() => {
                      setConfig((prev) => ({
                        ...prev,
                        selectedModules: isSelected
                          ? prev.selectedModules.filter((m) => m !== module.id)
                          : [...prev.selectedModules, module.id],
                      }))
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Icon className={`h-6 w-6 ${isSelected ? "text-teal-500" : "text-muted-foreground"}`} />
                      {isSelected && <Check className="h-5 w-5 text-teal-500" />}
                    </div>
                    <p className="font-semibold text-sm mb-1">{module.name}</p>
                    <p className="text-xs text-muted-foreground">{module.desc}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case 3:
        // Goals
        const goals = [
          { id: "increase-sales", label: "Aumentar Ventas", icon: TrendingUp },
          { id: "optimize-inventory", label: "Optimizar Inventario", icon: Package },
          { id: "automate-processes", label: "Automatizar Procesos", icon: Zap },
          { id: "reduce-costs", label: "Reducir Costos", icon: DollarSign },
          { id: "improve-reporting", label: "Mejorar Reportes", icon: FileText },
          { id: "scale-operations", label: "Escalar Operaciones", icon: Rocket },
        ]

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 mx-auto flex items-center justify-center mb-4">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Objetivos Principales</h1>
              <p className="text-muted-foreground">¿Qué quieres lograr con NEXUS ERP? *</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {goals.map((goal) => {
                const Icon = goal.icon
                const isSelected = config.primaryGoals.includes(goal.id)
                return (
                  <Card
                    key={goal.id}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected ? "border-teal-500 bg-teal-500/10" : "hover:border-teal-500/50"
                    }`}
                    onClick={() => {
                      setConfig((prev) => ({
                        ...prev,
                        primaryGoals: isSelected
                          ? prev.primaryGoals.filter((g) => g !== goal.id)
                          : [...prev.primaryGoals, goal.id],
                      }))
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-6 w-6 ${isSelected ? "text-teal-500" : "text-muted-foreground"}`} />
                      <p className="font-medium">{goal.label}</p>
                      {isSelected && <Check className="h-5 w-5 text-teal-500 ml-auto" />}
                    </div>
                  </Card>
                )
              })}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <Label>Meta de Crecimiento</Label>
                <Select value={config.growthTarget} onValueChange={(v) => setConfig({ ...config, growthTarget: v })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">+10% anual</SelectItem>
                    <SelectItem value="25">+25% anual</SelectItem>
                    <SelectItem value="50">+50% anual</SelectItem>
                    <SelectItem value="100">+100% anual (duplicar)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Plazo Objetivo</Label>
                <Select value={config.timeframe} onValueChange={(v) => setConfig({ ...config, timeframe: v })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3m">3 meses</SelectItem>
                    <SelectItem value="6m">6 meses</SelectItem>
                    <SelectItem value="1y">1 año</SelectItem>
                    <SelectItem value="2y">2 años</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 4:
        // Team Structure
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-teal-500 mx-auto flex items-center justify-center mb-4">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Estructura del Equipo</h1>
              <p className="text-muted-foreground">Cuéntanos sobre tu organización</p>
            </div>

            <div className="space-y-4">
              {[
                { key: "ventas", label: "Ventas & Comercial", icon: TrendingUp },
                { key: "operaciones", label: "Operaciones & Logística", icon: Package },
                { key: "finanzas", label: "Finanzas & Contabilidad", icon: DollarSign },
                { key: "rrhh", label: "Recursos Humanos", icon: Users },
                { key: "it", label: "Tecnología & IT", icon: Zap },
              ].map((dept) => {
                const Icon = dept.icon
                return (
                  <div key={dept.key} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <Icon className="h-6 w-6 text-teal-500" />
                    <Label className="flex-1 font-medium">{dept.label}</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => {
                          setConfig((prev) => ({
                            ...prev,
                            departments: {
                              ...prev.departments,
                              [dept.key]: Math.max(0, prev.departments[dept.key as keyof typeof prev.departments] - 1),
                            },
                          }))
                        }}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center font-semibold">
                        {config.departments[dept.key as keyof typeof config.departments]}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => {
                          setConfig((prev) => ({
                            ...prev,
                            departments: {
                              ...prev.departments,
                              [dept.key]: prev.departments[dept.key as keyof typeof prev.departments] + 1,
                            },
                          }))
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>

            <Card className="p-4 bg-teal-500/10 border-teal-500">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-teal-500" />
                <div>
                  <p className="font-semibold">Total de Empleados</p>
                  <p className="text-2xl font-bold text-teal-500">
                    {Object.values(config.departments).reduce((a, b) => a + b, 0)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )

      case 5:
        // Integrations
        const integrations = [
          { id: "stripe", name: "Stripe", desc: "Pagos en línea", icon: DollarSign },
          { id: "bancolombia", name: "Bancolombia", desc: "Integración bancaria", icon: Building2 },
          { id: "mercadolibre", name: "Mercado Libre", desc: "Marketplace", icon: ShoppingCart },
          { id: "google", name: "Google Workspace", desc: "Calendario y Drive", icon: Calendar },
          { id: "whatsapp", name: "WhatsApp Business", desc: "Mensajería", icon: MessageSquare },
          { id: "shopify", name: "Shopify", desc: "E-Commerce", icon: ShoppingCart },
        ]

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 mx-auto flex items-center justify-center mb-4">
                <Network className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Integraciones</h1>
              <p className="text-muted-foreground">Conecta tus herramientas favoritas</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {integrations.map((integration) => {
                const Icon = integration.icon
                const isSelected = config.selectedIntegrations.includes(integration.id)
                return (
                  <Card
                    key={integration.id}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected ? "border-teal-500 bg-teal-500/10" : "hover:border-teal-500/50"
                    }`}
                    onClick={() => {
                      setConfig((prev) => ({
                        ...prev,
                        selectedIntegrations: isSelected
                          ? prev.selectedIntegrations.filter((i) => i !== integration.id)
                          : [...prev.selectedIntegrations, integration.id],
                      }))
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Icon className={`h-6 w-6 ${isSelected ? "text-teal-500" : "text-muted-foreground"}`} />
                      {isSelected && <Check className="h-5 w-5 text-teal-500" />}
                    </div>
                    <p className="font-semibold text-sm mb-1">{integration.name}</p>
                    <p className="text-xs text-muted-foreground">{integration.desc}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case 6:
        // AI Features
        const aiFeaturesList = [
          {
            key: "forecasting",
            label: "Forecasting AI",
            desc: "Predicción de demanda y ventas",
            icon: TrendingUp,
          },
          {
            key: "autoApprovals",
            label: "Auto Aprobaciones",
            desc: "Automatiza aprobaciones de bajo monto",
            icon: Check,
          },
          {
            key: "chatbot",
            label: "Chatbot de Soporte",
            desc: "Asistente 24/7 para empleados",
            icon: MessageSquare,
          },
          {
            key: "insights",
            label: "Auto Insights",
            desc: "Alertas y recomendaciones inteligentes",
            icon: Sparkles,
          },
          {
            key: "automation",
            label: "Workflows AI",
            desc: "Automatizaciones con IA",
            icon: Zap,
          },
        ]

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 mx-auto flex items-center justify-center animate-pulse">
                <Sparkles className="h-16 w-16 text-white" />
              </div>
            </div>

            <div className="space-y-3">
              {aiFeaturesList.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.key}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-violet-500" />
                      <div>
                        <p className="font-medium">{feature.label}</p>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                    <Switch
                      checked={config.aiFeatures[feature.key as keyof typeof config.aiFeatures]}
                      onCheckedChange={(checked) => {
                        setConfig((prev) => ({
                          ...prev,
                          aiFeatures: {
                            ...prev.aiFeatures,
                            [feature.key]: checked,
                          },
                        }))
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 7:
        // Complete
        return (
          <div className="space-y-8 text-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-teal-500 mx-auto flex items-center justify-center animate-pulse">
                <Rocket className="h-16 w-16 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold mb-3">¡Todo Listo!</h1>
              <p className="text-lg text-muted-foreground">Tu ERP NEXUS está configurado y listo para usar</p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
              <Card className="p-6 text-left">
                <Building2 className="h-8 w-8 text-teal-500 mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Empresa</p>
                <p className="font-semibold">{config.companyName}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {config.city}, Colombia • {config.employees} empleados
                </p>
              </Card>

              <Card className="p-6 text-left">
                <Briefcase className="h-8 w-8 text-blue-500 mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Industria</p>
                <p className="font-semibold capitalize">{config.industry}</p>
                <p className="text-xs text-muted-foreground mt-1">Modelo {config.businessModel?.toUpperCase()}</p>
              </Card>

              <Card className="p-6 text-left">
                <Settings className="h-8 w-8 text-purple-500 mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Módulos Activos</p>
                <p className="font-semibold text-2xl">{config.selectedModules.length}</p>
              </Card>

              <Card className="p-6 text-left">
                <Sparkles className="h-8 w-8 text-violet-500 mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Funciones AI</p>
                <p className="font-semibold text-2xl">{Object.values(config.aiFeatures).filter(Boolean).length}</p>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-[95vw] h-[95vh] bg-background border border-border/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex-shrink-0 h-16 border-b border-border/50 bg-muted/30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Configuración Inicial</h2>
              <p className="text-xs text-muted-foreground">
                Paso {currentStep + 1} de {STEPS.length}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left side - Main content with scroll */}
          <div className="flex-1 flex flex-col h-full">
            {/* Progress bar */}
            <div className="flex-shrink-0 px-8 pt-6 pb-4">
              <div className="w-full bg-border/30 h-2 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Steps indicator - horizontal scroll if needed */}
              <ScrollArea className="w-full">
                <div className="flex items-center justify-start gap-2 pb-2">
                  {STEPS.map((step, index) => {
                    const Icon = step.icon
                    const isActive = index === currentStep
                    const isCompleted = index < currentStep
                    return (
                      <div key={step.id} className="flex items-center">
                        <div className="flex flex-col items-center gap-2 min-w-fit">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                              isActive
                                ? "bg-gradient-to-br from-teal-500 to-blue-500 scale-110 shadow-lg"
                                : isCompleted
                                  ? "bg-teal-500/20 border-2 border-teal-500"
                                  : "bg-muted border-2 border-border"
                            }`}
                          >
                            {isCompleted ? (
                              <Check className="h-6 w-6 text-teal-500" />
                            ) : (
                              <Icon className={`h-6 w-6 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                            )}
                          </div>
                          <p
                            className={`text-xs font-medium whitespace-nowrap ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {step.title}
                          </p>
                        </div>
                        {index < STEPS.length - 1 && (
                          <div className={`w-12 h-0.5 mx-2 ${isCompleted ? "bg-teal-500" : "bg-border"}`} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>

            <div className="flex-1 overflow-y-auto px-8 pb-6">
              <div className="max-w-4xl mx-auto">{renderStepContent()}</div>
            </div>

            <div className="flex-shrink-0 h-20 border-t border-border/50 bg-muted/30 px-8 flex items-center justify-between">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Atrás
              </Button>

              <div className="flex items-center gap-2">
                {currentStep < STEPS.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleComplete}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    Empezar a Usar NEXUS
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="w-96 border-l border-border/50 bg-muted/30 flex flex-col overflow-hidden">
            {/* Fixed chat header */}
            <div className="flex-shrink-0 h-16 border-b border-border/50 px-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">Asistente NEXUS AI</p>
                <p className="text-xs text-muted-foreground">Estoy aquí para ayudarte</p>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.role === "user" ? "bg-teal-500 text-white" : "bg-background border border-border"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-background border border-border p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="flex-shrink-0 border-t border-border/50 p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Pregúntame lo que necesites..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-br from-violet-400 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Puedo ayudarte a rellenar cualquier información
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
