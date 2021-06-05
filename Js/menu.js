function openNavbar() {
    document.getElementById("closeButton").style.display = "block"; 
    document.getElementById("hamburgerNavbarLinks").style.display = "block";
    document.querySelector("body").classList.toggle("active");  
    document.getElementById("hamburgerNavbarLinks").style.width = "100%";
}

function closeNavbar() {
    document.getElementById("hamburgerNavbarLinks").style.width = "0%";
    document.getElementById("closeButton").style.display = "none";
    document.querySelector("body").classList.toggle("active");
}


document.querySelector(".search-btn").onclick = function() {
    document.getElementById("myModal").style.display = "block";
    document.querySelector("body").style.overflow = "hidden";
}

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
        document.querySelector("body").style.overflow = "auto";
    }
}