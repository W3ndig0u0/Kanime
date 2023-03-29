let animeId = sessionStorage.getItem("AnimeID");
let mangaId = sessionStorage.getItem("mangaId");
let charId = sessionStorage.getItem("charId");
// Update sessionStorage values
let newAnimeId;
let newMangaId;
let newCharId;

window.addEventListener("load", (event) => {
  setTimeout(function (){
  
      if (localStorage.getItem('checked ' + animeId) == "true" || localStorage.getItem('checked ' + mangaId) == "true" || localStorage.getItem('checked ' + charId) == "true")
       {
        document.querySelector(".heart").checked = true;
      }
      else
      {  
        document.querySelector(".heart").checked = false;
      }
    }, 3200)
});


function favoritesAnime(){
  console.log(localStorage);

  if (document.querySelector(".heart").checked === true) {

    localStorage.setItem('checked ' + animeId, true);
    localStorage.setItem("Favorite Animes " + animeId,  animeId);
  }
  else
  {
    localStorage.removeItem('checked ' + animeId, true);
    localStorage.removeItem("Favorite Animes " + animeId, animeId);
  }

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

  console.log(localStorage);
}