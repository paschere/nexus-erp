import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">
              N
            </span>
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-foreground">NEXUS ERP</h1>
            <p className="text-sm text-muted-foreground">Enterprise Platform</p>
          </div>
        </div>

        <div className="space-y-4">
          <Link href="/auth/login">
            <Button size="lg" className="w-64">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="lg" variant="outline" className="w-64 bg-transparent">
              Crear Cuenta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
