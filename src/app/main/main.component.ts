import { Component } from '@angular/core';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [EstudiantesComponent,NavbarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
