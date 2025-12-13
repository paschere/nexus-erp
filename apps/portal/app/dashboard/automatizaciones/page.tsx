"use client";

import { AutomatizacionesModule } from "@/components/dashboard/modules/automatizaciones-module";
import { useDashboard } from "@/components/dashboard/dashboard-context";

export default function Page() {
  const { openFlowBuilder } = useDashboard();
  return <AutomatizacionesModule onOpenFlowBuilder={openFlowBuilder} />;
}
