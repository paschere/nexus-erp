"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";
import { FlowBuilderModal } from "@/components/dashboard/flow-builder/flow-builder-modal";
import { AIAssistant } from "@/components/dashboard/ai-assistant";
import { AIInsightsBar } from "@/components/dashboard/ai-insights-bar";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { usePathname } from "next/navigation";
import { DashboardProvider, useDashboard } from "@/components/dashboard/dashboard-context";
import { useState } from "react";

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    isFlowBuilderOpen,
    openFlowBuilder,
    closeFlowBuilder,
    isOnboardingOpen,
    openOnboarding,
    closeOnboarding,
  } = useDashboard();

  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiExpanded, setAIExpanded] = useState(false);
  
  const pathname = usePathname();
  
  const activeModule = pathname === "/dashboard" 
    ? "dashboard" 
    : pathname.split("/").pop() || "dashboard";

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {isOnboardingOpen && (
        <OnboardingWizard
          onComplete={closeOnboarding}
          onClose={closeOnboarding}
        />
      )}

      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeModule={activeModule}
        onOpenFlowBuilder={openFlowBuilder}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AIInsightsBar />
        <TopNav
          onOpenFlowBuilder={openFlowBuilder}
          onOpenOnboarding={openOnboarding}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      <FlowBuilderModal
        open={isFlowBuilderOpen}
        onClose={closeFlowBuilder}
      />

      <AIAssistant
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        isExpanded={aiExpanded}
        onToggleExpand={() => setAIExpanded(!aiExpanded)}
        activeModule={activeModule}
      />

      {!showAIAssistant && (
        <Button
          onClick={() => setShowAIAssistant(true)}
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-gradient-to-br from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg shadow-primary/25 z-40"
          size="icon"
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </DashboardProvider>
  );
}
