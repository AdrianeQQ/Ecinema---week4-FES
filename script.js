const filmsContainer = document.querySelector(".results__list");
const sliderElement = document.querySelector(".results__filter--slider");
const yearLabel = document.querySelector(".results__filter--year span");
const buttonParking = document.querySelector(".results__filter--parking");
const titleElement = document.querySelector(".search__input");
const searchBar = document.querySelector(".results__heading");

const search = async () => {
  const titleSearch = titleElement.value || "";
  searchBar.innerHTML = `Search results for <span>"${titleSearch}"</span> ${
    yearLabel.textContent !== "None"
      ? `in <span>"${yearLabel.textContent}"</span>`
      : ""
  }:`;
  filmsContainer.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 results__loading"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>`;
  const response = await fetch(
    `http://www.omdbapi.com/?${titleSearch ? `s=${titleSearch}` : "s="}${
      yearLabel.textContent !== "None" ? `&y=${yearLabel.textContent}` : ""
    }&apikey=9a872763`
  );
  const data = await response.json();
  if (data.Error) {
    filmsContainer.innerHTML = `
      <div class="results__error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 results__error--svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <h3 class="results__error--title">
          Could not find any matches related to your search.
        </h3>
        <p class="results__error--p">
          Please change the filter or reset it below.
        </p>
        <button class="results__error--btn" onClick="resetFilters()">
          Reset filter
        </button>
      </div>`;
    return;
  }
  console.log(data.Search.slice(0, 6));
  filmsContainer.innerHTML = data.Search.slice(0, 6)
    .map(
      (film) => `
      <div class="results__film">
        <div class="results__poster--container">
        ${
          film.Poster !== "N/A"
            ? `
        <img
          src="${film.Poster}"
          alt="${film.Title} Poster"
          class="results__poster"
        />`
            : `<div class="results__poster results__image--error">No poster</div>`
        }
          <div class="results__type ${
            film.Type === "movie" ? "results__movie" : "results__series"
          }">${film.Type}</div>
        </div>
        <h3 class="results__title">${film.Title}</h3>
          <div class="results__detail">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 results__svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
            <span>${film.Year}</span>
          </div>
        </ul>
      </div>
      `
    )
    .join("\n");
};

sliderElement.addEventListener("click", (e) => {
  const sliderX = sliderElement.getBoundingClientRect().x;
  const distance = (e.clientX - sliderX) / 350;
  const year = 1949 + Math.ceil(74 * distance);
  yearLabel.textContent = year;
  buttonParking.innerHTML =
    '<button class="results__filter--btn" onClick="deselectYear()">Deselect</button>';
});

const deselectYear = () => {
  yearLabel.textContent = "None";
  buttonParking.innerHTML = "";
};

const resetFilters = () => {
  deselectYear();
  titleElement.value = "";
  filmsContainer.innerHTML = "";
  searchBar.textContent = "Search for a film";
};

const modal = document.querySelector(".modal");
const hamburger = document.querySelector(".header__hamburger");

const openModal = () => {
  modal.classList.add("modal--open");
  hamburger.classList.add("open");
};

const closeModal = () => {
  modal.classList.remove("modal--open");
  hamburger.classList.remove("open");
};
