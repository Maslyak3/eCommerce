import { getAccessToken } from "../api/auth";
import { footer } from "../components/footer";
import { header } from "../components/header";
import "./login.css";

export const mainDiv = document.createElement('div');
mainDiv.className = "main-div";

export function renderLoginPage() {
    document.body.innerHTML = "";
    mainDiv.textContent = "";

    header();

    const loginForm = document.createElement("form")
    loginForm.className = 'login-form';
    loginForm.textContent = "register or login";

    const loginInput = document.createElement("input");
    loginInput.className = "input-field";
    loginInput.placeholder = "Login";

    const pswdInput = document.createElement("input");
    pswdInput.className = "input-field";
    pswdInput.placeholder = "Password"

    const submitBtn = document.createElement("button");
    submitBtn.textContent = 'Submit';
    submitBtn.className = "submit-button";

    loginForm.append(loginInput);
    loginForm.append(pswdInput);
    loginForm.append(submitBtn);
    mainDiv.append(loginForm);
    
    document.body.append(mainDiv)
    mainDiv.style.height = "400px";
    mainDiv.style.backgroundColor = "#fff2e6";

    footer();

    submitBtn.addEventListener('click', (event) => {
        event?.preventDefault()
        console.log(`Login: ${loginInput.value}, Pasword: ${pswdInput.value}`)
        getAccessToken()
    });

}