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

    const clientName = document.createElement('div');
    clientName.innerHTML = `${user.firstName}`;
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

    labelEmail.append(clientEmail);
    labelPhone.append(clientPhone);
    labelCity.append(shippingCity);
    labelStreet.append(shippingStreet);
    labelBuilding.append(shippingBuilding);

    shippingAddress.append(labelCity,
        labelStreet,
        labelBuilding);

    mainDiv.append(clientName,
        labelPhone,
        labelEmail,
        shippingAddress);


}