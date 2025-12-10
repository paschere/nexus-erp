import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
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
              Bienvenido de vuelta
            </h2>
            <p className="text-muted-foreground">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Sign up link */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              ¿No tienes una cuenta?{" "}
            </span>
            <Link
              href="/auth/register"
              className="text-primary hover:underline font-medium"
            >
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Feature showcase */}
      <div className="hidden lg:flex flex-1 bg-card border-l border-border items-center justify-center p-12">
        <div className="max-w-lg space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              Plataforma Empresarial
            </div>
            <h3 className="text-4xl font-bold text-foreground leading-tight">
              Gestiona tu negocio de manera eficiente
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              NEXUS ERP te proporciona todas las herramientas necesarias para
              optimizar tus operaciones empresariales en tiempo real.
            </p>
          </div>

          <div className="space-y-4">
            <FeatureItem
              icon="📊"
              title="Analytics en tiempo real"
              description="Monitorea el rendimiento de tu negocio con dashboards interactivos"
            />
            <FeatureItem
              icon="🤖"
              title="IA integrada"
              description="Recomendaciones inteligentes basadas en tus datos"
            />
            <FeatureItem
              icon="🔒"
              title="Seguridad empresarial"
              description="Protección de datos con los más altos estándares"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-xl">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
