import { mainDiv } from "./login";

export function renderCartPage() {
    mainDiv.textContent = '';
    const test = document.createElement('div');
    test.textContent = 'Поки що пуста сторінка корзини';
    mainDiv.append(test);

}