import {patchState, signalStore, withHooks, withMethods, withState,} from '@ngrx/signals';
import {interval} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {withLogger} from "./store.feature";
import {Signal, Type} from "@angular/core";
import {StateSignal} from "@ngrx/signals/src/state-signal";

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};
//
// const COUNTER_STATE = new InjectionToken<CounterState>('BooksState', {
//   factory: () => initialState,
// });
//
// const CounterStore = signalStore(
//   withState(() => inject(COUNTER_STATE))
// );

export const CounterStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withLogger('Counter'),
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
