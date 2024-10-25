import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { orders } from '../data/orders.js';
import { formatCurrency } from './utils/money.js';
import { loadProductsFetch, products } from '../data/products.js';
import { Regular } from '../data/cart.js';
import { calculateDeliveryDate } from '../data/deliveryOptions.js';
import { searchBarLogic } from './checkout/checkoutHeader.js';
// console.log(orders);

async function renderOrders() {
  await loadProductsFetch();
  let orderHTML = '';
  orders.forEach(order => {
    // console.log(order)
    orderHTML += `
      <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dayjs(order.date).format('MMMM D')}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${renderProducts(order.products, order.id, order.orderTime)}
        </div>
      </div>`;
  });
  document.querySelector('.orders-grid').innerHTML = orderHTML;
  Regular.updateCartQuantity('.cart-quantity');
  buy_again_logic();
  searchBarLogic()
} renderOrders();


function renderProducts(The_products, orderId, orderTime) {
  let productHTML = '', match;
  
  The_products.forEach(The_product => {
    products.forEach(product => {
      if (product.id === The_product.productId) {
        match = product;
        return;
      }
    });
  let deliveryDate = dayjs(The_product.estimatedDeliveryTime).diff(dayjs(orderTime), 'day');
    productHTML += `
  <div class="product-image-container">
    <img src="${match.image}">
  </div>

  <div class="product-details">
    <div class="product-name">
      ${match.name}
    </div>
    <div class="product-delivery-date">
       Arriving on: ${calculateDeliveryDate(0, dayjs(orderTime), deliveryDate, 'MMMM D')}
    </div>
    <div class="product-quantity">
      Quantity: ${The_product.quantity}
    </div>
    <button class="buy-again-button button-primary" data-id="${The_product.productId}">
      <img class="buy-again-icon" src="images/icons/buy-again.png">
      <span class="buy-again-message">Buy it again</span>
    </button>
  </div>

  <div class="product-actions">
    <a href="tracking.html?orderId=${orderId}&productId=${The_product.productId}">
      <button class="track-package-button button-secondary">
        Track package
      </button>
    </a>
  </div>
`;
  })
  return productHTML;
}
function buy_again_logic() {
  document.querySelectorAll('.buy-again-button').forEach(button => {
    button.addEventListener('click', () => {

      let productId = button.dataset.id;
      Regular.addToCart(productId, true);
      Regular.updateCartQuantity('.cart-quantity');
      button.innerHTML = `<img style="width:20px; margin-right: 5px" src="images/icons/checkmark.png">Added`
      setTimeout(() => {
        button.innerHTML =
          `<img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>`;
      }, 1000)
    })
  })
}

