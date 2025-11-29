import { Button, Card, Input, Section } from "@thrifty/ui";
import React from "react";

export default function RegisterPage() {
  return (
    <Section
      title="Crear cuenta"
      description="Configura tu perfil de atleta híbrido y empieza."
      className="max-w-3xl"
    >
      <Card title="Perfil básico">
        <div className="space-y-4">
          <Input label="Nombre" placeholder="Alex Atleta" />
          <Input label="Email" type="email" placeholder="tu@correo.com" />
          <Input label="Contraseña" type="password" placeholder="••••••••" />
          <div className="flex items-center justify-end gap-3">
            <Button variant="ghost" size="sm">
              Cancelar
            </Button>
            <Button variant="primary">Crear cuenta</Button>
          </div>
        </div>
      </Card>
    </Section>
  );
}
