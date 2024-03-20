import Product from '@/components/Product/Product';

export interface ProductsProps {
  products: IProduct[];
}

function ProductsClient({ products }: ProductsProps) {
  return (
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
  );
}
export default ProductsClient;
