import { CLIENT_ID, CLIENT_SECRET, getAccessToken } from "../api/auth";
import { footer } from "../components/footer";
import { header } from "../components/header";
import "./login.css";
import { renderShopPage } from "./shop";

export const mainDiv = document.createElement('div');
export const loginInput = document.createElement("input");
mainDiv.className = "main-div";

export function renderLoginPage() {
    document.body.innerHTML = "";
    mainDiv.textContent = "";

    header();

    const loginForm = document.createElement("form")
    loginForm.className = 'login-form';
    loginForm.textContent = "register or login";

    loginInput.className = "input-field";
    loginInput.placeholder = "E-mail";

    const pswdInput = document.createElement("input");
    pswdInput.className = "input-field";
    pswdInput.placeholder = "Password"

    const submitBtn = document.createElement("button");
    submitBtn.textContent = 'Submit';
    submitBtn.className = "submit-button";

    const registerBtn = document.createElement("button");
    registerBtn.textContent = "Register";
    
    loginForm.append(loginInput);
    loginForm.append(pswdInput);
    loginForm.append(submitBtn);
    loginForm.append(registerBtn);
    mainDiv.append(loginForm);
    
    document.body.append(mainDiv)
    
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

    submitBtn.addEventListener('click', async (event) => {
        event?.preventDefault()

        const login = loginInput.value.trim();
        const password = pswdInput.value;

        const loginValidation = validateLogin(login);
        const passwordValidation = validatePassword(password);
        
        if (!loginValidation && !passwordValidation) {
               localStorage.setItem("UserLogin", login);
                localStorage.setItem("UserPassword", password);
            try {
                const token = await getAccessToken(login, password);
                localStorage.setItem("accessToken", token);

            await renderShopPage();
        } catch (err) {
            displayError("Please fix the errors above.");
            console.error(err);
            }
        } else {displayError("Please fix the errors above.");
    }
    loginError.textContent = loginValidation ?? "";
        passwordError.textContent = passwordValidation ?? "";
                        
    });

    registerBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const email = loginInput.value;
        const password = pswdInput.value;

        const response = await fetch('https://auth.europe-west1.gcp.commercetools.com/oauth/microworld/customers', {
            method: "POST",
            headers: {
                Authorization: "Basic" + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
        );


    })

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