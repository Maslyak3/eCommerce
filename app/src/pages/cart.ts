import { mainDiv } from "./login";
import { renderShopPage } from "./shop";
import './cart.css';
import { renderOrderPage } from "./order";


interface ProductPriceValue {
    centAmount: number;
    currencyCode: string;
}

interface ProductPrice {
    value: ProductPriceValue;
    discounted?: {
        value: ProductPriceValue;
    }
}

interface ProductImage {
    url: string;
}

interface ProductName {
    "en-GB": string;
    [key: string]: string;
}

interface ProductVariant {
    prices?: ProductPrice[];
    images?: ProductImage[];
}

interface ProductData {
    name: ProductName;
    masterVariant: ProductVariant;
}

export interface CartItem {
    id: string;
    quantity?: number;
    masterData: {
        current: ProductData;
    };
}

export let cartItems: CartItem[] = [];
export function renderCartPage() {
    
    mainDiv.textContent = '';
    
   cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    
    const totalAmount = cartItems.reduce((sum: number, item: CartItem) => {
        const quantity = Math.max(item.quantity || 1);
        const price = item.masterData.current.masterVariant.prices?.[0].value.centAmount || 0;
        return sum + (price * quantity);
    }, 0);
     
    const title = document.createElement('h1');
    if( cartItems.length === 0 ) {
        title.textContent = 'Ваш кошик порожній';} else {
            title.textContent = 'Ваш кошик';
        }
    

    
    mainDiv.append(title);
    
    const cartContainer = document.createElement("div");
    cartContainer.className = "cart-container";


    cartItems.forEach((item: CartItem) => {
                
        const quantity = Math.max(item.quantity || 1);
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        const cartItemPhoto = document.createElement('img');
        cartItemPhoto.src = item.masterData.current.masterVariant.images?.[0]?.url || "";
        cartItemPhoto.alt = item.masterData.current.name["en-GB"];
        cartItemPhoto.style.width = '200px';

        const cartItemName = document.createElement('h2');
        cartItemName.textContent = item.masterData.current.name["en-GB"];
        
        const cartItemPrice = document.createElement("p");
        const priceData = item.masterData.current.masterVariant.prices?.[0].value;
        
        if(!priceData) {
            console.error('Price data is missing for item:', item);} else {
        cartItemPrice.textContent = `${(priceData.centAmount / 100 * quantity).toFixed(2)} ${priceData.currencyCode}`;
            }

        const quantityControls = document.createElement('div');
        quantityControls.className = 'quantity-controls';

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => {
            updateQuantity(item.id, -1);
        });
        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => {
            updateQuantity(item.id, 1);
        });

        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = `Кількість: ${quantity}`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Видалити';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', () => {
                        
            removeItem(item.id); 
            renderCartPage(); 
        });
        
        quantityControls.append(decreaseButton, quantityDisplay, increaseButton);
        itemDiv.append(cartItemPhoto, cartItemName, cartItemPrice, quantityControls, removeBtn);
        cartContainer.append(itemDiv);
    });

    const totalPrice = document.createElement('div');
    totalPrice.className = 'cart-total';
    totalPrice.textContent = `Загальна сума: ${(totalAmount / 100).toFixed(2)} ${cartItems[0]?.masterData.current.masterVariant.prices?.[0]?.value?.currencyCode || ""}`;
    
    const checkoutBtn = document.createElement('button');
    checkoutBtn.textContent = 'Оформити замовлення';
    checkoutBtn.className = 'checkout-btn';
    checkoutBtn.addEventListener('click', () => {
        renderOrderPage()
    });

    const backBtn = document.createElement('button');
    backBtn.textContent = 'Продовжити покупки';
    backBtn.className = 'back-btn';
    backBtn.addEventListener('click', () => {
        renderShopPage()
    });
    mainDiv.append(cartContainer, totalPrice, checkoutBtn, backBtn);

    function updateQuantity(productId: string, change: number) {
        const updatedCart = cartItems.map((item: CartItem) => {
            if (item.id === productId) {
                const currentQuantity = item.quantity || 1;
                const newQuantity = currentQuantity + change;
                item.quantity = Math.max(newQuantity, 1);
                
            }
            return item;
        });

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        renderCartPage(); 
    }

    function removeItem(productId: string) {
                
        const updatedCart = cartItems.filter((item: CartItem) => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        renderCartPage();
    }

}