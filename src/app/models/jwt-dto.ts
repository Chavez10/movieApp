export class JwtDto {

    constructor(
        public token:string,
        public type:string,
        public username:string,
        public authorities:string[]
    ){}
}
