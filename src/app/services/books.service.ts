import {inject, Injectable} from "@angular/core";
import {delay, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Book} from "../models/book.model";

@Injectable({providedIn: 'root'})
export class BooksService {
  private readonly http = inject(HttpClient);

  findAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.BACKEND_URL}/books`).pipe(delay(1000));
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.BACKEND_URL}/books`, book).pipe(delay(1000))
  }
}


