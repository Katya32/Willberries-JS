const cart = () => {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.querySelector("#modal-cart");
  const closeBtn = document.querySelector(".modal-close");

  const onHandleClick = () => {
    cart.style.display = "flex";
  };

  const onHandleClose = () => {
    cart.style.display = "";
  };

  cartBtn.addEventListener("click", onHandleClick);
  closeBtn.addEventListener("click", onHandleClose);
};

cart();
