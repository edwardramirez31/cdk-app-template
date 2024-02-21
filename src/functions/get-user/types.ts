export enum UserInterest {
  SLEEP = 'Mejorar la Calidad del Sueño',
  SPORTS = 'Incrementar el Rendimiento Deportivo',
  STRESS = 'Controlar el Estrés y la Ansiedad',
  PRODUCTIVITY = 'Mejorar la Productividad',
  IMMUNE_SYSTEM = 'Fortalecer la Salud y el Sistema Inmune',
  MENTALITY = 'Desarrollar una Mentalidad Ganadora',
  ENERGY = 'Aumentar los Niveles de Energía',
  PRESENT = 'Enfoque en el Presente',
  RESILIENCE = 'Resiliencia Mental',
  METABOLISM = 'Optimizar el Metabolismo',
  RECOVERY = 'Recuperación Muscular y Alivio de Dolores',
  MOVILITY = 'Mejorar la Flexibilidad y Movilidad',
  HORMONAL = 'Equilibrio Hormonal',
  CONNECTION = 'Fomentar la Conexión Mente-Cuerpo',
  HEALTH = 'Cultivar Hábitos Saludables',
}

export interface User {
  username: string;
  name?: string;
  email?: string;
  telephone?: string;
  address?: string;
  dateOfBirth?: string;
  notes?: string;
  weight?: number;
  height?: number;
  mainInterest?: UserInterest;
  eps?: string;
}
