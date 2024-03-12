import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PokemonDetail, PokemonList } from '../models/getAll.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
 http = inject(HttpClient);
  baseUrl: string = "https://pokeapi.co/api/v2/";

  getPokemonList(limit: number) : Observable<PokemonList[]> {
    return this.http.get<PokemonList[]>(this.baseUrl + 'pokemon?offset=' + limit + '&limit=' + limit)
    .pipe(
        map((x: any) => x.results)
    );
}

getPokemonDetail(pokemon:string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(this.baseUrl + 'pokemon/' + pokemon);
}

}
