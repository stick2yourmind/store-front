import ProductsClient from '@/app/page.client';
import Pagination from '@/components/Pagination/Pagination';
import { PRODUCTS_PER_PAGE } from '@/config/pagination.config';

export interface IProductPageProps {
  searchParams: {
    page: string;
  };
}

async function Product({ searchParams: { page } }: IProductPageProps) {
  const pageNumber = Number.isNaN(Number(page)) ? 1 : Number(page);

  const offset = PRODUCTS_PER_PAGE * (pageNumber - 1);
  const limit = PRODUCTS_PER_PAGE;
  const searchParams = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?` + searchParams);
  const { products, total } = await data.json();
  return (
    <main className="flex min-w-full max-w-7xl flex-col gap-8">
      <ProductsClient products={products} />
      <Pagination currentPage={pageNumber} total={total} />
    </main>
  );
}
export default Product;
