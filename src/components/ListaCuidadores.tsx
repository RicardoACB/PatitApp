import TarjetaCuidador from './TarjetaCuidador';

interface Cuidador {
  id: number;
  name: string;
  especialidad: string;
  lat: number;
  lng: number;
  descripcion: string;
}

interface ListaCuidadoresProps {
  cuidadores?: Cuidador[];
}

// Datos de prueba oficiales de la documentación del proyecto
const cuidadoresPrueba: Cuidador[] = [
  { id: 1, name: 'María Pérez', especialidad: 'Adulto Mayor', lat: -33.450, lng: -70.670, descripcion: 'Amo escuchar sus historias de vida.' },
  { id: 2, name: 'Juan Silva', especialidad: 'Enfermería', lat: -33.445, lng: -70.665, descripcion: 'Especialista en curaciones y post-operatorio.' },
  { id: 3, name: 'Ana Rojas', especialidad: 'Movilidad Reducida', lat: -33.435, lng: -70.650, descripcion: 'Fuerza física y técnica de traslado.' },
  { id: 4, name: 'Carlos Vega', especialidad: 'Acompañamiento', lat: -33.420, lng: -70.590, descripcion: 'Alegre, toco la guitarra y canto.' },
  { id: 5, name: 'Sofía Soto', especialidad: 'Demencia Senil', lat: -33.415, lng: -70.600, descripcion: 'Mucha paciencia y rutinas cognitivas.' },
  { id: 6, name: 'Pedro Díaz', especialidad: 'Terapia Física', lat: -33.460, lng: -70.680, descripcion: 'Ejercicios suaves para articulaciones.' },
  { id: 7, name: 'Laura Gómez', especialidad: 'Adulto Mayor', lat: -33.455, lng: -70.640, descripcion: 'Me gusta cocinar recetas tradicionales.' },
  { id: 8, name: 'Diego Mella', especialidad: 'Paliativos', lat: -33.440, lng: -70.630, descripcion: 'Entrego paz, confort y tranquilidad.' },
  { id: 9, name: 'Carmen Paz', especialidad: 'Enfermería', lat: -33.470, lng: -70.655, descripcion: 'Manejo riguroso de medicamentos.' },
  { id: 10, name: 'Luis Vera', especialidad: 'Acompañamiento', lat: -33.425, lng: -70.615, descripcion: 'Excelente para caminatas por el parque.' },
  { id: 11, name: 'Marta Ruz', especialidad: 'Alzheimer', lat: -33.410, lng: -70.580, descripcion: 'Especializada en contención emocional.' },
  { id: 12, name: 'Jorge Tapia', especialidad: 'Nocturno', lat: -33.480, lng: -70.690, descripcion: 'Vigilia atenta y sueño ligero.' },
  { id: 13, name: 'Elena Pino', especialidad: 'Adulto Mayor', lat: -33.430, lng: -70.620, descripcion: 'Amo leerles novelas y diarios.' },
  { id: 14, name: 'Raúl Osses', especialidad: 'Movilidad Reducida', lat: -33.465, lng: -70.660, descripcion: 'Manejo seguro de sillas de ruedas.' },
  { id: 15, name: 'Paola Caro', especialidad: 'Enfermería', lat: -33.490, lng: -70.645, descripcion: 'Control estricto de signos vitales.' },
  { id: 16, name: 'Felipe Araya', especialidad: 'Terapia Ocupacional', lat: -33.405, lng: -70.570, descripcion: 'Juegos de mesa para la memoria.' },
  { id: 17, name: 'Rosa León', especialidad: 'Acompañamiento', lat: -33.458, lng: -70.675, descripcion: 'Muy conversadora y empática.' },
  { id: 18, name: 'Daniel Ríos', especialidad: 'Nocturno', lat: -33.428, lng: -70.595, descripcion: 'Asistencia inmediata ante emergencias.' },
  { id: 19, name: 'Isabel Cruz', especialidad: 'Adulto Mayor', lat: -33.418, lng: -70.605, descripcion: 'Preparo dietas suaves y nutritivas.' },
  { id: 20, name: 'Víctor Lara', especialidad: 'Enfermería', lat: -33.448, lng: -70.635, descripcion: 'Experiencia con oxígeno y sondas.' }
];

export default function ListaCuidadores({ cuidadores = cuidadoresPrueba }: ListaCuidadoresProps) {
  const listaAMostrar = cuidadores.length > 0 ? cuidadores : cuidadoresPrueba;

  return (
    <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
      {listaAMostrar.map((cuidador) => (
        <TarjetaCuidador key={cuidador.id} cuidador={cuidador} />
      ))}
    </div>
  );
}