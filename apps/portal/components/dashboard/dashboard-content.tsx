"use client"

import { MainDashboard } from "./modules/main-dashboard"
import { EcommerceModule } from "./modules/ecommerce-module"
import { ManufacturaModule } from "./modules/manufactura-module"
import { CalidadModule } from "./modules/calidad-module"
import { POSModule } from "./modules/pos-module"
import { FieldServiceModule } from "./modules/field-service-module"
import { GRCModule } from "./modules/grc-module"
import { InventarioModule } from "./modules/inventario-module"
import { ContabilidadModule } from "./modules/contabilidad-module"
import { RRHHModule } from "./modules/rrhh-module"
import { ComprasModule } from "./modules/compras-module"
import { VentasModule } from "./modules/ventas-module"
import { ProyectosModule } from "./modules/proyectos-module"
import { TesoreriaModule } from "./modules/tesoreria-module"
import { ActivosModule } from "./modules/activos-module"
import { CamposPersonalizadosModule } from "./modules/campos-personalizados-module"
import { UsuariosModule } from "./modules/usuarios-module"
import { ReportesModule } from "./modules/reportes-module"
import { DocumentosModule } from "./modules/documentos-module"
import { ConfiguracionModule } from "./modules/configuracion-module"
import { MarketplaceModule } from "./modules/marketplace-module"
import { DashboardBuilderModule } from "./modules/dashboard-builder-module"
import { LandingBuilderModule } from "./modules/landing-builder-module"
import { FacturacionDIANModule } from "./modules/facturacion-dian-module"
import { BillingNexusModule } from "./modules/billing-nexus-module"
import { ContactosModule } from "./modules/contactos-module"
import { APIModule } from "./modules/api-module"
import { AlmacenVisualModule } from "./modules/almacen-visual-module"
import { CallCenterModule } from "./modules/call-center-module"
import { AyudaModule } from "./modules/ayuda-module"
import { CotizacionesModule } from "./modules/cotizaciones-module"
import { ProveedoresModule } from "./modules/proveedores-module"
import { NominaElectronicaModule } from "./modules/nomina-electronica-module"
import { AgendaModule } from "./modules/agenda-module"
import { NotificacionesModule } from "./modules/notificaciones-module"
import { AuditoriaModule } from "./modules/auditoria-module"
import CEODashboardModule from "./modules/ceo-dashboard-module"
import ContratosModule from "./modules/contratos-module"
import PortalClientesModule from "./modules/portal-clientes-module"
import ForecastingModule from "./modules/forecasting-module"
import GarantiasModule from "./modules/garantias-module"
import FlotasModule from "./modules/flotas-module"
import { FirmaElectronicaModule } from "./modules/firma-electronica-module"
import { ConciliacionBancariaModule } from "./modules/conciliacion-bancaria-module"
import { ComisionesModule } from "./modules/comisiones-module"
import { PresupuestoModule } from "./modules/presupuesto-module"
import { SuscripcionesModule } from "./modules/suscripciones-module"
import { BusinessIntelligenceModule } from "./modules/business-intelligence-module"
import { EncuestasModule } from "./modules/encuestas-module"
import { MultiEmpresaModule } from "./modules/multi-empresa-module"
import { AutomatizacionesModule } from "./modules/automatizaciones-module"
import { EntidadesModule } from "./modules/entidades-module"
import { NQLConsoleModule } from "./modules/nql-console-module"

interface DashboardContentProps {
  activeModule: string
  onOpenFlowBuilder?: () => void
}

export function DashboardContent({ activeModule, onOpenFlowBuilder }: DashboardContentProps) {
  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <MainDashboard />
      case "ceo-dashboard":
        return <CEODashboardModule />
      case "contratos":
        return <ContratosModule />
      case "portal-clientes":
        return <PortalClientesModule />
      case "forecasting":
        return <ForecastingModule />
      case "garantias":
        return <GarantiasModule />
      case "flotas":
        return <FlotasModule />
      case "ecommerce":
        return <EcommerceModule />
      case "manufactura":
        return <ManufacturaModule />
      case "calidad":
        return <CalidadModule />
      case "pos":
        return <POSModule />
      case "field":
        return <FieldServiceModule />
      case "grc":
        return <GRCModule />
      case "inventario":
        return <InventarioModule />
      case "contabilidad":
        return <ContabilidadModule />
      case "rrhh":
        return <RRHHModule />
      case "compras":
        return <ComprasModule />
      case "ventas":
        return <VentasModule />
      case "proyectos":
        return <ProyectosModule />
      case "tesoreria":
        return <TesoreriaModule />
      case "activos":
        return <ActivosModule />
      case "campos":
        return <CamposPersonalizadosModule />
      case "usuarios":
        return <UsuariosModule />
      case "reportes":
        return <ReportesModule />
      case "documentos":
        return <DocumentosModule />
      case "settings":
        return <ConfiguracionModule />
      case "marketplace":
        return <MarketplaceModule />
      case "dashboard-builder":
        return <DashboardBuilderModule />
      case "landing-builder":
        return <LandingBuilderModule />
      case "facturacion-dian":
        return <FacturacionDIANModule />
      case "billing":
        return <BillingNexusModule />
      case "contactos":
        return <ContactosModule />
      case "api":
        return <APIModule />
      case "almacen-visual":
        return <AlmacenVisualModule />
      case "call-center":
        return <CallCenterModule />
      case "ayuda":
        return <AyudaModule />
      case "cotizaciones":
        return <CotizacionesModule />
      case "proveedores":
        return <ProveedoresModule />
      case "nomina-electronica":
        return <NominaElectronicaModule />
      case "agenda":
        return <AgendaModule />
      case "notificaciones":
        return <NotificacionesModule />
      case "auditoria":
        return <AuditoriaModule />
      case "firma-electronica":
        return <FirmaElectronicaModule />
      case "conciliacion-bancaria":
        return <ConciliacionBancariaModule />
      case "comisiones":
        return <ComisionesModule />
      case "presupuesto":
        return <PresupuestoModule />
      case "suscripciones":
        return <SuscripcionesModule />
      case "business-intelligence":
        return <BusinessIntelligenceModule />
      case "encuestas":
        return <EncuestasModule />
      case "multi-empresa":
        return <MultiEmpresaModule />
      case "automatizaciones":
        return <AutomatizacionesModule onOpenFlowBuilder={onOpenFlowBuilder} />
      case "entidades":
        return <EntidadesModule />
      case "nql-console":
        return <NQLConsoleModule />
      default:
        return <MainDashboard />
    }
  }

  return <main className="flex-1 overflow-y-auto p-6">{renderModule()}</main>
}
