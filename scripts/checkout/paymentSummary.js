import { cart,removeFromCart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrecy } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderOrderSummary } from "./orderSummary.js";
import { orderList,addToOrderList,refreshOrderList } from "../../data/orderList.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderPaymentSummary() {

    let productPriceCents = 0;
    let shippingPriceCents = 0;
    
    cart.forEach(cartItem => {
      const product = getProduct(cartItem.productId);
      productPriceCents += product.priceCents * cartItem.quantity;

      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
      shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentummaryHTML = `<div class="payment-summary-title">
              Order Summary
            </div>
  
            <div class="payment-summary-row">
              <div>Items (${document.querySelector(".return-to-home-link").innerHTML}):</div>
              <div class="payment-summary-money">$${formatCurrecy(productPriceCents)}</div>
            </div>
  
            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$${formatCurrecy(shippingPriceCents)}</div>
            </div>
  
            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$${formatCurrecy(totalBeforeTaxCents)}</div>
            </div>
  
            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$${formatCurrecy(taxCents)}</div>
            </div>
  
            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$${formatCurrecy(totalCents)}</div>
            </div>
  
            <button class="place-order-button button-primary">
              Place your order
            </button>
          </div>`;

    document.querySelector('.payment-summary').innerHTML = paymentummaryHTML;

    document.querySelector('.place-order-button').addEventListener('click', () => {
      refreshOrderList();
      cart.forEach((cartItem) => {
        let deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption = getDeliveryOption(deliveryOptionId);
        let today = dayjs();
        let currDate = today.format("dddd, MMMM D");
        let deliveryDate = today.add(deliveryOption.deliveryDays, "days");
        let dateString = deliveryDate.format("dddd,MMMM D");

        const product = getProduct(cartItem.productId);
        const totalBeforeTaxCents = (product.priceCents * cartItem.quantity) + deliveryOption.priceCents;
        const taxCents = totalBeforeTaxCents * 0.1;
        const totalPriceCents = totalBeforeTaxCents + taxCents;

        addToOrderList(cartItem.productId,cartItem.quantity,cartItem.deliveryOptionId,currDate,dateString,totalPriceCents);
        removeFromCart(cartItem.productId)
        renderPaymentSummary()
        renderOrderSummary()
      })
    })
  }

