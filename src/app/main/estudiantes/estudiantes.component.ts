import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../../interfaces/student.model';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent {
  students: Student[] = []; // Usamos la interfaz Student para tipar la lista
  currentStudent: Student = {  // Usamos la interfaz Student para tipar el objeto
    matricula: 0,
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    especialidad: '',
    seguro_medico: '',
    curp: '',
    fecha_nacimiento: '',
    created_at: '',
    updated_at: ''
  };
  editing: boolean = false;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getAllStudents();
  }

  // Obtener todos los estudiantes
  getAllStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (response) => (this.students = response),
      error: (err) => console.error('Error al obtener estudiantes:', err)
    });
  }

  // Agregar o actualizar estudiante
  onSubmit(): void {
    if (this.editing) {
      this.studentService.updateStudent(this.currentStudent.matricula, this.currentStudent).subscribe({
        next: () => {
          this.getAllStudents();
          this.resetForm();
        },
        error: (err) => console.error('Error al actualizar estudiante:', err)
      });
    } else {
      this.studentService.createStudent(this.currentStudent).subscribe({
        next: () => {
          this.getAllStudents();
          this.resetForm();
        },
        error: (err) => console.error('Error al agregar estudiante:', err)
      });
    }
  }

  // Editar estudiante
  editStudent(student: Student): void {  
    this.currentStudent = { ...student };
    this.editing = true;
  }

  // Eliminar estudiante
  deleteStudent(matricula: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      this.studentService.deleteStudent(matricula).subscribe({
        next: () => this.getAllStudents(),
        error: (err) => console.error('Error al eliminar estudiante:', err)
      });
    }
  }

  // Resetear formulario
  resetForm(): void {
    this.currentStudent = {
      matricula: 0,
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      especialidad: '',
      seguro_medico: '',
      curp: '',
      fecha_nacimiento: '',
      created_at: '',
      updated_at: ''
    };
    this.editing = false;
  }
}