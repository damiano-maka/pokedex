import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  template: `
  <div class="col-12 col-sm-12 col-md-12 col-lg-10 mx-auto">

  <nav class="navbar bg-danger p-2 d-flex flex-column justify-content-center sticky-top">
    <div class="d-flex justify-content-center">
      <img src="../assets/logo.png" draggable="false" alt="logo-pokedex" class="logoImg pointer">
    </div>
    <div class="d-flex justify-content-center mt-4 gap-2 ">
      <p class="h6 text-white pointer" routerLink="/welcome">WELCOME</p>
      <p class="h6 text-white pointer" routerLink="/pokemons">POKEMONS</p>
      <p class="h6 text-white pointer" routerLink="/welcome">LOGIN</p>
    </div>
  </nav>

  <router-outlet />

  </div>


  `,
  styles: [`
  .logoImg{
    width: 100%;
    height: 100%;
    max-width:300px;
    max-height:50px;
  }

  nav {
    box-shadow: 0 0px 4px black;
  }

  `],
})
export class AppComponent {

}
