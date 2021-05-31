const searchBtn = document.querySelector(".search-btn")
const cancelBtn = document.querySelector(".cancel-btn")
const menuLinks = document.querySelector(".menuLinks")
const searchBox = document.querySelector(".search-bar")


searchBtn.onclick = () =>{
  menuLinks.classList.add("active");
  cancelBtn.classList.add("active");
  searchBtn.classList.add("active");
  searchBox.classList.add("active");
}

cancelBtn.onclick = () =>{
  searchBtn.classList.remove("active");
  cancelBtn.classList.remove("active");
  searchBox.classList.remove("active")
  menuLinks.classList.remove("active")
}