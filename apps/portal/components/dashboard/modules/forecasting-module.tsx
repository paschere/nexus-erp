"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Brain, RefreshCw, Download, Package, ArrowUpRight, ArrowDownRight, Play, Sparkles } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from "recharts"

export default function ForecastingModule() {
  const [model, setModel] = useState("arima")
  const [horizon, setHorizon] = useState("3")
  const [confidence, setConfidence] = useState([80])
  const [isTraining, setIsTraining] = useState(false)

  const forecastData = [
    { month: "Ene", actual: 850, forecast: null, lower: null, upper: null },
    { month: "Feb", actual: 920, forecast: null, lower: null, upper: null },
    { month: "Mar", actual: 1100, forecast: null, lower: null, upper: null },
    { month: "Abr", actual: 980, forecast: null, lower: null, upper: null },
    { month: "May", actual: 1250, forecast: null, lower: null, upper: null },
    { month: "Jun", actual: 1180, forecast: null, lower: null, upper: null },
    { month: "Jul", actual: null, forecast: 1320, lower: 1180, upper: 1460 },
    { month: "Ago", actual: null, forecast: 1450, lower: 1280, upper: 1620 },
    { month: "Sep", actual: null, forecast: 1380, lower: 1190, upper: 1570 },
  ]

  const demandForecast = [
    { product: "Producto A", current: 450, forecast: 520, change: 15.5, confidence: 92 },
    { product: "Producto B", current: 320, forecast: 280, change: -12.5, confidence: 88 },
    { product: "Producto C", current: 180, forecast: 210, change: 16.7, confidence: 85 },
    { product: "Producto D", current: 890, forecast: 950, change: 6.7, confidence: 94 },
    { product: "Producto E", current: 220, forecast: 190, change: -13.6, confidence: 79 },
  ]

  const modelMetrics = [
    { name: "MAPE", value: "4.2%", status: "good" },
    { name: "RMSE", value: "45.3", status: "good" },
    { name: "R²", value: "0.94", status: "excellent" },
    { name: "Bias", value: "-2.1%", status: "warning" },
  ]

  const insights = [
    { type: "trend", message: "Tendencia alcista detectada para Q3 2024", impact: "high" },
    { type: "seasonality", message: "Patrón estacional: pico en Noviembre-Diciembre", impact: "medium" },
    { type: "anomaly", message: "Anomalía detectada en datos de Marzo", impact: "low" },
    { type: "recommendation", message: "Aumentar inventario de Producto A en 15%", impact: "high" },
  ]

  const handleTrain = () => {
    setIsTraining(true)
    setTimeout(() => setIsTraining(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Brain className="h-8 w-8 text-teal-500" />
            Forecasting AI
          </h1>
          <p className="text-muted-foreground">Predicciones inteligentes de demanda y ventas</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleTrain} disabled={isTraining}>
            {isTraining ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Entrenando...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Ejecutar Modelo
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Configuración del Modelo */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Modelo</label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arima">ARIMA</SelectItem>
                  <SelectItem value="prophet">Prophet (Meta)</SelectItem>
                  <SelectItem value="lstm">LSTM Neural</SelectItem>
                  <SelectItem value="xgboost">XGBoost</SelectItem>
                  <SelectItem value="ensemble">Ensemble (Mejor)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Horizonte (meses)</label>
              <Select value={horizon} onValueChange={setHorizon}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 mes</SelectItem>
                  <SelectItem value="3">3 meses</SelectItem>
                  <SelectItem value="6">6 meses</SelectItem>
                  <SelectItem value="12">12 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Intervalo de Confianza: {confidence}%</label>
              <Slider value={confidence} onValueChange={setConfidence} min={70} max={99} step={1} className="mt-3" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Métricas del Modelo</label>
              <div className="flex gap-2">
                {modelMetrics.map((metric) => (
                  <div
                    key={metric.name}
                    className={`px-2 py-1 rounded text-xs ${
                      metric.status === "excellent"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : metric.status === "good"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {metric.name}: {metric.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="bg-background/50">
          <TabsTrigger value="sales">Ventas</TabsTrigger>
          <TabsTrigger value="demand">Demanda</TabsTrigger>
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-2 bg-card/50 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pronóstico de Ventas</CardTitle>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal-500" />
                      <span>Actual</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      <span>Pronóstico</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-3 bg-purple-500/20 rounded" />
                      <span>Intervalo {confidence}%</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forecastData}>
                      <defs>
                        <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                      <Area type="monotone" dataKey="upper" stroke="transparent" fill="#8b5cf6" fillOpacity={0.1} />
                      <Area type="monotone" dataKey="lower" stroke="transparent" fill="#1a1a1a" />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#2dd4bf"
                        strokeWidth={2}
                        dot={{ fill: "#2dd4bf" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="forecast"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "#8b5cf6" }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Resumen */}
            <div className="space-y-4">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Proyección Q3</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-teal-500 mb-2">$4.15M</div>
                  <div className="flex items-center gap-2 text-sm text-emerald-500">
                    <ArrowUpRight className="h-4 w-4" />
                    +18.5% vs Q2
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Escenario Optimista</span>
                      <span>$4.62M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Escenario Base</span>
                      <span>$4.15M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Escenario Pesimista</span>
                      <span>$3.68M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {insights.slice(0, 3).map((insight, i) => (
                      <div key={i} className="p-2 rounded-lg bg-background/50 text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          {insight.impact === "high" ? (
                            <Badge className="bg-red-500/20 text-red-400 text-xs">Alto</Badge>
                          ) : insight.impact === "medium" ? (
                            <Badge className="bg-amber-500/20 text-amber-400 text-xs">Medio</Badge>
                          ) : (
                            <Badge className="bg-blue-500/20 text-blue-400 text-xs">Bajo</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">{insight.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="demand">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Pronóstico de Demanda por Producto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demandForecast.map((item) => (
                  <div key={item.product} className="p-4 rounded-lg bg-background/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-teal-500/20">
                          <Package className="h-5 w-5 text-teal-500" />
                        </div>
                        <div>
                          <div className="font-medium">{item.product}</div>
                          <div className="text-sm text-muted-foreground">Actual: {item.current} unidades</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">{item.forecast}</div>
                        <div
                          className={`text-sm flex items-center gap-1 ${item.change >= 0 ? "text-emerald-500" : "text-red-500"}`}
                        >
                          {item.change >= 0 ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          {Math.abs(item.change)}%
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Progress value={item.confidence} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">Confianza: {item.confidence}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-12">Pronóstico de Inventario - En desarrollo</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-12">Pronóstico de Cash Flow - En desarrollo</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-12">AI Insights Detallados - En desarrollo</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
