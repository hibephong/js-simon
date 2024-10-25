import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from '../data/cart.js';
// import '../data/backend-practice.js';

async function loadPage() {
   try {
      await Promise.all([loadProductsFetch(), loadCartFetch()])
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();

   } catch (error) {
      console.log(error);
   }


} loadPage();
/*
Promise.all([
   loadProductsFetch(),
   new Promise((resolve) => {
      loadCart(resolve);
   })
]).then(() => {
   renderCheckoutHeader();
   renderOrderSummary();
   renderPaymentSummary();
});

loadProducts(() => {
   renderCheckoutHeader();
   renderOrderSummary();
   renderPaymentSummary();
})
*/
