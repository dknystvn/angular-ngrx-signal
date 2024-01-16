import {Component, inject, Signal} from '@angular/core';
import {CommonModule, JsonPipe} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {BooksStore} from './store/books.store';
import {CounterStore} from "./store/counter.store";
import {CounterComponent} from "./components/counter/counter.component";
import {BooksComponent} from "./components/books/books.component";
import {Book} from "./models/book.model";
import {MoviesComponent} from "./components/movies/movies.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, JsonPipe, CounterComponent, BooksComponent, MoviesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [CounterStore],
})
export class AppComponent {
  // readonly bookStore = inject(BooksStore);
  //
  // books: Signal<Book[]> = this.bookStore.books;
}
