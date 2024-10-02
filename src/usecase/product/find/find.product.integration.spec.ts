import { Sequelize } from "sequelize-typescript";
import { FindProductUseCase } from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";



describe('Unit tests to find product', ()=>{

    let sequelize: Sequelize;


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

    it('should find a valid product by id', async ()=>{
        const productRepository = new  ProductRepository();
        const productCreateUseCase = new FindProductUseCase(productRepository);

        await productRepository.create(new Product('123', 'Pão', 123))

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
        const productRepository = new  ProductRepository();

        const productCreateUseCase = new FindProductUseCase(productRepository);


        const input = {
            id: '123'
        }

        expect(()=> productCreateUseCase.execute(input)).rejects.toThrow('Product not found')
    })

})