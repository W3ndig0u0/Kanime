var modal = document.querySelector("myModal");
var modalImg = document.getElementById("img");
var captionText = document.getElementById("caption");
var close = document.getElementsByClassName("close")[0];
let animeCards = document.getElementsByClassName("animeCard");


setTimeout(function(){
  for (let i = 0; i < animeCards.length; i++) {
    animeCards[i].addEventListener('click', clickCard)
    animeCards[i].addEventListener('mouseover', hoverCardIn)
    animeCards[i].addEventListener('mouseleave', hoverCardOut)
  }
},1000)


function clickCard(event) {
  console.log(event.target.parentNode.parentNode);
  // modal.style.display = "block";
  // modalImg.src = item.src;
  // captionText.innerHTML = item.alt;
}

function hoverCardIn(event) { 
  
  if ((event.target.childNodes[5] !== undefined))
  {
    if (event.target.childNodes[5].classList.contains("playWrapper"))
    {
        event.target.parentNode.childNodes[5].style.opacity = "1";
    }
  }
  
  else if(event.target.classList.contains("playWrapper"))
    {
      event.target.style.opacity = "1";
    }
}

function hoverCardOut(event) {
  if (event.target.childNodes[1].childNodes[5] !== undefined) {    
    if (event.target.childNodes[1].childNodes[5].classList.contains("playWrapper"))
    {
      event.target.childNodes[1].childNodes[5].style.opacity = "0";
    }
  }  
  
  if (event.target.childNodes[1].childNodes[7] !== undefined) {    
    if (event.target.childNodes[1].childNodes[7].classList.contains("playWrapper"))
    {
      event.target.childNodes[1].childNodes[7].style.opacity = "0";
    }
  }
  
  else if(event.target.classList.contains("playWrapper"))
  {
    event.target.style.opacity = "0";
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