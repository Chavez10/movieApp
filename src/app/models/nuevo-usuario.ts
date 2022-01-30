export class NuevoUsuario {

    constructor(
        public username:string, 
        public email:string,
        public password:string,
        public status:boolean,
        public authorities:string[]
    ){}
}
