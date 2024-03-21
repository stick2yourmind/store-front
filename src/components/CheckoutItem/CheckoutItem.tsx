'use client';

import useCartStore from '@/store/cart.store';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { brunoAceSc } from '@/lib/fonts';
import { FADE_DOWN_VARIANT, ZOOM_50_IN } from '@/lib/framer-variant';
import useCheckoutItem from '@/components/CheckoutItem/useCheckoutItem';

export interface ICheckoutItemProps extends IProduct {
  quantity: number;
}

function CheckoutItem({ description, id, image, name, price, quantity }: ICheckoutItemProps) {
  const { localePrice, localeSubtotal } = useCheckoutItem({ price, quantity });

  const increaseProduct = useCartStore((state) => state.increaseProduct);
  const decreaseProduct = useCartStore((state) => state.decreaseProduct);
  return (
    <motion.article
      key={id}
      variants={ZOOM_50_IN}
      initial="hidden"
      animate="enter"
      exit="hidden"
      className="flex w-full gap-4"
    >
      <Image src={image} width={250} height={250} alt={name} className="basis-2/6 sm:basis-1/4" />
      <div className="flex basis-4/6 flex-col gap-1 sm:basis-3/4">
        <h3 className={`${brunoAceSc.className} mb-3 text-xl`}>{name}</h3>
        <span className="text-sm text-slate-600">{description}</span>
        <div className="flex gap-1">
          <span>{localePrice}</span>
          <span>x</span>
          <span>{quantity}</span>
        </div>
        <span className="font-bold text-[color:#14b8a6]">Subtotal: {localeSubtotal}</span>
        <div className="flex items-center justify-center gap-4 self-start pb-4">
          <button
            className="transition-colors hover:text-amber-500"
            onClick={() => {
              decreaseProduct(id);
              toast.info(`${name} quantity updated`);
            }}
          >
            <IoMdRemoveCircleOutline className="text-3xl" />
          </button>
          <motion.span variants={FADE_DOWN_VARIANT} initial="hidden" animate="enter" key={quantity}>
            {quantity}
          </motion.span>
          <button
            className="transition-colors hover:text-[color:#14b8a6]"
            onClick={() => {
              increaseProduct(id);
              toast.success(`${name} quantity was increased`);
            }}
          >
            <IoMdAddCircleOutline className="text-3xl" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function CheckoutItemSkeleton() {
  return (
    <div className="flex w-full animate-pulse gap-4">
      <div className="h-[250px] w-[250px] basis-2/6 bg-gray-300 object-fill sm:basis-1/4"></div>
      <div className="flex w-full basis-4/6 flex-col gap-1 sm:basis-3/4">
        <h3 className="mb-3 bg-gray-300 text-xl text-transparent">&quot;&quot;</h3>
        <span className="bg-gray-300 text-sm text-transparent">description</span>
        <div className="flex gap-1">
          <span className="bg-gray-300 text-transparent">localePrice</span>
          <span className="bg-gray-300 text-transparent">x</span>
          <span className="bg-gray-300 text-transparent">quantity</span>
        </div>
        <span className="bg-gray-300 text-transparent">Subtotal: localeSubtotal</span>
        <div className="flex items-center justify-center gap-4 self-start p-4">
          <button className="rounded-full bg-gray-300 text-transparent">&quot;&quot;&quot;&quot;</button>
          <div className="rounded-full bg-gray-300 text-transparent">quantity</div>
          <button className="rounded-full bg-gray-300 text-transparent">&quot;&quot;&quot;&quot;</button>
        </div>
      </div>
    </div>
  );
}

export default dynamic(async () => CheckoutItem, { ssr: false, loading: CheckoutItemSkeleton });
