import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { orders } from '../data/orders.js';
import { loadProductsFetch, products } from '../data/products.js';
import { calculateDeliveryDate } from '../data/deliveryOptions.js';
import { Regular } from '../data/cart.js';
import { searchBarLogic } from './checkout/checkoutHeader.js';
async function renderTrackingPage() {

  const url = new URL(window.location.href);
  let orderId = url.searchParams.get('orderId');
  let productId = url.searchParams.get('productId');
  await loadProductsFetch();
  let order = orders.find(order => orderId === order.id);
  let deliveryInfo = order.products.find(product => productId === product.productId);
  let product = products.find(product => productId === product.id);
  // console.log(deliveryInfo);
  let deliveryDay = dayjs(deliveryInfo.estimatedDeliveryTime).diff(dayjs(order.orderTime), 'day');
  let dateWithoutWeekends = calculateDeliveryDate(0, dayjs(order.orderTime), deliveryDay, 'returndeliveryDate');
  let dayWithoutWeekends = dateWithoutWeekends.diff(dayjs(order.orderTime), 'day');
  let dayPassed  = dayjs().add(0,'day').diff(dayjs(order.orderTime), 'day');
  let progress = Math.round(dayPassed / dayWithoutWeekends * 100)
  console.log (dayPassed, dayWithoutWeekends, progress)
  let status = progress === 100 ? 'Delivered' : 'Arriving';
  document.querySelector('.order-tracking').innerHTML = `
  <a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
  </a>

  <div class="delivery-date">
    ${status} on ${calculateDeliveryDate(0, dayjs(order.orderTime), deliveryDay)}
  </div>

  <div class="product-info">
    ${product.name}
  </div>

  <div class="product-info">
    Quantity: ${deliveryInfo.quantity}
  </div>

  <img class="product-image" src="${product.image}">

  <div class="progress-labels-container">
    <div class="progress-label js-progress-label-1 ${progress <= 49 ? 'current-status' : ''}">
      Preparing
    </div>
    <div class="progress-label js-progress-label-2 ${progress <= 99 && progress >= 50 ? 'current-status' : ''}">
      Shipped
    </div>
    <div class="progress-label js-progress-label-3 ${progress === 100 ? 'current-status' : ''}">
      Delivered
    </div>
  </div>

  <div class="progress-bar-container">
    <div class="progress-bar" style="width:${progress}%"></div>
  </div>`;
  Regular.updateCartQuantity('.cart-quantity');
  searchBarLogic();
} renderTrackingPage();
