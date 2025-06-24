import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as any[],
  }),

  actions: {
    addToCart(product: any) {
      const exists = this.items.find((item) => item.id === product.id);
      if (exists) {
        exists.quantity = (exists.quantity || 1) + 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },

    increaseQuantity(productId: number) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
      }
    },

    decreaseQuantity(productId: number) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          this.removeFromCart(productId); // ถ้าเหลือ 1 แล้วลด -> ลบเลย
        }
      }
    },

    removeFromCart(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId);
    },

    clearCart() {
      this.items = [];
    },
  },

  getters: {
    total: (state) =>
      state.items
        .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
        .toFixed(2),

    itemCount: (state) =>
      state.items.reduce((sum, item) => sum + (item.quantity || 1), 0),
  },
});
