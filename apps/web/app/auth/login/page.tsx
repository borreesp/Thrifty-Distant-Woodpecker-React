import { Button, Card, Input, Section } from "@thrifty/ui";
import React from "react";

export default function LoginPage() {
  return (
    <Section
      title="Acceso"
      description="Entra para sincronizar tu progreso y tus entrenamientos."
      className="max-w-3xl"
    >
      <Card title="Iniciar sesión" subtitle="Email + contraseña o magic link">
        <div className="space-y-4">
          <Input label="Email" type="email" placeholder="tu@correo.com" />
          <Input label="Contraseña" type="password" placeholder="••••••••" />
          <div className="flex items-center justify-between">
            <Button variant="primary">Entrar</Button>
            <Button variant="ghost" size="sm">
              Recuperar acceso
            </Button>
          </div>
        </div>
      </Card>
    </Section>
  );
}
