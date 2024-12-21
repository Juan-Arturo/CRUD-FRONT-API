import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BehaviorSubject, debounceTime, filter, Observable, switchMap, tap } from 'rxjs';
import { Result } from '../../interfaces/r&m';
import { RickMortyService } from '../../services/rick-morty.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rick-morty',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './rick-morty.component.html',
  styleUrl: './rick-morty.component.css'
})
export class RickMortyComponent {RickandmortyData$!: Observable<Result[]>;
  private dataSearch$ = new BehaviorSubject<string>("");
  OnSearch: boolean = false;
  isLoading: boolean = false;
  noResults: boolean = false; // Variable para gestionar la ausencia de resultados

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  private rickandmortyService = inject(RickMortyService);
  
  ngOnInit(): void {
    this.getrickandmortyData();
  }

  constructor(){}

  private getrickandmortyData() {
    this.RickandmortyData$ = this.rickandmortyService.getRickAndmortyCharacter();
  }

  // Buscador
  dataSearch(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.dataSearch$.next(element.value);
  }

  getRickAndmortyCharacterByID() {
    if (!this.OnSearch && this.dataSearch$) {
      this.OnSearch = true;
      this.RickandmortyData$ = this.dataSearch$.pipe(
        filter((term: string) => term.length >= 4),
        debounceTime(300),
        //tap((term) => console.log(term)),
        switchMap((term: string) => this.rickandmortyService.getRickAndmortyCharacterByID(term)),
        tap((results) => {
          if (results.length === 0) {
            this.noResults = true; // Si no hay resultados, mostramos el mensaje
          } else {
            this.noResults = false; // Si hay resultados, ocultamos el mensaje
          }
        })
      );
    } else {
      this.getrickandmortyData();
      this.OnSearch = false;
      this.noResults = false; // Resetear noResults cuando se vuelve a la vista inicial
      const clear: string = "";
      this.dataSearch$.next(clear);
      this.clearInput(); 
    }
  }

  clearInput() {
    if (this.searchInput) {
      this.searchInput.nativeElement.value = ''; // Limpiar el valor del input
    }
  }

}
