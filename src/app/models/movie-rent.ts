export class MovieRent {

    public rentedId?:number
    public rentDate:number
    public returnDate:number

    constructor(
        public userId:number,
        public movieId:number,
        public user:string,
        public movie:string,
        public status: boolean
    ){}

}
