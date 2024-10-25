import { Regular } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
   let productPriceCents = 0, shippingPriceCents = 0;
   Regular.cart.forEach(cartItem => {
      let product = products.find(element => element.id === cartItem.productId);
      let deliveryOption = deliveryOptions.find(element => element.id === cartItem.deliveryOptionId);
      productPriceCents += product.priceCents * cartItem.quantity;
      shippingPriceCents += deliveryOption.priceCents;
   })
   let totalBeforeTaxCents = productPriceCents + shippingPriceCents;
   let taxCents = totalBeforeTaxCents * 0.1;
   let totalCents = totalBeforeTaxCents + taxCents;
   let paymentHTML = `
   <div class="payment-summary-title">
      Order Summary
   </div>

   <div class="payment-summary-row">
      <div>Items (${document.querySelector('.return-to-home-link').innerHTML}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
   </div>

   <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-shipping">$${formatCurrency(shippingPriceCents)}</div>
   </div>

   <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
   </div>

   <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
   </div>

   <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-total">$${formatCurrency(totalCents)}</div>
   </div>

   <button class="place-order-button button-primary js-place-order">
      Place your order
   </button>
   `
   document.querySelector('.js-payment-summary').innerHTML = paymentHTML;
   document.querySelector('.js-place-order').addEventListener('click', async () => {
      if (Regular.cart.length === 0) {
         window.location.href = 'orders.html';
         return;
      }
      try {
         const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               cart: Regular.cart
            })
         });
         const order = await response.json();
         addOrder(order);
         localStorage.removeItem('regular');
         window.location.href = 'orders.html';
      } catch (error) {
         console.log('Unexpected error. Please try again later.');
      }


   });
}