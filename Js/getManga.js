let mangaId = sessionStorage.getItem("mangaId");
function getManga() {
  
  fetch("https://api.jikan.moe/v3/manga/" + mangaId)
  .then(response => response.json())
  .then(result => {
    MangaPage(result);
  })
  .catch(error => {
    getManga();
  })
}


function getMangaChar() {

  fetch("https://api.jikan.moe/v3/manga/" + mangaId + "/characters")
  .then(response => response.json())
  .then(result => {
    if (result.characters.length === 0) {
      noPageCharachter();
    }

    MangaPageChar(result);
  })
  .catch(error => {
    console.error(error);
    getMangaChar();
  })
}

function getMangaGallery() {
  fetch("https://api.jikan.moe/v3/manga/" + mangaId + "/pictures")
  .then(response => response.json())
  .then(result => {
    if (result.pictures.length === 0) {
      noPageGallery();
    }
      MangaPageGallery(result);
  })
  .catch(error => {
    console.error(error);
    getMangaGallery();
  })
}

function getMangaRecommendations() {
  
  fetch("https://api.jikan.moe/v3/manga/" + mangaId + "/recommendations")
  .then(response => response.json())
  .then(result => {
    if (result.recommendations.length === 0) {
      noMangaRecommendations();
    }
    MangaRecommendations(result);
  })
  .catch(error => {
    console.error(error);
    getMangaRecommendations();
  })
}


function getMangaComments() {
  let mangaId = sessionStorage.getItem("mangaId");
  
  fetch("https://api.jikan.moe/v3/manga/" + mangaId + "/reviews/1")
  .then(response => response.json())
  .then(result => {
    if (result.reviews.length === 0) {
      noMangaCommentsPage();
    }
    MangaCommentsPage(result.reviews);
  })
  .catch(error => {
    getMangaComments();
  })
}

function getMangaNews() {
  let mangaId = sessionStorage.getItem("mangaId");
  
  fetch("https://api.jikan.moe/v3/manga/" + mangaId + "/news")
  .then(response => response.json())
  .then(result => {
    if (result.articles.length === 0) {
      noMangaNews();
    }
      MangaNews(result);
  })
  .catch(error => {
    console.error(error);
    getMangaNews();
  })
}

function capitalizeFirstLetter(string) {
  if (string === null) {
    return undefined;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function scoreColor(score) {
  if (score >= 9) {
    return "#00ba41";
  }  

  else if (score >= 8 && score < 9) {
    return "#91ca0c";
  }

  else if (score >= 7 && score < 8) {
    return "#F27D16";
  }

  else if (score >= 6 && score < 7) {
    return "#ca450c";
  }

  else if (score >= 5 && score < 6) {
    return "#AE0045";
  }

  else if (score < 5.0) {
    return "#590000";
  }
}
function truncate(str, n){
  if (str === null || str === undefined) {
    return "Null"
  }
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};

function MangaPage(result) {
  const AnimePageSection = document.createElement('section');
  const AnimePageDiv = document.createElement('div');
  AnimePageDiv.classList.add('statePage');
  
  const thumbnail = result.image_url;

  const titleEn = result.title_japanese;
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

            
            <div id="main-content">
  <div>
    <input type="checkbox" id="checkbox" class="heart" onclick="favoritesManga()" />
    <label for="checkbox">
      <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
        <g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
          <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" id="heart" fill="#AAB8C2"/>
          <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>

          <g id="grp7" opacity="0" transform="translate(7 6)">
            <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/>
            <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/>
          </g>

          <g id="grp6" opacity="0" transform="translate(0 28)">
            <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/>
            <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/>
          </g>

          <g id="grp3" opacity="0" transform="translate(52 28)">
            <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/>
            <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/>
          </g>

          <g id="grp2" opacity="0" transform="translate(44 6)">
            <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"/>
            <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp5" opacity="0" transform="translate(14 50)">
            <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2"/>
            <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp4" opacity="0" transform="translate(35 50)">
            <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2"/>
            <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp1" opacity="0" transform="translate(24)">
            <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
            <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
          </g>
        </g>
      </svg>
    </label>
  </div>
</div>

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
          </div>
          <div>
          <h2 class="beforeState">Synopsis: </h2>  
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
            <span class="beforeState">Co Authors: </span>
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
  const menuBgColor2 = " rgba(2, 49, 90, 0.78) ";
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


function MangaPageChar(result) {
  // !char
  const galleryAnimeDiv2 = document.createElement("div");
  galleryAnimeDiv2.classList.add("imgRow2");

  for (let i = 0; i < result.characters.length; i++) {
    const CharAnime = document.createElement("div");
    CharAnime.classList.add("vcCard");

    const AnimeThumbnail = result.characters[i].image_url;
    const AnimeTitle = result.characters[i].name;
    const AnimeId = result.characters[i].mal_id;
    const role = result.characters[i].role;

    const MovieInnerHTML = `
          <div onclick="charSelect(${AnimeId})" class="imgCard animeCard">
          <div class="cardImage">
              <img
              src=${AnimeThumbnail}
              alt=${AnimeTitle}       
              <div</div>
              <div class="playWrapper">
              </div>
              </div>
              <div class="cardInfo">
                <h2 class="cardTitle">${truncate(AnimeTitle, 25)}</h2>
                <p> ${role} Role</p>
            </div>
          </div>
        `;

    CharAnime.innerHTML = MovieInnerHTML;
    galleryAnimeDiv2.appendChild(CharAnime);
    document.querySelector(".mangaPageChar").appendChild(galleryAnimeDiv2);
  }
}

function MangaPageGallery(result) {
  const galleryAnimeDiv = document.createElement("div");
  galleryAnimeDiv.classList.add("imgRow2");

  for (let i = 0; i < result.pictures.length; i++) {
    const galleryAnime = document.createElement("div");
    galleryAnime.classList.add("vcCard2");

    const AnimeThumbnail = result.pictures[i].small;
    const MovieInnerHTML = `
          <div class="imgCard animeCard">
          <div class="cardImage">
              <img
              src=${AnimeThumbnail}
              alt=${AnimeThumbnail}       
            </div>
          </div>
        `;

        galleryAnime.innerHTML = MovieInnerHTML;
        galleryAnimeDiv.appendChild(galleryAnime);
    document.querySelector(".mangaPageGallery").appendChild(galleryAnimeDiv);
  }
}

function MangaRecommendations(result) {
  const galleryAnimeDiv = document.createElement("div");
  galleryAnimeDiv.classList.add("imgRow2");

  for (let i = 0; i < result.recommendations.length; i++) {
    const galleryAnime = document.createElement("div");
    galleryAnime.classList.add("vcCard");

    const AnimeThumbnail = result.recommendations[i].image_url;
    const AnimeTitle = result.recommendations[i].title;
    const AnimeId = result.recommendations[i].mal_id;
    const role = result.recommendations[i].recommendation_count;

    const MovieInnerHTML = `
          <div onclick="animeSelect(${AnimeId})" class="imgCard animeCard">
          <div class="cardImage">
              <img
              src=${AnimeThumbnail}
              alt=${AnimeTitle}       
              <div</div>
              <div class="playWrapper">
              </div>
              </div>
              <div class="cardInfo">
                <h2 class="cardTitle">${truncate(AnimeTitle, 25)}</h2>
                <p>Remmendation Points: ${role}</p>
            </div>
          </div>
        `;

    galleryAnime.innerHTML = MovieInnerHTML;
    galleryAnimeDiv.appendChild(galleryAnime);
    document.querySelector(".mangaPageRecommendations").appendChild(galleryAnimeDiv);
  }
}

function MangaNews(result) {
  const galleryAnimeDiv = document.createElement("div");
  galleryAnimeDiv.classList.add("newsRow");

  for (let i = 0; i < result.articles.length; i++) {
    const galleryAnime = document.createElement("div");
    galleryAnime.classList.add("newsSection2");

    const AnimeThumbnail = result.articles[i].image_url;
    const AnimeTitle = result.articles[i].title;
    const AnimeId = result.articles[i].mal_id;
    const url = result.articles[i].url;
    const author_name = result.articles[i].author_name;
    const intro = result.articles[i].intro;
    const date = result.articles[i].date;

    const MovieInnerHTML = `
        <div class="newsLetter">
          <div class="newsImg">
            <img
            src=${AnimeThumbnail}
            alt=${AnimeTitle}/>
          </div>
          <div class="newsCardInfo">
            <a href=${url} target="_blank" rel="noopener" title=${url} aria-label=${AnimeTitle}>
              <h2>${truncate(intro,90)}"</h2>
            <a/>
              <p>Source: ${author_name}</p>
              <h6><i class="fa fa-calendar"></i> ${dateConverser(date)}</h6>
          </div>
        </div>
        `;

    galleryAnime.innerHTML = MovieInnerHTML;
    galleryAnimeDiv.appendChild(galleryAnime);
    document.querySelector(".mangaPageNews").appendChild(galleryAnimeDiv);
  }
}

// !Fail Catches

function noMangaNews() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Manga Dosn't have any News...<h1/>
      <p>Sorry D:<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".animePageNews").appendChild(commentDiv)
}

function noMangaRecommendations() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Manga Dosn't have any Recommendations yet...<h1/>
      <p>Sorry D:<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".mangaPageRecommendations").appendChild(commentDiv)
}

function noPageGallery() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Manga Dosn't have any Gallery yet...<h1/>
      <p>Sorry D:<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".animePageGallery").appendChild(commentDiv)
}

function noPageComments() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Manga Dosn't have any Comments yet...<h1/>
      <p>Sorry D:<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".animePageComments").appendChild(commentDiv)
}

function noPageCharachter() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Manga Dosn't have any Charachters(?) yet...<h1/>
      <p>Sorry D:<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".mangaPageChar").appendChild(commentDiv)
}


function animeSelect(id){
  sessionStorage.setItem("AnimeID", id);
  console.log(id)
  window.location = "../Html/Anime.html"
  return false;
}

function personSelect(id){
  sessionStorage.setItem("personId", id);
  console.log(id)
  window.location = "../Html/Person.html"
  return false;
}

function mangaSelect(id){
  sessionStorage.setItem("mangaId", id);
  console.log(id)
  window.location = "../Html/Manga.html"
  return false;
}

function charSelect(id){
  sessionStorage.setItem("charId", id);
  console.log(id)
  window.location = "../Html/Char.html"
  return false;
}

getMangaGallery();
getMangaRecommendations();
getMangaNews();
getMangaChar();
getManga();
getMangaComments();