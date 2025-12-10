"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Key,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  Activity,
  Clock,
  CheckCircle2,
  Book,
  Lock,
  Webhook,
  Settings,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts"

const kpis = [
  { label: "Requests Hoy", value: "45,892", change: "+12%", icon: Activity, color: "text-primary" },
  { label: "Tasa de Éxito", value: "99.8%", change: "+0.2%", icon: CheckCircle2, color: "text-green-500" },
  { label: "Latencia Promedio", value: "45ms", change: "-5ms", icon: Clock, color: "text-blue-500" },
  { label: "Webhooks Activos", value: "12", change: "+2", icon: Webhook, color: "text-purple-500" },
]

const apiKeys = [
  {
    id: 1,
    nombre: "Producción - App Móvil",
    key: "nx_prod_sk_1234567890abcdef",
    permisos: ["read", "write"],
    creada: "2024-10-15",
    ultimoUso: "Hace 2 min",
    estado: "activa",
  },
  {
    id: 2,
    nombre: "Desarrollo - Integraciones",
    key: "nx_dev_sk_abcdef1234567890",
    permisos: ["read"],
    creada: "2024-11-20",
    ultimoUso: "Hace 1 hora",
    estado: "activa",
  },
  {
    id: 3,
    nombre: "Staging - QA Team",
    key: "nx_stg_sk_0987654321fedcba",
    permisos: ["read", "write", "admin"],
    creada: "2024-12-01",
    ultimoUso: "Hace 3 días",
    estado: "activa",
  },
]

const webhooks = [
  {
    id: 1,
    evento: "invoice.created",
    url: "https://api.miapp.com/webhooks/invoice",
    estado: "activo",
    ultimaEjecucion: "Hace 5 min",
    exitos: 1234,
    fallos: 2,
  },
  {
    id: 2,
    evento: "order.completed",
    url: "https://api.miapp.com/webhooks/order",
    estado: "activo",
    ultimaEjecucion: "Hace 12 min",
    exitos: 892,
    fallos: 0,
  },
  {
    id: 3,
    evento: "customer.updated",
    url: "https://api.miapp.com/webhooks/customer",
    estado: "pausado",
    ultimaEjecucion: "Hace 2 días",
    exitos: 456,
    fallos: 5,
  },
]

const endpoints = [
  { metodo: "GET", path: "/api/v1/customers", descripcion: "Listar clientes", auth: true },
  { metodo: "POST", path: "/api/v1/customers", descripcion: "Crear cliente", auth: true },
  { metodo: "GET", path: "/api/v1/invoices", descripcion: "Listar facturas", auth: true },
  { metodo: "POST", path: "/api/v1/invoices", descripcion: "Crear factura electrónica", auth: true },
  { metodo: "GET", path: "/api/v1/products", descripcion: "Listar productos", auth: true },
  { metodo: "GET", path: "/api/v1/inventory", descripcion: "Consultar inventario", auth: true },
  { metodo: "POST", path: "/api/v1/orders", descripcion: "Crear pedido", auth: true },
  { metodo: "GET", path: "/api/v1/reports/{type}", descripcion: "Generar reporte", auth: true },
]

const usageData = [
  { hora: "00:00", requests: 1200 },
  { hora: "04:00", requests: 800 },
  { hora: "08:00", requests: 3500 },
  { hora: "12:00", requests: 5200 },
  { hora: "16:00", requests: 4800 },
  { hora: "20:00", requests: 2100 },
]

const responseTimeData = [
  { dia: "Lun", tiempo: 42 },
  { dia: "Mar", tiempo: 45 },
  { dia: "Mié", tiempo: 38 },
  { dia: "Jue", tiempo: 52 },
  { dia: "Vie", tiempo: 44 },
  { dia: "Sáb", tiempo: 35 },
  { dia: "Dom", tiempo: 32 },
]

const logsRecientes = [
  { timestamp: "14:32:15", metodo: "POST", endpoint: "/api/v1/invoices", status: 201, tiempo: 145, ip: "192.168.1.1" },
  { timestamp: "14:32:10", metodo: "GET", endpoint: "/api/v1/customers", status: 200, tiempo: 32, ip: "192.168.1.2" },
  {
    timestamp: "14:31:58",
    metodo: "GET",
    endpoint: "/api/v1/products?limit=50",
    status: 200,
    tiempo: 78,
    ip: "192.168.1.1",
  },
  { timestamp: "14:31:45", metodo: "POST", endpoint: "/api/v1/orders", status: 201, tiempo: 234, ip: "10.0.0.5" },
  { timestamp: "14:31:30", metodo: "GET", endpoint: "/api/v1/inventory", status: 200, tiempo: 45, ip: "192.168.1.3" },
  {
    timestamp: "14:31:15",
    metodo: "PUT",
    endpoint: "/api/v1/customers/123",
    status: 404,
    tiempo: 12,
    ip: "192.168.1.1",
  },
]

export function APIModule() {
  const [activeTab, setActiveTab] = useState("keys")
  const [showKey, setShowKey] = useState<number | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">API & Integraciones</h1>
          <p className="text-muted-foreground">Gestiona tus API keys, webhooks y monitorea el uso de la API</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Book className="h-4 w-4" />
            Documentación
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva API Key
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-secondary">
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <Badge variant="outline" className="text-xs text-green-500">
                  {kpi.change}
                </Badge>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="uso">Uso & Métricas</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        {/* API Keys */}
        <TabsContent value="keys" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">API Keys</CardTitle>
                  <CardDescription>Gestiona las claves de acceso a tu API</CardDescription>
                </div>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-4 rounded-lg border border-border bg-secondary/20">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Key className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{apiKey.nombre}</p>
                          <p className="text-xs text-muted-foreground">Creada: {apiKey.creada}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-500 border-green-500/30">
                          {apiKey.estado}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded bg-background/50 font-mono text-sm mb-3">
                      <code className="flex-1 truncate">{showKey === apiKey.id ? apiKey.key : "•".repeat(32)}</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                      >
                        {showKey === apiKey.id ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => copyToClipboard(apiKey.key)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Permisos:</span>
                        {apiKey.permisos.map((p) => (
                          <Badge key={p} variant="outline" className="text-xs">
                            {p}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">Último uso: {apiKey.ultimoUso}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ejemplo de Uso */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Ejemplo de Uso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-zinc-950 font-mono text-sm overflow-x-auto">
                <pre className="text-green-400">
                  {`curl -X GET "https://api.nexuserp.co/v1/customers" \\
  -H "Authorization: Bearer nx_prod_sk_xxxxx" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Webhooks */}
        <TabsContent value="webhooks" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Webhooks</CardTitle>
                  <CardDescription>Recibe notificaciones en tiempo real de eventos del sistema</CardDescription>
                </div>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nuevo Webhook
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Evento</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Éxitos/Fallos</TableHead>
                    <TableHead>Última Ejecución</TableHead>
                    <TableHead className="w-[100px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooks.map((webhook) => (
                    <TableRow key={webhook.id} className="border-border">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Webhook className="h-4 w-4 text-primary" />
                          <code className="text-sm">{webhook.evento}</code>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs text-muted-foreground">{webhook.url}</code>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            webhook.estado === "activo"
                              ? "text-green-500 border-green-500/30"
                              : "text-yellow-500 border-yellow-500/30"
                          }
                        >
                          {webhook.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-green-500">{webhook.exitos}</span>
                          <span className="text-muted-foreground">/</span>
                          <span className="text-red-500">{webhook.fallos}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{webhook.ultimaEjecucion}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Settings className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Eventos Disponibles */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Eventos Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  "invoice.created",
                  "invoice.paid",
                  "invoice.cancelled",
                  "order.created",
                  "order.completed",
                  "order.cancelled",
                  "customer.created",
                  "customer.updated",
                  "product.created",
                  "product.updated",
                  "inventory.low",
                  "payment.received",
                ].map((evento) => (
                  <div key={evento} className="p-2 rounded-lg bg-secondary/30 text-xs font-mono">
                    {evento}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Endpoints */}
        <TabsContent value="endpoints" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Endpoints Disponibles</CardTitle>
                  <CardDescription>API REST v1 - Base URL: https://api.nexuserp.co</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <ExternalLink className="h-4 w-4" />
                  OpenAPI Spec
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {endpoints.map((ep, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/40 cursor-pointer transition-colors"
                  >
                    <Badge
                      className={
                        ep.metodo === "GET"
                          ? "bg-green-500/20 text-green-500"
                          : ep.metodo === "POST"
                            ? "bg-blue-500/20 text-blue-500"
                            : ep.metodo === "PUT"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-red-500/20 text-red-500"
                      }
                    >
                      {ep.metodo}
                    </Badge>
                    <code className="flex-1 text-sm font-mono">{ep.path}</code>
                    <span className="text-sm text-muted-foreground">{ep.descripcion}</span>
                    {ep.auth && <Lock className="h-4 w-4 text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Uso & Métricas */}
        <TabsContent value="uso" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Requests por Hora (Hoy)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="hora" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #334155",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="requests" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Tiempo de Respuesta (ms)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="dia" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #334155",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="tiempo"
                        stroke="#6366f1"
                        strokeWidth={2}
                        dot={{ fill: "#6366f1" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Límites */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Límites de la API</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Requests / Minuto", usado: 450, limite: 1000 },
                  { label: "Requests / Día", usado: 45892, limite: 100000 },
                  { label: "Payload Máximo", usado: 2.4, limite: 10, unidad: "MB" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-secondary/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-medium">
                        {item.usado} / {item.limite} {item.unidad || ""}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(item.usado / item.limite) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs */}
        <TabsContent value="logs" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Logs de Requests</CardTitle>
                  <CardDescription>Últimas solicitudes a la API</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-[120px] bg-secondary/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="200">2xx</SelectItem>
                      <SelectItem value="400">4xx</SelectItem>
                      <SelectItem value="500">5xx</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <RefreshCw className="h-4 w-4" />
                    Actualizar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-2 font-mono text-sm">
                  {logsRecientes.map((log, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-2 rounded-lg bg-secondary/20 hover:bg-secondary/40"
                    >
                      <span className="text-xs text-muted-foreground w-20">{log.timestamp}</span>
                      <Badge
                        className={
                          log.metodo === "GET"
                            ? "bg-green-500/20 text-green-500 w-14 justify-center"
                            : log.metodo === "POST"
                              ? "bg-blue-500/20 text-blue-500 w-14 justify-center"
                              : "bg-yellow-500/20 text-yellow-500 w-14 justify-center"
                        }
                      >
                        {log.metodo}
                      </Badge>
                      <code className="flex-1 text-xs truncate">{log.endpoint}</code>
                      <Badge
                        variant="outline"
                        className={
                          log.status >= 200 && log.status < 300
                            ? "text-green-500 border-green-500/30"
                            : log.status >= 400
                              ? "text-red-500 border-red-500/30"
                              : "text-yellow-500 border-yellow-500/30"
                        }
                      >
                        {log.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground w-16 text-right">{log.tiempo}ms</span>
                      <span className="text-xs text-muted-foreground w-24">{log.ip}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
