function getAnimeInfo(animeID) {
  // let animeId = sessionStorage.getItem("AnimeID");
  const url = "https://api.consumet.org/anime/gogoanime/info/";
  
  fetch(url + animeID)
  .then(response => response.json())
  .then(result => {
    ShowAnimeInfo(result);
  })
}


function getAnimeVideoDownload(animeEpisodeId) {
const urlDownload = "https://api.consumet.org/anime/gogoanime/watch/";
const urlPlayer = "https://api.consumet.org/anime/gogoanime/servers/";

  fetch(urlPlayer + animeEpisodeId)
  .then(response => response.json())
  .then(result => ShowAnimeVideoAlternatives(result)),

  fetch(urlDownload + animeEpisodeId)
  .then(response => response.json())
  .then(result => ShowAnimeDownload(result))
}

function onClickAnime(episodeID){
  getAnimeInfo(episodeID);
}

function onClickEpisode(episodeID){
  getAnimeVideoDownload(episodeID);
}

// ?Ladda ned
function ShowAnimeDownload(result) {
  const animeDownloadDiv = document.querySelector(".animeDownload");
  //?Display bara vid mobil
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    animeDownloadDiv.style.display = "block"; // set display to block if user is on a mobile device
  } else {
    animeDownloadDiv.style.display = "none"; // set display to none if user is on a PC
  }  
  const AnimeDInnerHTML = `<div>The links leads to the episode video for mobiles in order to avoid ads!</div>`;
  animeDownloadDiv.innerHTML = AnimeDInnerHTML;

    // !Tar bort det gamla infot
    while (animeDownloadDiv?.firstChild) {
      animeDownloadDiv.removeChild(animeDownloadDiv.firstChild);
    }

    for (let i = 0; i < result?.sources?.length; i++) {
    const AnimeDownload = document.createElement("div");
    const animeUrl = result.sources[i].url
    const animeQ = result.sources[i].quality
    const AnimeDInnerHTML = `<a href="${animeUrl}">>${animeQ}</a>`;

    AnimeDownload.innerHTML = AnimeDInnerHTML;
    animeDownloadDiv?.appendChild(AnimeDownload);
  }
}

// ?Alla video spelare
  function ShowAnimeVideoAlternatives(result) {
    console.log(result);
    const animeVideo = document.querySelector(".animePageVideo");

    // !Tar bort det gamla infot
    while (animeVideo?.firstChild) {
      animeVideo.removeChild(animeVideo.firstChild);
    }

    for (let i = 0; i < result.length; i++) {
    const episodesPlay = document.createElement("div");
    const streamingService = result[i].name
    const animeUrl = result[i].url
    
    // ?Show knapp

    const episodesPlayHTML = `
    <div class="iframeContainer">
     <h5>${streamingService}</h5>
     <iframe id="framez" scrolling="no" src="${animeUrl}" frameborder="0" allowfullscreen></iframe>
    </div>
    `;

    episodesPlay.innerHTML = episodesPlayHTML;
    animeVideo?.appendChild(episodesPlay);
  }
}

// ?Information
function ShowAnimeInfo(result){


  const animeInfoDiv = document.querySelector(".animeDownloadInfo");

  // !Tar bort det gamla infot
  while (animeInfoDiv?.firstChild) {
    animeInfoDiv.removeChild(animeInfoDiv.firstChild);
  }

  const animeInfo = document.createElement("div");
  const animeEpisodes= document.createElement("div");
  animeEpisodes.classList.add("buttonRow")

  const animeId = result.id
  const type = result.type
  const genres = JSON.stringify(result.genres);
  const episodeOne = result.episodes[0].id;

  // ?Episoder knapp
  for (let i = 0; i < result.episodes.length; i++) {
    const episode = document.createElement("div");

    const episodeNr = result.episodes[i].number;
    const episodeID = result.episodes[i].id;
    const episodeInnerHTML = `
    <div class="epButton">
      <button class="${episodeID}" onclick="onClickEpisode(this.className)">${episodeNr}</button>
    </div>
    `;

    episode.innerHTML = episodeInnerHTML;
    animeEpisodes.appendChild(episode);
    document.querySelector(".animeDownloadInfo")?.appendChild(animeEpisodes);
  }

  const AnimeInfoInnerHTML = `
  <div>
  <p>${animeId}</p>
  <p>${type}</p>
  <p>${removeSign(genres)}</p>
  </div>
  `;
  animeInfo.innerHTML = AnimeInfoInnerHTML;
  document.querySelector(".animeDownloadInfo")?.appendChild(animeInfo);

  // ?Deafult till ep 1
  getAnimeVideoDownload(episodeOne);
}