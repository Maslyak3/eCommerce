import { renderShopPage } from '../pages/shop';
import { renderAboutPage } from '../pages/about';
import { renderCartPage } from '../pages/cart';
import { renderContactsPage } from '../pages/contacts';
import { renderLoginPage } from '../pages/login';
import { renderProfilePage } from '../pages/client-profile';
import { renderProductPage } from '../pages/product-card';

export function initRouter() {
    window.addEventListener('popstate', handleRouteChange);
    handleRouteChange();
    window.addEventListener('load', handleRouteChange);
  
    function handleRouteChange() {
      const path = window.location.pathname;
                  
      switch (path) {
        case '/login':
          renderLoginPage()
          break;
        case '/shop':
          renderShopPage()
          break;
        case '/about':
          renderAboutPage();
          break;
        case '/cart':
          renderCartPage();
          break;
        case '/contacts':
          renderContactsPage();
          break;
        case '/profile':
          renderProfilePage();
          break;
          
        default:
          window.history.replaceState(null, '', '/login')
          renderLoginPage();
      }
    }
  }