import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/models/movie';
import { TypeMovie } from 'src/app/models/type-movie';
import { MovieService } from 'src/app/service/movie.service';
import { TypeServiceService } from 'src/app/service/type-service.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
})
export class EditMovieComponent implements OnInit {
  idMovie: number
  movie: Movie  = null;
  tipoDisponibilidad: string[] = ['Disponible', 'No Disponible'];
  typeMovies: any[];
  tipos: number[] = [];
  type: TypeMovie[] = [];
  imagen: File;
  imagenMin: File;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private typeMv: TypeServiceService,
    private movieService: MovieService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.idMovie = this.activatedRouter.snapshot.params['id'];
    this.movieService.getMovie(this.idMovie).subscribe(
      (data) => {
        this.movie = data.movie;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
    this.onTypeMovie()
  }

  detailMovie() {}

  onUpdateMovie() {
    this.movieService.updateMovie(this.movie, this.idMovie).subscribe(
      data => {
        this.toastr.success(`Bienvenido ${data.username}`, 'Exito', {
          timeOut: 3000, positionClass: 'toast-top-right'
        });
        console.log(data)
      },
      err =>{
        console.log(err)
      }
    )
  }

  radioChange(event: any) {
    this.movie.availability = event.target.value;
  }

  typeChange(event: any) {
    this.tipos.push(event.target.value);
    this.tipos.forEach(tipo => {
      let typeMov = new TypeMovie(tipo)
      
      this.type.push(typeMov)
    })

    console.log(this.type);
  }

  onFileChange(event: any) {
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.imagenMin = e.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }

  onTypeMovie(): void{
    
    this.typeMv.list().subscribe(
      data => {
        this.typeMovies = data.type_movie
        
        console.log(this.typeMovies)
      },
      err => {
        console.log(err)
      }
    )
  }
}
