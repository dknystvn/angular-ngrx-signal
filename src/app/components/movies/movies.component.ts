import {Component, inject, Signal} from '@angular/core';
import {Movie, MoviesStore} from "../../store/movies.store";
import {EntityId, EntityMap} from "@ngrx/signals/entities";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  providers: [MoviesStore]
})
export class MoviesComponent {
  readonly movieStore = inject(MoviesStore);
  movies: Signal<Movie[]> = this.movieStore.entities;
  ids: Signal<EntityId[]> = this.movieStore.ids;


  remove(): void {
    this.movieStore.remove(this.ids()[0]);
  }
}
