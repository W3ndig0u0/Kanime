let fetchedTypes = {};
let thumbnailGlobal;
let titleGlobal;

let mangaId = sessionStorage.getItem("mangaId");
function getManga() {
  
  if (!fetchedTypes["Manga"]) {
    fetchedTypes["Manga"] = true;
  fetch("https://api.jikan.moe/v4/manga/" + mangaId)
  .then(response => response.json())
  .then(result => {
    MangaPage(result);
  })
  } else {
    console.log("Manga type already fetched");
  }
}


function getMangaChar() {
  if (!fetchedTypes["MangaChar"]) {
    fetchedTypes["MangaChar"] = true;
  fetch("https://api.jikan.moe/v4/manga/" + mangaId + "/characters")
  .then(response => response.json())
  .then(result => {
    if (result.characters.length === 0) {
      noPageCharachter();
    }
    MangaPageChar(result);
  }) 
  .catch(error => {
    console.error(error);
    noPageCharachter();
  })
 } else {
    console.log("Manga type already fetched");
  }
}

function getMangaGallery() {
  if (!fetchedTypes["MangaGallery"]) {
    fetchedTypes["MangaGallery"] = true;

  fetch("https://api.jikan.moe/v4/manga/" + mangaId + "/pictures")
  .then(response => response.json())
  .then(result => {
    console.error(result);
    if (result.data.length === 0) {
      noPageGallery();
    }
      MangaPageGallery(result);
  })
  .catch(error => {
    console.error(error);
    noPageGallery();
  })} else {
    console.log("Manga Gallery already fetched");
  }
}

function getMangaRecommendations() {
  if (!fetchedTypes["MangaRecommendations"]) {
    fetchedTypes["MangaRecommendations"] = true;
  fetch("https://api.jikan.moe/v4/manga/" + mangaId + "/recommendations")
  .then(response => response.json())
  .then(result => {
    if (result.recommendations.length === 0) {
      noMangaRecommendations();
    }
    MangaRecommendations(result);
  })
  .catch(error => {
    console.error(error);
    noMangaRecommendations();
  })} else {
    console.log("Manga Recommendations already fetched");
  }
}


function getMangaComments() {
  if (!fetchedTypes["MangaComments"]) {
    fetchedTypes["MangaComments"] = true;
  let mangaId = sessionStorage.getItem("mangaId");
  
  fetch("https://api.jikan.moe/v4/manga/" + mangaId + "/reviews")
  .then(response => response.json())
  .then(result => {
    if (result.length === 0) {
      noPageComments();
    }
    MangaCommentsPage(result);
  })
  .catch(error => {
    console.log(error)
    noPageComments();
  })
  } else {
    console.log("Manga Comments already fetched");
  }
}

function getMangaNews() {
  if (!fetchedTypes["MangaNews"]) {
    fetchedTypes["MangaNews"] = true;

  let mangaId = sessionStorage.getItem("mangaId");
  
  fetch("https://api.jikan.moe/v4/manga/" + mangaId + "/news")
  .then(response => response.json())
  .then(result => {
    if (result.articles.length === 0) {
      noMangaNews();
    }
      MangaNews(result);
  })
  .catch(error => {
    console.error(error);
    noMangaNews();
  })  
} else {
    console.log("Manga News already fetched");
  }
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
  
  const thumbnail = result.data.images.jpg.large_image_url ?? result.data.images.jpg.image_url;

  const titleEn = result.data.title_japanese;
  const title = result.data.title;

  const type = result.data.type;
  const aired = result.data.published?.string;
  const demographics = result.data?.demographics[0]?.name;
  const volumes = result.data.volumes;
  const status = result.data.status;
  const MalURL = result.data.url;

  const producers = result.data.authors[0]?.name;
  const studio = result.data.authors[1]?.name;

  const genres = result.data.genres[0]?.name;
  const genres1 = result.data.genres[1]?.name;

  const rank = result.data.rank;
  const popularity = result.data.popularity;
  const members = result.data.members;

  const score = result.data.score;
  const ColorScore = scoreColor(score);

  const scored_by = result.data.scored_by;
  const synopsis = result.data.synopsis;

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
            <span class="state">${genres}, ${genres1}</span>
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
            <span class="beforeState">Demographics:</span>
            <span class="state">${demographics}</span>
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

        <div class="pageTypeWrapper">
        <div class="pageType">
          <p onclick="showType('chapters')">Chapters</p>
          <p onclick="showType('relations')">Relations</p>
          <p onclick="showType('recomendetion')">Recomendetion</p>
          <p onclick="showType('characters')">Characters</p>
          <p onclick="showType('news')">News</p>
          <p onclick="showType('gallery')">Gallery</p>
          <p onclick="showType('reviews')">Reviews</p>
          </div>
        </div>
      </div>
      

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

//?Gömmer andra elemet i sidan när de ej e tryckta
function showType(type){
  const typeBlocks = document.getElementsByClassName(type);
  const allBlocks = document.querySelectorAll('.characters, .relations, .news, .gallery, .reviews, .recomendetion, .chapters');

  if (typeBlocks[0].style.display === 'block') {
    return; // if the type is already displayed, don't do anything
  } else {
    allBlocks.forEach(block => {
      if (block.style.display === 'block' && !block.classList.contains(type)) {
        block.style.display = 'none';
      }
    });

    for (let i = 0; i < typeBlocks.length; i++) {
      typeBlocks[i].style.display = 'block';
    }
    hideOtherTypes(type);
  }

  toggleType();
}

function hideOtherTypes(selectedType) {
  const allTypes = ['characters', 'relations', 'news', 'gallery', 'reviews', 'recomendetion', 'chapters'];
  for (let i = 0; i < allTypes.length; i++) {
    const type = allTypes[i];
    if (type !== selectedType) {
      const typeBlocks = document.getElementsByClassName(type);
      for (let j = 0; j < typeBlocks.length; j++) {
        typeBlocks[j].style.display = 'none';
      }
    }
  }
}

function toggleType(){
  const mangaChar = document.querySelector('.characters');
  const mangaRelations = document.querySelector('.relations');
  const mangaNews = document.querySelector('.news');
  const mangaGallery = document.querySelector('.gallery');
  const mangaReviews = document.querySelector('.reviews');
  const mangaRecomendetion = document.querySelector('.recomendetion');
  const mangaChapters = document.querySelector('.chapters');

  if (mangaNews?.style.display === "block") {
    getMangaNews();
  }  
  if (mangaRelations?.style.display === "block") {
    // getMangaRelations();
  }
  if (mangaChar?.style.display === "block") {
    getMangaChar();

  }
  if (mangaGallery?.style.display === "block") {
    getMangaGallery();
  }

  if (mangaReviews?.style.display === "block") {
    getMangaComments();
    
  }
  if (mangaRecomendetion?.style.display === "block") {
    getAnimeRecommendations();
  }
  if (mangaChapters?.style.display === "block") {
    getManga();
  }
}



function MangaCommentsPage(result) {

  for (let i = 0; i < result.data.length; i++) {

  const commentDiv = document.createElement('div');
  commentDiv.classList.add("slideshow")

    const review = result.data[i].review;
    const date = result.data[i].date;
    const reviewerImg = result.data[i].user.images.jpg.image_url;
    const reviewerName = result.data[i].user.username;
    const spoiler = result.data[i].is_spoiler;

    const type = result.data[i].type;
    const score = result.data[i].score;
    
    
    // !Skapar html
    const CommentsReviewInnerHTML = 
    `
    <div>
        <div class="reviewContentAll">
          <img class="thumbnail" src=${reviewerImg} alt=${reviewerName}"
            alt="profile-img" />
          <p class="reviewName">${reviewerName}</p>
          <p class="reviewDate">${dateConverser(date)}</p>

          <div class="reviewScroll">
            <h2 class="reviewText">
            ${truncate(review, 900)}
            </h1> 
          </div>
              <p>${type}</p>
              <p>${spoiler}</p>
              <p>${score}</p>
          </div>
        </div>
      </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".mangaPageComments").appendChild(commentDiv)
  }
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

  for (let i = 0; i < result.data.length; i++) {
    const galleryAnime = document.createElement("div");
    galleryAnime.classList.add("vcCard2");

    const AnimeThumbnail = result.data[i].jpg.large_image_url ?? result.data[i].jpg.image_url;
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
      <img alt="ERROR IMG" src="https://i.postimg.cc/k5MBnyPx/pngwing-com.png">
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".mangaPageNews").appendChild(commentDiv)
}

function noMangaRecommendations() {
  const recomendetion = document.createElement('div');
    const recomendetionInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Manga Dosn't have any Recommendations yet...<h1/>
      <img alt="ERROR IMG" src="https://i.postimg.cc/k5MBnyPx/pngwing-com.png">
    </div>
    `;
    recomendetion.innerHTML = recomendetionInnerHTML;
    document.querySelector(".mangaPageRecommendations")?.appendChild(recomendetion)
}

function noPageGallery() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Manga Dosn't have any Gallery yet...<h1/>
      <img alt="ERROR IMG" src="https://i.postimg.cc/k5MBnyPx/pngwing-com.png">
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".mangaPageGallery").appendChild(commentDiv)
}

function noPageComments() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Manga Dosn't have any Comments yet...<h1/>
      <img alt="ERROR IMG" src="https://i.postimg.cc/k5MBnyPx/pngwing-com.png">
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".mangaPageComments").appendChild(commentDiv)
}

function noPageCharachter() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Manga Dosn't have any Characters yet...<h1/>
      <img alt="ERROR IMG" src="https://i.postimg.cc/k5MBnyPx/pngwing-com.png">
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".mangaPageChar").appendChild(commentDiv)
}

function animeSelect(id){
  sessionStorage.clear();
  sessionStorage.setItem("AnimeID", id);
  window.location.assign("../Html/Anime.html");
}

function personSelect(id){
  sessionStorage.clear();
  sessionStorage.setItem("personId", id);
  window.location.assign("../Html/Person.html");
}

function mangaSelect(id){
  sessionStorage.clear();
  sessionStorage.setItem("mangaId", id);
  window.location.assign("../Html/Manga.html");
}

function charSelect(id){
  sessionStorage.clear();
  sessionStorage.setItem("charId", id);
  window.location.assign("../Html/Char.html");
}

window.addEventListener("load", getManga);