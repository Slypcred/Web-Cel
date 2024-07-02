import {
  smartPhoneContainer
} from "../products/products.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-container");

const cartTotal = document.getElementById("total");

const btnBuy = document.getElementById("btn-buy");

const btnDelete = document.getElementById("btn-delete");


const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const createCartSmartphone = (cartSmartphone) => {
  const {
    id,
    name,
    bid,
    img,
    quantity
  } = cartSmartphone;
  return `    
      <div class="cart-product">
        <img src=${img} alt="Smartphone" />
        <div class="cart-product-info">
          <h3 class="name">${name}</h3>
         <h4 class="price">Price:  ${bid} </h4>
        </div>
        <div class="product-handler">
          <span class="quantity-handler down" data-id=${id}>-</span>
          <span class="product-quantity">${quantity}</span>
          <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
      </div>`;
};


const renderCart = () => {
  if (!cart.length) {
    cartContainer.innerHTML = `<p class="ifEmpty">There are no products in the cart.</p>`;
    return;
  }
  cartContainer.innerHTML = cart.map(createCartSmartphone).join("");
};


const getCartTotal = () => {
  return cart.reduce((acc, cur) => acc + Number(cur.bid) * cur.quantity, 0);
};

const showCartTotal = () => {
  cartTotal.innerHTML = `${getCartTotal().toFixed(2)} Dollars`;
};


const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled")
  } else {
    btn.classList.remove("disabled")
  }
}


const updateCart = () => {
  saveCart();
  renderCart();
  showCartTotal();
  disableBtn(btnBuy);
  disableBtn(btnDelete);
}

const addSmartphone = (e) => {
  if (!e.target.classList.contains("btn-add")) {
    return
  }
  const phone = createPhoneData(e.target.dataset);
  if (existingPhone(phone)) {
    addUnitPhone(phone);
  } else {
    createCartPhone(phone)
  }
  updateCart();
}

const createPhoneData = (phone) => {
  const {
    id,
    name,
    bid,
    img
  } = phone
  return {
    id,
    name,
    bid,
    img
  }
}

const existingPhone = (phone) => {
  return cart.find((item) => item.id === phone.id)
}

const createCartPhone = (phone) => {
  cart = [...cart, {
    ...phone,
    quantity: 1
  }]
}

const addUnitPhone = (phone) => {
  cart = cart.map((cartPhone) => {
    return cartPhone.id === phone.id ? {
      ...cartPhone,
      quantity: cartPhone.quantity + 1
    } : cartPhone;
  })
}


const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    handleMinus(e.target.dataset.id)
  } else if (e.target.classList.contains("up")) {
    handlePlus(e.target.dataset.id)
  }
  updateCart();
}


const handleMinus = (id) => {
  const existingCartPhone = cart.find((phone) => phone.id === id)
  if (existingCartPhone.quantity === 1) {
    removePhone(existingCartPhone)
    return;
  }
  discountPhoneUnit(existingCartPhone);
}


const discountPhoneUnit = (existingPhone) => {
  cart = cart.map((phone) => {
    return phone.id === existingPhone.id ? {
      ...phone,
      quantity: Number(phone.quantity) - 1
    } : phone
  })
}

const removePhone = (existingPhoneInCart) => {
  cart = cart.filter((phone) => phone.id !== existingPhoneInCart.id)
  updateCart();
}

const handlePlus = (id) => {
  const existingCardPhone = cart.find((phone) => phone.id === id);
  addUnitPhone(existingCardPhone)
}

const resetCart = () => {
  cart = [];
  updateCart();
}

const completeCart = (confirm, succ) => {
  if (!cart.length) return;
  if (window.confirm(confirm)) {
    resetCart();
    alert(succ)
  }
}



const completeBuy = () => {
  completeCart("Do you want to complete the purchase?", "Thanks for your purchase!")
}

const deleteCart = () => {
  completeCart("Do you want to empty the cart?", "There are no products in the cart")
}

export const cartInit = () => {
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showCartTotal);
  disableBtn(btnBuy);
  disableBtn(btnDelete);
  smartPhoneContainer.addEventListener("click", addSmartphone);
  cartContainer.addEventListener("click", handleQuantity);
  btnBuy.addEventListener("click", completeBuy);
  btnDelete.addEventListener("click", deleteCart);
}