export class MovieSold {

    constructor(
        public idUser:number,
        public idMovie:number,
        public user:string,
        public movie:string,
        public status:boolean,
        public datePurchase?: number
    ){}
}
