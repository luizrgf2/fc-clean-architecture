import Product from "../../../domain/product/entity/product";
import { UpdateProductUseCase } from "./update.product.usecase";



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