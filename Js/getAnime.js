function getAnime() {
  let animeId = sessionStorage.getItem("AnimeID");
  
  fetch("https://api.jikan.moe/v3/anime/" + animeId)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    AnimePage(result);
  })
}

function getAnimeComments() {
  let animeId = sessionStorage.getItem("AnimeID");
  
  fetch("https://api.jikan.moe/v3/anime/" + animeId + "/reviews/1")
  .then(response => response.json())
  .then(result => {
    console.log(result.reviews);
    AnimeCommentsPage(result.reviews);
  })
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};

function AnimePage(result) {
  const AnimePageSection = document.createElement('section');
  const AnimePageDiv = document.createElement('div');
  
  const thumbnail = result.image_url;

  const titleEn = result.title_english;
  const titleJp = result.title_japanese;

  const type = result.type;
  const aired = result.aired.string;
  const broadcast = result.broadcast;
  const ep = result.episodes;
  const source = result.source;
  const status = result.status;
  const premiered = result.premiered;
  const MalURL = result.url;
  const duration = result.duration;

  const producers = result.producers[0]?.name;
  const studio = result.studios[0]?.name;

  const genres = result.genres[0]?.name;
  const genres1 = result.genres[1]?.name;
  const genres2 = result.genres[2]?.name;
  const genres3 = result.genres[3]?.name;
  const genres4 = result.genres[4]?.name;

  const rank = result.rank;
  const popularity = result.popularity;
  const score = result.score;
  const startDate = result.start_date;
  const synopsis = result.synopsis;

  const trailer_url = result.trailer_url;

  const newTitleEn = capitalizeFirstLetter(titleEn);
  const newTitleJp = capitalizeFirstLetter(titleJp);

  // !Skapar html
  const PageInnerHTML = 
  `
  <div class="imgCard animeCard ImgCardSlider">
    <div class="cardImage">
        <img
        src=${thumbnail}
        alt=${newTitleEn}/>
      </div>
        </div>
          <div class="cardInfo">
        <hr>
        <p class="cardSynopsis">TitleEn: ${newTitleEn}</p>
        <p class="cardSynopsis">TitleJp: ${newTitleJp}</p>
        <p class="cardSynopsis">Type: ${type}</p>

        <hr>
        <p class="cardSynopsis">genres: ${genres}, ${genres1}, ${genres2}, ${genres3}, ${genres4}</p>
        
        <hr>
        <p class="cardSynopsis">Rank: ${rank}</p>
        <p class="cardSynopsis">popularity: ${popularity}</p>
        <p class="cardSynopsis">Score: ${score}</p>

        <hr>
        <p class="cardSynopsis">Status: ${status}</p>
        <p class="cardSynopsis">Airing: ${aired}</p>
        <p class="cardSynopsis">Premiered: ${premiered}</p>
        <p class="cardSynopsis">StartDate: ${startDate}</p>
        <p class="cardSynopsis">AiringTime: ${broadcast}</p>
        <p class="cardSynopsis">Ep Duration: ${duration}</p>

        <hr>
        <p class="cardSynopsis">Totla Ep: ${ep}</p>
        <p class="cardSynopsis">source: ${source}</p>
        <p class="cardSynopsis">studio: ${studio}</p>
        <p class="cardSynopsis">producers: ${producers}</p>

        <hr>
        <p class="cardSynopsis">Synopsis: ${synopsis}</p>

        <iframe width="560" height="315" src=${trailer_url} title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        <hr>
        <a href=${MalURL} target="_blank" title="noopener">MyAnimeList Link<a/>
    </div>
  </div>
    `;
        
    AnimePageDiv.innerHTML = PageInnerHTML;
    AnimePageSection.appendChild(AnimePageDiv)
    document.querySelector(".animePage").appendChild(AnimePageSection)
}


function AnimeCommentsPage(result) {
  for (let i = 0; i < result.length; i++) {
  const commentSection = document.createElement('section');
  const commentDiv = document.createElement('div');
    const content = result[i].content;
    const date = result[i].date;
    const votes = result[i].helpful_count;
    const reviewerImg = result[i].reviewer.image_url;
    const reviewerName = result[i].reviewer.username;
    
    // !Skapar html
    const CommentsReviewInnerHTML = 
    `
    <img src=${reviewerImg} 
    alt=${reviewerName + date}>
    <p class="cardSynopsis">UserName: ${reviewerName}</p>
    <p class="cardSynopsis">votes: ${votes}</p>
    <p class="cardSynopsis">date: ${date}</p>
    <p class="cardSynopsis">Review: ${truncate(content, 500)}</p>
    
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    commentSection.appendChild(commentDiv)
    document.querySelector(".animePageComments").appendChild(commentSection)
  }
}

getAnime();
getAnimeComments();