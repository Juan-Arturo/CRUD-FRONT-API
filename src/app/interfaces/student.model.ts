export interface Student {
  matricula: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  especialidad: string;
  seguro_medico: string;
  curp: string;
  fecha_nacimiento: string;
  created_at: string;
  updated_at: string;
}

// Respuesta al buscar un estudiante por matrícula
export interface SingleStudentResponse {
  student: Student;
  message: string;
  status: number;
}
