import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {

  typeMovie = 'http://localhost:4000/type-movie/'

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<any>{
    return this.httpClient.get<any>(this.typeMovie)
  }

}
