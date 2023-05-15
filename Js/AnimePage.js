let animeCards = document.getElementsByClassName("imgCard");
// let gallery = document.getElementsByClassName("vcCard2");

  function initializeAnimeCards() {
  for (let i = 0; i < animeCards.length; i++) {
    animeCards[i].addEventListener('mouseover', hoverCardIn)
    animeCards[i].addEventListener('mouseleave', hoverCardOut)
  }
}

function hoverCardIn(event) {
   if(event.target.classList.contains("playWrapper"))
    {
      event.target.style.opacity = "1";
    }
}

function hoverCardOut(event) {
  if (event.target.childNodes[1]?.childNodes[7]?.classList.contains("playWrapper"))
  {
    event.target.childNodes[1].childNodes[7].style.opacity = "0";
  }    
  else if (event.target.childNodes[1]?.childNodes[5]?.classList.contains("playWrapper"))
  {
    event.target.childNodes[1].childNodes[5].style.opacity = "0";
  }
  else if (event.target.childNodes[1]?.childNodes[3]?.childNodes[3].classList.contains("playWrapper"))
  {
    event.target.childNodes[1]?.childNodes[3]?.childNodes[3]?.style.opacity = "0";
  }

}


window.addEventListener('load', function() {
  setTimeout(initializeAnimeCards, 4300);
});
