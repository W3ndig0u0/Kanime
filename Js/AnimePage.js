var modal = document.querySelector("myModal");
var modalImg = document.getElementById("img");
var captionText = document.getElementById("caption");
var close = document.getElementsByClassName("close")[0];
let animeCards = document.getElementsByClassName("cardImage");


setTimeout(function(){
  for (let i = 0; i < animeCards.length; i++) {
    animeCards[i].addEventListener('click', clickCard)
  }
},1000)

setTimeout(function(){
  for (let i = 0; i < animeCards.length; i++) {
    animeCards[i].addEventListener('mouseover', hoverCardIn)
  }
},1000)

setTimeout(function(){
  for (let i = 0; i < animeCards.length; i++) {
    animeCards[i].addEventListener('mouseleave', hoverCardOut)
  }
},1000)


function clickCard(event) {
  // console.log(event.target.parentNode.parentNode);
  // modal.style.display = "block";
  // modalImg.src = item.src;
  // captionText.innerHTML = item.alt;
}

function hoverCardIn(event) { 
  if ((event.target.childNodes[5] !== undefined))
  {
      event.target.parentNode.childNodes[5].style.opacity = "1";
  }
  
  else
  {
    event.target.style.opacity = "1";
  }
}

function hoverCardOut(event) {
  if (event.target.childNodes[7] === undefined) {
    event.target.childNodes[5].style.opacity = "0";
  }
  else{
    event.target.childNodes[7].style.opacity = "0";
  }
}

// close.onclick = function() { 
//   modal.style.display = "none";
// }

// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }