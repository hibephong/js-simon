import { Regular } from '../../data/cart.js'

describe('addToCart', () => {
   beforeEach(() => {
      spyOn(localStorage, 'setItem');
   });

   it('Adds a new product to the cart', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => {
         return JSON.stringify([]);
      });
      spyOn(document, 'querySelector').and.callFake(() => {
         return { value: '2' };
      });
      Regular.reloadCart();
      Regular.addToCart('Product_01');
      expect(Regular.cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('regular', JSON.stringify([{
         productId: 'Product_01',
         quantity: 2,
         deliveryOptionId: '1'
      }]))
      expect(Regular.cart[0].productId).toEqual('Product_01');
      expect(Regular.cart[0].quantity).toEqual(2);
   });

   it('Adds an existing product to the cart', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => {
         return JSON.stringify([{
            productId: 'Product_01',
            quantity: 2,
            deliveryOptionId: '1'
         }]);
      });
      spyOn(document, 'querySelector').and.callFake(() => {
         return { value: '1' };
      });
      Regular.reloadCart();
      Regular.addToCart('Product_01');
      expect(Regular.cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('regular', JSON.stringify([{
         productId: 'Product_01',
         quantity: 3,
         deliveryOptionId: '1'
      }]))
      expect(Regular.cart[0].productId).toEqual('Product_01');
      expect(Regular.cart[0].quantity).toEqual(3);
   });
});

describe('removeFromCart', () => {
   let plateId = '3ebe75dc-64d2-4137-8860-1f5a963e534b',
      toasterId = '54e0eccd-8f36-462b-b68a-8182611d9add',
      sneakersId = '58b4fc92-e98c-42aa-8c55-b6b79996769a';

   beforeEach(() => {
      spyOn(localStorage, 'getItem').and.callFake(() => {
         return JSON.stringify([{
            productId: plateId,
            quantity: 4,
            deliveryOptionId: '2'
         }, {
            productId: toasterId,
            quantity: 3,
            deliveryOptionId: '3'
         }]);
      });
      Regular.reloadCart();
      spyOn(localStorage, 'setItem');
   });

   afterEach(() => {
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   })

   it('Delete an existing product', () => {
      Regular.removeFromCart(plateId);
      expect(Regular.cart.length).toEqual(1);
      expect(Regular.cart[0].quantity).toEqual(3);
      expect(Regular.cart[0].productId).toEqual(toasterId);
      expect(Regular.cart[0].deliveryOptionId).toEqual('3');
      expect(localStorage.setItem).toHaveBeenCalledWith('regular', JSON.stringify([{
         productId: toasterId,
         quantity: 3,
         deliveryOptionId: '3'
      }]))
   })

   it('Delete a non-existent product', () => {
      Regular.removeFromCart(sneakersId);
      expect(Regular.cart.length).toEqual(2);
      expect(Regular.cart[0].quantity).toEqual(4);
      expect(Regular.cart[0].productId).toEqual(plateId);
      expect(Regular.cart[0].deliveryOptionId).toEqual('2');
      expect(Regular.cart[1].quantity).toEqual(3);
      expect(Regular.cart[1].productId).toEqual(toasterId);
      expect(Regular.cart[1].deliveryOptionId).toEqual('3');
      expect(localStorage.setItem).toHaveBeenCalledWith('regular', JSON.stringify([{
         productId: plateId,
         quantity: 4,
         deliveryOptionId: '2'
      }, {
         productId: toasterId,
         quantity: 3,
         deliveryOptionId: '3'
      }]))
   })
});

describe('updateDeliveryOption', () => {
   let plateId, toasterId, sneakersId;
   beforeAll(() => {
      plateId = '3ebe75dc-64d2-4137-8860-1f5a963e534b';
      toasterId = '54e0eccd-8f36-462b-b68a-8182611d9add';
      sneakersId = '58b4fc92-e98c-42aa-8c55-b6b79996769a';
   })

   beforeEach(() => {
      spyOn(localStorage, 'getItem').and.callFake(() => {
         return JSON.stringify([{
            productId: plateId,
            quantity: 4,
            deliveryOptionId: '2'
         }, {
            productId: toasterId,
            quantity: 3,
            deliveryOptionId: '3'
         }]);
      });
      Regular.reloadCart();
      spyOn(localStorage, 'setItem');
   });

   it('Change delivery option', () => {
      Regular.updateDeliveryOption(toasterId, '1');

      expect(Regular.cart[0].deliveryOptionId).toEqual('2');
      expect(Regular.cart.length).toEqual(2);
      expect(Regular.cart[0].quantity).toEqual(4);
      expect(Regular.cart[0].productId).toEqual(plateId);
      expect(Regular.cart[1].quantity).toEqual(3);
      expect(Regular.cart[1].productId).toEqual(toasterId);
      expect(Regular.cart[1].deliveryOptionId).toEqual('1');
      expect(localStorage.setItem).toHaveBeenCalledWith('regular', JSON.stringify([{
         productId: plateId,
         quantity: 4,
         deliveryOptionId: '2'
      }, {
         productId: toasterId,
         quantity: 3,
         deliveryOptionId: '1'
      }]))

   });

   it('_Gives a non-existing product', () => {
      Regular.updateDeliveryOption(sneakersId, '1');

      expect(Regular.cart.length).toEqual(2);
      expect(Regular.cart[0].quantity).toEqual(4);
      expect(Regular.cart[0].productId).toEqual(plateId);
      expect(Regular.cart[0].deliveryOptionId).toEqual('2');
      expect(Regular.cart[1].quantity).toEqual(3);
      expect(Regular.cart[1].productId).toEqual(toasterId);
      expect(Regular.cart[1].deliveryOptionId).toEqual('3');
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
   });

   it('_Gives a non-existing delivery option', () => {
      Regular.updateDeliveryOption(plateId, '4');

      expect(Regular.cart.length).toEqual(2);
      expect(Regular.cart[0].quantity).toEqual(4);
      expect(Regular.cart[0].productId).toEqual(plateId);
      expect(Regular.cart[0].deliveryOptionId).toEqual('2');
      expect(Regular.cart[1].quantity).toEqual(3);
      expect(Regular.cart[1].productId).toEqual(toasterId);
      expect(Regular.cart[1].deliveryOptionId).toEqual('3');
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
   });
});