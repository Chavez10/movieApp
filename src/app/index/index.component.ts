import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieRent } from '../models/movie-rent';
import { MovieSold } from '../models/movie-sold';
import { AuthService } from '../service/auth.service';
import { MovieService } from '../service/movie.service';
import { RentMovieService } from '../service/rent-movie.service';
import { SalesMovieService } from '../service/sales-movie.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isAdmin = false
  roles: string []
  idUser: number
  username:string
  isLogged = false
  filter:string = 'title'
  movies: Movie[]
  salesMovie: MovieSold
  rentedMovie: MovieRent

  constructor(private tokenService: TokenService,
    private movieService: MovieService,
    private movieRent: RentMovieService,
    private salesService: SalesMovieService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true
      this.username = this.tokenService.getUsername()
      this.getIdUser()
    }
    this.roles = this.tokenService.getAuthorities()
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true
      }
    })

    this.movieLoad(this.filter)
  }

  movieLoad(filter:string){
    this.movieService.movie(filter).subscribe(
      data => {
        let movies = data.movies.filter((movie:any) => movie.status == true)
        this.movies = movies
        
      },
      err => {
        console.log(err)
      }
    );
  }

  onSalesMovie(idMovie:number, movie:string){
    
    this.salesMovie = new MovieSold(this.idUser, idMovie, this.username, movie, true)
    this.salesService.saveSold(this.salesMovie).subscribe(
      data => {
        this.toastr.success(`${data.movie_sold}`, data.message, {
          timeOut: 3000, positionClass: 'toast-top-right'
        });
        this.router.navigate(["/mov-user"])
      },
      err => {
        console.log(err)
      }
    )
  }

  onRentedMovie(idMovie:number, movie:string){
    this.rentedMovie = new MovieRent(this.idUser, idMovie, this.username, movie, true)
    this.movieRent.saveRent(this.rentedMovie).subscribe(
      data => {
        this.toastr.success(`${data.movie}`, data.message, {
          timeOut: 3000, positionClass: 'toast-top-right'
        });
        this.router.navigate(["/mov-user"])
      },
      err => {
        console.log(err)
      }
    )
  }

  getIdUser(){
    this.authService.idUser(this.username).subscribe(
      data =>{
        this.idUser = data.id
        this.tokenService.setId(this.idUser.toString())
        
      },
      err =>{
        console.log(err)
      }
    )
  }

  onLikes(id:number){
    this.movieService.likes(id).subscribe(
      data => {
        window.location.reload()
      },
      err => {
        console.log(err)
      }
    )
  }

  onDelete(id:number){
    this.movieService.deleteMovie(id).subscribe(
      data => {
        this.toastr.success(`${data.movie}`, data.message, {
          timeOut: 3000, positionClass: 'toast-top-right'
        });
        window.location.reload()
      },
      err => {
        console.log(err)
      }
    )
  }

}
