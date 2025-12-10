"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { DashboardContent } from "./dashboard-content";
import { FlowBuilderModal } from "./flow-builder/flow-builder-modal";
import { AIAssistant } from "./ai-assistant";
import { AIInsightsBar } from "./ai-insights-bar";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { OnboardingWizard } from "../onboarding/onboarding-wizard";

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState("dashboard");
  const [showFlowBuilder, setShowFlowBuilder] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiExpanded, setAIExpanded] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleOpenOnboarding = () => {
    setShowOnboarding(true);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {showOnboarding && (
        <OnboardingWizard
          onComplete={() => {
            setShowOnboarding(false);
          }}
          onClose={() => setShowOnboarding(false)}
        />
      )}

      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        onOpenFlowBuilder={() => setShowFlowBuilder(true)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AIInsightsBar />
        <TopNav
          onOpenFlowBuilder={() => setShowFlowBuilder(true)}
          onOpenOnboarding={handleOpenOnboarding}
        />
        <DashboardContent
          activeModule={activeModule}
          onOpenFlowBuilder={() => setShowFlowBuilder(true)}
        />
      </div>
      <FlowBuilderModal
        open={showFlowBuilder}
        onClose={() => setShowFlowBuilder(false)}
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
