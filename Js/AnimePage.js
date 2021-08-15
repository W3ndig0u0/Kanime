let animeCards = document.getElementsByClassName("animeCard");

setTimeout(function(){
  for (let i = 0; i < animeCards.length; i++) {
    animeCards[i].addEventListener('mouseover', hoverCardIn)
    animeCards[i].addEventListener('mouseleave', hoverCardOut)
  }
},1000)


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
  if (event.target.childNodes[1].childNodes[3] !== undefined) {    
    if (event.target.childNodes[1].childNodes[3].classList.contains("playWrapper"))
    {
      event.target.childNodes[1].childNodes[3].style.opacity = "0";
    }
  }    
  
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