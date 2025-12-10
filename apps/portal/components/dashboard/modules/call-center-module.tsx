"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Phone,
  PhoneCall,
  PhoneOff,
  PhoneIncoming,
  PhoneOutgoing,
  Mic,
  MicOff,
  Clock,
  Star,
  TrendingUp,
  Sparkles,
  Bot,
  Headphones,
  Play,
  Pause,
  SkipForward,
  Settings,
  History,
  AlertCircle,
  Users,
  Zap,
  Brain,
  Lightbulb,
  Timer,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

export function CallCenterModule() {
  const [activeCall, setActiveCall] = useState<any>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isOnHold, setIsOnHold] = useState(false)
  const [callTime, setCallTime] = useState(0)
  const [aiMode, setAiMode] = useState<"assist" | "auto">("assist")
  const [transcription, setTranscription] = useState<any[]>([])
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  // Simular llamada activa
  useEffect(() => {
    if (activeCall) {
      const timer = setInterval(() => setCallTime((t) => t + 1), 1000)
      return () => clearInterval(timer)
    }
  }, [activeCall])

  // Simular transcripción en tiempo real
  useEffect(() => {
    if (activeCall) {
      const messages = [
        { speaker: "client", text: "Hola, tengo un problema con mi pedido #45892" },
        {
          speaker: "ai",
          text: "Buenos días, gracias por contactarnos. Veo que su pedido #45892 está en proceso de entrega.",
        },
        { speaker: "client", text: "Pero dice que llegó pero yo no he recibido nada" },
        {
          speaker: "ai",
          text: "Entiendo su preocupación. Déjeme verificar el estado con el transportador. ¿Me puede confirmar su dirección?",
        },
      ]

      let i = 0
      const interval = setInterval(() => {
        if (i < messages.length) {
          setTranscription((prev) => [...prev, messages[i]])
          if (messages[i].speaker === "client") {
            setAiSuggestions([
              "Ofrecer reenvío sin costo",
              "Verificar con transportadora",
              "Aplicar descuento 10% próxima compra",
              "Escalar a supervisor si persiste",
            ])
          }
          i++
        }
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [activeCall])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const queuedCalls = [
    { id: 1, name: "María García", phone: "+57 310 456 7890", topic: "Reclamo", wait: "2:34", priority: "high" },
    { id: 2, name: "Carlos Rodríguez", phone: "+57 315 789 0123", topic: "Consulta", wait: "1:45", priority: "medium" },
    { id: 3, name: "Ana Martínez", phone: "+57 320 234 5678", topic: "Soporte", wait: "0:58", priority: "low" },
  ]

  const recentCalls = [
    {
      id: 1,
      name: "Pedro López",
      duration: "5:23",
      type: "incoming",
      status: "resolved",
      sentiment: "positive",
      date: "Hace 15 min",
    },
    {
      id: 2,
      name: "Laura Sánchez",
      duration: "8:45",
      type: "incoming",
      status: "escalated",
      sentiment: "negative",
      date: "Hace 45 min",
    },
    {
      id: 3,
      name: "Diego Ramírez",
      duration: "3:12",
      type: "outgoing",
      status: "resolved",
      sentiment: "neutral",
      date: "Hace 1 hora",
    },
    {
      id: 4,
      name: "Sofia Torres",
      duration: "12:34",
      type: "incoming",
      status: "resolved",
      sentiment: "positive",
      date: "Hace 2 horas",
    },
  ]

  const agents = [
    { id: 1, name: "Juan Pérez", status: "available", calls: 23, rating: 4.8, avatar: "JP" },
    { id: 2, name: "María López", status: "on-call", calls: 19, rating: 4.9, avatar: "ML" },
    { id: 3, name: "Carlos Ruiz", status: "break", calls: 15, rating: 4.6, avatar: "CR" },
    { id: 4, name: "Ana García", status: "available", calls: 21, rating: 4.7, avatar: "AG" },
    { id: 5, name: "AI Bot NEXUS", status: "available", calls: 156, rating: 4.5, avatar: "🤖", isBot: true },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Headphones className="h-5 w-5 text-white" />
            </div>
            Call Center AI
          </h1>
          <p className="text-muted-foreground mt-1">
            Centro de contacto inteligente con asistencia de IA en tiempo real
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
            <Button
              variant={aiMode === "assist" ? "default" : "ghost"}
              size="sm"
              onClick={() => setAiMode("assist")}
              className="gap-2"
            >
              <Brain className="h-4 w-4" />
              AI Asistente
            </Button>
            <Button
              variant={aiMode === "auto" ? "default" : "ghost"}
              size="sm"
              onClick={() => setAiMode("auto")}
              className="gap-2"
            >
              <Bot className="h-4 w-4" />
              AI Automático
            </Button>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Configurar
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-6 gap-4">
        {[
          { label: "Llamadas Hoy", value: "234", change: "+12%", icon: Phone, color: "text-blue-400" },
          { label: "Resueltas AI", value: "156", change: "67%", icon: Bot, color: "text-emerald-400" },
          { label: "Tiempo Promedio", value: "4:23", change: "-15%", icon: Timer, color: "text-amber-400" },
          { label: "Satisfacción", value: "4.7", change: "+0.3", icon: Star, color: "text-yellow-400" },
          { label: "En Cola", value: "3", change: "", icon: Users, color: "text-violet-400" },
          { label: "Agentes Online", value: "5", change: "", icon: Headphones, color: "text-green-400" },
        ].map((kpi, i) => (
          <Card key={i} className="bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                {kpi.change && (
                  <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/30">
                    {kpi.change}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold mt-2">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Active Call Panel */}
        <Card className="col-span-2 border-emerald-500/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{activeCall ? "Llamada Activa" : "Sin Llamada Activa"}</CardTitle>
              {activeCall && (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                  {formatTime(callTime)}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {activeCall ? (
              <div className="space-y-4">
                {/* Caller Info */}
                <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-xl">
                      {activeCall.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{activeCall.name}</h3>
                    <p className="text-muted-foreground">{activeCall.phone}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        Cliente VIP
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-400 border-amber-500/30">
                        3 compras previas
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Última compra</p>
                    <p className="font-medium">$1,234,500</p>
                    <p className="text-xs text-muted-foreground">Hace 15 días</p>
                  </div>
                </div>

                {/* AI Real-time Transcription */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-400" />
                      Transcripción en Tiempo Real
                    </p>
                    <Badge variant="outline" className="text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                      AI Escuchando
                    </Badge>
                  </div>
                  <ScrollArea className="h-[150px] border border-border rounded-lg p-3 bg-secondary/30">
                    <div className="space-y-3">
                      {transcription.map((msg, i) => (
                        <div key={i} className={`flex gap-2 ${msg.speaker === "ai" ? "justify-end" : ""}`}>
                          <div
                            className={`max-w-[80%] p-2 rounded-lg text-sm ${
                              msg.speaker === "ai"
                                ? "bg-emerald-500/20 text-emerald-100"
                                : "bg-secondary text-foreground"
                            }`}
                          >
                            <p className="text-[10px] text-muted-foreground mb-1">
                              {msg.speaker === "ai" ? "AI / Agente" : "Cliente"}
                            </p>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* AI Suggestions */}
                {aiSuggestions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-400" />
                      Sugerencias AI
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {aiSuggestions.map((suggestion, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 bg-amber-500/5 border-amber-500/30 hover:bg-amber-500/10"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call Controls */}
                <div className="flex items-center justify-center gap-3 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-12 w-12 rounded-full ${isMuted ? "bg-red-500/20 text-red-400" : ""}`}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-12 w-12 rounded-full ${isOnHold ? "bg-amber-500/20 text-amber-400" : ""}`}
                    onClick={() => setIsOnHold(!isOnHold)}
                  >
                    {isOnHold ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                  </Button>
                  <Button
                    size="icon"
                    className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      setActiveCall(null)
                      setTranscription([])
                      setCallTime(0)
                    }}
                  >
                    <PhoneOff className="h-6 w-6" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-transparent">
                    <SkipForward className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-transparent">
                    <Users className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Phone className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">Sin llamada activa</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Selecciona una llamada de la cola o espera una entrante
                </p>
                <Button
                  className="mt-4 gap-2 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => setActiveCall({ name: "María García", phone: "+57 310 456 7890" })}
                >
                  <PhoneCall className="h-4 w-4" />
                  Tomar Siguiente Llamada
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Queue & Agents */}
        <div className="col-span-2 space-y-4">
          <Tabs defaultValue="queue" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="queue" className="gap-2">
                <PhoneIncoming className="h-4 w-4" />
                Cola ({queuedCalls.length})
              </TabsTrigger>
              <TabsTrigger value="agents" className="gap-2">
                <Headphones className="h-4 w-4" />
                Agentes
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <History className="h-4 w-4" />
                Historial
              </TabsTrigger>
            </TabsList>

            <TabsContent value="queue" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <ScrollArea className="h-[350px]">
                    <div className="divide-y divide-border">
                      {queuedCalls.map((call) => (
                        <div key={call.id} className="p-4 hover:bg-secondary/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback
                                className={`${
                                  call.priority === "high"
                                    ? "bg-red-500/20 text-red-400"
                                    : call.priority === "medium"
                                      ? "bg-amber-500/20 text-amber-400"
                                      : "bg-blue-500/20 text-blue-400"
                                }`}
                              >
                                {call.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium truncate">{call.name}</p>
                                <Badge
                                  variant="outline"
                                  className={`text-[10px] ${
                                    call.priority === "high"
                                      ? "bg-red-500/10 text-red-400 border-red-500/30"
                                      : call.priority === "medium"
                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                        : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                  }`}
                                >
                                  {call.topic}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{call.phone}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium flex items-center gap-1 text-amber-400">
                                <Clock className="h-3 w-3" />
                                {call.wait}
                              </p>
                              <Button
                                size="sm"
                                className="mt-1 h-7 gap-1 bg-emerald-600 hover:bg-emerald-700"
                                onClick={() => setActiveCall(call)}
                              >
                                <PhoneCall className="h-3 w-3" />
                                Contestar
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

            <TabsContent value="agents" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <ScrollArea className="h-[350px]">
                    <div className="divide-y divide-border">
                      {agents.map((agent) => (
                        <div key={agent.id} className="p-4 hover:bg-secondary/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className={agent.isBot ? "bg-violet-500/20 text-2xl" : "bg-secondary"}>
                                  {agent.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span
                                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
                                  agent.status === "available"
                                    ? "bg-green-500"
                                    : agent.status === "on-call"
                                      ? "bg-amber-500"
                                      : "bg-gray-500"
                                }`}
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{agent.name}</p>
                                {agent.isBot && (
                                  <Badge className="text-[10px] bg-violet-500/20 text-violet-400 border-violet-500/30">
                                    AI Bot
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground capitalize">
                                {agent.status.replace("-", " ")}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-amber-400">
                                <Star className="h-3 w-3 fill-current" />
                                <span className="text-sm font-medium">{agent.rating}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{agent.calls} llamadas</p>
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
                <CardContent className="p-0">
                  <ScrollArea className="h-[350px]">
                    <div className="divide-y divide-border">
                      {recentCalls.map((call) => (
                        <div key={call.id} className="p-4 hover:bg-secondary/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                call.type === "incoming" ? "bg-green-500/20" : "bg-blue-500/20"
                              }`}
                            >
                              {call.type === "incoming" ? (
                                <PhoneIncoming className="h-5 w-5 text-green-400" />
                              ) : (
                                <PhoneOutgoing className="h-5 w-5 text-blue-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{call.name}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-muted-foreground">{call.duration}</span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">{call.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {call.sentiment === "positive" && <ThumbsUp className="h-4 w-4 text-green-400" />}
                              {call.sentiment === "negative" && <ThumbsDown className="h-4 w-4 text-red-400" />}
                              <Badge
                                variant="outline"
                                className={`text-[10px] ${
                                  call.status === "resolved"
                                    ? "bg-green-500/10 text-green-400 border-green-500/30"
                                    : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                }`}
                              >
                                {call.status === "resolved" ? "Resuelto" : "Escalado"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* AI Insights Bar */}
      <Card className="border-emerald-500/30 bg-gradient-to-r from-emerald-500/5 to-teal-500/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <span className="font-medium">Insights AI del Día</span>
            </div>
            <div className="flex-1 flex items-center gap-4 overflow-x-auto pb-1">
              {[
                { text: "67% de las llamadas resueltas por AI sin intervención humana", icon: Bot },
                { text: "Pico de llamadas detectado entre 10-11am sobre envíos", icon: TrendingUp },
                { text: "3 clientes en riesgo de churn identificados hoy", icon: AlertCircle },
                { text: "Tiempo de resolución mejoró 23% vs. semana pasada", icon: Zap },
              ].map((insight, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap bg-secondary/50 rounded-full px-3 py-1.5"
                >
                  <insight.icon className="h-4 w-4 text-emerald-400 shrink-0" />
                  {insight.text}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
