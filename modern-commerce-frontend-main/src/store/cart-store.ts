import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '~/hooks/use-products';

type CartProduct = Product & {
  quantity: number;
};

type State = {
  products: CartProduct[];
  totalProducts: number;
  totalPrice: number;
};

type Actions = {
  addProducts: (product: Product, quantity: number) => void;
  removeProducts: (product: Product) => void;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
  resetCart: () => void;
};
export const useCart = create<State & Actions>()(
  persist(
    (set) => ({
      products: [],
      totalProducts: 0,
      totalPrice: 0,
      addProducts: (product: Product, quantity: number) => {
        set((state) => {
          const found = state.products.find((item) => item.id === product.id);
          if (!found) {
            return {
              totalProducts: state.totalProducts + quantity,
              totalPrice: state.totalPrice + quantity * product.price,
              products: [...state.products, { ...product, quantity: quantity }],
            };
          }
          return {
            totalProducts: state.totalProducts + quantity,
            totalPrice: state.totalPrice + quantity * product.price,
            products: state.products.map((item) => {
              if (item.id === found.id) {
                item.quantity += quantity;
              }
              return item;
            }),
          };
        });
      },
      removeProducts: (product: Product) =>
        set((state) => {
          const quantityToBeSubtracted = state.products.find(
            (item) => item.id === product.id,
          )?.quantity;
          if (!quantityToBeSubtracted) return {};
          return {
            totalProducts: state.totalProducts - quantityToBeSubtracted,
            totalPrice: state.totalPrice - product.price * quantityToBeSubtracted!,
            products: state.products.filter((item) => item.id !== product.id),
          };
        }),
      increaseQuantity: (product: Product) =>
        set((state) => ({
          products: state.products.map((item) => {
            if (item.id === product.id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }
            return item;
          }),
          totalPrice: state.totalPrice + product.price,
          totalProducts: state.totalProducts + 1,
        })),
      decreaseQuantity: (product: Product) =>
        set((state) => {
          let flag = false;
          const updatedProducts = state.products.map((item) => {
            if (item.id === product.id) {
              if (item.quantity - 1 == 0) flag = true;
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
          if (flag)
            return {
              products: state.products.filter((item) => item.id !== product.id),
              totalPrice: state.totalPrice - product.price,
              totalProducts: state.totalProducts - 1,
            };
          else {
            return {
              products: updatedProducts,
              totalPrice: state.totalPrice - product.price,
              totalProducts: state.totalProducts - 1,
            };
          }
        }),
      resetCart: () => set({ products: [], totalProducts: 0, totalPrice: 0 }),
    }),
    {
      name: 'cart-storage',
    },
  ),
);
