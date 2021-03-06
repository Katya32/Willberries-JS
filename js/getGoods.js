const getGoods = () => {
  const links = document.querySelectorAll(".navigation-link");
  const moreBtn = document.querySelector(".more");

  const render = (goods) => {
    const goodsContainer = document.querySelector(".long-goods-list");
    goodsContainer.innerHTML = "";
    goods.forEach(({ name, label, img, price, id, description }) => {
      const goodBlock = document.createElement("div");
      goodBlock.classList.add("col-lg-3");
      goodBlock.classList.add("col-sm-6");
      goodBlock.innerHTML = `<div class="goods-card">
        <span class="label ${label ? null : "d-none"}">${label}</span>
        <img src="db/${img}" alt="${name}" class="goods-image">
        <h3 class="goods-title">${name}</h3>
        <p class="goods-description">${description}</p>
        <button class="button goods-card-btn add-to-cart" data-id="${id}">
          <span class="button-price">${price}$</span>
        </button>
      </div>`;
      goodsContainer.append(goodBlock);
    });
  };

  const getData = (value, category) => {
    fetch("https://shop-f678e-default-rtdb.firebaseio.com/db.json")
      .then((response) => response.json())
      .then((data) => {
        const array = category
          ? data.filter((item) => item[category] === value)
          : data;
        localStorage.setItem("goods", JSON.stringify(array));
        if (window.location.pathname !== "/goods.html") {
          window.location.href = "/goods.html";
        } else {
          render(array);
        }
      });
  };

  links.forEach((link) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const linkValue = link.textContent;
      const category = link.dataset.field;
      getData(linkValue, category);
    })
  );

  if (
    localStorage.getItem("goods") &&
    window.location.pathname === "/goods.html"
  ) {
    render(JSON.parse(localStorage.getItem("goods")));
  }

  if (moreBtn) {
    moreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      getData();
    });
  }
};

getGoods();
