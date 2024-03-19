import { FetchApi } from './fetch-service';

export interface Product {
  createdAt: string;
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
  updatedAt: string;
}

const fetchApi = new FetchApi(process.env.NEXT_PUBLIC_API_URL || '');

class ProductService {
  async getProducts() {
    return await fetchApi.get<Product[]>({
      pathname: '/product',
      params: {
        offset: 24,
        limit: 12,
      },
    });
  }
}

export const productService = new ProductService();
