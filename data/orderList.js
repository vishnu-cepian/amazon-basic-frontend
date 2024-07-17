export let orderList = JSON.parse(localStorage.getItem("orderList"));

if(!orderList) {
    orderList = [];
}

function saveToStorage() {
    localStorage.setItem("orderList",JSON.stringify(orderList));
}

export function addToOrderList(productId,quantity,deliveryOpitonId,currDate,dateString,actualPrice,totalPriceCents) {
   
    orderList.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: deliveryOpitonId,
        currDate: currDate,
        deliveryDate : dateString,
        actualPrice: actualPrice,
        totalPriceCents: totalPriceCents
    })
    saveToStorage();
}

export function buyAgain(productId) {
    orderList.forEach(item => {
        if(item.productId == productId) {
            item.quantity++;
            const newPrice = item.totalPriceCents + item.actualPrice
            item.totalPriceCents = newPrice;
}})
    saveToStorage();
}

export function refreshOrderList() {
    const newOrderList = []
    orderList = newOrderList;
    saveToStorage();
}

