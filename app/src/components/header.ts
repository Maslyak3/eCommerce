import { renderLoginPage } from '../pages/login';
import logoPath from '../../assets/logo.png';

import { renderAboutPage } from "../pages/about";
import { renderCartPage } from "../pages/cart";
import { renderContactsPage } from "../pages/contacts";
import { renderShopPage } from "../pages/shop";
import { renderProfilePage } from '../pages/client-profile';

export const cartNavBtn = document.createElement('li');

export function header() {
    const headerElement = document.createElement('section');
    headerElement.id = 'header';
    
    const logo = document.createElement('img');
    logo.src = logoPath;
    logo.addEventListener("click", () => navigateTo('/'));

    const navBar = document.createElement('ul');
    navBar.id = 'nav-bar';

    // Створення кнопок навігації
    const loginNavBtn = createNavButton('Login', '/login');
    const shopNavBtn = createNavButton('Shop', '/shop');
    const aboutNavBtn = createNavButton('About', '/about');
    const contactsNavBtn = createNavButton('Contacts', '/contacts');
    const profileNavBtn = createNavButton('My profile', '/profile');
    const cartNavBtn = createNavButton('Cart', '/cart');

    // Обробка авторизації
    const isLoggedIn = localStorage.getItem("UserLogin") && localStorage.getItem("UserPassword");
    loginNavBtn.style.display = isLoggedIn ? "none" : "block";
    profileNavBtn.style.display = isLoggedIn ? "block" : "none";

    // Додавання елементів
    navBar.append(loginNavBtn, shopNavBtn, aboutNavBtn, contactsNavBtn, cartNavBtn, profileNavBtn);
    headerElement.append(logo, navBar);
    document.body.append(headerElement);

    function createNavButton(text: string, path: string) {
        const button = document.createElement('li');
        button.textContent = text;
        button.addEventListener('click', () => navigateTo(path));
        return button;
    }

    function navigateTo(path: string) {
        
        window.history.pushState(null, '', path);
        dispatchEvent(new PopStateEvent('popstate'));
    }
}