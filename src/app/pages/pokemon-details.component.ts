import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonDetail } from '../models/getAll.model';
import { PokemonService } from '../services/pokemon.service';
import { JsonPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [JsonPipe,UpperCasePipe,RouterLink],
  template: `
  <div class="container d-flex flex-column gap-3 mt-3">
    <div class="d-flex justify-content-evenly flex-column gap-3 align-items-center border border-black border-2 rounded p-3">
        <span class="d-flex justify-content-evenly gap-4 align-items-center" >
          <h1><b>{{pokemon?.name | uppercase}}</b></h1>
          <img src="{{pokemon?.sprites?.other?.dream_world?.front_default}}" width="80px" alt="{{pokemon?.name}}">
        </span>
        <span class="d-flex justify-content-evenly gap-4 align-items-center mt-2" >
          @for (item of pokemon?.types; track $index) {<p class="h3 text-danger">{{item.type.name | uppercase}}</p>}
        </span>
    </div>
    <div class="d-flex justify-content-center flex-column align-items-center border border-black border-2 rounded mb-2 p-2">
      <table class="table">
        <tbody>
          @for (p of pokemon?.stats; track $index) {
            <tr>
             <th scope="row" class="col-7">{{p.stat.name | uppercase}}</th>
             <td>
              <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar bg-danger" style="width: {{p.base_stat}}%">{{p.base_stat}}</div>
              </div>
             </td>
            </tr>
          }
        </tbody>
      </table>
      <img src="{{pokemon?.sprites?.other?.dream_world?.front_default}}" class="imgg" alt="{{pokemon?.name}}">
      <br>
    </div>
    <button class="btn btn-danger w-25 mx-auto mb-3" routerLink="/pokemons">BACK</button>
  </div>
  `,
  styles: [`


  `]
})
export default class PokemonDetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  pokemon! :PokemonDetail | undefined;
  

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        const pokemon : string = params['name'];
        this.pokemonService.getPokemonDetail(pokemon).subscribe(pokemon => {
         this.pokemon = pokemon;
        });
    });
}

}
