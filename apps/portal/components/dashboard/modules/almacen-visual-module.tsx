"use client"

import type React from "react"

import { useState, useRef, useCallback, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Warehouse,
  Store,
  Box,
  Thermometer,
  AlertTriangle,
  Plus,
  Move,
  ZoomIn,
  ZoomOut,
  Lock,
  Unlock,
  Trash2,
  Copy,
  Grid3X3,
  Layers,
  Edit3,
  Save,
  Undo2,
  Redo2,
  MousePointer2,
  Hand,
  Square,
  RectangleHorizontal,
  Maximize2,
  Snowflake,
  PackageCheck,
  Truck,
  ArrowLeftRight,
  Gem,
  Package,
  Sparkles,
  FileImage,
  X,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  GitBranch,
  Workflow,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Flow {
  id: string
  fromZoneId: string
  toZoneId: string
  type: "primary" | "secondary" | "emergency"
  label?: string
  color: string
}

interface Zone {
  id: string
  name: string
  type:
    | "storage"
    | "refrigerated"
    | "frozen"
    | "dispatch"
    | "receiving"
    | "staging"
    | "returns"
    | "hazmat"
    | "highvalue"
  x: number
  y: number
  width: number
  height: number
  rotation: number
  color: string
  capacity: number
  currentOccupancy: number
  temperature?: { min: number; max: number; current: number }
  locked: boolean
  visible: boolean
  activityLevel: number
  avgPickTime: number
  dailyPicks: number
}

interface Shelf {
  id: string
  zoneId: string
  name: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  levels: number
  positionsPerLevel: number
  type: "standard" | "drive-in" | "cantilever" | "pallet" | "shelving" | "mezzanine"
  color: string
  products: { sku: string; name: string; qty: number; level: number; position: number }[]
}

interface PointOfSale {
  id: string
  name: string
  location: string
  type: "warehouse" | "store" | "distribution"
  area: number
  zones: Zone[]
  shelves: Shelf[]
}

// Sample data
const samplePointsOfSale: PointOfSale[] = [
  {
    id: "pos-1",
    name: "Centro de Distribución Bogotá",
    location: "Bogotá, Colombia",
    type: "warehouse",
    area: 5000,
    zones: [
      {
        id: "zone-1",
        name: "Recepción",
        type: "receiving",
        x: 50,
        y: 50,
        width: 200,
        height: 150,
        rotation: 0,
        color: "#22c55e",
        capacity: 500,
        currentOccupancy: 320,
        locked: false,
        visible: true,
        activityLevel: 85,
        avgPickTime: 2.5,
        dailyPicks: 450,
      },
      {
        id: "zone-2",
        name: "Almacenamiento General",
        type: "storage",
        x: 300,
        y: 50,
        width: 350,
        height: 200,
        rotation: 0,
        color: "#3b82f6",
        capacity: 2000,
        currentOccupancy: 1650,
        locked: false,
        visible: true,
        activityLevel: 72,
        avgPickTime: 3.2,
        dailyPicks: 890,
      },
      {
        id: "zone-3",
        name: "Refrigerados",
        type: "refrigerated",
        x: 300,
        y: 280,
        width: 180,
        height: 150,
        rotation: 0,
        color: "#06b6d4",
        capacity: 300,
        currentOccupancy: 245,
        temperature: { min: 2, max: 8, current: 4.5 },
        locked: false,
        visible: true,
        activityLevel: 65,
        avgPickTime: 4.1,
        dailyPicks: 210,
      },
      {
        id: "zone-4",
        name: "Congelados",
        type: "frozen",
        x: 510,
        y: 280,
        width: 140,
        height: 150,
        rotation: 0,
        color: "#8b5cf6",
        capacity: 200,
        currentOccupancy: 180,
        temperature: { min: -25, max: -18, current: -20 },
        locked: false,
        visible: true,
        activityLevel: 45,
        avgPickTime: 5.2,
        dailyPicks: 95,
      },
      {
        id: "zone-5",
        name: "Despacho",
        type: "dispatch",
        x: 700,
        y: 50,
        width: 180,
        height: 150,
        rotation: 0,
        color: "#f97316",
        capacity: 400,
        currentOccupancy: 125,
        locked: false,
        visible: true,
        activityLevel: 92,
        avgPickTime: 1.8,
        dailyPicks: 520,
      },
      {
        id: "zone-6",
        name: "Staging",
        type: "staging",
        x: 700,
        y: 230,
        width: 180,
        height: 100,
        rotation: 0,
        color: "#eab308",
        capacity: 150,
        currentOccupancy: 80,
        locked: false,
        visible: true,
        activityLevel: 78,
        avgPickTime: 2.1,
        dailyPicks: 380,
      },
      {
        id: "zone-7",
        name: "Devoluciones",
        type: "returns",
        x: 50,
        y: 230,
        width: 200,
        height: 120,
        rotation: 0,
        color: "#ec4899",
        capacity: 200,
        currentOccupancy: 45,
        locked: false,
        visible: true,
        activityLevel: 35,
        avgPickTime: 6.5,
        dailyPicks: 65,
      },
    ],
    shelves: [
      {
        id: "shelf-1",
        zoneId: "zone-2",
        name: "EST-A1",
        x: 320,
        y: 70,
        width: 80,
        height: 25,
        rotation: 0,
        levels: 5,
        positionsPerLevel: 10,
        type: "pallet",
        color: "#fbbf24",
        products: [
          { sku: "SKU-001", name: "Producto A", qty: 150, level: 1, position: 1 },
          { sku: "SKU-002", name: "Producto B", qty: 80, level: 2, position: 3 },
        ],
      },
      {
        id: "shelf-2",
        zoneId: "zone-2",
        name: "EST-A2",
        x: 320,
        y: 110,
        width: 80,
        height: 25,
        rotation: 0,
        levels: 5,
        positionsPerLevel: 10,
        type: "pallet",
        color: "#fbbf24",
        products: [],
      },
      {
        id: "shelf-3",
        zoneId: "zone-2",
        name: "EST-B1",
        x: 420,
        y: 70,
        width: 80,
        height: 25,
        rotation: 0,
        levels: 4,
        positionsPerLevel: 8,
        type: "shelving",
        color: "#a3e635",
        products: [],
      },
      {
        id: "shelf-4",
        zoneId: "zone-2",
        name: "EST-B2",
        x: 420,
        y: 110,
        width: 80,
        height: 25,
        rotation: 0,
        levels: 4,
        positionsPerLevel: 8,
        type: "shelving",
        color: "#a3e635",
        products: [],
      },
      {
        id: "shelf-5",
        zoneId: "zone-2",
        name: "EST-C1",
        x: 520,
        y: 70,
        width: 100,
        height: 30,
        rotation: 0,
        levels: 3,
        positionsPerLevel: 6,
        type: "drive-in",
        color: "#f472b6",
        products: [],
      },
      {
        id: "shelf-6",
        zoneId: "zone-3",
        name: "REF-A1",
        x: 320,
        y: 300,
        width: 60,
        height: 20,
        rotation: 0,
        levels: 4,
        positionsPerLevel: 6,
        type: "standard",
        color: "#22d3ee",
        products: [],
      },
      {
        id: "shelf-7",
        zoneId: "zone-4",
        name: "CONG-A1",
        x: 530,
        y: 300,
        width: 50,
        height: 20,
        rotation: 0,
        levels: 3,
        positionsPerLevel: 4,
        type: "standard",
        color: "#a78bfa",
        products: [],
      },
    ],
  },
  {
    id: "pos-2",
    name: "Tienda Norte",
    location: "Bogotá Norte",
    type: "store",
    area: 800,
    zones: [
      {
        id: "zone-s1",
        name: "Piso de Ventas",
        type: "storage",
        x: 50,
        y: 50,
        width: 300,
        height: 200,
        rotation: 0,
        color: "#3b82f6",
        capacity: 500,
        currentOccupancy: 380,
        locked: false,
        visible: true,
        activityLevel: 88,
        avgPickTime: 1.5,
        dailyPicks: 1200,
      },
      {
        id: "zone-s2",
        name: "Bodega Trasera",
        type: "storage",
        x: 380,
        y: 50,
        width: 150,
        height: 200,
        rotation: 0,
        color: "#6366f1",
        capacity: 200,
        currentOccupancy: 165,
        locked: false,
        visible: true,
        activityLevel: 55,
        avgPickTime: 2.8,
        dailyPicks: 180,
      },
    ],
    shelves: [],
  },
]

const sampleFlows: Flow[] = [
  { id: "flow-1", fromZoneId: "zone-1", toZoneId: "zone-2", type: "primary", label: "Almacenar", color: "#22c55e" },
  { id: "flow-2", fromZoneId: "zone-2", toZoneId: "zone-6", type: "primary", label: "Preparar", color: "#3b82f6" },
  { id: "flow-3", fromZoneId: "zone-6", toZoneId: "zone-5", type: "primary", label: "Despachar", color: "#f97316" },
  {
    id: "flow-4",
    fromZoneId: "zone-3",
    toZoneId: "zone-6",
    type: "secondary",
    label: "Refrigerados",
    color: "#06b6d4",
  },
  { id: "flow-5", fromZoneId: "zone-4", toZoneId: "zone-6", type: "secondary", label: "Congelados", color: "#8b5cf6" },
  { id: "flow-6", fromZoneId: "zone-5", toZoneId: "zone-7", type: "emergency", label: "Devolución", color: "#ec4899" },
]

const zoneIcons: Record<Zone["type"], React.ReactNode> = {
  storage: <Box className="h-4 w-4" />,
  refrigerated: <Thermometer className="h-4 w-4" />,
  frozen: <Snowflake className="h-4 w-4" />,
  dispatch: <Truck className="h-4 w-4" />,
  receiving: <PackageCheck className="h-4 w-4" />,
  staging: <Layers className="h-4 w-4" />,
  returns: <ArrowLeftRight className="h-4 w-4" />,
  hazmat: <AlertTriangle className="h-4 w-4" />,
  highvalue: <Gem className="h-4 w-4" />,
}

const zoneTypeLabels: Record<Zone["type"], string> = {
  storage: "Almacenamiento",
  refrigerated: "Refrigerado",
  frozen: "Congelado",
  dispatch: "Despacho",
  receiving: "Recepción",
  staging: "Staging",
  returns: "Devoluciones",
  hazmat: "Mat. Peligrosos",
  highvalue: "Alto Valor",
}

const shelfTypeLabels: Record<Shelf["type"], string> = {
  standard: "Estándar",
  "drive-in": "Drive-In",
  cantilever: "Cantilever",
  pallet: "Pallets",
  shelving: "Estantería",
  mezzanine: "Mezzanine",
}

export function AlmacenVisualModule() {
  const [selectedPOS, setSelectedPOS] = useState<PointOfSale>(samplePointsOfSale[0])
  const [zones, setZones] = useState<Zone[]>(samplePointsOfSale[0].zones)
  const [shelves, setShelves] = useState<Shelf[]>(samplePointsOfSale[0].shelves)
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null)
  const [selectedShelf, setSelectedShelf] = useState<Shelf | null>(null)
  const [tool, setTool] = useState<"select" | "pan" | "zone" | "shelf" | "move" | "resize" | "rotate" | "flow">(
    "select",
  )
  const [viewMode, setViewMode] = useState<"2d" | "heatmap" | "occupancy" | "temperature" | "flows">("2d")
  const [zoom, setZoom] = useState(100)
  const [isEditing, setIsEditing] = useState(false)
  const [showGrid, setShowGrid] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [gridSize, setGridSize] = useState(20)
  const [snapToGrid, setSnapToGrid] = useState(true)

  const [flows, setFlows] = useState<Flow[]>(sampleFlows)
  const [showFlows, setShowFlows] = useState(true)
  const [flowCreating, setFlowCreating] = useState<{ fromZoneId: string } | null>(null)
  const [showFlowDialog, setShowFlowDialog] = useState(false)
  const [newFlow, setNewFlow] = useState<Partial<Flow>>({
    type: "primary",
    label: "",
    color: "#22c55e",
  })
  const [selectedFlow, setSelectedFlow] = useState<Flow | null>(null)

  // Drag state
  const [isDragging, setIsDragging] = useState(false)
  const [dragTarget, setDragTarget] = useState<{ type: "zone" | "shelf"; id: string } | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const [resizeHandle, setResizeHandle] = useState<string | null>(null)

  // History for undo/redo
  const [history, setHistory] = useState([
    { zones: samplePointsOfSale[0].zones, shelves: samplePointsOfSale[0].shelves },
  ])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Dialogs
  const [showZoneDialog, setShowZoneDialog] = useState(false)
  const [showShelfDialog, setShowShelfDialog] = useState(false)
  const [showShelfDetails, setShowShelfDetails] = useState(false)

  // AI Features
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [aiRecommendations, setAIRecommendations] = useState<
    {
      id: string
      type: "optimization" | "layout" | "flow" | "capacity" | "safety"
      title: string
      description: string
      impact: "high" | "medium" | "low"
      implemented: boolean
    }[]
  >([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  // New zone/shelf state
  const [newZone, setNewZone] = useState<Partial<Zone>>({
    type: "storage",
    name: "",
    width: 200,
    height: 150,
    capacity: 500,
    color: "#3b82f6",
  })
  const [newShelf, setNewShelf] = useState<Partial<Shelf>>({
    type: "standard",
    name: "",
    width: 80,
    height: 25,
    levels: 4,
    positionsPerLevel: 8,
    color: "#fbbf24",
  })

  const canvasRef = useRef<HTMLDivElement>(null)

  // History functions
  const saveToHistory = useCallback(
    (newZones: Zone[], newShelves: Shelf[]) => {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push({ zones: newZones, shelves: newShelves })
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    },
    [history, historyIndex],
  )

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setZones(history[newIndex].zones)
      setShelves(history[newIndex].shelves)
    }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setZones(history[newIndex].zones)
      setShelves(history[newIndex].shelves)
    }
  }, [history, historyIndex])

  const snapValue = useCallback(
    (value: number) => {
      if (!snapToGrid) return value
      return Math.round(value / gridSize) * gridSize
    },
    [snapToGrid, gridSize],
  )

  const handleMouseDown = (e: React.MouseEvent, type: "zone" | "shelf", id: string) => {
    if (!isEditing) return

    e.stopPropagation()
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const item = type === "zone" ? zones.find((z) => z.id === id) : shelves.find((s) => s.id === id)
    if (!item || (type === "zone" && (item as Zone).locked)) return

    const mouseX = (e.clientX - rect.left) * (100 / zoom)
    const mouseY = (e.clientY - rect.top) * (100 / zoom)

    if (tool === "flow" && type === "zone") {
      if (!flowCreating) {
        setFlowCreating({ fromZoneId: id })
        setSelectedZone(item as Zone)
      } else if (flowCreating.fromZoneId !== id) {
        // Create new flow
        setNewFlow({
          ...newFlow,
          fromZoneId: flowCreating.fromZoneId,
          toZoneId: id,
        })
        setShowFlowDialog(true)
        setFlowCreating(null)
      }
      return
    }

    if (tool === "select" || tool === "move") {
      setIsDragging(true)
      setDragTarget({ type, id })
      setDragOffset({ x: mouseX - item.x, y: mouseY - item.y })
    }

    if (type === "zone") {
      setSelectedZone(item as Zone)
      setSelectedShelf(null)
      setSelectedFlow(null)
    } else {
      setSelectedShelf(item as Shelf)
      setSelectedZone(null)
      setSelectedFlow(null)
    }
  }

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !dragTarget || !canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const mouseX = (e.clientX - rect.left) * (100 / zoom)
      const mouseY = (e.clientY - rect.top) * (100 / zoom)

      const newX = snapValue(mouseX - dragOffset.x)
      const newY = snapValue(mouseY - dragOffset.y)

      if (dragTarget.type === "zone") {
        setZones((prev) =>
          prev.map((z) => (z.id === dragTarget.id ? { ...z, x: Math.max(0, newX), y: Math.max(0, newY) } : z)),
        )
      } else {
        setShelves((prev) =>
          prev.map((s) => (s.id === dragTarget.id ? { ...s, x: Math.max(0, newX), y: Math.max(0, newY) } : s)),
        )
      }
    },
    [isDragging, dragTarget, zoom, dragOffset, snapValue],
  )

  const handleMouseUp = useCallback(() => {
    if (isDragging && dragTarget) {
      saveToHistory(zones, shelves)
    }
    setIsDragging(false)
    setDragTarget(null)
    setIsResizing(false)
    setResizeHandle(null)
  }, [isDragging, dragTarget, zones, shelves, saveToHistory])

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedZone(null)
      setSelectedShelf(null)
      setSelectedFlow(null)
      if (flowCreating) {
        setFlowCreating(null)
      }
    }
  }

  const addZone = () => {
    const id = `zone-${Date.now()}`
    const zone: Zone = {
      id,
      name: newZone.name || `Zona ${zones.length + 1}`,
      type: newZone.type as Zone["type"],
      x: 100,
      y: 100,
      width: newZone.width || 200,
      height: newZone.height || 150,
      rotation: 0,
      color: newZone.color || "#3b82f6",
      capacity: newZone.capacity || 500,
      currentOccupancy: 0,
      locked: false,
      visible: true,
      activityLevel: 0,
      avgPickTime: 0,
      dailyPicks: 0,
    }
    const newZones = [...zones, zone]
    setZones(newZones)
    saveToHistory(newZones, shelves)
    setShowZoneDialog(false)
    setNewZone({ type: "storage", name: "", width: 200, height: 150, capacity: 500, color: "#3b82f6" })
  }

  const addShelf = () => {
    if (!selectedZone) return
    const id = `shelf-${Date.now()}`
    const shelf: Shelf = {
      id,
      zoneId: selectedZone.id,
      name: newShelf.name || `EST-${shelves.length + 1}`,
      x: selectedZone.x + 20,
      y: selectedZone.y + 30,
      width: newShelf.width || 80,
      height: newShelf.height || 25,
      rotation: 0,
      levels: newShelf.levels || 4,
      positionsPerLevel: newShelf.positionsPerLevel || 8,
      type: newShelf.type as Shelf["type"],
      color: newShelf.color || "#fbbf24",
      products: [],
    }
    const newShelves = [...shelves, shelf]
    setShelves(newShelves)
    saveToHistory(zones, newShelves)
    setShowShelfDialog(false)
    setNewShelf({
      type: "standard",
      name: "",
      width: 80,
      height: 25,
      levels: 4,
      positionsPerLevel: 8,
      color: "#fbbf24",
    })
  }

  const addFlow = () => {
    if (!newFlow.fromZoneId || !newFlow.toZoneId) return
    const id = `flow-${Date.now()}`
    const flow: Flow = {
      id,
      fromZoneId: newFlow.fromZoneId,
      toZoneId: newFlow.toZoneId,
      type: newFlow.type || "primary",
      label: newFlow.label || "",
      color: newFlow.color || "#22c55e",
    }
    setFlows([...flows, flow])
    setShowFlowDialog(false)
    setNewFlow({ type: "primary", label: "", color: "#22c55e" })
  }

  const deleteFlow = (flowId: string) => {
    setFlows(flows.filter((f) => f.id !== flowId))
    setSelectedFlow(null)
  }

  const deleteSelected = () => {
    if (selectedZone) {
      const newZones = zones.filter((z) => z.id !== selectedZone.id)
      const newShelves = shelves.filter((s) => s.zoneId !== selectedZone.id)
      setFlows(flows.filter((f) => f.fromZoneId !== selectedZone.id && f.toZoneId !== selectedZone.id))
      setZones(newZones)
      setShelves(newShelves)
      saveToHistory(newZones, newShelves)
      setSelectedZone(null)
    } else if (selectedShelf) {
      const newShelves = shelves.filter((s) => s.id !== selectedShelf.id)
      setShelves(newShelves)
      saveToHistory(zones, newShelves)
      setSelectedShelf(null)
    } else if (selectedFlow) {
      deleteFlow(selectedFlow.id)
    }
  }

  const duplicateSelected = () => {
    if (selectedZone) {
      const newZone: Zone = {
        ...selectedZone,
        id: `zone-${Date.now()}`,
        name: `${selectedZone.name} (copia)`,
        x: selectedZone.x + 50,
        y: selectedZone.y + 50,
        locked: false,
      }
      const newZones = [...zones, newZone]
      setZones(newZones)
      saveToHistory(newZones, shelves)
    } else if (selectedShelf) {
      const newShelfItem: Shelf = {
        ...selectedShelf,
        id: `shelf-${Date.now()}`,
        name: `${selectedShelf.name} (copia)`,
        x: selectedShelf.x + 30,
        y: selectedShelf.y + 30,
      }
      const newShelves = [...shelves, newShelfItem]
      setShelves(newShelves)
      saveToHistory(zones, newShelves)
    }
  }

  const toggleLock = () => {
    if (selectedZone) {
      const newZones = zones.map((z) => (z.id === selectedZone.id ? { ...z, locked: !z.locked } : z))
      setZones(newZones)
      setSelectedZone({ ...selectedZone, locked: !selectedZone.locked })
    }
  }

  const handlePOSChange = (posId: string) => {
    const pos = samplePointsOfSale.find((p) => p.id === posId)
    if (pos) {
      setSelectedPOS(pos)
      setZones(pos.zones)
      setShelves(pos.shelves)
      setSelectedZone(null)
      setSelectedShelf(null)
      setSelectedFlow(null)
      setFlows(pos.id === "pos-1" ? sampleFlows : [])
      setHistory([{ zones: pos.zones, shelves: pos.shelves }])
      setHistoryIndex(0)
    }
  }

  // AI Analysis function
  const analyzeWithAI = useCallback(() => {
    setIsAnalyzing(true)
    setShowAIPanel(true)

    // Simulate AI analysis
    setTimeout(() => {
      const recommendations = [
        {
          id: "rec-1",
          type: "optimization" as const,
          title: "Reorganizar zona de picking",
          description:
            "Los productos de alta rotación están ubicados lejos del área de despacho. Moverlos reduciría el tiempo de picking en un 25%.",
          impact: "high" as const,
          implemented: false,
        },
        {
          id: "rec-2",
          type: "layout" as const,
          title: "Ampliar pasillos principales",
          description:
            "Los pasillos entre estanterías A y B son muy estrechos para el tráfico actual. Ampliar 50cm mejoraría la eficiencia.",
          impact: "medium" as const,
          implemented: false,
        },
        {
          id: "rec-3",
          type: "flow" as const,
          title: "Optimizar flujo de devoluciones",
          description:
            "El flujo actual de devoluciones cruza con el de despacho. Crear una ruta alternativa reduciría conflictos.",
          impact: "high" as const,
          implemented: false,
        },
        {
          id: "rec-4",
          type: "capacity" as const,
          title: "Zona refrigerada al 82% de capacidad",
          description:
            "Considerar expansión o redistribución de productos refrigerados antes de alcanzar capacidad máxima.",
          impact: "medium" as const,
          implemented: false,
        },
        {
          id: "rec-5",
          type: "safety" as const,
          title: "Mejorar señalización de emergencia",
          description:
            "Las rutas de evacuación no están claramente marcadas en el área de congelados. Agregar señalización luminosa.",
          impact: "high" as const,
          implemented: false,
        },
        {
          id: "rec-6",
          type: "flow" as const,
          title: "Crear flujo directo recepción-refrigerados",
          description:
            "Los productos perecederos pasan por almacenamiento general. Un flujo directo mantendría mejor la cadena de frío.",
          impact: "high" as const,
          implemented: false,
        },
        {
          id: "rec-7",
          type: "optimization" as const,
          title: "Implementar sistema de slotting dinámico",
          description:
            "Basado en los patrones de picking, reorganizar las ubicaciones cada trimestre aumentaría la eficiencia un 15%.",
          impact: "medium" as const,
          implemented: false,
        },
        {
          id: "rec-8",
          type: "layout" as const,
          title: "Crear zona de cross-docking",
          description:
            "Para pedidos de alta urgencia, una zona de cross-docking entre recepción y despacho agilizaría entregas express.",
          impact: "low" as const,
          implemented: false,
        },
      ]
      setAIRecommendations(recommendations)
      setIsAnalyzing(false)
    }, 2000)
  }, [])

  // Upload and analyze floor plan
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeFloorPlan = () => {
    if (!uploadedImage) return
    setIsAnalyzing(true)

    // Simulate floor plan analysis
    setTimeout(() => {
      // Generate zones based on "detected" areas
      const detectedZones: Zone[] = [
        {
          id: `zone-detected-1`,
          name: "Área Detectada 1",
          type: "receiving",
          x: 50,
          y: 50,
          width: 180,
          height: 120,
          rotation: 0,
          color: "#22c55e",
          capacity: 400,
          currentOccupancy: 0,
          locked: false,
          visible: true,
          activityLevel: 0,
          avgPickTime: 0,
          dailyPicks: 0,
        },
        {
          id: `zone-detected-2`,
          name: "Área Detectada 2",
          type: "storage",
          x: 260,
          y: 50,
          width: 300,
          height: 180,
          rotation: 0,
          color: "#3b82f6",
          capacity: 1500,
          currentOccupancy: 0,
          locked: false,
          visible: true,
          activityLevel: 0,
          avgPickTime: 0,
          dailyPicks: 0,
        },
        {
          id: `zone-detected-3`,
          name: "Área Detectada 3",
          type: "dispatch",
          x: 590,
          y: 50,
          width: 150,
          height: 120,
          rotation: 0,
          color: "#f97316",
          capacity: 300,
          currentOccupancy: 0,
          locked: false,
          visible: true,
          activityLevel: 0,
          avgPickTime: 0,
          dailyPicks: 0,
        },
      ]

      setZones(detectedZones)
      setShelves([])
      setFlows([
        {
          id: "flow-detected-1",
          fromZoneId: "zone-detected-1",
          toZoneId: "zone-detected-2",
          type: "primary",
          label: "Almacenar",
          color: "#22c55e",
        },
        {
          id: "flow-detected-2",
          fromZoneId: "zone-detected-2",
          toZoneId: "zone-detected-3",
          type: "primary",
          label: "Despachar",
          color: "#3b82f6",
        },
      ])
      saveToHistory(detectedZones, [])

      setAIRecommendations([
        {
          id: "rec-plan-1",
          type: "layout",
          title: "Plano analizado exitosamente",
          description: "Se detectaron 3 áreas principales. Revise y ajuste los tipos de zona según su operación real.",
          impact: "high",
          implemented: false,
        },
        {
          id: "rec-plan-2",
          type: "flow",
          title: "Flujos básicos sugeridos",
          description:
            "Se crearon flujos de recepción a almacenamiento y de almacenamiento a despacho. Agregue flujos adicionales según necesite.",
          impact: "medium",
          implemented: false,
        },
        {
          id: "rec-plan-3",
          type: "optimization",
          title: "Agregar estanterías",
          description:
            "Las áreas detectadas no tienen estanterías. Use la herramienta de estanterías para definir la distribución interna.",
          impact: "medium",
          implemented: false,
        },
      ])

      setIsAnalyzing(false)
      setShowUploadDialog(false)
      setShowAIPanel(true)
    }, 3000)
  }

  const getFlowPath = useCallback(
    (flow: Flow) => {
      const fromZone = zones.find((z) => z.id === flow.fromZoneId)
      const toZone = zones.find((z) => z.id === flow.toZoneId)
      if (!fromZone || !toZone) return null

      const fromCenterX = fromZone.x + fromZone.width / 2
      const fromCenterY = fromZone.y + fromZone.height / 2
      const toCenterX = toZone.x + toZone.width / 2
      const toCenterY = toZone.y + toZone.height / 2

      // Calculate edge points
      const angle = Math.atan2(toCenterY - fromCenterY, toCenterX - fromCenterX)
      const fromX = fromCenterX + (Math.cos(angle) * fromZone.width) / 2
      const fromY = fromCenterY + (Math.sin(angle) * fromZone.height) / 2
      const toX = toCenterX - (Math.cos(angle) * toZone.width) / 2
      const toY = toCenterY - (Math.sin(angle) * toZone.height) / 2

      // Calculate control points for curved line
      const midX = (fromX + toX) / 2
      const midY = (fromY + toY) / 2
      const perpX = -(toY - fromY) * 0.2
      const perpY = (toX - fromX) * 0.2

      return {
        fromX,
        fromY,
        toX,
        toY,
        midX: midX + perpX,
        midY: midY + perpY,
        labelX: midX + perpX * 0.5,
        labelY: midY + perpY * 0.5,
      }
    },
    [zones],
  )

  const getViewModeStyles = (zone: Zone) => {
    switch (viewMode) {
      case "heatmap":
        const heatLevel = zone.activityLevel / 100
        return {
          backgroundColor: `rgba(${Math.round(255 * heatLevel)}, ${Math.round(100 * (1 - heatLevel))}, 50, 0.7)`,
          borderColor: `rgba(${Math.round(255 * heatLevel)}, ${Math.round(100 * (1 - heatLevel))}, 50, 1)`,
        }
      case "occupancy":
        const occupancy = zone.currentOccupancy / zone.capacity
        const occColor =
          occupancy > 0.9 ? "#ef4444" : occupancy > 0.7 ? "#f97316" : occupancy > 0.5 ? "#eab308" : "#22c55e"
        return {
          backgroundColor: `${occColor}40`,
          borderColor: occColor,
        }
      case "temperature":
        if (zone.temperature) {
          const temp = zone.temperature.current
          const tempColor = temp < 0 ? "#3b82f6" : temp < 8 ? "#06b6d4" : "#f97316"
          return {
            backgroundColor: `${tempColor}40`,
            borderColor: tempColor,
          }
        }
        return { backgroundColor: `${zone.color}20`, borderColor: zone.color }
      case "flows":
        return {
          backgroundColor: `${zone.color}30`,
          borderColor: zone.color,
          borderWidth: "3px",
        }
      default:
        return {
          backgroundColor: `${zone.color}20`,
          borderColor: zone.color,
        }
    }
  }

  const ZoneIcon = ({ type }: { type: Zone["type"] }) => {
    return zoneIcons[type] || <Box className="h-4 w-4" />
  }

  // Stats
  const stats = useMemo(() => {
    const totalCapacity = zones.reduce((sum, z) => sum + z.capacity, 0)
    const totalOccupancy = zones.reduce((sum, z) => sum + z.currentOccupancy, 0)
    const avgActivityLevel = zones.length > 0 ? zones.reduce((sum, z) => sum + z.activityLevel, 0) / zones.length : 0
    return {
      totalCapacity,
      totalOccupancy,
      occupancyRate: totalCapacity > 0 ? ((totalOccupancy / totalCapacity) * 100).toFixed(1) : "0.0",
      avgActivityLevel: avgActivityLevel.toFixed(1),
      zonesCount: zones.length,
      shelvesCount: shelves.length,
      flowsCount: flows.length,
    }
  }, [zones, shelves, flows])

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-bold">Almacén Visual</h1>
            <p className="text-sm text-muted-foreground">Editor de layout y flujos</p>
          </div>
          <Select value={selectedPOS.id} onValueChange={handlePOSChange}>
            <SelectTrigger className="w-[220px]">
              <SelectValue>
                <div className="flex items-center gap-2 truncate">
                  {selectedPOS.type === "warehouse" ? (
                    <Warehouse className="h-4 w-4 shrink-0" />
                  ) : (
                    <Store className="h-4 w-4 shrink-0" />
                  )}
                  <span className="truncate">{selectedPOS.name}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {samplePointsOfSale.map((pos) => (
                <SelectItem key={pos.id} value={pos.id}>
                  <div className="flex items-center gap-2">
                    {pos.type === "warehouse" ? (
                      <Warehouse className="h-4 w-4 shrink-0" />
                    ) : (
                      <Store className="h-4 w-4 shrink-0" />
                    )}
                    <span className="truncate max-w-[180px]">{pos.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {/* Stats badges */}
          <div className="hidden md:flex items-center gap-2 mr-4">
            <Badge variant="outline" className="gap-1">
              <Box className="h-3 w-3" />
              {stats.zonesCount} zonas
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Layers className="h-3 w-3" />
              {stats.shelvesCount} estantes
            </Badge>
            <Badge variant="outline" className="gap-1">
              <GitBranch className="h-3 w-3" />
              {stats.flowsCount} flujos
            </Badge>
            <Badge variant={Number(stats.occupancyRate) > 80 ? "destructive" : "secondary"} className="gap-1">
              {stats.occupancyRate}% ocupación
            </Badge>
          </div>

          <Button variant="outline" size="sm" onClick={() => setShowUploadDialog(true)}>
            <FileImage className="h-4 w-4 mr-2" />
            Subir Plano
          </Button>
          <Button variant="outline" size="sm" onClick={analyzeWithAI} disabled={isAnalyzing}>
            <Sparkles className="h-4 w-4 mr-2" />
            {isAnalyzing ? "Analizando..." : "Analizar con AI"}
          </Button>
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className={isEditing ? "bg-primary" : ""}
          >
            {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
            {isEditing ? "Guardar" : "Editar"}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        {isEditing && (
          <div className="w-12 border-r bg-muted/30 flex flex-col items-center py-2 gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={tool === "select" ? "default" : "ghost"}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setTool("select")}
                  >
                    <MousePointer2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Seleccionar</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={tool === "pan" ? "default" : "ghost"}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setTool("pan")}
                  >
                    <Hand className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Mover vista</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={tool === "move" ? "default" : "ghost"}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setTool("move")}
                  >
                    <Move className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Mover elemento</TooltipContent>
              </Tooltip>

              <div className="h-px w-8 bg-border my-1" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setShowZoneDialog(true)}>
                    <Square className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Nueva zona</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => selectedZone && setShowShelfDialog(true)}
                    disabled={!selectedZone}
                  >
                    <RectangleHorizontal className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Nueva estantería</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={tool === "flow" ? "default" : "ghost"}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => {
                      setTool("flow")
                      setFlowCreating(null)
                    }}
                  >
                    <GitBranch className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {flowCreating ? "Seleccione zona destino" : "Crear flujo (clic en zona origen, luego destino)"}
                </TooltipContent>
              </Tooltip>

              <div className="h-px w-8 bg-border my-1" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={undo} disabled={historyIndex === 0}>
                    <Undo2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Deshacer</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={redo}
                    disabled={historyIndex === history.length - 1}
                  >
                    <Redo2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Rehacer</TooltipContent>
              </Tooltip>

              <div className="h-px w-8 bg-border my-1" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={duplicateSelected}
                    disabled={!selectedZone && !selectedShelf}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Duplicar</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-destructive"
                    onClick={deleteSelected}
                    disabled={!selectedZone && !selectedShelf && !selectedFlow}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Eliminar</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Canvas toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/20">
            <div className="flex items-center gap-2">
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as typeof viewMode)}>
                <TabsList className="h-8">
                  <TabsTrigger value="2d" className="text-xs px-2 h-6">
                    2D
                  </TabsTrigger>
                  <TabsTrigger value="flows" className="text-xs px-2 h-6">
                    Flujos
                  </TabsTrigger>
                  <TabsTrigger value="heatmap" className="text-xs px-2 h-6">
                    Actividad
                  </TabsTrigger>
                  <TabsTrigger value="occupancy" className="text-xs px-2 h-6">
                    Ocupación
                  </TabsTrigger>
                  <TabsTrigger value="temperature" className="text-xs px-2 h-6">
                    Temp
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="h-6 w-px bg-border mx-2" />

              <div className="flex items-center gap-1.5">
                <Switch checked={showGrid} onCheckedChange={setShowGrid} className="scale-75" />
                <span className="text-xs text-muted-foreground">Grid</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Switch checked={showLabels} onCheckedChange={setShowLabels} className="scale-75" />
                <span className="text-xs text-muted-foreground">Labels</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Switch checked={showFlows} onCheckedChange={setShowFlows} className="scale-75" />
                <span className="text-xs text-muted-foreground">Flujos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Switch checked={snapToGrid} onCheckedChange={setSnapToGrid} className="scale-75" />
                <span className="text-xs text-muted-foreground">Snap</span>
              </div>
              <Select value={String(gridSize)} onValueChange={(v) => setGridSize(Number(v))}>
                <SelectTrigger className="w-[70px] h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10px</SelectItem>
                  <SelectItem value="20">20px</SelectItem>
                  <SelectItem value="40">40px</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 bg-transparent"
                onClick={() => setZoom(Math.max(25, zoom - 25))}
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </Button>
              <span className="text-xs w-12 text-center">{zoom}%</span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 bg-transparent"
                onClick={() => setZoom(Math.min(200, zoom + 25))}
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent" onClick={() => setZoom(100)}>
                <Maximize2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div
            ref={canvasRef}
            className="flex-1 relative overflow-auto"
            style={{
              backgroundImage: showGrid
                ? `linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)`
                : "none",
              backgroundSize: `${gridSize * (zoom / 100)}px ${gridSize * (zoom / 100)}px`,
              cursor:
                tool === "pan"
                  ? "grab"
                  : tool === "flow"
                    ? flowCreating
                      ? "crosshair"
                      : "pointer"
                    : isDragging
                      ? "grabbing"
                      : "default",
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleCanvasClick}
          >
            {flowCreating && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50">
                <Badge className="bg-primary text-primary-foreground gap-2">
                  <GitBranch className="h-3 w-3" />
                  Seleccione la zona de destino
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-primary-foreground/20"
                    onClick={() => setFlowCreating(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              </div>
            )}

            <div
              className="relative"
              style={{
                width: 1000 * (zoom / 100),
                height: 600 * (zoom / 100),
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top left",
              }}
            >
              {showFlows && (
                <svg className="absolute inset-0 pointer-events-none" style={{ width: 1000, height: 600, zIndex: 5 }}>
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                    </marker>
                    {flows.map((flow) => (
                      <marker
                        key={`marker-${flow.id}`}
                        id={`arrowhead-${flow.id}`}
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill={flow.color} />
                      </marker>
                    ))}
                  </defs>
                  {flows.map((flow) => {
                    const path = getFlowPath(flow)
                    if (!path) return null
                    const isSelected = selectedFlow?.id === flow.id
                    return (
                      <g
                        key={flow.id}
                        className="cursor-pointer pointer-events-auto"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedFlow(flow)
                          setSelectedZone(null)
                          setSelectedShelf(null)
                        }}
                      >
                        {/* Shadow/hitbox for easier clicking */}
                        <path
                          d={`M ${path.fromX} ${path.fromY} Q ${path.midX} ${path.midY} ${path.toX} ${path.toY}`}
                          stroke="transparent"
                          strokeWidth="20"
                          fill="none"
                        />
                        {/* Main path */}
                        <path
                          d={`M ${path.fromX} ${path.fromY} Q ${path.midX} ${path.midY} ${path.toX} ${path.toY}`}
                          stroke={flow.color}
                          strokeWidth={isSelected ? 4 : flow.type === "primary" ? 3 : 2}
                          strokeDasharray={
                            flow.type === "emergency" ? "8,4" : flow.type === "secondary" ? "4,4" : "none"
                          }
                          fill="none"
                          markerEnd={`url(#arrowhead-${flow.id})`}
                          className={cn("transition-all", isSelected && "filter drop-shadow-lg")}
                        />
                        {/* Label */}
                        {flow.label && (
                          <g transform={`translate(${path.labelX}, ${path.labelY})`}>
                            <rect
                              x="-30"
                              y="-10"
                              width="60"
                              height="20"
                              rx="4"
                              fill="hsl(var(--background))"
                              stroke={flow.color}
                              strokeWidth="1"
                            />
                            <text
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontSize="10"
                              fill="hsl(var(--foreground))"
                              className="font-medium"
                            >
                              {flow.label}
                            </text>
                          </g>
                        )}
                      </g>
                    )
                  })}
                </svg>
              )}

              {/* Zones */}
              {zones
                .filter((z) => z.visible)
                .map((zone) => {
                  const { backgroundColor, borderColor } = getViewModeStyles(zone)
                  const isSelected = selectedZone?.id === zone.id
                  const isFlowSource = flowCreating?.fromZoneId === zone.id

                  return (
                    <div
                      key={zone.id}
                      className={cn(
                        "absolute border-2 rounded-lg transition-shadow",
                        isSelected && "ring-2 ring-primary ring-offset-2",
                        isFlowSource && "ring-2 ring-green-500 ring-offset-2",
                        zone.locked ? "opacity-60" : "",
                        isEditing && !zone.locked ? "cursor-move" : "cursor-pointer",
                        tool === "flow" && "hover:ring-2 hover:ring-primary/50",
                      )}
                      style={{
                        left: zone.x,
                        top: zone.y,
                        width: zone.width,
                        height: zone.height,
                        borderColor,
                        backgroundColor,
                        transform: `rotate(${zone.rotation}deg)`,
                        zIndex: isSelected ? 10 : 1,
                      }}
                      onMouseDown={(e) => handleMouseDown(e, "zone", zone.id)}
                    >
                      {/* Zone content */}
                      {showLabels && (
                        <div className="absolute top-1 left-1 flex items-center gap-1 bg-background/90 rounded px-1.5 py-0.5">
                          <ZoneIcon type={zone.type} />
                          <span className="text-[10px] font-medium truncate max-w-[100px]">{zone.name}</span>
                        </div>
                      )}

                      {/* Temperature indicator */}
                      {zone.temperature && viewMode === "temperature" && (
                        <div className="absolute bottom-1 left-1 flex items-center gap-1 bg-background/90 rounded px-1.5 py-0.5">
                          <Thermometer className="h-3 w-3" />
                          <span className="text-[10px] font-medium">{zone.temperature.current}°C</span>
                        </div>
                      )}

                      {/* Occupancy indicator */}
                      {viewMode === "occupancy" && (
                        <div className="absolute bottom-1 right-1 bg-background/90 rounded px-1.5 py-0.5">
                          <span className="text-[10px] font-medium">
                            {Math.round((zone.currentOccupancy / zone.capacity) * 100)}%
                          </span>
                        </div>
                      )}

                      {/* Lock indicator */}
                      {zone.locked && (
                        <div className="absolute top-1 right-1">
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        </div>
                      )}

                      {/* Resize handles when selected and editing */}
                      {isSelected && isEditing && !zone.locked && (
                        <>
                          <div className="absolute -right-1.5 -bottom-1.5 w-3 h-3 bg-primary rounded-sm cursor-se-resize" />
                          <div className="absolute -left-1.5 -bottom-1.5 w-3 h-3 bg-primary rounded-sm cursor-sw-resize" />
                          <div className="absolute -right-1.5 -top-1.5 w-3 h-3 bg-primary rounded-sm cursor-ne-resize" />
                          <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-primary rounded-sm cursor-nw-resize" />
                        </>
                      )}
                    </div>
                  )
                })}

              {/* Shelves */}
              {shelves.map((shelf) => {
                const isSelected = selectedShelf?.id === shelf.id
                return (
                  <div
                    key={shelf.id}
                    className={cn(
                      "absolute border rounded transition-shadow",
                      isSelected && "ring-2 ring-primary ring-offset-1",
                      isEditing ? "cursor-move" : "cursor-pointer",
                    )}
                    style={{
                      left: shelf.x,
                      top: shelf.y,
                      width: shelf.width,
                      height: shelf.height,
                      backgroundColor: `${shelf.color}40`,
                      borderColor: shelf.color,
                      transform: `rotate(${shelf.rotation}deg)`,
                      zIndex: isSelected ? 10 : 2,
                    }}
                    onMouseDown={(e) => handleMouseDown(e, "shelf", shelf.id)}
                    onDoubleClick={() => {
                      setSelectedShelf(shelf)
                      setShowShelfDetails(true)
                    }}
                  >
                    {showLabels && (
                      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <span
                          className="text-[8px] font-medium text-center px-0.5 truncate"
                          style={{ color: shelf.color }}
                        >
                          {shelf.name}
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Panel - Properties / AI Recommendations */}
        <div className="w-72 border-l bg-muted/20 flex flex-col overflow-hidden">
          <Tabs defaultValue="properties" className="flex flex-col h-full">
            <TabsList className="mx-2 mt-2">
              <TabsTrigger value="properties" className="flex-1 text-xs">
                Propiedades
              </TabsTrigger>
              <TabsTrigger value="flows" className="flex-1 text-xs">
                Flujos
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex-1 text-xs">
                AI
                {aiRecommendations.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">
                    {aiRecommendations.filter((r) => !r.implemented).length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              {/* Properties Tab */}
              <div className="p-3 space-y-3" data-tab="properties">
                {selectedZone ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center"
                        style={{ backgroundColor: selectedZone.color }}
                      >
                        <ZoneIcon type={selectedZone.type} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{selectedZone.name}</p>
                        <p className="text-xs text-muted-foreground">{zoneTypeLabels[selectedZone.type]}</p>
                      </div>
                    </div>

                    {isEditing && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-xs">Nombre</Label>
                          <Input
                            value={selectedZone.name}
                            onChange={(e) => {
                              const newZones = zones.map((z) =>
                                z.id === selectedZone.id ? { ...z, name: e.target.value } : z,
                              )
                              setZones(newZones)
                              setSelectedZone({ ...selectedZone, name: e.target.value })
                            }}
                            className="h-8 text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label className="text-xs">X</Label>
                            <Input
                              type="number"
                              value={selectedZone.x}
                              onChange={(e) => {
                                const newX = Number(e.target.value)
                                const newZones = zones.map((z) => (z.id === selectedZone.id ? { ...z, x: newX } : z))
                                setZones(newZones)
                                setSelectedZone({ ...selectedZone, x: newX })
                              }}
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Y</Label>
                            <Input
                              type="number"
                              value={selectedZone.y}
                              onChange={(e) => {
                                const newY = Number(e.target.value)
                                const newZones = zones.map((z) => (z.id === selectedZone.id ? { ...z, y: newY } : z))
                                setZones(newZones)
                                setSelectedZone({ ...selectedZone, y: newY })
                              }}
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label className="text-xs">Ancho</Label>
                            <Input
                              type="number"
                              value={selectedZone.width}
                              onChange={(e) => {
                                const newWidth = Number(e.target.value)
                                const newZones = zones.map((z) =>
                                  z.id === selectedZone.id ? { ...z, width: newWidth } : z,
                                )
                                setZones(newZones)
                                setSelectedZone({ ...selectedZone, width: newWidth })
                              }}
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Alto</Label>
                            <Input
                              type="number"
                              value={selectedZone.height}
                              onChange={(e) => {
                                const newHeight = Number(e.target.value)
                                const newZones = zones.map((z) =>
                                  z.id === selectedZone.id ? { ...z, height: newHeight } : z,
                                )
                                setZones(newZones)
                                setSelectedZone({ ...selectedZone, height: newHeight })
                              }}
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs">Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={selectedZone.color}
                              onChange={(e) => {
                                const newColor = e.target.value
                                const newZones = zones.map((z) =>
                                  z.id === selectedZone.id ? { ...z, color: newColor } : z,
                                )
                                setZones(newZones)
                                setSelectedZone({ ...selectedZone, color: newColor })
                              }}
                              className="h-8 w-12 p-1 cursor-pointer"
                            />
                            <Input value={selectedZone.color} className="h-8 text-sm flex-1" readOnly />
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={toggleLock}>
                            {selectedZone.locked ? (
                              <Unlock className="h-3.5 w-3.5 mr-1" />
                            ) : (
                              <Lock className="h-3.5 w-3.5 mr-1" />
                            )}
                            {selectedZone.locked ? "Desbloquear" : "Bloquear"}
                          </Button>
                        </div>
                      </>
                    )}

                    <div className="pt-2 border-t space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Capacidad</span>
                        <span>{selectedZone.capacity} unidades</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Ocupación</span>
                        <span>
                          {selectedZone.currentOccupancy} (
                          {((selectedZone.currentOccupancy / selectedZone.capacity) * 100).toFixed(0)}%)
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Actividad</span>
                        <span>{selectedZone.activityLevel}%</span>
                      </div>
                      {selectedZone.temperature && (
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Temperatura</span>
                          <span>{selectedZone.temperature.current}°C</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : selectedShelf ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center"
                        style={{ backgroundColor: selectedShelf.color }}
                      >
                        <Layers className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{selectedShelf.name}</p>
                        <p className="text-xs text-muted-foreground">{shelfTypeLabels[selectedShelf.type]}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Niveles</span>
                        <span>{selectedShelf.levels}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Posiciones/nivel</span>
                        <span>{selectedShelf.positionsPerLevel}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Total posiciones</span>
                        <span>{selectedShelf.levels * selectedShelf.positionsPerLevel}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Productos</span>
                        <span>{selectedShelf.products.length}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setShowShelfDetails(true)}
                    >
                      Ver detalle
                    </Button>
                  </div>
                ) : selectedFlow ? (
                  /* Added flow properties panel */
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center"
                        style={{ backgroundColor: selectedFlow.color }}
                      >
                        <GitBranch className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{selectedFlow.label || "Flujo"}</p>
                        <p className="text-xs text-muted-foreground capitalize">{selectedFlow.type}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Origen</span>
                        <span>{zones.find((z) => z.id === selectedFlow.fromZoneId)?.name}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Destino</span>
                        <span>{zones.find((z) => z.id === selectedFlow.toZoneId)?.name}</span>
                      </div>
                    </div>

                    {isEditing && (
                      <>
                        <div className="space-y-1">
                          <Label className="text-xs">Etiqueta</Label>
                          <Input
                            value={selectedFlow.label || ""}
                            onChange={(e) => {
                              const newFlows = flows.map((f) =>
                                f.id === selectedFlow.id ? { ...f, label: e.target.value } : f,
                              )
                              setFlows(newFlows)
                              setSelectedFlow({ ...selectedFlow, label: e.target.value })
                            }}
                            className="h-8 text-sm"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs">Tipo</Label>
                          <Select
                            value={selectedFlow.type}
                            onValueChange={(v) => {
                              const newType = v as Flow["type"]
                              const newFlows = flows.map((f) =>
                                f.id === selectedFlow.id ? { ...f, type: newType } : f,
                              )
                              setFlows(newFlows)
                              setSelectedFlow({ ...selectedFlow, type: newType })
                            }}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="primary">Principal</SelectItem>
                              <SelectItem value="secondary">Secundario</SelectItem>
                              <SelectItem value="emergency">Emergencia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs">Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={selectedFlow.color}
                              onChange={(e) => {
                                const newColor = e.target.value
                                const newFlows = flows.map((f) =>
                                  f.id === selectedFlow.id ? { ...f, color: newColor } : f,
                                )
                                setFlows(newFlows)
                                setSelectedFlow({ ...selectedFlow, color: newColor })
                              }}
                              className="h-8 w-12 p-1 cursor-pointer"
                            />
                            <Input value={selectedFlow.color} className="h-8 text-sm flex-1" readOnly />
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="destructive"
                          className="w-full"
                          onClick={() => deleteFlow(selectedFlow.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          Eliminar flujo
                        </Button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground text-sm py-8">
                    <MousePointer2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Selecciona una zona, estantería o flujo para ver sus propiedades</p>
                  </div>
                )}
              </div>

              <div className="p-3 space-y-3 hidden" data-tab="flows">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">Flujos de trabajo</h3>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setTool("flow")
                        setFlowCreating(null)
                      }}
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Nuevo
                    </Button>
                  )}
                </div>

                {flows.length === 0 ? (
                  <div className="text-center text-muted-foreground text-sm py-8">
                    <Workflow className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No hay flujos definidos</p>
                    <p className="text-xs mt-1">Use la herramienta de flujos para conectar zonas</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {flows.map((flow) => {
                      const fromZone = zones.find((z) => z.id === flow.fromZoneId)
                      const toZone = zones.find((z) => z.id === flow.toZoneId)
                      return (
                        <div
                          key={flow.id}
                          className={cn(
                            "p-2 rounded border cursor-pointer hover:bg-muted/50",
                            selectedFlow?.id === flow.id && "ring-2 ring-primary",
                          )}
                          onClick={() => {
                            setSelectedFlow(flow)
                            setSelectedZone(null)
                            setSelectedShelf(null)
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded flex items-center justify-center"
                              style={{ backgroundColor: flow.color }}
                            >
                              <ArrowRight className="h-3 w-3 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">
                                {flow.label || `${fromZone?.name} → ${toZone?.name}`}
                              </p>
                              <p className="text-[10px] text-muted-foreground truncate">
                                {fromZone?.name} → {toZone?.name}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-[10px] capitalize">
                              {flow.type}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* AI Tab */}
              <div className="p-3 space-y-3" data-tab="ai">
                {aiRecommendations.length === 0 ? (
                  <div className="text-center text-muted-foreground text-sm py-8">
                    <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Sin recomendaciones</p>
                    <p className="text-xs mt-1">Haz clic en "Analizar con AI" para obtener sugerencias</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {aiRecommendations.map((rec) => (
                      <Card
                        key={rec.id}
                        className={cn("p-2 cursor-pointer transition-opacity", rec.implemented && "opacity-50")}
                      >
                        <div className="flex items-start gap-2">
                          <div
                            className={cn(
                              "w-6 h-6 rounded flex items-center justify-center shrink-0",
                              rec.type === "optimization" && "bg-blue-500/20 text-blue-500",
                              rec.type === "layout" && "bg-purple-500/20 text-purple-500",
                              rec.type === "flow" && "bg-green-500/20 text-green-500",
                              rec.type === "capacity" && "bg-yellow-500/20 text-yellow-500",
                              rec.type === "safety" && "bg-red-500/20 text-red-500",
                            )}
                          >
                            {rec.type === "optimization" && <TrendingUp className="h-3 w-3" />}
                            {rec.type === "layout" && <Grid3X3 className="h-3 w-3" />}
                            {rec.type === "flow" && <GitBranch className="h-3 w-3" />}
                            {rec.type === "capacity" && <Package className="h-3 w-3" />}
                            {rec.type === "safety" && <AlertTriangle className="h-3 w-3" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                              <p className="text-xs font-medium truncate">{rec.title}</p>
                              <Badge
                                variant={
                                  rec.impact === "high"
                                    ? "destructive"
                                    : rec.impact === "medium"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-[8px] px-1 h-4 shrink-0"
                              >
                                {rec.impact}
                              </Badge>
                            </div>
                            <p className="text-[10px] text-muted-foreground line-clamp-2">{rec.description}</p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-5 w-5 shrink-0"
                            onClick={() => {
                              setAIRecommendations(
                                aiRecommendations.map((r) =>
                                  r.id === rec.id ? { ...r, implemented: !r.implemented } : r,
                                ),
                              )
                            }}
                          >
                            {rec.implemented ? (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            ) : (
                              <div className="h-3 w-3 border rounded" />
                            )}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </div>

      {/* Dialog: New Zone */}
      <Dialog open={showZoneDialog} onOpenChange={setShowZoneDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nueva Zona</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                value={newZone.name || ""}
                onChange={(e) => setNewZone({ ...newZone, name: e.target.value })}
                placeholder="Ej: Zona de Picking"
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select value={newZone.type} onValueChange={(v) => setNewZone({ ...newZone, type: v as Zone["type"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(zoneTypeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        {zoneIcons[key as Zone["type"]]}
                        <span>{label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ancho (px)</Label>
                <Input
                  type="number"
                  value={newZone.width}
                  onChange={(e) => setNewZone({ ...newZone, width: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Alto (px)</Label>
                <Input
                  type="number"
                  value={newZone.height}
                  onChange={(e) => setNewZone({ ...newZone, height: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Capacidad</Label>
              <Input
                type="number"
                value={newZone.capacity}
                onChange={(e) => setNewZone({ ...newZone, capacity: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={newZone.color}
                  onChange={(e) => setNewZone({ ...newZone, color: e.target.value })}
                  className="w-12 h-10 p-1 cursor-pointer"
                />
                <Input value={newZone.color} className="flex-1" readOnly />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowZoneDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={addZone}>Crear Zona</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: New Shelf */}
      <Dialog open={showShelfDialog} onOpenChange={setShowShelfDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nueva Estantería</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                value={newShelf.name || ""}
                onChange={(e) => setNewShelf({ ...newShelf, name: e.target.value })}
                placeholder="Ej: EST-A1"
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select
                value={newShelf.type}
                onValueChange={(v) => setNewShelf({ ...newShelf, type: v as Shelf["type"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(shelfTypeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Niveles</Label>
                <Input
                  type="number"
                  value={newShelf.levels}
                  onChange={(e) => setNewShelf({ ...newShelf, levels: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Posiciones/Nivel</Label>
                <Input
                  type="number"
                  value={newShelf.positionsPerLevel}
                  onChange={(e) => setNewShelf({ ...newShelf, positionsPerLevel: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={newShelf.color}
                  onChange={(e) => setNewShelf({ ...newShelf, color: e.target.value })}
                  className="w-12 h-10 p-1 cursor-pointer"
                />
                <Input value={newShelf.color} className="flex-1" readOnly />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShelfDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={addShelf}>Crear Estantería</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showFlowDialog} onOpenChange={setShowFlowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nuevo Flujo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Box className="h-4 w-4" />
                  <span className="font-medium">
                    {zones.find((z) => z.id === newFlow.fromZoneId)?.name || "Origen"}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1">
                  <Box className="h-4 w-4" />
                  <span className="font-medium">{zones.find((z) => z.id === newFlow.toZoneId)?.name || "Destino"}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Etiqueta</Label>
              <Input
                value={newFlow.label || ""}
                onChange={(e) => setNewFlow({ ...newFlow, label: e.target.value })}
                placeholder="Ej: Almacenar, Despachar..."
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo de flujo</Label>
              <Select value={newFlow.type} onValueChange={(v) => setNewFlow({ ...newFlow, type: v as Flow["type"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Principal (línea sólida)</SelectItem>
                  <SelectItem value="secondary">Secundario (línea punteada)</SelectItem>
                  <SelectItem value="emergency">Emergencia (línea discontinua)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={newFlow.color}
                  onChange={(e) => setNewFlow({ ...newFlow, color: e.target.value })}
                  className="w-12 h-10 p-1 cursor-pointer"
                />
                <Input value={newFlow.color} className="flex-1" readOnly />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFlowDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={addFlow}>Crear Flujo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Shelf Details */}
      <Dialog open={showShelfDetails} onOpenChange={setShowShelfDetails}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalle de Estantería: {selectedShelf?.name}</DialogTitle>
          </DialogHeader>
          {selectedShelf && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Tipo</p>
                  <p className="font-medium">{shelfTypeLabels[selectedShelf.type]}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Niveles</p>
                  <p className="font-medium">{selectedShelf.levels}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Posiciones</p>
                  <p className="font-medium">{selectedShelf.levels * selectedShelf.positionsPerLevel}</p>
                </div>
              </div>

              {/* Visual representation of shelf levels */}
              <div className="border rounded-lg p-4 bg-muted/30">
                <p className="text-sm font-medium mb-3">Vista de niveles</p>
                <div className="space-y-1">
                  {Array.from({ length: selectedShelf.levels }, (_, levelIdx) => {
                    const level = selectedShelf.levels - levelIdx
                    const productsOnLevel = selectedShelf.products.filter((p) => p.level === level)
                    return (
                      <div key={level} className="flex items-center gap-2">
                        <span className="text-xs w-8 text-muted-foreground">N{level}</span>
                        <div className="flex-1 flex gap-0.5">
                          {Array.from({ length: selectedShelf.positionsPerLevel }, (_, posIdx) => {
                            const product = productsOnLevel.find((p) => p.position === posIdx + 1)
                            return (
                              <div
                                key={posIdx}
                                className={cn(
                                  "h-6 flex-1 rounded-sm border",
                                  product ? "bg-primary/20 border-primary" : "bg-background border-border",
                                )}
                                title={product ? `${product.name} (${product.qty})` : `Vacío`}
                              />
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {selectedShelf.products.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Productos almacenados</p>
                  <div className="space-y-1">
                    {selectedShelf.products.map((product, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm p-2 bg-muted/30 rounded">
                        <div>
                          <span className="font-medium">{product.name}</span>
                          <span className="text-muted-foreground ml-2">({product.sku})</span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">{product.qty} uds</span>
                          <span className="text-muted-foreground ml-2">
                            N{product.level}-P{product.position}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShelfDetails(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Upload Floor Plan */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Subir Plano del Almacén</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Sube una imagen o plano de tu almacén. La AI analizará las áreas y generará zonas automáticamente.
            </p>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              {uploadedImage ? (
                <div className="space-y-4">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Plano subido"
                    className="max-h-48 mx-auto rounded border"
                  />
                  <Button variant="outline" size="sm" onClick={() => setUploadedImage(null)}>
                    <X className="h-4 w-4 mr-2" />
                    Quitar imagen
                  </Button>
                </div>
              ) : (
                <div>
                  <FileImage className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Arrastra una imagen aquí o haz clic para seleccionar
                  </p>
                  <Input type="file" accept="image/*" onChange={handleImageUpload} className="max-w-xs mx-auto" />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={analyzeFloorPlan} disabled={!uploadedImage || isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  Analizando...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Analizar con AI
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
