import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDto } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:4000/auth/'

  constructor(private httpClient: HttpClient) { }

  public nuevoUser(nuevoUser: NuevoUsuario): Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'new-user', nuevoUser)
  }

  public login(loginUser: LoginUsuario): Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUser)
  }

  public idUser(username: string): Observable<any>{
    return this.httpClient.get<any>(this.authURL + `user-id/${username}`)
  }


}
