import { defineStore } from "pinia";

export const useStore = defineStore('store', {
  state: () => ({
    products: [],
    shoppingcart: [],
    selectedCategory: null,
    orders: [],
    openMenu: false,
  }),

  getters: {
    getProductById: (state) => {
      return (id) => state.products.find((product) => product.id === Number(id));
    },
    getCategories: (state) => {
      const categories = state.products.map(product => product.category);
      return [...new Set(categories)];
    },
    filteredProducts: (state) => {
      if (!state.selectedCategory) return state.products;
      return state.products.filter(
        (product) => product.category === state.selectedCategory
      );
    },
    getOrderById: (state) => {
      return (id) => state.orders.find((order) => order.id === id);
    },
  },

  actions: {
    async fetchProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      this.products = data;
    },

    async fetchOrders() {
      const { $directus, $readItems } = useNuxtApp();
      try {
        const orders = await $directus.request(
          $readItems('orders', {
            fields: ['*'],
            sort: ['-timestamp'],
          })
        );
        this.orders = orders;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    
    addToCart(cart) {
      const product = this.getProductById(cart.id);
      
      const existingItem = this.shoppingcart.find(item => item.id === cart.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const productWithQuantity = { ...product, quantity: 1 };
        this.shoppingcart.push(productWithQuantity);
      }
    },

    removeFromCart(id) {
      this.shoppingcart = this.shoppingcart.filter(cart => cart.id !== id);
    },

    increaseQuantity(id) {
      const item = this.shoppingcart.find(cartItem => cartItem.id === id);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity(id) {
      const item = this.shoppingcart.find(cartItem => cartItem.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          this.removeFromCart(id);
        }
      }
    },

    emptyCart() {
      this.shoppingcart = [];
    }
  }
});
