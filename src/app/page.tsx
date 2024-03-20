import ProductsClient from '@/app/page.client';
import Pagination from '@/components/Pagination/Pagination';
import { PRODUCTS_PER_PAGE } from '@/config/pagination.config';

export interface IProductPageProps {
  searchParams: {
    page?: string;
    category?: string;
  };
}

async function Product({ searchParams: { page, category } }: IProductPageProps) {
  const pageNumber = Number.isNaN(Number(page)) ? 1 : Number(page);

  const offset = PRODUCTS_PER_PAGE * (pageNumber - 1);
  const limit = PRODUCTS_PER_PAGE;
  const searchParams = {
    offset: offset.toString(),
    limit: limit.toString(),
    category,
  };
  if (!searchParams.category) delete searchParams.category;
  const urlSearchParams = new URLSearchParams(searchParams as Record<string, string>);

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?` + urlSearchParams);
  const { products, total } = await data.json();
  const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);
  const { categories } = await categoryResponse.json();
  return (
    <main className="flex min-w-full max-w-7xl flex-1 flex-col gap-8">
      <ProductsClient products={products || []} categories={categories || []} />
      <Pagination currentPage={pageNumber} total={total} category={category} />
    </main>
  );
}
export default Product;
