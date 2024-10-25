import { getDeliveryOption } from '../../data/deliveryOptions.js';

export let cart;
reloadCart();
export function reloadCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  const matchingItem = cart.find(cartItem => productId === cartItem.productId);
  const quantity_selected = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

  if (matchingItem) {
    matchingItem.quantity += quantity_selected;
  } else {
    cart.push({
      productId,
      quantity: quantity_selected,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const updatedCart = cart.filter(cartItem => cartItem.productId !== productId);
  cart.length = 0;
  cart.push(...updatedCart);
  saveToStorage();
}

export let updateCartQuantity = {
  action: function (className) {
    const cartQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);

    if (className)
      document.querySelector(`${className}`).innerHTML = cartQuantity;
  }
}

export function updateProductQuantity(productId, quantity) {
  const item = cart.find(cartItem => productId === cartItem.productId);
  if (item) {
    item.quantity = quantity;
    saveToStorage();
  }
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const matchingItem = cart.find(cartItem => cartItem.productId === productId);

  if (matchingItem && getDeliveryOption(deliveryOptionId)) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
  else
    return;
}