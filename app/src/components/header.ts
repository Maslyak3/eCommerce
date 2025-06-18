import { renderLoginPage } from '../pages/login';
import logoPath from '../../assets/logo.png';

import { renderAboutPage } from "../pages/about";
import { renderCartPage } from "../pages/cart";
import { renderContactsPage } from "../pages/contacts";
import { renderShopPage } from "../pages/shop";
import { renderProfilePage } from '../pages/client-profile';

export const cartNavBtn = document.createElement('li');

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

    
    cartNavBtn.setAttribute("id", "cart-button");
    cartNavBtn.textContent = 'Cart';

    const profileNavBtn = document.createElement('li');
    profileNavBtn.setAttribute("id", "profile-button");
    profileNavBtn.textContent = 'My profile';

    const isLoggedIn = localStorage.getItem("UserLogin") && localStorage.getItem("UserPassword");

    if (isLoggedIn) {
        loginNavBtn.style.display = "none";
        profileNavBtn.style.display = "block"
    } else {
        loginNavBtn.style.display = "block";
        profileNavBtn.style.display = "none"
    };

    document.body.append(headerElement);
    headerElement.append(logo);

    navBar.append(loginNavBtn);
    navBar.append(shopNavBtn);
    navBar.append(aboutNavBtn);
    navBar.append(contactsNavBtn);
    navBar.append(cartNavBtn);
    navBar.append(profileNavBtn);
    headerElement.append(navBar);

    loginNavBtn.addEventListener("click", renderLoginPage);
    shopNavBtn.addEventListener("click", renderShopPage);
    aboutNavBtn.addEventListener("click", renderAboutPage);
    contactsNavBtn.addEventListener("click", renderContactsPage);
    profileNavBtn.addEventListener("click", renderProfilePage);
    cartNavBtn.addEventListener("click", renderCartPage);


    
    return headerElement;
}