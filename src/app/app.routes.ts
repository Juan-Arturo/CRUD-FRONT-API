import { Routes } from '@angular/router';
import path from 'node:path';
import { MainComponent } from './main/main.component';
import { EstudiantesComponent } from './main/estudiantes/estudiantes.component';
import { RickMortyComponent } from './main/rick-morty/rick-morty.component';

export const routes: Routes = [
    {path:"",component:EstudiantesComponent},
    {path:"student",component:EstudiantesComponent},
    {path:"rickmoty",component:RickMortyComponent},
    {path:"**",component:EstudiantesComponent},
];
