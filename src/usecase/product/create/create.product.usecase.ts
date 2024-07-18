import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductrUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  private async persistProduct(product: ProductInterface): Promise<void> {
    const productEntity = new Product(product.id, product.name, product.price);
    await this.productRepository.create(productEntity);
  }

  private handleReturn(product: ProductInterface): OutputCreateProductDto {
    return {
        id: product.id,
        name: product.name,
        price: product.price,
    }
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(input.type, input.name, input.price);
    await this.persistProduct(product)
    return this.handleReturn(product)
  }
}
