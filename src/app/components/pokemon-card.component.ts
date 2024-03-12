import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonDetail } from '../models/getAll.model';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [UpperCasePipe],
  template: `
  @if (poke.sprites.front_default) {
    <div class="card m-2 pointer" style="width: 11rem;" (click)="cardClicked.emit(poke)">
    <div class="text-center">
    <img [src]="'https://projectpokemon.org/images/normal-sprite/' + poke.name + '.gif'" 
     class="card-img-top p-4" 
     alt="{{poke.name}}">
    </div>
    
    <div class="card-body text-center">
     <h5 class="card-title"><b>{{poke.name | uppercase}}</b></h5>
    </div>
  </div>

  }

  `,
  styles: [`
  .card:hover img{
    transform: scale(1.20);
    transition: ease-in-out 450ms;
  }

  .card img{
    max-width:fit-content;
    max-height:100px;
  }

  

  

  `]
})
export class PokemonCardComponent {
 @Input({required: true}) poke!: PokemonDetail;
 @Output() cardClicked =  new EventEmitter()
}
