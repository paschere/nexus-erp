"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Database, Layers, RefreshCw, Sparkles } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
} from "recharts"

const salesData = [
  { month: "Ene", ventas: 120, meta: 100 },
  { month: "Feb", ventas: 135, meta: 110 },
  { month: "Mar", ventas: 148, meta: 120 },
  { month: "Abr", ventas: 142, meta: 130 },
  { month: "May", ventas: 165, meta: 140 },
  { month: "Jun", ventas: 178, meta: 150 },
]

const categoryData = [
  { name: "Electrónica", value: 35, color: "#14b8a6" },
  { name: "Ropa", value: 25, color: "#3b82f6" },
  { name: "Alimentos", value: 20, color: "#f59e0b" },
  { name: "Hogar", value: 15, color: "#8b5cf6" },
  { name: "Otros", value: 5, color: "#6b7280" },
]

const cubes = [
  {
    id: 1,
    name: "Cubo de Ventas",
    dimensions: ["Tiempo", "Producto", "Cliente", "Región"],
    measures: 12,
    lastUpdate: "Hace 2h",
  },
  {
    id: 2,
    name: "Cubo de Inventario",
    dimensions: ["Producto", "Almacén", "Tiempo"],
    measures: 8,
    lastUpdate: "Hace 1h",
  },
  {
    id: 3,
    name: "Cubo Financiero",
    dimensions: ["Cuenta", "Centro Costo", "Tiempo"],
    measures: 15,
    lastUpdate: "Hace 30m",
  },
]

export function BusinessIntelligenceModule() {
  const [activeTab, setActiveTab] = useState("dashboards")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Business Intelligence</h1>
          <p className="text-muted-foreground">Análisis dimensional y cubos OLAP</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar Cubos
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Sparkles className="h-4 w-4 mr-2" />
            Análisis AI
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cubos Activos</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="p-3 bg-teal-500/20 rounded-lg">
                <Database className="h-6 w-6 text-teal-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dashboards</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Consultas Hoy</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dimensiones</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Layers className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
          <TabsTrigger value="cubos">Cubos OLAP</TabsTrigger>
          <TabsTrigger value="explorador">Explorador</TabsTrigger>
          <TabsTrigger value="reportes">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Ventas vs Meta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                      <Bar dataKey="ventas" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="meta" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Distribución por Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cubos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cubes.map((cube) => (
              <Card
                key={cube.id}
                className="bg-card border-border hover:border-teal-500/50 cursor-pointer transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                      <Database className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="font-medium">{cube.name}</p>
                      <p className="text-sm text-muted-foreground">{cube.measures} medidas</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {cube.dimensions.map((dim, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {dim}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">Actualizado: {cube.lastUpdate}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="explorador">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Explorador de datos con drill-down y slice & dice</p>
          </Card>
        </TabsContent>

        <TabsContent value="reportes">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Reportes programados y ad-hoc</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
