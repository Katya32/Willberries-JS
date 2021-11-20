const cart = function () {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.querySelector("#modal-cart");
  const closeBtn = document.querySelector(".modal-close");

  const onHandleClick = () => {
    cart.style.display = "flex";
  };

  cartBtn.addEventListener("click", onHandleClick);

  const onHandleClose = () => {
    cart.style.display = "";
  };

  closeBtn.addEventListener("click", onHandleClose);
};

cart();
