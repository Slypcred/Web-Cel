import {
  smartPhoneData,
  appState
} from "../data/data.js";


export const smartPhoneContainer = document.getElementById("smartphone-container");

const categoriesContainer = document.querySelector(".categories");

const categoriesList = document.querySelectorAll(".category");

const btnShowMore = document.getElementById("btn-more");


const phoneCard = (phone) => {
  const {
    id,
    name,
    cpu,
    memory,
    memoryRam,
    mainCamera,
    selfieCamera,
    display,
    bid,
    cellImg,
  } = phone;
  return `
    <div class="product" id="product">
        <img src=${cellImg} alt=${name} />
        
            <div class="product-name">
                <h3>${name}</h3></div>

            <div class="product-info">
                    <div class="product-spec">
                    <h4>CPU: ${cpu}</h4>
                    <h4>Memory: ${memory}</h4>
                    <h4>Memory Ram: ${memoryRam}</h4>
                    <h4>Main Camera: ${mainCamera}</h4>
                    <h4>Selfie Camera: ${selfieCamera}</h4>
                    <h4>Display: ${display}</h4>
                    </div>

                    <div class="product-bid">
                    <h3>Price: ${bid}  Dollars</h3></div>
                    <div>
                    <button class="btn-add"
                    data-id='${id}'
                    data-name='${name}'
                    data-bid='${bid}'
                    data-img='${cellImg}'>Add</button>
                    </div>
            </div>
    </div>`;
}


const renderPhones = (productsList) => {
  smartPhoneContainer.innerHTML += productsList
    .map(phoneCard)
    .join("");
};

const lastProduct = () => {
  return appState.currentProductsIndex === appState.productsLimit - 1;
};

const showMoreProducts = () => {
  appState.currentProductsIndex += 1;
  let {
    products,
    currentProductsIndex
  } = appState;
  renderPhones(products[currentProductsIndex]);
  if (lastProduct()) {
    btnShowMore.classList.add("hidden")
  }
};

const showMoreVisibility = () => {
  if (!appState.activeFilter) {
    btnShowMore.classList.remove("hidden");
    return;
  }
  btnShowMore.classList.add("hidden");
};


const applyFilter = ({
  target
}) => {
  if (!isInactiveFilterBtn(target)) return;
  changeFilterState(target);
  smartPhoneContainer.innerHTML = "";
  if (appState.activeFilter) {
    renderFilteredPhones();
    appState.currentProductsIndex = 0;
    return;
  }
  renderPhones(appState.products[0]);
};

const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};


const BtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};


const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  BtnActiveState(appState.activeFilter);
  showMoreVisibility(appState.activeFilter);
};


const renderFilteredPhones = () => {
  const filteredPhones = smartPhoneData.filter(
    (phone) => phone.make === appState.activeFilter
  );
  renderPhones(filteredPhones);
};


export const productInit = () => {
  renderPhones(appState.products[0]);
  btnShowMore.addEventListener("click", showMoreProducts);
  categoriesContainer.addEventListener("click", applyFilter);
}