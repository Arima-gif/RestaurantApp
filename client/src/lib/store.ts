import { create } from 'zustand';
import { MenuItem } from '@shared/schema';

export interface CartItem extends MenuItem {
  quantity: number;
  variation?: string;
  customization?: {
    toppings?: { [key: string]: number };
    flavour?: string;
    sauce?: string;
    crust?: string;
    instructions?: string;
  };
}

interface CartStore {
  items: CartItem[];
  lastAddedItem: MenuItem | null;
  isCartOpen: boolean;
  isServiceModalOpen: boolean;
  isAddToCartModalOpen: boolean;
  isPaymentModalOpen: boolean;
  isSplitBillModalOpen: boolean;
  isReviewModalOpen: boolean;
  isOrderConfirmationOpen: boolean;
  splitBillMode: 'equality' | 'items';
  addItem: (item: MenuItem, variation?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  setCartOpen: (open: boolean) => void;
  setServiceModalOpen: (open: boolean) => void;
  setAddToCartModalOpen: (open: boolean) => void;
  setPaymentModalOpen: (open: boolean) => void;
  setSplitBillModalOpen: (open: boolean) => void;
  setReviewModalOpen: (open: boolean) => void;
  setOrderConfirmationOpen: (open: boolean) => void;
  setSplitBillMode: (mode: 'equality' | 'items') => void;
  setLastAddedItem: (item: MenuItem | null) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  lastAddedItem: null,
  isCartOpen: false,
  isServiceModalOpen: false,
  isAddToCartModalOpen: false,
  isPaymentModalOpen: false,
  isSplitBillModalOpen: false,
  isReviewModalOpen: false,
  isOrderConfirmationOpen: false,
  splitBillMode: 'equality',
  
  addItem: (item: MenuItem, variation?: string) => {
    const existingItemIndex = get().items.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.variation === variation
    );
    
    if (existingItemIndex >= 0) {
      set((state) => ({
        items: state.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      }));
    } else {
      set((state) => ({
        items: [...state.items, { ...item, quantity: 1, variation }],
      }));
    }
  },
  
  removeItem: (itemId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },
  
  updateQuantity: (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getCartTotal: () => {
    return get().items.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0);
  },
  
  getCartCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
  
  setCartOpen: (open: boolean) => set({ isCartOpen: open }),
  setServiceModalOpen: (open: boolean) => set({ isServiceModalOpen: open }),
  setAddToCartModalOpen: (open: boolean) => set({ isAddToCartModalOpen: open }),
  setPaymentModalOpen: (open: boolean) => set({ isPaymentModalOpen: open }),
  setSplitBillModalOpen: (open: boolean) => set({ isSplitBillModalOpen: open }),
  setReviewModalOpen: (open: boolean) => set({ isReviewModalOpen: open }),
  setOrderConfirmationOpen: (open: boolean) => set({ isOrderConfirmationOpen: open }),
  setSplitBillMode: (mode: 'equality' | 'items') => set({ splitBillMode: mode }),
  setLastAddedItem: (item: MenuItem | null) => set({ lastAddedItem: item }),
}));
