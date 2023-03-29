document.querySelector("header").style.display = "none";
document.querySelector("main").style.display = "none";
document.querySelector("footer").style.display = "none";

window.addEventListener("load", (event) => {
  setTimeout(function (){
    document.querySelector(".loader").parentElement.removeChild(document.querySelector(".loader"));
    document.querySelector("header").style.display = "block";
    document.querySelector("main").style.display = "block";
    document.querySelector("footer").style.display = "block";
  }, 3100)
});