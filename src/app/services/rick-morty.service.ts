import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result, rickandmortyData } from '../interfaces/r&m';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {

 // private endPoint: string = "https://rickandmortyapi.com/api"

 private endPoint: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRickAndmortyCharacter(): Observable<Result[]> {
    return this.http.get<rickandmortyData>(`${this.endPoint}/character`).pipe(
      map((response: rickandmortyData) => response.results)
      //    tap((results)=> console.log(results))
    )//end pipe
  }//end get   


  getRickAndmortyCharacterByID(name: string): Observable<Result[]> {
    return this.http.get<rickandmortyData>(`${this.endPoint}/character/?name=${name}`).pipe(
      map((response: rickandmortyData) => {
        // Verificar si la respuesta contiene un error
        if (response.error) {
          throw new Error(response.error); // Lanza un error si no se encuentran personajes
        }
        return response.results;
      }),
      catchError((error) => {

        return of([]); // Retorna un array vacío si no se encuentran personajes
      })
    );
  }

}











///character/?name=rick
//  getRickAndmortyCharacterByID( name:string ):Observable<Result[]>{
//     return this.http.get<rickandmortyData>(`${this.endPoint}/character/?name=${name}`).pipe(
//       map((response:rickandmortyData)=>response.results),
//       tap((results)=>console.log(results))
//     )//end pipe
//  }