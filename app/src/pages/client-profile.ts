import "./client-profile.css";
import { loginInput, mainDiv } from "./login";
import { getAccessToken } from "../api/auth";

const API_URL = 'https://api.europe-west1.gcp.commercetools.com/microworld/me';

export async function renderProfilePage() {
    mainDiv.textContent = "";

    const token = localStorage.getItem("accessToken");
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
    const login = localStorage.getItem("UserLogin");
    const clientName = document.createElement('div');
    clientName.innerHTML = login ?? "Unknown user";
    clientName.className = "profile-inputs";

    const clientPhone = document.createElement('input');
    clientPhone.placeholder = "+380..."
    
    const clientEmail = document.createElement('input');
    clientEmail.placeholder = "enter Email"
    clientEmail.setAttribute("title", "Ваш email:")
    
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

    saveAdressBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if (shippingCity.value && shippingStreet.value && shippingBuilding.value) {
            
            labelCity.style.display = "none";
            labelStreet.style.display = "none";
            labelBuilding.style.display = "none";

            divCity.textContent = `Місто/Село: ${shippingCity.value}`;
            divStreet.textContent = `Вулиця: ${shippingCity.value}`;
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
        
    })

    labelEmail.append(clientEmail);
    labelPhone.append(clientPhone);
    labelCity.append(shippingCity);
    labelStreet.append(shippingStreet);
    labelBuilding.append(shippingBuilding);

    shippingAddress.append(labelCity,
        labelStreet,
        labelBuilding,
        saveAdressBtn);

    mainDiv.append(clientName,
        labelPhone,
        labelEmail,
        shippingAddress);


}