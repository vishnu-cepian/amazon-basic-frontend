export let orderList = JSON.parse(localStorage.getItem("orderList"));

if(!orderList) {
    orderList = [];
}

function saveToStorage() {
    localStorage.setItem("orderList",JSON.stringify(orderList));
}

export function addToOrderList(productId,quantity,deliveryOpitonId,currDate,dateString,totalPriceCents) {
   
    orderList.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: deliveryOpitonId,
        currDate: currDate,
        deliveryDate : dateString,
        totalPriceCents: totalPriceCents
    })
    saveToStorage();
}

export function refreshOrderList() {
    const newOrderList = []
    orderList = newOrderList;
    saveToStorage();
}

