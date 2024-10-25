import { Regular } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { searchBarLogic } from './checkout/checkoutHeader.js';
loadProducts(renderProductsGrid);
function renderProductsGrid() {
  console.log ('renderProductsGrid');
  let productRelate = productFilter() || products;
  let productsHTML = '';
  productRelate.forEach((product) => {
    // console.log(product.name, product.keywords);
    productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      ${product.extraInfoHTML()}
      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-sign-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
  });
  document.querySelector('.js-products-grid').innerHTML = productsHTML || '<h2>Nothing.</h2>';

  Regular.updateCartQuantity('.js-cart-quantity');

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      let wait2seconds;
      button.addEventListener('click', () => {
        const { productId } = button.dataset;
        Regular.addToCart(productId);
        Regular.updateCartQuantity('.js-cart-quantity');
        let added_sign = document.querySelector(`.js-added-sign-${productId}`);
        added_sign.classList.add('show-opacity');
        if (wait2seconds) {
          clearTimeout(wait2seconds);
          wait2seconds = false;
        }
        wait2seconds = setTimeout(() => {
          added_sign.classList.remove('show-opacity');
        }, 2000);
      });
    });
  searchBarLogic();
}

function productFilter() {
   let url = new URL(window.location.href);
   let search = url.searchParams.get('search');
  if (!search)
    return;
  let productsRelate = [];
  // productsRelate = products.filter(product => {product.name.toLowerCase().includes(search.toLowerCase())});
  products.forEach(product => {
    if (product.name.toLowerCase().includes(search.toLowerCase()))
      productsRelate.push(product);
    else if (product.keywords.filter(keyword => keyword.toLowerCase().includes(search.toLowerCase())).length !==0)
      productsRelate.push(product);
  })
  // console.log (productsRelate[0].keywords)
  return productsRelate;
}