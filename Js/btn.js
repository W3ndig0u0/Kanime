const searchBtn = document.querySelector(".search-btn")
const cancelBtn = document.querySelector(".cancel-btn")
const searchBox = document.querySelector(".validate")

searchBtn.onclick = () =>{
  cancelBtn.classList.add("active");
  searchBtn.classList.add("active");
  searchBox.classList.add("active");
}

cancelBtn.onclick = () =>{
  searchBtn.classList.remove("active");
  searchBox.classList.remove("active")
  cancelBtn.classList.remove("active");
}
