import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

export interface IProductCart extends IProduct {
  quantity: number;
}
interface CartState {
  cart: IProductCart[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: number) => void;
  increaseProduct: (id: number) => void;
  decreaseProduct: (id: number) => void;
  resetCart: () => void;
}

const initialCart: IProductCart[] = [];

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: initialCart,
        addToCart: (product: IProduct) => {
          const { cart } = get();
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        },
        removeFromCart: (id: number) => {
          const { cart } = get();
          set({ cart: cart.filter((addedProduct) => addedProduct.id !== id) });
        },
        increaseProduct: (id: number) => {
          const { cart } = get();
          set({
            cart: cart.map((addedProduct) => {
              if (addedProduct.id !== id) return addedProduct;
              return { ...addedProduct, quantity: addedProduct.quantity + 1 };
            }),
          });
        },
        decreaseProduct: (id: number) => {
          const { cart } = get();
          const productToMutate = cart.find((addedProduct) => addedProduct.id === id);

          // invalid decrease product operation
          if (!productToMutate) {
            set({ cart: initialCart });
            return;
          }

          const otherProducts = cart.map((addedProduct) => {
            if (addedProduct.id !== id) {
              return addedProduct;
            }

            addedProduct.quantity = addedProduct.quantity - 1;
            return addedProduct;
          });

          const validProducts = otherProducts.filter((product) => product.quantity > 0);

          set({ cart: validProducts });
        },
        resetCart: () => {
          set({ cart: initialCart });
        },
      }),
      { name: 'cart-storage' },
    ),
  ),
);

export default useCartStore;
