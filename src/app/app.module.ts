import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { interceptorProvider } from './interceptors/movie-interceptor.service';
import { NewMovieComponent } from './movie/new-movie/new-movie.component';
import { MatRadioModule } from '@angular/material/radio'
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SaleMovieComponent } from './movie/sale-movie/sale-movie.component'
import { ToastrModule } from 'ngx-toastr';
import { MovimientosUserComponent } from './movimientos-user/movimientos-user.component';
import { EditMovieComponent } from './movie/edit-movie/edit-movie.component';
import { ReturnMovieComponent } from './return-movie/return-movie.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent,
    NewMovieComponent,
    SaleMovieComponent,
    MovimientosUserComponent,
    EditMovieComponent,
    ReturnMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatRadioModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
