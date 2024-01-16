import {patchState, signalStore, withHooks, withMethods} from "@ngrx/signals";
import {EntityId, removeEntity, setAllEntities, withEntities} from "@ngrx/signals/entities";
import {inject} from "@angular/core";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {map, pipe, switchMap, tap} from "rxjs";
import {setLoaded, setLoading, withCallState, withLogger} from "./store.feature";
import {MovieService} from "../services/movies.service";

export type Movie = {
  title: string,
  year: string,
  type: string,
  poster: string,
}


export const MoviesStore = signalStore(
  withEntities<Movie>(),
  withCallState(),
  withLogger('Movie'),
  withMethods((state, movieService = inject(MovieService)) => {
    return {
      listAll: rxMethod<void>(
        pipe(
          tap(() => patchState(state, setLoading())),
          switchMap(() => movieService.findAllMovies()),
          tap((movies: Movie[]) => patchState(state, setLoaded(), setAllEntities(movies, {idKey: 'title'})))
        )
      ),
      remove: rxMethod<EntityId>(
        pipe(
          map((id: EntityId) => patchState(state, removeEntity(id))
          )
        ))
    };
  }),
  withHooks({
    onInit({listAll}): void {
      listAll();
    }
  })
);

