import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <header class="container">
    <h1>ABC Pharmacy</h1>
    <nav>
      <a routerLink="/">Medicines</a>
      <a routerLink="/sales">Sales</a>
    </nav>
  </header>
  <main class="container">
    <router-outlet></router-outlet>
  </main>
  `,
  styles: [`
    .container { max-width: 1080px; margin: 0 auto; padding: 1rem; }
    header { display:flex; justify-content: space-between; align-items: center; }
    nav a { margin-right: 1rem; }
  `]
})
export class AppComponent {}