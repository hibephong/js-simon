import { Regular } from '../../data/cart.js';
import { products } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { calculateDeliveryDate, deliveryOptions } from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';





export function renderOrderSummary() {
	Regular.updateCartQuantity('.return-to-home-link');
	let cartSummaryHTML = '';
	Regular.cart.forEach(cartItem => {
		let matchingProduct;
		products.forEach(product => {

			if (product.id === cartItem.productId)
				matchingProduct = product;
		});

		let The_option;
		let deliveryOptionId = cartItem.deliveryOptionId;
		deliveryOptions.forEach(deliveryOption => {
			if (deliveryOption.id === cartItem.deliveryOptionId)
				The_option = deliveryOption;
		});

		let dateString = calculateDeliveryDate(The_option);

		cartSummaryHTML +=

			`
		<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
			<div class="delivery-date">
				Delivery date: ${dateString}
			</div>

			<div class="cart-item-details-grid">
				<img class="product-image"
					src="${matchingProduct.image}">

				<div class="cart-item-details">
					<div class="product-name js-product-name-${matchingProduct.id}">
						${matchingProduct.name}
					</div>
					<div class="product-price js-product-price-${matchingProduct.id}">
						${matchingProduct.getPrice()}
					</div>
					<div class="product-quantity js-product-quantity-${matchingProduct.id}">
						<span>
							Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
						</span>
						<span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
							Update
						</span>
						<input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}">
						<span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
						<span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
							Delete
						</span>
					</div>
				</div>

				<div class="delivery-options">
					<div class="delivery-options-title">
					Choose a delivery option:
					</div>
					${deliveryOptionsHTML(matchingProduct, cartItem)}
				</div>
			</div>
      </div>
			`;
	});

	const orderSummary = document.querySelector('.js-order-summary');
	if (orderSummary) {
		orderSummary.innerHTML = cartSummaryHTML;
	}

	setupEventListeners();
}

function deliveryOptionsHTML(matchingProduct, cartItem) {
	let html = '';
	deliveryOptions.forEach(deliveryOption => {
		let dateString = calculateDeliveryDate(deliveryOption);
		let priceString = deliveryOption.priceCents === 0 ? 'FREE' :
			`$${formatCurrency(deliveryOption.priceCents)} -`;
		let isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : '';
		html += `
      <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
         <input type="radio" ${isChecked} class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}" name="delivery-option-${matchingProduct.id}">
         <div>
            <div class="delivery-option-date">
               ${dateString}
            </div>
            <div class="delivery-option-price">
               ${priceString} Shipping
            </div>
         </div>
      </div>
      `;


	});
	// console.log (html);
	return html;
}

function setupEventListeners() {
	document.querySelectorAll('.js-delete-link').forEach(link => {
		link.addEventListener('click', () => {
			const productId = link.dataset.productId;
			Regular.removeFromCart(productId);
			const container = document.querySelector(`.js-cart-item-container-${productId}`);
			if (container) {
				container.remove();
			}
			Regular.updateCartQuantity('.return-to-home-link');
			renderPaymentSummary();
		});
	});

	document.querySelectorAll('.update-quantity-link').forEach(link => {
		link.addEventListener('click', () => {
			let productId = link.dataset.productId;
			document.querySelector(`.js-product-quantity-${productId}`).classList.add('is-editing-quantity');
		});
	});

	document.querySelectorAll('.save-quantity-link').forEach(link => {
		link.addEventListener('click', () => {
			const productId = link.dataset.productId;
			const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
			const quantity = Number(quantityInput.value);

			if (quantity >= 1 && quantity < 1000) {
				Regular.updateProductQuantity(productId, quantity);
				Regular.updateCartQuantity('.return-to-home-link');
				document.querySelector(`.js-product-quantity-${productId}`).classList.remove('is-editing-quantity');
				quantityInput.value = '';
				document.querySelector(`.js-quantity-label-${productId}`).innerHTML = quantity;
				renderPaymentSummary();
			} else {
				alert('Số lượng phải lớn hơn 0 và nhỏ hơn 1000');
			}
		});
	});

	document.querySelectorAll('.js-delivery-option').forEach(element => {
		element.addEventListener('click', () => {
			let { productId, deliveryOptionId } = element.dataset;
			Regular.updateDeliveryOption(productId, deliveryOptionId);
			renderOrderSummary();
			renderPaymentSummary();
		});
	});
}

