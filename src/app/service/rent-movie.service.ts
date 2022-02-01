import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieRent } from '../models/movie-rent';

@Injectable({
  providedIn: 'root'
})
export class RentMovieService {

  movieRent = 'http://localhost:4000/movie-rental/'

  constructor(private httpClient: HttpClient) { }


  public getAll(): Observable<any>{
    return this.httpClient.get<any>(this.movieRent)
  }

  public saveRent(rent: MovieRent): Observable<any>{
    return this.httpClient.post<any>(this.movieRent + 'save', rent)
  }

  
  public getByUser(idUser:number): Observable<any>{
    return this.httpClient.get<any>(this.movieRent + `rent-user/${idUser}`)
  }

  public delete(id:number): Observable<any>{
    return this.httpClient.delete(this.movieRent+`delete/${id}`)
  }
}
