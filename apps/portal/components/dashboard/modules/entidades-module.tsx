"use client"

import { useState } from "react"
import {
  Database,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  Layers,
  Link2,
  Lock,
  Table2,
  FileJson,
  Download,
  Upload,
  Sparkles,
  Wand2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  GripVertical,
  X,
  Check,
  RefreshCw,
  Code2,
  Shield,
  Users,
  Workflow,
  Calendar,
  Hash,
  Type,
  ToggleLeft,
  List,
  FileText,
  ImageIcon,
  MapPin,
  Mail,
  Phone,
  DollarSign,
  Percent,
  Calculator,
  Clock,
  Star,
  Tag,
  Bookmark,
  GitBranch,
  Boxes,
  Package,
  Building2,
  UserCircle,
  Receipt,
  Truck,
  ShoppingCart,
  Briefcase,
  Target,
  MessageSquare,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface EntityField {
  id: string
  name: string
  key: string
  type: string
  required: boolean
  unique: boolean
  indexed: boolean
  defaultValue?: string
  description?: string
  relation?: {
    entity: string
    type: "one-to-one" | "one-to-many" | "many-to-many"
    onDelete: "cascade" | "set-null" | "restrict"
  }
}

interface Entity {
  id: string
  name: string
  key: string
  description: string
  icon: string
  color: string
  module: string
  fields: EntityField[]
  isSystem: boolean
  isActive: boolean
  recordCount: number
  createdAt: string
  updatedAt: string
  permissions: {
    create: string[]
    read: string[]
    update: string[]
    delete: string[]
  }
  indexes: { fields: string[]; unique: boolean }[]
  triggers: { event: string; action: string }[]
}

const iconOptions = [
  { value: "package", icon: Package, label: "Paquete" },
  { value: "user", icon: UserCircle, label: "Usuario" },
  { value: "building", icon: Building2, label: "Edificio" },
  { value: "receipt", icon: Receipt, label: "Factura" },
  { value: "truck", icon: Truck, label: "Envío" },
  { value: "cart", icon: ShoppingCart, label: "Carrito" },
  { value: "briefcase", icon: Briefcase, label: "Maletín" },
  { value: "target", icon: Target, label: "Objetivo" },
  { value: "message", icon: MessageSquare, label: "Mensaje" },
  { value: "activity", icon: Activity, label: "Actividad" },
  { value: "calendar", icon: Calendar, label: "Calendario" },
  { value: "bookmark", icon: Bookmark, label: "Marcador" },
]

const colorOptions = [
  { value: "blue", class: "bg-blue-500" },
  { value: "green", class: "bg-green-500" },
  { value: "purple", class: "bg-purple-500" },
  { value: "orange", class: "bg-orange-500" },
  { value: "red", class: "bg-red-500" },
  { value: "pink", class: "bg-pink-500" },
  { value: "teal", class: "bg-teal-500" },
  { value: "indigo", class: "bg-indigo-500" },
]

const fieldTypes = [
  { value: "text", icon: Type, label: "Texto", description: "Campo de texto simple" },
  { value: "textarea", icon: FileText, label: "Texto Largo", description: "Texto multilínea" },
  { value: "number", icon: Hash, label: "Número", description: "Valor numérico entero" },
  { value: "decimal", icon: Calculator, label: "Decimal", description: "Número con decimales" },
  { value: "currency", icon: DollarSign, label: "Moneda", description: "Valor monetario" },
  { value: "percent", icon: Percent, label: "Porcentaje", description: "Valor porcentual" },
  { value: "boolean", icon: ToggleLeft, label: "Booleano", description: "Sí/No, Verdadero/Falso" },
  { value: "date", icon: Calendar, label: "Fecha", description: "Solo fecha" },
  { value: "datetime", icon: Clock, label: "Fecha y Hora", description: "Fecha con hora" },
  { value: "email", icon: Mail, label: "Email", description: "Correo electrónico" },
  { value: "phone", icon: Phone, label: "Teléfono", description: "Número telefónico" },
  { value: "select", icon: List, label: "Selección", description: "Lista de opciones" },
  { value: "multiselect", icon: Boxes, label: "Multi-Selección", description: "Múltiples opciones" },
  { value: "image", icon: ImageIcon, label: "Imagen", description: "Archivo de imagen" },
  { value: "file", icon: FileJson, label: "Archivo", description: "Cualquier archivo" },
  { value: "location", icon: MapPin, label: "Ubicación", description: "Coordenadas GPS" },
  { value: "relation", icon: Link2, label: "Relación", description: "Enlace a otra entidad" },
  { value: "rating", icon: Star, label: "Calificación", description: "Estrellas 1-5" },
  { value: "tags", icon: Tag, label: "Etiquetas", description: "Múltiples etiquetas" },
]

const sampleEntities: Entity[] = [
  {
    id: "1",
    name: "Clientes",
    key: "customers",
    description: "Gestión de clientes y prospectos del negocio",
    icon: "user",
    color: "blue",
    module: "ventas",
    isSystem: true,
    isActive: true,
    recordCount: 1543,
    createdAt: "2024-01-15",
    updatedAt: "2024-12-01",
    fields: [
      { id: "f1", name: "Nombre", key: "name", type: "text", required: true, unique: false, indexed: true },
      { id: "f2", name: "Email", key: "email", type: "email", required: true, unique: true, indexed: true },
      { id: "f3", name: "Teléfono", key: "phone", type: "phone", required: false, unique: false, indexed: false },
      { id: "f4", name: "Tipo", key: "type", type: "select", required: true, unique: false, indexed: true },
      {
        id: "f5",
        name: "Crédito",
        key: "credit_limit",
        type: "currency",
        required: false,
        unique: false,
        indexed: false,
      },
    ],
    permissions: { create: ["admin", "ventas"], read: ["todos"], update: ["admin", "ventas"], delete: ["admin"] },
    indexes: [
      { fields: ["email"], unique: true },
      { fields: ["name", "type"], unique: false },
    ],
    triggers: [{ event: "after_create", action: "send_welcome_email" }],
  },
  {
    id: "2",
    name: "Productos",
    key: "products",
    description: "Catálogo de productos y servicios",
    icon: "package",
    color: "green",
    module: "inventario",
    isSystem: true,
    isActive: true,
    recordCount: 892,
    createdAt: "2024-01-15",
    updatedAt: "2024-11-28",
    fields: [
      { id: "f1", name: "Nombre", key: "name", type: "text", required: true, unique: false, indexed: true },
      { id: "f2", name: "SKU", key: "sku", type: "text", required: true, unique: true, indexed: true },
      { id: "f3", name: "Precio", key: "price", type: "currency", required: true, unique: false, indexed: false },
      { id: "f4", name: "Stock", key: "stock", type: "number", required: true, unique: false, indexed: false },
      {
        id: "f5",
        name: "Categoría",
        key: "category",
        type: "relation",
        required: true,
        unique: false,
        indexed: true,
        relation: { entity: "categories", type: "many-to-many", onDelete: "restrict" },
      },
    ],
    permissions: {
      create: ["admin", "inventario"],
      read: ["todos"],
      update: ["admin", "inventario"],
      delete: ["admin"],
    },
    indexes: [{ fields: ["sku"], unique: true }],
    triggers: [{ event: "after_update", action: "check_stock_alert" }],
  },
  {
    id: "3",
    name: "Órdenes de Compra",
    key: "purchase_orders",
    description: "Órdenes de compra a proveedores",
    icon: "cart",
    color: "purple",
    module: "compras",
    isSystem: false,
    isActive: true,
    recordCount: 234,
    createdAt: "2024-03-10",
    updatedAt: "2024-12-05",
    fields: [
      { id: "f1", name: "Número", key: "number", type: "text", required: true, unique: true, indexed: true },
      {
        id: "f2",
        name: "Proveedor",
        key: "supplier",
        type: "relation",
        required: true,
        unique: false,
        indexed: true,
        relation: { entity: "suppliers", type: "one-to-many", onDelete: "restrict" },
      },
      { id: "f3", name: "Fecha", key: "date", type: "date", required: true, unique: false, indexed: true },
      { id: "f4", name: "Total", key: "total", type: "currency", required: true, unique: false, indexed: false },
      { id: "f5", name: "Estado", key: "status", type: "select", required: true, unique: false, indexed: true },
    ],
    permissions: {
      create: ["admin", "compras"],
      read: ["admin", "compras", "contabilidad"],
      update: ["admin", "compras"],
      delete: ["admin"],
    },
    indexes: [
      { fields: ["number"], unique: true },
      { fields: ["date", "status"], unique: false },
    ],
    triggers: [{ event: "after_create", action: "notify_approvers" }],
  },
  {
    id: "4",
    name: "Tickets de Soporte",
    key: "support_tickets",
    description: "Sistema de tickets de soporte al cliente",
    icon: "message",
    color: "orange",
    module: "crm",
    isSystem: false,
    isActive: true,
    recordCount: 567,
    createdAt: "2024-05-20",
    updatedAt: "2024-12-06",
    fields: [
      { id: "f1", name: "Título", key: "title", type: "text", required: true, unique: false, indexed: true },
      {
        id: "f2",
        name: "Descripción",
        key: "description",
        type: "textarea",
        required: true,
        unique: false,
        indexed: false,
      },
      { id: "f3", name: "Prioridad", key: "priority", type: "select", required: true, unique: false, indexed: true },
      {
        id: "f4",
        name: "Cliente",
        key: "customer",
        type: "relation",
        required: true,
        unique: false,
        indexed: true,
        relation: { entity: "customers", type: "one-to-many", onDelete: "cascade" },
      },
      {
        id: "f5",
        name: "Asignado a",
        key: "assigned_to",
        type: "relation",
        required: false,
        unique: false,
        indexed: true,
        relation: { entity: "users", type: "one-to-many", onDelete: "set-null" },
      },
    ],
    permissions: { create: ["todos"], read: ["todos"], update: ["admin", "soporte"], delete: ["admin"] },
    indexes: [{ fields: ["priority", "status"], unique: false }],
    triggers: [
      { event: "after_create", action: "auto_assign_agent" },
      { event: "after_update", action: "notify_customer" },
    ],
  },
]

const modules = [
  { id: "ventas", label: "Ventas", icon: Target },
  { id: "inventario", label: "Inventario", icon: Package },
  { id: "compras", label: "Compras", icon: ShoppingCart },
  { id: "contabilidad", label: "Contabilidad", icon: Calculator },
  { id: "rrhh", label: "RRHH", icon: Users },
  { id: "crm", label: "CRM", icon: UserCircle },
  { id: "proyectos", label: "Proyectos", icon: Briefcase },
  { id: "produccion", label: "Producción", icon: Boxes },
  { id: "custom", label: "Personalizado", icon: Sparkles },
]

export function EntidadesModule() {
  const [entities, setEntities] = useState<Entity[]>(sampleEntities)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModule, setSelectedModule] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<"entities" | "schema" | "relations">("entities")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingEntity, setEditingEntity] = useState<Entity | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")

  const [newEntity, setNewEntity] = useState<Partial<Entity>>({
    name: "",
    key: "",
    description: "",
    icon: "package",
    color: "blue",
    module: "custom",
    fields: [],
    isSystem: false,
    isActive: true,
    permissions: { create: ["admin"], read: ["todos"], update: ["admin"], delete: ["admin"] },
    indexes: [],
    triggers: [],
  })

  const [newField, setNewField] = useState<Partial<EntityField>>({
    name: "",
    key: "",
    type: "text",
    required: false,
    unique: false,
    indexed: false,
  })

  const filteredEntities = entities.filter((entity) => {
    const matchesSearch =
      entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.key.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesModule = selectedModule === "all" || entity.module === selectedModule
    return matchesSearch && matchesModule
  })

  const getIconComponent = (iconName: string) => {
    const found = iconOptions.find((i) => i.value === iconName)
    return found?.icon || Package
  }

  const getColorClass = (color: string) => {
    const found = colorOptions.find((c) => c.value === color)
    return found?.class || "bg-blue-500"
  }

  const handleCreateEntity = () => {
    if (!newEntity.name || !newEntity.key) return

    const entity: Entity = {
      id: Date.now().toString(),
      name: newEntity.name,
      key: newEntity.key,
      description: newEntity.description || "",
      icon: newEntity.icon || "package",
      color: newEntity.color || "blue",
      module: newEntity.module || "custom",
      fields: newEntity.fields || [],
      isSystem: false,
      isActive: true,
      recordCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      permissions: newEntity.permissions || {
        create: ["admin"],
        read: ["todos"],
        update: ["admin"],
        delete: ["admin"],
      },
      indexes: newEntity.indexes || [],
      triggers: newEntity.triggers || [],
    }

    setEntities([...entities, entity])
    setShowCreateModal(false)
    resetNewEntity()
  }

  const resetNewEntity = () => {
    setNewEntity({
      name: "",
      key: "",
      description: "",
      icon: "package",
      color: "blue",
      module: "custom",
      fields: [],
      isSystem: false,
      isActive: true,
      permissions: { create: ["admin"], read: ["todos"], update: ["admin"], delete: ["admin"] },
      indexes: [],
      triggers: [],
    })
    setCurrentStep(1)
  }

  const handleAddField = () => {
    if (!newField.name || !newField.key) return

    const field: EntityField = {
      id: Date.now().toString(),
      name: newField.name,
      key: newField.key,
      type: newField.type || "text",
      required: newField.required || false,
      unique: newField.unique || false,
      indexed: newField.indexed || false,
      description: newField.description,
      relation: newField.relation,
    }

    setNewEntity({
      ...newEntity,
      fields: [...(newEntity.fields || []), field],
    })

    setNewField({
      name: "",
      key: "",
      type: "text",
      required: false,
      unique: false,
      indexed: false,
    })
  }

  const handleRemoveField = (fieldId: string) => {
    setNewEntity({
      ...newEntity,
      fields: (newEntity.fields || []).filter((f) => f.id !== fieldId),
    })
  }

  const handleGenerateWithAI = async () => {
    if (!aiPrompt.trim()) return

    setIsGeneratingAI(true)

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate entity based on prompt
    const generatedEntity: Partial<Entity> = {
      name: "Reservaciones",
      key: "reservations",
      description: "Sistema de reservaciones generado por AI basado en: " + aiPrompt,
      icon: "calendar",
      color: "teal",
      module: "custom",
      fields: [
        { id: "1", name: "Código", key: "code", type: "text", required: true, unique: true, indexed: true },
        {
          id: "2",
          name: "Cliente",
          key: "customer",
          type: "relation",
          required: true,
          unique: false,
          indexed: true,
          relation: { entity: "customers", type: "one-to-many", onDelete: "cascade" },
        },
        {
          id: "3",
          name: "Fecha Inicio",
          key: "start_date",
          type: "datetime",
          required: true,
          unique: false,
          indexed: true,
        },
        { id: "4", name: "Fecha Fin", key: "end_date", type: "datetime", required: true, unique: false, indexed: true },
        { id: "5", name: "Estado", key: "status", type: "select", required: true, unique: false, indexed: true },
        { id: "6", name: "Notas", key: "notes", type: "textarea", required: false, unique: false, indexed: false },
        { id: "7", name: "Total", key: "total", type: "currency", required: true, unique: false, indexed: false },
      ],
      permissions: { create: ["admin", "ventas"], read: ["todos"], update: ["admin", "ventas"], delete: ["admin"] },
      indexes: [
        { fields: ["code"], unique: true },
        { fields: ["start_date", "status"], unique: false },
      ],
      triggers: [{ event: "after_create", action: "send_confirmation_email" }],
    }

    setNewEntity(generatedEntity)
    setIsGeneratingAI(false)
    setAiPrompt("")
  }

  const handleDeleteEntity = (entityId: string) => {
    setEntities(entities.filter((e) => e.id !== entityId))
  }

  const handleDuplicateEntity = (entity: Entity) => {
    const duplicated: Entity = {
      ...entity,
      id: Date.now().toString(),
      name: entity.name + " (copia)",
      key: entity.key + "_copy",
      isSystem: false,
      recordCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }
    setEntities([...entities, duplicated])
  }

  const totalFields = entities.reduce((acc, e) => acc + e.fields.length, 0)
  const totalRecords = entities.reduce((acc, e) => acc + e.recordCount, 0)
  const activeEntities = entities.filter((e) => e.isActive).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Database className="h-5 w-5 text-white" />
            </div>
            Creador de Entidades
          </h1>
          <p className="text-muted-foreground mt-1">
            Define y gestiona las estructuras de datos personalizadas de tu negocio
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Upload className="h-4 w-4" />
            Importar
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar Schema
          </Button>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            <Plus className="h-4 w-4" />
            Nueva Entidad
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Entidades</p>
                <p className="text-2xl font-bold">{entities.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <Database className="h-6 w-6 text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Campos Totales</p>
                <p className="text-2xl font-bold">{totalFields}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Layers className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Registros Totales</p>
                <p className="text-2xl font-bold">{totalRecords.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Table2 className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Entidades Activas</p>
                <p className="text-2xl font-bold">{activeEntities}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="entities" className="gap-2">
              <Database className="h-4 w-4" />
              Entidades
            </TabsTrigger>
            <TabsTrigger value="schema" className="gap-2">
              <Code2 className="h-4 w-4" />
              Schema Visual
            </TabsTrigger>
            <TabsTrigger value="relations" className="gap-2">
              <GitBranch className="h-4 w-4" />
              Relaciones
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar entidades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedModule} onValueChange={setSelectedModule}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Módulo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {modules.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="entities" className="mt-4">
          <div className="grid grid-cols-3 gap-4">
            {filteredEntities.map((entity) => {
              const IconComponent = getIconComponent(entity.icon)
              return (
                <Card
                  key={entity.id}
                  className={cn(
                    "group hover:shadow-lg transition-all cursor-pointer border-2",
                    entity.isActive ? "hover:border-primary/50" : "opacity-60",
                  )}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center",
                            getColorClass(entity.color),
                          )}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {entity.name}
                            {entity.isSystem && (
                              <Badge variant="outline" className="text-xs">
                                Sistema
                              </Badge>
                            )}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground font-mono">{entity.key}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditingEntity(entity)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateEntity(entity)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Registros
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteEntity(entity.id)}
                            className="text-red-500"
                            disabled={entity.isSystem}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="mt-2 line-clamp-2">{entity.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Layers className="h-3.5 w-3.5" />
                        {entity.fields.length} campos
                      </div>
                      <div className="flex items-center gap-1">
                        <Table2 className="h-3.5 w-3.5" />
                        {entity.recordCount.toLocaleString()} registros
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {entity.fields.slice(0, 4).map((field) => (
                        <Badge key={field.id} variant="secondary" className="text-xs font-normal">
                          {field.name}
                        </Badge>
                      ))}
                      {entity.fields.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{entity.fields.length - 4} más
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <Badge variant="outline" className="text-xs capitalize">
                        {modules.find((m) => m.id === entity.module)?.label || entity.module}
                      </Badge>
                      <div className="flex items-center gap-2">
                        {entity.isActive ? (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Activa
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <XCircle className="h-3 w-3 mr-1" />
                            Inactiva
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* Create New Card */}
            <Card
              className="border-2 border-dashed hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer flex items-center justify-center min-h-[280px]"
              onClick={() => setShowCreateModal(true)}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <p className="font-semibold text-lg">Crear Nueva Entidad</p>
                <p className="text-sm text-muted-foreground mt-1">Define una nueva estructura de datos</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schema" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Schema Visual del Sistema</CardTitle>
              <CardDescription>Vista del esquema de base de datos con todas las entidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-xl p-8 min-h-[500px] relative">
                {/* Visual Schema Representation */}
                <div className="grid grid-cols-4 gap-6">
                  {entities.map((entity, index) => {
                    const IconComponent = getIconComponent(entity.icon)
                    return (
                      <div key={entity.id} className="bg-card rounded-lg border shadow-sm overflow-hidden">
                        <div className={cn("p-3 flex items-center gap-2", getColorClass(entity.color))}>
                          <IconComponent className="h-4 w-4 text-white" />
                          <span className="font-semibold text-white text-sm">{entity.name}</span>
                        </div>
                        <div className="p-2 space-y-1">
                          {entity.fields.map((field) => (
                            <div
                              key={field.id}
                              className="flex items-center gap-2 px-2 py-1 text-xs rounded hover:bg-muted/50"
                            >
                              {field.required && <span className="text-red-400">*</span>}
                              {field.unique && <Lock className="h-3 w-3 text-amber-400" />}
                              {field.indexed && <Hash className="h-3 w-3 text-blue-400" />}
                              <span className="font-mono text-muted-foreground">{field.key}</span>
                              <span className="ml-auto text-muted-foreground/60">{field.type}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Mapa de Relaciones</CardTitle>
              <CardDescription>Visualiza las conexiones entre entidades</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entidad Origen</TableHead>
                    <TableHead>Campo</TableHead>
                    <TableHead>Tipo Relación</TableHead>
                    <TableHead>Entidad Destino</TableHead>
                    <TableHead>On Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entities.flatMap((entity) =>
                    entity.fields
                      .filter((f) => f.relation)
                      .map((field) => (
                        <TableRow key={`${entity.id}-${field.id}`}>
                          <TableCell className="font-medium">{entity.name}</TableCell>
                          <TableCell className="font-mono text-sm">{field.key}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{field.relation?.type}</Badge>
                          </TableCell>
                          <TableCell className="capitalize">{field.relation?.entity}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              {field.relation?.onDelete}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      )),
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          {/* Header */}
          <div className="h-16 border-b flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Database className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-lg">Crear Nueva Entidad</h1>
                <p className="text-xs text-muted-foreground">
                  Paso {currentStep} de 4:{" "}
                  {currentStep === 1
                    ? "Información Básica"
                    : currentStep === 2
                      ? "Definir Campos"
                      : currentStep === 3
                        ? "Permisos y Triggers"
                        : "Revisar y Crear"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Anterior
                </Button>
              )}
              {currentStep < 4 ? (
                <Button onClick={() => setCurrentStep(currentStep + 1)} className="gap-2">
                  Siguiente
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleCreateEntity} className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600">
                  <Check className="h-4 w-4" />
                  Crear Entidad
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowCreateModal(false)
                  resetNewEntity()
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-muted shrink-0">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* AI Generation */}
                  <Card className="border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center shrink-0">
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="font-semibold">Generar con AI</h3>
                            <p className="text-sm text-muted-foreground">
                              Describe la entidad que necesitas y la generaré automáticamente con campos sugeridos
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Ej: Sistema de reservaciones para hotel con clientes, habitaciones y pagos..."
                              value={aiPrompt}
                              onChange={(e) => setAiPrompt(e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              onClick={handleGenerateWithAI}
                              disabled={isGeneratingAI || !aiPrompt.trim()}
                              className="gap-2 bg-indigo-500 hover:bg-indigo-600"
                            >
                              {isGeneratingAI ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <Wand2 className="h-4 w-4" />
                              )}
                              Generar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>
                          Nombre de la Entidad <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Ej: Reservaciones"
                          value={newEntity.name}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              name: e.target.value,
                              key: e.target.value
                                .toLowerCase()
                                .replace(/\s+/g, "_")
                                .replace(/[^a-z0-9_]/g, ""),
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Key (identificador técnico)</Label>
                        <Input
                          placeholder="reservations"
                          value={newEntity.key}
                          onChange={(e) => setNewEntity({ ...newEntity, key: e.target.value })}
                          className="font-mono"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Descripción</Label>
                        <Textarea
                          placeholder="Describe el propósito de esta entidad..."
                          value={newEntity.description}
                          onChange={(e) => setNewEntity({ ...newEntity, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Módulo</Label>
                        <Select
                          value={newEntity.module}
                          onValueChange={(v) => setNewEntity({ ...newEntity, module: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {modules.map((m) => (
                              <SelectItem key={m.id} value={m.id}>
                                <div className="flex items-center gap-2">
                                  <m.icon className="h-4 w-4" />
                                  {m.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Icono</Label>
                        <div className="grid grid-cols-6 gap-2">
                          {iconOptions.map((icon) => (
                            <Button
                              key={icon.value}
                              variant={newEntity.icon === icon.value ? "default" : "outline"}
                              size="icon"
                              className="h-10 w-10"
                              onClick={() => setNewEntity({ ...newEntity, icon: icon.value })}
                            >
                              <icon.icon className="h-5 w-5" />
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Color</Label>
                        <div className="flex gap-2">
                          {colorOptions.map((color) => (
                            <button
                              key={color.value}
                              className={cn(
                                "w-10 h-10 rounded-lg transition-all",
                                color.class,
                                newEntity.color === color.value && "ring-2 ring-offset-2 ring-primary",
                              )}
                              onClick={() => setNewEntity({ ...newEntity, color: color.value })}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Vista Previa</Label>
                        <Card className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                getColorClass(newEntity.color || "blue"),
                              )}
                            >
                              {(() => {
                                const IconComp = getIconComponent(newEntity.icon || "package")
                                return <IconComp className="h-6 w-6 text-white" />
                              })()}
                            </div>
                            <div>
                              <p className="font-semibold">{newEntity.name || "Nueva Entidad"}</p>
                              <p className="text-xs text-muted-foreground font-mono">{newEntity.key || "entity_key"}</p>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Fields */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Agregar Campo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label>
                            Nombre <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            placeholder="Ej: Fecha de Inicio"
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
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Key</Label>
                          <Input
                            placeholder="start_date"
                            value={newField.key}
                            onChange={(e) => setNewField({ ...newField, key: e.target.value })}
                            className="font-mono"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Tipo</Label>
                          <Select value={newField.type} onValueChange={(v) => setNewField({ ...newField, type: v })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {fieldTypes.map((ft) => (
                                <SelectItem key={ft.value} value={ft.value}>
                                  <div className="flex items-center gap-2">
                                    <ft.icon className="h-4 w-4" />
                                    {ft.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-end">
                          <Button onClick={handleAddField} className="w-full gap-2">
                            <Plus className="h-4 w-4" />
                            Agregar
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={newField.required}
                            onCheckedChange={(v) => setNewField({ ...newField, required: v })}
                          />
                          <Label className="text-sm">Requerido</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={newField.unique}
                            onCheckedChange={(v) => setNewField({ ...newField, unique: v })}
                          />
                          <Label className="text-sm">Único</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={newField.indexed}
                            onCheckedChange={(v) => setNewField({ ...newField, indexed: v })}
                          />
                          <Label className="text-sm">Indexado</Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        Campos Definidos
                        <Badge variant="outline">{(newEntity.fields || []).length} campos</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(newEntity.fields || []).length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Layers className="h-12 w-12 mx-auto mb-3 opacity-30" />
                          <p>No hay campos definidos aún</p>
                          <p className="text-sm">Agrega campos usando el formulario de arriba</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {(newEntity.fields || []).map((field, index) => {
                            const fieldType = fieldTypes.find((ft) => ft.value === field.type)
                            const IconComp = fieldType?.icon || Type
                            return (
                              <div
                                key={field.id}
                                className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30 group"
                              >
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <IconComp className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{field.name}</span>
                                    <span className="text-xs text-muted-foreground font-mono">({field.key})</span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary" className="text-xs">
                                      {fieldType?.label}
                                    </Badge>
                                    {field.required && (
                                      <Badge className="text-xs bg-red-500/20 text-red-400">Requerido</Badge>
                                    )}
                                    {field.unique && (
                                      <Badge className="text-xs bg-amber-500/20 text-amber-400">Único</Badge>
                                    )}
                                    {field.indexed && (
                                      <Badge className="text-xs bg-blue-500/20 text-blue-400">Indexado</Badge>
                                    )}
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="opacity-0 group-hover:opacity-100"
                                  onClick={() => handleRemoveField(field.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-400" />
                                </Button>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Step 3: Permissions & Triggers */}
              {currentStep === 3 && (
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Permisos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {["create", "read", "update", "delete"].map((action) => (
                        <div key={action} className="space-y-2">
                          <Label className="capitalize">
                            {action === "create"
                              ? "Crear"
                              : action === "read"
                                ? "Leer"
                                : action === "update"
                                  ? "Actualizar"
                                  : "Eliminar"}
                          </Label>
                          <Select defaultValue="admin">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="todos">Todos</SelectItem>
                              <SelectItem value="admin">Solo Administradores</SelectItem>
                              <SelectItem value="custom">Roles Específicos</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Workflow className="h-5 w-5" />
                        Triggers Automáticos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Al Crear Registro</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar acción..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Ninguna</SelectItem>
                            <SelectItem value="email">Enviar Email</SelectItem>
                            <SelectItem value="notification">Notificación</SelectItem>
                            <SelectItem value="webhook">Webhook</SelectItem>
                            <SelectItem value="flow">Ejecutar Flow</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Al Actualizar Registro</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar acción..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Ninguna</SelectItem>
                            <SelectItem value="email">Enviar Email</SelectItem>
                            <SelectItem value="notification">Notificación</SelectItem>
                            <SelectItem value="webhook">Webhook</SelectItem>
                            <SelectItem value="flow">Ejecutar Flow</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Al Eliminar Registro</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar acción..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Ninguna</SelectItem>
                            <SelectItem value="soft_delete">Soft Delete</SelectItem>
                            <SelectItem value="archive">Archivar</SelectItem>
                            <SelectItem value="webhook">Webhook</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          getColorClass(newEntity.color || "blue"),
                        )}
                      >
                        {(() => {
                          const IconComp = getIconComponent(newEntity.icon || "package")
                          return <IconComp className="h-6 w-6 text-white" />
                        })()}
                      </div>
                      <div>
                        <span className="text-xl">{newEntity.name || "Nueva Entidad"}</span>
                        <p className="text-sm text-muted-foreground font-mono font-normal">
                          {newEntity.key || "entity_key"}
                        </p>
                      </div>
                    </CardTitle>
                    <CardDescription>{newEntity.description || "Sin descripción"}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Campos ({(newEntity.fields || []).length})</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {(newEntity.fields || []).map((field) => {
                          const fieldType = fieldTypes.find((ft) => ft.value === field.type)
                          return (
                            <div key={field.id} className="flex items-center gap-2 p-2 rounded border bg-muted/30">
                              <Badge variant="outline" className="text-xs">
                                {fieldType?.label}
                              </Badge>
                              <span className="font-medium text-sm">{field.name}</span>
                              {field.required && <span className="text-red-400 text-xs">*</span>}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Módulo</h4>
                        <Badge variant="secondary" className="capitalize">
                          {modules.find((m) => m.id === newEntity.module)?.label || newEntity.module}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Estado</h4>
                        <Badge className="bg-green-500/20 text-green-400">Activa</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
