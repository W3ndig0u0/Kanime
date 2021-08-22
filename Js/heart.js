let animeId = sessionStorage.getItem("AnimeID");
let personId = sessionStorage.getItem("personId");
let charId = sessionStorage.getItem("charId");

window.addEventListener("load", (event) => {
  setTimeout(function (){
      if (localStorage.getItem('checked ' + animeId) == "true") {
        document.querySelector(".heart").checked = true;
      }
      else
      {  
        document.querySelector(".heart").checked = false;
      }
    }, 1550)
});


function favoritesAnime(){

  if (document.querySelector(".heart").checked === true) {

    localStorage.setItem('checked ' + animeId, true);
    localStorage.setItem("Favorite Animes " + animeId,  animeId);
  }
  else
  {
    localStorage.removeItem('checked ' + animeId, true);
    localStorage.removeItem("Favorite Animes " + animeId, animeId);
  }

  const checked = localStorage.getItem('checked ' + animeId);

  console.log(localStorage);
}

function favoritesManga(){

  if (document.querySelector(".heart").checked === true) {
    localStorage.setItem('checked ' + mangaId, true);
    localStorage.setItem("Favorites Manga " + mangaId, mangaId);
  }
  else
  {
    localStorage.removeItem('checked ' + mangaId, true);
    localStorage.removeItem("Favorites Manga " + mangaId, mangaId);
  }
  const checked = localStorage.getItem('checked ' + mangaId);

  console.log(localStorage);
}


function favoritesChar(){

  if (document.querySelector(".heart").checked === true) {
    localStorage.setItem('checked ' + charId, true);
    localStorage.setItem("Favorites Char " + charId, charId);
  }
  else
  {
    localStorage.removeItem('checked ' + charId, true);
    localStorage.removeItem("Favorites Char " + charId, charId);
  }
  const checked = localStorage.getItem('checked ' + charId);

  console.log(localStorage);
}

function favoritesPerson(){

  if (document.querySelector(".heart").checked === true) {
    localStorage.setItem('checked ' + personId, true);
    localStorage.setItem("Favorites Person " + personId, personId);
  }
  else
  {
    localStorage.removeItem('checked ' + personId, true);
    localStorage.removeItem("Favorites Person " + personId, personId);
  }
  const checked = localStorage.getItem('checked ' + personId);

  console.log(localStorage);
}