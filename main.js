function clickDropdownMenuButton() {
  const dropdownMenuItems = document.querySelector(".dropdown-items");

  if (dropdownMenuItems.style.display === "none") {
    dropdownMenuItems.style.display = "block";
  } else {
    dropdownMenuItems.style.display = "none";
  }
}

document
  .getElementsByClassName("navbar-dropdown-button")[0]
  .addEventListener("click", clickDropdownMenuButton);
