const cart = () => {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.querySelector("#modal-cart");
  const closeBtn = document.querySelector(".modal-close");
  const goodsContainer = document.querySelector(".long-goods-list");
  const cartTable = document.querySelector(".cart-table__goods");
  const modalForm = document.querySelector(".modal-form");
  const modalInput = document.querySelectorAll(".modal-input");

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.filter((good) => good.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.map((good) => {
      if (good.id === id) {
        good.count++;
      }
      return good;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.map((good) => {
      if (good.id === id && good.count > 0) {
        good.count--;
      }
      return good;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem("goods"));
    const clickedGoods = goods.find((good) => good.id === id);
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    if (cart.some((good) => good.id === clickedGoods.id)) {
      cart.map((good) => {
        if (good.id === clickedGoods.id) {
          good.count++;
        }
        return good;
      });
    } else {
      clickedGoods.count = 1;
      cart.push(clickedGoods);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const totalPrice = (data) => {
    const totalPriceValue = document.querySelector(".card-table__total");

    data
      ? (totalPriceValue.textContent = `${[...data].reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.price * currentValue.count,
          0
        )} $`)
      : "0$";
  };

  const renderCartGoods = (goods) => {
    cartTable.innerHTML = "";
    goods.forEach(({ name, price, count, id }) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${name}</td>
        <td>${price}$</td>
        <td><button class="cart-btn-minus"">-</button></td>
        <td>${count}</td>
        <td><button class="cart-btn-plus"">+</button></td>
        <td>${+price * +count}$</td>
        <td><button class="cart-btn-delete"">x</button></td>
      `;
      cartTable.append(tr);

      tr.addEventListener("click", (e) => {
        if (e.target.classList.contains("cart-btn-minus")) {
          minusCartItem(id);
        } else if (e.target.classList.contains("cart-btn-plus")) {
          plusCartItem(id);
        } else if (e.target.classList.contains("cart-btn-delete")) {
          deleteCartItem(id);
        }
      });

      totalPrice(goods);
    });
  };

  cartBtn.addEventListener("click", () => {
    const cartArray = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    renderCartGoods(cartArray);
    cart.style.display = "flex";
  });

  cart.addEventListener("click", (e) => {
    if (!e.target.closest(".modal") && e.target.classList.contains("overlay")) {
      cart.style.display = "";
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cart.style.display = "";
    }
  });

  closeBtn.addEventListener("click", () => {
    cart.style.display = "";
  });

  if (goodsContainer) {
    goodsContainer.addEventListener("click", (e) => {
      if (e.target.closest(".add-to-cart")) {
        const buttonToCart = e.target.closest(".add-to-cart");
        const goodId = buttonToCart.dataset.id;
        addToCart(goodId);
      }
    });
  }

  const sendForm = (valueName, ValuePhone) => {
    const cartArray = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        cart: cartArray,
        name: valueName,
        phone: ValuePhone,
      }),
    }).then(
      () => ((cart.style.display = ""), window.localStorage.removeItem("cart"))
    );
  };

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendForm(modalInput[0].value, modalInput[1].value);
  });
};

cart();
