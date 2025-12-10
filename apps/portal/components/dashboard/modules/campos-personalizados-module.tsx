"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Search,
  Trash2,
  GripVertical,
  Edit,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Type,
  Hash,
  Calendar,
  ToggleLeft,
  List,
  Link2,
  FileUp,
  ImageIcon,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Percent,
  Clock,
  User,
  Users,
  Tag,
  Palette,
  Calculator,
  FileText,
  CheckSquare,
  Radio,
  Code,
  Globe,
  Briefcase,
  Building,
  Package,
  ShoppingCart,
  Factory,
  Truck,
  CreditCard,
  AlertCircle,
  Layers,
  Database,
  Star,
  Sparkles,
  Bot,
  Send,
  RefreshCw,
  Wand2,
  Play,
  Download,
  Upload,
  X,
  BarChart3,
  PieChart,
  Layout,
  Smartphone,
  Monitor,
  Check,
  ArrowUpDown,
  Settings,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomField {
  id: string
  name: string
  key: string
  type: FieldType
  module: string
  entity: string
  required: boolean
  visible: boolean
  searchable: boolean
  unique: boolean
  defaultValue?: string
  placeholder?: string
  helpText?: string
  options?: string[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
  conditional?: {
    field: string
    operator: string
    value: string
  }
  permissions: {
    view: string[]
    edit: string[]
  }
  order: number
  group?: string
  width?: "quarter" | "half" | "three-quarter" | "full"
  createdAt: string
  updatedAt: string
}

type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "decimal"
  | "currency"
  | "percent"
  | "date"
  | "datetime"
  | "time"
  | "daterange"
  | "boolean"
  | "select"
  | "multiselect"
  | "radio"
  | "checkbox"
  | "email"
  | "phone"
  | "url"
  | "file"
  | "image"
  | "gallery"
  | "video"
  | "audio"
  | "location"
  | "address"
  | "color"
  | "rating"
  | "slider"
  | "user"
  | "users"
  | "relation"
  | "lookup"
  | "formula"
  | "rollup"
  | "autonumber"
  | "barcode"
  | "qrcode"
  | "json"
  | "tags"
  | "signature"
  | "progress"

const fieldCategories = [
  {
    name: "Texto",
    fields: [
      { type: "text", label: "Texto", icon: Type, color: "bg-blue-500", description: "Campo de texto simple" },
      {
        type: "textarea",
        label: "Texto Largo",
        icon: FileText,
        color: "bg-blue-600",
        description: "Área de texto multilínea",
      },
      {
        type: "richtext",
        label: "Texto Enriquecido",
        icon: FileText,
        color: "bg-blue-700",
        description: "Editor con formato",
      },
    ],
  },
  {
    name: "Números",
    fields: [
      { type: "number", label: "Número", icon: Hash, color: "bg-purple-500", description: "Valores numéricos enteros" },
      {
        type: "decimal",
        label: "Decimal",
        icon: Calculator,
        color: "bg-purple-600",
        description: "Valores con decimales",
      },
      {
        type: "currency",
        label: "Moneda",
        icon: DollarSign,
        color: "bg-emerald-500",
        description: "Valores monetarios (COP, USD)",
      },
      {
        type: "percent",
        label: "Porcentaje",
        icon: Percent,
        color: "bg-emerald-600",
        description: "Valores porcentuales",
      },
      {
        type: "slider",
        label: "Deslizador",
        icon: ArrowUpDown,
        color: "bg-purple-700",
        description: "Selección de rango",
      },
      {
        type: "progress",
        label: "Progreso",
        icon: BarChart3,
        color: "bg-purple-800",
        description: "Barra de progreso",
      },
    ],
  },
  {
    name: "Fecha y Hora",
    fields: [
      { type: "date", label: "Fecha", icon: Calendar, color: "bg-orange-500", description: "Selector de fecha" },
      { type: "datetime", label: "Fecha y Hora", icon: Clock, color: "bg-orange-600", description: "Fecha con hora" },
      { type: "time", label: "Hora", icon: Clock, color: "bg-orange-700", description: "Solo hora" },
      {
        type: "daterange",
        label: "Rango Fechas",
        icon: Calendar,
        color: "bg-orange-800",
        description: "Fecha inicio y fin",
      },
    ],
  },
  {
    name: "Selección",
    fields: [
      {
        type: "boolean",
        label: "Sí/No",
        icon: ToggleLeft,
        color: "bg-teal-500",
        description: "Toggle verdadero/falso",
      },
      { type: "select", label: "Lista", icon: List, color: "bg-indigo-500", description: "Selección única" },
      {
        type: "multiselect",
        label: "Lista Múltiple",
        icon: CheckSquare,
        color: "bg-indigo-600",
        description: "Selección múltiple",
      },
      { type: "radio", label: "Radio", icon: Radio, color: "bg-indigo-700", description: "Opciones exclusivas" },
      {
        type: "checkbox",
        label: "Checkbox",
        icon: CheckSquare,
        color: "bg-teal-600",
        description: "Múltiples checkboxes",
      },
      { type: "rating", label: "Calificación", icon: Star, color: "bg-yellow-500", description: "Estrellas 1-5" },
    ],
  },
  {
    name: "Contacto",
    fields: [
      { type: "email", label: "Email", icon: Mail, color: "bg-pink-500", description: "Dirección de correo" },
      { type: "phone", label: "Teléfono", icon: Phone, color: "bg-pink-600", description: "Número telefónico" },
      { type: "url", label: "URL", icon: Globe, color: "bg-pink-700", description: "Enlace web" },
      { type: "address", label: "Dirección", icon: MapPin, color: "bg-pink-800", description: "Dirección completa" },
    ],
  },
  {
    name: "Archivos",
    fields: [
      { type: "file", label: "Archivo", icon: FileUp, color: "bg-amber-500", description: "Subir archivos" },
      { type: "image", label: "Imagen", icon: ImageIcon, color: "bg-amber-600", description: "Subir imágenes" },
      { type: "gallery", label: "Galería", icon: ImageIcon, color: "bg-amber-700", description: "Múltiples imágenes" },
      { type: "video", label: "Video", icon: Play, color: "bg-amber-800", description: "Archivos de video" },
      { type: "signature", label: "Firma", icon: Edit, color: "bg-amber-900", description: "Firma digital" },
    ],
  },
  {
    name: "Ubicación",
    fields: [
      { type: "location", label: "Coordenadas", icon: MapPin, color: "bg-red-500", description: "Coordenadas GPS" },
      { type: "address", label: "Dirección", icon: MapPin, color: "bg-red-600", description: "Dirección estructurada" },
    ],
  },
  {
    name: "Relaciones",
    fields: [
      { type: "user", label: "Usuario", icon: User, color: "bg-cyan-500", description: "Referencia a usuario" },
      { type: "users", label: "Usuarios", icon: Users, color: "bg-cyan-600", description: "Múltiples usuarios" },
      { type: "relation", label: "Relación", icon: Link2, color: "bg-violet-500", description: "Enlace a otro módulo" },
      {
        type: "lookup",
        label: "Búsqueda",
        icon: Search,
        color: "bg-violet-600",
        description: "Campo de otro registro",
      },
    ],
  },
  {
    name: "Calculados",
    fields: [
      { type: "formula", label: "Fórmula", icon: Calculator, color: "bg-slate-500", description: "Campo calculado" },
      {
        type: "rollup",
        label: "Rollup",
        icon: PieChart,
        color: "bg-slate-600",
        description: "Agregación de registros",
      },
      {
        type: "autonumber",
        label: "Autonumérico",
        icon: Hash,
        color: "bg-slate-700",
        description: "Secuencia automática",
      },
    ],
  },
  {
    name: "Especiales",
    fields: [
      { type: "barcode", label: "Código Barras", icon: Code, color: "bg-gray-500", description: "Código de barras" },
      { type: "qrcode", label: "Código QR", icon: Code, color: "bg-gray-600", description: "Código QR" },
      { type: "color", label: "Color", icon: Palette, color: "bg-fuchsia-500", description: "Selector de color" },
      { type: "tags", label: "Etiquetas", icon: Tag, color: "bg-rose-500", description: "Tags múltiples" },
      { type: "json", label: "JSON", icon: Code, color: "bg-gray-700", description: "Datos estructurados" },
    ],
  },
]

const allFieldTypes = fieldCategories.flatMap((c) => c.fields)

const modules = [
  {
    id: "clientes",
    label: "Clientes",
    icon: Building,
    color: "text-cyan-500",
    entities: ["cliente", "contacto", "direccion"],
  },
  {
    id: "ventas",
    label: "Ventas / CRM",
    icon: ShoppingCart,
    color: "text-blue-500",
    entities: ["oportunidad", "cotizacion", "pedido"],
  },
  {
    id: "compras",
    label: "Compras",
    icon: Package,
    color: "text-green-500",
    entities: ["solicitud", "orden_compra", "recepcion"],
  },
  {
    id: "inventario",
    label: "Inventario",
    icon: Database,
    color: "text-purple-500",
    entities: ["producto", "lote", "movimiento"],
  },
  {
    id: "contabilidad",
    label: "Contabilidad",
    icon: Calculator,
    color: "text-orange-500",
    entities: ["asiento", "cuenta", "tercero"],
  },
  {
    id: "rrhh",
    label: "Recursos Humanos",
    icon: Users,
    color: "text-pink-500",
    entities: ["empleado", "contrato", "nomina"],
  },
  {
    id: "manufactura",
    label: "Manufactura",
    icon: Factory,
    color: "text-indigo-500",
    entities: ["orden_produccion", "bom", "ruta"],
  },
  {
    id: "proyectos",
    label: "Proyectos",
    icon: Briefcase,
    color: "text-teal-500",
    entities: ["proyecto", "tarea", "recurso"],
  },
  {
    id: "proveedores",
    label: "Proveedores",
    icon: Truck,
    color: "text-amber-500",
    entities: ["proveedor", "evaluacion", "contrato"],
  },
  {
    id: "facturacion",
    label: "Facturación",
    icon: CreditCard,
    color: "text-red-500",
    entities: ["factura", "nota_credito", "pago"],
  },
]

const roles = ["admin", "gerente", "ventas", "compras", "contabilidad", "inventario", "rrhh", "produccion", "todos"]

const sampleFields: CustomField[] = [
  {
    id: "1",
    name: "NIT",
    key: "nit",
    type: "text",
    module: "clientes",
    entity: "cliente",
    required: true,
    visible: true,
    searchable: true,
    unique: true,
    placeholder: "900.123.456-7",
    helpText: "Número de Identificación Tributaria",
    validation: { pattern: "^[0-9]{9}-[0-9]$", message: "Formato: 900123456-7" },
    permissions: { view: ["todos"], edit: ["admin", "ventas"] },
    order: 1,
    group: "Información Fiscal",
    width: "half",
    createdAt: "2024-01-15",
    updatedAt: "2024-02-20",
  },
  {
    id: "2",
    name: "Fecha de Vencimiento",
    key: "fecha_vencimiento",
    type: "date",
    module: "inventario",
    entity: "lote",
    required: false,
    visible: true,
    searchable: true,
    unique: false,
    helpText: "Fecha límite del producto",
    permissions: { view: ["todos"], edit: ["inventario", "admin"] },
    order: 2,
    width: "quarter",
    createdAt: "2024-01-20",
    updatedAt: "2024-02-15",
  },
  {
    id: "3",
    name: "Certificaciones",
    key: "certificaciones",
    type: "multiselect",
    module: "proveedores",
    entity: "proveedor",
    required: false,
    visible: true,
    searchable: true,
    unique: false,
    options: ["ISO 9001", "ISO 14001", "BASC", "INVIMA", "HACCP", "BPM", "FSSC 22000"],
    permissions: { view: ["todos"], edit: ["compras", "admin"] },
    order: 3,
    width: "full",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-25",
  },
  {
    id: "4",
    name: "Margen de Ganancia",
    key: "margen_ganancia",
    type: "formula",
    module: "inventario",
    entity: "producto",
    required: false,
    visible: true,
    searchable: false,
    unique: false,
    defaultValue: "((precio_venta - costo) / precio_venta) * 100",
    helpText: "Calculado automáticamente",
    permissions: { view: ["admin", "ventas"], edit: [] },
    order: 4,
    width: "quarter",
    createdAt: "2024-02-05",
    updatedAt: "2024-02-28",
  },
  {
    id: "5",
    name: "Firma del Cliente",
    key: "firma_cliente",
    type: "signature",
    module: "ventas",
    entity: "pedido",
    required: true,
    visible: true,
    searchable: false,
    unique: false,
    helpText: "Firma de aceptación del cliente",
    permissions: { view: ["todos"], edit: ["ventas"] },
    order: 5,
    width: "half",
    createdAt: "2024-02-10",
    updatedAt: "2024-03-01",
  },
]

export function CamposPersonalizadosModule() {
  const [fields, setFields] = useState<CustomField[]>(sampleFields)
  const [selectedModule, setSelectedModule] = useState<string>("all")
  const [selectedEntity, setSelectedEntity] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingField, setEditingField] = useState<CustomField | null>(null)
  const [activeTab, setActiveTab] = useState<"fields" | "preview" | "forms">("fields")
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [showAIPanel, setShowAIPanel] = useState(true)
  const [aiMessages, setAiMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Hola! Soy tu asistente de personalización. Puedo ayudarte a:\n\n• Sugerir campos según tu industria\n• Crear validaciones inteligentes\n• Optimizar formularios para mejor UX\n• Generar campos desde descripciones\n\n¿Qué necesitas personalizar?",
    },
  ])
  const [aiInput, setAiInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [newField, setNewField] = useState<Partial<CustomField>>({
    name: "",
    key: "",
    type: "text",
    module: "ventas",
    entity: "cliente",
    required: false,
    visible: true,
    searchable: true,
    unique: false,
    options: [],
    width: "full",
    permissions: { view: ["todos"], edit: ["admin"] },
  })

  const filteredFields = fields.filter((field) => {
    const matchesModule = selectedModule === "all" || field.module === selectedModule
    const matchesEntity = selectedEntity === "all" || field.entity === selectedEntity
    const matchesSearch =
      field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      field.key.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesModule && matchesEntity && matchesSearch
  })

  const getFieldTypeInfo = (type: FieldType) => allFieldTypes.find((ft) => ft.type === type)

  const currentModuleEntities =
    selectedModule !== "all"
      ? modules.find((m) => m.id === selectedModule)?.entities || []
      : modules.flatMap((m) => m.entities)

  const handleCreateField = () => {
    if (!newField.name || !newField.key || !newField.type || !newField.module) return

    const field: CustomField = {
      id: Date.now().toString(),
      name: newField.name,
      key: newField.key,
      type: newField.type as FieldType,
      module: newField.module,
      entity: newField.entity || "general",
      required: newField.required || false,
      visible: newField.visible !== false,
      searchable: newField.searchable !== false,
      unique: newField.unique || false,
      defaultValue: newField.defaultValue,
      placeholder: newField.placeholder,
      helpText: newField.helpText,
      options: newField.options,
      validation: newField.validation,
      conditional: newField.conditional,
      permissions: newField.permissions || { view: ["todos"], edit: ["admin"] },
      order: fields.length + 1,
      group: newField.group,
      width: newField.width || "full",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    setFields([...fields, field])
    setShowCreateDialog(false)
    setNewField({
      name: "",
      key: "",
      type: "text",
      module: "ventas",
      entity: "cliente",
      required: false,
      visible: true,
      searchable: true,
      unique: false,
      options: [],
      width: "full",
      permissions: { view: ["todos"], edit: ["admin"] },
    })
  }

  const handleAISend = () => {
    if (!aiInput.trim()) return
    const userMessage = aiInput
    setAiMessages([...aiMessages, { role: "user", content: userMessage }])
    setAiInput("")
    setIsProcessing(true)

    setTimeout(() => {
      let response = ""
      if (userMessage.toLowerCase().includes("sugerir") || userMessage.toLowerCase().includes("recomendar")) {
        response = `Basándome en tu módulo de **${selectedModule === "all" ? "ERP" : modules.find((m) => m.id === selectedModule)?.label}**, te sugiero estos campos:\n\n📋 **Campos recomendados:**\n\n1. **Código Interno** (autonumber)\n   - Clave: \`codigo_interno\`\n   - Genera secuencia automática\n\n2. **Estado** (select)\n   - Opciones: Activo, Inactivo, Pendiente\n   - Requerido, filtrable\n\n3. **Fecha Creación** (datetime)\n   - Auto-llenado al crear\n   - Solo lectura\n\n4. **Responsable** (user)\n   - Asigna usuario del sistema\n\n5. **Notas** (richtext)\n   - Comentarios con formato\n\n¿Quieres que cree alguno de estos campos?`
      } else if (userMessage.toLowerCase().includes("crear") || userMessage.toLowerCase().includes("generar")) {
        response = `¡Perfecto! Voy a analizar tu solicitud...\n\n✅ He detectado que quieres crear un campo. Puedo generarlo automáticamente.\n\n**Describe el campo que necesitas:**\n- ¿Qué tipo de dato almacena?\n- ¿Es obligatorio?\n- ¿En qué módulo va?\n- ¿Necesita validación especial?\n\nEjemplo: "Necesito un campo de teléfono celular obligatorio para clientes, que valide formato colombiano (+57)"`
      } else if (userMessage.toLowerCase().includes("validación") || userMessage.toLowerCase().includes("validar")) {
        response = `Te ayudo con **validaciones inteligentes**:\n\n🔍 **Validaciones disponibles:**\n\n• **Texto**: min/max caracteres, regex, email, URL\n• **Números**: rango (min-max), decimales, positivos\n• **Fechas**: rango, no futuro, no pasado\n• **Archivos**: tipos permitidos, tamaño máximo\n\n📝 **Ejemplos de regex comunes:**\n\n• NIT: \`^[0-9]{9}-[0-9]$\`\n• Celular CO: \`^(\\+57)?3[0-9]{9}$\`\n• Email: \`^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$\`\n\n¿Qué validación necesitas configurar?`
      } else if (userMessage.toLowerCase().includes("formulario") || userMessage.toLowerCase().includes("form")) {
        response = `Te ayudo a **optimizar tu formulario**:\n\n🎨 **Mejores prácticas de UX:**\n\n1. **Agrupar campos** relacionados\n2. **Campos más usados** primero\n3. **Indicar obligatorios** claramente\n4. **Tamaños apropiados** (quarter/half/full)\n5. **Ayuda contextual** en campos complejos\n\n📊 **Análisis de tu formulario actual:**\n\n• ${filteredFields.length} campos configurados\n• ${filteredFields.filter((f) => f.required).length} obligatorios\n• ${filteredFields.filter((f) => !f.group).length} sin agrupar\n\n💡 **Sugerencia:** Agrupa los campos fiscales (NIT, régimen, etc.) en una sección "Información Tributaria".`
      } else {
        response = `Entendido. Como asistente de campos personalizados puedo:\n\n1. 🎯 **Sugerir campos** según tu industria y módulo\n2. 🔧 **Crear campos** desde descripciones en lenguaje natural\n3. ✅ **Configurar validaciones** inteligentes\n4. 📋 **Optimizar formularios** para mejor UX\n5. 🔄 **Migrar campos** entre entidades\n6. 📊 **Analizar uso** de campos existentes\n\n¿Qué te gustaría hacer?`
      }
      setAiMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsProcessing(false)
    }, 1200)
  }

  const handleGenerateFieldWithAI = () => {
    setIsProcessing(true)
    setTimeout(() => {
      const generatedField: Partial<CustomField> = {
        name: "Calificación de Crédito",
        key: "calificacion_credito",
        type: "select",
        module: selectedModule === "all" ? "clientes" : selectedModule,
        entity: "cliente",
        required: true,
        visible: true,
        searchable: true,
        options: ["AAA", "AA", "A", "BBB", "BB", "B", "CCC", "CC", "C", "D"],
        helpText: "Calificación de riesgo crediticio del cliente",
        width: "quarter",
      }
      setNewField({ ...newField, ...generatedField })
      setIsProcessing(false)
      setAiMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `✨ He generado un campo de **Calificación de Crédito**:\n\n• Tipo: Lista de selección\n• Opciones: AAA hasta D (escala estándar)\n• Módulo: Clientes\n• Requerido: Sí\n\nEl campo está listo en el formulario de creación. ¿Quieres que lo ajuste?`,
        },
      ])
    }, 1500)
  }

  const fieldsByModule = modules.map((mod) => ({
    ...mod,
    count: fields.filter((f) => f.module === mod.id).length,
  }))

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Campos Personalizados</h1>
            <p className="text-sm text-muted-foreground">Personaliza la estructura de datos de cada módulo del ERP</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-card">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-card">
            <Upload className="h-4 w-4" />
            Importar
          </Button>
          <Button className="gap-2 bg-violet-600 hover:bg-violet-700" onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4" />
            Nuevo Campo
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-3 shrink-0">
        {[
          { label: "Total Campos", value: fields.length.toString(), icon: Layers, color: "text-violet-400" },
          {
            label: "Módulos",
            value: new Set(fields.map((f) => f.module)).size.toString(),
            icon: Database,
            color: "text-blue-400",
          },
          {
            label: "Obligatorios",
            value: fields.filter((f) => f.required).length.toString(),
            icon: AlertCircle,
            color: "text-red-400",
          },
          {
            label: "Calculados",
            value: fields.filter((f) => ["formula", "rollup", "autonumber"].includes(f.type)).length.toString(),
            icon: Calculator,
            color: "text-amber-400",
          },
          {
            label: "Relaciones",
            value: fields.filter((f) => ["relation", "lookup", "user", "users"].includes(f.type)).length.toString(),
            icon: Link2,
            color: "text-cyan-400",
          },
          {
            label: "Archivos",
            value: fields.filter((f) => ["file", "image", "gallery", "signature"].includes(f.type)).length.toString(),
            icon: FileUp,
            color: "text-green-400",
          },
        ].map((stat, i) => (
          <Card key={i} className="bg-card/50">
            <CardContent className="p-3 flex items-center gap-3">
              <div className={cn("p-2 rounded-lg bg-secondary", stat.color)}>
                <stat.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left Sidebar - Modules */}
        <div className="w-56 shrink-0">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-2 shrink-0">
              <CardTitle className="text-sm">Módulos</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-2 space-y-1">
                  <Button
                    variant={selectedModule === "all" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 h-9"
                    onClick={() => {
                      setSelectedModule("all")
                      setSelectedEntity("all")
                    }}
                  >
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 text-left">Todos</span>
                    <Badge variant="outline" className="h-5 text-[10px]">
                      {fields.length}
                    </Badge>
                  </Button>
                  {fieldsByModule.map((mod) => (
                    <Button
                      key={mod.id}
                      variant={selectedModule === mod.id ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2 h-9"
                      onClick={() => {
                        setSelectedModule(mod.id)
                        setSelectedEntity("all")
                      }}
                    >
                      <mod.icon className={cn("h-4 w-4", mod.color)} />
                      <span className="flex-1 text-left text-sm">{mod.label}</span>
                      <Badge variant="outline" className="h-5 text-[10px]">
                        {mod.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Center - Fields List */}
        <div className="flex-1 flex flex-col min-w-0">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as any)}
            className="flex-1 flex flex-col min-h-0"
          >
            <div className="flex items-center justify-between mb-3 shrink-0">
              <TabsList className="bg-card">
                <TabsTrigger value="fields" className="gap-2">
                  <Layers className="h-3 w-3" />
                  Campos
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-2">
                  <Eye className="h-3 w-3" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="forms" className="gap-2">
                  <Layout className="h-3 w-3" />
                  Formularios
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar campos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-8 w-64 bg-card"
                  />
                </div>
                {selectedModule !== "all" && (
                  <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                    <SelectTrigger className="w-40 h-8 bg-card">
                      <SelectValue placeholder="Entidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las entidades</SelectItem>
                      {currentModuleEntities.map((entity) => (
                        <SelectItem key={entity} value={entity}>
                          {entity.replace("_", " ").charAt(0).toUpperCase() + entity.slice(1).replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            <TabsContent value="fields" className="flex-1 m-0 min-h-0">
              <Card className="h-full flex flex-col">
                <CardContent className="flex-1 p-0 min-h-0">
                  <ScrollArea className="h-full">
                    <div className="p-4">
                      <table className="w-full">
                        <thead className="sticky top-0 bg-card z-10">
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground w-8"></th>
                            <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Campo</th>
                            <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Tipo</th>
                            <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Módulo</th>
                            <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Entidad</th>
                            <th className="text-center py-2 px-3 text-xs font-medium text-muted-foreground">Req.</th>
                            <th className="text-center py-2 px-3 text-xs font-medium text-muted-foreground">Visible</th>
                            <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredFields.map((field) => {
                            const typeInfo = getFieldTypeInfo(field.type)
                            const moduleInfo = modules.find((m) => m.id === field.module)
                            return (
                              <tr key={field.id} className="border-b border-border/50 hover:bg-secondary/30 group">
                                <td className="py-2 px-3">
                                  <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab" />
                                </td>
                                <td className="py-2 px-3">
                                  <div>
                                    <p className="font-medium text-sm">{field.name}</p>
                                    <p className="text-xs text-muted-foreground font-mono">{field.key}</p>
                                  </div>
                                </td>
                                <td className="py-2 px-3">
                                  <div className="flex items-center gap-2">
                                    {typeInfo && (
                                      <div
                                        className={cn(
                                          "w-6 h-6 rounded flex items-center justify-center",
                                          typeInfo.color,
                                        )}
                                      >
                                        <typeInfo.icon className="h-3 w-3 text-white" />
                                      </div>
                                    )}
                                    <span className="text-sm">{typeInfo?.label || field.type}</span>
                                  </div>
                                </td>
                                <td className="py-2 px-3">
                                  {moduleInfo && (
                                    <Badge variant="outline" className="gap-1">
                                      <moduleInfo.icon className={cn("h-3 w-3", moduleInfo.color)} />
                                      {moduleInfo.label}
                                    </Badge>
                                  )}
                                </td>
                                <td className="py-2 px-3">
                                  <span className="text-sm text-muted-foreground capitalize">
                                    {field.entity.replace("_", " ")}
                                  </span>
                                </td>
                                <td className="py-2 px-3 text-center">
                                  <Switch
                                    checked={field.required}
                                    onCheckedChange={() =>
                                      setFields(
                                        fields.map((f) => (f.id === field.id ? { ...f, required: !f.required } : f)),
                                      )
                                    }
                                    className="scale-75"
                                  />
                                </td>
                                <td className="py-2 px-3 text-center">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() =>
                                      setFields(
                                        fields.map((f) => (f.id === field.id ? { ...f, visible: !f.visible } : f)),
                                      )
                                    }
                                  >
                                    {field.visible ? (
                                      <Eye className="h-3 w-3 text-green-500" />
                                    ) : (
                                      <EyeOff className="h-3 w-3 text-muted-foreground" />
                                    )}
                                  </Button>
                                </td>
                                <td className="py-2 px-3">
                                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() => setEditingField(field)}
                                    >
                                      <Edit className="h-3 w-3" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-7 w-7">
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 text-destructive hover:text-destructive"
                                      onClick={() => setFields(fields.filter((f) => f.id !== field.id))}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>

                      {filteredFields.length === 0 && (
                        <div className="text-center py-12">
                          <Layers className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                          <p className="text-muted-foreground">No hay campos configurados</p>
                          <Button className="mt-4 gap-2" onClick={() => setShowCreateDialog(true)}>
                            <Plus className="h-4 w-4" />
                            Crear primer campo
                          </Button>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 m-0 min-h-0">
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-2 shrink-0 flex-row items-center justify-between">
                  <CardTitle className="text-sm">Vista Previa del Formulario</CardTitle>
                  <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                    {[
                      { id: "desktop", icon: Monitor },
                      { id: "tablet", icon: Smartphone },
                      { id: "mobile", icon: Smartphone },
                    ].map((device) => (
                      <Button
                        key={device.id}
                        variant={previewDevice === device.id ? "default" : "ghost"}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => setPreviewDevice(device.id as any)}
                      >
                        <device.icon className={cn("h-3 w-3", device.id === "mobile" && "rotate-90")} />
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-4 min-h-0 flex items-center justify-center bg-secondary/20">
                  <div
                    className={cn(
                      "bg-card rounded-xl border border-border p-6 transition-all",
                      previewDevice === "desktop" && "w-full max-w-3xl",
                      previewDevice === "tablet" && "w-[600px]",
                      previewDevice === "mobile" && "w-[375px]",
                    )}
                  >
                    <h3 className="font-semibold mb-4">
                      {selectedModule === "all" ? "Formulario" : modules.find((m) => m.id === selectedModule)?.label}
                    </h3>
                    <div
                      className={cn(
                        "grid gap-4",
                        previewDevice === "desktop" && "grid-cols-4",
                        previewDevice === "tablet" && "grid-cols-2",
                        previewDevice === "mobile" && "grid-cols-1",
                      )}
                    >
                      {filteredFields
                        .filter((f) => f.visible)
                        .map((field) => {
                          const colSpan =
                            field.width === "quarter"
                              ? 1
                              : field.width === "half"
                                ? 2
                                : field.width === "three-quarter"
                                  ? 3
                                  : 4
                          return (
                            <div
                              key={field.id}
                              className={cn(
                                previewDevice === "desktop" && `col-span-${Math.min(colSpan, 4)}`,
                                previewDevice === "tablet" && `col-span-${Math.min(colSpan, 2)}`,
                                previewDevice === "mobile" && "col-span-1",
                              )}
                              style={{
                                gridColumn:
                                  previewDevice === "desktop"
                                    ? `span ${Math.min(colSpan, 4)}`
                                    : previewDevice === "tablet"
                                      ? `span ${Math.min(colSpan, 2)}`
                                      : "span 1",
                              }}
                            >
                              <Label className="text-xs mb-1.5 flex items-center gap-1">
                                {field.name}
                                {field.required && <span className="text-red-500">*</span>}
                              </Label>
                              {field.type === "textarea" || field.type === "richtext" ? (
                                <Textarea placeholder={field.placeholder} className="h-20" disabled />
                              ) : field.type === "select" || field.type === "multiselect" ? (
                                <Select disabled>
                                  <SelectTrigger className="h-9">
                                    <SelectValue placeholder={field.placeholder || "Seleccionar..."} />
                                  </SelectTrigger>
                                </Select>
                              ) : field.type === "boolean" ? (
                                <Switch disabled />
                              ) : field.type === "rating" ? (
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((n) => (
                                    <Star key={n} className="h-5 w-5 text-muted-foreground/30" />
                                  ))}
                                </div>
                              ) : field.type === "signature" ? (
                                <div className="h-20 border border-dashed rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                                  Firma aquí
                                </div>
                              ) : (
                                <Input placeholder={field.placeholder} className="h-9" disabled />
                              )}
                              {field.helpText && (
                                <p className="text-[10px] text-muted-foreground mt-1">{field.helpText}</p>
                              )}
                            </div>
                          )
                        })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="forms" className="flex-1 m-0 min-h-0">
              <Card className="h-full">
                <CardContent className="p-6 text-center">
                  <Layout className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                  <h3 className="font-semibold mb-2">Constructor de Formularios</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Organiza campos en secciones, grupos y pestañas personalizadas
                  </p>
                  <Button className="gap-2">
                    <Wand2 className="h-4 w-4" />
                    Abrir Constructor
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - AI Assistant */}
        {showAIPanel && (
          <div className="w-80 shrink-0">
            <Card className="h-full flex flex-col border-violet-500/30">
              <CardHeader className="pb-2 shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-violet-400" />
                    Asistente AI
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowAIPanel(false)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0 min-h-0">
                <ScrollArea className="flex-1">
                  <div className="space-y-3 py-2">
                    {aiMessages.map((msg, i) => (
                      <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                        <div
                          className={cn(
                            "max-w-[90%] rounded-lg px-3 py-2 text-xs",
                            msg.role === "user" ? "bg-violet-600 text-white" : "bg-secondary text-foreground",
                          )}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex justify-start">
                        <div className="bg-secondary rounded-lg px-3 py-2 text-xs">
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-3 w-3 animate-spin text-violet-400" />
                            <span className="text-muted-foreground">Procesando...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-3 border-t border-border shrink-0 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Pregunta sobre campos..."
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAISend()}
                      className="h-8 text-xs"
                    />
                    <Button size="icon" className="h-8 w-8 bg-violet-600 hover:bg-violet-700" onClick={handleAISend}>
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {["Sugerir campos", "Validaciones", "Optimizar form"].map((q) => (
                      <Button
                        key={q}
                        variant="outline"
                        size="sm"
                        className="h-5 text-[10px] px-2 bg-transparent"
                        onClick={() => {
                          setAiInput(q)
                        }}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!showAIPanel && (
          <Button
            className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-violet-600 hover:bg-violet-700 shadow-lg"
            onClick={() => setShowAIPanel(true)}
          >
            <Bot className="h-5 w-5" />
          </Button>
        )}
      </div>

      {showCreateDialog && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <div className="h-14 border-b border-border flex items-center justify-between px-4 bg-card/95 backdrop-blur shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-lg">Crear Campo Personalizado</h1>
                  <p className="text-xs text-muted-foreground">
                    Define un nuevo campo para extender la funcionalidad del módulo
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateField} className="bg-violet-600 hover:bg-violet-700 gap-2">
                <Check className="h-4 w-4" />
                Crear Campo
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCreateDialog(false)}
                className="ml-2 hover:bg-red-500/10 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-h-0 flex">
            {/* Left Side - Form */}
            <div className="flex-1 min-h-0 border-r overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {/* AI Generate Button */}
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-purple-500/10">
                    <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Generar con AI</p>
                      <p className="text-xs text-muted-foreground">
                        Describe el campo que necesitas y lo creo automáticamente
                      </p>
                    </div>
                    <Button
                      className="bg-violet-600 hover:bg-violet-700 gap-2"
                      onClick={handleGenerateFieldWithAI}
                      disabled={isProcessing}
                    >
                      {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                      Generar
                    </Button>
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center">
                        <Type className="h-3.5 w-3.5 text-blue-400" />
                      </div>
                      Información Básica
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>
                          Nombre del Campo <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Ej: Fecha de Vencimiento"
                          value={newField.name}
                          onChange={(e) =>
                            setNewField({
                              ...newField,
                              name: e.target.value,
                              key: e.target.value
                                .toLowerCase()
                                .replace(/\s+/g, "_")
                                .replace(/[^a-z0-9_]/g, ""),
                            })
                          }
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>
                          Clave (API) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="fecha_vencimiento"
                          value={newField.key}
                          onChange={(e) => setNewField({ ...newField, key: e.target.value })}
                          className="font-mono h-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>
                          Módulo <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={newField.module}
                          onValueChange={(v) =>
                            setNewField({
                              ...newField,
                              module: v,
                              entity: modules.find((m) => m.id === v)?.entities[0] || "",
                            })
                          }
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Seleccionar módulo" />
                          </SelectTrigger>
                          <SelectContent>
                            {modules.map((mod) => (
                              <SelectItem key={mod.id} value={mod.id}>
                                <div className="flex items-center gap-2">
                                  <mod.icon className={cn("h-4 w-4", mod.color)} />
                                  {mod.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Entidad</Label>
                        <Select value={newField.entity} onValueChange={(v) => setNewField({ ...newField, entity: v })}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Seleccionar entidad" />
                          </SelectTrigger>
                          <SelectContent>
                            {(modules.find((m) => m.id === newField.module)?.entities || []).map((entity) => (
                              <SelectItem key={entity} value={entity}>
                                {entity.replace("_", " ").charAt(0).toUpperCase() + entity.slice(1).replace("_", " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Field Type Selection */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-violet-500/20 flex items-center justify-center">
                        <Layers className="h-3.5 w-3.5 text-violet-400" />
                      </div>
                      Tipo de Campo <span className="text-red-500">*</span>
                    </h3>
                    <div className="border rounded-xl p-4 bg-secondary/30">
                      <div className="space-y-4">
                        {fieldCategories.map((category) => (
                          <div key={category.name}>
                            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                              {category.name}
                            </p>
                            <div className="grid grid-cols-6 gap-2">
                              {category.fields.map((ft) => (
                                <button
                                  key={ft.type}
                                  onClick={() => setNewField({ ...newField, type: ft.type as FieldType })}
                                  className={cn(
                                    "flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-center",
                                    newField.type === ft.type
                                      ? "border-violet-500 bg-violet-500/10 ring-2 ring-violet-500/20 shadow-lg"
                                      : "border-border hover:border-violet-500/50 hover:bg-secondary/50",
                                  )}
                                >
                                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", ft.color)}>
                                    <ft.icon className="h-4 w-4 text-white" />
                                  </div>
                                  <span className="text-[11px] font-medium text-foreground">{ft.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Options for select types */}
                  {["select", "multiselect", "radio", "checkbox"].includes(newField.type || "") && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-sm flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-amber-500/20 flex items-center justify-center">
                          <List className="h-3.5 w-3.5 text-amber-400" />
                        </div>
                        Opciones
                      </h3>
                      <Textarea
                        placeholder="Opción 1&#10;Opción 2&#10;Opción 3"
                        value={newField.options?.join("\n")}
                        onChange={(e) =>
                          setNewField({ ...newField, options: e.target.value.split("\n").filter(Boolean) })
                        }
                        rows={4}
                        className="font-mono text-sm"
                      />
                    </div>
                  )}

                  {/* Additional Settings */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center">
                        <Settings className="h-3.5 w-3.5 text-green-400" />
                      </div>
                      Configuración Adicional
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Placeholder</Label>
                        <Input
                          placeholder="Texto de ayuda en el campo"
                          value={newField.placeholder}
                          onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Valor por Defecto</Label>
                        <Input
                          placeholder="Valor inicial"
                          value={newField.defaultValue}
                          onChange={(e) => setNewField({ ...newField, defaultValue: e.target.value })}
                          className="h-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Texto de Ayuda</Label>
                      <Textarea
                        placeholder="Instrucciones para el usuario"
                        value={newField.helpText}
                        onChange={(e) => setNewField({ ...newField, helpText: e.target.value })}
                        rows={2}
                      />
                    </div>

                    {/* Width */}
                    <div className="space-y-2">
                      <Label>Ancho en Formulario</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { id: "quarter", label: "25%", width: "w-1/4" },
                          { id: "half", label: "50%", width: "w-1/2" },
                          { id: "three-quarter", label: "75%", width: "w-3/4" },
                          { id: "full", label: "100%", width: "w-full" },
                        ].map((w) => (
                          <Button
                            key={w.id}
                            type="button"
                            variant={newField.width === w.id ? "default" : "outline"}
                            className={cn("h-10", newField.width === w.id && "bg-violet-600 hover:bg-violet-700")}
                            onClick={() => setNewField({ ...newField, width: w.id as any })}
                          >
                            {w.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center">
                        <ToggleLeft className="h-3.5 w-3.5 text-cyan-400" />
                      </div>
                      Comportamiento
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm">Obligatorio</span>
                        </div>
                        <Switch
                          checked={newField.required}
                          onCheckedChange={(v) => setNewField({ ...newField, required: v })}
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Visible</span>
                        </div>
                        <Switch
                          checked={newField.visible !== false}
                          onCheckedChange={(v) => setNewField({ ...newField, visible: v })}
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border">
                        <div className="flex items-center gap-2">
                          <Search className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Buscable</span>
                        </div>
                        <Switch
                          checked={newField.searchable !== false}
                          onCheckedChange={(v) => setNewField({ ...newField, searchable: v })}
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-amber-500" />
                          <span className="text-sm">Único</span>
                        </div>
                        <Switch
                          checked={newField.unique}
                          onCheckedChange={(v) => setNewField({ ...newField, unique: v })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-rose-500/20 flex items-center justify-center">
                        <Shield className="h-3.5 w-3.5 text-rose-400" />
                      </div>
                      Permisos
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Pueden ver</Label>
                        <Select
                          value={newField.permissions?.view[0] || "todos"}
                          onValueChange={(v) =>
                            setNewField({ ...newField, permissions: { ...newField.permissions!, view: [v] } })
                          }
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Pueden editar</Label>
                        <Select
                          value={newField.permissions?.edit[0] || "admin"}
                          onValueChange={(v) =>
                            setNewField({ ...newField, permissions: { ...newField.permissions!, edit: [v] } })
                          }
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Right Side - Preview */}
            <div className="w-[400px] shrink-0 flex flex-col bg-secondary/30 overflow-hidden">
              <div className="p-4 border-b shrink-0">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  Vista Previa
                </h3>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-4">
                  <div className="bg-card rounded-xl border p-4 shadow-sm">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {newField.type &&
                          (() => {
                            const ft = fieldCategories.flatMap((c) => c.fields).find((f) => f.type === newField.type)
                            if (ft) {
                              return (
                                <div className={cn("w-6 h-6 rounded flex items-center justify-center", ft.color)}>
                                  <ft.icon className="h-3 w-3 text-white" />
                                </div>
                              )
                            }
                            return null
                          })()}
                        <Label className="font-medium">
                          {newField.name || "Nombre del campo"}
                          {newField.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                      </div>

                      {/* Render preview based on field type */}
                      {(!newField.type ||
                        newField.type === "text" ||
                        newField.type === "email" ||
                        newField.type === "phone" ||
                        newField.type === "url") && (
                        <Input placeholder={newField.placeholder || "Ingrese valor..."} className="h-10" disabled />
                      )}
                      {newField.type === "textarea" && (
                        <Textarea placeholder={newField.placeholder || "Ingrese texto..."} rows={3} disabled />
                      )}
                      {newField.type === "number" && (
                        <Input type="number" placeholder={newField.placeholder || "0"} className="h-10" disabled />
                      )}
                      {newField.type === "currency" && (
                        <div className="flex">
                          <span className="flex items-center px-3 bg-secondary border border-r-0 rounded-l-md text-sm">
                            $
                          </span>
                          <Input placeholder="0.00" className="h-10 rounded-l-none" disabled />
                        </div>
                      )}
                      {newField.type === "date" && <Input type="date" className="h-10" disabled />}
                      {newField.type === "select" && (
                        <Select disabled>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder={newField.placeholder || "Seleccionar..."} />
                          </SelectTrigger>
                        </Select>
                      )}
                      {newField.type === "checkbox" && (
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="h-4 w-4" disabled />
                          <span className="text-sm text-muted-foreground">Activar opción</span>
                        </div>
                      )}
                      {newField.type === "toggle" && <Switch disabled />}
                      {newField.type === "file" && (
                        <div className="border-2 border-dashed rounded-lg p-4 text-center">
                          <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                          <p className="text-xs text-muted-foreground">Arrastra archivos aquí</p>
                        </div>
                      )}
                      {newField.type === "image" && (
                        <div className="border-2 border-dashed rounded-lg p-4 text-center">
                          <ImageIcon className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                          <p className="text-xs text-muted-foreground">Sube una imagen</p>
                        </div>
                      )}
                      {newField.type === "rating" && (
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-5 w-5",
                                i <= 3 ? "fill-amber-400 text-amber-400" : "text-muted-foreground",
                              )}
                            />
                          ))}
                        </div>
                      )}
                      {newField.type === "slider" && (
                        <div className="space-y-2">
                          <input type="range" className="w-full" disabled />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>0</span>
                            <span>100</span>
                          </div>
                        </div>
                      )}
                      {newField.type === "color" && (
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded-lg bg-violet-500 border" />
                          <Input value="#8B5CF6" className="h-10 font-mono" disabled />
                        </div>
                      )}
                      {newField.type === "tags" && (
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary">Tag 1</Badge>
                          <Badge variant="secondary">Tag 2</Badge>
                          <Badge variant="outline" className="border-dashed">
                            + Agregar
                          </Badge>
                        </div>
                      )}

                      {newField.helpText && <p className="text-xs text-muted-foreground">{newField.helpText}</p>}
                    </div>
                  </div>

                  {/* Field Info */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Clave API:</span>
                      <code className="bg-secondary px-1.5 py-0.5 rounded">{newField.key || "campo_key"}</code>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Módulo:</span>
                      <span>{modules.find((m) => m.id === newField.module)?.label || "Sin seleccionar"}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Ancho:</span>
                      <span>
                        {newField.width === "quarter"
                          ? "25%"
                          : newField.width === "half"
                            ? "50%"
                            : newField.width === "three-quarter"
                              ? "75%"
                              : "100%"}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
