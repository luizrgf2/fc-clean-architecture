import { Sequelize } from "sequelize-typescript";
import CreateProductrUseCase from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const inputA = {
    name: "Placa de Video",
    price: 2000,
    type: 'a'
} ;

describe("Integration test create product use case", () => {
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


  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductrUseCase(productRepository);

    const output = await productCreateUseCase.execute(inputA);

    expect(output).toEqual({
        id: expect.any(String),
        name: inputA.name,
        price: inputA.price
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductrUseCase(productRepository);

    const input = Object.create(inputA)    
    input.name = ''

    await expect(async ()=>{
        await productCreateUseCase.execute(input)
    }).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is smaller then 0", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductrUseCase(productRepository);
    
    const input = Object.create(inputA)    
    input.price = -1

    await expect(async ()=>{
        await productCreateUseCase.execute(input)
    }).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
