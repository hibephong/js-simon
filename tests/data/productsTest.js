import { Product, Clothing, Appliance } from '../../data/products.js';

describe('Product_class', () => {
   let The_product;
   beforeEach(() => {
      The_product = new Product({
         id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
         image: "images/products/knit-athletic-sneakers-gray.jpg",
         name: "Waterproof Knit Athletic Sneakers - Gray",
         rating: {
            stars: 4,
            count: 89
         },
         priceCents: 3390,
         keywords: [
            "shoes",
            "running shoes",
            "footwear"
         ]
      });
   });
   it('Has the correct ID', () => {
      expect(The_product.id).toEqual('58b4fc92-e98c-42aa-8c55-b6b79996769a');
   });
   it('Get the star url', () => {
      expect(The_product.getStarUrl()).toContain('rating-40');
   });
   it('Get the price', () => {
      expect(The_product.getPrice()).toEqual('$33.90');
   });
   it('Empty extra info', () => {
      expect(The_product.extraInfoHTML()).toEqual('');
   });
});

describe('Clothing_class', () => {
   let The_clothing;
   beforeEach(() => {
      The_clothing = new Clothing({
         id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
         image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
         name: "Adults Plain Cotton T-Shirt - 2 Pack",
         rating: {
            stars: 4.5,
            count: 56
         },
         priceCents: 799,
         keywords: [
            "tshirts",
            "apparel",
            "mens"
         ],
         type: "clothing",
         sizeChartLink: "images/clothing-size-chart.png"
      });
   });
   it('Has the correct ID', () => {
      expect(The_clothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
   });
   it('Get the star url', () => {
      expect(The_clothing.getStarUrl()).toContain('rating-45');
   });
   it('Get the price', () => {
      expect(The_clothing.getPrice()).toEqual('$7.99');
   });
   it('Has a sizeChartLink in extra info', () => {
      expect(The_clothing.extraInfoHTML()).toContain('clothing-size-chart.png');
   });
});

describe('Appliance_class', () => {
   let The_appliance;
   beforeEach(() => {
      The_appliance = new Appliance({
         id: "54e0eccd-8f36-462b-b68a-8182611d9add",
         image: "images/products/black-2-slot-toaster.jpg",
         name: "2 Slot Toaster - Black",
         rating: {
            stars: 5,
            count: 2197
         },
         priceCents: 1899,
         keywords: [
            "toaster",
            "kitchen",
            "appliances"
         ],
         type: "appliance",
         instructionsLink: "images/appliance-instructions.png",
         warrantyLink: "images/appliance-warranty.png"
      })
   });
   it('Has the correct ID', () => {
      expect(The_appliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
   });
   it('Get the star url', () => {
      expect(The_appliance.getStarUrl()).toContain('rating-50');
   });
   it('Get the price', () => {
      expect(The_appliance.getPrice()).toEqual('$18.99');
   });
   it('Has a instructionsLink in extra info', () => {
      expect(The_appliance.extraInfoHTML()).toContain('appliance-instructions.png');
   });
   it('Has a warrantyLink in extra info', () => {
      expect(The_appliance.extraInfoHTML()).toContain('appliance-warranty.png');
   })
});