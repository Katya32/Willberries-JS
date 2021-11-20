const search = () => {
  const input = document.querySelector(".search-block > input");
  const searchBtn = document.querySelector(".search-block > button");

  const onInputChange = (e) => {
    console.log(input.value);
  };

  input.addEventListener("click", onInputChange);
};
search();
