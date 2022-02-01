import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { MovieGuardService as guard } from './guard/movie-guard.service';
import { IndexComponent } from './index/index.component';
import { EditMovieComponent } from './movie/edit-movie/edit-movie.component';
import { NewMovieComponent } from './movie/new-movie/new-movie.component';
import { MovimientosUserComponent } from './movimientos-user/movimientos-user.component';
import { ReturnMovieComponent } from './return-movie/return-movie.component';


const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'new-movie', component: NewMovieComponent, canActivate: [guard], data: {expectedRol: ['admin']}},
  {path: 'mov-user', component: MovimientosUserComponent, canActivate: [guard], data: {expectedRol: ['user']}},
  {path: 'edit/:id', component: EditMovieComponent, canActivate: [guard], data: {expectedRol: ['admin']}},
  {path: 'return-movie', component: ReturnMovieComponent, canActivate: [guard], data: {expectedRol: ['admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
