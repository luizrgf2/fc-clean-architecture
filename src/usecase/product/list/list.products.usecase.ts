import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import { OutputListProductsDto } from "./list.products.dto"

export class ListProductUseCase {
    constructor(private readonly productRepository: ProductRepositoryInterface){}

    async execute(): Promise<OutputListProductsDto> {
        const productsOrError =  await this.productRepository.findAll()
        const productsAdapted =  productsOrError.map(product=>({
            name: product.name,
            id: product.id,
            price: product.price
        }))
        return {
            products: productsAdapted
        }
    }
}