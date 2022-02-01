import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { NuevoUsuario } from '../models/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  movieURL = 'http://localhost:4000/movies/'

  constructor(private httpClient: HttpClient) { }

  public movie(filter:string){
    return this.httpClient.get<any>(this.movieURL+`home/${filter}`)
  }

  public upload(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    return this.httpClient.post<any>(this.movieURL + 'upload', formData);
  }

  public newMovie(movie: Movie): Observable<any>{
    return this.httpClient.post<any>(this.movieURL + 'save', movie)
  }

  public likes(id:number): Observable<any>{
    return this.httpClient.put<any>(this.movieURL + `likes/${id}`, null)
  }

  public getMovie(id: number): Observable<any>{
    return this.httpClient.get<any>(this.movieURL + `${id}`)
  }

  public updateMovie(movie: Movie, id:number): Observable<any>{
    return this.httpClient.put<any>(this.movieURL + `update/${id}`, movie)
  }

  public deleteMovie(id:number): Observable<any>{
    return this.httpClient.delete(this.movieURL + `delete/${id}`)
  }

}
