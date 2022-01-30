import { TypeMovie } from "./type-movie"

export class Movie{
    id?: number
    title: string
    description: string
    image: string
    rentPrice: number
    salesPrice: number
    stock: number
    availability: boolean
    status: boolean
    likes: number
    typeMovies: TypeMovie[]

    constructor(
        title:string,
        description:string,
        image:string,
        rentPrice:number,
        salesPrice:number,
        stock:number,
        availability: boolean,
        status: boolean,
        likes: number,
        typeMovies: TypeMovie[]

    ){
        this.title = title
        this.description = description
        this.image = image
        this.rentPrice = rentPrice
        this.salesPrice = salesPrice
        this.stock = stock
        this.availability = availability
        this.status = status
        this.likes = likes
        this.typeMovies = typeMovies
    }
}