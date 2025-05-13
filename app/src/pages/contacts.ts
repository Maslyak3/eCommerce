import { mainDiv } from "./login";
import "./contacts.css"

export function renderContactsPage() {
    mainDiv.textContent = "";

    const contactsWrap = document.createElement('div');
    contactsWrap.className = "contacts-wrap";

    const contactDetails = document.createElement('div');
    contactDetails.className = "contacts-details";
    const contactTel = document.createElement("div");
    contactTel.innerHTML= "Наші телефони: <br> +38067-327-02-51 <br> +38044-209-22-09";
    const contactSocial = document.createElement('div')
    contactSocial.innerHTML = `<img src='https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'> <img src='https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png'> <img src='https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png'>`

    const contactLeft = document.createElement("div");
    contactLeft.className = "contact-left";

    const adress = document.createElement('div');
    adress.innerHTML = "АДРЕСА МАГАЗИНУ: <br> м.Київ, вул М. Руденка 14Є"

    const schedule = document.createElement('div');
    schedule.innerHTML = "ГРАФІК РОБОТИ: <br>  ПН: 9:00 - 18:00 <br> ВТ: 9:00 - 18:00 <br> СР: 9:00 - 18:00 <br> ЧТ: 9:00 - 18:00 <br> ПТ: 9:00 - 18:00 <br> СБ: 9:00 - 18:00 <br> НД: ВИХіДНИЙ";

    const contactsMap = document.createElement('div');
    contactsMap.className = "contacts-map";
    contactsMap.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.9901212158798!2d30.376497175780003!3d50.42265568936569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cb93c253ef7b%3A0x6fd8706b8cbb7d26!2z0LHRg9C7LiDQnNC40LrQvtC70Lgg0KDRg9C00LXQvdC60LAsIDE00JAsINCa0LjRl9CyLCAwMzE5NA!5e0!3m2!1suk!2sua!4v1747134357102!5m2!1suk!2sua" width="600" height="350" style="border:1;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

  contactLeft.append(contactTel)
  contactLeft.append(contactSocial);
  contactLeft.append(adress);
  contactDetails.append(contactLeft);
  contactDetails.append(schedule);  
  contactsWrap.append(contactDetails);
  contactsWrap.append(contactsMap);
  mainDiv.append(contactsWrap);

}

