const search = () => {
  const input = document.querySelector(".search-block > input");
  const searchBtn = document.querySelector(".search-block > button");

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

  const getData = (value) => {
    fetch("https://shop-f678e-default-rtdb.firebaseio.com/db.json")
      .then((response) => response.json())
      .then((data) => {
        const array = data.filter((good) =>
          good.name.toLowerCase().includes(value.toLowerCase())
        );
        localStorage.setItem("goods", JSON.stringify(array));
        if (window.location.pathname !== "/goods.html") {
          window.location.href = "/goods.html";
        } else {
          render(array);
        }
      });
  };

  input.addEventListener("input", (e) => {
    getData(input.value);
  });
};

search();
