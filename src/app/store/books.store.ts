import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {Book} from "../models/book.model";
import {computed, inject} from "@angular/core";
import {BooksService} from "../services/books.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, switchMap, tap} from "rxjs";
import {setLoaded, setLoading, withCallState, withLogger} from "./store.feature";
import {tapResponse} from "@ngrx/operators";

type BooksState = {
  books: Book[];
};

const initialState: BooksState = {
  books: [],
};

export const BooksStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withCallState(),
  withLogger('books'),
  withComputed(({books}) => ({
    booksCount: computed(() => books().length),
  })),
  withMethods((state, booksService = inject(BooksService)) => {
    return {
      listAll: rxMethod<void>(
        pipe(
          tap(() => patchState(state, setLoading())),
          switchMap(() => booksService.findAll()),
          tap((books: Book[]) => patchState(state, setLoaded(), {books}  ))
        )
      ),
      createBook: rxMethod<Book>(
        pipe(

          tap(() => patchState(state, setLoading())),
          switchMap((book: Book) => {
            return booksService.create(book).pipe(
              tapResponse({
                next: (b: Book) => patchState(state, {books: [...state.books(), b]}),
                error: console.error,
                finalize: () => patchState(state, setLoaded),
              })
            );
          })
        )
      ),

      // Need to provide an injector in this case
      // add to the withMethods: injector = inject(Injector)
      // create(book: Book): void {
      //   rxMethod<Book>(
      //     pipe(
      //       switchMap(() => booksService.create(book)),
      //       tap((b: Book) => patchState(state, {books: [...state.books(), b]}))
      //     ),
      //     {injector: injector}
      //   )
      // }
    };
  }),
  withHooks({
    onInit({listAll}) {
      listAll();
    },
  }),
);
