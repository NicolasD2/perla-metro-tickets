import {v4 as uuidv4} from 'uuid';

export function generateTicketId(): string {
    return Math.random().toString(36).substr(2, 10);
}
export function getPassengerName(passengerId: string): string {

    const mockNames: Record<string, string> = {
      '123': 'Juan Pérez',
      '456': 'Ana Gómez',
      '789': 'Luis Torres',
      '550e8400-e29b-41d4-a716-446655440001': 'Juan Pérez',
      '550e8400-e29b-41d4-a716-446655440002': 'Ana Gómez',
      '550e8400-e29b-41d4-a716-446655440003': 'Luis Torres',
      '550e8400-e29b-41d4-a716-446655440004': 'María González',
      '550e8400-e29b-41d4-a716-446655440005': 'Carlos Rodríguez',
    };
    return mockNames[passengerId] || 'Desconocido';
}
export function formatTicketDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
export function isValidUUIDv4(uuid: string): boolean {
    const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidv4Regex.test(uuid);
}
export function generateUUIDv4(): string {
    return uuidv4();
}