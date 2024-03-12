import { Component, HostListener, OnInit, Signal, inject, signal } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { PokemonDetail, PokemonList } from '../models/getAll.model';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PokemonCardComponent } from '../components/pokemon-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [ScrollingModule,PokemonCardComponent,JsonPipe],
  template: `

  <div class="mt-3 d-flex justify-content-center">
      <div class="d-flex gap-2">
        <input
            #input
            (keydown.enter)="getSearch(input)"
            class="form-control" type="search" placeholder="Search" aria-label="Search"
          />
        <button class="btn btn-outline-danger" (click)="getSearch(input)"><b>Search</b></button>
        </div>
  </div>
  <div class="d-flex justify-content-center flex-wrap mt-2">
    @if(!searchPokemon){
      @for (item of pokemons; track $index) {
       <app-pokemon-card [poke]="item" (cardClicked)="cardOnClick($event)"/>
      }
    }@else {
      <app-pokemon-card [poke]="searchPokemon" (cardClicked)="cardOnClick($event)"/>
    }
   
    @if(showScrollToTop){
    <button class="scroll-to-top btn btn-danger" (click)="scrollToTop()">
      Scroll to Top
    </button>
   }
  </div>
  <div class="text-center m-2">
  <button class="btn btn-danger" (click)="loadMore()">Load More</button>
  </div>
 
  `,
  styles: [`
   .scroll-to-top {
      position: fixed;
      bottom: 20px;
      right: 20px;
    }
  `]
})
export default class PokemonsComponent implements OnInit  {

  pokemonService = inject(PokemonService);
  router = inject(Router);
  pokemons! :PokemonDetail[];
  limit : number = 50;
  searchPokemon! : PokemonDetail;
  showScrollToTop = false;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.showScrollToTop = window.pageYOffset > 200; 
  }

 scrollToTop() {
   window.scrollTo({ top: 0, behavior: 'smooth' });
 }
 loadMore() {
  this.limit += 20;
  this.getPage();
}

  ngOnInit(): void {
    this.getPage();
    this.onWindowScroll();
  }

  cardOnClick(pokemon : PokemonDetail){
    this.router.navigate([pokemon.name])
  }

 getPage() {
  this.pokemonService.getPokemonList(this.limit)
    .pipe(
      switchMap((list: PokemonList[]) => 
        forkJoin(list.map((value: PokemonList) => 
          this.pokemonService.getPokemonDetail(value.name)
        ))
      )
    )
    .subscribe(pokemons => {
      this.pokemons = pokemons;
      console.log(pokemons);
    });
 }

 getSearch(input: HTMLInputElement) {
  if (!input.value.trim()) {
    return;
  }
  console.log(input.value);
  this.pokemonService.getPokemonDetail(input.value).subscribe({
    next: (res) => {
      console.log(res);
      this.searchPokemon = res;

      if (res) {
        this.searchPokemon = res;
        input.value = '';
      } else {
        input.value = '';
      }
    },
    error: (err) => {
      console.log(err);
    },
  });
}




}
