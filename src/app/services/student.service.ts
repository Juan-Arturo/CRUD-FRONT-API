import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student,SingleStudentResponse } from '../interfaces/student.model';


@Injectable({
  providedIn: 'root'
})


export class StudentService {
    private apiUrl = 'http://127.0.0.1:8000/api';
  
  constructor(private http: HttpClient) { }

  
  // Obtener todos los alumnos
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }
  

  // Obtener un alumno por matrícula
  getStudentByMatricula(matricula: number) {
    return this.http.get<SingleStudentResponse>(`${this.apiUrl}/students/${matricula}`)
  }

  // Crear un alumno
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/students`, student);
  }

  // Actualizar un alumno
  updateStudent(matricula: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/students/${matricula}`, student);
  }

  // Eliminar un alumno
  deleteStudent(matricula: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/students/${matricula}`);
  }
}
