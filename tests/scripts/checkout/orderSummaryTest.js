import { renderOrderSummary } from '../../../scripts/checkout/orderSummary.js';
import { Regular } from '../../../data/cart.js';
import { loadProductsFetch } from '../../../data/products.js';
describe('renderOrderSummary', () => {
   beforeAll(async () => {
      document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <a class="return-to-home-link" href="index.html"></a>`;
      await loadProductsFetch();
   });

   afterAll(() => {
      document.querySelector('.js-test-container').innerHTML = '';
   })

   let backpackId = '6e876374-1237-4603-a4a6-9fd329376d43',
       umbrellaId = '64393c3a-57c1-4ab4-a2d9-2b14fe00b1eb',
       cottonSocksId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
       basketballId = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

   beforeEach(() => {

      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.callFake(() => {
         return JSON.stringify([{
            productId: `${cottonSocksId}`,
            quantity: 2,
            deliveryOptionId: '1'
         }, {
            productId: `${basketballId}`,
            quantity: 3,
            deliveryOptionId: '2'
         }]);
      });
      // spyOn(updateCartQuantity, 'action');
      Regular.reloadCart();

      renderOrderSummary();
   });
   it('Displays the cart', () => {
      expect(document.querySelectorAll('.cart-item-container').length).toEqual(2);
      expect(document.querySelector(`.js-product-quantity-${cottonSocksId}`).innerText).toContain('Quantity: 2')
      expect(document.querySelector(`.js-product-quantity-${basketballId}`).innerText).toContain('Quantity: 3')
      expect(document.querySelector(`.js-product-name-${cottonSocksId}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
      expect(document.querySelector(`.js-product-name-${basketballId}`).innerText).toEqual('Intermediate Size Basketball');
      expect(document.querySelector(`.js-product-price-${cottonSocksId}`).innerText).toEqual('$10.90');
      expect(document.querySelector(`.js-product-price-${basketballId}`).innerText).toEqual('$20.95');
   });

   it('Removes a product', () => {
      document.querySelector(`.js-delete-link-${cottonSocksId}`).click();
      expect(document.querySelectorAll(`.cart-item-container`).length).toEqual(1);
      expect(document.querySelector(`.js-cart-item-container-${cottonSocksId}`)).toEqual(null);
      expect(document.querySelector(`.js-cart-item-container-${basketballId}`)).not.toEqual(null);
      expect(Regular.cart.length).toEqual(1);
      expect(Regular.cart[0].productId).toEqual(`${basketballId}`);
      expect(document.querySelector(`.js-product-name-${basketballId}`).innerText).toContain('Basketball');
      expect(document.querySelector(`.js-product-price-${basketballId}`).innerText).toEqual('$20.95');
   });

   it('Change delivery option', () => {
      document.querySelector(`.js-delivery-option-${cottonSocksId}-${'3'}`).click();
      let The_input = document.querySelector(`.js-delivery-option-input-${cottonSocksId}-${'3'}`);

      expect(The_input.checked).toEqual(true);
      expect(Regular.cart.length).toEqual(2);
      expect(Regular.cart[0].deliveryOptionId).toEqual('3');
      expect(document.querySelector('.js-shipping').innerText).toEqual('$14.98');
      expect(document.querySelector('.js-total').innerText).toEqual('$109.59');
   });
})