import { mainDiv } from "./login";
import { renderShopPage } from "./shop";
import { cartNavBtn } from "../components/header";
import "./product-card.css"
import { Product } from "api/products";
import { CartItem } from "./cart";

export let cartItems = [];
export function renderProductPage(product: Product) {
  mainDiv.textContent = "";
  

  const data = product.masterData.current;
  const variant = data.masterVariant;
  const images = variant.images || [];
  let currentIndex = 0;

    const productName = data.name["en-GB"];
    const price = data.masterVariant.prices?.[0]?.value;
    const description = data.description?.["en-GB"] ?? "Опис недоступний";
    const attributes = data.masterVariant.attributes ?? [];

    const slider = document.createElement('div');
    slider.className = "image-slider";

    const image = document.createElement('img');
    image.src = images[0]?.url ?? "";
    image.alt = productName;
    image.className = "product-image-large";
    slider.appendChild(image);

    const nameElement = document.createElement("h2");
    nameElement.textContent = productName;
    nameElement.className = "product-name"

    const prevBtn = document.createElement('button');
    prevBtn.textContent = "←";
    prevBtn.className = "slider-btn prev-btn";
    prevBtn.disabled = images.length <= 1;

    const nextBtn = document.createElement('button');
    nextBtn.textContent = "→";
    nextBtn.className = "slider-btn next-btn";
    nextBtn.disabled = images.length <= 1;

    slider.append(prevBtn, nextBtn);

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        image.src = images[currentIndex]?.url ?? "";
        updateButtons();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        image.src = images[currentIndex]?.url ?? "";
        updateButtons();
      }
    });

    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === images.length - 1;
    }



    const priceElement = document.createElement("p");
    priceElement.textContent = price
        ? `${price.centAmount / 100} ${price.currencyCode}`
        : "Ціна недоступна";
    priceElement.className = "product-price";

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    descriptionElement.className = "product-description";

    const attributesContainer = document.createElement('ul');
    attributesContainer.className = "product-attributes";
    for (const attr of attributes) {
        const attrItem = document.createElement('li');
        const name = attr.name;
  const value = attr.value;

  let displayValue: string;

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    displayValue = String(value);
  } else if (value?.label) {
    displayValue = value.label;
  } else if (value?.["en-GB"]) {
    displayValue = value["en-GB"];
  } else {
    displayValue = JSON.stringify(value);
  }

  attrItem.textContent = `${name}: ${displayValue}`;
  attributesContainer.appendChild(attrItem);
    }

    const backBtn = document.createElement("button");
    backBtn.textContent = "← Назад до магазину";
    backBtn.addEventListener("click", () => {
        renderShopPage()
    });

    function addToCart(product: Product) {
        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
        existingCart.push(product);
        localStorage.setItem("cart", JSON.stringify(existingCart));
    };

    function removeFromCart(product: Product) {
        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = existingCart.filter((item: CartItem) => item !== product);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    let cartCount = 0;
    const cartBtn = document.createElement("button");
    cartBtn.textContent = "Додати до кошика";
    cartBtn.addEventListener("click", () => {

      if (cartBtn.textContent === "Додати до кошика") {
        cartBtn.textContent = "Товар додано до кошика";
          cartCount++;
          
          addToCart(product);
      } else {
        cartBtn.textContent = "Додати до кошика";
    cartCount = Math.max(0, cartCount - 1);
    removeFromCart(product);
        }
        cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
       cartNavBtn.textContent = `Cart (${cartItems.length})`;
           
    });

mainDiv.append(nameElement,
  slider,
    priceElement,
    descriptionElement,
    attributesContainer,
    backBtn,
    cartBtn);
    

}