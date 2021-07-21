function getAnime() {
  let animeId = sessionStorage.getItem("AnimeID");
  
  fetch("https://api.jikan.moe/v3/anime/" + animeId)
  .then(response => response.json())
  .then(result => {console.log(result)})
}

function getAnimeVideo() {
  let animeId = sessionStorage.getItem("AnimeID");
  
  fetch("https://api.jikan.moe/v3/anime/videos" + animeId)
  .then(response => response.json())
  .then(result => {console.log(result)})
}

getAnime();
getAnimeVideo();