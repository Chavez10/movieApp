import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class MovieGuardService implements CanActivate {

  realRol:string

  constructor(private tokenService: TokenService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol']
    const roles = this.tokenService.getAuthorities()
    this.realRol = 'user'

    console.log(this.tokenService.getAuthorities())
    roles.forEach(rol => {
      if(rol === 'ROLE_ADMIN'){
        
        this.realRol = 'admin'
      }
    })

    if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1) {
      console.log(expectedRol.indexOf(this.realRol))
      console.log(this.realRol)
      this.router.navigate(["/"])
      return false
    }
    return true
  }
}
