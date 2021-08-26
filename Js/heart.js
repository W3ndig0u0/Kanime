let animeId = sessionStorage.getItem("AnimeID");
let mangaIdHeart = sessionStorage.getItem("mangaId");
let personId = sessionStorage.getItem("personId");
let charId = sessionStorage.getItem("charId");



window.addEventListener("load", (event) => {
  setTimeout(function (){
      if (localStorage.getItem('checked ' + animeId) == "true" || localStorage.getItem('checked ' + mangaIdHeart) == "true" || localStorage.getItem('checked ' + charId) == "true" || localStorage.getItem('checked ' + personId) == "true")
       {
        document.querySelector(".heart").checked = true;
      }
      else
      {  
        document.querySelector(".heart").checked = false;
      }
    }, 1600)
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
    // localStorage.clear();
  }

  const checked = localStorage.getItem('checked ' + animeId);

  console.log(localStorage);
}

function favoritesManga(){

  if (document.querySelector(".heart").checked === true) {
    localStorage.setItem('checked ' + mangaIdHeart, true);
    localStorage.setItem("Favorites Manga " + mangaIdHeart, mangaIdHeart);
  }
  else
  {

    localStorage.removeItem('checked ' + mangaIdHeart, true);
    localStorage.removeItem("Favorites Manga " + mangaIdHeart, mangaIdHeart);
  }
  const checked = localStorage.getItem('checked ' + mangaIdHeart);

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