import "./client-profile.css";
import { loginInput, mainDiv, renderLoginPage } from "./login";

const API_URL = 'https://api.europe-west1.gcp.commercetools.com/microworld/me';

export async function renderProfilePage() {
    console.log("Rendering profile page");
    mainDiv.textContent = "";

    const token = localStorage.getItem("acessToken");
    if (!token) {
        mainDiv.textContent = "You are not logged in";
        return;
    }

    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const user = await response.json();
    const login = localStorage.getItem("userLogin");
    const clientName = document.createElement('div');
    clientName.innerHTML = login ?? "Unknown user";
    clientName.className = "profile-inputs";

    const clientPhone = document.createElement('input');
    clientPhone.placeholder = "+380..."
    
   
    const logOutBtn = document.createElement('button');
    logOutBtn.textContent = "Вийти з профілю";
    logOutBtn.className = "submit-button";
    logOutBtn.addEventListener("click", () => {
        localStorage.removeItem("acessToken");
        localStorage.removeItem("userLogin");
        localStorage.removeItem("UserId");
        
        renderLoginPage();
    });

    const shippingAddress = document.createElement('form');
    shippingAddress.className = "shipping-address";
    shippingAddress.textContent = "Адреса доставки:"

    const shippingCity = document.createElement("input");
    const shippingStreet = document.createElement("input");
    const shippingBuilding = document.createElement("input");

    const divCity = document.createElement("div");
    divCity.className = "adress-div";
    const divStreet = document.createElement("div");
    divStreet.className = "adress-div";
    const divBuilding = document.createElement("div");
    divBuilding.className = "adress-div";

    const labelEmail = document.createElement("label");
    labelEmail.textContent = "Ваш email:";
    labelEmail.className = "profile-inputs";
    const labelPhone = document.createElement("label");
    labelPhone.textContent = "Ваш телефон:";
    labelPhone.className = "profile-inputs";
    const labelCity = document.createElement("label");
    labelCity.textContent = "Місто/Село:";
    labelCity.className = "profile-inputs";
    const labelStreet = document.createElement("label");
    labelStreet.textContent = "Вулиця:";
    labelStreet.className = "profile-inputs";
    const labelBuilding = document.createElement("label");
    labelBuilding.textContent = "Будинок/Квартира:";
    labelBuilding.className = "profile-inputs";
    const saveAdressBtn = document.createElement("button");
    saveAdressBtn.textContent = "Зберегти адресу";
    saveAdressBtn.className = "submit-button";

    const customerId = user.id;
    const version = user.version;

    const address = {
        country: "UA",
        city: shippingCity.value,
        streetName: shippingStreet.value,
        building: shippingBuilding.value,
      };

    async function saveAdress() {
        
        if (shippingCity.value && shippingStreet.value && shippingBuilding.value) {
            labelCity.style.display = "none";
            labelStreet.style.display = "none";
            labelBuilding.style.display = "none";

            divCity.textContent = `Місто/Село: ${shippingCity.value}`;
            divStreet.textContent = `Вулиця: ${shippingStreet.value}`;
            divBuilding.textContent = `Будинок/Квартира: ${shippingBuilding.value}`;

            shippingAddress.append(divCity);
            shippingAddress.append(divStreet);
            shippingAddress.append(divBuilding);
            saveAdressBtn.textContent = "Змінити адресу";

            await fetch(`https://api.europe-west1.gcp.commercetools.com/microworld/customers/${customerId}`, {
                method: "POST",
                headers: {
                 Authorization: `Bearer ${token}`,
                 "Content-type": "application/json",
                },
                body: JSON.stringify({
                 version,
                 actions: [{
                     action: "addAddress",
                     address,
                 },],
                }),
             });
        }
    }

    async function changeAdress() {
        labelCity.style.display = "block";
            labelStreet.style.display = "block";
            labelBuilding.style.display = "block";
            shippingCity.style.display = "block";
            shippingStreet.style.display = "block";
            shippingBuilding.style.display = "block";
            
            divCity.textContent = "";
            divStreet.textContent = "";
            divBuilding.textContent = "";
            
            saveAdressBtn.textContent = "Зберегти адресу";
    
    }

    saveAdressBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if(saveAdressBtn.textContent === "Зберегти адресу") {
            saveAdress()
        } else if (saveAdressBtn.textContent === "Змінити адресу") {
            changeAdress()
        }
                
    })

    labelPhone.append(clientPhone);
    labelCity.append(shippingCity);
    labelStreet.append(shippingStreet);
    labelBuilding.append(shippingBuilding);

    shippingAddress.append(labelPhone,
        labelCity,
        labelStreet,
        labelBuilding,
        saveAdressBtn);

    mainDiv.append(clientName,
        logOutBtn,
        shippingAddress);


}