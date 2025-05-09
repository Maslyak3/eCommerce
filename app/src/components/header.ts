import logoPath from '../../assets/logo.png';

import { renderAboutPage } from "../pages/about";
import { renderCartPage } from "../pages/cart";
import { renderContactsPage } from "../pages/contacts";
import { renderShopPage } from "../pages/shop";

export const header = function() {
    const headerElement = document.createElement('section');
    headerElement.setAttribute('id', 'header');
    const logo = document.createElement('img');
    logo.src = logoPath;

    const navBar = document.createElement('ul');
    navBar.setAttribute('id', 'nav-bar');

    const loginNavBtn = document.createElement('li');
    loginNavBtn.setAttribute("id", "login-button");
    loginNavBtn.textContent = 'Login';
    const shopNavBtn = document.createElement('li');
    shopNavBtn.setAttribute("id", "shop-button");
    shopNavBtn.textContent = 'Shop';
    const aboutNavBtn = document.createElement('li');
    aboutNavBtn.setAttribute("id", "about-button");
    aboutNavBtn.textContent = 'About';
    const contactsNavBtn = document.createElement('li');
    contactsNavBtn.setAttribute("id", "contacts-button");
    contactsNavBtn.textContent = 'Contacts';
    const cartNavBtn = document.createElement('li');
    cartNavBtn.setAttribute("id", "cart-button");
    cartNavBtn.textContent = 'Cart';



    document.body.append(headerElement);
    headerElement.append(logo);

    navBar.append(loginNavBtn);
    navBar.append(shopNavBtn);
    navBar.append(aboutNavBtn);
    navBar.append(contactsNavBtn);
    navBar.append(cartNavBtn);
    headerElement.append(navBar)

    shopNavBtn.addEventListener("click", renderShopPage);
    aboutNavBtn.addEventListener("click", renderAboutPage);
    contactsNavBtn.addEventListener("click", renderContactsPage);
    cartNavBtn.addEventListener("click", renderCartPage);


    
    return headerElement;
}