// DOM Elements
const bandColorBtns = document.querySelectorAll(".bandColorBtn");
const mainImage = document.getElementById("mainImage");
const quantityContent = document.getElementById("quantity");
const wristBtns = document.querySelectorAll(".wrist");
const decreaseBtn = document.getElementById("decrease-btn");
const increaseBtn = document.getElementById("increase-btn");
const addToCartBtn = document.getElementById("add-to-cart");
const itemsCount = document.getElementById("items-count");
const checkoutButtonSection = document.getElementById(
  "checkout-button-section"
);
const cartTableBody = document.getElementById("cart-items");
const totalQuantityShow = document.getElementById("totalQuantityShow");
const totalPriceShow = document.getElementById("totalPriceShow");

// Initial States
let selectedColor = "Purple";
let selectedSize = "S";
let price = "";
let quantity = Number(quantityContent.textContent);
let itemImg = "./images/img_1.png";
let itemName = "Classy Modern Smart Watch";
let cartItems = [];

// Helper Functions
const updateQuantityDisplay = () => {
  quantityContent.innerText = quantity;
};

const updateMainImage = (index) => {
  mainImage.src = `./images/img_${index + 1}.png`;
  itemImg = `./images/img_${index + 1}.png`;
};

const clearClassFromElements = (elements, classNames) => {
  elements.forEach((element) => {
    classNames.forEach((className) => element.classList.remove(className));
  });
};

const renderCart = () => {
  let totalQuantity = 0;
  let totalPrice = 0;

  cartTableBody.innerHTML = ""; // Clear existing cart rows

  cartItems.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("border-b");

    row.innerHTML = `
      <td class="py-2 px-4 md:flex md:items-center gap-2">
        <img src="${item.itemImg}" alt="${
      item.itemName
    }" class="w-16 h-16 object-cover rounded-md" />
        <span>${item.itemName}</span>
      </td>
      <td class="py-2 px-4">${item.color}</td>
      <td class="py-2 px-4">${item.size}</td>
      <td class="py-2 px-4">${item.quantity}</td>
      <td class="py-2 px-4">$${(item.price * item.quantity).toFixed(2)}</td>
    `;

    cartTableBody.appendChild(row);

    totalQuantity += Number(item.quantity);
    totalPrice += Number(item.price) * Number(item.quantity);
  });

  totalQuantityShow.innerText = totalQuantity;
  totalPriceShow.innerText = `$${totalPrice.toFixed(2)}`;
};

// Event Listeners
bandColorBtns.forEach((button, index) => {
  button.addEventListener("click", () => {
    clearClassFromElements(bandColorBtns, [
      "outline-color-816BFF",
      "outline-color-1FCEC9",
      "outline-color-4B97D3",
      "outline-color-3B4747",
    ]);

    const outlineColorClasses = [
      "outline-color-816BFF",
      "outline-color-1FCEC9",
      "outline-color-4B97D3",
      "outline-color-3B4747",
    ];

    selectedColor = ["Purple", "Cyan", "Blue", "Black"][index];
    button.classList.add(outlineColorClasses[index]);
    updateMainImage(index);
  });
});

wristBtns.forEach((button) => {
  button.addEventListener("click", () => {
    clearClassFromElements(wristBtns, [
      "wrist-border-color",
      "wrist-text-active",
    ]);

    button.classList.add("wrist-border-color");
    const [sizeSpan, priceSpan] = button.querySelectorAll("span");
    sizeSpan.classList.add("wrist-text-active");
    priceSpan.classList.add("wrist-text-active");

    selectedSize = sizeSpan.textContent;
    price = priceSpan.textContent.slice(1);
  });
});

decreaseBtn.addEventListener("click", () => {
  if (quantity > 0) quantity--;
  updateQuantityDisplay();
});

increaseBtn.addEventListener("click", () => {
  quantity++;
  updateQuantityDisplay();
});

addToCartBtn.addEventListener("click", () => {
  if (quantity < 1) return;

  cartItems.push({
    itemImg,
    itemName,
    color: selectedColor,
    size: selectedSize,
    quantity,
    price: Number(price),
  });

  itemsCount.innerText = cartItems.length;
  checkoutButtonSection.style.display = "block";
  renderCart();
});
