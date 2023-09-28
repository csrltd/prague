const navbar = document.querySelector('#nav');
const linksContainer = document.querySelector('#links-container');
const hamburger = document.querySelector('#hamburger');
window.onscroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('nav-active');
    } else {
        navbar.classList.remove('nav-active');
    }
};

hamburger.addEventListener("click", () => {
    if(hamburger.classList.contains('close')){
    hamburger.classList.remove('close');
    linksContainer.style.top = -200+"rem";
    } else{
        hamburger.classList.add("close");
        linksContainer.style.top = 0;
    }
})