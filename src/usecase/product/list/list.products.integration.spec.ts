import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ListProductUseCase } from "./list.products.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";



describe('Integration tests to list products', ()=>{
    
    let sequelize: Sequelize;
    const productRepository = new ProductRepository()
    
    const product1 = new Product('1', 'Pão', 12)
    const product2 = new Product('2', 'Presunto', 125)


    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
    
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });
    it('shold return list of products', async ()=>{
        const listProductsUseCase = new ListProductUseCase(productRepository)

        await  productRepository.create(product1)
        await  productRepository.create(product2)
        
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