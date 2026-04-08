
declare module "my-types" {
  export interface Category {
    id: number;
    title: string;
  }

  export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    categoryId: number;
    category: Category;
  }

  export interface NewProductInput {
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    categoryId: number;
  }
}