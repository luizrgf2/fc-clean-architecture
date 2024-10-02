import Product from "../../../domain/product/entity/product";
import { FindProductUseCase } from "./find.product.usecase";



describe('Unit tests to find product', ()=>{

    const product = new Product('123','Pão', 123)

    const MockRepository = () => {
        return {
          find: jest.fn().mockReturnValue(Promise.resolve(product)),
          findAll: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
        };
    };

    it('should find a valid product by id', async ()=>{
        const productRepository = MockRepository();
        const productCreateUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: '123'
        }

        const output = {
            id: '123',
            name: 'Pão',
            price: 123,
        }

        const result = await productCreateUseCase.execute(input)

        expect(result).toEqual(output)
    })

    it('should not find a product', async ()=>{
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(()=>{
            throw new Error('Product not found')
        })
        const productCreateUseCase = new FindProductUseCase(productRepository);


        const input = {
            id: '123'
        }

        expect(()=> productCreateUseCase.execute(input)).rejects.toThrow('Product not found')
    })

})