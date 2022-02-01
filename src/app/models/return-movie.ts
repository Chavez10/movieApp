export class ReturnMovie {
  id?: number;
  rentedMovieId: number;
  userId: number;
  movieId: number;
  movie: string;
  user: string;
  onTime: boolean;
  penalty: number;

  constructor(
    rentedMovieId: number,
    userId: number,
    movieId: number,
    movie: string,
    user: string
  ) {
    this.rentedMovieId = rentedMovieId
    this.userId = userId
    this.movieId = movieId
    this.movie = movie
    this.user = user
  }
}
