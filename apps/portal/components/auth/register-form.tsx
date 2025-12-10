"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!acceptTerms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Register attempt:", formData);
    setIsLoading(false);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nombre completo</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Juan Pérez"
            value={formData.fullName}
            onChange={(e) => updateFormData("fullName", e.target.value)}
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@empresa.com"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Empresa</Label>
          <Input
            id="company"
            type="text"
            placeholder="Nombre de tu empresa"
            value={formData.company}
            onChange={(e) => updateFormData("company", e.target.value)}
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
            required
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Mínimo 8 caracteres con letras y números
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData("confirmPassword", e.target.value)}
            required
            className="h-11"
          />
        </div>
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="terms"
          checked={acceptTerms}
          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          className="mt-1"
        />
        <Label
          htmlFor="terms"
          className="text-sm font-normal leading-relaxed cursor-pointer"
        >
          Acepto los{" "}
          <a href="#" className="text-primary hover:underline">
            términos y condiciones
          </a>{" "}
          y la{" "}
          <a href="#" className="text-primary hover:underline">
            política de privacidad
          </a>
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full h-11 text-base font-medium"
        disabled={isLoading}
      >
        {isLoading ? "Creando cuenta..." : "Crear cuenta"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">
            O regístrate con
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-11 bg-transparent"
          onClick={() => console.log("Google signup")}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 bg-transparent"
          onClick={() => console.log("Microsoft signup")}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
          </svg>
          Microsoft
        </Button>
      </div>
    </form>
  );
}
