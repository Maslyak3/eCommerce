import { mainDiv } from "./login";
import { renderShopPage } from "./shop";
import "./product-card.css"

export function renderProductPage(product: any) {
mainDiv.textContent = "";

  const data = product.masterData.current;
  const variant = data.masterVariant;
  const images = variant.images || [];
  let currentIndex = 0;

    const productName = data.name["en-GB"];
    // const imageUrl = data.masterVariant.images?.[0]?.url;
    const price = data.masterVariant.prices?.[0]?.value;
    const description = data.description?.["en-GB"] ?? "Опис недоступний";
    const attributes = data.attributes ?? [];

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
    // Enum тип: { label: 'Glossy', key: 'glossy' }
    displayValue = value.label;
  } else if (value?.["en-GB"]) {
    // Локалізоване значення
    displayValue = value["en-GB"];
  } else {
    displayValue = JSON.stringify(value); // fallback
  }

  attrItem.textContent = `${name}: ${displayValue}`;
  attributesContainer.appendChild(attrItem);
    }

    const backBtn = document.createElement("button");
    backBtn.textContent = "← Назад до магазину";
    backBtn.addEventListener("click", () => {
        renderShopPage()
    });

mainDiv.append(nameElement,
  slider,
    priceElement,
    descriptionElement,
    attributesContainer,
    backBtn);
    

}