import './styles.css';
import { initRouter } from './components/router';
import { header } from './components/header';

function initApp() {
    // Спочатку створюємо хедер
    header();
    
    // Потім ініціалізуємо роутер
    initRouter();
}

document.addEventListener('DOMContentLoaded', initApp);