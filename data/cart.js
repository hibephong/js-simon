import { getDeliveryOption } from '../../data/deliveryOptions.js';
export class Cart {
   cart;
   #localStorageKey;
   constructor(parameter) {
      this.#localStorageKey = parameter;
      this.reloadCart();
   }
   reloadCart() {
      this.cart = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
   }
   saveToStorage() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cart));
   }
   addToCart(productId, defaultQuantity = false) {
      let matchingItem = this.cart.find(cartItem => productId === cartItem.productId), quantity_selected = 1;
      if (!defaultQuantity)
         quantity_selected = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

      if (matchingItem) {
         matchingItem.quantity += quantity_selected;
      } else {
         this.cart.push({
            productId,
            quantity: quantity_selected,
            deliveryOptionId: '1'
         });
      }
      this.saveToStorage();
   }
   removeFromCart(productId) {
      const updatedCart = this.cart.filter(cartItem => cartItem.productId !== productId);
      this.cart.length = 0;
      this.cart.push(...updatedCart);
      this.saveToStorage();
   }
   updateCartQuantity(className) {
      const cartQuantity = this.cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
      if (className)
         document.querySelector(`${className}`).innerHTML = cartQuantity;
   }
   updateProductQuantity(productId, quantity) {
      const item = this.cart.find(cartItem => productId === cartItem.productId);
      if (item) {
         item.quantity = quantity;
         this.saveToStorage();
      }
   }
   updateDeliveryOption(productId, deliveryOptionId) {
      const matchingItem = this.cart.find(cartItem => cartItem.productId === productId);

      if (matchingItem && getDeliveryOption(deliveryOptionId)) {
         matchingItem.deliveryOptionId = deliveryOptionId;
         this.saveToStorage();
      }
      else
         return;
   }
}
export let Regular = new Cart('regular');

export async function loadCartFetch() {
   let response = await fetch('https://supersimplebackend.dev/cart');
   let data = await response.text();
   console.log (data);
}