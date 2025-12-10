"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const insights = [
  {
    id: 1,
    type: "positive",
    icon: TrendingUp,
    message: "Las ventas aumentaron 12% esta semana. El producto 'Laptop Pro X' lidera con 45 unidades.",
    action: "Ver detalles",
  },
  {
    id: 2,
    type: "warning",
    icon: AlertTriangle,
    message: "5 productos están por debajo del stock mínimo. Se recomienda generar órdenes de compra.",
    action: "Revisar inventario",
  },
  {
    id: 3,
    type: "insight",
    icon: Lightbulb,
    message:
      "Oportunidad detectada: 'Constructora ABC' tiene patrón de compra mensual. Considera ofrecer plan Enterprise.",
    action: "Ver cliente",
  },
  {
    id: 4,
    type: "negative",
    icon: TrendingDown,
    message: "La tasa de conversión bajó 3% vs mes anterior. Revisa el embudo de ventas.",
    action: "Analizar",
  },
]

export function AIInsightsBar() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const currentInsight = insights[currentIndex]

  const nextInsight = () => {
    setCurrentIndex((prev) => (prev + 1) % insights.length)
  }

  const prevInsight = () => {
    setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length)
  }

  return (
    <div
      className={cn(
        "bg-gradient-to-r from-primary/5 via-primary/10 to-blue-500/5 border-b border-primary/20 px-4 py-2",
      )}
    >
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-primary" />
            </div>
            <Badge variant="outline" className="text-[10px] bg-primary/10 border-primary/30 text-primary">
              NEXUS AI
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={prevInsight}>
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1}/{insights.length}
            </span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={nextInsight}>
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-1 mx-4">
          <currentInsight.icon
            className={cn(
              "h-4 w-4 shrink-0",
              currentInsight.type === "positive" && "text-green-400",
              currentInsight.type === "warning" && "text-yellow-400",
              currentInsight.type === "negative" && "text-red-400",
              currentInsight.type === "insight" && "text-primary",
            )}
          />
          <p className="text-sm text-foreground truncate">{currentInsight.message}</p>
          <Button variant="link" size="sm" className="text-primary text-xs shrink-0 h-auto p-0">
            {currentInsight.action} →
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
