import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto"

export class FindProductUseCase {
    constructor(private readonly  productRepository: ProductRepositoryInterface) {}

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const productOrError = await this.productRepository.find(input.id)
        return {
            id: productOrError.id,
            name: productOrError.name,
            price: productOrError.price
        }
    }
}