"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Meh,
  Plus,
  Download,
  MoreHorizontal,
  TrendingUp,
  Users,
  Star,
  Send,
} from "lucide-react"

const surveys = [
  { id: 1, name: "NPS Q1 2024", type: "NPS", responses: 234, score: 72, status: "active" },
  { id: 2, name: "CSAT Post-Compra", type: "CSAT", responses: 567, score: 4.5, status: "active" },
  { id: 3, name: "Satisfacción Soporte", type: "CSAT", responses: 189, score: 4.2, status: "completed" },
]

const npsDistribution = [
  { type: "Promotores", count: 145, percentage: 62, color: "bg-green-500" },
  { type: "Pasivos", count: 56, percentage: 24, color: "bg-yellow-500" },
  { type: "Detractores", count: 33, percentage: 14, color: "bg-red-500" },
]

export function EncuestasModule() {
  const [activeTab, setActiveTab] = useState("encuestas")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Encuestas NPS/CSAT</h1>
          <p className="text-muted-foreground">Mide la satisfacción y lealtad de tus clientes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Encuesta
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">NPS Score</p>
                <p className="text-2xl font-bold text-green-400">+72</p>
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
                <p className="text-sm text-muted-foreground">CSAT Promedio</p>
                <p className="text-2xl font-bold">4.5/5</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Respuestas Totales</p>
                <p className="text-2xl font-bold">990</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasa Respuesta</p>
                <p className="text-2xl font-bold">34%</p>
              </div>
              <div className="p-3 bg-teal-500/20 rounded-lg">
                <Users className="h-6 w-6 text-teal-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NPS Distribution */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Distribución NPS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {npsDistribution.map((item) => (
              <div key={item.type} className="flex items-center gap-4">
                <div className="w-24 text-sm">{item.type}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                    <span className="text-sm text-muted-foreground">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                </div>
                {item.type === "Promotores" && <ThumbsUp className="h-5 w-5 text-green-400" />}
                {item.type === "Pasivos" && <Meh className="h-5 w-5 text-yellow-400" />}
                {item.type === "Detractores" && <ThumbsDown className="h-5 w-5 text-red-400" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="encuestas">Encuestas</TabsTrigger>
          <TabsTrigger value="respuestas">Respuestas</TabsTrigger>
          <TabsTrigger value="insights">Insights AI</TabsTrigger>
          <TabsTrigger value="campanas">Campañas</TabsTrigger>
        </TabsList>

        <TabsContent value="encuestas" className="space-y-4">
          <Card className="bg-card border-border">
            <ScrollArea className="h-[300px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Encuesta</th>
                    <th className="text-left p-4 font-medium">Tipo</th>
                    <th className="text-right p-4 font-medium">Respuestas</th>
                    <th className="text-right p-4 font-medium">Score</th>
                    <th className="text-center p-4 font-medium">Estado</th>
                    <th className="text-left p-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {surveys.map((survey) => (
                    <tr key={survey.id} className="border-b border-border hover:bg-muted/30">
                      <td className="p-4 font-medium">{survey.name}</td>
                      <td className="p-4">
                        <Badge variant="outline">{survey.type}</Badge>
                      </td>
                      <td className="p-4 text-right">{survey.responses}</td>
                      <td className="p-4 text-right font-medium text-green-400">
                        {survey.type === "NPS" ? `+${survey.score}` : `${survey.score}/5`}
                      </td>
                      <td className="p-4 text-center">
                        {survey.status === "active" ? (
                          <Badge className="bg-green-500/20 text-green-400">Activa</Badge>
                        ) : (
                          <Badge className="bg-gray-500/20 text-gray-400">Completada</Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="respuestas">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Respuestas individuales y comentarios</p>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Análisis AI de sentimiento y tendencias</p>
          </Card>
        </TabsContent>

        <TabsContent value="campanas">
          <Card className="bg-card border-border p-6">
            <p className="text-center text-muted-foreground">Campañas de envío de encuestas</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
