import Product from "../../../domain/product/entity/product";
import { ListProductUseCase } from "./list.products.usecase";



describe('Unit tests to list products', ()=>{
    
    const product1 = new Product('1', 'Pão', 12)
    const product2 = new Product('2', 'Presunto', 125)

    const MockRepository = () => {
        return {
          create: jest.fn(),
          find: jest.fn(),
          update: jest.fn(),
          findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        };
    };
      
    it('shold return list of products', async ()=>{
        const productRepository = MockRepository()
        const listProductsUseCase = new ListProductUseCase(productRepository)
        const result = await listProductsUseCase.execute()

        const output1 = {
            id: '1',
            name: 'Pão',
            price: 12
        } 

        const output2 = {
            id: '2',
            name: 'Presunto',
            price: 125
        } 

        expect(result).toBeInstanceOf(Object)
        expect(result.products).not.toBeUndefined()
        expect(result.products).toHaveLength(2)
        expect(result.products[0]).toEqual(output1)
        expect(result.products[1]).toEqual(output2)
    })

})