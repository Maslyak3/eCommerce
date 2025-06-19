import { cartItems } from "./cart";
import { mainDiv } from "./login";
import "./order.css"

export function renderOrderPage() {
   const itemsInOrder = document.createElement('div');
    itemsInOrder.className = 'items-in-order';

    const orderContainer = document.createElement('div');
    orderContainer.className = 'order-container';

    mainDiv.textContent = "";

       cartItems.forEach((item) => {

        const quantity = Math.max(item.quantity || 1);
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        const cartItemPhoto = document.createElement('img');
        cartItemPhoto.src = item.masterData.current.masterVariant.images[0]?.url || "";
        cartItemPhoto.alt = item.masterData.current.name["en-GB"];
        
        const cartItemName = document.createElement('h2');
        cartItemName.textContent = item.masterData.current.name["en-GB"];
        
        const cartItemPrice = document.createElement("p");
        const priceData = item.masterData.current.masterVariant.prices[0].value;
        cartItemPrice.textContent = `${(priceData.centAmount / 100 * quantity).toFixed(2)} ${priceData.currencyCode}`;

        itemDiv.append(cartItemPhoto, cartItemName, cartItemPrice);
        itemsInOrder.appendChild(itemDiv);
        orderContainer.appendChild(itemsInOrder);
        mainDiv.appendChild(orderContainer);
        });
    
    const orderDetails = document.createElement('div');
    orderDetails.className = 'order-details';
    const totalAmount = cartItems.reduce((sum: number, item: any) => {
        const quantity = Math.max(item.quantity || 1);
        const price = item.masterData.current.masterVariant.prices[0].value.centAmount || 0;
        return sum + (price * quantity);
    }, 0);
    const totalAmountElement = document.createElement('p');
    totalAmountElement.textContent = `Загальна сума: ${(totalAmount / 100).toFixed(2)} €`;
    orderDetails.appendChild(totalAmountElement);

    const paymentInfo = document.createElement('input');
    paymentInfo.type = 'radio';
    paymentInfo.name = 'payment-method';
    paymentInfo.id = 'payment-info';
    const paymentLabel1 = document.createElement('label');
    paymentInfo.style.display = 'block';
    paymentLabel1.htmlFor = 'payment-info';
    paymentLabel1.textContent = 'Оплата при отриманні';

    const paymentInfo2 = document.createElement('input');
    paymentInfo2.type = 'radio';
    paymentInfo2.name = 'payment-method';
    paymentInfo2.id = 'payment-info2';
    const paymentLabel2 = document.createElement('label');
    paymentInfo2.style.display = 'block';
    paymentLabel2.htmlFor = 'payment-info2';
    paymentLabel2.textContent = 'Оплата карткою на сайті';

    orderDetails.appendChild(paymentInfo);
    orderDetails.appendChild(paymentLabel1);
    orderDetails.appendChild(paymentInfo2);
    orderDetails.appendChild(paymentLabel2);

    orderContainer.appendChild(orderDetails);

    


    
    
}