import articles from "./data.js";

let currentPageNumber = 1;
const numberOfArticlesPerPage = 6;
const numberOfPages = Math.ceil(articles.length / numberOfArticlesPerPage);

function clickDropdownMenuButton() {
  const dropdownMenuItems = document.querySelector(".dropdown-items");

  if (
    dropdownMenuItems.style.display === "none" ||
    dropdownMenuItems.style.display === ""
  ) {
    dropdownMenuItems.style.display = "block";
  } else {
    dropdownMenuItems.style.display = "none";
  }
}

function renderArticles() {
  const articlesSection = document.querySelector(".articles");
  articlesSection.innerHTML = "";
  for (
    let i = (currentPageNumber - 1) * numberOfArticlesPerPage;
    i < Math.min(currentPageNumber * numberOfArticlesPerPage, articles.length);
    i++
  ) {
    const articleElement = document.createElement("article");
    articleElement.className = "article";

    articleElement.innerHTML = `
      <img src="${articles[i].imgSrc}" class="article-img" />
      <h3 class="article-title">${articles[i].title}</h3>
      <p class="article-text">${articles[i].text}</p>
      <p class="date-and-category">${articles[i].date} &#x2022; ${articles[i].category}</p>
    `;

    articlesSection.appendChild(articleElement);
  }
}

function renderPaginationButtons() {
  const paginationSection = document.querySelector(".pagination");
  paginationSection.innerHTML = "";
  // Add previous button
  const previousButton = document.createElement("button");
  previousButton.className = "pagination-button";
  previousButton.innerText = "Previous";
  previousButton.addEventListener("click", clickPageNumberButton);
  paginationSection.appendChild(previousButton);

  // Display page number
  for (let i = 0; i < numberOfPages; i++) {
    const pageNumberButton = document.createElement("button");
    pageNumberButton.className = "pagination-button";
    pageNumberButton.innerText = i + 1;
    pageNumberButton.addEventListener("click", clickPageNumberButton);
    if (pageNumberButton.textContent === currentPageNumber.toString()) {
      pageNumberButton.id = "current-page";
    }
    paginationSection.appendChild(pageNumberButton);
  }

  // Add next button
  const nextButton = document.createElement("button");
  nextButton.className = "pagination-button";
  nextButton.innerText = "Next";
  nextButton.addEventListener("click", clickPageNumberButton);
  paginationSection.appendChild(nextButton);
}

function clickPageNumberButton(event) {
  const clickedButton = event.target;
  const buttonText = clickedButton.textContent;

  if (buttonText === "Previous") {
    if (currentPageNumber > 1) {
      currentPageNumber -= 1;
      renderArticles();
      renderPaginationButtons();
    }
  } else if (buttonText === "Next") {
    if (currentPageNumber < numberOfPages) {
      currentPageNumber += 1;
      renderArticles();
      renderPaginationButtons();
    }
  } else {
    currentPageNumber = parseInt(buttonText);
    renderArticles();
    renderPaginationButtons();
  }
}

function main() {
  // Add event listener to dropdown button
  document
    .querySelector(".navbar-dropdown-button")
    .addEventListener("click", clickDropdownMenuButton);

  // Render articles
  renderArticles();

  // Render pagination buttons
  renderPaginationButtons();
}

document.addEventListener("DOMContentLoaded", main);
