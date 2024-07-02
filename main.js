import { contactInit } from "./assets/Contact/contact.js";
import { cartInit } from "./assets/cart/cart.js";
import { menuInit } from "./assets/menu/menu.js";
import { productInit } from "./assets/products/products.js";


const init = () => {
    productInit();
    menuInit();
    cartInit();
    contactInit();
};

init();