function getManga() {
  let mangaId = sessionStorage.getItem("mangaId");
  
  fetch("https://api.jikan.moe/v3/manga/" + mangaId)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    MangaPage(result);
  })
}

function getMangaComments() {
  let mangaId = sessionStorage.getItem("mangaId");
  
  fetch("https://api.jikan.moe/v3/manga/" + mangaId + "/reviews/1")
  .then(response => response.json())
  .then(result => {
    console.log(result.reviews);
    
    if (result.reviews.length === 0) {
      noMangaCommentsPage();
    }
    MangaCommentsPage(result.reviews);
  })
}

function capitalizeFirstLetter(string) {
  if (string === null) {
    return undefined;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function scoreColor(score) {
  if (score >= 8.5) {
    return "#00ba41";
  }  

  else if (score >= 7.0 && score < 8.5) {
    return "#F27D16";
  }

  else if (score >= 6.0 && score < 7.0) {
    return "#C45258";
  }

  else if (score < 6.0) {
    return "#590000";
  }
}

function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};

function MangaPage(result) {
  const AnimePageSection = document.createElement('section');
  const AnimePageDiv = document.createElement('div');
  AnimePageDiv.classList.add('statePage');
  
  const thumbnail = result.image_url;

  const titleEn = result.title_english;
  const title = result.title;

  const type = result.type;
  const aired = result.published.string;
  const chapters = result.chapters;
  const volumes = result.volumes;
  const status = result.status;
  const MalURL = result.url;

  const producers = result.authors[0]?.name;
  const studio = result.authors[1]?.name;

  const genres = result.genres[0]?.name;
  const genres1 = result.genres[1]?.name;
  const genres2 = result.genres[2]?.name;

  const rank = result.rank;
  const popularity = result.popularity;
  const members = result.members;

  const score = result.score;
  const ColorScore = scoreColor(score);

  const scored_by = result.scored_by;
  const synopsis = result.synopsis;

  const newTitle = capitalizeFirstLetter(title);
  const newTitleEn = capitalizeFirstLetter(titleEn);

  // !Skapar html
  const PageInnerHTML = 
  `
    <div class="animeTop">
      <div class="animePageFlex">
        <div class="left">
          <img class="AnimePageImg"
          src=${thumbnail}
          alt=${newTitleEn}/>
        </div>
        
      <div class="right">
        <div class="titleFlex">
          <div class="titles">
            <p class="title">${newTitle}</p>
            <p class="titleJp">${newTitleEn}</p>
          </div>
          <div class="score">
            <span class="beforeState">Score: </span>
            <span class="state scoreNumber">${score}</span>
            <span class="state">${truncate(scored_by, 400)} Users</span>
          </div>
        </div>
      </div>
    </div>
    </div>

    <div class="synopsis">     
        <div class="rankInfo">
        <div>
            <span class="beforeState">Ranked: </span>
            <span class="state">${rank}</span>
          </div>
          <div>
            <span class="beforeState">Popularity: </span>
            <span class="state">${popularity}</span>
          </div>
          <div>
            <span class="beforeState">Members: </span>
            <span class="state">${members}</span>
          </div>
          <div>
          <h1 class="beforeState">Synopsis: </span>  
          <p class="state">${synopsis}</p>
        </div>
      </div>
    
    <div class="animeBottom">
      <div>
        <div class="animeInfo">
          <div>
            <span class="beforeState">Type: </span>
            <span class="state">${type}</span>
          </div>
          <div>
            <span class="beforeState">Genres: </span>
            <span class="state">${genres}, ${genres1}, ${genres2}</span>
          </div>
          <div>
            <span class="beforeState">Status: </span>
            <span class="state">${status}</span>
          </div>
        </div>

        <div class="animeInfo">
          <div>
            <span class="beforeState">Airing: </span>
            <span class="state">${aired}</span>
          </div>
          <div>
            <span class="beforeState">Total Volumes:</span>
            <span class="state">${volumes}</span>
          </div>
          <div>
            <span class="beforeState">Total Chapters:</span>
            <span class="state">${chapters}</span>
          </div>
        </div>

        <div class="animeInfo">
          <div>
            <span class="beforeState">Author: </span>
            <span class="state">${producers}</span>
          </div>
          <div>
            <span class="beforeState">Authors: </span>
            <span class="state">${studio}</span>
          </div>
        </div>
      </div>
    <div class="iframe">
        <button>
          <a href=${MalURL} title="MyAnimeList Link" target="_blank">MyAnimeList Link</a> 
        </button>
      </div>
    </div>
  </div>
    `;

    AnimePageDiv.innerHTML = PageInnerHTML;
    AnimePageSection.appendChild(AnimePageDiv)
    document.querySelector(".mangaPage").appendChild(AnimePageSection)
    document.querySelector(".score").style.backgroundColor = ColorScore;
    menuBgChange(thumbnail)
}


function menuBgChange(Imgurl)
{
  const menuBgColor1 = " rgba(2, 49, 90, 0.88),";
  const menuBgColor2 = " rgba(2, 49, 90, 0.98) "
  const menuBg = "linear-gradient(to bottom," + menuBgColor1 + menuBgColor2 + "), url("+ Imgurl +")";
  document.querySelector(".menuAnimePage").style.backgroundImage = menuBg;
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


function MangaCommentsPage(result) {
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
    document.querySelector(".mangaPageComments").appendChild(commentDiv)
  }
}

function noMangaCommentsPage() {
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
    document.querySelector(".mangaPageComments").appendChild(commentDiv)
}

getManga();
getMangaComments();