import { renderShopPage } from '../pages/shop';
import { renderAboutPage } from '../pages/about';
import { renderCartPage } from '../pages/cart';
import { renderContactsPage } from '../pages/contacts';
import { renderLoginPage } from '../pages/login';
import { renderProfilePage } from '../pages/client-profile';
import { renderProductPage } from '../pages/product-card';

export function initRouter() {
    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange();
  
    function handleRouteChange() {
      const route = window.location.hash.slice(1);
      
      switch (route) {
        case 'shop':
          renderShopPage()
        case 'about':
          renderAboutPage();
          break;
        case 'cart':
          renderCartPage();
          break;
        case 'contacts':
          renderContactsPage();
          break;
        case 'profile':
          renderProfilePage();
          break;
          // case 'product':
          //   renderProductPage();
          //   break;
        default:
          renderLoginPage();
      }
    }
  }