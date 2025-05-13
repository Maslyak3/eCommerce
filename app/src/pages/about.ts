import "./about.css"
import { mainDiv } from "./login";

export function renderAboutPage() {
    mainDiv.textContent = "";

    const aboutWrap = document.createElement("div");
    aboutWrap.className = "about-wrap";

    const statCards = document.createElement('div');
    statCards.className = "stat-cards";

    const aboutText = document.createElement('div');
    aboutText.className = "about-text";
    aboutText.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae lobortis purus, vitae hendrerit ligula. Nam dictum, enim scelerisque sollicitudin bibendum, lectus leo condimentum ex, aliquam laoreet orci velit vitae nunc. Sed posuere quam nec placerat bibendum. Morbi volutpat augue id ipsum semper consequat. Proin a ipsum quis nunc luctus posuere. Donec id porttitor eros. Quisque eros velit, feugiat vel dignissim interdum, venenatis nec ante. Mauris dui lectus, gravida id urna in, dignissim dignissim leo. Pellentesque hendrerit neque sit amet odio ultrices, id pulvinar velit varius. Etiam lobortis finibus risus, non condimentum nulla sagittis id. Nunc laoreet porttitor orci, at consequat est rutrum a. Vestibulum auctor volutpat sem, tristique lacinia justo egestas nec. Praesent faucibus sapien id tortor malesuada, non convallis eros mattis."

    const cardAmount = document.createElement('div');
    cardAmount.className = "about-card";
    cardAmount.innerHTML = "28500 задоволених клієнтів";

    const cardGoods = document.createElement('div');
    cardGoods.className = "about-card";
    cardGoods.innerHTML = "1200 одиниць товару";
    
    const cardYears = document.createElement('div');
    cardYears.className = "about-card";
    cardYears.innerHTML = "10 років на ринку";

    const cardHours = document.createElement('div');
    cardHours.className = "about-card";
    cardHours.innerHTML = "24/7 Інтернет-магазин працює цілодобово";

    const toTheShop = document.createElement("button");
    toTheShop.className = "to-shop-btn";
    toTheShop.textContent = "В магазин"

    statCards.append(
        cardAmount,
        cardGoods,
        cardHours,
        cardYears
    )

    aboutWrap.append(
        statCards,
        aboutText,
        )

    mainDiv.append(aboutWrap);
    mainDiv.append(toTheShop);


}