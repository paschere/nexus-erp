"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  X,
  Save,
  Download,
  Upload,
  Sparkles,
  FilterIcon,
  MergeIcon,
  AlertTriangle,
  Variable,
  WorkflowIcon,
  Trash2,
  Cable,
  Plus,
  Search,
  Target,
  PhoneIcon,
  ArrowLeftRight,
  UserPlusIcon,
  EditIcon,
  ArchiveIcon,
  LayersIcon,
  ScaleIcon,
  UserXIcon,
  ClockIcon,
  ZapIcon,
  GitBranchIcon,
  FileTextIcon,
  FileIcon,
  MailIcon,
  MessageSquareIcon,
  DatabaseIcon,
  BellIcon,
  CalendarIcon,
  DollarSignIcon,
  PackageIcon,
  UsersIcon,
  ShoppingCartIcon,
  TruckIcon,
  ClipboardCheckIcon,
  FactoryIcon,
  WrenchIcon,
  CalculatorIcon,
  CreditCardIcon,
  Building2Icon,
  GlobeIcon,
  WebhookIcon,
  CodeIcon,
  MoreHorizontalIcon,
  CheckCircle2Icon,
  XCircleIcon,
  Loader2Icon,
  KeyboardIcon,
  AlertCircleIcon,
  CheckIcon,
  SendIcon,
  PrinterIcon,
  TargetIcon,
  UserCheckIcon,
  FileQuestionIcon,
  ArrowRightIcon,
  PercentIcon,
  LockIcon,
  UnlockIcon,
  MapPinIcon,
  ClipboardListIcon,
  PackageCheckIcon,
  BanIcon,
  TrendingDownIcon,
  BoxesIcon,
  ReceiptIcon,
  BarChart3Icon,
  WalletIcon,
  ShoppingBagIcon,
  StarIcon,
  RotateCcwIcon,
  PlayCircleIcon,
  SquareIcon,
  HardDriveIcon,
  CloudIcon,
  BoxIcon,
  PenToolIcon,
  TableIcon,
  ShuffleIcon,
  PlayIcon,
  RepeatIcon,
  SplitIcon,
  ArrowRightLeftIcon,
  ListIcon,
  GaugeIcon,
  TypeIcon,
  Zap,
  GitBranch,
  Play,
  ShieldIcon,
  SearchIcon,
  UserIcon,
  TagIcon,
  AlertTriangleIcon,
  Copy,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

interface FlowBuilderModalProps {
  open: boolean
  onClose: () => void
}

interface FlowNode {
  id: string
  type: string
  label: string
  description: string
  icon: any
  color: string
  category: "trigger" | "condition" | "action" | "logic"
  position: { x: number; y: number }
  connections: string[]
  config: Record<string, any>
  outputs?: number
  outputLabels?: string[]
}

interface Connection {
  id: string
  from: string
  to: string
  fromPort: number
  toPort: string
}

interface ConnectionError {
  message: string
  type: "error" | "warning"
}

interface ConnectionValidation {
  valid: boolean
  error?: ConnectionError
}

const nodeVariables: Record<string, Array<{ name: string; description: string; example: string }>> = {
  // Ventas triggers
  nuevo_pedido: [
    { name: "{{pedido.id}}", description: "ID del pedido", example: "PED-00123" },
    { name: "{{pedido.total}}", description: "Total del pedido", example: "1500000" },
    { name: "{{pedido.subtotal}}", description: "Subtotal sin IVA", example: "1260504" },
    { name: "{{pedido.iva}}", description: "IVA del pedido", example: "239496" },
    { name: "{{pedido.items}}", description: "Lista de productos", example: "[...]" },
    { name: "{{pedido.items_count}}", description: "Cantidad de items", example: "5" },
    { name: "{{pedido.fecha}}", description: "Fecha de creación", example: "2024-01-15" },
    { name: "{{pedido.estado}}", description: "Estado del pedido", example: "pendiente" },
    { name: "{{pedido.notas}}", description: "Notas del pedido", example: "Entregar en la mañana" },
    { name: "{{cliente.id}}", description: "ID del cliente", example: "CLI-00456" },
    { name: "{{cliente.nombre}}", description: "Nombre del cliente", example: "Juan Pérez" },
    { name: "{{cliente.email}}", description: "Email del cliente", example: "juan@email.com" },
    { name: "{{cliente.telefono}}", description: "Teléfono del cliente", example: "+573001234567" },
    { name: "{{cliente.nit}}", description: "NIT/CC del cliente", example: "900123456-1" },
    { name: "{{cliente.direccion}}", description: "Dirección del cliente", example: "Calle 123 #45-67" },
    { name: "{{cliente.ciudad}}", description: "Ciudad del cliente", example: "Bogotá" },
    { name: "{{vendedor.id}}", description: "ID del vendedor", example: "VEN-001" },
    { name: "{{vendedor.nombre}}", description: "Nombre del vendedor", example: "María García" },
    { name: "{{vendedor.email}}", description: "Email del vendedor", example: "maria@empresa.com" },
  ],
  factura_creada: [
    { name: "{{factura.id}}", description: "ID de la factura", example: "FE-00001" },
    { name: "{{factura.numero}}", description: "Número de factura", example: "SETP990000001" },
    { name: "{{factura.cufe}}", description: "CUFE de la factura", example: "abc123..." },
    { name: "{{factura.total}}", description: "Total de la factura", example: "1500000" },
    { name: "{{factura.subtotal}}", description: "Subtotal sin IVA", example: "1260504" },
    { name: "{{factura.iva}}", description: "IVA de la factura", example: "239496" },
    { name: "{{factura.fecha}}", description: "Fecha de emisión", example: "2024-01-15" },
    { name: "{{factura.vencimiento}}", description: "Fecha de vencimiento", example: "2024-02-15" },
    { name: "{{factura.estado_dian}}", description: "Estado DIAN", example: "aprobada" },
    { name: "{{factura.pdf_url}}", description: "URL del PDF", example: "https://..." },
    { name: "{{factura.xml_url}}", description: "URL del XML", example: "https://..." },
    { name: "{{cliente.id}}", description: "ID del cliente", example: "CLI-00456" },
    { name: "{{cliente.nombre}}", description: "Nombre del cliente", example: "Juan Pérez" },
    { name: "{{cliente.email}}", description: "Email del cliente", example: "juan@email.com" },
    { name: "{{cliente.nit}}", description: "NIT del cliente", example: "900123456-1" },
  ],
  cliente_nuevo: [
    { name: "{{cliente.id}}", description: "ID del cliente", example: "CLI-00456" },
    { name: "{{cliente.nombre}}", description: "Nombre completo", example: "Juan Pérez" },
    { name: "{{cliente.email}}", description: "Email", example: "juan@email.com" },
    { name: "{{cliente.telefono}}", description: "Teléfono", example: "+573001234567" },
    { name: "{{cliente.tipo}}", description: "Tipo de cliente", example: "empresa" },
    { name: "{{cliente.nit}}", description: "NIT/CC", example: "900123456-1" },
    { name: "{{cliente.direccion}}", description: "Dirección", example: "Calle 123 #45-67" },
    { name: "{{cliente.ciudad}}", description: "Ciudad", example: "Bogotá" },
    { name: "{{cliente.departamento}}", description: "Departamento", example: "Cundinamarca" },
    { name: "{{cliente.canal_registro}}", description: "Canal de registro", example: "web" },
    { name: "{{cliente.fecha_registro}}", description: "Fecha de registro", example: "2024-01-15" },
    { name: "{{vendedor.id}}", description: "Vendedor asignado", example: "VEN-001" },
    { name: "{{vendedor.nombre}}", description: "Nombre vendedor", example: "María García" },
  ],
  pago_recibido: [
    { name: "{{pago.id}}", description: "ID del pago", example: "PAG-00123" },
    { name: "{{pago.monto}}", description: "Monto pagado", example: "1500000" },
    { name: "{{pago.metodo}}", description: "Método de pago", example: "transferencia" },
    { name: "{{pago.referencia}}", description: "Referencia del pago", example: "REF123456" },
    { name: "{{pago.fecha}}", description: "Fecha del pago", example: "2024-01-15" },
    { name: "{{pago.banco}}", description: "Banco origen", example: "Bancolombia" },
    { name: "{{factura.id}}", description: "ID factura relacionada", example: "FE-00001" },
    { name: "{{factura.numero}}", description: "Número de factura", example: "SETP990000001" },
    { name: "{{factura.saldo}}", description: "Saldo pendiente", example: "0" },
    { name: "{{cliente.id}}", description: "ID del cliente", example: "CLI-00456" },
    { name: "{{cliente.nombre}}", description: "Nombre del cliente", example: "Juan Pérez" },
  ],
  cotizacion_creada: [
    { name: "{{cotizacion.id}}", description: "ID de la cotización", example: "COT-00123" },
    { name: "{{cotizacion.numero}}", description: "Número de cotización", example: "COT-2024-001" },
    { name: "{{cotizacion.total}}", description: "Total cotizado", example: "5000000" },
    { name: "{{cotizacion.validez}}", description: "Días de validez", example: "30" },
    { name: "{{cotizacion.fecha_vencimiento}}", description: "Fecha de vencimiento", example: "2024-02-15" },
    { name: "{{cotizacion.probabilidad}}", description: "Probabilidad de cierre", example: "75" },
    { name: "{{cotizacion.items}}", description: "Productos cotizados", example: "[...]" },
    { name: "{{cotizacion.notas}}", description: "Notas", example: "Incluye instalación" },
    { name: "{{cliente.id}}", description: "ID del cliente", example: "CLI-00456" },
    { name: "{{cliente.nombre}}", description: "Nombre del cliente", example: "Juan Pérez" },
    { name: "{{vendedor.id}}", description: "ID del vendedor", example: "VEN-001" },
    { name: "{{vendedor.nombre}}", description: "Nombre del vendedor", example: "María García" },
  ],
  cliente_inactivo: [
    { name: "{{cliente.id}}", description: "ID del cliente", example: "CLI-00456" },
    { name: "{{cliente.nombre}}", description: "Nombre del cliente", example: "Juan Pérez" },
    { name: "{{cliente.email}}", description: "Email del cliente", example: "juan@email.com" },
    { name: "{{cliente.telefono}}", description: "Teléfono", example: "+573001234567" },
    { name: "{{cliente.dias_inactivo}}", description: "Días sin comprar", example: "95" },
    { name: "{{cliente.ultima_compra}}", description: "Fecha última compra", example: "2023-10-15" },
    { name: "{{cliente.total_historico}}", description: "Total compras históricas", example: "15000000" },
    { name: "{{cliente.segmento}}", description: "Segmento del cliente", example: "VIP" },
    { name: "{{vendedor.id}}", description: "Vendedor asignado", example: "VEN-001" },
    { name: "{{vendedor.nombre}}", description: "Nombre vendedor", example: "María García" },
  ],
  meta_cumplida: [
    { name: "{{meta.id}}", description: "ID de la meta", example: "META-001" },
    { name: "{{meta.tipo}}", description: "Tipo de meta", example: "ventas" },
    { name: "{{meta.objetivo}}", description: "Objetivo", example: "50000000" },
    { name: "{{meta.logrado}}", description: "Monto logrado", example: "52000000" },
    { name: "{{meta.porcentaje}}", description: "% de cumplimiento", example: "104" },
    { name: "{{meta.periodo}}", description: "Período", example: "mensual" },
    { name: "{{meta.fecha_inicio}}", description: "Inicio del período", example: "2024-01-01" },
    { name: "{{meta.fecha_fin}}", description: "Fin del período", example: "2024-01-31" },
    { name: "{{vendedor.id}}", description: "ID del vendedor", example: "VEN-001" },
    { name: "{{vendedor.nombre}}", description: "Nombre del vendedor", example: "María García" },
    { name: "{{equipo.id}}", description: "ID del equipo", example: "EQ-001" },
    { name: "{{equipo.nombre}}", description: "Nombre del equipo", example: "Ventas Norte" },
  ],
  oportunidad_perdida: [
    { name: "{{oportunidad.id}}", description: "ID de la oportunidad", example: "OPO-00123" },
    { name: "{{oportunidad.nombre}}", description: "Nombre", example: "Proyecto ABC" },
    { name: "{{oportunidad.monto}}", description: "Monto potencial", example: "25000000" },
    { name: "{{oportunidad.motivo_perdida}}", description: "Motivo de pérdida", example: "precio" },
    { name: "{{oportunidad.competidor}}", description: "Competidor ganador", example: "Empresa XYZ" },
    { name: "{{oportunidad.notas}}", description: "Notas del cierre", example: "Cliente eligió..." },
    { name: "{{cliente.id}}", description: "ID del cliente", example: "CLI-00456" },
    { name: "{{cliente.nombre}}", description: "Nombre del cliente", example: "Juan Pérez" },
    { name: "{{vendedor.id}}", description: "ID del vendedor", example: "VEN-001" },
    { name: "{{vendedor.nombre}}", description: "Nombre del vendedor", example: "María García" },
  ],
  // Inventario triggers
  stock_bajo: [
    { name: "{{producto.id}}", description: "ID del producto", example: "PROD-00123" },
    { name: "{{producto.codigo}}", description: "Código/SKU", example: "SKU-12345" },
    { name: "{{producto.nombre}}", description: "Nombre del producto", example: "Widget Pro" },
    { name: "{{producto.stock_actual}}", description: "Stock actual", example: "5" },
    { name: "{{producto.stock_minimo}}", description: "Stock mínimo", example: "10" },
    { name: "{{producto.porcentaje_bajo}}", description: "% debajo del mínimo", example: "50" },
    { name: "{{producto.costo}}", description: "Costo unitario", example: "50000" },
    { name: "{{producto.precio}}", example: "75000" },
    { name: "{{bodega.id}}", description: "ID de la bodega", example: "BOD-001" },
    { name: "{{bodega.nombre}}", description: "Nombre de la bodega", example: "Principal" },
    { name: "{{proveedor.id}}", description: "Proveedor preferido", example: "PROV-001" },
    { name: "{{proveedor.nombre}}", description: "Nombre del proveedor", example: "Distribuidora ABC" },
  ],
  lote_vencimiento: [
    { name: "{{lote.id}}", description: "ID del lote", example: "LOTE-00123" },
    { name: "{{lote.numero}}", description: "Número de lote", example: "L2024-001" },
    { name: "{{lote.fecha_vencimiento}}", description: "Fecha de vencimiento", example: "2024-03-15" },
    { name: "{{lote.dias_para_vencer}}", description: "Días para vencer", example: "15" },
    { name: "{{lote.cantidad}}", description: "Cantidad en lote", example: "100" },
    { name: "{{producto.id}}", description: "ID del producto", example: "PROD-00123" },
    { name: "{{producto.nombre}}", description: "Nombre del producto", example: "Producto ABC" },
    { name: "{{producto.codigo}}", description: "Código/SKU", example: "SKU-12345" },
    { name: "{{bodega.id}}", description: "ID de la bodega", example: "BOD-001" },
    { name: "{{bodega.nombre}}", description: "Nombre de la bodega", example: "Refrigerado" },
  ],
  transferencia_creada: [
    { name: "{{transferencia.id}}", description: "ID de la transferencia", example: "TRF-00123" },
    { name: "{{transferencia.estado}}", description: "Estado", example: "pendiente" },
    { name: "{{transferencia.items}}", description: "Productos", example: "[...]" },
    { name: "{{transferencia.items_count}}", description: "Cantidad de items", example: "5" },
    { name: "{{transferencia.fecha}}", description: "Fecha de creación", example: "2024-01-15" },
    { name: "{{bodega_origen.id}}", description: "ID bodega origen", example: "BOD-001" },
    { name: "{{bodega_origen.nombre}}", description: "Nombre bodega origen", example: "Principal" },
    { name: "{{bodega_destino.id}}", description: "ID bodega destino", example: "BOD-002" },
    { name: "{{bodega_destino.nombre}}", description: "Nombre bodega destino", example: "Tienda Norte" },
    { name: "{{usuario.id}}", description: "Usuario que creó", example: "USR-001" },
    { name: "{{usuario.nombre}}", description: "Nombre del usuario", example: "Admin" },
  ],
  recepcion_mercancia: [
    { name: "{{recepcion.id}}", description: "ID de la recepción", example: "REC-00123" },
    { name: "{{recepcion.items}}", description: "Productos recibidos", example: "[...]" },
    { name: "{{recepcion.items_count}}", description: "Cantidad de items", example: "10" },
    { name: "{{recepcion.fecha}}", description: "Fecha de recepción", example: "2024-01-15" },
    { name: "{{recepcion.estado_calidad}}", description: "Estado de calidad", example: "aprobado" },
    { name: "{{orden_compra.id}}", description: "ID orden de compra", example: "OC-00123" },
    { name: "{{orden_compra.numero}}", description: "Número de OC", example: "OC-2024-001" },
    { name: "{{proveedor.id}}", description: "ID del proveedor", example: "PROV-001" },
    { name: "{{proveedor.nombre}}", description: "Nombre del proveedor", example: "Distribuidora ABC" },
    { name: "{{bodega.id}}", description: "ID de la bodega", example: "BOD-001" },
    { name: "{{bodega.nombre}}", description: "Nombre de la bodega", example: "Principal" },
  ],
  ajuste_inventario: [
    { name: "{{ajuste.id}}", description: "ID del ajuste", example: "AJU-00123" },
    { name: "{{ajuste.tipo}}", description: "Tipo de ajuste", example: "salida" },
    { name: "{{ajuste.motivo}}", description: "Motivo", example: "daño" },
    { name: "{{ajuste.cantidad}}", description: "Cantidad ajustada", example: "5" },
    { name: "{{ajuste.valor}}", description: "Valor del ajuste", example: "250000" },
    { name: "{{ajuste.notas}}", description: "Notas", example: "Productos dañados" },
    { name: "{{producto.id}}", description: "ID del producto", example: "PROD-00123" },
    { name: "{{producto.nombre}}", description: "Nombre del producto", example: "Widget Pro" },
    { name: "{{bodega.id}}", description: "ID de la bodega", example: "BOD-001" },
    { name: "{{bodega.nombre}}", description: "Nombre de la bodega", example: "Principal" },
    { name: "{{usuario.id}}", description: "Usuario que ajustó", example: "USR-001" },
    { name: "{{usuario.nombre}}", description: "Nombre del usuario", example: "Admin" },
  ],
  // Contabilidad
  factura_vencida: [
    { name: "{{factura.id}}", description: "ID de la factura", example: "FE-00001" },
    { name: "{{factura.numero}}", description: "Número de factura", example: "SETP990000001" },
    { name: "{{factura.total}}", description: "Total de la factura", example: "1500000" },
    { name: "{{factura.saldo}}", description: "Saldo pendiente", example: "1500000" },
    { name: "{{factura.dias_vencida}}", description: "Días vencida", example: "15" },
    { name: "{{factura.fecha_vencimiento}}", description: "Fecha vencimiento", example: "2024-01-01" },
    { name: "{{cliente.id}}", description: "ID del cliente", example: "CLI-00456" },
    { name: "{{cliente.nombre}}", description: "Nombre del cliente", example: "Juan Pérez" },
    { name: "{{cliente.email}}", description: "Email del cliente", example: "juan@email.com" },
    { name: "{{cliente.telefono}}", description: "Teléfono del cliente", example: "+573001234567" },
    { name: "{{vendedor.id}}", description: "Vendedor asignado", example: "VEN-001" },
    { name: "{{vendedor.nombre}}", description: "Nombre del vendedor", example: "María García" },
  ],
  movimiento_bancario: [
    { name: "{{movimiento.id}}", description: "ID del movimiento", example: "MOV-00123" },
    { name: "{{movimiento.tipo}}", description: "Tipo (crédito/débito)", example: "crédito" },
    { name: "{{movimiento.monto}}", description: "Monto", example: "5000000" },
    { name: "{{movimiento.concepto}}", description: "Concepto", example: "Pago factura FE-001" },
    { name: "{{movimiento.referencia}}", description: "Referencia", example: "REF123456" },
    { name: "{{movimiento.fecha}}", description: "Fecha", example: "2024-01-15" },
    { name: "{{movimiento.saldo_anterior}}", description: "Saldo anterior", example: "10000000" },
    { name: "{{movimiento.saldo_nuevo}}", description: "Saldo nuevo", example: "15000000" },
    { name: "{{banco.id}}", description: "ID del banco", example: "BCO-001" },
    { name: "{{banco.nombre}}", description: "Nombre del banco", example: "Bancolombia" },
    { name: "{{cuenta.numero}}", description: "Número de cuenta", example: "****1234" },
  ],
  presupuesto_excedido: [
    { name: "{{presupuesto.id}}", description: "ID del presupuesto", example: "PRE-001" },
    { name: "{{presupuesto.area}}", description: "Área", example: "Marketing" },
    { name: "{{presupuesto.monto_asignado}}", description: "Monto asignado", example: "10000000" },
    { name: "{{presupuesto.monto_ejecutado}}", description: "Monto ejecutado", example: "12000000" },
    { name: "{{presupuesto.porcentaje_exceso}}", description: "% de exceso", example: "120" },
    { name: "{{presupuesto.periodo}}", description: "Período", example: "Enero 2024" },
    { name: "{{responsable.id}}", description: "ID del responsable", example: "USR-001" },
    { name: "{{responsable.nombre}}", description: "Nombre del responsable", example: "Director Marketing" },
  ],
  conciliacion_diferencia: [
    { name: "{{conciliacion.id}}", description: "ID de la conciliación", example: "CON-00123" },
    { name: "{{conciliacion.fecha}}", description: "Fecha", example: "2024-01-15" },
    { name: "{{conciliacion.diferencia}}", description: "Diferencia encontrada", example: "150000" },
    { name: "{{conciliacion.saldo_banco}}", description: "Saldo según banco", example: "10150000" },
    { name: "{{conciliacion.saldo_libros}}", description: "Saldo según libros", example: "10000000" },
    { name: "{{banco.id}}", description: "ID del banco", example: "BCO-001" },
    { name: "{{banco.nombre}}", description: "Nombre del banco", example: "Bancolombia" },
    { name: "{{cuenta.numero}}", description: "Número de cuenta", example: "****1234" },
  ],
  cierre_contable: [
    { name: "{{cierre.id}}", description: "ID del cierre", example: "CIE-001" },
    { name: "{{cierre.periodo}}", description: "Período cerrado", example: "Enero 2024" },
    { name: "{{cierre.fecha}}", description: "Fecha del cierre", example: "2024-02-05" },
    { name: "{{cierre.ingresos}}", description: "Total ingresos", example: "150000000" },
    { name: "{{cierre.gastos}}", description: "Total gastos", example: "120000000" },
    { name: "{{cierre.utilidad}}", description: "Utilidad del período", example: "30000000" },
    { name: "{{usuario.id}}", description: "Usuario que cerró", example: "USR-001" },
    { name: "{{usuario.nombre}}", description: "Nombre del usuario", example: "Contador" },
  ],
  // Compras
  orden_compra: [
    { name: "{{orden.id}}", description: "ID de la orden", example: "OC-00123" },
    { name: "{{orden.numero}}", description: "Número de OC", example: "OC-2024-001" },
    { name: "{{orden.total}}", description: "Total de la orden", example: "25000000" },
    { name: "{{orden.estado}}", description: "Estado", example: "aprobada" },
    { name: "{{orden.fecha}}", description: "Fecha de creación", example: "2024-01-15" },
    { name: "{{orden.fecha_entrega}}", description: "Fecha entrega esperada", example: "2024-01-25" },
    { name: "{{orden.items}}", description: "Productos", example: "[...]" },
    { name: "{{orden.items_count}}", description: "Cantidad de items", example: "5" },
    { name: "{{orden.notas}}", description: "Notas", example: "Urgente" },
    { name: "{{proveedor.id}}", description: "ID del proveedor", example: "PROV-001" },
    { name: "{{proveedor.nombre}}", description: "Nombre del proveedor", example: "Distribuidora ABC" },
    { name: "{{proveedor.email}}", description: "Email del proveedor", example: "ventas@proveedor.com" },
    { name: "{{solicitante.id}}", description: "Usuario solicitante", example: "USR-001" },
    { name: "{{solicitante.nombre}}", description: "Nombre del solicitante", example: "Jefe de Compras" },
  ],
  retraso_entrega: [
    { name: "{{orden.id}}", description: "ID de la orden", example: "OC-00123" },
    { name: "{{orden.numero}}", description: "Número de OC", example: "OC-2024-001" },
    { name: "{{orden.fecha_entrega}}", description: "Fecha entrega esperada", example: "2024-01-20" },
    { name: "{{orden.dias_retraso}}", description: "Días de retraso", example: "5" },
    { name: "{{orden.total}}", description: "Total de la orden", example: "25000000" },
    { name: "{{proveedor.id}}", description: "ID del proveedor", example: "PROV-001" },
    { name: "{{proveedor.nombre}}", description: "Nombre del proveedor", example: "Distribuidora ABC" },
    { name: "{{proveedor.email}}", description: "Email del proveedor", example: "ventas@proveedor.com" },
    { name: "{{proveedor.telefono}}", description: "Teléfono del proveedor", example: "+573001234567" },
  ],
  proveedor_evaluacion: [
    { name: "{{evaluacion.id}}", description: "ID de la evaluación", example: "EVA-001" },
    { name: "{{evaluacion.puntaje}}", description: "Puntaje total", example: "85" },
    { name: "{{evaluacion.calidad}}", description: "Puntaje calidad", example: "90" },
    { name: "{{evaluacion.tiempo}}", description: "Puntaje tiempo", example: "80" },
    { name: "{{evaluacion.precio}}", description: "Puntaje precio", example: "85" },
    { name: "{{evaluacion.periodo}}", description: "Período evaluado", example: "Q1 2024" },
    { name: "{{proveedor.id}}", description: "ID del proveedor", example: "PROV-001" },
    { name: "{{proveedor.nombre}}", description: "Nombre del proveedor", example: "Distribuidora ABC" },
  ],
  requisicion_aprobada: [
    { name: "{{requisicion.id}}", description: "ID de la requisición", example: "REQ-00123" },
    { name: "{{requisicion.numero}}", description: "Número", example: "REQ-2024-001" },
    { name: "{{requisicion.total}}", description: "Total estimado", example: "5000000" },
    { name: "{{requisicion.items}}", description: "Productos solicitados", example: "[...]" },
    { name: "{{requisicion.urgencia}}", description: "Nivel de urgencia", example: "alta" },
    { name: "{{requisicion.notas}}", description: "Notas", example: "Para proyecto X" },
    { name: "{{solicitante.id}}", description: "Usuario solicitante", example: "USR-001" },
    { name: "{{solicitante.nombre}}", description: "Nombre del solicitante", example: "Ing. Pérez" },
    { name: "{{solicitante.area}}", description: "Área del solicitante", example: "Producción" },
    { name: "{{aprobador.id}}", description: "Usuario aprobador", example: "USR-002" },
    { name: "{{aprobador.nombre}}", description: "Nombre del aprobador", example: "Gerente" },
  ],
  // Producción
  produccion_completa: [
    { name: "{{orden_produccion.id}}", description: "ID de la orden", example: "OP-00123" },
    { name: "{{orden_produccion.numero}}", description: "Número de OP", example: "OP-2024-001" },
    { name: "{{orden_produccion.cantidad}}", description: "Cantidad producida", example: "500" },
    { name: "{{orden_produccion.tiempo_real}}", description: "Tiempo real (min)", example: "480" },
    { name: "{{orden_produccion.eficiencia}}", description: "% eficiencia", example: "95" },
    { name: "{{producto.id}}", description: "ID del producto", example: "PROD-00123" },
    { name: "{{producto.nombre}}", description: "Nombre del producto", example: "Widget Pro" },
    { name: "{{linea.id}}", description: "ID de la línea", example: "LIN-001" },
    { name: "{{linea.nombre}}", description: "Nombre de la línea", example: "Línea 1" },
  ],
  calidad_falla: [
    { name: "{{inspeccion.id}}", description: "ID de la inspección", example: "INS-00123" },
    { name: "{{inspeccion.tipo_falla}}", description: "Tipo de falla", example: "dimensional" },
    { name: "{{inspeccion.severidad}}", description: "Severidad", example: "mayor" },
    { name: "{{inspeccion.cantidad_rechazada}}", description: "Cantidad rechazada", example: "25" },
    { name: "{{inspeccion.notas}}", description: "Descripción de la falla", example: "Fuera de tolerancia" },
    { name: "{{producto.id}}", description: "ID del producto", example: "PROD-00123" },
    { name: "{{producto.nombre}}", description: "Nombre del producto", example: "Widget Pro" },
    { name: "{{orden_produccion.id}}", description: "ID de la OP", example: "OP-00123" },
    { name: "{{linea.id}}", description: "ID de la línea", example: "LIN-001" },
    { name: "{{inspector.id}}", description: "ID del inspector", example: "USR-001" },
    { name: "{{inspector.nombre}}", description: "Nombre del inspector", example: "Juan Inspector" },
  ],
  maquina_parada: [
    { name: "{{maquina.id}}", description: "ID de la máquina", example: "MAQ-001" },
    { name: "{{maquina.nombre}}", description: "Nombre de la máquina", example: "Torno CNC 1" },
    { name: "{{maquina.linea}}", description: "Línea de producción", example: "Línea 1" },
    { name: "{{parada.motivo}}", description: "Motivo de la parada", example: "falla_mecanica" },
    { name: "{{parada.hora_inicio}}", description: "Hora de inicio", example: "14:30" },
    { name: "{{parada.duracion}}", description: "Duración (minutos)", example: "45" },
    { name: "{{parada.reportado_por}}", description: "Reportado por", example: "Operador X" },
    { name: "{{orden_produccion.id}}", description: "OP afectada", example: "OP-00123" },
  ],
  orden_produccion: [
    { name: "{{orden.id}}", description: "ID de la orden", example: "OP-00123" },
    { name: "{{orden.numero}}", description: "Número de OP", example: "OP-2024-001" },
    { name: "{{orden.estado}}", description: "Estado", example: "en_proceso" },
    { name: "{{orden.estado_anterior}}", description: "Estado anterior", example: "creada" },
    { name: "{{orden.cantidad}}", description: "Cantidad a producir", example: "500" },
    { name: "{{orden.prioridad}}", description: "Prioridad", example: "alta" },
    { name: "{{producto.id}}", description: "ID del producto", example: "PROD-00123" },
    { name: "{{producto.nombre}}", description: "Nombre del producto", example: "Widget Pro" },
    { name: "{{linea.id}}", description: "ID de la línea", example: "LIN-001" },
    { name: "{{linea.nombre}}", description: "Nombre de la línea", example: "Línea 1" },
  ],
  eficiencia_baja: [
    { name: "{{linea.id}}", description: "ID de la línea", example: "LIN-001" },
    { name: "{{linea.nombre}}", description: "Nombre de la línea", example: "Línea 1" },
    { name: "{{eficiencia.actual}}", description: "Eficiencia actual (%)", example: "72" },
    { name: "{{eficiencia.objetivo}}", description: "Eficiencia objetivo (%)", example: "85" },
    { name: "{{eficiencia.diferencia}}", description: "Diferencia (%)", example: "-13" },
    { name: "{{turno}}", description: "Turno", example: "Mañana" },
    { name: "{{supervisor.id}}", description: "ID del supervisor", example: "USR-001" },
    { name: "{{supervisor.nombre}}", description: "Nombre del supervisor", example: "Supervisor X" },
  ],
  // RRHH
  empleado_nuevo: [
    { name: "{{empleado.id}}", description: "ID del empleado", example: "EMP-00123" },
    { name: "{{empleado.nombre}}", description: "Nombre completo", example: "Carlos López" },
    { name: "{{empleado.email}}", description: "Email corporativo", example: "carlos@empresa.com" },
    { name: "{{empleado.cedula}}", description: "Cédula", example: "1234567890" },
    { name: "{{empleado.cargo}}", description: "Cargo", example: "Analista" },
    { name: "{{empleado.departamento}}", description: "Departamento", example: "Ventas" },
    { name: "{{empleado.fecha_ingreso}}", description: "Fecha de ingreso", example: "2024-01-15" },
    { name: "{{empleado.tipo_contrato}}", description: "Tipo de contrato", example: "indefinido" },
    { name: "{{empleado.salario}}", description: "Salario base", example: "3500000" },
    { name: "{{jefe.id}}", description: "ID del jefe directo", example: "EMP-001" },
    { name: "{{jefe.nombre}}", description: "Nombre del jefe", example: "María Gerente" },
    { name: "{{jefe.email}}", description: "Email del jefe", example: "maria@empresa.com" },
  ],
  cumpleanos_empleado: [
    { name: "{{empleado.id}}", description: "ID del empleado", example: "EMP-00123" },
    { name: "{{empleado.nombre}}", description: "Nombre", example: "Carlos López" },
    { name: "{{empleado.email}}", description: "Email", example: "carlos@empresa.com" },
    { name: "{{empleado.fecha_nacimiento}}", description: "Fecha de nacimiento", example: "1990-01-15" },
    { name: "{{empleado.edad}}", description: "Nueva edad", example: "34" },
    { name: "{{empleado.departamento}}", description: "Departamento", example: "Ventas" },
    { name: "{{empleado.cargo}}", description: "Cargo", example: "Analista" },
  ],
  solicitud_vacaciones: [
    { name: "{{solicitud.id}}", description: "ID de la solicitud", example: "VAC-00123" },
    { name: "{{solicitud.fecha_inicio}}", description: "Fecha inicio", example: "2024-02-01" },
    { name: "{{solicitud.fecha_fin}}", description: "Fecha fin", example: "2024-02-15" },
    { name: "{{solicitud.dias}}", description: "Días solicitados", example: "10" },
    { name: "{{solicitud.notas}}", description: "Notas", example: "Viaje familiar" },
    { name: "{{empleado.id}}", description: "ID del empleado", example: "EMP-00123" },
    { name: "{{empleado.nombre}}", description: "Nombre del empleado", example: "Carlos López" },
    { name: "{{empleado.dias_disponibles}}", description: "Días disponibles", example: "15" },
    { name: "{{jefe.id}}", description: "ID del jefe", example: "EMP-001" },
    { name: "{{jefe.nombre}}", description: "Nombre del jefe", example: "María Gerente" },
    { name: "{{jefe.email}}", description: "Email del jefe", example: "maria@empresa.com" },
  ],
  evaluacion_desempeno: [
    { name: "{{evaluacion.id}}", description: "ID de la evaluación", example: "EVAL-00123" },
    { name: "{{evaluacion.periodo}}", description: "Período evaluado", example: "Q1 2024" },
    { name: "{{evaluacion.puntaje}}", description: "Puntaje total", example: "4.2" },
    { name: "{{evaluacion.nivel}}", description: "Nivel de desempeño", example: "Sobresaliente" },
    { name: "{{evaluacion.fortalezas}}", description: "Fortalezas", example: "Liderazgo, comunicación" },
    { name: "{{evaluacion.areas_mejora}}", description: "Áreas de mejora", example: "Gestión del tiempo" },
    { name: "{{empleado.id}}", description: "ID del empleado", example: "EMP-00123" },
    { name: "{{empleado.nombre}}", description: "Nombre del empleado", example: "Carlos López" },
    { name: "{{evaluador.id}}", description: "ID del evaluador", example: "EMP-001" },
    { name: "{{evaluador.nombre}}", description: "Nombre del evaluador", example: "María Gerente" },
  ],
  incapacidad: [
    { name: "{{incapacidad.id}}", description: "ID de la incapacidad", example: "INC-00123" },
    { name: "{{incapacidad.tipo}}", description: "Tipo", example: "enfermedad_general" },
    { name: "{{incapacidad.dias}}", description: "Días de incapacidad", example: "5" },
    { name: "{{incapacidad.fecha_inicio}}", description: "Fecha inicio", example: "2024-01-15" },
    { name: "{{incapacidad.fecha_fin}}", description: "Fecha fin", example: "2024-01-20" },
    { name: "{{incapacidad.diagnostico}}", description: "Diagnóstico", example: "Gripa" },
    { name: "{{incapacidad.eps}}", description: "EPS", example: "Sura" },
    { name: "{{empleado.id}}", description: "ID del empleado", example: "EMP-00123" },
    { name: "{{empleado.nombre}}", description: "Nombre del empleado", example: "Carlos López" },
    { name: "{{empleado.cargo}}", description: "Cargo", example: "Analista" },
  ],
  fin_contrato: [
    { name: "{{contrato.id}}", description: "ID del contrato", example: "CON-00123" },
    { name: "{{contrato.tipo}}", description: "Tipo de contrato", example: "fijo" },
    { name: "{{contrato.fecha_fin}}", description: "Fecha de fin", example: "2024-02-28" },
    { name: "{{contrato.dias_restantes}}", description: "Días restantes", example: "15" },
    { name: "{{empleado.id}}", description: "ID del empleado", example: "EMP-00123" },
    { name: "{{empleado.nombre}}", description: "Nombre del empleado", example: "Carlos López" },
    { name: "{{empleado.cargo}}", description: "Cargo", example: "Analista" },
    { name: "{{empleado.departamento}}", description: "Departamento", example: "Ventas" },
    { name: "{{jefe.id}}", description: "ID del jefe", example: "EMP-001" },
    { name: "{{jefe.nombre}}", description: "Nombre del jefe", example: "María Gerente" },
  ],
  // POS
  venta_pos: [
    { name: "{{venta.id}}", description: "ID de la venta", example: "VPOS-00123" },
    { name: "{{venta.numero}}", description: "Número de ticket", example: "T-001234" },
    { name: "{{venta.total}}", description: "Total de la venta", example: "150000" },
    { name: "{{venta.subtotal}}", description: "Subtotal", example: "126050" },
    { name: "{{venta.iva}}", description: "IVA", example: "23950" },
    { name: "{{venta.items}}", description: "Productos vendidos", example: "[...]" },
    { name: "{{venta.items_count}}", description: "Cantidad de items", example: "5" },
    { name: "{{venta.metodo_pago}}", description: "Método de pago", example: "efectivo" },
    { name: "{{venta.cambio}}", description: "Cambio dado", example: "50000" },
    { name: "{{tienda.id}}", description: "ID de la tienda", example: "TDA-001" },
    { name: "{{tienda.nombre}}", description: "Nombre de la tienda", example: "Tienda Centro" },
    { name: "{{cajero.id}}", description: "ID del cajero", example: "CAJ-001" },
    { name: "{{cajero.nombre}}", description: "Nombre del cajero", example: "Pedro Cajero" },
    { name: "{{cliente.id}}", description: "ID del cliente", example: "CLI-00456" },
    { name: "{{cliente.nombre}}", description: "Nombre del cliente", example: "Juan Pérez" },
  ],
  cierre_caja: [
    { name: "{{cierre.id}}", description: "ID del cierre", example: "CIE-00123" },
    { name: "{{cierre.fecha}}", description: "Fecha del cierre", example: "2024-01-15" },
    { name: "{{cierre.total_ventas}}", description: "Total ventas", example: "5000000" },
    { name: "{{cierre.total_efectivo}}", description: "Total efectivo", example: "3000000" },
    { name: "{{cierre.total_tarjeta}}", description: "Total tarjeta", example: "2000000" },
    { name: "{{cierre.transacciones}}", description: "Número de transacciones", example: "85" },
    { name: "{{cierre.diferencia}}", description: "Diferencia en caja", example: "0" },
    { name: "{{tienda.id}}", description: "ID de la tienda", example: "TDA-001" },
    { name: "{{tienda.nombre}}", description: "Nombre de la tienda", example: "Tienda Centro" },
    { name: "{{cajero.id}}", description: "ID del cajero", example: "CAJ-001" },
    { name: "{{cajero.nombre}}", description: "Nombre del cajero", example: "Pedro Cajero" },
  ],
  faltante_caja: [
    { name: "{{faltante.id}}", description: "ID del faltante", example: "FAL-00123" },
    { name: "{{faltante.monto}}", description: "Monto del faltante", example: "50000" },
    { name: "{{faltante.fecha}}", description: "Fecha", example: "2024-01-15" },
    { name: "{{faltante.esperado}}", description: "Monto esperado", example: "3000000" },
    { name: "{{faltante.real}}", description: "Monto real", example: "2950000" },
    { name: "{{tienda.id}}", description: "ID de la tienda", example: "TDA-001" },
    { name: "{{tienda.nombre}}", description: "Nombre de la tienda", example: "Tienda Centro" },
    { name: "{{cajero.id}}", description: "ID del cajero", example: "CAJ-001" },
    { name: "{{cajero.nombre}}", description: "Nombre del cajero", example: "Pedro Cajero" },
  ],
  devolucion_pos: [
    { name: "{{devolucion.id}}", description: "ID de la devolución", example: "DEV-00123" },
    { name: "{{devolucion.monto}}", description: "Monto devuelto", example: "75000" },
    { name: "{{devolucion.motivo}}", description: "Motivo", example: "Producto defectuoso" },
    { name: "{{devolucion.items}}", description: "Productos devueltos", example: "[...]" },
    { name: "{{venta_original.id}}", description: "ID venta original", example: "VPOS-00100" },
    { name: "{{venta_original.fecha}}", description: "Fecha venta original", example: "2024-01-10" },
    { name: "{{tienda.id}}", description: "ID de la tienda", example: "TDA-001" },
    { name: "{{tienda.nombre}}", description: "Nombre de la tienda", example: "Tienda Centro" },
    { name: "{{cajero.id}}", description: "ID del cajero", example: "CAJ-001" },
    { name: "{{cajero.nombre}}", description: "Nombre del cajero", example: "Pedro Cajero" },
  ],
  // DIAN / Colombia
  factura_rechazada_dian: [
    { name: "{{factura.id}}", description: "ID de la factura", example: "FE-00001" },
    { name: "{{factura.numero}}", description: "Número de factura", example: "SETP990000001" },
    { name: "{{factura.total}}", description: "Total", example: "1500000" },
    { name: "{{rechazo.codigo}}", description: "Código de rechazo", example: "99" },
    { name: "{{rechazo.motivo}}", description: "Motivo del rechazo", example: "NIT inválido" },
    { name: "{{rechazo.detalle}}", description: "Detalle del error", example: "El NIT no existe en RUT" },
    { name: "{{rechazo.intentos}}", description: "Intentos realizados", example: "2" },
    { name: "{{cliente.id}}", description: "ID del cliente", example: "CLI-00456" },
    { name: "{{cliente.nombre}}", description: "Nombre del cliente", example: "Juan Pérez" },
    { name: "{{cliente.nit}}", description: "NIT del cliente", example: "900123456-1" },
  ],
  nota_credito: [
    { name: "{{nota.id}}", description: "ID de la nota", example: "NC-00123" },
    { name: "{{nota.numero}}", description: "Número de NC", example: "NC-2024-001" },
    { name: "{{nota.total}}", description: "Total de la nota", example: "500000" },
    { name: "{{nota.motivo}}", description: "Motivo", example: "devolucion" },
    { name: "{{nota.estado_dian}}", description: "Estado DIAN", example: "aprobada" },
    { name: "{{factura_original.id}}", description: "ID factura original", example: "FE-00001" },
    { name: "{{factura_original.numero}}", description: "Número factura original", example: "SETP990000001" },
    { name: "{{cliente.id}}", description: "ID del cliente", example: "CLI-00456" },
    { name: "{{cliente.nombre}}", description: "Nombre del cliente", example: "Juan Pérez" },
  ],
  // Programación
  programado: [
    { name: "{{ejecucion.id}}", description: "ID de la ejecución", example: "EXEC-00123" },
    { name: "{{ejecucion.fecha}}", description: "Fecha de ejecución", example: "2024-01-15" },
    { name: "{{ejecucion.hora}}", description: "Hora de ejecución", example: "08:00" },
    { name: "{{ejecucion.tipo}}", description: "Tipo de ejecución", example: "recurrente" },
    { name: "{{ejecucion.frecuencia}}", description: "Frecuencia", example: "diario" },
  ],
  webhook_entrada: [
    { name: "{{webhook.id}}", description: "ID del webhook", example: "WH-00123" },
    { name: "{{webhook.nombre}}", description: "Nombre del webhook", example: "stripe-webhook" },
    { name: "{{webhook.metodo}}", description: "Método HTTP", example: "POST" },
    { name: "{{webhook.headers}}", description: "Headers recibidos", example: "{...}" },
    { name: "{{webhook.body}}", description: "Body recibido", example: "{...}" },
    { name: "{{webhook.ip}}", description: "IP de origen", example: "192.168.1.1" },
    { name: "{{webhook.timestamp}}", description: "Timestamp", example: "2024-01-15T10:30:00Z" },
  ],
  evento_sistema: [
    { name: "{{evento.tipo}}", description: "Tipo de evento", example: "login" },
    { name: "{{evento.fecha}}", description: "Fecha del evento", example: "2024-01-15" },
    { name: "{{evento.hora}}", description: "Hora del evento", example: "10:30:00" },
    { name: "{{evento.detalle}}", description: "Detalle", example: "Login exitoso" },
    { name: "{{usuario.id}}", description: "ID del usuario", example: "USR-001" },
    { name: "{{usuario.nombre}}", description: "Nombre del usuario", example: "Admin" },
    { name: "{{usuario.ip}}", description: "IP del usuario", example: "192.168.1.100" },
  ],
  // Logic nodes variables
  condition: [
    { name: "{{resultado}}", description: "Resultado de la condición", example: "true" },
    { name: "{{valor_evaluado}}", description: "Valor que se evaluó", example: "1500000" },
  ],
  delay: [
    { name: "{{tiempo_esperado}}", description: "Tiempo de espera configurado", example: "5 minutos" },
    { name: "{{hora_continuacion}}", description: "Hora de continuación", example: "10:35:00" },
  ],
  loop: [
    { name: "{{item}}", description: "Elemento actual del loop", example: "{...}" },
    { name: "{{index}}", description: "Índice actual", example: "0" },
    { name: "{{total}}", description: "Total de elementos", example: "10" },
    { name: "{{es_primero}}", description: "Es el primer elemento", example: "true" },
    { name: "{{es_ultimo}}", description: "Es el último elemento", example: "false" },
  ],
  filter: [
    { name: "{{items_filtrados}}", description: "Elementos que pasaron el filtro", example: "[...]" },
    { name: "{{count_filtrados}}", description: "Cantidad filtrada", example: "5" },
    { name: "{{count_original}}", description: "Cantidad original", example: "10" },
  ],
  transform: [
    { name: "{{resultado}}", description: "Resultado de la transformación", example: "{...}" },
    { name: "{{entrada}}", description: "Datos de entrada", example: "{...}" },
  ],
  // Action output variables
  enviar_email: [
    { name: "{{email.enviado}}", description: "Email fue enviado", example: "true" },
    { name: "{{email.message_id}}", description: "ID del mensaje", example: "msg-123" },
  ],
  enviar_sms: [
    { name: "{{sms.enviado}}", description: "SMS fue enviado", example: "true" },
    { name: "{{sms.message_id}}", description: "ID del mensaje", example: "sms-123" },
  ],
  enviar_whatsapp: [
    { name: "{{whatsapp.enviado}}", description: "Mensaje fue enviado", example: "true" },
    { name: "{{whatsapp.message_id}}", description: "ID del mensaje", example: "wamid.123" },
  ],
  crear_registro: [
    { name: "{{registro.id}}", description: "ID del registro creado", example: "NEW-123" },
    { name: "{{registro.creado}}", description: "Registro fue creado", example: "true" },
  ],
  actualizar_registro: [
    { name: "{{registro.actualizado}}", description: "Registro fue actualizado", example: "true" },
    { name: "{{registro.campos_modificados}}", description: "Campos modificados", example: "['estado']" },
  ],
  generar_pdf: [
    { name: "{{pdf.url}}", description: "URL del PDF generado", example: "https://..." },
    { name: "{{pdf.nombre}}", description: "Nombre del archivo", example: "factura.pdf" },
    { name: "{{pdf.tamano}}", description: "Tamaño en bytes", example: "125000" },
  ],
  crear_factura: [
    { name: "{{factura.id}}", description: "ID de la factura creada", example: "FE-00001" },
    { name: "{{factura.numero}}", description: "Número de factura", example: "SETP990000001" },
    { name: "{{factura.cufe}}", description: "CUFE generado", example: "abc123..." },
    { name: "{{factura.estado_dian}}", description: "Estado DIAN", example: "aprobada" },
  ],
  webhook_out: [
    { name: "{{respuesta.status}}", description: "Código de estado HTTP", example: "200" },
    { name: "{{respuesta.body}}", description: "Body de la respuesta", example: "{...}" },
    { name: "{{respuesta.exitoso}}", description: "Fue exitoso", example: "true" },
  ],
  llamar_api: [
    { name: "{{api.status}}", description: "Código de estado HTTP", example: "200" },
    { name: "{{api.body}}", description: "Body de la respuesta", example: "{...}" },
    { name: "{{api.headers}}", description: "Headers de respuesta", example: "{...}" },
    { name: "{{api.tiempo_respuesta}}", description: "Tiempo de respuesta (ms)", example: "250" },
  ],
  openai_gpt: [
    { name: "{{ai.respuesta}}", description: "Respuesta del modelo", example: "El análisis indica..." },
    { name: "{{ai.tokens_usados}}", description: "Tokens utilizados", example: "150" },
    { name: "{{ai.modelo}}", description: "Modelo utilizado", example: "gpt-4" },
  ],
}

// Node configurations for all triggers, conditions, and actions
const nodeConfigs: Record<
  string,
  {
    fields: Array<{
      id: string
      label: string
      type: string
      options?: string[]
      placeholder?: string
      defaultValue?: string | number | boolean
    }>
  }
> = {
  // Ventas & CRM
  nuevo_pedido: {
    fields: [
      { id: "modulo", label: "Módulo origen", type: "select", options: ["E-Commerce", "POS", "Ventas", "Todos"] },
      {
        id: "estado",
        label: "Estado del pedido",
        type: "select",
        options: ["Cualquiera", "Pendiente", "Confirmado", "En proceso"],
      },
      { id: "monto_minimo", label: "Monto mínimo ($)", type: "number", placeholder: "0" },
      {
        id: "cliente_tipo",
        label: "Tipo de cliente",
        type: "select",
        options: ["Todos", "Nuevo", "Recurrente", "VIP"],
      },
    ],
  },
  factura_creada: {
    fields: [
      {
        id: "tipo_factura",
        label: "Tipo de factura",
        type: "select",
        options: ["Todas", "Venta", "Exportación", "Contingencia"],
      },
      { id: "monto_minimo", label: "Monto mínimo ($)", type: "number", placeholder: "0" },
      { id: "incluir_iva", label: "Solo con IVA", type: "switch", defaultValue: false },
    ],
  },
  cliente_nuevo: {
    fields: [
      {
        id: "tipo_cliente",
        label: "Tipo de cliente",
        type: "select",
        options: ["Todos", "Persona natural", "Empresa", "Extranjero"],
      },
      { id: "canal", label: "Canal de registro", type: "select", options: ["Todos", "Web", "POS", "App", "Manual"] },
    ],
  },
  pago_recibido: {
    fields: [
      {
        id: "metodo_pago",
        label: "Método de pago",
        type: "select",
        options: ["Todos", "Efectivo", "Tarjeta", "Transferencia", "PSE", "Nequi", "Daviplata"],
      },
      { id: "monto_minimo", label: "Monto mínimo ($)", type: "number", placeholder: "0" },
      { id: "confirmar_auto", label: "Solo confirmados", type: "switch", defaultValue: true },
    ],
  },
  cotizacion_creada: {
    fields: [
      { id: "vendedor", label: "Vendedor", type: "select", options: ["Todos", "Asignado a mí", "Mi equipo"] },
      { id: "monto_minimo", label: "Monto mínimo ($)", type: "number", placeholder: "0" },
      { id: "probabilidad", label: "Probabilidad mín. (%)", type: "slider", defaultValue: 0 },
    ],
  },
  cliente_inactivo: {
    fields: [
      { id: "dias_inactividad", label: "Días sin comprar", type: "number", placeholder: "90" },
      { id: "monto_historico", label: "Monto histórico mínimo ($)", type: "number", placeholder: "0" },
      { id: "segmento", label: "Segmento", type: "select", options: ["Todos", "VIP", "Premium", "Regular", "Nuevo"] },
    ],
  },
  meta_cumplida: {
    fields: [
      {
        id: "tipo_meta",
        label: "Tipo de meta",
        type: "select",
        options: ["Ventas", "Unidades", "Clientes nuevos", "Llamadas", "Margen"],
      },
      {
        id: "periodo",
        label: "Periodo",
        type: "select",
        options: ["Diario", "Semanal", "Mensual", "Trimestral", "Anual"],
      },
      { id: "porcentaje", label: "% de cumplimiento", type: "slider", defaultValue: 100 },
    ],
  },
  oportunidad_perdida: {
    fields: [
      {
        id: "motivo",
        label: "Motivo",
        type: "select",
        options: ["Todos", "Precio", "Competencia", "Sin respuesta", "Otro"],
      },
      { id: "monto_minimo", label: "Monto mínimo ($)", type: "number", placeholder: "0" },
    ],
  },
  // Inventario
  stock_bajo: {
    fields: [
      {
        id: "bodega",
        label: "Bodega",
        type: "select",
        options: ["Todas", "Principal", "Secundaria", "Producción", "Tienda"],
      },
      { id: "porcentaje", label: "% debajo del mínimo", type: "slider", defaultValue: 20 },
      {
        id: "categoria",
        label: "Categoría producto",
        type: "select",
        options: ["Todas", "Materia prima", "Producto terminado", "Insumos", "Empaque"],
      },
      { id: "proveedor", label: "Proveedor específico", type: "text", placeholder: "Todos" },
    ],
  },
  lote_vencimiento: {
    fields: [
      { id: "dias_antes", label: "Días antes de vencer", type: "number", placeholder: "30" },
      {
        id: "bodega",
        label: "Bodega",
        type: "select",
        options: ["Todas", "Principal", "Secundaria", "Refrigerado", "Congelado"],
      },
      {
        id: "categoria",
        label: "Categoría",
        type: "select",
        options: ["Todas", "Alimentos", "Medicamentos", "Químicos", "Cosméticos"],
      },
    ],
  },
  transferencia_creada: {
    fields: [
      {
        id: "bodega_origen",
        label: "Bodega origen",
        type: "select",
        options: ["Todas", "Principal", "Secundaria", "Producción"],
      },
      {
        id: "bodega_destino",
        label: "Bodega destino",
        type: "select",
        options: ["Todas", "Principal", "Secundaria", "Tienda"],
      },
      { id: "requiere_aprobacion", label: "Requiere aprobación", type: "switch", defaultValue: false },
    ],
  },
  recepcion_mercancia: {
    fields: [
      { id: "proveedor", label: "Proveedor", type: "text", placeholder: "Todos" },
      { id: "verificar_calidad", label: "Verificar calidad", type: "switch", defaultValue: true },
    ],
  },
  ajuste_inventario: {
    fields: [
      { id: "tipo", label: "Tipo ajuste", type: "select", options: ["Todos", "Entrada", "Salida", "Daño", "Pérdida"] },
      { id: "monto_minimo", label: "Valor mínimo ($)", type: "number", placeholder: "0" },
    ],
  },
  // Contabilidad
  factura_vencida: {
    fields: [
      { id: "dias_vencida", label: "Días vencida", type: "number", placeholder: "1" },
      { id: "monto_minimo", label: "Monto mínimo ($)", type: "number", placeholder: "0" },
      { id: "auto_recordatorio", label: "Enviar recordatorio auto", type: "switch", defaultValue: true },
      { id: "cliente_tipo", label: "Tipo cliente", type: "select", options: ["Todos", "Regular", "VIP", "Nuevo"] },
    ],
  },
  movimiento_bancario: {
    fields: [
      {
        id: "banco",
        label: "Banco",
        type: "select",
        options: ["Todos", "Bancolombia", "Davivienda", "BBVA", "Bogotá", "Occidente", "Popular"],
      },
      { id: "tipo", label: "Tipo", type: "select", options: ["Todos", "Crédito", "Débito"] },
      { id: "monto_minimo", label: "Monto mínimo ($)", type: "number", placeholder: "0" },
      { id: "concepto", label: "Concepto contiene", type: "text", placeholder: "" },
    ],
  },
  presupuesto_excedido: {
    fields: [
      {
        id: "area",
        label: "Área",
        type: "select",
        options: ["Todas", "Ventas", "Marketing", "Operaciones", "RRHH", "IT", "Admin"],
      },
      { id: "porcentaje", label: "% de exceso", type: "slider", defaultValue: 100 },
      { id: "periodo", label: "Periodo", type: "select", options: ["Mensual", "Trimestral", "Anual"] },
    ],
  },
  conciliacion_diferencia: {
    fields: [
      { id: "banco", label: "Banco", type: "select", options: ["Todos", "Bancolombia", "Davivienda", "BBVA"] },
      { id: "monto_diferencia", label: "Diferencia mínima ($)", type: "number", placeholder: "1000" },
    ],
  },
  cierre_contable: {
    fields: [
      { id: "periodo", label: "Periodo", type: "select", options: ["Mensual", "Trimestral", "Anual"] },
      { id: "generar_reportes", label: "Generar reportes auto", type: "switch", defaultValue: true },
    ],
  },
  // Compras
  orden_compra: {
    fields: [
      { id: "monto_minimo", label: "Monto mínimo ($)", type: "number", placeholder: "0" },
      { id: "proveedor", label: "Proveedor", type: "text", placeholder: "Todos" },
      { id: "requiere_aprobacion", label: "Requiere aprobación", type: "switch", defaultValue: true },
      { id: "urgente", label: "Solo urgentes", type: "switch", defaultValue: false },
    ],
  },
  retraso_entrega: {
    fields: [
      { id: "dias_retraso", label: "Días de retraso", type: "number", placeholder: "1" },
      { id: "notificar_proveedor", label: "Notificar proveedor", type: "switch", defaultValue: true },
      { id: "escalar_gerencia", label: "Escalar a gerencia", type: "switch", defaultValue: false },
    ],
  },
  proveedor_evaluacion: {
    fields: [
      { id: "puntaje_minimo", label: "Puntaje mínimo", type: "slider", defaultValue: 70 },
      {
        id: "criterio",
        label: "Criterio",
        type: "select",
        options: ["Todos", "Calidad", "Tiempo", "Precio", "Servicio"],
      },
    ],
  },
  requisicion_aprobada: {
    fields: [
      {
        id: "area",
        label: "Área solicitante",
        type: "select",
        options: ["Todas", "Producción", "Ventas", "Admin", "IT"],
      },
      { id: "monto_minimo", label: "Monto mínimo ($)", type: "number", placeholder: "0" },
    ],
  },
  // Producción
  produccion_completa: {
    fields: [
      {
        id: "linea",
        label: "Línea de producción",
        type: "select",
        options: ["Todas", "Línea 1", "Línea 2", "Línea 3", "Línea 4"],
      },
      { id: "calidad_ok", label: "Solo si pasa calidad", type: "switch", defaultValue: true },
      { id: "producto", label: "Producto específico", type: "text", placeholder: "Todos" },
    ],
  },
  calidad_falla: {
    fields: [
      {
        id: "tipo_falla",
        label: "Tipo falla",
        type: "select",
        options: ["Todas", "Dimensional", "Visual", "Funcional", "Empaque", "Contaminación"],
      },
      { id: "severidad", label: "Severidad", type: "select", options: ["Todas", "Menor", "Mayor", "Crítica"] },
      { id: "detener_linea", label: "Detener línea auto", type: "switch", defaultValue: false },
    ],
  },
  maquina_parada: {
    fields: [
      { id: "maquina", label: "Máquina", type: "text", placeholder: "Todas" },
      {
        id: "motivo",
        label: "Motivo",
        type: "select",
        options: ["Todos", "Falla mecánica", "Falla eléctrica", "Mantenimiento", "Falta material", "Cambio producto"],
      },
      { id: "tiempo_minimo", label: "Tiempo mínimo (min)", type: "number", placeholder: "5" },
    ],
  },
  orden_produccion: {
    fields: [
      { id: "estado", label: "Estado", type: "select", options: ["Creada", "En proceso", "Completada", "Cancelada"] },
      { id: "prioridad", label: "Prioridad", type: "select", options: ["Todas", "Normal", "Alta", "Urgente"] },
    ],
  },
  eficiencia_baja: {
    fields: [
      { id: "linea", label: "Línea", type: "select", options: ["Todas", "Línea 1", "Línea 2", "Línea 3"] },
      { id: "porcentaje", label: "Eficiencia menor a (%)", type: "slider", defaultValue: 80 },
    ],
  },
  // RRHH
  empleado_nuevo: {
    fields: [
      {
        id: "departamento",
        label: "Departamento",
        type: "select",
        options: ["Todos", "Ventas", "Operaciones", "Admin", "IT", "RRHH", "Finanzas"],
      },
      { id: "crear_usuario", label: "Crear usuario sistema", type: "switch", defaultValue: true },
      {
        id: "tipo_contrato",
        label: "Tipo contrato",
        type: "select",
        options: ["Todos", "Indefinido", "Fijo", "Obra labor", "Aprendizaje"],
      },
    ],
  },
  cumpleanos_empleado: {
    fields: [
      { id: "dias_antes", label: "Días antes notificar", type: "number", placeholder: "1" },
      { id: "enviar_felicitacion", label: "Enviar felicitación auto", type: "switch", defaultValue: true },
      { id: "incluir_bono", label: "Incluir bono", type: "switch", defaultValue: false },
    ],
  },
  solicitud_vacaciones: {
    fields: [
      { id: "dias_minimos", label: "Días mínimos solicitados", type: "number", placeholder: "1" },
      { id: "requiere_aprobacion", label: "Requiere aprobación jefe", type: "switch", defaultValue: true },
      { id: "anticipacion", label: "Días anticipación mín.", type: "number", placeholder: "15" },
    ],
  },
  evaluacion_desempeno: {
    fields: [
      { id: "periodo", label: "Periodo", type: "select", options: ["Mensual", "Trimestral", "Semestral", "Anual"] },
      { id: "puntaje_minimo", label: "Puntaje mínimo", type: "slider", defaultValue: 0 },
    ],
  },
  incapacidad: {
    fields: [
      { id: "dias_minimos", label: "Días mínimos", type: "number", placeholder: "1" },
      {
        id: "tipo",
        label: "Tipo",
        type: "select",
        options: ["Todas", "Enfermedad general", "Accidente trabajo", "Maternidad", "Paternidad"],
      },
    ],
  },
  fin_contrato: {
    fields: [
      { id: "dias_antes", label: "Días antes de vencer", type: "number", placeholder: "30" },
      {
        id: "tipo_contrato",
        label: "Tipo contrato",
        type: "select",
        options: ["Todos", "Fijo", "Obra labor", "Aprendizaje"],
      },
    ],
  },
  // POS
  venta_pos: {
    fields: [
      {
        id: "tienda",
        label: "Tienda",
        type: "select",
        options: ["Todas", "Tienda 1", "Tienda 2", "Tienda 3", "Tienda 4", "Tienda 5"],
      },
      { id: "monto_minimo", label: "Monto mínimo ($)", type: "number", placeholder: "0" },
      { id: "metodo_pago", label: "Método pago", type: "select", options: ["Todos", "Efectivo", "Tarjeta", "Mixto"] },
    ],
  },
  cierre_caja: {
    fields: [
      { id: "tienda", label: "Tienda", type: "select", options: ["Todas", "Tienda 1", "Tienda 2", "Tienda 3"] },
      { id: "generar_reporte", label: "Generar reporte automático", type: "switch", defaultValue: true },
      { id: "enviar_supervisor", label: "Enviar a supervisor", type: "switch", defaultValue: true },
    ],
  },
  faltante_caja: {
    fields: [
      { id: "monto_minimo", label: "Monto mínimo ($)", type: "number", placeholder: "1000" },
      { id: "notificar_supervisor", label: "Notificar supervisor", type: "switch", defaultValue: true },
      { id: "bloquear_cajero", label: "Bloquear cajero", type: "switch", defaultValue: false },
    ],
  },
  devolucion_pos: {
    fields: [
      { id: "monto_minimo", label: "Monto mínimo ($)", type: "number", placeholder: "0" },
      { id: "requiere_aprobacion", label: "Requiere aprobación", type: "switch", defaultValue: true },
    ],
  },
  // DIAN / Colombia
  factura_rechazada_dian: {
    fields: [
      {
        id: "motivo",
        label: "Motivo",
        type: "select",
        options: ["Todos", "NIT inválido", "Fecha inválida", "Consecutivo", "Firma inválida"],
      },
      { id: "reintentar_auto", label: "Reintentar automático", type: "switch", defaultValue: true },
    ],
  },
  nota_credito: {
    fields: [
      { id: "monto_minimo", label: "Monto mínimo ($)", type: "number", placeholder: "0" },
      {
        id: "motivo",
        label: "Motivo",
        type: "select",
        options: ["Todos", "Devolución", "Descuento", "Anulación", "Corrección"],
      },
    ],
  },
  // Programación
  programado: {
    fields: [
      { id: "tipo", label: "Tipo", type: "select", options: ["Una vez", "Recurrente"] },
      {
        id: "frecuencia",
        label: "Frecuencia",
        type: "select",
        options: ["Cada 5 min", "Cada 15 min", "Cada hora", "Diario", "Semanal", "Mensual"],
      },
      { id: "hora", label: "Hora de ejecución", type: "text", placeholder: "08:00" },
      { id: "dias", label: "Días (para semanal)", type: "text", placeholder: "Lun, Mie, Vie" },
      {
        id: "zona_horaria",
        label: "Zona horaria",
        type: "select",
        options: ["America/Bogota", "UTC", "America/New_York"],
      },
    ],
  },
  webhook_entrada: {
    fields: [
      { id: "nombre", label: "Nombre del webhook", type: "text", placeholder: "mi-webhook" },
      { id: "metodo", label: "Método HTTP", type: "select", options: ["POST", "GET", "PUT", "PATCH", "DELETE"] },
      { id: "autenticacion", label: "Requiere autenticación", type: "switch", defaultValue: true },
      { id: "secret", label: "Secret key", type: "text", placeholder: "Se genera automáticamente" },
    ],
  },
  evento_sistema: {
    fields: [
      {
        id: "tipo",
        label: "Tipo evento",
        type: "select",
        options: ["Login", "Logout", "Error", "Alerta", "Backup", "Actualización"],
      },
      { id: "usuario", label: "Usuario específico", type: "text", placeholder: "Todos" },
    ],
  },
  // Logic nodes
  condition: {
    fields: [
      { id: "campo", label: "Campo a evaluar", type: "text", placeholder: "Ej: monto, estado, cliente.tipo" },
      {
        id: "operador",
        label: "Operador",
        type: "select",
        options: [
          "==",
          "!=",
          ">",
          "<",
          ">=",
          "<=",
          "contiene",
          "no contiene",
          "está vacío",
          "no está vacío",
          "empieza con",
          "termina con",
        ],
      },
      { id: "valor", label: "Valor", type: "text", placeholder: "Valor a comparar" },
      { id: "case_sensitive", label: "Sensible a mayúsculas", type: "switch", defaultValue: false },
    ],
  },
  switch_case: {
    fields: [
      { id: "campo", label: "Campo a evaluar", type: "text", placeholder: "Ej: estado, tipo, categoria" },
      { id: "casos", label: "Número de casos", type: "number", placeholder: "3" },
      { id: "caso_1", label: "Caso 1", type: "text", placeholder: "valor1" },
      { id: "caso_2", label: "Caso 2", type: "text", placeholder: "valor2" },
      { id: "caso_3", label: "Caso 3", type: "text", placeholder: "valor3" },
    ],
  },
  delay: {
    fields: [
      { id: "tiempo", label: "Tiempo de espera", type: "number", placeholder: "5" },
      { id: "unidad", label: "Unidad", type: "select", options: ["Segundos", "Minutos", "Horas", "Días", "Semanas"] },
      { id: "continuar_horario", label: "Solo en horario laboral", type: "switch", defaultValue: false },
    ],
  },
  loop: {
    fields: [
      {
        id: "tipo",
        label: "Tipo de loop",
        type: "select",
        options: ["Por cada elemento", "Mientras condición", "Número fijo", "Hasta que"],
      },
      { id: "coleccion", label: "Colección/Variable", type: "text", placeholder: "Ej: items, productos, clientes" },
      { id: "max_iteraciones", label: "Máx. iteraciones", type: "number", placeholder: "100" },
      { id: "delay_entre", label: "Delay entre iteraciones (ms)", type: "number", placeholder: "0" },
    ],
  },
  filter: {
    fields: [
      { id: "campo", label: "Campo a filtrar", type: "text", placeholder: "Ej: monto, fecha, estado" },
      {
        id: "operador",
        label: "Operador",
        type: "select",
        options: ["==", "!=", ">", "<", ">=", "<=", "contiene", "no contiene", "in", "not in"],
      },
      { id: "valor", label: "Valor", type: "text", placeholder: "Valor del filtro" },
      { id: "multiple", label: "Permitir múltiples", type: "switch", defaultValue: true },
    ],
  },
  merge: {
    fields: [
      {
        id: "modo",
        label: "Modo de merge",
        type: "select",
        options: ["Esperar todos", "Primero que llegue", "Combinar datos", "Último que llegue"],
      },
      { id: "timeout", label: "Timeout (segundos)", type: "number", placeholder: "60" },
      {
        id: "accion_timeout",
        label: "Acción en timeout",
        type: "select",
        options: ["Continuar parcial", "Error", "Ignorar"],
      },
    ],
  },
  transform: {
    fields: [
      {
        id: "tipo",
        label: "Tipo transformación",
        type: "select",
        options: ["Mapear campos", "Convertir tipo", "Extraer valor", "Formato fecha", "Calcular", "Template"],
      },
      { id: "entrada", label: "Campo entrada", type: "text", placeholder: "data.campo" },
      { id: "expresion", label: "Expresión/Template", type: "text", placeholder: "Ej: {{nombre}} - {{fecha}}" },
      { id: "salida", label: "Campo salida", type: "text", placeholder: "resultado" },
    ],
  },
  error_handler: {
    fields: [
      {
        id: "accion",
        label: "Acción en error",
        type: "select",
        options: ["Reintentar", "Continuar", "Detener", "Notificar", "Ruta alternativa"],
      },
      { id: "reintentos", label: "Número de reintentos", type: "number", placeholder: "3" },
      { id: "delay_reintento", label: "Delay entre reintentos (seg)", type: "number", placeholder: "5" },
      { id: "notificar_email", label: "Email notificación", type: "text", placeholder: "admin@empresa.com" },
      { id: "log_error", label: "Guardar log detallado", type: "switch", defaultValue: true },
    ],
  },
  wait_approval: {
    fields: [
      {
        id: "aprobadores",
        label: "Aprobadores (emails)",
        type: "text",
        placeholder: "email1@empresa.com, email2@empresa.com",
      },
      { id: "minimo_aprobaciones", label: "Mín. aprobaciones", type: "number", placeholder: "1" },
      { id: "timeout", label: "Timeout (horas)", type: "number", placeholder: "24" },
      {
        id: "accion_timeout",
        label: "Acción en timeout",
        type: "select",
        options: ["Rechazar", "Aprobar", "Escalar", "Recordar"],
      },
      { id: "mensaje", label: "Mensaje para aprobador", type: "text", placeholder: "Por favor revise y apruebe" },
    ],
  },
  set_variable: {
    fields: [
      { id: "nombre", label: "Nombre variable", type: "text", placeholder: "Ej: total, contador, resultado" },
      { id: "valor", label: "Valor/Expresión", type: "text", placeholder: "Valor o expresión" },
      {
        id: "tipo",
        label: "Tipo",
        type: "select",
        options: ["String", "Number", "Boolean", "Array", "Object", "Date"],
      },
      { id: "scope", label: "Alcance", type: "select", options: ["Local", "Global", "Sesión"] },
    ],
  },
  parallel: {
    fields: [
      { id: "ramas", label: "Número de ramas", type: "number", placeholder: "2" },
      { id: "esperar_todas", label: "Esperar todas las ramas", type: "switch", defaultValue: true },
    ],
  },
  sub_flow: {
    fields: [
      { id: "flujo", label: "Flujo a ejecutar", type: "select", options: ["Seleccionar flujo..."] },
      { id: "parametros", label: "Parámetros (JSON)", type: "text", placeholder: '{"param1": "valor"}' },
      { id: "asincrono", label: "Ejecutar asíncrono", type: "switch", defaultValue: false },
    ],
  },
  // Actions
  enviar_email: {
    fields: [
      { id: "destinatario", label: "Destinatario", type: "text", placeholder: "email@ejemplo.com o {{cliente.email}}" },
      { id: "cc", label: "CC", type: "text", placeholder: "email@ejemplo.com" },
      { id: "asunto", label: "Asunto", type: "text", placeholder: "Asunto del correo" },
      {
        id: "plantilla",
        label: "Plantilla",
        type: "select",
        options: ["Ninguna", "Bienvenida", "Factura", "Recordatorio", "Confirmación", "Cotización", "Personalizada"],
      },
      { id: "adjuntar_pdf", label: "Adjuntar PDF", type: "switch", defaultValue: false },
      { id: "rastrear_apertura", label: "Rastrear apertura", type: "switch", defaultValue: true },
    ],
  },
  enviar_sms: {
    fields: [
      { id: "telefono", label: "Teléfono", type: "text", placeholder: "+573001234567 o {{cliente.telefono}}" },
      { id: "mensaje", label: "Mensaje (160 chars)", type: "text", placeholder: "Texto del SMS" },
      { id: "proveedor", label: "Proveedor", type: "select", options: ["Twilio", "AWS SNS", "Infobip", "MessageBird"] },
    ],
  },
  enviar_whatsapp: {
    fields: [
      { id: "telefono", label: "Teléfono", type: "text", placeholder: "+573001234567 o {{cliente.telefono}}" },
      {
        id: "plantilla",
        label: "Plantilla aprobada",
        type: "select",
        options: ["Confirmación pedido", "Envío", "Factura", "Recordatorio pago", "Promoción", "Bienvenida"],
      },
      { id: "variables", label: "Variables (JSON)", type: "text", placeholder: '{"1": "valor1", "2": "valor2"}' },
      { id: "adjuntar_archivo", label: "Adjuntar archivo", type: "switch", defaultValue: false },
    ],
  },
  enviar_telegram: {
    fields: [
      { id: "chat_id", label: "Chat ID", type: "text", placeholder: "ID del chat o usuario" },
      { id: "mensaje", label: "Mensaje", type: "text", placeholder: "Texto del mensaje" },
      { id: "adjunto_url", label: "URL Adjunto", type: "text", placeholder: "URL del archivo" },
    ],
  },
  llamada_automatica: {
    fields: [
      { id: "telefono", label: "Teléfono", type: "text", placeholder: "+573001234567" },
      { id: "mensaje_voz", label: "Mensaje de voz", type: "text", placeholder: "Su factura ha vencido..." },
      { id: "audio_personalizado", label: "Archivo Audio (MP3)", type: "text", placeholder: "URL del audio" },
      { id: "intentos", label: "Intentos", type: "number", placeholder: "3" },
      { id: "silence_timeout", label: "Timeout silencio (seg)", type: "number", placeholder: "5" },
    ],
  },
  enviar_fax: {
    fields: [
      { id: "numero_fax", label: "Número de Fax", type: "text", placeholder: "+15551234567" },
      { id: "documento_pdf", label: "Documento PDF", type: "text", placeholder: "URL o ID del PDF" },
      { id: "asunto", label: "Asunto", type: "text", placeholder: "Documento importante" },
    ],
  },
  notificacion_interna: {
    fields: [
      { id: "usuario_id", label: "ID Usuario", type: "text", placeholder: "{{usuario.id}}" },
      { id: "titulo", label: "Título", type: "text", placeholder: "Recordatorio Importante" },
      { id: "mensaje", label: "Mensaje", type: "text", placeholder: "Favor revisar la tarea asignada" },
      {
        id: "prioridad",
        label: "Prioridad",
        type: "select",
        options: ["Normal", "Alta", "Urgente"],
        defaultValue: "Normal",
      },
    ],
  },
  crear_tarea: {
    fields: [
      { id: "titulo", label: "Título", type: "text", placeholder: "Título de la tarea" },
      { id: "descripcion", label: "Descripción", type: "text", placeholder: "Detalles de la tarea" },
      {
        id: "asignado",
        label: "Asignado a",
        type: "select",
        options: ["Yo", "Mi equipo", "Usuario específico", "Rol", "Round robin"],
      },
      { id: "prioridad", label: "Prioridad", type: "select", options: ["Baja", "Media", "Alta", "Urgente"] },
      { id: "fecha_limite", label: "Días para vencer", type: "number", placeholder: "3" },
      { id: "recordatorio", label: "Recordatorio (horas antes)", type: "number", placeholder: "24" },
    ],
  },
  actualizar_registro: {
    fields: [
      {
        id: "entidad",
        label: "Entidad",
        type: "select",
        options: ["Cliente", "Pedido", "Producto", "Factura", "Proveedor", "Empleado", "Proyecto", "Tarea"],
      },
      { id: "filtro_id", label: "ID o filtro", type: "text", placeholder: "{{id}} o campo:valor" },
      { id: "campo", label: "Campo", type: "text", placeholder: "Ej: estado, notas, etiquetas" },
      { id: "valor", label: "Nuevo valor", type: "text", placeholder: "Valor o {{variable}}" },
      { id: "crear_si_no_existe", label: "Crear si no existe", type: "switch", defaultValue: false },
    ],
  },
  crear_registro: {
    fields: [
      {
        id: "entidad",
        label: "Entidad",
        type: "select",
        options: ["Cliente", "Pedido", "Producto", "Factura", "Tarea", "Nota", "Lead", "Oportunidad", "Proyecto"],
      },
      { id: "datos", label: "Datos (JSON)", type: "text", placeholder: '{"campo": "{{valor}}"}' },
      { id: "duplicados", label: "Permitir duplicados", type: "switch", defaultValue: false },
    ],
  },
  generar_pdf: {
    fields: [
      {
        id: "plantilla",
        label: "Plantilla",
        type: "select",
        options: ["Factura", "Cotización", "Reporte", "Contrato", "Certificado", "Orden compra", "Remisión"],
      },
      { id: "formato", label: "Formato", type: "select", options: ["A4", "Carta", "Oficio", "Media carta"] },
      {
        id: "guardar_en",
        label: "Guardar en",
        type: "select",
        options: ["Documentos", "Adjunto registro", "Enviar por email", "Retornar URL"],
      },
      { id: "nombre_archivo", label: "Nombre archivo", type: "text", placeholder: "documento_{{id}}.pdf" },
    ],
  },
  crear_factura: {
    fields: [
      { id: "tipo", label: "Tipo factura", type: "select", options: ["Venta", "Exportación", "Contingencia", "POS"] },
      { id: "enviar_dian", label: "Enviar a DIAN", type: "switch", defaultValue: true },
      { id: "enviar_cliente", label: "Enviar a cliente", type: "switch", defaultValue: true },
      { id: "medio_envio", label: "Medio envío", type: "select", options: ["Email", "WhatsApp", "Ambos"] },
      { id: "generar_cufe", label: "Generar CUFE", type: "switch", defaultValue: true },
    ],
  },
  notificacion_push: {
    fields: [
      { id: "titulo", label: "Título", type: "text", placeholder: "Título de la notificación" },
      { id: "mensaje", label: "Mensaje", type: "text", placeholder: "Contenido de la notificación" },
      {
        id: "destino",
        label: "Destino",
        type: "select",
        options: ["Usuario específico", "Rol", "Departamento", "Todos"],
      },
      { id: "destino_id", label: "ID destino", type: "text", placeholder: "{{usuario.id}} o rol" },
      { id: "accion_url", label: "URL al hacer clic", type: "text", placeholder: "/ruta/destino" },
      { id: "icono", label: "Icono", type: "select", options: ["Info", "Éxito", "Advertencia", "Error", "Campana"] },
    ],
  },
  webhook_out: {
    fields: [
      { id: "url", label: "URL destino", type: "text", placeholder: "https://api.ejemplo.com/webhook" },
      { id: "metodo", label: "Método", type: "select", options: ["POST", "PUT", "PATCH", "DELETE"] },
      { id: "headers", label: "Headers (JSON)", type: "text", placeholder: '{"Authorization": "Bearer..."}' },
      { id: "body", label: "Body template", type: "text", placeholder: '{"data": {{json}}}' },
      { id: "reintentar", label: "Reintentar en error", type: "switch", defaultValue: true },
      { id: "timeout", label: "Timeout (seg)", type: "number", placeholder: "30" },
    ],
  },
  ejecutar_sql: {
    fields: [
      { id: "query", label: "Query NQL", type: "text", placeholder: "OBTENER * DE clientes DONDE estado = 'activo'" },
      { id: "parametros", label: "Parámetros", type: "text", placeholder: '{"estado": "{{estado}}"}' },
      { id: "guardar_en", label: "Guardar resultado en", type: "text", placeholder: "resultado" },
      { id: "limite", label: "Límite registros", type: "number", placeholder: "100" },
    ],
  },
  log_auditoria: {
    fields: [
      { id: "accion", label: "Acción", type: "text", placeholder: "Descripción de la acción" },
      { id: "nivel", label: "Nivel", type: "select", options: ["Info", "Warning", "Error", "Debug", "Critical"] },
      {
        id: "modulo",
        label: "Módulo",
        type: "select",
        options: ["Ventas", "Inventario", "Contabilidad", "RRHH", "Sistema"],
      },
      { id: "datos_extra", label: "Datos adicionales (JSON)", type: "text", placeholder: '{"detalle": "valor"}' },
    ],
  },
  calcular_comision: {
    fields: [
      { id: "vendedor", label: "Vendedor", type: "text", placeholder: "{{vendedor.id}} o ID específico" },
      {
        id: "tipo_calculo",
        label: "Tipo cálculo",
        type: "select",
        options: ["Porcentaje fijo", "Escala", "Por producto", "Por cliente"],
      },
      { id: "porcentaje", label: "% Comisión base", type: "number", placeholder: "5" },
      {
        id: "base",
        label: "Base cálculo",
        type: "select",
        options: ["Venta total", "Margen bruto", "Recaudo", "Utilidad neta"],
      },
      { id: "registrar_nomina", label: "Registrar en nómina", type: "switch", defaultValue: true },
    ],
  },
  llamar_api: {
    fields: [
      { id: "url", label: "URL API", type: "text", placeholder: "https://api.servicio.com/endpoint" },
      { id: "metodo", label: "Método", type: "select", options: ["GET", "POST", "PUT", "PATCH", "DELETE"] },
      {
        id: "auth_tipo",
        label: "Autenticación",
        type: "select",
        options: ["Ninguna", "Bearer Token", "API Key", "Basic Auth", "OAuth2"],
      },
      { id: "auth_valor", label: "Token/Key", type: "text", placeholder: "{{env.API_KEY}}" },
      { id: "body", label: "Body", type: "text", placeholder: '{"param": "{{valor}}"}' },
    ],
  },
  crear_cotizacion: {
    fields: [
      { id: "cliente", label: "Cliente", type: "text", placeholder: "{{cliente.id}}" },
      { id: "productos", label: "Productos (JSON)", type: "text", placeholder: '[{"id": "P001", "cantidad": 1}]' },
      { id: "validez_dias", label: "Días de validez", type: "number", placeholder: "30" },
      { id: "enviar_cliente", label: "Enviar al cliente", type: "switch", defaultValue: true },
    ],
  },
  // Apps conectadas - acciones
  slack_mensaje: {
    fields: [
      { id: "canal", label: "Canal", type: "text", placeholder: "#general o @usuario" },
      { id: "mensaje", label: "Mensaje", type: "text", placeholder: "Texto del mensaje" },
      { id: "adjuntos", label: "Adjuntos (JSON)", type: "text", placeholder: "[]" },
      { id: "menciones", label: "Mencionar", type: "text", placeholder: "@here, @channel" },
    ],
  },
  google_sheets: {
    fields: [
      { id: "spreadsheet_id", label: "ID Spreadsheet", type: "text", placeholder: "abc123..." },
      { id: "hoja", label: "Nombre hoja", type: "text", placeholder: "Hoja1" },
      {
        id: "accion",
        label: "Acción",
        type: "select",
        options: ["Agregar fila", "Actualizar fila", "Leer datos", "Buscar"],
      },
      { id: "datos", label: "Datos (JSON)", type: "text", placeholder: '["col1", "col2", "col3"]' },
    ],
  },
  trello_tarjeta: {
    fields: [
      { id: "tablero", label: "Tablero", type: "text", placeholder: "ID o nombre del tablero" },
      { id: "lista", label: "Lista", type: "text", placeholder: "Nombre de la lista" },
      { id: "titulo", label: "Título tarjeta", type: "text", placeholder: "{{titulo}}" },
      { id: "descripcion", label: "Descripción", type: "text", placeholder: "{{descripcion}}" },
      { id: "etiquetas", label: "Etiquetas", type: "text", placeholder: "rojo, azul" },
    ],
  },
  hubspot_contacto: {
    fields: [
      { id: "accion", label: "Acción", type: "select", options: ["Crear", "Actualizar", "Buscar"] },
      { id: "email", label: "Email", type: "text", placeholder: "{{cliente.email}}" },
      { id: "propiedades", label: "Propiedades (JSON)", type: "text", placeholder: '{"firstname": "{{nombre}}"}' },
    ],
  },
  mailchimp_suscriptor: {
    fields: [
      { id: "lista", label: "Lista/Audiencia", type: "text", placeholder: "ID de la lista" },
      { id: "email", label: "Email", type: "text", placeholder: "{{email}}" },
      { id: "merge_fields", label: "Campos merge (JSON)", type: "text", placeholder: '{"FNAME": "{{nombre}}"}' },
      { id: "tags", label: "Tags", type: "text", placeholder: "tag1, tag2" },
    ],
  },
  zapier_trigger: {
    fields: [
      { id: "webhook_url", label: "Webhook URL Zapier", type: "text", placeholder: "https://hooks.zapier.com/..." },
      { id: "datos", label: "Datos a enviar (JSON)", type: "text", placeholder: '{"campo": "{{valor}}"}' },
    ],
  },
  make_webhook: {
    fields: [
      { id: "webhook_url", label: "Webhook URL Make", type: "text", placeholder: "https://hook.make.com/..." },
      { id: "datos", label: "Datos a enviar (JSON)", type: "text", placeholder: '{"campo": "{{valor}}"}' },
    ],
  },
  aws_s3: {
    fields: [
      { id: "bucket", label: "Bucket", type: "text", placeholder: "mi-bucket" },
      { id: "accion", label: "Acción", type: "select", options: ["Subir archivo", "Descargar", "Listar", "Eliminar"] },
      { id: "ruta", label: "Ruta/Key", type: "text", placeholder: "carpeta/archivo.pdf" },
      { id: "archivo", label: "Archivo (base64 o URL)", type: "text", placeholder: "{{archivo}}" },
    ],
  },
  openai_gpt: {
    fields: [
      { id: "modelo", label: "Modelo", type: "select", options: ["gpt-4o", "gpt-4", "gpt-3.5-turbo"] },
      { id: "prompt", label: "Prompt", type: "text", placeholder: "Analiza el siguiente texto: {{texto}}" },
      { id: "max_tokens", label: "Max tokens", type: "number", placeholder: "500" },
      { id: "temperatura", label: "Temperatura", type: "slider", defaultValue: 70 },
      { id: "guardar_en", label: "Guardar respuesta en", type: "text", placeholder: "respuesta_ai" },
    ],
  },
}

// Trigger categories organized by module
const triggerCategories = {
  ventas: {
    label: "VENTAS & CRM",
    icon: ShoppingCartIcon,
    color: "bg-blue-500",
    nodes: [
      {
        id: "nuevo_pedido",
        label: "Nuevo Pedido",
        description: "Cuando se crea un nuevo pedido",
        icon: ShoppingCartIcon,
        color: "bg-blue-500",
      },
      {
        id: "cotizacion_creada",
        label: "Cotización Creada",
        description: "Nueva cotización generada",
        icon: FileTextIcon,
        color: "bg-blue-600",
      },
      {
        id: "cotizacion_aceptada",
        label: "Cotización Aceptada",
        description: "Cliente acepta cotización",
        icon: CheckCircle2Icon,
        color: "bg-green-500",
      },
      {
        id: "cotizacion_rechazada",
        label: "Cotización Rechazada",
        description: "Cliente rechaza cotización",
        icon: XCircleIcon,
        color: "bg-red-500",
      },
      {
        id: "pedido_cancelado",
        label: "Pedido Cancelado",
        description: "Cliente cancela pedido",
        icon: XCircleIcon,
        color: "bg-red-500",
      },
      {
        id: "cliente_nuevo",
        label: "Cliente Nuevo",
        description: "Al registrar nuevo cliente",
        icon: UsersIcon,
        color: "bg-purple-500",
      },
      {
        id: "cliente_inactivo",
        label: "Cliente Inactivo",
        description: "Cliente sin compras por X días",
        icon: UsersIcon,
        color: "bg-orange-500",
      },
      {
        id: "oportunidad_creada",
        label: "Oportunidad Creada",
        description: "Nueva oportunidad en pipeline",
        icon: ZapIcon,
        color: "bg-cyan-500",
      },
      {
        id: "venta_cerrada",
        label: "Venta Cerrada",
        description: "Deal ganado",
        icon: DollarSignIcon,
        color: "bg-green-600",
      },
      {
        id: "meta_cumplida",
        label: "Meta Cumplida",
        description: "Vendedor alcanza meta",
        icon: CheckCircle2Icon,
        color: "bg-pink-500",
      },
      {
        id: "devolucion_solicitada",
        label: "Devolución Solicitada",
        description: "Cliente solicita devolución",
        icon: PackageIcon,
        color: "bg-orange-600",
      },
      {
        id: "lead_nuevo",
        label: "Lead Nuevo",
        description: "Nuevo lead capturado",
        icon: UsersIcon,
        color: "bg-indigo-500",
      },
      {
        id: "lead_calificado",
        label: "Lead Calificado",
        description: "Lead pasa a calificado",
        icon: CheckCircle2Icon,
        color: "bg-teal-500",
      },
      {
        id: "oportunidad_perdida",
        label: "Oportunidad Perdida",
        description: "Deal perdido",
        icon: XCircleIcon,
        color: "bg-red-600",
      },
      {
        id: "renovacion_contrato",
        label: "Renovación Contrato",
        description: "Contrato próximo a vencer",
        icon: CalendarIcon,
        color: "bg-yellow-600",
      },
    ],
  },
  inventario: {
    label: "INVENTARIO & ALMACÉN",
    icon: PackageIcon,
    color: "bg-teal-500",
    nodes: [
      {
        id: "stock_bajo",
        label: "Stock Bajo",
        description: "Inventario por debajo del mínimo",
        icon: AlertTriangle,
        color: "bg-red-500",
      },
      {
        id: "stock_critico",
        label: "Stock Crítico",
        description: "Producto agotado o casi agotado",
        icon: AlertTriangle,
        color: "bg-red-600",
      },
      {
        id: "lote_vencimiento",
        label: "Lote Por Vencer",
        description: "Lote próximo a vencer",
        icon: ClockIcon,
        color: "bg-orange-500",
      },
      {
        id: "lote_vencido",
        label: "Lote Vencido",
        description: "Lote ya vencido",
        icon: XCircleIcon,
        color: "bg-red-700",
      },
      {
        id: "recepcion_mercancia",
        label: "Recepción de Mercancía",
        description: "Mercancía recibida de proveedor",
        icon: TruckIcon,
        color: "bg-teal-500",
      },
      {
        id: "nivel_optimo",
        label: "Nivel Óptimo Alcanzado",
        description: "Stock vuelve a nivel ideal",
        icon: CheckCircle2Icon,
        color: "bg-green-500",
      },
      {
        id: "transferencia_creada",
        label: "Transferencia Creada",
        description: "Nueva transferencia entre bodegas",
        icon: TruckIcon,
        color: "bg-blue-500",
      },
      {
        id: "transferencia_completada",
        label: "Transferencia Completada",
        description: "Transferencia finalizada",
        icon: CheckCircle2Icon,
        color: "bg-green-600",
      },
      {
        id: "ajuste_inventario",
        label: "Ajuste de Inventario",
        description: "Ajuste manual realizado",
        icon: ClipboardCheckIcon,
        color: "bg-yellow-500",
      },
      {
        id: "conteo_fisico",
        label: "Conteo Físico Iniciado",
        description: "Inicio de conteo físico",
        icon: ClipboardCheckIcon,
        color: "bg-purple-500",
      },
      {
        id: "diferencia_inventario",
        label: "Diferencia Detectada",
        description: "Diferencia en conteo físico",
        icon: AlertTriangle,
        color: "bg-orange-600",
      },
      {
        id: "producto_sin_movimiento",
        label: "Producto Sin Movimiento",
        description: "Producto sin rotación X días",
        icon: PackageIcon,
        color: "bg-gray-500",
      },
    ],
  },
  contabilidad: {
    label: "CONTABILIDAD & FINANZAS",
    icon: CalculatorIcon,
    color: "bg-green-600",
    nodes: [
      {
        id: "factura_creada",
        label: "Factura Creada",
        description: "Nueva factura generada",
        icon: FileTextIcon,
        color: "bg-green-500",
      },
      {
        id: "factura_vencida",
        label: "Factura Vencida",
        description: "Factura sin pagar después de vencimiento",
        icon: AlertTriangle,
        color: "bg-red-500",
      },
      {
        id: "pago_recibido",
        label: "Pago Recibido",
        description: "Confirmación de pago",
        icon: DollarSignIcon,
        color: "bg-green-600",
      },
      {
        id: "pago_parcial",
        label: "Pago Parcial",
        description: "Abono a factura",
        icon: DollarSignIcon,
        color: "bg-yellow-500",
      },
      {
        id: "movimiento_bancario",
        label: "Movimiento Bancario",
        description: "Transacción en cuenta bancaria",
        icon: Building2Icon,
        color: "bg-blue-500",
      },
      {
        id: "conciliacion_pendiente",
        label: "Conciliación Pendiente",
        description: "Movimiento sin conciliar",
        icon: AlertTriangle,
        color: "bg-orange-500",
      },
      {
        id: "cierre_mes",
        label: "Cierre de Mes",
        description: "Último día del mes",
        icon: CalendarIcon,
        color: "bg-purple-500",
      },
      {
        id: "presupuesto_excedido",
        label: "Presupuesto Excedido",
        description: "Gasto supera presupuesto",
        icon: AlertTriangle,
        color: "bg-red-600",
      },
      {
        id: "asiento_contable",
        label: "Asiento Contable Creado",
        description: "Nuevo registro contable",
        icon: FileTextIcon,
        color: "bg-blue-600",
      },
      {
        id: "anomalia_contable",
        label: "Anomalía Contable",
        description: "AI detecta irregularidad",
        icon: AlertTriangle,
        color: "bg-red-700",
      },
      {
        id: "nota_credito",
        label: "Nota Crédito Generada",
        description: "Nueva nota crédito",
        icon: FileTextIcon,
        color: "bg-orange-500",
      },
      {
        id: "nota_debito",
        label: "Nota Débito Generada",
        description: "Nueva nota débito",
        icon: FileTextIcon,
        color: "bg-yellow-600",
      },
      {
        id: "retencion_aplicada",
        label: "Retención Aplicada",
        description: "Retención en la fuente",
        icon: CalculatorIcon,
        color: "bg-gray-600",
      },
    ],
  },
  compras: {
    label: "COMPRAS & PROVEEDORES",
    icon: TruckIcon,
    color: "bg-orange-500",
    nodes: [
      {
        id: "orden_compra_creada",
        label: "Orden de Compra Creada",
        description: "Nueva OC generada",
        icon: FileTextIcon,
        color: "bg-orange-500",
      },
      {
        id: "orden_compra_aprobada",
        label: "Orden de Compra Aprobada",
        description: "OC aprobada",
        icon: CheckCircle2Icon,
        color: "bg-green-500",
      },
      {
        id: "orden_compra_rechazada",
        label: "Orden de Compra Rechazada",
        description: "OC rechazada",
        icon: XCircleIcon,
        color: "bg-red-500",
      },
      {
        id: "proveedor_nuevo",
        label: "Proveedor Nuevo",
        description: "Nuevo proveedor registrado",
        icon: UsersIcon,
        color: "bg-purple-500",
      },
      {
        id: "evaluacion_proveedor",
        label: "Evaluación Proveedor",
        description: "Evaluación periódica",
        icon: ClipboardCheckIcon,
        color: "bg-blue-500",
      },
      {
        id: "factura_proveedor",
        label: "Factura de Proveedor",
        description: "Nueva factura de compra",
        icon: FileTextIcon,
        color: "bg-teal-500",
      },
      {
        id: "requisicion_creada",
        label: "Requisición Creada",
        description: "Nueva solicitud de compra",
        icon: FileTextIcon,
        color: "bg-cyan-500",
      },
      {
        id: "entrega_retrasada",
        label: "Entrega Retrasada",
        description: "Proveedor con retraso",
        icon: AlertTriangle,
        color: "bg-red-600",
      },
      {
        id: "contrato_proveedor_vence",
        label: "Contrato Por Vencer",
        description: "Contrato próximo a expirar",
        icon: CalendarIcon,
        color: "bg-yellow-500",
      },
    ],
  },
  produccion: {
    label: "PRODUCCIÓN & MRP",
    icon: FactoryIcon,
    color: "bg-purple-600",
    nodes: [
      {
        id: "orden_produccion",
        label: "Orden de Producción",
        description: "Nueva orden de producción",
        icon: FactoryIcon,
        color: "bg-purple-500",
      },
      {
        id: "orden_completada",
        label: "Producción Completada",
        description: "Orden finalizada",
        icon: CheckCircle2Icon,
        color: "bg-green-500",
      },
      {
        id: "maquina_detenida",
        label: "Máquina Detenida",
        description: "Paro de máquina",
        icon: AlertTriangle,
        color: "bg-red-500",
      },
      {
        id: "eficiencia_baja",
        label: "Eficiencia Baja",
        description: "OEE bajo del objetivo",
        icon: AlertTriangle,
        color: "bg-orange-500",
      },
      {
        id: "mantenimiento_programado",
        label: "Mantenimiento Programado",
        description: "Próximo mantenimiento",
        icon: WrenchIcon,
        color: "bg-blue-500",
      },
      {
        id: "control_calidad_fallo",
        label: "Fallo de Calidad",
        description: "Producto no pasa QC",
        icon: XCircleIcon,
        color: "bg-red-600",
      },
      {
        id: "material_insuficiente",
        label: "Material Insuficiente",
        description: "Falta materia prima",
        icon: AlertTriangle,
        color: "bg-yellow-500",
      },
      {
        id: "capacidad_excedida",
        label: "Capacidad Excedida",
        description: "Línea sobrecargada",
        icon: AlertTriangle,
        color: "bg-red-700",
      },
    ],
  },
  rrhh: {
    label: "RECURSOS HUMANOS",
    icon: UsersIcon,
    color: "bg-pink-500",
    nodes: [
      {
        id: "empleado_nuevo",
        label: "Empleado Nuevo",
        description: "Nuevo empleado contratado",
        icon: UsersIcon,
        color: "bg-green-500",
      },
      {
        id: "solicitud_vacaciones",
        label: "Solicitud Vacaciones",
        description: "Solicitud de tiempo libre",
        icon: CalendarIcon,
        color: "bg-blue-500",
      },
      {
        id: "cumpleanos_empleado",
        label: "Cumpleaños Empleado",
        description: "Cumpleaños de colaborador",
        icon: CalendarIcon,
        color: "bg-pink-500",
      },
      {
        id: "evaluacion_desempeno",
        label: "Evaluación Desempeño",
        description: "Evaluación programada",
        icon: ClipboardCheckIcon,
        color: "bg-purple-500",
      },
      {
        id: "incapacidad",
        label: "Incapacidad Reportada",
        description: "Empleado reporta incapacidad",
        icon: AlertTriangle,
        color: "bg-orange-500",
      },
      {
        id: "fin_contrato",
        label: "Fin de Contrato",
        description: "Contrato próximo a vencer",
        icon: CalendarIcon,
        color: "bg-yellow-500",
      },
      {
        id: "solicitud_permiso",
        label: "Solicitud Permiso",
        description: "Permiso solicitado",
        icon: CalendarIcon,
        color: "bg-cyan-500",
      },
      {
        id: "horas_extra",
        label: "Horas Extra Registradas",
        description: "Empleado registra horas extra",
        icon: ClockIcon,
        color: "bg-indigo-500",
      },
      {
        id: "meta_capacitacion",
        label: "Meta Capacitación",
        description: "Capacitación completada",
        icon: CheckCircle2Icon,
        color: "bg-teal-500",
      },
    ],
  },
  pos: {
    label: "POS & RETAIL",
    icon: CreditCardIcon,
    color: "bg-indigo-500",
    nodes: [
      {
        id: "venta_pos",
        label: "Venta POS",
        description: "Nueva venta en punto",
        icon: ShoppingCartIcon,
        color: "bg-indigo-500",
      },
      {
        id: "venta_alto_monto",
        label: "Venta de Alto Monto",
        description: "Venta supera umbral",
        icon: DollarSignIcon,
        color: "bg-green-500",
      },
      {
        id: "devolucion_pos",
        label: "Devolución POS",
        description: "Devolución en tienda",
        icon: PackageIcon,
        color: "bg-orange-500",
      },
      {
        id: "arqueo_caja",
        label: "Arqueo de Caja",
        description: "Cierre de caja",
        icon: CalculatorIcon,
        color: "bg-purple-500",
      },
      {
        id: "diferencia_caja",
        label: "Diferencia en Caja",
        description: "Descuadre detectado",
        icon: AlertTriangle,
        color: "bg-red-500",
      },
      {
        id: "producto_mas_vendido",
        label: "Producto Más Vendido",
        description: "Alerta de top seller",
        icon: CheckCircle2Icon,
        color: "bg-teal-500",
      },
      {
        id: "cliente_frecuente",
        label: "Cliente Frecuente",
        description: "Cliente VIP en tienda",
        icon: UsersIcon,
        color: "bg-pink-500",
      },
      {
        id: "promocion_activada",
        label: "Promoción Activada",
        description: "Promoción aplicada",
        icon: ZapIcon,
        color: "bg-yellow-500",
      },
    ],
  },
  dian: {
    label: "COLOMBIA / DIAN",
    icon: Building2Icon,
    color: "bg-blue-700",
    nodes: [
      {
        id: "factura_dian_aprobada",
        label: "DIAN - Factura Aprobada",
        description: "Factura validada por DIAN",
        icon: CheckCircle2Icon,
        color: "bg-green-500",
      },
      {
        id: "factura_dian_rechazada",
        label: "DIAN - Factura Rechazada",
        description: "Factura rechazada por DIAN",
        icon: XCircleIcon,
        color: "bg-red-500",
      },
      {
        id: "nomina_electronica",
        label: "DIAN - Nómina Electrónica",
        description: "Nómina electrónica transmitida",
        icon: FileTextIcon,
        color: "bg-blue-600",
      },
      {
        id: "doc_soporte",
        label: "DIAN - Doc. Soporte",
        description: "Documento soporte validado",
        icon: FileTextIcon,
        color: "bg-blue-700",
      },
      {
        id: "nota_credito_dian",
        label: "DIAN - Nota Crédito",
        description: "Nota crédito aprobada",
        icon: FileTextIcon,
        color: "bg-teal-500",
      },
      {
        id: "evento_dian",
        label: "DIAN - Evento Recibido",
        description: "Evento de documento",
        icon: BellIcon,
        color: "bg-purple-500",
      },
    ],
  },
  bancos: {
    label: "BANCOS COLOMBIA",
    icon: Building2Icon,
    color: "bg-yellow-600",
    nodes: [
      {
        id: "bancolombia",
        label: "Bancolombia",
        description: "Transacción bancaria recibida",
        icon: Building2Icon,
        color: "bg-yellow-500",
      },
      {
        id: "davivienda",
        label: "Davivienda",
        description: "Movimiento en cuenta",
        icon: Building2Icon,
        color: "bg-red-500",
      },
      { id: "nequi", label: "Nequi", description: "Pago Nequi recibido", icon: CreditCardIcon, color: "bg-pink-500" },
      {
        id: "daviplata",
        label: "Daviplata",
        description: "Pago Daviplata recibido",
        icon: CreditCardIcon,
        color: "bg-red-600",
      },
      {
        id: "pse",
        label: "PSE",
        description: "Transferencia PSE completada",
        icon: CreditCardIcon,
        color: "bg-green-600",
      },
      { id: "bbva", label: "BBVA", description: "Movimiento BBVA", icon: Building2Icon, color: "bg-blue-600" },
      {
        id: "banco_bogota",
        label: "Banco de Bogotá",
        description: "Transacción Banco de Bogotá",
        icon: Building2Icon,
        color: "bg-blue-700",
      },
      {
        id: "banco_occidente",
        label: "Banco de Occidente",
        description: "Movimiento Occidente",
        icon: Building2Icon,
        color: "bg-red-700",
      },
    ],
  },
  ecommerce: {
    label: "E-COMMERCE & APPS",
    icon: GlobeIcon,
    color: "bg-orange-600",
    nodes: [
      {
        id: "rappi",
        label: "Rappi",
        description: "Nuevo pedido Rappi",
        icon: ShoppingCartIcon,
        color: "bg-orange-500",
      },
      {
        id: "mercadolibre",
        label: "MercadoLibre",
        description: "Venta en MercadoLibre",
        icon: ShoppingCartIcon,
        color: "bg-yellow-500",
      },
      {
        id: "shopify",
        label: "Shopify",
        description: "Orden de Shopify",
        icon: ShoppingCartIcon,
        color: "bg-green-500",
      },
      {
        id: "woocommerce",
        label: "WooCommerce",
        description: "Pedido WooCommerce",
        icon: ShoppingCartIcon,
        color: "bg-purple-500",
      },
      { id: "ifood", label: "iFood", description: "Pedido iFood", icon: ShoppingCartIcon, color: "bg-red-500" },
      {
        id: "didi_food",
        label: "DiDi Food",
        description: "Pedido DiDi Food",
        icon: ShoppingCartIcon,
        color: "bg-orange-600",
      },
      {
        id: "uber_eats",
        label: "Uber Eats",
        description: "Pedido Uber Eats",
        icon: ShoppingCartIcon,
        color: "bg-green-600",
      },
    ],
  },
  programacion: {
    label: "PROGRAMACIÓN",
    icon: ClockIcon,
    color: "bg-gray-600",
    nodes: [
      {
        id: "programado",
        label: "Programado",
        description: "Ejecutar en horario específico",
        icon: ClockIcon,
        color: "bg-purple-500",
      },
      {
        id: "cron",
        label: "Expresión Cron",
        description: "Ejecutar según expresión cron",
        icon: CodeIcon,
        color: "bg-gray-600",
      },
      {
        id: "intervalo",
        label: "Intervalo",
        description: "Ejecutar cada X tiempo",
        icon: ClockIcon,
        color: "bg-blue-500",
      },
      {
        id: "fecha_especifica",
        label: "Fecha Específica",
        description: "Ejecutar en fecha exacta",
        icon: CalendarIcon,
        color: "bg-teal-500",
      },
      {
        id: "dia_semana",
        label: "Día de Semana",
        description: "Ejecutar ciertos días",
        icon: CalendarIcon,
        color: "bg-indigo-500",
      },
    ],
  },
  webhooks: {
    label: "WEBHOOKS & API",
    icon: WebhookIcon,
    color: "bg-gray-700",
    nodes: [
      {
        id: "webhook_entrante",
        label: "Webhook Entrante",
        description: "Recibir webhook externo",
        icon: WebhookIcon,
        color: "bg-gray-600",
      },
      {
        id: "api_llamada",
        label: "API Llamada",
        description: "Cuando se llama endpoint",
        icon: CodeIcon,
        color: "bg-blue-600",
      },
      {
        id: "evento_sistema",
        label: "Evento del Sistema",
        description: "Evento interno del ERP",
        icon: ZapIcon,
        color: "bg-purple-600",
      },
    ],
  },
}

// Logic nodes
const logicNodes = [
  {
    id: "condition",
    label: "Condición",
    description: "Si/Entonces",
    icon: GitBranchIcon,
    color: "bg-amber-600",
    outputs: 2,
    outputLabels: ["Sí", "No"], // Added output labels for clarity
  },
  {
    id: "switch_case",
    label: "Switch/Case",
    description: "Múltiples condiciones",
    icon: SplitIcon,
    color: "bg-amber-700",
    outputs: 4,
    outputLabels: ["Caso 1", "Caso 2", "Caso 3", "Default"], // Added output labels
  },
  {
    id: "delay",
    label: "Esperar",
    description: "Pausar ejecución",
    icon: ClockIcon,
    color: "bg-slate-600",
  },
  {
    id: "loop",
    label: "Bucle",
    description: "Repetir acciones",
    icon: RepeatIcon,
    color: "bg-indigo-600",
  },
  {
    id: "filter",
    label: "Filtrar",
    description: "Filtrar datos por condición",
    icon: FilterIcon,
    color: "bg-cyan-600",
  },
  {
    id: "merge",
    label: "Combinar",
    description: "Unir múltiples flujos",
    icon: MergeIcon,
    color: "bg-violet-600",
  },
  {
    id: "transform",
    label: "Transformar",
    description: "Modificar datos",
    icon: ArrowRightLeftIcon,
    color: "bg-teal-600",
  },
  {
    id: "error_handler",
    label: "Manejo de Errores",
    description: "Capturar errores",
    icon: AlertCircleIcon,
    color: "bg-red-600",
  },
  {
    id: "wait_approval",
    label: "Esperar Aprobación",
    description: "Requiere aprobación manual",
    icon: UserCheckIcon,
    color: "bg-purple-600",
  },
  {
    id: "set_variable",
    label: "Asignar Variable",
    description: "Guardar valor en variable",
    icon: DatabaseIcon,
    color: "bg-emerald-600",
  },
  {
    id: "parallel",
    label: "Ejecución Paralela",
    description: "Ejecutar en paralelo",
    icon: LayersIcon,
    color: "bg-pink-600",
  },
  {
    id: "sub_flow",
    label: "Sub-flujo",
    description: "Llamar otro flujo",
    icon: WorkflowIcon,
    color: "bg-blue-700",
  },
  {
    id: "math_operation",
    label: "Operación Matemática",
    description: "Calcular valores",
    icon: CalculatorIcon,
    color: "bg-orange-600",
  },
  {
    id: "text_operation",
    label: "Operación de Texto",
    description: "Manipular strings",
    icon: TypeIcon,
    color: "bg-sky-600",
  },
  {
    id: "date_operation",
    label: "Operación de Fecha",
    description: "Manipular fechas",
    icon: CalendarIcon,
    color: "bg-rose-600",
  },
  {
    id: "array_operation",
    label: "Operación de Array",
    description: "Manipular listas",
    icon: ListIcon,
    color: "bg-lime-600",
  },
  {
    id: "random",
    label: "Aleatorio",
    description: "Generar valor aleatorio",
    icon: ShuffleIcon,
    color: "bg-fuchsia-600",
  },
  {
    id: "rate_limit",
    label: "Límite de Tasa",
    description: "Controlar frecuencia",
    icon: GaugeIcon,
    color: "bg-amber-700",
  },
]

// Action categories
const actionCategories = {
  comunicacion: {
    label: "Comunicación",
    icon: MailIcon,
    color: "bg-blue-600",
    nodes: [
      {
        id: "enviar_email",
        label: "Enviar Email",
        description: "Correo electrónico",
        icon: MailIcon,
        color: "bg-blue-600",
      },
      {
        id: "enviar_sms",
        label: "Enviar SMS",
        description: "Mensaje de texto",
        icon: MessageSquareIcon,
        color: "bg-blue-600",
      },
      {
        id: "enviar_whatsapp",
        label: "WhatsApp",
        description: "Mensaje WhatsApp",
        icon: MessageSquareIcon,
        color: "bg-green-600",
      },
      {
        id: "notificacion_push",
        label: "Notificación Push",
        description: "Notificación en app",
        icon: BellIcon,
        color: "bg-purple-600",
      },
      {
        id: "enviar_telegram",
        label: "Telegram",
        description: "Mensaje Telegram",
        icon: SendIcon,
        color: "bg-sky-500",
      },
      {
        id: "llamada_automatica",
        label: "Llamada Automática",
        description: "IVR automático",
        icon: PhoneIcon,
        color: "bg-green-600",
      },
      { id: "enviar_fax", label: "Enviar Fax", description: "Fax digital", icon: PrinterIcon, color: "bg-slate-600" },
      {
        id: "notificacion_interna",
        label: "Notificación Interna",
        description: "Notificar usuario",
        icon: BellIcon,
        color: "bg-orange-500",
      },
    ],
  },
  ventas_crm: {
    label: "Ventas & CRM",
    icon: Target,
    color: "bg-emerald-600",
    nodes: [
      {
        id: "crear_oportunidad",
        label: "Crear Oportunidad",
        description: "Nueva oportunidad CRM",
        icon: TargetIcon,
        color: "bg-emerald-600",
      },
      {
        id: "actualizar_lead",
        label: "Actualizar Lead",
        description: "Modificar lead",
        icon: UsersIcon,
        color: "bg-emerald-600",
      },
      {
        id: "asignar_vendedor",
        label: "Asignar Vendedor",
        description: "Reasignar comercial",
        icon: UserCheckIcon,
        color: "bg-emerald-600",
      },
      {
        id: "crear_cotizacion",
        label: "Crear Cotización",
        description: "Generar cotización",
        icon: FileTextIcon,
        color: "bg-emerald-600",
      },
      {
        id: "enviar_cotizacion",
        label: "Enviar Cotización",
        description: "Email con cotización",
        icon: SendIcon,
        color: "bg-emerald-600",
      },
      {
        id: "convertir_venta",
        label: "Convertir a Venta",
        description: "Oportunidad a venta",
        icon: CheckIcon,
        color: "bg-emerald-600",
      },
      {
        id: "crear_seguimiento",
        label: "Crear Seguimiento",
        description: "Programar seguimiento",
        icon: CalendarIcon,
        color: "bg-emerald-600",
      },
      {
        id: "actualizar_pipeline",
        label: "Actualizar Pipeline",
        description: "Cambiar etapa",
        icon: ArrowRightIcon,
        color: "bg-emerald-600",
      },
      {
        id: "calcular_comision",
        label: "Calcular Comisión",
        description: "Comisión vendedor",
        icon: CalculatorIcon,
        color: "bg-emerald-600",
      },
      {
        id: "aplicar_descuento",
        label: "Aplicar Descuento",
        description: "Descuento especial",
        icon: PercentIcon,
        color: "bg-emerald-600",
      },
      {
        id: "crear_cliente",
        label: "Crear Cliente",
        description: "Nuevo cliente",
        icon: UserPlusIcon,
        color: "bg-emerald-600",
      },
      {
        id: "actualizar_cliente",
        label: "Actualizar Cliente",
        description: "Modificar cliente",
        icon: EditIcon,
        color: "bg-emerald-600",
      },
    ],
  },
  inventario: {
    label: "Inventario & Almacén",
    icon: PackageIcon,
    color: "bg-amber-600",
    nodes: [
      {
        id: "ajustar_stock",
        label: "Ajustar Stock",
        description: "Modificar cantidad",
        icon: PackageIcon,
        color: "bg-amber-600",
      },
      {
        id: "crear_transferencia",
        label: "Crear Transferencia",
        description: "Entre bodegas",
        icon: ArrowLeftRight,
        color: "bg-amber-600",
      },
      {
        id: "crear_orden_compra",
        label: "Crear Orden Compra",
        description: "Reposición automática",
        icon: ShoppingCartIcon,
        color: "bg-amber-600",
      },
      {
        id: "reservar_stock",
        label: "Reservar Stock",
        description: "Apartar stock",
        icon: LockIcon,
        color: "bg-amber-600",
      },
      {
        id: "liberar_reserva",
        label: "Liberar Reserva",
        description: "Cancelar reserva",
        icon: UnlockIcon,
        color: "bg-amber-600",
      },
      {
        id: "crear_conteo",
        label: "Crear Conteo",
        description: "Conteo de inventario",
        icon: ClipboardCheckIcon,
        color: "bg-amber-600",
      },
      {
        id: "actualizar_ubicacion",
        label: "Actualizar Ubicación",
        description: "Cambiar ubicación",
        icon: MapPinIcon,
        color: "bg-amber-600",
      },
      {
        id: "generar_picking",
        label: "Generar Picking",
        description: "Orden de picking",
        icon: ClipboardListIcon,
        color: "bg-amber-600",
      },
      {
        id: "confirmar_recepcion",
        label: "Confirmar Recepción",
        description: "Mercancía recibida",
        icon: PackageCheckIcon,
        color: "bg-amber-600",
      },
      { id: "bloquear_lote", label: "Bloquear Lote", description: "Cuarentena", icon: BanIcon, color: "bg-red-600" },
      {
        id: "actualizar_minimos",
        label: "Actualizar Mínimos",
        description: "Stock mínimo",
        icon: TrendingDownIcon,
        color: "bg-amber-600",
      },
      { id: "crear_kit", label: "Crear Kit", description: "Ensamblar kit", icon: BoxesIcon, color: "bg-amber-600" },
    ],
  },
  contabilidad: {
    label: "Contabilidad & Finanzas",
    icon: CalculatorIcon,
    color: "bg-indigo-600",
    nodes: [
      {
        id: "crear_asiento",
        label: "Crear Asiento",
        description: "Asiento contable",
        icon: FileTextIcon,
        color: "bg-indigo-600",
      },
      {
        id: "crear_factura",
        label: "Crear Factura",
        description: "Factura electrónica",
        icon: ReceiptIcon,
        color: "bg-indigo-600",
      },
      {
        id: "registrar_pago",
        label: "Registrar Pago",
        description: "Pago recibido",
        icon: DollarSignIcon,
        color: "bg-indigo-600",
      },
      {
        id: "crear_nota_credito",
        label: "Nota Crédito",
        description: "Nota de crédito",
        icon: FileTextIcon,
        color: "bg-indigo-600",
      },
      {
        id: "crear_nota_debito",
        label: "Nota Débito",
        description: "Nota de débito",
        icon: FileTextIcon,
        color: "bg-indigo-600",
      },
      {
        id: "conciliar_movimiento",
        label: "Conciliar Movimiento",
        description: "Conciliación bancaria",
        icon: CheckIcon,
        color: "bg-indigo-600",
      },
      {
        id: "programar_pago",
        label: "Programar Pago",
        description: "Pago a proveedor",
        icon: CalendarIcon,
        color: "bg-indigo-600",
      },
      {
        id: "crear_retencion",
        label: "Crear Retención",
        description: "Retención en fuente",
        icon: FileTextIcon,
        color: "bg-indigo-600",
      },
      {
        id: "calcular_impuestos",
        label: "Calcular Impuestos",
        description: "IVA, ICA, etc",
        icon: CalculatorIcon,
        color: "bg-indigo-600",
      },
      {
        id: "generar_reporte",
        label: "Generar Reporte",
        description: "Reporte contable",
        icon: BarChart3Icon,
        color: "bg-indigo-600",
      },
      {
        id: "cerrar_periodo",
        label: "Cerrar Período",
        description: "Cierre contable",
        icon: LockIcon,
        color: "bg-indigo-600",
      },
      {
        id: "crear_presupuesto",
        label: "Crear Presupuesto",
        description: "Asignar presupuesto",
        icon: WalletIcon,
        color: "bg-indigo-600",
      },
    ],
  },
  compras: {
    label: "Compras & Proveedores",
    icon: ShoppingBagIcon,
    color: "bg-orange-600",
    nodes: [
      {
        id: "crear_requisicion",
        label: "Crear Requisición",
        description: "Solicitud de compra",
        icon: FileTextIcon,
        color: "bg-orange-600",
      },
      {
        id: "aprobar_requisicion",
        label: "Aprobar Requisición",
        description: "Aprobación automática",
        icon: CheckIcon,
        color: "bg-orange-600",
      },
      {
        id: "crear_orden_compra_prov",
        label: "Crear OC",
        description: "Orden de compra",
        icon: ShoppingCartIcon,
        color: "bg-orange-600",
      },
      {
        id: "enviar_orden",
        label: "Enviar Orden",
        description: "Email a proveedor",
        icon: SendIcon,
        color: "bg-orange-600",
      },
      {
        id: "actualizar_proveedor",
        label: "Actualizar Proveedor",
        description: "Datos proveedor",
        icon: Building2Icon,
        color: "bg-orange-600",
      },
      {
        id: "evaluar_proveedor",
        label: "Evaluar Proveedor",
        description: "Evaluación desempeño",
        icon: StarIcon,
        color: "bg-orange-600",
      },
      {
        id: "solicitar_cotizacion",
        label: "Solicitar Cotización",
        description: "RFQ a proveedores",
        icon: FileQuestionIcon,
        color: "bg-orange-600",
      },
      {
        id: "comparar_ofertas",
        label: "Comparar Ofertas",
        description: "Análisis comparativo",
        icon: ScaleIcon,
        color: "bg-orange-600",
      },
      {
        id: "registrar_recepcion",
        label: "Registrar Recepción",
        description: "Entrada mercancía",
        icon: PackageCheckIcon,
        color: "bg-orange-600",
      },
      {
        id: "crear_devolucion_prov",
        label: "Crear Devolución",
        description: "Devolución proveedor",
        icon: RotateCcwIcon,
        color: "bg-orange-600",
      },
    ],
  },
  produccion: {
    label: "Producción & MRP",
    icon: FactoryIcon,
    color: "bg-slate-600",
    nodes: [
      {
        id: "crear_orden_produccion",
        label: "Crear OP",
        description: "Orden de producción",
        icon: FactoryIcon,
        color: "bg-slate-600",
      },
      {
        id: "liberar_orden",
        label: "Liberar Orden",
        description: "Iniciar producción",
        icon: PlayCircleIcon,
        color: "bg-slate-600",
      },
      {
        id: "reportar_avance",
        label: "Reportar Avance",
        description: "Progreso producción",
        icon: BarChart3Icon,
        color: "bg-slate-600",
      },
      {
        id: "consumir_materiales",
        label: "Consumir Materiales",
        description: "Salida de MP",
        icon: PackageIcon,
        color: "bg-slate-600",
      },
      {
        id: "registrar_scrap",
        label: "Registrar Scrap",
        description: "Material desechado",
        icon: Trash2,
        color: "bg-slate-600",
      },
      {
        id: "crear_lote",
        label: "Crear Lote",
        description: "Nuevo lote producción",
        icon: BoxesIcon,
        color: "bg-slate-600",
      },
      {
        id: "programar_mantenimiento",
        label: "Programar Mto",
        description: "Mantenimiento equipo",
        icon: WrenchIcon,
        color: "bg-slate-600",
      },
      {
        id: "registrar_calidad",
        label: "Registrar Calidad",
        description: "Control de calidad",
        icon: ClipboardCheckIcon,
        color: "bg-slate-600",
      },
      {
        id: "calcular_costo",
        label: "Calcular Costo",
        description: "Costo producción",
        icon: CalculatorIcon,
        color: "bg-slate-600",
      },
      {
        id: "cerrar_orden",
        label: "Cerrar Orden",
        description: "Finalizar OP",
        icon: CheckIcon,
        color: "bg-slate-600",
      },
    ],
  },
  rrhh: {
    label: "Recursos Humanos",
    icon: UsersIcon,
    color: "bg-pink-600",
    nodes: [
      {
        id: "crear_empleado",
        label: "Crear Empleado",
        description: "Nuevo empleado",
        icon: UserPlusIcon,
        color: "bg-pink-600",
      },
      {
        id: "actualizar_empleado",
        label: "Actualizar Empleado",
        description: "Datos empleado",
        icon: EditIcon,
        color: "bg-pink-600",
      },
      {
        id: "registrar_asistencia",
        label: "Registrar Asistencia",
        description: "Entrada/Salida",
        icon: ClockIcon,
        color: "bg-pink-600",
      },
      {
        id: "aprobar_vacaciones",
        label: "Aprobar Vacaciones",
        description: "Solicitud vacaciones",
        icon: CheckIcon,
        color: "bg-pink-600",
      },
      {
        id: "registrar_incapacidad",
        label: "Registrar Incapacidad",
        description: "Incapacidad médica",
        icon: FileTextIcon,
        color: "bg-pink-600",
      },
      {
        id: "calcular_nomina",
        label: "Calcular Nómina",
        description: "Liquidar nómina",
        icon: CalculatorIcon,
        color: "bg-pink-600",
      },
      {
        id: "generar_desprendible",
        label: "Generar Desprendible",
        description: "Colilla de pago",
        icon: FileTextIcon,
        color: "bg-pink-600",
      },
      {
        id: "programar_evaluacion",
        label: "Programar Evaluación",
        description: "Evaluación desempeño",
        icon: CalendarIcon,
        color: "bg-pink-600",
      },
      {
        id: "crear_novedad",
        label: "Crear Novedad",
        description: "Novedad nómina",
        icon: AlertCircleIcon,
        color: "bg-pink-600",
      },
      {
        id: "terminar_contrato",
        label: "Terminar Contrato",
        description: "Liquidación",
        icon: UserXIcon,
        color: "bg-pink-600",
      },
    ],
  },
  documentos: {
    label: "Documentos",
    icon: FileTextIcon,
    color: "bg-cyan-600",
    nodes: [
      {
        id: "generar_pdf",
        label: "Generar PDF",
        description: "Crear documento PDF",
        icon: FileTextIcon,
        color: "bg-cyan-600",
      },
      {
        id: "generar_excel",
        label: "Generar Excel",
        description: "Exportar a Excel",
        icon: TableIcon,
        color: "bg-green-700",
      },
      { id: "generar_xml", label: "Generar XML", description: "Archivo XML", icon: CodeIcon, color: "bg-cyan-600" },
      {
        id: "firmar_documento",
        label: "Firmar Documento",
        description: "Firma electrónica",
        icon: PenToolIcon,
        color: "bg-cyan-600",
      },
      {
        id: "enviar_dian",
        label: "Enviar a DIAN",
        description: "Transmitir DIAN",
        icon: SendIcon,
        color: "bg-blue-700",
      },
      {
        id: "archivar_documento",
        label: "Archivar Documento",
        description: "Guardar en DMS",
        icon: ArchiveIcon,
        color: "bg-cyan-600",
      },
      { id: "imprimir", label: "Imprimir", description: "Enviar a impresora", icon: PrinterIcon, color: "bg-cyan-600" },
      {
        id: "combinar_documentos",
        label: "Combinar PDFs",
        description: "Unir documentos",
        icon: LayersIcon,
        color: "bg-cyan-600",
      },
    ],
  },
  datos: {
    label: "Datos & Cálculos",
    icon: DatabaseIcon,
    color: "bg-violet-600",
    nodes: [
      {
        id: "crear_registro",
        label: "Crear Registro",
        description: "Nuevo registro",
        icon: Plus,
        color: "bg-violet-600",
      },
      {
        id: "actualizar_registro",
        label: "Actualizar Registro",
        description: "Modificar datos",
        icon: EditIcon,
        color: "bg-violet-600",
      },
      {
        id: "eliminar_registro",
        label: "Eliminar Registro",
        description: "Borrar registro",
        icon: Trash2,
        color: "bg-red-600",
      },
      {
        id: "ejecutar_nql",
        label: "Ejecutar NQL",
        description: "Query personalizado",
        icon: CodeIcon,
        color: "bg-violet-600",
      },
      {
        id: "set_variable",
        label: "Definir Variable",
        description: "Asignar valor",
        icon: Variable,
        color: "bg-violet-600",
      },
      {
        id: "calcular_formula",
        label: "Calcular Fórmula",
        description: "Operación matemática",
        icon: CalculatorIcon,
        color: "bg-violet-600",
      },
      {
        id: "transformar_datos",
        label: "Transformar Datos",
        description: "Mapear/Convertir",
        icon: ShuffleIcon,
        color: "bg-violet-600",
      },
      {
        id: "validar_datos",
        label: "Validar Datos",
        description: "Verificar formato",
        icon: CheckIcon,
        color: "bg-violet-600",
      },
    ],
  },
  tareas: {
    label: "Tareas & Procesos",
    icon: ClipboardCheckIcon,
    color: "bg-teal-600",
    nodes: [
      {
        id: "crear_tarea",
        label: "Crear Tarea",
        description: "Asignar tarea",
        icon: ClipboardCheckIcon,
        color: "bg-teal-600",
      },
      {
        id: "completar_tarea",
        label: "Completar Tarea",
        description: "Marcar completada",
        icon: CheckIcon,
        color: "bg-teal-600",
      },
      {
        id: "reasignar_tarea",
        label: "Reasignar Tarea",
        description: "Cambiar responsable",
        icon: UserCheckIcon,
        color: "bg-teal-600",
      },
      {
        id: "crear_recordatorio",
        label: "Crear Recordatorio",
        description: "Programar alerta",
        icon: BellIcon,
        color: "bg-teal-600",
      },
      {
        id: "programar_evento",
        label: "Programar Evento",
        description: "Agendar reunión",
        icon: CalendarIcon,
        color: "bg-teal-600",
      },
      {
        id: "log_auditoria",
        label: "Log Auditoría",
        description: "Registrar evento",
        icon: FileTextIcon,
        color: "bg-teal-600",
      },
      {
        id: "iniciar_proceso",
        label: "Iniciar Proceso",
        description: "Otro workflow",
        icon: PlayIcon,
        color: "bg-teal-600",
      },
      {
        id: "detener_proceso",
        label: "Detener Proceso",
        description: "Cancelar workflow",
        icon: SquareIcon,
        color: "bg-red-600",
      },
    ],
  },
  integraciones: {
    label: "Integraciones",
    icon: GlobeIcon,
    color: "bg-rose-600",
    nodes: [
      {
        id: "webhook_out",
        label: "Webhook Salida",
        description: "Enviar a URL externa",
        icon: WebhookIcon,
        color: "bg-rose-600",
      },
      { id: "llamar_api", label: "Llamar API", description: "HTTP Request", icon: GlobeIcon, color: "bg-rose-600" },
      {
        id: "slack_mensaje",
        label: "Slack",
        description: "Mensaje a Slack",
        icon: MessageSquareIcon,
        color: "bg-purple-700",
      },
      {
        id: "teams_mensaje",
        label: "Microsoft Teams",
        description: "Mensaje a Teams",
        icon: MessageSquareIcon,
        color: "bg-blue-700",
      },
      {
        id: "google_sheets",
        label: "Google Sheets",
        description: "Actualizar hoja",
        icon: TableIcon,
        color: "bg-green-700",
      },
      {
        id: "google_calendar",
        label: "Google Calendar",
        description: "Crear evento",
        icon: CalendarIcon,
        color: "bg-blue-600",
      },
      {
        id: "google_drive",
        label: "Google Drive",
        description: "Subir archivo",
        icon: HardDriveIcon,
        color: "bg-yellow-600",
      },
      { id: "dropbox", label: "Dropbox", description: "Sincronizar archivo", icon: BoxIcon, color: "bg-blue-600" },
      { id: "aws_s3", label: "AWS S3", description: "Subir a bucket", icon: CloudIcon, color: "bg-orange-600" },
      { id: "openai_gpt", label: "OpenAI GPT", description: "Generar con AI", icon: Sparkles, color: "bg-emerald-600" },
      { id: "trello", label: "Trello", description: "Crear tarjeta", icon: ClipboardListIcon, color: "bg-blue-600" },
      { id: "hubspot", label: "HubSpot", description: "Sincronizar CRM", icon: UsersIcon, color: "bg-orange-600" },
      { id: "mailchimp", label: "Mailchimp", description: "Agregar a lista", icon: MailIcon, color: "bg-yellow-500" },
      { id: "zapier", label: "Zapier", description: "Trigger Zap", icon: ZapIcon, color: "bg-orange-500" },
    ],
  },
}

// AI prompt examples
const aiExamplePrompts = [
  {
    title: "Facturación Electrónica DIAN Completa",
    prompt:
      "Cuando se cree una factura: 1) Validar datos del cliente (NIT, email, dirección). 2) Si hay errores, notificar al vendedor y pausar. 3) Generar XML según formato DIAN. 4) Enviar a la DIAN y esperar respuesta. 5) Si es aprobada: enviar por email al cliente con PDF y XML adjuntos, y por WhatsApp con link de descarga. 6) Si es rechazada: crear tarea urgente para el contador con el error específico, notificar al vendedor, y registrar en log de auditoría. 7) Actualizar estado de la factura en el sistema.",
  },
  {
    title: "Gestión Inteligente de Cartera",
    prompt:
      "Todos los días a las 8am: 1) Obtener facturas vencidas. 2) Para cada factura: si tiene 1-15 días vencida, enviar email recordatorio amigable. Si tiene 16-30 días, enviar email más WhatsApp y crear tarea para vendedor. Si tiene 31-60 días, llamada automática con AI Voice y escalar a supervisor de cartera. Si tiene más de 60 días, notificar a gerencia, bloquear crédito del cliente, y generar reporte para área jurídica. 3) Generar reporte diario de cartera enviado a dirección financiera con gráficos de aging.",
  },
  {
    title: "Control de Inventario Avanzado",
    prompt:
      "Cuando el stock baje del mínimo: 1) Clasificar producto por ABC (rotación). 2) Si es categoría A: generar orden de compra automática al proveedor con mejor precio/tiempo, enviar OC por email, notificar a jefe de compras por push. 3) Si es B: crear tarea de revisión para compras. 4) Si es C: solo notificar. 5) Si hay lote próximo a vencer (menos de 30 días): notificar a ventas para promoción, sugerir descuento automático del 20%, y mover a zona de liquidación en el sistema.",
  },
  {
    title: "Onboarding Completo de Cliente Nuevo",
    prompt:
      "Cuando se registre un cliente: 1) Validar NIT de DIAN. 2) Verificar en listas restrictivas (OFAC, ONU). 3) Si pasa validaciones: enviar email de bienvenida personalizado, crear carpeta en documentos, asignar vendedor por zona geográfica, programar llamada de bienvenida en 24 horas, crear tareas de seguimiento (día 7, 15, 30). 4) Si no pasa: notificar a compliance, bloquear cliente, registrar motivo. 5) Enviar kit de bienvenida digital (catálogo, lista de precios, políticas).",
  },
  {
    title: "Proceso de Compras Inteligente",
    prompt:
      "Cuando se cree una requisición de compra: 1) Si monto < $1M: aprobar automáticamente y generar OC. 2) Si monto entre $1M-$10M: enviar a jefe de área para aprobación, esperar máximo 24 horas, si no responde escalar a gerencia. 3) Si monto > $10M: requiere 3 cotizaciones de proveedores, comité de compras, aprobación de gerencia general. 4) Una vez aprobada: generar OC, enviar a proveedor, programar seguimiento en fecha de entrega prometida. 5) Si proveedor no confirma en 48 horas, enviar recordatorio y notificar a compras.",
  },
  {
    title: "Alertas de Producción en Tiempo Real",
    prompt:
      "Cuando una máquina reporte paro: 1) Clasificar tipo de paro (programado, falla, material). 2) Si es falla: notificar inmediatamente a supervisor por push y SMS, crear orden de mantenimiento correctivo urgente, calcular impacto en producción. 3) Si no se resuelve en 30 minutos: notificar a jefe de planta, notificar a planificación para reprogramar órdenes. 4) Si supera 2 horas: notificar a gerencia de operaciones, activar plan de contingencia, considerar tercerización. 5) Al resolver: registrar causa raíz, tiempo de paro, acciones tomadas para análisis posterior.",
  },
  {
    title: "Flujo de Cotización a Venta",
    prompt:
      "Cuando se cree una cotización: 1) Calcular margen y validar contra política de precios. 2) Si margen < mínimo: requiere aprobación de gerencia comercial. 3) Enviar cotización al cliente por email con PDF profesional. 4) Programar seguimiento: día 3 (email recordatorio), día 7 (llamada vendedor), día 14 (oferta especial -5%). 5) Si cliente acepta: convertir a pedido, notificar a logística, iniciar proceso de facturación. 6) Si rechaza: registrar motivo, notificar a inteligencia comercial, agregar a campaña de remarketing.",
  },
  {
    title: "Gestión de Devoluciones RMA",
    prompt:
      "Cuando cliente solicite devolución: 1) Validar que esté dentro de política (30 días, con factura). 2) Si aplica: generar número RMA, enviar instrucciones por email y WhatsApp, programar recogida con transportadora. 3) Al recibir producto: inspección de calidad, tomar fotos, registrar estado. 4) Si producto OK: procesar reembolso o cambio según preferencia, generar nota crédito. 5) Si producto dañado por cliente: notificar con fotos, ofrecer reparación con costo. 6) Actualizar inventario, notificar al cliente resultado final, encuesta de satisfacción.",
  },
]

export function FlowBuilderModal({ open, onClose }: FlowBuilderModalProps) {
  const [flowName, setFlowName] = useState("Nuevo Flujo")
  const [flowNodes, setFlowNodes] = useState<FlowNode[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null)
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set())
  const [activeCategory, setActiveCategory] = useState<string>("all") // CHANGE: Default to 'all'
  // const [activeTriggerCategory, setActiveTriggerCategory] = useState<string>("ventas") // REMOVED
  // const [activeActionCategory, setActiveActionCategory] = useState<string>("comunicacion") // REMOVED
  const [zoom, setZoom] = useState(100)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedNode, setDraggedNode] = useState<{ type: string; data: any } | null>(null)

  // Add connection error state, hovered node, and connection preview
  const [connectionError, setConnectionError] = useState<ConnectionError | null>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [connectionPreview, setConnectionPreview] = useState<{ x: number; y: number } | null>(null)
  const [connectingFrom, setConnectingFrom] = useState<{ nodeId: string; portIndex: number } | null>(null)

  const [isRunning, setIsRunning] = useState(false)
  const [showMinimap, setShowMinimap] = useState(true)
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(true)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const [showKeyboardModal, setShowKeyboardModal] = useState(false)
  const [importJson, setImportJson] = useState("")
  const [aiPrompt, setAiPrompt] = useState("")
  // CHANGE: Expanded test panel state
  const [showTestPanel, setShowTestPanel] = useState(false)
  const [testResults, setTestResults] = useState<
    Array<{
      nodeId: string
      nodeName: string
      status: "success" | "error" | "running" | "pending"
      duration: number
      output: Record<string, unknown>
      error?: string
    }>
  >([])
  const [searchNodes, setSearchNodes] = useState("")
  const [history, setHistory] = useState<{ nodes: FlowNode[]; connections: Connection[] }[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [clipboard, setClipboard] = useState<FlowNode[]>([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectionStart, setSelectionStart] = useState<{ x: number; y: number } | null>(null)
  const [selectionEnd, setSelectionEnd] = useState<{ x: number; y: number } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const validateConnection = useCallback(
    (fromNodeId: string, toNodeId: string): ConnectionValidation => {
      const fromNode = flowNodes.find((n) => n.id === fromNodeId)
      const toNode = flowNodes.find((n) => n.id === toNodeId)

      if (!fromNode || !toNode) {
        return { valid: false, error: { message: "Nodo no encontrado", type: "error" } }
      }

      // Rule 1: Can't connect to self
      if (fromNodeId === toNodeId) {
        return { valid: false, error: { message: "No puedes conectar un nodo consigo mismo", type: "error" } }
      }

      // Rule 2: Triggers can't connect to triggers
      if (fromNode.category === "trigger" && toNode.category === "trigger") {
        return { valid: false, error: { message: "No puedes conectar dos triggers entre sí", type: "error" } }
      }

      // Rule 3: Can't connect to a trigger (triggers are entry points)
      if (toNode.category === "trigger") {
        return {
          valid: false,
          error: { message: "Los triggers son puntos de entrada, no pueden recibir conexiones", type: "error" },
        }
      }

      // Rule 4: Check if connection already exists
      const existingConnection = connections.find((c) => c.from === fromNodeId && c.to === toNodeId)
      if (existingConnection) {
        return { valid: false, error: { message: "Esta conexión ya existe", type: "warning" } }
      }

      // Rule 5: Check for circular dependencies (basic check)
      const wouldCreateCycle = (from: string, to: string, visited = new Set<string>()): boolean => {
        if (from === to) return true
        if (visited.has(to)) return false
        visited.add(to)
        const outgoing = connections.filter((c) => c.from === to)
        return outgoing.some((c) => wouldCreateCycle(from, c.to, visited))
      }

      if (wouldCreateCycle(toNodeId, fromNodeId)) {
        return { valid: false, error: { message: "Esta conexión crearía un ciclo infinito", type: "error" } }
      }

      // Rule 6: Actions should come after logic or triggers
      if (fromNode.category === "action" && toNode.category === "logic") {
        return { valid: true, error: { message: "Considera poner la lógica antes de las acciones", type: "warning" } }
      }

      return { valid: true }
    },
    [flowNodes, connections],
  )

  const getValidTargets = useCallback((): Set<string> => {
    if (!connectingFrom) return new Set()

    const validTargets = new Set<string>()
    flowNodes.forEach((node) => {
      if (node.id !== connectingFrom.nodeId) {
        const validation = validateConnection(connectingFrom.nodeId, node.id)
        if (validation.valid || validation.error?.type === "warning") {
          validTargets.add(node.id)
        }
      }
    })
    return validTargets
  }, [connectingFrom, flowNodes, validateConnection])

  const validTargets = connectingFrom ? getValidTargets() : new Set<string>()

  // Save to history
  const saveToHistory = useCallback(() => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push({ nodes: [...flowNodes], connections: [...connections] })
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [flowNodes, connections, history, historyIndex])

  // Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1]
      setFlowNodes(prev.nodes)
      setConnections(prev.connections)
      setHistoryIndex(historyIndex - 1)
    }
  }, [history, historyIndex])

  // Redo
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1]
      setFlowNodes(next.nodes)
      setConnections(next.connections)
      setHistoryIndex(historyIndex + 1)
    }
  }, [history, historyIndex])

  // Add node
  const addNode = useCallback(
    (nodeData: any, position?: { x: number; y: number }) => {
      const newNode: FlowNode = {
        ...nodeData,
        id: `${nodeData.id}-${Date.now()}`,
        type: nodeData.id,
        category:
          nodeData.category ||
          (activeCategory === "triggers" ? "trigger" : activeCategory === "logic" ? "logic" : "action"),
        position: position || { x: 400, y: flowNodes.length * 180 + 100 },
        connections: [],
        config: {},
        outputs: nodeData.outputs || 1,
        outputLabels: nodeData.outputLabels || ["Siguiente"],
      }
      setFlowNodes((prev) => [...prev, newNode])
      setSelectedNode(newNode)
      saveToHistory()
    },
    [flowNodes.length, activeCategory, saveToHistory],
  )

  // Remove node
  const removeNode = useCallback(
    (nodeId: string) => {
      setFlowNodes((prev) => prev.filter((n) => n.id !== nodeId))
      setConnections((prev) => prev.filter((c) => c.from !== nodeId && c.to !== nodeId))
      if (selectedNode?.id === nodeId) setSelectedNode(null)
      setSelectedNodes((prev) => {
        const next = new Set(prev)
        next.delete(nodeId)
        return next
      })
      saveToHistory()
    },
    [selectedNode, saveToHistory],
  )

  // Remove selected nodes
  const removeSelectedNodes = useCallback(() => {
    if (selectedNodes.size > 0) {
      setFlowNodes((prev) => prev.filter((n) => !selectedNodes.has(n.id)))
      setConnections((prev) => prev.filter((c) => !selectedNodes.has(c.from) && !selectedNodes.has(c.to)))
      setSelectedNodes(new Set())
      setSelectedNode(null)
      saveToHistory()
    } else if (selectedNode) {
      removeNode(selectedNode.id)
    }
  }, [selectedNodes, selectedNode, removeNode, saveToHistory])

  // Update node position
  const updateNodePosition = useCallback((nodeId: string, position: { x: number; y: number }) => {
    setFlowNodes((prev) => prev.map((node) => (node.id === nodeId ? { ...node, position } : node)))
  }, [])

  // Update node config
  const updateNodeConfig = useCallback((nodeId: string, key: string, value: string | number | boolean) => {
    setFlowNodes((prev) =>
      prev.map((node) => (node.id === nodeId ? { ...node, config: { ...node.config, [key]: value } } : node)),
    )
    setSelectedNode((prev) => (prev?.id === nodeId ? { ...prev, config: { ...prev.config, [key]: value } } : prev))
  }, [])

  // Handle canvas drop
  const handleCanvasDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (!draggedNode || !canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left + canvasRef.current.scrollLeft) * (100 / zoom) - 140
      const y = (e.clientY - rect.top + canvasRef.current.scrollTop) * (100 / zoom) - 50
      addNode(draggedNode.data, { x: Math.max(0, x), y: Math.max(0, y) })
      setDraggedNode(null)
      setIsDragging(false)
    },
    [draggedNode, zoom, addNode],
  )

  const startConnection = useCallback((nodeId: string, portIndex: number, e?: React.MouseEvent) => {
    setConnectingFrom({ nodeId, portIndex })
    setConnectionError(null)
    if (e) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        setConnectionPreview({
          x: e.clientX - rect.left + canvasRef.current.scrollLeft,
          y: e.clientY - rect.top + canvasRef.current.scrollTop,
        })
      }
    }
  }, [])

  // CHANGE: Fixed handleCanvasMouseMove to update selectionEnd during area selection
  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent) => {
      // Update connection preview when connecting
      if (connectingFrom && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        setConnectionPreview({
          x: e.clientX - rect.left + canvasRef.current.scrollLeft,
          y: e.clientY - rect.top + canvasRef.current.scrollTop,
        })
      }

      // Update selection rectangle when selecting
      if (isSelecting && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        setSelectionEnd({
          x: e.clientX - rect.left + canvasRef.current.scrollLeft,
          y: e.clientY - rect.top + canvasRef.current.scrollTop,
        })
      }
    },
    [connectingFrom, isSelecting],
  )

  const endConnection = useCallback(
    (nodeId: string) => {
      if (!connectingFrom || connectingFrom.nodeId === nodeId) {
        setConnectingFrom(null)
        setConnectionPreview(null)
        return
      }

      const validation = validateConnection(connectingFrom.nodeId, nodeId)

      if (!validation.valid) {
        setConnectionError(validation.error || { message: "Conexión no válida", type: "error" })
        setTimeout(() => setConnectionError(null), 3000)
        setConnectingFrom(null)
        setConnectionPreview(null)
        return
      }

      if (validation.error?.type === "warning") {
        setConnectionError(validation.error)
        setTimeout(() => setConnectionError(null), 3000)
      }

      const newConnection: Connection = {
        id: `conn-${Date.now()}`,
        from: connectingFrom.nodeId,
        to: nodeId,
        fromPort: connectingFrom.portIndex,
        toPort: "top",
      }
      setConnections((prev) => [...prev, newConnection])
      saveToHistory()

      setConnectingFrom(null)
      setConnectionPreview(null)
    },
    [connectingFrom, validateConnection, saveToHistory],
  )

  const cancelConnection = useCallback(() => {
    setConnectingFrom(null)
    setConnectionPreview(null)
    setConnectionError(null)
  }, [])

  // Duplicate node
  const duplicateNode = useCallback(
    (node: FlowNode) => {
      const newNode: FlowNode = {
        ...node,
        id: `${node.type}-${Date.now()}`,
        position: { x: node.position.x + 50, y: node.position.y + 50 },
        connections: [],
        config: { ...node.config },
      }
      setFlowNodes((prev) => [...prev, newNode])
      saveToHistory()
    },
    [saveToHistory],
  )

  // Copy selected
  const copySelected = useCallback(() => {
    const nodesToCopy = flowNodes.filter((n) => selectedNodes.has(n.id) || n.id === selectedNode?.id)
    setClipboard(nodesToCopy)
  }, [flowNodes, selectedNodes, selectedNode])

  // Paste
  const paste = useCallback(() => {
    if (clipboard.length === 0) return
    const newNodes = clipboard.map((node, i) => ({
      ...node,
      id: `${node.type}-${Date.now()}-${i}`,
      position: { x: node.position.x + 100, y: node.position.y + 100 },
      connections: [],
    }))
    setFlowNodes((prev) => [...prev, ...newNodes])
    setSelectedNodes(new Set(newNodes.map((n) => n.id)))
    saveToHistory()
  }, [clipboard, saveToHistory])

  // Select all
  const selectAll = useCallback(() => {
    setSelectedNodes(new Set(flowNodes.map((n) => n.id)))
  }, [flowNodes])

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedNodes(new Set())
    setSelectedNode(null)
  }, [])

  // Handle canvas mouse down for selection
  const handleCanvasMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === canvasRef.current || (e.target as HTMLElement).classList.contains("canvas-bg")) {
        if (!e.shiftKey) {
          clearSelection()
        }
        const rect = canvasRef.current?.getBoundingClientRect()
        if (rect) {
          setIsSelecting(true)
          setSelectionStart({ x: e.clientX - rect.left, y: e.clientY - rect.top })
          setSelectionEnd({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        }
      }
    },
    [clearSelection],
  )

  // Handle canvas mouse up for selection
  const handleCanvasMouseUp = useCallback(() => {
    if (isSelecting && selectionStart && selectionEnd) {
      const minX = Math.min(selectionStart.x, selectionEnd.x) * (100 / zoom)
      const maxX = Math.max(selectionStart.x, selectionEnd.x) * (100 / zoom)
      const minY = Math.min(selectionStart.y, selectionEnd.y) * (100 / zoom)
      const maxY = Math.max(selectionStart.y, selectionEnd.y) * (100 / zoom)

      const selected = flowNodes.filter((node) => {
        const nodeX = node.position.x
        const nodeY = node.position.y
        return nodeX >= minX && nodeX <= maxX && nodeY >= minY && nodeY <= maxY
      })

      setSelectedNodes(new Set(selected.map((n) => n.id)))
    }
    setIsSelecting(false)
    setSelectionStart(null)
    setSelectionEnd(null)
  }, [isSelecting, selectionStart, selectionEnd, flowNodes, zoom])

  // Keyboard shortcuts
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return

      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault()
        removeSelectedNodes()
      } else if (e.key === "Escape") {
        clearSelection()
        cancelConnection() // Also cancel connection if Escape is pressed
      } else if (e.ctrlKey || e.metaKey) {
        if (e.key === "a") {
          e.preventDefault()
          selectAll()
        } else if (e.key === "c") {
          e.preventDefault()
          copySelected()
        } else if (e.key === "v") {
          e.preventDefault()
          paste()
        } else if (e.key === "d") {
          e.preventDefault()
          if (selectedNode) duplicateNode(selectedNode)
        } else if (e.key === "z") {
          e.preventDefault()
          if (e.shiftKey) redo()
          else undo()
        } else if (e.key === "y") {
          e.preventDefault()
          redo()
        } else if (e.key === "=" || e.key === "+") {
          e.preventDefault()
          setZoom((z) => Math.min(200, z + 10))
        } else if (e.key === "-") {
          e.preventDefault()
          setZoom((z) => Math.max(25, z - 10))
        } else if (e.key === "0") {
          e.preventDefault()
          setZoom(100)
        } else if (e.key === "s") {
          e.preventDefault()
          // Implement save logic here if needed
          console.log("Save shortcut pressed")
        }
      } else if (e.key === "?") {
        setShowKeyboardModal(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [
    open,
    removeSelectedNodes,
    clearSelection,
    cancelConnection,
    selectAll,
    copySelected,
    paste,
    selectedNode,
    duplicateNode,
    undo,
    redo,
  ])

  // CHANGE: Improved testFlow function with better simulation and results panel
  const testFlow = useCallback(() => {
    if (flowNodes.length === 0) return

    setIsRunning(true)
    setShowTestPanel(true)
    setTestResults([])

    // Initialize all nodes as pending
    const initialResults = flowNodes.map((node) => ({
      nodeId: node.id,
      nodeName: node.label,
      status: "pending" as const,
      duration: 0,
      output: {},
    }))
    setTestResults(initialResults)

    // Sort nodes by connections to determine execution order
    const executionOrder: string[] = []
    const visited = new Set<string>()

    // Find trigger nodes (no incoming connections)
    const triggerNodes = flowNodes.filter(
      (node) => node.category === "trigger" || !connections.some((c) => c.to === node.id),
    )

    // BFS to determine execution order
    const queue = [...triggerNodes.map((n) => n.id)]
    while (queue.length > 0) {
      const nodeId = queue.shift()!
      if (visited.has(nodeId)) continue
      visited.add(nodeId)
      executionOrder.push(nodeId)

      // Find connected nodes
      const nextNodes = connections.filter((c) => c.from === nodeId).map((c) => c.to)
      queue.push(...nextNodes)
    }

    // Add any unvisited nodes
    flowNodes.forEach((n) => {
      if (!visited.has(n.id)) executionOrder.push(n.id)
    })

    // Execute nodes in order with animation
    executionOrder.forEach((nodeId, index) => {
      setTimeout(() => {
        setTestResults((prev) => prev.map((r) => (r.nodeId === nodeId ? { ...r, status: "running" as const } : r)))

        // Simulate execution delay
        setTimeout(
          () => {
            const node = flowNodes.find((n) => n.id === nodeId)
            const success = Math.random() > 0.1 // 90% success rate
            const duration = Math.floor(Math.random() * 800) + 100

            setTestResults((prev) =>
              prev.map((r) =>
                r.nodeId === nodeId
                  ? {
                      ...r,
                      status: success ? "success" : "error",
                      duration,
                      output: success
                        ? {
                            processed: true,
                            timestamp: new Date().toISOString(),
                            data:
                              node?.category === "trigger"
                                ? { eventType: node.type, triggered: true }
                                : { result: "completed", records: Math.floor(Math.random() * 100) },
                          }
                        : {},
                      error: success ? undefined : "Error simulado: Timeout de conexión",
                    }
                  : r,
              ),
            )

            // Check if all done
            if (index === executionOrder.length - 1) {
              setTimeout(() => setIsRunning(false), 300)
            }
          },
          Math.random() * 500 + 200,
        )
      }, index * 600)
    })
  }, [flowNodes, connections])

  // Export flow
  const downloadFlow = useCallback(() => {
    const flowData = { name: flowName, nodes: flowNodes, connections, version: "1.0" }
    const blob = new Blob([JSON.stringify(flowData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${flowName.toLowerCase().replace(/\s+/g, "-")}.json`
    a.click()
    URL.revokeObjectURL(url)
    setShowExportModal(false)
  }, [flowName, flowNodes, connections])

  // Import flow
  const importFlow = useCallback(
    (jsonString?: string) => {
      try {
        const data = JSON.parse(jsonString || importJson)
        if (data.nodes && data.connections) {
          setFlowNodes(data.nodes)
          setConnections(data.connections)
          if (data.name) setFlowName(data.name)
          setShowImportModal(false)
          setImportJson("")
          saveToHistory()
        }
      } catch (e) {
        console.error("Error importing flow:", e)
      }
    },
    [importJson, saveToHistory],
  )

  // Generate with AI
  const generateWithAI = useCallback(() => {
    if (!aiPrompt.trim()) return

    const newNodes: FlowNode[] = []
    const newConnections: Connection[] = []

    // Helper to generate unique IDs
    const genId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Helper to add a connection
    const connect = (fromNode: FlowNode, toNode: FlowNode, fromPort = 0) => {
      newConnections.push({
        id: genId("conn"),
        from: fromNode.id,
        to: toNode.id,
        fromPort,
        toPort: 0,
      })
    }

    // Helper to create a node
    const createNode = (
      type: string,
      label: string,
      description: string,
      icon: any,
      color: string,
      category: "trigger" | "logic" | "action",
      x: number,
      y: number,
      config: Record<string, any> = {},
      outputs = 1,
      outputLabels = ["Siguiente"],
    ): FlowNode => ({
      id: genId(type),
      type,
      label,
      description,
      icon,
      color,
      category,
      position: { x, y },
      connections: [],
      config,
      outputs,
      outputLabels,
    })

    const promptLower = aiPrompt.toLowerCase()

    // Layout constants
    const startX = 300
    const startY = 80
    const nodeSpacingY = 140
    const branchOffsetX = 300

    let currentY = startY

    // ===== DETECT FLOW TYPE AND CREATE APPROPRIATE FLOW =====

    // FLOW: Facturación DIAN
    if (
      promptLower.includes("dian") ||
      promptLower.includes("factura electrónica") ||
      promptLower.includes("facturación electrónica")
    ) {
      // Trigger
      const trigger = createNode(
        "factura_creada",
        "Nueva Factura Creada",
        "Se genera una nueva factura",
        FileTextIcon,
        "bg-green-500",
        "trigger",
        startX,
        currentY,
      )
      newNodes.push(trigger)
      currentY += nodeSpacingY

      // Validar datos
      const validar = createNode(
        "condition",
        "Validar Datos Completos",
        "NIT, razón social, items",
        GitBranchIcon,
        "bg-yellow-500",
        "logic",
        startX,
        currentY,
        { campo: "datos_validos", operador: "==", valor: "true" },
        2,
        ["Válido", "Inválido"],
      )
      newNodes.push(validar)
      connect(trigger, validar)
      currentY += nodeSpacingY

      // Rama inválida - notificar error
      const notificarError = createNode(
        "enviar_email",
        "Notificar Error Datos",
        "Alertar datos incompletos",
        MailIcon,
        "bg-red-500",
        "action",
        startX + branchOffsetX,
        currentY - nodeSpacingY / 2,
        { destinatario: "{{usuario.email}}", asunto: "Error en factura - Datos incompletos" },
      )
      newNodes.push(notificarError)
      connect(validar, notificarError, 1)

      // Generar XML
      const generarXML = createNode(
        "transform",
        "Generar XML DIAN",
        "Formato UBL 2.1",
        CodeIcon,
        "bg-blue-500",
        "logic",
        startX,
        currentY,
      ) // Using default outputs/outputLabels here
      newNodes.push(generarXML)
      connect(validar, generarXML, 0)
      currentY += nodeSpacingY

      // Firmar documento
      const firmar = createNode(
        "webhook_out",
        "Firmar Digitalmente",
        "Certificado digital",
        ShieldIcon,
        "bg-purple-500",
        "action",
        startX,
        currentY,
        { url: "https://firma.api/sign", metodo: "POST" },
      )
      newNodes.push(firmar)
      connect(generarXML, firmar)
      currentY += nodeSpacingY

      // Enviar a DIAN
      const enviarDIAN = createNode(
        "webhook_out",
        "Transmitir a DIAN",
        "API de facturación",
        Building2Icon,
        "bg-blue-700",
        "action",
        startX,
        currentY,
        { url: "https://vpfe.dian.gov.co/WcfDianCustomerServices.svc", metodo: "POST" },
      )
      newNodes.push(enviarDIAN)
      connect(firmar, enviarDIAN)
      currentY += nodeSpacingY

      // Verificar respuesta
      const verificarRespuesta = createNode(
        "condition",
        "Verificar Respuesta DIAN",
        "Código de respuesta",
        GitBranchIcon,
        "bg-yellow-500",
        "logic",
        startX,
        currentY,
        { campo: "codigo_respuesta", operador: "==", valor: "200" },
        2,
        ["Aceptada", "Rechazada"],
      )
      newNodes.push(verificarRespuesta)
      connect(enviarDIAN, verificarRespuesta)
      currentY += nodeSpacingY

      // Rama aceptada
      const guardarCUFE = createNode(
        "actualizar_registro",
        "Guardar CUFE",
        "Actualizar factura con CUFE",
        DatabaseIcon,
        "bg-green-600",
        "action",
        startX - branchOffsetX / 2,
        currentY,
        { entidad: "Factura", campo: "cufe" },
      )
      newNodes.push(guardarCUFE)
      connect(verificarRespuesta, guardarCUFE, 0)

      // Rama rechazada
      const alertaRechazo = createNode(
        "notificacion_push",
        "Alerta Rechazo DIAN",
        "Notificar rechazo",
        BellIcon,
        "bg-red-500",
        "action",
        startX + branchOffsetX / 2,
        currentY,
        { titulo: "Factura Rechazada", mensaje: "{{factura.numero}} rechazada por DIAN" },
      )
      newNodes.newNodes.push(alertaRechazo)
      connect(verificarRespuesta, alertaRechazo, 1)
      currentY += nodeSpacingY

      // Email al cliente
      const emailCliente = createNode(
        "enviar_email",
        "Enviar Factura al Cliente",
        "PDF + XML adjunto",
        MailIcon,
        "bg-blue-600",
        "action",
        startX - branchOffsetX / 2,
        currentY,
        { destinatario: "{{cliente.email}}", asunto: "Factura #{{factura.numero}}", adjuntar_pdf: true },
      )
      newNodes.push(emailCliente)
      connect(guardarCUFE, emailCliente)
    }

    // FLOW: Gestión de Cartera / Cobros
    else if (
      promptLower.includes("cartera") ||
      promptLower.includes("cobro") ||
      promptLower.includes("vencid") ||
      promptLower.includes("mora")
    ) {
      // Trigger
      const trigger = createNode(
        "programado",
        "Ejecutar Diariamente 8AM",
        "Revisión de cartera",
        ClockIcon,
        "bg-purple-500",
        "trigger",
        startX,
        currentY,
        { hora: "08:00", dias: ["L", "M", "X", "J", "V"] },
      )
      newNodes.push(trigger)
      currentY += nodeSpacingY

      // Buscar facturas vencidas
      const buscar = createNode(
        "consultar_datos",
        "Buscar Facturas Vencidas",
        "Estado pendiente, fecha < hoy",
        SearchIcon,
        "bg-blue-500",
        "action",
        startX,
        currentY,
        { consulta: "facturas WHERE estado = pendiente AND fecha_vencimiento < NOW()" },
      )
      newNodes.push(buscar)
      connect(trigger, buscar)
      currentY += nodeSpacingY

      // Loop por cada factura
      const loop = createNode(
        "loop",
        "Por Cada Factura",
        "Iterar facturas vencidas",
        RepeatIcon,
        "bg-orange-500",
        "logic",
        startX,
        currentY,
        { coleccion: "{{facturas_vencidas}}" },
      )
      newNodes.push(loop)
      connect(buscar, loop)
      currentY += nodeSpacingY

      // Calcular días de mora
      const calcular = createNode(
        "transform",
        "Calcular Días Mora",
        "Diferencia de fechas",
        CalculatorIcon,
        "bg-gray-500",
        "logic",
        startX,
        currentY,
        { formula: "HOY() - fecha_vencimiento" },
      )
      newNodes.push(calcular)
      connect(loop, calcular)
      currentY += nodeSpacingY

      // Switch por días de mora
      const switchMora = createNode(
        "switch_case",
        "Nivel de Escalamiento",
        "Según días de mora",
        GitBranchIcon,
        "bg-yellow-500",
        "logic",
        startX,
        currentY,
        { campo: "dias_mora", casos: ["1-7", "8-15", "16-30", ">30"] },
        4,
        ["1-7 días", "8-15 días", "16-30 días", "+30 días"],
      )
      newNodes.push(switchMora)
      connect(calcular, switchMora)
      currentY += nodeSpacingY

      // Rama 1-7 días: Email recordatorio
      const email1 = createNode(
        "enviar_email",
        "Recordatorio Suave",
        "Email amable",
        MailIcon,
        "bg-blue-500",
        "action",
        startX - branchOffsetX,
        currentY,
        { plantilla: "recordatorio_suave", asunto: "Recordatorio de pago - {{factura.numero}}" },
      )
      newNodes.push(email1)
      connect(switchMora, email1, 0)

      // Rama 8-15 días: Email + WhatsApp
      const email2 = createNode(
        "enviar_email",
        "Recordatorio Firme",
        "Email formal",
        MailIcon,
        "bg-yellow-500",
        "action",
        startX - branchOffsetX / 3,
        currentY,
        { plantilla: "recordatorio_firme" },
      )
      newNodes.push(email2)
      connect(switchMora, email2, 1)

      const whatsapp2 = createNode(
        "enviar_whatsapp",
        "WhatsApp Cobro",
        "Mensaje directo",
        MessageSquareIcon,
        "bg-green-500",
        "action",
        startX - branchOffsetX / 3,
        currentY + nodeSpacingY,
      )
      newNodes.push(whatsapp2)
      connect(email2, whatsapp2)

      // Rama 16-30 días: Llamada + Tarea
      const tarea3 = createNode(
        "crear_tarea",
        "Asignar Llamada Cobro",
        "Tarea para cobranza",
        PhoneIcon,
        "bg-orange-500",
        "action",
        startX + branchOffsetX / 3,
        currentY,
        { titulo: "Llamar cliente moroso", prioridad: "Alta", asignado: "Cobranza" },
      )
      newNodes.push(tarea3)
      connect(switchMora, tarea3, 2)

      // Rama +30 días: Bloquear cliente
      const bloquear = createNode(
        "actualizar_registro",
        "Bloquear Cliente",
        "Suspender crédito",
        AlertTriangleIcon,
        "bg-red-500",
        "action",
        startX + branchOffsetX,
        currentY,
        { entidad: "Cliente", campo: "estado_credito", valor: "bloqueado" },
      )
      newNodes.push(bloquear)
      connect(switchMora, bloquear, 3)

      const notificarGerencia = createNode(
        "enviar_email",
        "Notificar Gerencia",
        "Alerta cartera crítica",
        MailIcon,
        "bg-red-600",
        "action",
        startX + branchOffsetX,
        currentY + nodeSpacingY,
        { destinatario: "gerencia@empresa.com", asunto: "URGENTE: Cliente con mora +30 días" },
      )
      newNodes.push(notificarGerencia)
      connect(bloquear, notificarGerencia)
    }

    // FLOW: Stock Bajo / Inventario
    else if (
      promptLower.includes("stock") ||
      promptLower.includes("inventario") ||
      promptLower.includes("mínimo") ||
      promptLower.includes("reorden")
    ) {
      // Trigger
      const trigger = createNode(
        "stock_bajo",
        "Stock Bajo Detectado",
        "Producto bajo mínimo",
        PackageIcon,
        "bg-red-500",
        "trigger",
        startX,
        currentY,
        { umbral: 10 },
      )
      newNodes.push(trigger)
      currentY += nodeSpacingY

      // Verificar criticidad
      const verificar = createNode(
        "condition",
        "Verificar Criticidad",
        "Producto crítico?",
        GitBranchIcon,
        "bg-yellow-500",
        "logic",
        startX,
        currentY,
        { campo: "producto.critico", operador: "==", valor: "true" },
        2,
        ["Crítico", "Normal"],
      )
      newNodes.push(verificar)
      connect(trigger, verificar)
      currentY += nodeSpacingY

      // Rama crítica - Alerta inmediata
      const alertaCritica = createNode(
        "enviar_sms",
        "SMS Urgente Compras",
        "Alerta inmediata",
        MessageSquareIcon,
        "bg-red-500",
        "action",
        startX + branchOffsetX,
        currentY - nodeSpacingY / 2,
        { telefono: "{{jefe_compras.telefono}}", mensaje: "URGENTE: {{producto.nombre}} en stock crítico" },
      )
      newNodes.push(alertaCritica)
      connect(verificar, alertaCritica, 0)

      // Buscar proveedor preferido
      const buscarProveedor = createNode(
        "consultar_datos",
        "Buscar Mejor Proveedor",
        "Precio y disponibilidad",
        SearchIcon,
        "bg-blue-500",
        "action",
        startX,
        currentY,
        { consulta: "proveedores WHERE producto_id = {{producto.id}} ORDER BY precio ASC" },
      )
      newNodes.push(buscarProveedor)
      connect(verificar, buscarProveedor, 1)
      connect(alertaCritica, buscarProveedor)
      currentY += nodeSpacingY

      // Calcular cantidad óptima
      const calcularCantidad = createNode(
        "transform",
        "Calcular Cantidad Pedido",
        "EOQ + Lead time",
        CalculatorIcon,
        "bg-purple-500",
        "logic",
        startX,
        currentY,
        { formula: "MAX(punto_reorden - stock_actual, lote_minimo)" },
      )
      newNodes.push(calcularCantidad)
      connect(buscarProveedor, calcularCantidad)
      currentY += nodeSpacingY

      // Verificar presupuesto
      const verificarPresupuesto = createNode(
        "condition",
        "Verificar Presupuesto",
        "Fondos disponibles?",
        GitBranchIcon,
        "bg-yellow-500",
        "logic",
        startX,
        currentY,
        { campo: "presupuesto_disponible", operador: ">=", valor: "{{costo_estimado}}" },
        2,
        ["Aprobado", "Sin Fondos"],
      )
      newNodes.push(verificarPresupuesto)
      connect(calcularCantidad, verificarPresupuesto)
      currentY += nodeSpacingY

      // Generar OC automática
      const generarOC = createNode(
        "crear_registro",
        "Generar Orden de Compra",
        "OC automática",
        FileTextIcon,
        "bg-green-500",
        "action",
        startX - branchOffsetX / 2,
        currentY,
        { entidad: "OrdenCompra", datos: '{"proveedor": "{{proveedor.id}}", "cantidad": "{{cantidad_pedido}}"}' },
      )
      newNodes.push(generarOC)
      connect(verificarPresupuesto, generarOC, 0)

      // Solicitar aprobación
      const solicitarAprobacion = createNode(
        "wait_approval",
        "Solicitar Aprobación Gerencia",
        "Gerente financiero",
        UserCheckIcon,
        "bg-orange-500",
        "logic",
        startX + branchOffsetX / 2,
        currentY,
        { aprobador: "Gerente Financiero", timeout: 24 },
      )
      newNodes.push(solicitarAprobacion)
      connect(verificarPresupuesto, solicitarAprobacion, 1)
      currentY += nodeSpacingY

      // Email a proveedor
      const emailProveedor = createNode(
        "enviar_email",
        "Enviar OC a Proveedor",
        "Email con PDF adjunto",
        MailIcon,
        "bg-blue-600",
        "action",
        startX - branchOffsetX / 2,
        currentY,
        { destinatario: "{{proveedor.email}}", asunto: "Orden de Compra - {{oc.numero}}", adjuntar_pdf: true },
      )
      newNodes.push(emailProveedor)
      connect(generarOC, emailProveedor)

      // Notificar almacén
      const notificarAlmacen = createNode(
        "notificacion_push",
        "Notificar Almacén",
        "Pedido en camino",
        BellIcon,
        "bg-blue-500",
        "action",
        startX - branchOffsetX / 2,
        currentY + nodeSpacingY,
      )
      newNodes.push(notificarAlmacen)
      connect(emailProveedor, notificarAlmacen)
    }

    // FLOW: Cliente Nuevo / Onboarding
    else if (
      promptLower.includes("cliente nuevo") ||
      promptLower.includes("registro") ||
      promptLower.includes("onboarding") ||
      promptLower.includes("bienvenida")
    ) {
      // Trigger
      const trigger = createNode(
        "cliente_nuevo",
        "Cliente Registrado",
        "Nuevo cliente en sistema",
        UsersIcon,
        "bg-purple-500",
        "trigger",
        startX,
        currentY,
      )
      newNodes.push(trigger)
      currentY += nodeSpacingY

      // Clasificar cliente
      const clasificar = createNode(
        "switch_case",
        "Clasificar Cliente",
        "Por tipo de empresa",
        GitBranchIcon,
        "bg-yellow-500",
        "logic",
        startX,
        currentY,
        { campo: "cliente.tipo", casos: ["Persona Natural", "PyME", "Corporativo"] },
        3,
        ["Natural", "PyME", "Corp"],
      )
      newNodes.push(clasificar)
      connect(trigger, clasificar)
      currentY += nodeSpacingY

      // Rama Natural
      const emailNatural = createNode(
        "enviar_email",
        "Email Bienvenida Personal",
        "Plantilla básica",
        MailIcon,
        "bg-blue-500",
        "action",
        startX - branchOffsetX,
        currentY,
        { plantilla: "bienvenida_natural", asunto: "¡Bienvenido a la familia!" },
      )
      newNodes.push(emailNatural)
      connect(clasificar, emailNatural, 0)

      const cuponNatural = createNode(
        "crear_registro",
        "Generar Cupón 10%",
        "Descuento primera compra",
        TagIcon,
        "bg-green-500",
        "action",
        startX - branchOffsetX,
        currentY + nodeSpacingY,
        { entidad: "Cupon", descuento: 10 },
      )
      newNodes.push(cuponNatural)
      connect(emailNatural, cuponNatural)

      // Rama PyME
      const emailPyme = createNode(
        "enviar_email",
        "Email Bienvenida PyME",
        "Beneficios empresariales",
        MailIcon,
        "bg-blue-600",
        "action",
        startX,
        currentY,
        { plantilla: "bienvenida_pyme" },
      )
      newNodes.push(emailPyme)
      connect(clasificar, emailPyme, 1)

      const asignarVendedor = createNode(
        "actualizar_registro",
        "Asignar Ejecutivo",
        "Vendedor de cuenta",
        UserIcon,
        "bg-purple-500",
        "action",
        startX,
        currentY + nodeSpacingY,
        { entidad: "Cliente", campo: "ejecutivo_cuenta" },
      )
      newNodes.push(asignarVendedor)
      connect(emailPyme, asignarVendedor)

      const tareaVendedor = createNode(
        "crear_tarea",
        "Tarea Llamada Presentación",
        "Contacto inicial",
        PhoneIcon,
        "bg-orange-500",
        "action",
        startX,
        currentY + nodeSpacingY * 2,
        { titulo: "Llamar nuevo cliente PyME", prioridad: "Alta" },
      )
      newNodes.push(tareaVendedor)
      connect(asignarVendedor, tareaVendedor)

      // Rama Corporativo
      const emailCorp = createNode(
        "enviar_email",
        "Email Ejecutivo VIP",
        "Atención personalizada",
        MailIcon,
        "bg-indigo-600",
        "action",
        startX + branchOffsetX,
        currentY,
        { plantilla: "bienvenida_corporativo" },
      )
      newNodes.push(emailCorp)
      connect(clasificar, emailCorp, 2)

      const crearOportunidad = createNode(
        "crear_registro",
        "Crear Oportunidad CRM",
        "Pipeline ventas",
        TargetIcon,
        "bg-green-600",
        "action",
        startX + branchOffsetX,
        currentY + nodeSpacingY,
        { entidad: "Oportunidad", valor_estimado: "Alto" },
      )
      newNodes.push(crearOportunidad)
      connect(emailCorp, crearOportunidad)

      const agendarReunion = createNode(
        "crear_tarea",
        "Agendar Reunión Presencial",
        "Visita comercial",
        CalendarIcon,
        "bg-blue-500",
        "action",
        startX + branchOffsetX,
        currentY + nodeSpacingY * 2,
        { titulo: "Reunión presentación corporativa", tipo: "Reunión" },
      )
      newNodes.push(agendarReunion)
      connect(crearOportunidad, agendarReunion)

      // WhatsApp para todos
      currentY += nodeSpacingY * 3
      const whatsappBienvenida = createNode(
        "enviar_whatsapp",
        "WhatsApp de Bienvenida",
        "Mensaje personalizado",
        MessageSquareIcon,
        "bg-green-500",
        "action",
        startX,
        currentY,
        { plantilla: "bienvenida_whatsapp" },
      )
      newNodes.push(whatsappBienvenida)
      connect(cuponNatural, whatsappBienvenida)
      connect(tareaVendedor, whatsappBienvenida)
      connect(agendarReunion, whatsappBienvenida)
    }

    // FLOW: Cotización / Propuesta
    else if (
      promptLower.includes("cotizaci") ||
      promptLower.includes("propuesta") ||
      promptLower.includes("presupuesto")
    ) {
      // Trigger
      const trigger = createNode(
        "cotizacion_creada",
        "Cotización Generada",
        "Nueva cotización creada",
        FileTextIcon,
        "bg-blue-500",
        "trigger",
        startX,
        currentY,
      )
      newNodes.push(trigger)
      currentY += nodeSpacingY

      // Generar PDF
      const generarPDF = createNode(
        "generar_pdf",
        "Generar PDF Cotización",
        "Formato profesional",
        FileIcon,
        "bg-purple-500",
        "action",
        startX,
        currentY,
        { plantilla: "cotizacion_profesional" },
      )
      newNodes.push(generarPDF)
      connect(trigger, generarPDF)
      currentY += nodeSpacingY

      // Enviar al cliente
      const enviarCliente = createNode(
        "enviar_email",
        "Enviar al Cliente",
        "Email con cotización",
        MailIcon,
        "bg-blue-600",
        "action",
        startX,
        currentY,
        { destinatario: "{{cliente.email}}", asunto: "Cotización #{{cotizacion.numero}}", adjuntar_pdf: true },
      )
      newNodes.push(enviarCliente)
      connect(generarPDF, enviarCliente)
      currentY += nodeSpacingY

      // Esperar respuesta
      const esperar = createNode(
        "delay",
        "Esperar 3 Días",
        "Tiempo de respuesta",
        ClockIcon,
        "bg-gray-500",
        "logic",
        startX,
        currentY,
        { tiempo: 3, unidad: "Días" },
      )
      newNodes.push(esperar)
      connect(enviarCliente, esperar)
      currentY += nodeSpacingY

      // Verificar si respondió
      const verificar = createNode(
        "condition",
        "Cliente Respondió?",
        "Verificar estado",
        GitBranchIcon,
        "bg-yellow-500",
        "logic",
        startX,
        currentY,
        { campo: "cotizacion.estado", operador: "!=", valor: "pendiente" },
        2,
        ["Sí", "No"],
      )
      newNodes.push(verificar)
      connect(esperar, verificar)
      currentY += nodeSpacingY

      // Si no respondió - seguimiento
      const seguimiento = createNode(
        "enviar_email",
        "Email Seguimiento",
        "Recordatorio amable",
        MailIcon,
        "bg-yellow-500",
        "action",
        startX + branchOffsetX,
        currentY - nodeSpacingY / 2,
        { asunto: "Seguimiento cotización #{{cotizacion.numero}}" },
      )
      newNodes.push(seguimiento)
      connect(verificar, seguimiento, 1)

      const tareaLlamar = createNode(
        "crear_tarea",
        "Asignar Llamada",
        "Contactar cliente",
        PhoneIcon,
        "bg-orange-500",
        "action",
        startX + branchOffsetX,
        currentY + nodeSpacingY / 2,
        { titulo: "Llamar por cotización pendiente", prioridad: "Media" },
      )
      newNodes.push(tareaLlamar)
      connect(seguimiento, tareaLlamar)

      // Si aceptó
      const verificarAceptada = createNode(
        "condition",
        "Cotización Aceptada?",
        "Verificar aceptación",
        GitBranchIcon,
        "bg-yellow-500",
        "logic",
        startX - branchOffsetX / 2,
        currentY,
        { campo: "cotizacion.estado", operador: "==", valor: "aceptada" },
        2,
        ["Aceptada", "Rechazada"],
      )
      newNodes.push(verificarAceptada)
      connect(verificar, verificarAceptada, 0)
      currentY += nodeSpacingY

      // Convertir a pedido
      const crearPedido = createNode(
        "crear_registro",
        "Convertir a Pedido",
        "Generar orden",
        ShoppingCartIcon,
        "bg-green-500",
        "action",
        startX - branchOffsetX,
        currentY,
        { entidad: "Pedido", origen: "cotizacion" },
      )
      newNodes.push(crearPedido)
      connect(verificarAceptada, crearPedido, 0)

      // Si rechazó - encuesta
      const encuestaRechazo = createNode(
        "enviar_email",
        "Encuesta de Rechazo",
        "Feedback del cliente",
        MailIcon,
        "bg-gray-500",
        "action",
        startX,
        currentY,
        { plantilla: "encuesta_rechazo", asunto: "Nos ayudaría tu opinión" },
      )
      newNodes.push(encuestaRechazo)
      connect(verificarAceptada, encuestaRechazo, 1)
    }

    // FLOW: Nuevo Pedido (default)
    else {
      // Trigger
      const trigger = createNode(
        "nuevo_pedido",
        "Nuevo Pedido Recibido",
        "Pedido ingresado al sistema",
        ShoppingCartIcon,
        "bg-blue-500",
        "trigger",
        startX,
        currentY,
      )
      newNodes.push(trigger)
      currentY += nodeSpacingY

      // Validar stock
      const validarStock = createNode(
        "condition",
        "Validar Disponibilidad",
        "Verificar stock de items",
        GitBranchIcon,
        "bg-yellow-500",
        "logic",
        startX,
        currentY,
        { campo: "stock_disponible", operador: "==", valor: "true" },
        2,
        ["Disponible", "Sin Stock"],
      )
      newNodes.push(validarStock)
      connect(trigger, validarStock)
      currentY += nodeSpacingY

      // Sin stock - notificar
      const sinStock = createNode(
        "enviar_email",
        "Notificar Falta Stock",
        "Alertar al cliente",
        MailIcon,
        "bg-red-500",
        "action",
        startX + branchOffsetX,
        currentY - nodeSpacingY / 2,
        { asunto: "Pedido en espera - Sin stock" },
      )
      newNodes.push(sinStock)
      connect(validarStock, sinStock, 1)

      // Reservar stock
      const reservar = createNode(
        "actualizar_registro",
        "Reservar Inventario",
        "Apartar stock",
        PackageIcon,
        "bg-purple-500",
        "action",
        startX,
        currentY,
        { entidad: "Inventario", campo: "stock_reservado" },
      )
      newNodes.push(reservar)
      connect(validarStock, reservar, 0)
      currentY += nodeSpacingY

      // Verificar monto para aprobación
      const verificarMonto = createNode(
        "condition",
        "Monto > $1,000,000?",
        "Requiere aprobación?",
        GitBranchIcon,
        "bg-yellow-500",
        "logic",
        startX,
        currentY,
        { campo: "pedido.total", operador: ">", valor: "1000000" },
        2,
        ["Sí", "No"],
      )
      newNodes.push(verificarMonto)
      connect(reservar, verificarMonto)
      currentY += nodeSpacingY

      // Solicitar aprobación
      const aprobacion = createNode(
        "wait_approval",
        "Solicitar Aprobación",
        "Gerente comercial",
        UserCheckIcon,
        "bg-orange-500",
        "logic",
        startX - branchOffsetX / 2,
        currentY,
        { aprobador: "Gerente Comercial" },
        2,
        ["Aprobado", "Rechazado"],
      )
      newNodes.push(aprobacion)
      connect(verificarMonto, aprobacion, 0)

      // Generar factura directa
      const facturar = createNode(
        "crear_registro",
        "Generar Factura",
        "Crear factura electrónica",
        FileTextIcon,
        "bg-green-500",
        "action",
        startX + branchOffsetX / 2,
        currentY,
        { entidad: "Factura" },
      )
      newNodes.push(facturar)
      connect(verificarMonto, facturar, 1)
      connect(aprobacion, facturar, 0)
      currentY += nodeSpacingY

      // Notificar bodega
      const notificarBodega = createNode(
        "notificacion_push",
        "Notificar Bodega",
        "Preparar despacho",
        BellIcon,
        "bg-blue-500",
        "action",
        startX,
        currentY,
        { titulo: "Nuevo pedido para despacho", mensaje: "Pedido #{{pedido.numero}}" },
      )
      newNodes.push(notificarBodega)
      connect(facturar, notificarBodega)
      currentY += nodeSpacingY

      // Email confirmación cliente
      const emailConfirmacion = createNode(
        "enviar_email",
        "Confirmación al Cliente",
        "Email con detalles",
        MailIcon,
        "bg-blue-600",
        "action",
        startX,
        currentY,
        { plantilla: "confirmacion_pedido", asunto: "Pedido #{{pedido.numero}} confirmado" },
      )
      newNodes.push(emailConfirmacion)
      connect(notificarBodega, emailConfirmacion)

      // WhatsApp
      const whatsapp = createNode(
        "enviar_whatsapp",
        "WhatsApp Confirmación",
        "Mensaje al cliente",
        MessageSquareIcon,
        "bg-green-500",
        "action",
        startX + branchOffsetX / 2,
        currentY,
      )
      newNodes.push(whatsapp)
      connect(notificarBodega, whatsapp)
    }

    setFlowNodes(newNodes)
    setConnections(newConnections)
    setShowAIModal(false)
    setAiPrompt("")
    saveToHistory()
  }, [aiPrompt, saveToHistory])

  // Get all trigger nodes for search
  const getAllTriggerNodes = useCallback(() => {
    return Object.values(triggerCategories).flatMap((cat) =>
      cat.nodes.map((n) => ({ ...n, category: "trigger" as const })),
    )
  }, [])

  // Get all action nodes for search
  const getAllActionNodes = useCallback(() => {
    return Object.values(actionCategories).flatMap((cat) =>
      cat.nodes.map((n) => ({ ...n, category: "action" as const })),
    )
  }, [])

  // Filter nodes by search
  // CHANGE: New function to get all nodes organized by category
  const getAllNodesOrganized = useCallback(() => {
    const organized: { category: string; label: string; icon: any; nodes: any[] }[] = []

    if (activeCategory === "all" || activeCategory === "triggers") {
      Object.values(triggerCategories).forEach((cat) => {
        organized.push({
          category: "trigger",
          label: cat.label,
          icon: cat.icon,
          nodes: cat.nodes.map((n) => ({ ...n, category: "trigger" as const })),
        })
      })
    }

    if (activeCategory === "all" || activeCategory === "logic") {
      organized.push({
        category: "logic",
        label: "LÓGICA & CONTROL",
        icon: GitBranchIcon,
        nodes: logicNodes.map((n) => ({ ...n, category: "logic" as const })),
      })
    }

    if (activeCategory === "all" || activeCategory === "actions") {
      Object.values(actionCategories).forEach((cat) => {
        organized.push({
          category: "action",
          label: cat.label.toUpperCase(),
          icon: cat.icon,
          nodes: cat.nodes.map((n) => ({ ...n, category: "action" as const })),
        })
      })
    }

    return organized
  }, [activeCategory])

  // CHANGE: Filter nodes with search
  const filteredOrganizedNodes = useMemo(() => {
    const organized = getAllNodesOrganized()

    if (!searchNodes) return organized

    const search = searchNodes.toLowerCase()
    return organized
      .map((cat) => ({
        ...cat,
        nodes: cat.nodes.filter(
          (n) => n.label.toLowerCase().includes(search) || n.description.toLowerCase().includes(search),
        ),
      }))
      .filter((cat) => cat.nodes.length > 0)
  }, [searchNodes, getAllNodesOrganized])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <WorkflowIcon className="h-5 w-5 text-teal-500" />
            <Input
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              className="w-64 font-semibold bg-transparent border-none focus-visible:ring-1"
            />
          </div>
          <Badge variant="outline" className="text-xs">
            {flowNodes.length} nodos
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowKeyboardModal(true)}>
            <KeyboardIcon className="h-4 w-4 mr-2" />
            Atajos
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowAIModal(true)}>
            <Sparkles className="h-4 w-4 mr-2" />
            Generar con AI
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowImportModal(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Importar JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowExportModal(true)}>
                <Download className="h-4 w-4 mr-2" />
                Exportar JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={testFlow} disabled={flowNodes.length === 0 || isRunning}>
            {isRunning ? <Loader2Icon className="h-4 w-4 mr-2 animate-spin" /> : <PlayIcon className="h-4 w-4 mr-2" />}
            Probar
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Node palette */}
        <div className="w-64 border-r border-border bg-card flex flex-col overflow-hidden">
          <div className="p-2 border-b border-border space-y-2 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <Input
                placeholder="Buscar nodos..."
                className="pl-7 h-8 text-xs"
                value={searchNodes}
                onChange={(e) => setSearchNodes(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 gap-1">
              <Button
                variant={activeCategory === "all" ? "default" : "outline"}
                size="sm"
                className="h-7 text-[10px] px-1"
                onClick={() => setActiveCategory("all")}
              >
                Todo
              </Button>
              <Button
                variant={activeCategory === "triggers" ? "default" : "outline"}
                size="sm"
                className="h-7 text-[10px] px-1"
                onClick={() => setActiveCategory("triggers")}
              >
                <Zap className="h-3 w-3" />
              </Button>
              <Button
                variant={activeCategory === "logic" ? "default" : "outline"}
                size="sm"
                className="h-7 text-[10px] px-1"
                onClick={() => setActiveCategory("logic")}
              >
                <GitBranch className="h-3 w-3" />
              </Button>
              <Button
                variant={activeCategory === "actions" ? "default" : "outline"}
                size="sm"
                className="h-7 text-[10px] px-1"
                onClick={() => setActiveCategory("actions")}
              >
                <Play className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-2 space-y-3">
              {filteredOrganizedNodes.map((category, catIndex) => (
                <div key={`${category.category}-${catIndex}`}>
                  {/* Category header */}
                  <div className="flex items-center gap-1.5 mb-1.5 px-1 sticky top-0 bg-card py-1 z-10">
                    <category.icon className="h-3 w-3 text-muted-foreground" />
                    <h3 className="text-[10px] font-semibold text-muted-foreground tracking-wider">{category.label}</h3>
                  </div>

                  {/* Category nodes - made cards more compact */}
                  <div className="space-y-1">
                    {category.nodes.map((node) => (
                      <div
                        key={node.id}
                        draggable
                        onDragStart={() => {
                          setIsDragging(true)
                          setDraggedNode({ type: category.category, data: node })
                        }}
                        onDragEnd={() => setIsDragging(false)}
                        className="p-2 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-sm cursor-grab active:cursor-grabbing transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", node.color)}
                          >
                            <node.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-xs truncate">{node.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{node.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden bg-muted/30">
          <div
            ref={canvasRef}
            className={cn(
              "absolute inset-0 overflow-auto canvas-bg",
              "bg-[radial-gradient(circle_at_1px_1px,rgba(45,212,191,0.15)_1px,transparent_0)] bg-[size:32px_32px]",
              isDragging && "ring-2 ring-teal-500/50 ring-inset",
              connectingFrom && "cursor-crosshair",
            )}
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top left" }}
            onDrop={handleCanvasDrop}
            onDragOver={(e) => e.preventDefault()}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onClick={() => connectingFrom && cancelConnection()} // Cancel connection on canvas click
          >
            {/* Selection rectangle */}
            {isSelecting && selectionStart && selectionEnd && (
              <div
                className="absolute border-2 border-teal-500 bg-teal-500/10 z-50"
                style={{
                  left: Math.min(selectionStart.x, selectionEnd.x),
                  top: Math.min(selectionStart.y, selectionEnd.y),
                  width: Math.abs(selectionEnd.x - selectionStart.x),
                  height: Math.abs(selectionEnd.y - selectionStart.y),
                }}
              />
            )}

            {connectionError && (
              <div
                className={cn(
                  "fixed top-20 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-in fade-in slide-in-from-top-2",
                  connectionError.type === "error" ? "bg-red-500 text-white" : "bg-yellow-500 text-black",
                )}
              >
                {connectionError.type === "error" ? (
                  <XCircleIcon className="h-5 w-5" />
                ) : (
                  <AlertCircleIcon className="h-5 w-5" />
                )}
                <span className="font-medium">{connectionError.message}</span>
              </div>
            )}

            {connectingFrom && (
              <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-600 to-teal-500 text-white px-5 py-3 rounded-xl shadow-xl z-50 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Cable className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Conectando nodo...</span>
                  <span className="text-xs text-white/80">
                    Haz clic en un nodo verde para conectar o ESC para cancelar
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 ml-2 text-white hover:bg-white/20 border border-white/30"
                  onClick={cancelConnection}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancelar
                </Button>
              </div>
            )}

            {/* Connections SVG */}
            <svg className="absolute inset-0 pointer-events-none" style={{ width: "3000px", height: "3000px" }}>
              {/* Existing connections */}
              {connections.map((conn) => {
                const fromNode = flowNodes.find((n) => n.id === conn.from)
                const toNode = flowNodes.find((n) => n.id === conn.to)
                if (!fromNode || !toNode) return null

                const fromX = fromNode.position.x + 140
                const fromY = fromNode.position.y + 100 + conn.fromPort * 24
                const toX = toNode.position.x + 140
                const toY = toNode.position.y

                const midY = (fromY + toY) / 2

                return (
                  <g key={conn.id}>
                    <path
                      d={`M ${fromX} ${fromY} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${toY}`}
                      fill="none"
                      stroke="url(#connectionGradient)"
                      strokeWidth="2"
                      className="transition-all duration-200"
                    />
                    <g
                      className="cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                      onClick={() => {
                        setConnections((prev) => prev.filter((c) => c.id !== conn.id))
                        saveToHistory()
                      }}
                    >
                      <circle cx={(fromX + toX) / 2} cy={midY} r="10" fill="#ef4444" />
                      <text
                        x={(fromX + toX) / 2}
                        y={midY + 4}
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        ×
                      </text>
                    </g>
                  </g>
                )
              })}

              {connectingFrom &&
                connectionPreview &&
                (() => {
                  const fromNode = flowNodes.find((n) => n.id === connectingFrom.nodeId)
                  if (!fromNode) return null

                  const fromX = fromNode.position.x + 140
                  const fromY = fromNode.position.y + 100 + connectingFrom.portIndex * 24
                  const toX = connectionPreview.x
                  const toY = connectionPreview.y
                  const midY = (fromY + toY) / 2

                  return (
                    <path
                      d={`M ${fromX} ${fromY} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${toY}`}
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="2"
                      strokeDasharray="8,4"
                      className="animate-pulse"
                    />
                  )
                })()}

              {/* Gradient definition */}
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
              </defs>
            </svg>

            {/* Nodes */}
            {flowNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id || selectedNodes.has(node.id)
              const isValidTarget = connectingFrom && validTargets.has(node.id)
              const isInvalidTarget = connectingFrom && !validTargets.has(node.id) && connectingFrom.nodeId !== node.id

              return (
                <div
                  key={node.id}
                  className={cn(
                    "absolute w-[280px] rounded-xl border-2 bg-card shadow-lg transition-all cursor-move",
                    isSelected
                      ? "border-teal-500 shadow-teal-500/25 shadow-xl"
                      : "border-border hover:border-primary/50",
                    isValidTarget && "ring-2 ring-green-500 ring-offset-2 border-green-500",
                    isInvalidTarget && "opacity-40",
                    hoveredNodeId === node.id && connectingFrom && "scale-105",
                  )}
                  style={{ left: node.position.x, top: node.position.y }}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (connectingFrom) {
                      endConnection(node.id)
                    } else if (e.shiftKey) {
                      setSelectedNodes((prev) => {
                        const next = new Set(prev)
                        if (next.has(node.id)) next.delete(node.id)
                        else next.add(node.id)
                        return next
                      })
                    } else {
                      setSelectedNode(node)
                      setSelectedNodes(new Set())
                    }
                  }}
                  onMouseDown={(e) => {
                    if (connectingFrom) return
                    e.stopPropagation()
                    const startX = e.clientX
                    const startY = e.clientY
                    const startPos = { ...node.position }

                    const handleMouseMove = (moveEvent: MouseEvent) => {
                      const dx = (moveEvent.clientX - startX) * (100 / zoom)
                      const dy = (moveEvent.clientY - startY) * (100 / zoom)

                      if (selectedNodes.has(node.id) && selectedNodes.size > 1) {
                        flowNodes.forEach((n) => {
                          if (selectedNodes.has(n.id)) {
                            const nodeStartPos = n.id === node.id ? startPos : n.position
                            updateNodePosition(n.id, {
                              x: Math.max(0, nodeStartPos.x + dx),
                              y: Math.max(0, nodeStartPos.y + dy),
                            })
                          }
                        })
                      } else {
                        updateNodePosition(node.id, {
                          x: Math.max(0, startPos.x + dx),
                          y: Math.max(0, startPos.y + dy),
                        })
                      }
                    }

                    const handleMouseUp = () => {
                      document.removeEventListener("mousemove", handleMouseMove)
                      document.removeEventListener("mouseup", handleMouseUp)
                      saveToHistory()
                    }

                    document.addEventListener("mousemove", handleMouseMove)
                    document.addEventListener("mouseup", handleMouseUp)
                  }}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                >
                  {/* Node header */}
                  <div className={cn("px-3 py-2 rounded-t-xl flex items-center gap-2", node.color)}>
                    <node.icon className="h-4 w-4 text-white" />
                    <span className="text-white font-medium text-sm truncate flex-1">{node.label}</span>
                    {isSelected && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 text-white/80 hover:text-white hover:bg-white/20"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeNode(node.id)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>

                  {/* Node body */}
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground">{node.description}</p>

                    {/* Input port */}
                    {node.category !== "trigger" && (
                      <div
                        className={cn(
                          "absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all",
                          connectingFrom ? "bg-green-500 border-green-400 scale-125" : "bg-background border-border",
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (connectingFrom) endConnection(node.id)
                        }}
                      />
                    )}

                    {/* Output ports */}
                    <div className="absolute -bottom-0 left-0 right-0 flex justify-center gap-4 translate-y-1/2">
                      {Array.from({ length: node.outputs || 1 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full border-2 cursor-pointer transition-all",
                              connectingFrom?.nodeId === node.id && connectingFrom?.portIndex === i
                                ? "bg-teal-500 border-teal-400 scale-125"
                                : "bg-background border-border hover:bg-teal-500 hover:border-teal-400",
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              if (!connectingFrom) startConnection(node.id, i, e)
                            }}
                          />
                          {node.outputLabels && node.outputLabels[i] && (
                            <span className="text-[9px] text-muted-foreground mt-1">{node.outputLabels[i]}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Empty state */}
            {flowNodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8 rounded-xl border-2 border-dashed border-border">
                  <WorkflowIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Comienza tu flujo</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Arrastra un trigger desde la izquierda o genera con AI
                  </p>
                  <Button onClick={() => setShowAIModal(true)}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generar con AI
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-card/90 backdrop-blur rounded-lg border border-border p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom((z) => Math.max(25, z - 10))}
            >
              -
            </Button>
            <span className="text-xs w-12 text-center">{zoom}%</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom((z) => Math.min(200, z + 10))}
            >
              +
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setZoom(100)}>
              <Target className="h-4 w-4" />
            </Button>
          </div>

          {/* Toolbar */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-card/90 backdrop-blur rounded-lg border border-border p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={undo} disabled={historyIndex <= 0}>
              <RotateCcwIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
            >
              <RotateCcwIcon className="h-4 w-4 scale-x-[-1]" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={copySelected}
              disabled={!selectedNode && selectedNodes.size === 0}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={paste} disabled={clipboard.length === 0}>
              <ClipboardCheckIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={removeSelectedNodes}
              disabled={!selectedNode && selectedNodes.size === 0}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right sidebar - Properties & Test Results */}
        {(showPropertiesPanel || showTestPanel) && (
          <div className="w-80 border-l border-border bg-card flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-border">
              <button
                className={cn(
                  "flex-1 px-4 py-2 text-sm font-medium transition-colors",
                  !showTestPanel
                    ? "bg-primary/10 text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setShowTestPanel(false)}
              >
                Propiedades
              </button>
              <button
                className={cn(
                  "flex-1 px-4 py-2 text-sm font-medium transition-colors",
                  showTestPanel
                    ? "bg-primary/10 text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setShowTestPanel(true)}
              >
                Prueba {testResults.length > 0 && `(${testResults.length})`}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {showTestPanel ? (
                /* Test Results Panel */
                <div className="space-y-3">
                  {testResults.length === 0 ? (
                    <div className="text-center py-8">
                      <PlayIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">Haz clic en Probar para ejecutar el flujo</p>
                    </div>
                  ) : (
                    testResults.map((result, index) => (
                      <div
                        key={result.nodeId}
                        className={cn(
                          "p-3 rounded-lg border transition-all",
                          result.status === "success" && "bg-green-500/10 border-green-500/30",
                          result.status === "error" && "bg-red-500/10 border-red-500/30",
                          result.status === "running" && "bg-blue-500/10 border-blue-500/30 animate-pulse",
                          result.status === "pending" && "bg-muted/50 border-border",
                        )}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-muted-foreground">#{index + 1}</span>
                          {result.status === "success" && <CheckCircle2Icon className="h-4 w-4 text-green-500" />}
                          {result.status === "error" && <XCircleIcon className="h-4 w-4 text-red-500" />}
                          {result.status === "running" && (
                            <Loader2Icon className="h-4 w-4 text-blue-500 animate-spin" />
                          )}
                          {result.status === "pending" && <ClockIcon className="h-4 w-4 text-muted-foreground" />}
                          <span className="font-medium text-sm flex-1 truncate">{result.nodeName}</span>
                          {result.duration > 0 && (
                            <span className="text-xs text-muted-foreground">{result.duration}ms</span>
                          )}
                        </div>
                        {result.error && <p className="text-xs text-red-500 mt-1">{result.error}</p>}
                        {result.status === "success" && Object.keys(result.output).length > 0 && (
                          <pre className="text-xs bg-background/50 p-2 rounded mt-2 overflow-x-auto">
                            {JSON.stringify(result.output, null, 2)}
                          </pre>
                        )}
                      </div>
                    ))
                  )}
                </div>
              ) : selectedNode ? (
                /* Properties Panel */
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">{selectedNode.label}</h3>
                    <p className="text-sm text-muted-foreground">{selectedNode.description}</p>
                  </div>

                  {/* Node config fields */}
                  {nodeConfigs[selectedNode.type]?.fields.map((field) => (
                    <div key={field.id} className="space-y-1">
                      <label className="text-sm font-medium">{field.label}</label>
                      {field.type === "text" && (
                        <Input
                          placeholder={field.placeholder}
                          value={selectedNode.config[field.id] || ""}
                          onChange={(e) => updateNodeConfig(selectedNode.id, field.id, e.target.value)}
                        />
                      )}
                      {field.type === "number" && (
                        <Input
                          type="number"
                          placeholder={field.placeholder}
                          value={selectedNode.config[field.id] || ""}
                          onChange={(e) => updateNodeConfig(selectedNode.id, field.id, e.target.value)}
                        />
                      )}
                      {field.type === "select" && (
                        <select
                          className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                          value={selectedNode.config[field.id] || ""}
                          onChange={(e) => updateNodeConfig(selectedNode.id, field.id, e.target.value)}
                        >
                          <option value="">Seleccionar...</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}
                      {field.type === "switch" && (
                        <Switch
                          checked={selectedNode.config[field.id] || false}
                          onCheckedChange={(checked) => updateNodeConfig(selectedNode.id, field.id, checked)}
                        />
                      )}
                      {field.type === "slider" && (
                        <Slider
                          value={[selectedNode.config[field.id] || field.defaultValue || 0]}
                          onValueChange={([val]) => updateNodeConfig(selectedNode.id, field.id, val)}
                          max={100}
                          step={1}
                        />
                      )}
                    </div>
                  ))}

                  {/* Variables disponibles */}
                  {nodeVariables[selectedNode.type] && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Variable className="h-4 w-4" />
                        Variables Disponibles
                      </h4>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {nodeVariables[selectedNode.type].slice(0, 8).map((variable) => (
                          <div
                            key={variable.name}
                            className="text-xs p-2 rounded bg-muted/50 hover:bg-muted cursor-pointer"
                            onClick={() => navigator.clipboard.writeText(variable.name)}
                            title={`${variable.description} - Ej: ${variable.example}`}
                          >
                            <code className="text-teal-500">{variable.name}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => duplicateNode(selectedNode)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Duplicar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => removeNode(selectedNode.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">Selecciona un nodo para ver sus propiedades</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* AI Modal */}
      <Dialog open={showAIModal} onOpenChange={setShowAIModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-teal-500" />
              Generar Flujo con AI
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4">
            <div>
              <label className="text-sm font-medium">Describe el flujo que necesitas:</label>
              <Textarea
                placeholder="Ej: Cuando llegue un pedido nuevo, verificar el stock, enviar factura al cliente por email y WhatsApp, y notificar a bodega para despacho..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="min-h-[120px] mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">O elige un ejemplo:</label>
              <div className="grid gap-2 max-h-[300px] overflow-y-auto">
                {aiExamplePrompts.map((example, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-border hover:border-teal-500 cursor-pointer transition-colors"
                    onClick={() => setAiPrompt(example.prompt)}
                  >
                    <h4 className="font-medium text-sm">{example.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{example.prompt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAIModal(false)}>
              Cancelar
            </Button>
            <Button onClick={generateWithAI} disabled={!aiPrompt.trim()} className="bg-teal-600 hover:bg-teal-700">
              <Sparkles className="h-4 w-4 mr-2" />
              Generar Flujo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Modal */}
      <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-teal-500" />
              Exportar Flujo
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nombre del archivo:</label>
              <Input value={flowName} onChange={(e) => setFlowName(e.target.value)} className="mt-2" />
            </div>
            <pre className="p-3 bg-muted rounded-lg text-xs max-h-[200px] overflow-auto">
              {JSON.stringify({ name: flowName, nodes: flowNodes.length, connections: connections.length }, null, 2)}
            </pre>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportModal(false)}>
              Cancelar
            </Button>
            <Button onClick={downloadFlow} className="bg-teal-600 hover:bg-teal-700">
              <Download className="h-4 w-4 mr-2" />
              Descargar JSON
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Modal */}
      <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-teal-500" />
              Importar Flujo
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Pega el JSON del flujo:</label>
              <Textarea
                placeholder='{"name": "Mi Flujo", "nodes": [...], "connections": [...]}'
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
                className="min-h-[200px] mt-2 font-mono text-xs"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportModal(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => importFlow()}
              disabled={!importJson.trim()}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Importar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
