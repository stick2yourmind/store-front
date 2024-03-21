'use client';

import Image from 'next/image';
import ProductCartButton from './ProductCartButton';
import { motion } from 'framer-motion';
import { SLIDE_IN_VARIANT } from '@/lib/framer-variant';
import dynamic from 'next/dynamic';

export interface IProductProps extends IProduct {
  index: number;
}

function Product({ image, name, price, id, description, index }: IProductProps) {
  const priceFormatted = price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return (
    <motion.article
      variants={SLIDE_IN_VARIANT}
      initial="hidden"
      animate="enter"
      transition={{ delay: index / 10 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.1, type: 'spreen' },
      }}
      className="flex flex-col rounded-md shadow transition-shadow hover:shadow-xl"
    >
      <div className="relative">
        <Image src={image} height={600} width={380} alt={name} className="w-80 sm:w-full" />

        <ProductCartButton id={id} name={name} description={description} image={image} price={price} />
      </div>

      <h3 className="p-2">{name}</h3>
      <span className="p-2 text-[color:#14b8a6]">{priceFormatted}</span>
    </motion.article>
  );
}

export function Skeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-md shadow">
      <div className="h-[400px] w-[380px] bg-gray-300 object-fill sm:w-full"></div>
      <div className="mx-2 mt-4 h-6 w-36 rounded-md bg-gray-300"></div>
      <div className="m-2 h-6 w-36 rounded-md bg-gray-300"></div>
    </div>
  );
}

export default dynamic(async () => Product, { ssr: false, loading: Skeleton });
