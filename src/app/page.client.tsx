import CategoryFilter from '@/components/CategoryFilter/category-filter';
import Product from '@/components/Product/Product';

export interface ProductsProps {
  products: IProduct[];
  categories: ICategory[];
}

function ProductsClient({ products, categories }: ProductsProps) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <CategoryFilter categories={categories} />
      <section className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:justify-items-stretch md:grid-cols-3 xl:grid-cols-4">
        {products.map(({ id, description, image, name, price }, i) => (
          <Product
            key={id}
            image={image}
            name={name}
            price={price}
            description={description}
            id={id}
            index={i}
          />
        ))}
      </section>
    </div>
  );
}
export default ProductsClient;
