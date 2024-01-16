import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {BooksStore} from "../../store/books.store";
import {Book} from "../../models/book.model";
import {BooksService} from "../../services/books.service";
import {CounterStore} from "../../store/counter.store";
import {CallState} from "../../store/store.feature";

@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent {
  private readonly bookStore = inject(BooksStore);
  private readonly counterStore = inject(CounterStore);
  private readonly service = inject(BooksService);

  books: Signal<Book[]> = this.bookStore.books;
  booksCount: Signal<number> = this.bookStore.booksCount;
  isLoading: Signal<CallState> = this.bookStore.callState;
  counter: Signal<number> = this.counterStore.count;

  book: Book = {
    "id": "999",
    "volumeInfo": {
      "title": "NEW",
      "authors": [
        "BOOK"
      ]
    }
  }

  create(): void {
    this.bookStore.createBook(this.book);

  }
}
