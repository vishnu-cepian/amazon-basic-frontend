
import { orderList, buyAgain } from "../data/orderList.js";
import { getProduct } from "../data/products.js";
import { formatCurrecy } from "./utils/money.js";

document.querySelector('.cart-quantity').innerHTML = 0;

function renderOrderList() {
    let html = '';
    orderList.forEach((order) => {

        const matchingProduct = getProduct(order.productId);

        html += ` <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order.currDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrecy(order.totalPriceCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.productId}</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${order.deliveryDate}
              </div>
              <div class="product-quantity">
                Quantity: ${order.quantity}
              </div>
              <button class="buy-again-button button-primary" data-product-id = "${order.productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        </div>
        `
    })
    document.querySelector('.orders-grid').innerHTML = html;

    document.querySelectorAll('.buy-again-button').forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.dataset.productId;
        buyAgain(productId);
        renderOrderList();
      })
    })
}


renderOrderList();