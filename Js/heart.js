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

  var FavoriteAnimes = localStorage.getItem('AnimeDataKey');
  
  if (document.querySelector(".heart").checked === true) {
    
    FavoriteAnimes = [animeId]
    localStorage.setItem('checked ' + animeId, true);
    localStorage.setItem('AnimeDataKey', JSON.stringify(FavoriteAnimes ));
    console.log(localStorage.getItem('AnimeDataKey'));
  }

  else
  {
    localStorage.removeItem('checked ' + animeId, true);
    localStorage.removeItem('AnimeDataKey', JSON.stringify(FavoriteAnimes ));
  }

  const checked = localStorage.getItem('checked ' + animeId);

  console.log(checked == "true")
  console.log(localStorage);
}

function favoritesManga(){

  if (document.querySelector(".heart").checked === true) {
    localStorage.setItem('checked ' + mangaId, true);
    localStorage.setItem("Favorites Manga" + mangaId, mangaId);
  }
  else
  {
    localStorage.setItem('checked ' + mangaId, false);
    localStorage.removeItem("Favorites Manga " + mangaId);
  }
  const checked = localStorage.getItem('checked ' + mangaId);

  console.log(localStorage);
}


function favoritesChar(){

  if (document.querySelector(".heart").checked === true) {
    localStorage.setItem('checked ' + charId, true);
    localStorage.setItem("Favorites " + charId, charId);
  }
  else
  {
    localStorage.setItem('checked ' + charId, false);
    localStorage.removeItem("Favorites " + charId);
  }
  const checked = localStorage.getItem('checked ' + charId);

  console.log(checked == "true")
  console.log(localStorage);
}

function favoritesPerson(){

  if (document.querySelector(".heart").checked === true) {
    localStorage.setItem('checked ' + personId, true);
    localStorage.setItem("Favorites " + personId, personId);
  }
  else
  {
    localStorage.setItem('checked ' + personId, false);
    localStorage.removeItem("Favorites " + personId);
  }
  const checked = localStorage.getItem('checked ' + personId);

  console.log(checked == "true")
  console.log(localStorage);
}