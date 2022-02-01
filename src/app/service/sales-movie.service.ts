import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieSold } from '../models/movie-sold';

@Injectable({
  providedIn: 'root'
})
export class SalesMovieService {

  movieSold = 'http://localhost:4000/movie-sold/'

  constructor(
    private httpClient: HttpClient
  ) { }

  public saveSold(sold: MovieSold): Observable<any>{
    return this.httpClient.post<any>(this.movieSold + 'save', sold)
  }

  public soldByUser(idUser: number){
    return this.httpClient.get<any>(this.movieSold + `sold-movie/${idUser}`)
  }
}
