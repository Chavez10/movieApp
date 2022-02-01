import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MovieRent } from '../models/movie-rent';
import { ReturnMovie } from '../models/return-movie';
import { RentMovieService } from '../service/rent-movie.service';
import { ReturnMovieService } from '../service/return-movie.service';

@Component({
  selector: 'app-return-movie',
  templateUrl: './return-movie.component.html',
  styleUrls: ['./return-movie.component.css']
})
export class ReturnMovieComponent implements OnInit {

  retrn: ReturnMovie = null
  rentedMovie: MovieRent[] = []
  retMovie: ReturnMovie[] = []
  msg: string
  rentId:number = null
  onTime = 'A tiempo'
  outTime = 'Fuera de tiempo'

  constructor(
    private rentMovie: RentMovieService,
    private returnMovie: ReturnMovieService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.onRentMovies()
    this.onReturnMovies()
  }

  onRentMovies(){
    this.rentMovie.getAll().subscribe(
      data => {
        let rents = data.rent_movie.filter((rent:any)=> rent.status == true)
        this.rentedMovie = rents
      },
      err => {
        console.log(err)
      }
    )
  }

  onReturnMovies(){
    this.returnMovie.getAll().subscribe(
      data => {
        
        this.retMovie = data.rent_movie
      },
      err => {
        console.log(err)
      }
    )
  }

  onDelivery(idRent:number, idUser:number, idMovie:number, movie:string, user:string){
    this.rentId = idRent
    this.retrn = new ReturnMovie(idRent, idUser, idMovie, movie, user)
    
    this.returnMovie.saveReturn(this.retrn).subscribe(
      data => {
        
        window.location.reload()
        
        console.log(data)
      },
      err => {
        console.log(err)
      }
    )
    

  }

  onDelete(id:number){
    this.rentMovie.delete(id).subscribe(
      data =>{
        console.log("aca abajo")
        console.log(data)
      },
      err =>{
        console.log(err)
      }
    )
  }

}
