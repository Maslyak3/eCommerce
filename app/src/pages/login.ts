import { getAccessToken } from "../api/auth";
import { footer } from "../components/footer";
import { header } from "../components/header";
import "./login.css";
import { renderShopPage } from "./shop";

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
    // mainDiv.style.height = "400px";
    // mainDiv.style.backgroundColor = "#fff2e6";

    const loginError = document.createElement('div');
    loginError.style.color = "red";

    const passwordError = document.createElement('div');
    passwordError.style.color = "red";

    loginForm.append(loginError);
loginForm.append(passwordError);

    function validateLogin(value: string): string | null {
        if (value.length < 4) return "Login must be at least 4 characters long";
        if (!/^[a-zA-Z0-9]+$/.test(value)) return "Login must contain only letters and numbers.";
        return null;
    }

    function validatePassword(value:string): string | null {
        if (value.length < 6) return "Password must be at least 6 characters long";
        if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) return "password must include numbers and letters";
        return null;
    }


    footer();

    submitBtn.addEventListener('click', (event) => {
        event?.preventDefault()

        const login = loginInput.value.trim();
        const password = pswdInput.value;

        const loginValidation = validateLogin(login);
        const passwordValidation = validatePassword(password);

        if (!loginValidation && !passwordValidation) {
            renderShopPage();
            getAccessToken();
        } else {displayError("Please fix the errors above.")};

        loginError.textContent = loginValidation ?? "";
        passwordError.textContent = passwordValidation ?? "";

                
    });

}

function displayError(message: string): void {
    let errorElement = document.getElementById('login-error') as HTMLDivElement;

    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'login-error';
        errorElement.style.color = 'red';
        document.body.appendChild(errorElement);
    }

    errorElement.textContent = message;
}