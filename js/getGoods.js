const getGoods = () => {
  const links = document.querySelectorAll(".navigation-link");

  const getData = () => {
    fetch("/db/db.json")
      .then((response) => response.json())
      .then((data) => {
        return localStorage.setItem("goods", JSON.stringify(data));
      });
  };

  const onLinkClick = (e) => {
    e.preventDefault();
    getData();
  };

  links.forEach((link) => link.addEventListener("click", onLinkClick));
};

getGoods();
