const search = function () {
  const input = document.querySelector(".search-block > input");
  const searchBtn = document.querySelector(".search-block > button");

  const onInputChange = (e) => {
    console.log(e.target.value);
  };

  input.addEventListener("click", onInputChange);
};
search();
