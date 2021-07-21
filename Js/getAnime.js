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
    
    if (result.reviews.length === 0) {
      noAnimeCommentsPage();
    }
    AnimeCommentsPage(result.reviews);
  })
}

function capitalizeFirstLetter(string) {
  if (string === null) {
    return undefined;
  }
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
  const title = result.title;

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

  const rank = result.rank;
  const popularity = result.popularity;
  const score = result.score;
  const startDate = result.start_date;
  const synopsis = result.synopsis;

  const trailer_url = result.trailer_url;

  const newTitle = capitalizeFirstLetter(title);
  const newTitleEn = capitalizeFirstLetter(titleEn);

  // !Skapar html
  const PageInnerHTML = 
  `
  <div>
        <img
        src=${thumbnail}
        alt=${newTitleEn}/>
      </div>
        <hr>
        <p class="cardSynopsis">Title: ${newTitle}</p>
        <p class="cardSynopsis">TitleJp: ${newTitleEn}</p>
        <p class="cardSynopsis">Type: ${type}</p>

        <hr>
        <p class="cardSynopsis">genres: ${genres}, ${genres1}, ${genres2}</p>
        
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

        <iframe src=${trailer_url} title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        </div>

        <a href=${MalURL} target="_blank" title="noopener">MyAnimeList Link<a/>
  </div>
    `;
        
    AnimePageDiv.innerHTML = PageInnerHTML;
    AnimePageSection.appendChild(AnimePageDiv)
    document.querySelector(".animePage").appendChild(AnimePageSection)
}

function dateConverser(dates) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  var str = dates;
  var newDate =  str.slice(5);
  var mounth =  12;

  if (newmounth =  newDate.slice(0,1) == "0") {
    var mounth =  newDate.slice(1,2);
  }
  else{
    var mounth =  newDate.slice(0,2);
  }
  var date =  newDate.slice(3,5);
  var hour =  newDate.slice(6,11);

  return [date + " " +  monthNames[mounth - 1] + ", " + hour]

}


function AnimeCommentsPage(result) {
  for (let i = 0; i < result.length; i++) {
  const commentDiv = document.createElement('div');
  commentDiv.classList.add("commentDiv")
    const content = result[i].content;
    const date = result[i].date;
    const votes = result[i].helpful_count;
    const reviewerImg = result[i].reviewer.image_url;
    const reviewerName = result[i].reviewer.username;
    const url = result[i].reviewer.url;
    
    // !Skapar html
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <a href=${url} target="_blank" title="noopener">
        <img class="reviewerImg" src=${reviewerImg} alt=${reviewerName + date}>
        <p class="reviewName">${reviewerName}</p>
        <a/>
      </div>
      
      <div class="reviewInfo">
      <div class="reviewInfoTop">
        <span class="reviewDate">${dateConverser(date)}</span>
      </div>
        <p class="revireContent">${truncate(content, 900)}</p>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".animePageComments").appendChild(commentDiv)
  }
}

function noAnimeCommentsPage() {
  const commentDiv = document.createElement('div');
    // !Skapar html
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Anime Dosn't have any Reviwes/Comments yet...<h1/>
      <p>Sorry D:<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".animePageComments").appendChild(commentDiv)
}

getAnime();
getAnimeComments();