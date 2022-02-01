import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MovieRent } from '../models/movie-rent';
import { MovieSold } from '../models/movie-sold';
import { RentMovieService } from '../service/rent-movie.service';
import { SalesMovieService } from '../service/sales-movie.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-movimientos-user',
  templateUrl: './movimientos-user.component.html',
  styleUrls: ['./movimientos-user.component.css']
})
export class MovimientosUserComponent implements OnInit {

  soldMovie: MovieSold[] = []
  rentedMovie: MovieRent[] = []
  msg: string

  constructor(
    private salesMovie: SalesMovieService,
    private rentMovie: RentMovieService,
    private router: Router,
    private tokenService: TokenService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.onSoldMovieByUser()
    this.onRentByUser()
    if (this.soldMovie.length <= 0 && this.rentedMovie.length <= 0) {
      this.msg = 'No tienes moviemientos.'
    }
  }


  onSoldMovieByUser() {
    let idUser: number = parseInt(this.tokenService.getId())
    this.salesMovie.soldByUser(idUser).subscribe(
      data => {
        this.soldMovie = data.movie_sold
        console.log(data)
      },
      err => {
        console.log(err)
      }
    )
  }

  onRentByUser(){
    let idUser: number = parseInt(this.tokenService.getId())
    this.rentMovie.getByUser(idUser).subscribe(
      data =>{
        this.rentedMovie = data.rent_movie
      },
      err =>{
        console.log( err)
      }
    )
  }

}
