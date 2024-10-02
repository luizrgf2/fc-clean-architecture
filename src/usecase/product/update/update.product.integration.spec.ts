import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import { UpdateProductUseCase } from "./update.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";



describe('Integration tests to update product', ()=>{

    const product = new Product('123', 'Pão', 123)

    const input = {
        id: product.id,
        name: "Pão Updated",
        price: 127
    };

    let sequelize: Sequelize;
    const productRepository = new ProductRepository()
    

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

    it("should update valid product", async ()=>{
        await productRepository.create(product)
        const updateProductUseCase = new UpdateProductUseCase(productRepository)
        const result = await updateProductUseCase.execute(input)
        expect(result).toEqual(input)
    })

    it("should update product not found", async ()=>{
        const updateProductUseCase = new UpdateProductUseCase(productRepository)
        expect(()=>updateProductUseCase.execute(input)).rejects.toThrow('Product not found')
    })

})