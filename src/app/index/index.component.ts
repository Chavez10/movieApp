import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieService } from '../service/movie.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  username:string
  isLogged = false
  filter:string = 'title'
  movies: Movie[]
  constructor(private tokenService: TokenService,
    private movieService: MovieService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true
      this.username = this.tokenService.getUsername()
    }
    this.movieLoad(this.filter)
  }

  movieLoad(filter:string){
    this.movieService.movie(filter).subscribe(
      data => {
        this.movies = data.movies
      },
      err => {
        console.log(err)
      }
    );
  }

}
