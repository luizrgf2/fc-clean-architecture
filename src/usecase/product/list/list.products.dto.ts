
interface ProductList {
    id: string;
    name: string;
    price: number;
}

export interface OutputListProductsDto {
    products: ProductList[]
}