let fetchedTypes = {};

function getAnime() {
  let animeId = sessionStorage.getItem("AnimeID");
  
  if (!fetchedTypes["Anime"]) {
    fetchedTypes["Anime"] = true;
    fetch("https://api.jikan.moe/v4/anime/" + animeId)
    .then(response => response.json())
    .then(result => {
        AnimePage(result);
    })
  } else {
    console.log("Anime type already fetched");
  }
}

function getAnimeChar() {
  let animeId = sessionStorage.getItem("AnimeID");
  
  if (!fetchedTypes["AnimeChar"]) {
    fetchedTypes["AnimeChar"] = true;
    fetch("https://api.jikan.moe/v4/anime/" + animeId + "/characters")
    .then(response => response.json())
    .then(result => {
      if (result === undefined || result.data?.length === 0) {
        noPageCharachter();
      }
      else{
        AnimeCharPage(result);
      }
    })
  } else {
    console.log("AnimeChar type already fetched");
  }
}

function getAnimeRelations() {
  let animeId = sessionStorage.getItem("AnimeID");
  
  if (!fetchedTypes["AnimeRelations"]) {
    fetchedTypes["AnimeRelations"] = true;
    fetch("https://api.jikan.moe/v4/anime/" + animeId + "/relations")
    .then(response => response.json())
    .then(result => {
      if (result === undefined || result.data?.length === 0) {
        noAnimeRelations();
      }
      else{
        AnimeRelations(result);
      }
    })
  } else {
    console.log("AnimeRelations type already fetched");
  }
}


function getAnimeStaff() {
  let animeId = sessionStorage.getItem("AnimeID");
  
  if (!fetchedTypes["AnimeStaff"]) {
    fetchedTypes["AnimeStaff"] = true;
    fetch("https://api.jikan.moe/v4/anime/" + animeId + "/staff")
    .then(response => response.json())
    .then(result => {
      AnimePageStaff(result);
    })
  } else {
    console.log("AnimeStaff type already fetched");
  }
}

function getAnimeGallery() {
  let animeId = sessionStorage.getItem("AnimeID");
  
  if (!fetchedTypes["AnimeGallery"]) {
    fetchedTypes["AnimeGallery"] = true;
    fetch("https://api.jikan.moe/v4/anime/" + animeId + "/pictures")
    .then(response => response.json())
    .then(result => {
      if (result?.data === undefined || result?.data?.length === 0) {
        noPageGallery();
      }
      else{
        AnimePageGallery(result);
      }
    })  
  } else {
    console.log("AnimeGallery type already fetched");
  }
}

function getAnimeRecommendations() {
  let animeId = sessionStorage.getItem("AnimeID");
  
  if (!fetchedTypes["AnimeRecommendations"]) {
    fetchedTypes["AnimeRecommendations"] = true;
    fetch("https://api.jikan.moe/v4/anime/" + animeId + "/recommendations")
    .then(response => response.json())
    .then(result => {
      if (result?.data === undefined || result?.data?.length === 0) {
        noAnimeRecommendations();
      }
      else{
        AnimeRecommendations(result);
      }
    })
  } else {
    console.log("AnimeRecommendations type already fetched");
  }
}


function getAnimeNews() {
  let animeId = sessionStorage.getItem("AnimeID");
    
  if (!fetchedTypes["AnimeNews"]) {
    fetchedTypes["AnimeNews"] = true;
    fetch("https://api.jikan.moe/v4/anime/" + animeId + "/news")
    .then(response => response.json())
    .then(result => {
      if (result?.data === undefined || result?.data?.length === 0) {
        noAnimeNewsletter();
      }
      else{
        AnimeNews(result);
      }
    })
  } else {
    console.log("AnimeNews type already fetched");
  }
}

function getAnimeReview() {
  let animeId = sessionStorage.getItem("AnimeID");
  
  if (!fetchedTypes["AnimeReview"]) {
    fetchedTypes["AnimeReview"] = true;
    fetch("https://api.jikan.moe/v4/anime/" + animeId + "/reviews")
    .then(response => response.json())
    .then(result => {
      if (result?.data === undefined || result?.data?.length === 0) {
        noAnimeReview();
      }
      else{
        AnimeReview(result);
      }
    })
  } else {
    console.log("AnimeNews type already fetched");
  }
}

function capitalizeFirstLetter(string) {
  if (string === null) {
    return undefined;
  }
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}

function scoreColor(score) {
  if (score >= 9) {
    return "#00ff00";
  }  

  else if (score >= 8 && score < 9) {
    return "#a1ca0c";
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

function AnimePage(result) {
  const AnimePageSection = document.createElement('section');
  const AnimePageDiv = document.createElement('div');
  AnimePageDiv.classList.add('statePage');
  
  const thumbnail = result.data.images.jpg.large_image_url;

  const titleJp = result.data.title_japanese;
  const title = result.data.title_english;

  const type = result.data.type;
  const aired = result.data.aired.string;
  const status = result.data.status;
  const ep = result.data.episodes;
  const source = result.data.source;
  const rating = result.data.rating;
  const MalURL = result.data.url;
  const duration = result.data.duration;

  const producers = result.data.producers[0]?.name;
  const studio = result.data.studios[0]?.name;

  const genres = result.data.genres[0]?.name;
  const genres1 = result.data.genres[1]?.name;
  const genres2 = result.data.genres[2]?.name;

  const rank = result.data.rank;
  const popularity = result.data.popularity;
  const members = result.data.members;

  const score = result.data.score;
  const ColorScore = scoreColor(score);

  const scored_by = result.data.scored_by;
  const synopsis = result.data.synopsis;

  const trailer_url = result.data.trailer.embed_url;

  const newTitle = capitalizeFirstLetter(title);
  const newTitleEn = capitalizeFirstLetter(titleJp);

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
            <p class="titleJp">${titleJp}</p>

            <div id="main-content">
          <div>
            <input type="checkbox" id="checkbox" class="heart" onclick="favoritesAnime()" />
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
            <span class="beforeState">Score:</span>
            <span class="state scoreNumber">${score}</span>
            <span class="state">${scored_by} Users</span>
          </div>
        </div>
      </div>
    </div>
    </div>

    <div class="synopsis">     
        <div class="rankInfo">
        <div>
            <span class="beforeState">Ranked:</span>
            <span class="state"> ${rank}</span>
          </div>
          <div>
            <span class="beforeState">Popularity:</span>
            <span class="state"> ${popularity}</span>
          </div>
          <div>
            <span class="beforeState">Members:</span>
            <span class="state"> ${members}</span>
          </div>
        </div>
          <div>
          <h2 class="beforeState">Synopsis:</h2>  
          <p class="state"> ${synopsis}</p>
        </div>
      </div>
    
    <div class="animeBottom">
      <div>
        <div class="animeInfo">
          <div>
            <span class="beforeState">Type:</span>
            <span class="state"> ${type}</span>
          </div>
          <div>
            <span class="beforeState">Genres:</span>
            <span class="state"> ${genres}, ${genres1}, ${genres2}</span>
          </div>
          <div>
            <span class="beforeState">Status:</span>
            <span class="state"> ${status}</span>
          </div>
          <div>
            <span class="beforeState">Total Eps:</span>
            <span class="state"> ${ep}</span>
          </div>
        </div>

        <div class="animeInfo">
          <div>
            <span class="beforeState">Rating:</span>
            <span class="state"> ${rating}</span>
          </div>
          <div>
            <span class="beforeState">Aired:</span>
            <span class="state"> ${aired}</span>
          </div>
          <div>
            <span class="beforeState">Airing Status:</span>
            <span class="state"> ${status}</span>
          </div>
        </div>

        <div class="animeInfo">
          <div>
            <span class="beforeState">Source:</span>
            <span class="state"> ${source}</span>
          </div>
          <div>
            <span class="beforeState">Studio:</span>
            <span class="state"> ${studio}</span>
          </div>
          <div>
            <span class="beforeState">Producers:</span>
            <span class="state"> ${producers}</span>
          </div>
          <div>
          <span class="beforeState">Ep Duration:</span>
          <span class="state"> ${duration}</span>
          </div>
        </div>
      </div>
    <div class="iframe">
        <div class="iframeContainer"> 
        <button>
          <a href=${MalURL} title="MyAnimeList Link" target="_blank">MyAnimeList Link</a> 
        </button>
        <div class="pageTypeWrapper">
          <div class="pageType">
            <p >Overview</p>
            <p >Video</p>
            <p onclick="showType('recomendetion')">Relations</p>
            <p onclick="showType('characters')">Characters</p>
            <p onclick="showType('staff')">Staff</p>
            <p>Stats</p>
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
    document.querySelector(".animePage")?.appendChild(AnimePageSection)
    document.querySelector(".score").style.backgroundColor = ColorScore;
    menuBgChange(thumbnail)
}

//?Gömmer andra elemet i sidan när de ej e tryckta
function showType(type){
  const typeBlocks = document.getElementsByClassName(type);
  const allBlocks = document.querySelectorAll('.characters, .realations, .staff, .news, .gallery, .reviews, .recomendetion');

  if (typeBlocks[0].style.display === 'block') {
    for (let i = 0; i < typeBlocks.length; i++) {
      typeBlocks[i].style.display = 'none';
    }
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
  const allTypes = ['characters', 'realations', 'staff', 'news', 'gallery', 'reviews', 'recomendetion'];
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
  const animeChar = document.querySelector('.characters');
  const animeRelations = document.querySelector('.realations');
  const animeStaff = document.querySelector('.staff');
  const animeNews = document.querySelector('.news');
  const animeGallery = document.querySelector('.gallery');
  const animeReviews = document.querySelector('.reviews');
  const animeRecomendetion = document.querySelector('.recomendetion');

  if (animeStaff.style.display === "block") {
    getAnimeStaff();
  }
  if (animeNews.style.display === "block") {
    getAnimeNews();
  }  
  if (animeRelations.style.display === "block") {
    getAnimeRelations();
  }
  if (animeChar.style.display === "block") {
    getAnimeChar();

  }
  if (animeGallery.style.display === "block") {
    getAnimeGallery();

  }
  if (animeReviews.style.display === "block") {
    getAnimeReview();
    
  }
  if (animeRecomendetion.style.display === "block") {
    getAnimeRecommendations();
    
  }
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

  var date =  newDate.slice(3,5);
  var year =  str.slice(0,4);

  return [date + " " +  monthNames[mounth - 1] + ", " + year]

}


function AnimeCharPage(result) {
  const TopCharSection = document.createElement('section');
  TopCharSection.classList.add('imgRow2');

  for (let i = 0; i < result.data.length; i++) {
    // for (let i = 0; i < 20; i++) {
      const charDiv = document.createElement('div');
  charDiv.classList.add("charDiv")

  const charThumbnail = result.data[i].character.images.jpg.image_url;
  const charName = result.data[i].character.name;
  const charUrl = result.data[i].character.url;
  const charId = result.data[i].character.mal_id;
  const charFavorites = result.data[i].favorites;
  const charRoles = result.data[i].role;
  // const language = result.data[i].language
  
  const charInnerHTML = `
        <div onclick="charSelect(${charId})" class="imgCard PersonCard">
        <div class="cardImage">
            <img
            src=${charThumbnail}
            alt=${charName}       
            <div</div>
            <div class="epTag roleTag">${charRoles.toUpperCase()}</div>
            <div class="charTag tag">CHAR</div>
            <div class="playWrapper">
            </div>
            </div>
            <div class="cardInfo">
              <h2 class="cardTitle">${truncate(charName, 20)}</h2>
          </div>
        </div>
      `;


    charDiv.innerHTML = charInnerHTML;
    TopCharSection.appendChild(charDiv);
    document.querySelector(".animePageChar")?.appendChild(TopCharSection)
  }
}

function AnimePageStaff(result) {
  const staffAnimeDiv = document.createElement("div");
  staffAnimeDiv.classList.add("imgRow2");
   for (let i = 0; i < 10; i++) {
   // for (let i = 0; i < result.data.length; i++) {
      const staffAnime = document.createElement("div");
    staffAnime.classList.add("vcCard");

    const staffThumbnail = result.data[i].person.images.jpg.image_url;
    const staffName = result.data[i].person.name;
    const staffId = result.data[i].person.mal_id;
    const staffRoles = result.data[i].positions;

    const StaffInnerHTML = `
          <div onclick="personSelect(${staffId})" class="imgCard animeCard">
          <div class="cardImage">
              <img
              src=${staffThumbnail}
              alt=${staffThumbnail}       
              <div</div>
              <div class="tag vaTag">${staffRoles}</div>
              <div class="playWrapper"></div>
            </div>

              <div class="cardInfo">
                <h2 class="cardTitle">${truncate(staffName, 25)}</h2>
            </div>
          </div>
        `;

    staffAnime.innerHTML = StaffInnerHTML;
    staffAnimeDiv.appendChild(staffAnime);
    document.querySelector(".animePageStaff")?.appendChild(staffAnimeDiv);
  }
}


function AnimePageGallery(result) {
  const galleryAnimeDiv = document.createElement("div");
  galleryAnimeDiv.classList.add("imgRow2");

  // for (let i = 0; i < 10; i++) {
    for (let i = 0; i < result.data.length; i++) {

    if (result.data[i] == null) return;
    const galleryAnime = document.createElement("div");
    galleryAnime.classList.add("vcCard2");

    const AnimeThumbnail = result.data[i].jpg.large_image_url;

    const MovieInnerHTML = `
          <div class="imgCard animeCard">
          <div class="cardImage">
              <img
              src=${AnimeThumbnail}
              alt=${AnimeThumbnail}       
            </div>
            <div class="doujinshiTag tag">IMG</div>
          </div>
        `;


        galleryAnime.innerHTML = MovieInnerHTML;
        galleryAnimeDiv.appendChild(galleryAnime);
    document.querySelector(".animePageGallery")?.appendChild(galleryAnimeDiv);
  }
}

function AnimeNews(result) {
  const galleryAnimeDiv = document.createElement("div");
  galleryAnimeDiv.classList.add("newsRow");

  for (let i = 0; i < result.data.length; i++) {
    // for (let i = 0; i < 6; i++) {

    const galleryAnime = document.createElement("div");
    galleryAnime.classList.add("newsSection2");

    const AnimeThumbnail = result.data[i].images.jpg.image_url;
    const AnimeTitle = result.data[i].author_username;
    const AnimeId = result.data[i].mal_id;
    const url = result.data[i].url;
    const excerpt = result.data[i].excerpt;
    const date = result.data[i].date;

    const MovieInnerHTML = `
        <div class="newsLetter">
          <div class="newsImg">
            <img
            src=${AnimeThumbnail}
            alt=${AnimeThumbnail}/>
          </div>
          <div class="newsCardInfo">
            <a href=${url} target="_blank" rel="noopener" title=${url} aria-label=${AnimeTitle}>
              <h2>${truncate(excerpt,90)}"</h2>
            <a/>
              <p>Source: ${AnimeTitle}</p>
              <h6><i class="fa fa-calendar"></i> ${dateConverser(date)}</h6>
          </div>
        </div>
        `;

    galleryAnime.innerHTML = MovieInnerHTML;
    galleryAnimeDiv.appendChild(galleryAnime);
    document.querySelector(".animePageNews")?.appendChild(galleryAnimeDiv);
  }
}

function AnimeRecommendations(result) {
  const recAnimeSection = document.createElement('section');
  recAnimeSection.classList.add('imgRow2');

  // for (let i = 0; i < 20; i++) {
  for (let i = 0; i < result.data.length; i++) {
  
  const recAnimeDiv = document.createElement('div');
  recAnimeDiv.classList.add('imgRow');

  const thumbnail = result.data[i].entry.images.webp.large_image_url;
  const id = result.data[i].entry.mal_id;
  const title = result.data[i].entry.title;
  const recommendations = result.data[i].votes;

  const newTitle = capitalizeFirstLetter(title);

  // const newNewTitle = AnimeNameConverter(newTitle);

  // !Skapar html
  const recentInnerHTML = 
  `
  <div onclick="animeSelect(${id})" class="imgCard animeCard ImgCardSlider">
    <div class="cardImage">
        <img
        src=${thumbnail}
        alt=${newTitle}/>
          <div class="tvTag tag">TV</div>
          <div class="epTag">Users: ${recommendations}</div>
          <div class="playWrapper">
          </div>
          <div class="cardInfo">
          <span class="cardTitle">${truncate(newTitle, 25)}</span>
      </div>
    </div>
    `;
        
    recAnimeDiv.innerHTML = recentInnerHTML;
    recAnimeSection.appendChild(recAnimeDiv)
    const recAnime = document.querySelector(".animePageRecomendetions");
    recAnime?.appendChild(recAnimeSection)
  }
} 

function AnimeRelations(result) {
  console.log(result)

  for (let i = 0; i < result?.data?.length; i++) {

  const relAnimeTypeDiv = document.createElement('div');
  const relation = result.data[i]?.relation;

  relAnimeTypeDiv.innerHTML =  `
  <br>
  <br>
  <h3 class="titleComments">${relation}</h3>
  <div class="${relation}"></div>
  <br>
  `;

  const relAnimeSection = document.createElement('section');
  relAnimeSection.classList.add('a');
  
  relAnimeSection.appendChild(relAnimeTypeDiv)
  
  const relAnimeDiv = document.createElement('div');
  relAnimeDiv.classList.add('imgRow');
  
  for (let j = 0; j < result.data[j]?.entry.length; j++) {
    const thumbnail = "https://assets.reedpopcdn.com/Genshin-Impact-anime.jpg/BROK/resize/1200x1200%3E/format/jpg/quality/70/Genshin-Impact-anime.jpg";
    const id = result.data[i]?.entry[j]?.mal_id;
    const title = result.data[i]?.entry[j]?.name;
    const type = result.data[i]?.entry[j]?.type;

    const newTitle = capitalizeFirstLetter(title);

    // !Skapar html
    const relInnerHTML = 
    `
    <div onclick="${type}Select(${id})" class="imgCard animeCard ImgCardSlider">
      <div class="cardImage">
          <img
          src=${thumbnail}
          alt=${newTitle}/>
          <div class="epTag">${relation}</div>
            <div class="${type}Tag tag">${type}</div>
            <div class="playWrapper">
            </div>
            <div class="cardInfo">
            <span class="cardTitle">${truncate(newTitle, 25)}</span>
        </div>
      </div>
      `;

      relAnimeDiv.innerHTML += relInnerHTML;
      relAnimeSection.appendChild(relAnimeDiv)

    }
    var recAnime = document.querySelector(".animePageRelations");
    recAnime?.appendChild(relAnimeSection)
  }
}


function AnimeReview(result) {
  const recAnimeSection = document.createElement('section');
  recAnimeSection.classList.add('imgRow2');

  for (let i = 0; i < 5; i++) {
    // console.log(result);
  
    const commentDiv = document.createElement('div');
    commentDiv.classList.add("slideshow");
    
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
    document.querySelector(".animePageComments")?.appendChild(commentDiv)
  
}
}

function noAnimeRecommendations() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Anime Dosn't have any Recommendations yet...<h1/>
      <p>Sorry D:<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".animePageRecomendetions")?.appendChild(commentDiv)
}

function noAnimeReview() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Anime Dosn't have any Reviews yet...<h1/>
      <p>Sorry D:<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".animePageComments")?.appendChild(commentDiv)
}

function noAnimeNewsletter() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Anime Dosn't have any News yet...<h1/>
      <p>Sorry D:<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".animePageNews")?.appendChild(commentDiv)
}

function noPageGallery() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Anime Dosn't have any Gallery yet...<h1/>
      <p>Sorry D:<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".animePageGallery")?.appendChild(commentDiv)
}

function noPageStaff() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Anime Dosn't have any Staff(?) yet...<h1/>
      <p>Sorry D:<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".animePageStaff")?.appendChild(commentDiv)
}

function noPageCharachter() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Anime Dosn't have any Charachters(?) yet...<h1/>
      <p>Sorry D:<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".animePageChar")?.appendChild(commentDiv)
}

function noAnimeRelations(){
  const relationDiv = document.createElement('div');
  const relationInnerHTML = 
  `
  <div class="reviewerImgDiv">
    <h1>This Anime Dosn't have any Relations(?) yet...<h1/>
  </div>
  `;
  relationDiv.innerHTML = relationInnerHTML;
  document.querySelector(".animePageRelations")?.appendChild(relationDiv)
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

getAnime()
