import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccueilComponent } from '../Pages/accueil/accueil';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AccueilComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('kane_form');
}
