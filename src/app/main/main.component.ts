import { Component } from '@angular/core';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [EstudiantesComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
