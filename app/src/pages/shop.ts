import { mainDiv } from "./login";
import "./shop.css"
import { fetchProducts, fetchProductsByCategory, Product } from "../api/products";
import { fetchCategories } from "../api/categories";
import { renderPriceControls } from "../components/side-bar";
import { renderProductPage } from "./product-card";

export const renderProducts = async (products: Product[]) => {
    console.log("🖼️ Рендеримо продукти:", products.length);
    const mainSection = document.querySelector('.main-section') as HTMLElement;
    mainSection.textContent = "";

    
    products.forEach((product) => {
        const mainSection = document.querySelector('.main-section') as HTMLElement;
    mainSection.textContent = "";

    products.forEach((product) => {
        
        const data = product.masterData?.current ?? product;
        const variant = data.masterVariant;

        const productName = data.name?.["en-GB"] ?? "No name";
        const imageUrl = variant?.images?.[0]?.url ?? "";
        const price = variant?.prices?.[0]?.value;

        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = productName;
        image.className = "product-image";

        const nameElement = document.createElement("h3");
        nameElement.textContent = productName;

        const priceElement = document.createElement("p");
        priceElement.textContent = price
            ? `${price.centAmount / 100} ${price.currencyCode}`
            : "Ціна недоступна";

        productCard.appendChild(image);
        productCard.appendChild(nameElement);
        productCard.appendChild(priceElement);
        
        mainSection.appendChild(productCard);

        productCard.addEventListener("click", () => {renderProductPage(product)});
    });

    })
}

export const sideBar = document.createElement('div');
    sideBar.className = "sidebar";


    

export async function renderShopPage () {
    mainDiv.textContent = "";

    const token = localStorage.getItem("acessToken");
    if (!token) {
        console.error("Access token is missing. Please login first.");
        mainDiv.textContent = "Помилка: відсутній токен доступу. Увійдіть у систему.";
        return;
    }
    
    const categoryLine = document.createElement('div');
    categoryLine.className = "category-line";
    categoryLine.textContent = ""
        
    const wrapper = document.createElement('div');
    wrapper.className = "wrapper";
    
    await renderPriceControls()

    const mainSection = document.createElement('div');
    mainSection.className = "main-section";
    mainSection.textContent = "Завантаження товарів...";

    try {
        const categories = await fetchCategories();
        console.log(categories);
        
        const categoryList = document.createElement('ul');
        categoryList.className = "category-list";

        categories.forEach((category) => {
            const li = document.createElement('li');
            li.innerHTML = category.name["en-GB"];

            li.addEventListener("click", async() => {
                mainSection.textContent = "Завантаження товарів";
                try {
                    const products = await fetchProductsByCategory(category.id);
                    renderProducts(products);
                } catch (e) {
                    mainSection.textContent = "Помилка завантаження товарів цієї категорії";
                    console.error(e);
                }
            } )

            categoryList.appendChild(li);
        });
        categoryLine.appendChild(categoryList)
    } catch (e) {
        categoryLine.append(" (Помилка завантаження категорій) ")
        console.error(e);
    }

    try {
        const products = await fetchProducts();
        mainSection.textContent = "";
        console.log(products);
        
        products.forEach((product) => {
            const productCard = document.createElement('div');
            productCard.className = "product-card"
            const productName = product.masterData.current.name["en-GB"];
            const imageUrl = product.masterData.current.masterVariant.images?.[0]?.url;
            const price = product.masterData.current.masterVariant.prices?.[0]?.value;

            const image = document.createElement('img');
            image.src = imageUrl ?? "";
            image.alt = productName;
            image.className = "product-image";

            const nameElement = document.createElement("h3");
            nameElement.textContent = productName;
            const priceElement = document.createElement("p");
            priceElement.textContent = price
            ? `${price.centAmount / 100} ${price.currencyCode}`
            : "Ціна недоступна";

            productCard.appendChild(image);
            productCard.appendChild(nameElement);
            productCard.appendChild(priceElement);

            mainSection.appendChild(productCard);

            productCard.addEventListener("click", () => {renderProductPage(product)});


        });
        
    } catch (e) {
        mainSection.textContent = "Помилка завантаження товарів";
        console.error(e);
    }


    mainDiv.append(categoryLine);
    wrapper.append(sideBar);
    wrapper.append(mainSection);
    mainDiv.append(wrapper);
console.log(mainDiv);


};

