import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  movieURL = 'http://localhost:4000/movies/'

  constructor(private httpClient: HttpClient) { }

  public movie(filter:string){
    return this.httpClient.get<any>(this.movieURL+`home/${filter}`)
  }
}
