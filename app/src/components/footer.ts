import logoPath from '../../assets/logo.png';

export const footer = function() {
    const footerElement = document.createElement('section');
    footerElement.setAttribute('id', 'footer');
    footerElement.className = "footer-element";
    
    const logo = document.createElement('img');
    logo.src = logoPath;
    footerElement.append(logo);

    const footerSocial = document.createElement('div');
    footerSocial.className = "footer-social";

    const facebook = document.createElement('img');
    facebook.src = 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg';

    const instagram = document.createElement('img');
    instagram.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png';

    const youtube = document.createElement('img');
    youtube.src = 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png';

    footerSocial.append(facebook);
    footerSocial.append(instagram);
    footerSocial.append(youtube);

    const copyright = document.createElement('div');
    copyright.textContent = "Developed by Roman Masliak in 2025"
    footerElement.append(footerSocial)
    footerElement.append(copyright);
    document.body.append(footerElement);


    return footerElement;

}