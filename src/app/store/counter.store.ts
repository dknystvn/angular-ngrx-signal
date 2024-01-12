import {patchState, signalStore, withHooks, withMethods, withState,} from '@ngrx/signals';
import {interval} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

export const CounterStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(({ count, ...state }) => ({
    increment() {
      patchState(state, { count: count() + 1 });
    },
  })),
  withHooks({
    onInit({ increment }) {
      interval(2_000)
        .pipe(takeUntilDestroyed())
        .subscribe(() => increment());
    },
    onDestroy({ count }) {
      console.log('count on destroy', count());
    },
  }),
);
