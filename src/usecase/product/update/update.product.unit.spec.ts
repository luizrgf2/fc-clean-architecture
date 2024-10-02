import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

class UpdateProductUseCase {
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

describe('Unit tests to update product', ()=>{

    const product = new Product('123', 'Pão', 123)

    const input = {
        id: product.id,
        name: "Pão Updated",
        price: 127
    };

    const MockRepository = () => {
        return {
          create: jest.fn(),
          find: jest.fn().mockReturnValue(product),
          update: jest.fn(),
          findAll: jest.fn(),
        };
    };

    it("should update valid product", async ()=>{
        const productRepository= MockRepository()
        const updateProductUseCase = new UpdateProductUseCase(productRepository)

        const result = await updateProductUseCase.execute(input)
        expect(result).toEqual(input)
    })

    it("should update product not found", async ()=>{
        const productRepository= MockRepository()
        productRepository.find.mockImplementation(()=> {
            throw new Error('Product not found')
        })
        const updateProductUseCase = new UpdateProductUseCase(productRepository)

        expect(()=>updateProductUseCase.execute(input)).rejects.toThrow('Product not found')
    })

})