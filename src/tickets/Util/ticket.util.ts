export function generateTicketId(): string {
    return Math.random().toString(36).substr(2, 10);
}
export function getPassengerName(passengerId: string): string {
    // Simulación: en producción, consulta a usuarios
    const names: Record<string, string> = {
      '123': 'Juan Pérez',
      '456': 'Ana Gómez',
      '789': 'Luis Torres',
    };
    return names[passengerId] || 'Desconocido';
}