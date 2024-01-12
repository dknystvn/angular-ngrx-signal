import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {Book, BooksService} from "../services/books.service";
import {inject} from "@angular/core";
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {distinctUntilChanged, pipe, switchMap, tap} from "rxjs";
import {tapResponse} from '@ngrx/operators';

type BooksState = {
  books: Book[];
  isLoading: boolean;
};

const initialState: BooksState = {
  books: [],
  isLoading: false,
};

export const BooksStore = signalStore(
  withState(initialState),
  // computed signals, and methods.
  withMethods((state, booksService = inject(BooksService)) => ({
    listAll: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(state, { isLoading: true })),
        switchMap(() => {
          return booksService.findAllBooks().pipe(
            tapResponse({
              next: (books) => patchState(state, { books }),
              error: console.error,
              finalize: () => patchState(state, { isLoading: false }),
            })
          );
        })
      )
    )
  })),

  withHooks({
    onInit({ listAll }) {
      listAll();
    },
  }),
);
