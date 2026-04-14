import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SAMEN Portal | Clínica de Salud Mental',
  description: 'Portal de gestión clínica, historia de pacientes y resultados para SAMEN IPS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
