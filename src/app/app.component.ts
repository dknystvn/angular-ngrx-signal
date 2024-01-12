import {Component, inject, Signal} from '@angular/core';
import {CommonModule, JsonPipe} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {BooksStore} from './store/books.store';
import {Book} from "./services/books.service";
import {CounterStore} from "./store/counter.store";
import {CounterComponent} from "./components/counter/counter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, JsonPipe, CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [BooksStore, CounterStore],
})
export class AppComponent {
  readonly bookStore = inject(BooksStore);
  readonly counterStore = inject(CounterStore);

  books: Signal<Book[]> = this.bookStore.books;
  counter: Signal<number> = this.counterStore.count;
}
