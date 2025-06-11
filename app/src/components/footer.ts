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
    const facebookLink = document.createElement('a');
    facebookLink.href = "https://www.facebook.com/maslyak.roman";
    facebookLink.target = "_blank";

    const instagram = document.createElement('img');
    instagram.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png';
    const instagramLink = document.createElement('a');
    instagramLink.href = "https://www.instagram.com/masliakr/";
    instagramLink.target = "_blank";

    const youtube = document.createElement('img');
    youtube.src = 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png';
    const youtubeLink = document.createElement('a');
    youtubeLink.href = "https://www.youtube.com/@romanmaslyak3897";
    youtubeLink.target = "_blank";

    instagramLink.append(instagram);
    facebookLink.append(facebook);
    youtubeLink.append(youtube);
    footerSocial.append(facebookLink);
    footerSocial.append(instagramLink);
    footerSocial.append(youtubeLink);

    const copyright = document.createElement('div');
    copyright.textContent = "Developed by Roman Masliak in 2025"
    footerElement.append(footerSocial)
    footerElement.append(copyright);
    document.body.append(footerElement);


    return footerElement;

}