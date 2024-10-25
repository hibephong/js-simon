export function renderCheckoutHeader () {
   let headerHTML;
   headerHTML = `
   <div class="header-content">
      <div class="checkout-header-left-section">
         <a href="index.html">
            <img class="amazon-logo" src="images/amazon-logo.png">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
         </a>
      </div>

      <div class="checkout-header-middle-section">
         Checkout (<a class="return-to-home-link"
         href="index.html"></a>)
      </div>

      <div class="checkout-header-right-section">
         <img src="images/icons/checkout-lock-icon.png">
      </div>
   </div>
   `;
   document.querySelector('.checkout-header').innerHTML = headerHTML;
}
export function searchBarLogic() {
   document.querySelector('.search-button').addEventListener('click', () => {
     // console.log ('clicked');
     let keyword = document.querySelector('.search-bar').value;
     window.location.href = `index.html?search=${keyword}`;
   });
   document.querySelector('.search-bar').addEventListener('keydown', (event) => {
      if (event.key === 'Enter')
         document.querySelector('.search-button').click();
   })
 }