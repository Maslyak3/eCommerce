import { footer } from "../components/footer";
import { header } from "../components/header";

export const mainDiv = document.createElement('div')

export function renderLoginPage() {
    document.body.innerHTML = "";

    header();
    
    document.body.append(mainDiv)
    mainDiv.style.height = "200px";
    mainDiv.style.backgroundColor = "grey";

    footer();

}