import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReturnMovie } from '../models/return-movie';

@Injectable({
  providedIn: 'root'
})
export class ReturnMovieService {

  movieReturn = 'http://localhost:4000/return-movie/'

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<any>{
    return this.httpClient.get<any>(this.movieReturn)
  }

  public saveReturn(retrn: ReturnMovie): Observable<any>{
    return this.httpClient.post<any>(this.movieReturn + 'save', retrn)
  }

  
}
