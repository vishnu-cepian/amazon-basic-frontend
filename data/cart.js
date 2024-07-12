export let cart = JSON.parse(localStorage.getItem("cart"));

if(!cart) {
    cart = [];
}

function saveToStorage() {
    localStorage.setItem("cart",JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;

    if (cart) {
        cart.forEach((cartItem) => {
        if (cartItem.productId == productId)
            matchingItem = cartItem;
    })  
    }
    if(matchingItem) 
        matchingItem.quantity++;
    else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        })
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    })
    cart = newCart;
    saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if(cartItem.productId === productId) 
            matchingItem = cartItem;    
    })

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}
