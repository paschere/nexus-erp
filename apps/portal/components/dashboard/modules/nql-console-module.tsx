"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import {
  Play,
  BookOpen,
  History,
  Save,
  Download,
  Copy,
  Trash2,
  Sparkles,
  Terminal,
  Table,
  Code2,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Database,
  Filter,
  Calculator,
  FileJson,
  Braces,
  Star,
  FolderOpen,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// NQL Language definition
const nqlKeywords = [
  "OBTENER",
  "DE",
  "DONDE",
  "ORDENAR",
  "LIMITE",
  "AGRUPAR",
  "CONTAR",
  "SUMAR",
  "PROMEDIO",
  "MAXIMO",
  "MINIMO",
  "UNIR",
  "CON",
  "EN",
  "Y",
  "O",
  "NO",
  "ENTRE",
  "COMO",
  "NULO",
  "VERDADERO",
  "FALSO",
  "ASC",
  "DESC",
  "CREAR",
  "ACTUALIZAR",
  "ELIMINAR",
  "INSERTAR",
  "VALORES",
  "EXPORTAR",
  "IMPORTAR",
]

const nqlEntities = [
  "clientes",
  "productos",
  "ventas",
  "facturas",
  "ordenes",
  "empleados",
  "proveedores",
  "inventario",
  "cuentas",
  "transacciones",
  "proyectos",
  "tareas",
  "cotizaciones",
  "contratos",
  "activos",
  "tickets",
]

const nqlFunctions = [
  "FECHA_HOY()",
  "FECHA_AYER()",
  "INICIO_MES()",
  "FIN_MES()",
  "INICIO_AÑO()",
  "FORMATO_FECHA()",
  "MAYUSCULAS()",
  "MINUSCULAS()",
  "RECORTAR()",
  "CONCATENAR()",
  "LONGITUD()",
  "REDONDEAR()",
  "ABS()",
  "POTENCIA()",
  "RAIZ()",
  "SI()",
  "CASO()",
  "COALESCE()",
  "DISTINCT()",
]

interface QueryResult {
  id: string
  query: string
  timestamp: Date
  duration: number
  rowCount: number
  status: "success" | "error"
  error?: string
  data?: any[]
  columns?: string[]
}

interface SavedQuery {
  id: string
  name: string
  query: string
  description?: string
  createdAt: Date
  isFavorite: boolean
}

export function NQLConsoleModule() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<QueryResult[]>([])
  const [currentResult, setCurrentResult] = useState<QueryResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([
    {
      id: "1",
      name: "Ventas del mes",
      query: "OBTENER * DE ventas DONDE fecha ENTRE INICIO_MES() Y FECHA_HOY() ORDENAR fecha DESC",
      description: "Obtiene todas las ventas del mes actual ordenadas por fecha",
      createdAt: new Date(),
      isFavorite: true,
    },
    {
      id: "2",
      name: "Clientes activos",
      query: 'OBTENER nombre, email, total_compras DE clientes DONDE estado = "activo" Y total_compras > 1000000',
      description: "Lista clientes activos con compras mayores a 1M",
      createdAt: new Date(),
      isFavorite: true,
    },
    {
      id: "3",
      name: "Inventario bajo",
      query: "OBTENER codigo, nombre, stock, stock_minimo DE productos DONDE stock < stock_minimo ORDENAR stock ASC",
      description: "Productos con stock por debajo del mínimo",
      createdAt: new Date(),
      isFavorite: false,
    },
    {
      id: "4",
      name: "Top vendedores",
      query:
        "OBTENER vendedor, SUMAR(total) como total_ventas, CONTAR(*) como num_ventas DE ventas AGRUPAR vendedor ORDENAR total_ventas DESC LIMITE 10",
      description: "Los 10 vendedores con más ventas",
      createdAt: new Date(),
      isFavorite: false,
    },
  ])
  const [activeTab, setActiveTab] = useState("console")
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [newQueryName, setNewQueryName] = useState("")
  const [newQueryDescription, setNewQueryDescription] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [viewMode, setViewMode] = useState<"table" | "json">("table")
  const [aiSuggestion, setAiSuggestion] = useState("")
  const [showAIHelper, setShowAIHelper] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")

  // Simulate query execution
  const executeQuery = async () => {
    if (!query.trim()) return

    setIsRunning(true)
    const startTime = Date.now()

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))

    const duration = Date.now() - startTime

    // Parse and validate query (simplified)
    const upperQuery = query.toUpperCase()
    const isValid = upperQuery.includes("OBTENER") || upperQuery.includes("CONTAR") || upperQuery.includes("SUMAR")

    if (!isValid) {
      const errorResult: QueryResult = {
        id: Date.now().toString(),
        query,
        timestamp: new Date(),
        duration,
        rowCount: 0,
        status: "error",
        error:
          "Sintaxis inválida. Las consultas deben comenzar con OBTENER, CONTAR, SUMAR, u otra función de agregación.",
      }
      setResults((prev) => [errorResult, ...prev])
      setCurrentResult(errorResult)
      setIsRunning(false)
      return
    }

    // Generate mock data based on query
    const mockData = generateMockData(query)

    const result: QueryResult = {
      id: Date.now().toString(),
      query,
      timestamp: new Date(),
      duration,
      rowCount: mockData.data.length,
      status: "success",
      data: mockData.data,
      columns: mockData.columns,
    }

    setResults((prev) => [result, ...prev])
    setCurrentResult(result)
    setIsRunning(false)
  }

  const generateMockData = (query: string): { data: any[]; columns: string[] } => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("clientes")) {
      return {
        columns: ["id", "nombre", "email", "telefono", "ciudad", "total_compras", "estado"],
        data: [
          {
            id: 1,
            nombre: "Industrias ABC S.A.S",
            email: "contacto@abc.com",
            telefono: "601-555-0101",
            ciudad: "Bogotá",
            total_compras: 45600000,
            estado: "activo",
          },
          {
            id: 2,
            nombre: "Comercial XYZ Ltda",
            email: "ventas@xyz.co",
            telefono: "604-555-0102",
            ciudad: "Medellín",
            total_compras: 32100000,
            estado: "activo",
          },
          {
            id: 3,
            nombre: "TechSolutions Colombia",
            email: "info@techsol.com",
            telefono: "602-555-0103",
            ciudad: "Cali",
            total_compras: 28900000,
            estado: "activo",
          },
          {
            id: 4,
            nombre: "Distribuidora Nacional",
            email: "pedidos@distnac.co",
            telefono: "605-555-0104",
            ciudad: "Barranquilla",
            total_compras: 19500000,
            estado: "activo",
          },
          {
            id: 5,
            nombre: "Grupo Empresarial del Norte",
            email: "gerencia@grupnorte.com",
            telefono: "605-555-0105",
            ciudad: "Cartagena",
            total_compras: 15200000,
            estado: "inactivo",
          },
        ],
      }
    }

    if (lowerQuery.includes("productos") || lowerQuery.includes("inventario")) {
      return {
        columns: ["codigo", "nombre", "categoria", "stock", "stock_minimo", "precio", "ubicacion"],
        data: [
          {
            codigo: "PRD-001",
            nombre: "Motor Eléctrico 5HP",
            categoria: "Motores",
            stock: 12,
            stock_minimo: 15,
            precio: 2450000,
            ubicacion: "A-01-02",
          },
          {
            codigo: "PRD-002",
            nombre: "Válvula de Control DN50",
            categoria: "Válvulas",
            stock: 8,
            stock_minimo: 20,
            precio: 890000,
            ubicacion: "B-03-01",
          },
          {
            codigo: "PRD-003",
            nombre: "Sensor de Temperatura PT100",
            categoria: "Sensores",
            stock: 45,
            stock_minimo: 30,
            precio: 125000,
            ubicacion: "C-02-04",
          },
          {
            codigo: "PRD-004",
            nombre: "Bomba Centrífuga 2HP",
            categoria: "Bombas",
            stock: 5,
            stock_minimo: 10,
            precio: 1850000,
            ubicacion: "A-02-01",
          },
          {
            codigo: "PRD-005",
            nombre: "PLC Siemens S7-1200",
            categoria: "Controladores",
            stock: 3,
            stock_minimo: 5,
            precio: 4200000,
            ubicacion: "D-01-01",
          },
        ],
      }
    }

    if (lowerQuery.includes("ventas")) {
      return {
        columns: ["id", "fecha", "cliente", "vendedor", "productos", "subtotal", "iva", "total", "estado"],
        data: [
          {
            id: "VTA-2024-001",
            fecha: "2024-12-08",
            cliente: "Industrias ABC S.A.S",
            vendedor: "Carlos Gómez",
            productos: 5,
            subtotal: 12500000,
            iva: 2375000,
            total: 14875000,
            estado: "completada",
          },
          {
            id: "VTA-2024-002",
            fecha: "2024-12-07",
            cliente: "Comercial XYZ Ltda",
            vendedor: "María López",
            productos: 3,
            subtotal: 8900000,
            iva: 1691000,
            total: 10591000,
            estado: "completada",
          },
          {
            id: "VTA-2024-003",
            fecha: "2024-12-07",
            cliente: "TechSolutions Colombia",
            vendedor: "Carlos Gómez",
            productos: 8,
            subtotal: 15600000,
            iva: 2964000,
            total: 18564000,
            estado: "pendiente",
          },
          {
            id: "VTA-2024-004",
            fecha: "2024-12-06",
            cliente: "Distribuidora Nacional",
            vendedor: "Ana Martínez",
            productos: 2,
            subtotal: 4200000,
            iva: 798000,
            total: 4998000,
            estado: "completada",
          },
          {
            id: "VTA-2024-005",
            fecha: "2024-12-05",
            cliente: "Grupo Empresarial",
            vendedor: "María López",
            productos: 12,
            subtotal: 28900000,
            iva: 5491000,
            total: 34391000,
            estado: "completada",
          },
        ],
      }
    }

    if (lowerQuery.includes("empleados")) {
      return {
        columns: ["id", "nombre", "cargo", "departamento", "fecha_ingreso", "salario", "estado"],
        data: [
          {
            id: "EMP-001",
            nombre: "Carlos Andrés Gómez",
            cargo: "Gerente Comercial",
            departamento: "Ventas",
            fecha_ingreso: "2019-03-15",
            salario: 8500000,
            estado: "activo",
          },
          {
            id: "EMP-002",
            nombre: "María Fernanda López",
            cargo: "Ejecutiva de Ventas",
            departamento: "Ventas",
            fecha_ingreso: "2020-06-01",
            salario: 4200000,
            estado: "activo",
          },
          {
            id: "EMP-003",
            nombre: "Juan Pablo Rodríguez",
            cargo: "Contador",
            departamento: "Finanzas",
            fecha_ingreso: "2018-01-10",
            salario: 5800000,
            estado: "activo",
          },
          {
            id: "EMP-004",
            nombre: "Ana María Martínez",
            cargo: "Jefe de Producción",
            departamento: "Producción",
            fecha_ingreso: "2017-08-20",
            salario: 7200000,
            estado: "activo",
          },
          {
            id: "EMP-005",
            nombre: "Diego Fernando Castro",
            cargo: "Técnico de Soporte",
            departamento: "IT",
            fecha_ingreso: "2021-02-15",
            salario: 3500000,
            estado: "activo",
          },
        ],
      }
    }

    // Default data
    return {
      columns: ["id", "campo1", "campo2", "valor", "fecha"],
      data: [
        { id: 1, campo1: "Dato A", campo2: "Info 1", valor: 1500000, fecha: "2024-12-08" },
        { id: 2, campo1: "Dato B", campo2: "Info 2", valor: 2300000, fecha: "2024-12-07" },
        { id: 3, campo1: "Dato C", campo2: "Info 3", valor: 890000, fecha: "2024-12-06" },
      ],
    }
  }

  // Autocomplete suggestions
  const updateSuggestions = (text: string, position: number) => {
    const beforeCursor = text.substring(0, position)
    const words = beforeCursor.split(/\s+/)
    const currentWord = words[words.length - 1].toUpperCase()

    if (currentWord.length < 2) {
      setShowSuggestions(false)
      return
    }

    const allSuggestions = [...nqlKeywords, ...nqlEntities, ...nqlFunctions]
    const filtered = allSuggestions.filter((s) => s.toUpperCase().startsWith(currentWord))

    if (filtered.length > 0 && filtered.length < 10) {
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const applySuggestion = (suggestion: string) => {
    const beforeCursor = query.substring(0, cursorPosition)
    const afterCursor = query.substring(cursorPosition)
    const words = beforeCursor.split(/\s+/)
    words[words.length - 1] = suggestion
    const newQuery = words.join(" ") + " " + afterCursor.trimStart()
    setQuery(newQuery)
    setShowSuggestions(false)
    textareaRef.current?.focus()
  }

  const saveQuery = () => {
    if (!newQueryName.trim() || !query.trim()) return

    const newSaved: SavedQuery = {
      id: Date.now().toString(),
      name: newQueryName,
      query,
      description: newQueryDescription,
      createdAt: new Date(),
      isFavorite: false,
    }

    setSavedQueries((prev) => [newSaved, ...prev])
    setShowSaveDialog(false)
    setNewQueryName("")
    setNewQueryDescription("")
  }

  const toggleFavorite = (id: string) => {
    setSavedQueries((prev) => prev.map((q) => (q.id === id ? { ...q, isFavorite: !q.isFavorite } : q)))
  }

  const loadQuery = (savedQuery: SavedQuery) => {
    setQuery(savedQuery.query)
    setActiveTab("console")
  }

  const deleteSavedQuery = (id: string) => {
    setSavedQueries((prev) => prev.filter((q) => q.id !== id))
  }

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return

    setShowAIHelper(false)

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const promptLower = aiPrompt.toLowerCase()
    let generatedQuery = ""

    if (promptLower.includes("venta") && promptLower.includes("mes")) {
      generatedQuery =
        "OBTENER cliente, SUMAR(total) como total_ventas, CONTAR(*) como num_facturas\nDE ventas\nDONDE fecha ENTRE INICIO_MES() Y FECHA_HOY()\nAGRUPAR cliente\nORDENAR total_ventas DESC"
    } else if (promptLower.includes("cliente") && promptLower.includes("activo")) {
      generatedQuery =
        'OBTENER id, nombre, email, telefono, ciudad, total_compras\nDE clientes\nDONDE estado = "activo"\nORDENAR total_compras DESC'
    } else if (promptLower.includes("producto") && (promptLower.includes("bajo") || promptLower.includes("stock"))) {
      generatedQuery =
        "OBTENER codigo, nombre, categoria, stock, stock_minimo, (stock_minimo - stock) como faltante\nDE productos\nDONDE stock < stock_minimo\nORDENAR faltante DESC"
    } else if (promptLower.includes("empleado") || promptLower.includes("nómina")) {
      generatedQuery =
        'OBTENER id, nombre, cargo, departamento, salario\nDE empleados\nDONDE estado = "activo"\nORDENAR departamento, salario DESC'
    } else if (promptLower.includes("factura") && promptLower.includes("pend")) {
      generatedQuery =
        'OBTENER numero, cliente, fecha_emision, fecha_vencimiento, total, dias_mora\nDE facturas\nDONDE estado = "pendiente" Y fecha_vencimiento < FECHA_HOY()\nORDENAR dias_mora DESC'
    } else {
      generatedQuery = `OBTENER *\nDE ${nqlEntities[Math.floor(Math.random() * nqlEntities.length)]}\nLIMITE 100`
    }

    setQuery(generatedQuery)
    setAiPrompt("")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const exportResults = (format: "csv" | "json") => {
    if (!currentResult?.data) return

    let content = ""
    let filename = ""
    let mimeType = ""

    if (format === "csv") {
      const headers = currentResult.columns?.join(",") || ""
      const rows = currentResult.data
        .map((row) => currentResult.columns?.map((col) => `"${row[col]}"`).join(","))
        .join("\n")
      content = `${headers}\n${rows}`
      filename = "nql_export.csv"
      mimeType = "text/csv"
    } else {
      content = JSON.stringify(currentResult.data, null, 2)
      filename = "nql_export.json"
      mimeType = "application/json"
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

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
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
              <Terminal className="h-6 w-6 text-white" />
            </div>
            Consola NQL
          </h1>
          <p className="text-muted-foreground mt-1">
            NEXUS Query Language - Consultas seguras sin acceso directo a SQL
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowAIHelper(true)}>
            <Sparkles className="h-4 w-4 mr-2 text-violet-500" />
            Generar con AI
          </Button>
          <Button variant="outline" size="sm" onClick={() => setActiveTab("docs")}>
            <BookOpen className="h-4 w-4 mr-2" />
            Documentación
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Panel - Query Editor */}
        <div className="col-span-8 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-violet-500" />
                  Editor de Consultas
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowSaveDialog(true)} disabled={!query.trim()}>
                    <Save className="h-4 w-4 mr-1" />
                    Guardar
                  </Button>
                  <Button
                    size="sm"
                    onClick={executeQuery}
                    disabled={!query.trim() || isRunning}
                    className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                  >
                    {isRunning ? (
                      <>
                        <div className="h-4 w-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Ejecutando...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        Ejecutar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  ref={textareaRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    updateSuggestions(e.target.value, e.target.selectionStart || 0)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) {
                      e.preventDefault()
                      executeQuery()
                    }
                    if (e.key === "Tab" && showSuggestions && suggestions.length > 0) {
                      e.preventDefault()
                      applySuggestion(suggestions[0])
                    }
                  }}
                  onSelect={(e) => setCursorPosition((e.target as HTMLTextAreaElement).selectionStart)}
                  placeholder="Escribe tu consulta NQL aquí... (Ctrl+Enter para ejecutar)"
                  className="min-h-[200px] font-mono text-sm bg-zinc-950 text-emerald-400 border-zinc-800 resize-none"
                />

                {/* Autocomplete dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute left-4 top-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 overflow-hidden">
                    {suggestions.map((s, i) => (
                      <button
                        key={s}
                        onClick={() => applySuggestion(s)}
                        className={`w-full px-3 py-2 text-left text-sm font-mono hover:bg-zinc-800 flex items-center gap-2 ${i === 0 ? "bg-zinc-800" : ""}`}
                      >
                        {nqlKeywords.includes(s) && (
                          <Badge
                            variant="outline"
                            className="text-[10px] bg-blue-500/20 text-blue-400 border-blue-500/30"
                          >
                            KEYWORD
                          </Badge>
                        )}
                        {nqlEntities.includes(s) && (
                          <Badge
                            variant="outline"
                            className="text-[10px] bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          >
                            ENTIDAD
                          </Badge>
                        )}
                        {nqlFunctions.includes(s) && (
                          <Badge
                            variant="outline"
                            className="text-[10px] bg-amber-500/20 text-amber-400 border-amber-500/30"
                          >
                            FUNCIÓN
                          </Badge>
                        )}
                        <span className="text-zinc-300">{s}</span>
                        {i === 0 && <span className="text-zinc-500 text-xs ml-auto">Tab</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick examples */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground">Ejemplos rápidos:</span>
                {[
                  { label: "Clientes activos", query: 'OBTENER * DE clientes DONDE estado = "activo"' },
                  {
                    label: "Ventas del mes",
                    query: "OBTENER * DE ventas DONDE fecha ENTRE INICIO_MES() Y FECHA_HOY()",
                  },
                  { label: "Stock bajo", query: "OBTENER * DE productos DONDE stock < stock_minimo" },
                ].map((ex) => (
                  <Button
                    key={ex.label}
                    variant="outline"
                    size="sm"
                    className="h-6 text-xs bg-transparent"
                    onClick={() => setQuery(ex.query)}
                  >
                    {ex.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Table className="h-5 w-5 text-emerald-500" />
                  Resultados
                  {currentResult && (
                    <Badge
                      variant="outline"
                      className={
                        currentResult.status === "success"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    >
                      {currentResult.status === "success" ? `${currentResult.rowCount} filas` : "Error"}
                    </Badge>
                  )}
                </CardTitle>
                {currentResult?.data && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <Button
                        variant={viewMode === "table" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 rounded-none"
                        onClick={() => setViewMode("table")}
                      >
                        <Table className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant={viewMode === "json" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 rounded-none"
                        onClick={() => setViewMode("json")}
                      >
                        <Braces className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Exportar
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => exportResults("csv")}>
                          <FileJson className="h-4 w-4 mr-2" />
                          Exportar CSV
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => exportResults("json")}>
                          <Braces className="h-4 w-4 mr-2" />
                          Exportar JSON
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!currentResult ? (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Database className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>Ejecuta una consulta para ver los resultados</p>
                  </div>
                </div>
              ) : currentResult.status === "error" ? (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <XCircle className="h-12 w-12 mx-auto mb-3 text-red-500" />
                    <p className="text-red-400 font-medium">Error en la consulta</p>
                    <p className="text-sm text-muted-foreground mt-2 max-w-md">{currentResult.error}</p>
                  </div>
                </div>
              ) : viewMode === "table" ? (
                <ScrollArea className="h-[300px]">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-background">
                      <tr className="border-b">
                        {currentResult.columns?.map((col) => (
                          <th key={col} className="text-left p-2 font-medium text-muted-foreground">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentResult.data?.map((row, i) => (
                        <tr key={i} className="border-b border-zinc-800 hover:bg-zinc-900/50">
                          {currentResult.columns?.map((col) => (
                            <td key={col} className="p-2">
                              {typeof row[col] === "number" && row[col] > 10000
                                ? formatCurrency(row[col])
                                : String(row[col])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ScrollArea>
              ) : (
                <ScrollArea className="h-[300px]">
                  <pre className="text-sm font-mono text-emerald-400 bg-zinc-950 p-4 rounded-lg">
                    {JSON.stringify(currentResult.data, null, 2)}
                  </pre>
                </ScrollArea>
              )}

              {currentResult && currentResult.status === "success" && (
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {currentResult.duration}ms
                  </span>
                  <span>{currentResult.rowCount} resultados encontrados</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Tabs */}
        <div className="col-span-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="console">Guardadas</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
              <TabsTrigger value="docs">Docs</TabsTrigger>
            </TabsList>

            <TabsContent value="console" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-amber-500" />
                      Consultas Guardadas
                    </span>
                    <Badge variant="outline">{savedQueries.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-1 p-3">
                      {savedQueries.map((sq) => (
                        <div
                          key={sq.id}
                          className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 cursor-pointer" onClick={() => loadQuery(sq)}>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{sq.name}</span>
                                {sq.isFavorite && <Star className="h-3 w-3 text-amber-500 fill-amber-500" />}
                              </div>
                              {sq.description && <p className="text-xs text-muted-foreground mt-1">{sq.description}</p>}
                              <pre className="text-xs font-mono text-emerald-400 mt-2 bg-zinc-950 p-2 rounded truncate">
                                {sq.query.split("\n")[0]}...
                              </pre>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => toggleFavorite(sq.id)}
                              >
                                <Star
                                  className={`h-3.5 w-3.5 ${sq.isFavorite ? "text-amber-500 fill-amber-500" : ""}`}
                                />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => copyToClipboard(sq.query)}
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-red-500 hover:text-red-400"
                                onClick={() => deleteSavedQuery(sq.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <History className="h-4 w-4 text-blue-500" />
                    Historial de Consultas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-1 p-3">
                      {results.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <History className="h-8 w-8 mx-auto mb-2 opacity-20" />
                          <p className="text-sm">No hay consultas en el historial</p>
                        </div>
                      ) : (
                        results.map((r) => (
                          <div
                            key={r.id}
                            className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                            onClick={() => {
                              setQuery(r.query)
                              setCurrentResult(r)
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {r.status === "success" ? (
                                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-500" />
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {r.timestamp.toLocaleTimeString()}
                                </span>
                              </div>
                              <Badge variant="outline" className="text-[10px]">
                                {r.duration}ms
                              </Badge>
                            </div>
                            <pre className="text-xs font-mono text-emerald-400 bg-zinc-950 p-2 rounded truncate">
                              {r.query.split("\n")[0]}
                            </pre>
                            {r.status === "success" && (
                              <p className="text-xs text-muted-foreground mt-2">{r.rowCount} filas retornadas</p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="docs" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-violet-500" />
                    Referencia NQL
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="p-4 space-y-6">
                      {/* Syntax */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-primary" />
                          Sintaxis Básica
                        </h4>
                        <pre className="text-xs font-mono bg-zinc-950 p-3 rounded-lg text-emerald-400">
                          {`OBTENER campos
DE entidad
DONDE condiciones
ORDENAR campo ASC|DESC
LIMITE número`}
                        </pre>
                      </div>

                      {/* Keywords */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Filter className="h-4 w-4 text-blue-500" />
                          Palabras Clave
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {nqlKeywords.slice(0, 15).map((k) => (
                            <Badge key={k} variant="outline" className="text-[10px] bg-blue-500/10 text-blue-400">
                              {k}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Entities */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Database className="h-4 w-4 text-emerald-500" />
                          Entidades Disponibles
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {nqlEntities.map((e) => (
                            <Badge key={e} variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-400">
                              {e}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Functions */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Calculator className="h-4 w-4 text-amber-500" />
                          Funciones
                        </h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs text-muted-foreground">Agregación:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {["CONTAR(*)", "SUMAR(campo)", "PROMEDIO(campo)", "MAXIMO(campo)", "MINIMO(campo)"].map(
                                (f) => (
                                  <Badge
                                    key={f}
                                    variant="outline"
                                    className="text-[10px] bg-amber-500/10 text-amber-400 font-mono"
                                  >
                                    {f}
                                  </Badge>
                                ),
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">Fechas:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {["FECHA_HOY()", "INICIO_MES()", "FIN_MES()", "INICIO_AÑO()"].map((f) => (
                                <Badge
                                  key={f}
                                  variant="outline"
                                  className="text-[10px] bg-violet-500/10 text-violet-400 font-mono"
                                >
                                  {f}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Examples */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          Ejemplos
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Ventas del mes agrupadas por cliente:</p>
                            <pre className="text-[10px] font-mono bg-zinc-950 p-2 rounded text-emerald-400">
                              {`OBTENER cliente, SUMAR(total)
DE ventas
DONDE fecha ENTRE INICIO_MES() Y FECHA_HOY()
AGRUPAR cliente`}
                            </pre>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Productos con stock bajo:</p>
                            <pre className="text-[10px] font-mono bg-zinc-950 p-2 rounded text-emerald-400">
                              {`OBTENER codigo, nombre, stock
DE productos
DONDE stock < stock_minimo
ORDENAR stock ASC`}
                            </pre>
                          </div>
                        </div>
                      </div>

                      {/* Security Notice */}
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <div className="flex items-start gap-2">
                          <Shield className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-emerald-400">Seguridad</p>
                            <p className="text-xs text-emerald-400/70 mt-1">
                              NQL se traduce internamente a consultas seguras. Los usuarios nunca tienen acceso directo
                              a SQL o a la estructura de la base de datos.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Save Query Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Guardar Consulta</DialogTitle>
            <DialogDescription>Guarda esta consulta para usarla después</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                value={newQueryName}
                onChange={(e) => setNewQueryName(e.target.value)}
                placeholder="Ej: Ventas del mes actual"
              />
            </div>
            <div className="space-y-2">
              <Label>Descripción (opcional)</Label>
              <Textarea
                value={newQueryDescription}
                onChange={(e) => setNewQueryDescription(e.target.value)}
                placeholder="Describe qué hace esta consulta..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Consulta</Label>
              <pre className="text-xs font-mono bg-zinc-950 p-3 rounded-lg text-emerald-400 max-h-[100px] overflow-auto">
                {query}
              </pre>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={saveQuery} disabled={!newQueryName.trim()}>
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Helper Dialog */}
      <Dialog open={showAIHelper} onOpenChange={setShowAIHelper}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-500" />
              Generar Consulta con AI
            </DialogTitle>
            <DialogDescription>Describe lo que quieres consultar en lenguaje natural</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Ej: Dame las ventas del mes actual agrupadas por vendedor, ordenadas de mayor a menor..."
              rows={4}
            />
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Ejemplos:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Clientes activos con más compras",
                  "Productos con stock bajo",
                  "Ventas del mes por vendedor",
                  "Facturas pendientes vencidas",
                  "Empleados por departamento",
                ].map((ex) => (
                  <Button
                    key={ex}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 bg-transparent"
                    onClick={() => setAiPrompt(ex)}
                  >
                    {ex}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAIHelper(false)}>
              Cancelar
            </Button>
            <Button
              onClick={generateWithAI}
              disabled={!aiPrompt.trim()}
              className="bg-gradient-to-r from-violet-500 to-purple-600"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Shield icon for security notice
function Shield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
