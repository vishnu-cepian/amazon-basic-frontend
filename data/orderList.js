export let orderList = JSON.parse(localStorage.getItem("orderList"));

if(!orderList) {
    orderList = [];
}

function saveToStorage() {
    localStorage.setItem("orderList",JSON.stringify(orderList));
}

export function addToOrderList(productId,quantity,deliveryOpitonId) {
   
    orderList.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: deliveryOpitonId
    })
    saveToStorage();
}

export function refreshOrderList() {
    const newOrderList = []
    orderList = newOrderList;
    saveToStorage();
}

