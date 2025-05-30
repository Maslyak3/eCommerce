import { mainDiv } from "./login";
import { renderShopPage } from "./shop";
import "./product-card.css"

export function renderProductPage(product: any) {
mainDiv.textContent = "";

    const productName = product.masterData.current.name["en-GB"];
    const imageUrl = product.masterData.current.masterVariant.images?.[0]?.url;
    const price = product.masterData.current.masterVariant.prices?.[0]?.value;
    const description = product.masterData.current.description?.["en-GB"] ?? "Опис недоступний";
    const attributes = product.masterData.current.masterVariant.attributes ?? [];

    const image = document.createElement('img');
    image.src = imageUrl ?? "";
    image.alt = productName;
    image.className = "product-image-large";

    const nameElement = document.createElement("h2");
    nameElement.textContent = productName;
    nameElement.className = "product-name"

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

mainDiv.append(image,
    nameElement,
    priceElement,
    backBtn,
    descriptionElement,
    attributesContainer);

}