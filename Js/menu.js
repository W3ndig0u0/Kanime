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