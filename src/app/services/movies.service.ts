import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Movie} from "../store/movies.store";

@Injectable({providedIn: 'root'})
export class MovieService {
  private readonly http: HttpClient = inject(HttpClient);

  findAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.BACKEND_URL}/movies`);
  }
}


