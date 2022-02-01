import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken'
const USERNAME_KEY = 'AuthUserName'
const IDUSER_KEY = 'AuthIdUser'
const AUTHORITIES_KEY = 'AuthAuthorities'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = []

  constructor() { }

  public setToken(token:string):void {
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.setItem(TOKEN_KEY, token)
  }

  public getToken():string {
    return sessionStorage.getItem(TOKEN_KEY)!
  }


  public setUsername(username:string):void {
    window.sessionStorage.removeItem(USERNAME_KEY)
    window.sessionStorage.setItem(USERNAME_KEY, username)
  }

  public getUsername():string {
    return sessionStorage.getItem(USERNAME_KEY)!
  }

  public setAuthorities(authorities:string[]):void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY)
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities))
  }

  public setId(id:string):void {
    window.sessionStorage.removeItem(IDUSER_KEY)
    window.sessionStorage.setItem(IDUSER_KEY, id)
  }

  public getId():string {
    return sessionStorage.getItem(IDUSER_KEY)!
  }

  public getAuthorities():string[]{
    this.roles = []
    if(sessionStorage.getItem(AUTHORITIES_KEY)){
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((authority:any) =>{
        this.roles.push(authority.authority)
      })
    }

    return this.roles;
  }

  public logOut():void {
    window.sessionStorage.clear()
  }

}
