function openNavbar() {
    document.getElementById("hamburgerNavbarLinks").style.width = "100%";
    document.querySelector("body").classList.toggle("active");
  }
  
  function closeNavbar() {
    document.getElementById("hamburgerNavbarLinks").style.width = "0%";
    document.querySelector("body").classList.toggle("active");
  }

document.querySelector(".search-btn").onclick = function() {
    document.getElementById("myModal").style.display = "block";
    document.querySelector("body").style.overflowY = "hidden";
}

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
        document.querySelector("body").style.overflowY = "auto";
    }
}
