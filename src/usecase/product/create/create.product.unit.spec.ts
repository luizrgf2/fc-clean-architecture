import CreateProductrUseCase from "./create.product.usecase";

const inputA = {
    name: "Placa de Video",
    price: 2000,
    type: 'a'
} ;

const inputB = {
    name: "Placa Mãe",
    price: 1000,
    type: 'b'
} ;

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductrUseCase(productRepository);

    const output = await productCreateUseCase.execute(inputA);

    expect(output).toEqual({
        id: expect.any(String),
        name: inputA.name,
        price: inputA.price
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
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
    const productRepository = MockRepository();
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
