import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface WishlistStore {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      
      addToWishlist: (product: Product) => {
        const { wishlist } = get();
        const isAlreadyInWishlist = wishlist.some(item => item.id === product.id);
        
        if (!isAlreadyInWishlist) {
          set({ wishlist: [...wishlist, product] });
        }
      },
      
      removeFromWishlist: (productId: number) => {
        const { wishlist } = get();
        set({ wishlist: wishlist.filter(item => item.id !== productId) });
      },
      
      isInWishlist: (productId: number) => {
        const { wishlist } = get();
        return wishlist.some(item => item.id === productId);
      },
      
      clearWishlist: () => {
        set({ wishlist: [] });
      },
      
      getWishlistCount: () => {
        const { wishlist } = get();
        return wishlist.length;
      },
    }),
    {
      name: 'wishlist-storage', // unique name for localStorage key
    }
  )
);

