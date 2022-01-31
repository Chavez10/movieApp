import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  isLogged = false;
  isRegister = false;
  isRegisterFail = false;
  newUser: NuevoUsuario;
  username: string;
  email: string;
  password: string;
  status: boolean = true;
  errMsg: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLogged = true;

  }

  onRegister(): void {
    this.newUser = new NuevoUsuario(this.username, this.email, this.password, this.status)
    this.authService.nuevoUser(this.newUser).subscribe(
      data => {
        this.isRegister = true
        this.isRegisterFail = false
        this.router.navigate(['/login'])
      },
      err => {
        this.isRegister = false
        this.isRegisterFail = true
        console.log()
        this.errMsg = err.error.message
      }
    )
  }

}
