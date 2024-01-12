import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class BooksService {

  findAllBooks(): Observable<Book[]> {
    return of([{id: '123', volumeInfo: {title: 'abc', authors: ['ab', 'de']}}]);
  }
}

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: Array<string>;
  };
}

