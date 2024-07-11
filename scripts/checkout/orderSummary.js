
import { cart, removeFromCart } from "../../data/cart.js";
import {getProduct} from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrecy } from "../utils/money.js";
export function renderOrderSummary() {
  let cartSummaryHTML="";
  cart.forEach((cartItem)=>{
      const productId = cartItem.productId;
      const matchingProduct = getProduct(productId);

      const today = dayjs();
      const deliveryDate = today;
      const dateString = deliveryDate.format("dddd,MMMM D");

      cartSummaryHTML += `<div class="cart-item-container">
                <div class="delivery-date">
                  Delivery date: Tuesday, June 21
                </div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">
    
                  <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                      $${(matchingProduct.priceCents/100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary"
                      data-product-id = "${matchingProduct.id}">
                        Delete
                      </span>
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionHTML(matchingProduct,cartItem)}
                  </div>
                </div>
              </div>
            `;
  })

  function deliveryOptionHTML(matchingProduct,cartItem) {
    let html="";
    deliveryOptions.forEach((deliveryOption) => {

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays,"days");
        const dateString = deliveryDate.format("dddd, MMMM D");

        const priceString = deliveryOption.priceCents === 0 ? "FREE" : `$${formatCurrecy(deliveryOption.priceCents)}`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html+=`<div class="delivery-option"
      >
                      <input type="radio" ${isChecked ? "checked" : ""}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${dateString}
                        </div>
                        <div class="delivery-option-price">
                          ${priceString} Shipping
                        </div>
                      </div>
                    </div>`
    });
    
    return html;
  }

  document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

  let cartQuantity = 0;

    cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;
    })
 
  document.querySelector('.return-to-home-link').innerHTML =`${cartQuantity} items`;

  document.querySelectorAll('.delete-quantity-link').forEach((link)=>{
    link.addEventListener('click' , () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderOrderSummary();
    })
  })
}
renderOrderSummary();