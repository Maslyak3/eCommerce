import { mainDiv } from "./login";
import "./shop.css"
import { fetchProducts } from "../api/products";
import { fetchCategories } from "../api/categories";


export async function renderShopPage () {
    mainDiv.textContent = "";
    const categoryLine = document.createElement('div');
    categoryLine.className = "category-line";
    categoryLine.textContent = " Категорії товарів"
        
    const wrapper = document.createElement('div');
    wrapper.className = "wrapper";
    
    const sideBar = document.createElement('div');
    sideBar.className = "sidebar";
    sideBar.textContent = "Бокове меню"

    const mainSection = document.createElement('div');
    mainSection.className = "main-section";
    mainSection.textContent = "Завантаження товарів...";

    try {
        const categories = await fetchCategories();
        const categoryList = document.createElement('ul');
        categories.forEach((category) => {
            const li = document.createElement('li');
            li.innerHTML = category.name.en;
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
        const productList = document.createElement('ul');

        products.forEach((product) => {
            const li = document.createElement('li');
            li.innerHTML = product.masterData.current.name.en;
            productList.appendChild(li);
        });
        mainSection.append(productList);
    } catch (e) {
        mainSection.textContent = "Помилка завантаження товарів";
        console.error(e);
    }


    mainDiv.append(categoryLine);
    wrapper.append(sideBar);
    wrapper.append(mainSection);
    mainDiv.append(wrapper);


};