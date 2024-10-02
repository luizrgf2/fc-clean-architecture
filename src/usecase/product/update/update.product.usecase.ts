import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto"

export class UpdateProductUseCase {
    constructor(private readonly productRepository: ProductRepositoryInterface) {}

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const productOrError = await this.productRepository.find(input.id)
        productOrError.changeName(input.name)
        productOrError.changePrice(input.price)

        await this.productRepository.update(productOrError)
        return {
            id: productOrError.id,
            name: productOrError.name,
            price: productOrError.price
        }
    }
}