export interface SurveyQuestion {
  id: number;
  label: string;
  type: 'radio' | 'text';
  options?: string[];
  order: number;
  active: boolean;
}

export const DEFAULT_SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 1,
    label: '¿Cómo calificarías la navegación del sitio web?',
    type: 'radio',
    options: ['Excelente', 'Buena', 'Aceptable', 'Difícil', 'Muy difícil'],
    order: 0,
    active: true,
  },
  {
    id: 2,
    label: '¿Qué sección te pareció más útil?',
    type: 'radio',
    options: ['Inicio', 'Servicios', 'Trámites', 'Noticias', 'Contacto'],
    order: 1,
    active: true,
  },
  {
    id: 3,
    label: '¿Qué mejorarías en la página?',
    type: 'text',
    options: [],
    order: 2,
    active: true,
  },
  {
    id: 4,
    label: '¿Te gustaría recibir noticias sobre actualizaciones del sitio?',
    type: 'radio',
    options: ['Sí', 'No'],
    order: 3,
    active: true,
  },
];