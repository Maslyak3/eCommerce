import { mainDiv } from "./login";
import "./shop.css"

export function renderShopPage () {
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
    mainSection.textContent = "основна секція";

    mainDiv.append(categoryLine);
    wrapper.append(sideBar);
    wrapper.append(mainSection);
    mainDiv.append(wrapper);

};