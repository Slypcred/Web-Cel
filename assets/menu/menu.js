const navBarList = document.querySelector(".navbar-list")
const cartBtn = document.querySelector(".cart-label")
const cartMenu = document.querySelector(".cart")
const burgerMenu = document.querySelector(".menu-label")


const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (navBarList.classList.contains("open-menu")) {
    navBarList.classList.remove("open-menu");
  }
};

const toggleMenu = () => {
  navBarList.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
  }
};


const closeOnClickNavbar = (e) => {
  if (!e.target.classList.contains("navbar-item")) {
    return
  }
  navBarList.classList.remove("open-menu")
}

export const menuInit = () => {
  cartBtn.addEventListener("click", toggleCart);
  burgerMenu.addEventListener("click", toggleMenu);
  navBarList.addEventListener("click", closeOnClickNavbar);
}