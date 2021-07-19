var modal = document.querySelector("myModal");
var modalImg = document.getElementById("img");
var captionText = document.getElementById("caption");
var close = document.getElementsByClassName("close")[0];
let animeCards = document.getElementsByClassName("cardImage");


setTimeout(function(){
  for (let i = 0; i < animeCards.length; i++) {
    animeCards[i].addEventListener('click', myFunction)
  }
},1000)


function myFunction(event) {
  console.log(event.target.parentNode.parentNode);
  // modal.style.display = "block";
  // modalImg.src = item.src;
  // captionText.innerHTML = item.alt;
}

// close.onclick = function() { 
//   modal.style.display = "none";
// }

// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }