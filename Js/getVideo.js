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
  const animePageBtn = document.querySelector(".animePageBtn");

  animePageBtn?.classList.add("buttonRow");
  animePageBtn?.classList.add("buttonSource");

  //! Tar bort det gamla infot
  while (animeVideo?.firstChild) {
    animeVideo.removeChild(animeVideo.firstChild);
  }
  
  while (animePageBtn?.firstChild) {
    animePageBtn.removeChild(animePageBtn.firstChild);
  }

  for (let i = 0; i < result.length; i++) {
    const episodesPlay = document.createElement("div");
    const streamingService = result[i].name;
    const firstService = result[0]?.name;
    const animeUrl = result[i].url;
    const buttonSource = document.createElement("div");
    

   const buttonSourceHTML = `
   <div class="epButton">
   <button class="${streamingService} "onclick="showPlayer(this.className)">${streamingService}</button>
   </div>
   `;
   buttonSource.innerHTML = buttonSourceHTML; 

    const episodesPlayHTML = `
      <div class="iframeContainer ${streamingService}" iframe"${streamingService}">
        <h5>${streamingService}</h5>
        <iframe id="framez" scrolling="no" src="${animeUrl}" frameborder="0" allowfullscreen></iframe>
      </div>
    `;

    episodesPlay.innerHTML = episodesPlayHTML;
    animePageBtn?.appendChild(buttonSource);
    animeVideo?.appendChild(episodesPlay);
    showPlayer(firstService);
  }
}

function showPlayer(playerId) {

  const players = document.querySelectorAll('.iframeContainer');
  for (let i = 0; i < players.length; i++) {
    players[i].style.display = 'none';
  }

  const player = document.getElementsByClassName(playerId);
  console.log(player[1]);
  player[1].style.display = 'block';
  
}


// ?Information
function ShowAnimeInfo(result){

  const animeDownloadDiv = document.querySelector(".animeDownload");
  const animeInfoDiv = document.querySelector(".animeDownloadInfo");
  const animeVideo = document.querySelector(".animePageVideo");
  const animePageBtn = document.querySelector(".animePageBtn");

  // !Tar bort det gamla infot
  while (animeInfoDiv?.firstChild) {
    animeInfoDiv.removeChild(animeInfoDiv.firstChild);
  }

  // !Tar bort det gamla infot
  while (animeDownloadDiv?.firstChild) {
    animeDownloadDiv.removeChild(animeDownloadDiv.firstChild);
  }  
  
  while (animeVideo?.firstChild) {
    animeVideo.removeChild(animeVideo.firstChild);
  }
  
  while (animePageBtn?.firstChild) {
    animePageBtn.removeChild(animePageBtn.firstChild);
  }
  

  const animeInfo = document.createElement("div");
  const animeEpisodes= document.createElement("div");
  animeEpisodes.classList.add("buttonRow")

  const animeId = result.id
  const type = result.type
  const genres = JSON.stringify(result.genres);
  const episodeOne = result.episodes[0].id;
  let episodeNr;
  // ?Episoder knapp
  for (let i = 0; i < result.episodes.length; i++) {
    const episode = document.createElement("div");

    episodeNr = result.episodes[i].number;
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