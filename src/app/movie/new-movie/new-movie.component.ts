import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/models/movie';
import { TypeMovie } from 'src/app/models/type-movie';
import { MovieService } from 'src/app/service/movie.service';
import { TypeServiceService } from 'src/app/service/type-service.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css'],
})
export class NewMovieComponent implements OnInit {
  movie: Movie;
  title: string;
  description: string;
  image: string;
  imagen: File;
  imagenMin: File;
  rentPrice: number;
  salesPrice: number;
  stock: number;
  disponible: string = ''
  tipoDisponibilidad: string[] = ['Disponible', 'No Disponible']
  availability: boolean;
  status: boolean = true;
  likes: number = 0;
  typeMovies: any[];
  tipos: number[] = [];
  type: TypeMovie[] = [];

  constructor(
    private movieService: MovieService, 
    private typeMv: TypeServiceService,
    private router: Router,
    private spiner: NgxSpinnerService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.onTypeMovie()
  }

  radioChange(event: any){
      this.disponible = event.target.value
      console.log(this.disponible)
  }

  onFileChange(event: any){
    this.imagen = event.target.files[0]
    const fr = new FileReader()
    fr.onload = (e: any) =>{
      this.imagenMin = e.target.result
    }
    fr.readAsDataURL(this.imagen)
    console.log(this.image)
  }

  typeChange(event: any){
    this.tipos.push(event.target.value)
    console.log(this.tipos)
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

  onNewMovie(): void {
    this.spiner.show()
    this.movieService.upload(this.imagen).subscribe(
      data =>{
        this.spiner.hide()
        this.image = data.imagen.secure_url
        
      },
      err =>{
        this.spiner.hide()
        console.log(err)
      }
    )
    this.tipos.forEach(tipo => {
      let typeMov = new TypeMovie(tipo)
      this.type.push(typeMov)
    })
    console.log(this.image)
    this.movie = new Movie(this.title, this.description, this.image,
      this.rentPrice, this.salesPrice, this.stock, this.availability, this.status, this.likes, this.type);
    
      this.movieService.newMovie(this.movie).subscribe(
        data =>{
          this.toastr.success(`${data.message}`, 'Exito', {
            timeOut: 3000, positionClass: 'toast-top-right'
          });
          this.router.navigate(["/"])
          console.log(data)
        },
        err =>{
          console.log(err)
        }
      )

  }

  
}
