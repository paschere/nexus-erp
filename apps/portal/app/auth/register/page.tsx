import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Feature showcase */}
      <div className="hidden lg:flex flex-1 bg-card border-r border-border items-center justify-center p-12">
        <div className="max-w-lg space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              Comienza gratis
            </div>
            <h3 className="text-4xl font-bold text-foreground leading-tight">
              Impulsa tu empresa al siguiente nivel
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Únete a miles de empresas que ya confían en NEXUS ERP para
              gestionar sus operaciones.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <StatCard value="50K+" label="Empresas activas" />
            <StatCard value="99.9%" label="Uptime garantizado" />
            <StatCard value="24/7" label="Soporte técnico" />
            <StatCard value="150+" label="Integraciones" />
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Sin tarjeta de crédito requerida</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Prueba gratuita de 14 días</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Cancela cuando quieras</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">
                N
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">NEXUS ERP</h1>
              <p className="text-xs text-muted-foreground">
                Enterprise Platform
              </p>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              Crea tu cuenta
            </h2>
            <p className="text-muted-foreground">
              Comienza a gestionar tu negocio de manera más eficiente
            </p>
          </div>

          {/* Register Form */}
          <RegisterForm />

          {/* Login link */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
            </span>
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-secondary/50 rounded-lg p-4 border border-border">
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
