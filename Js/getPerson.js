function getPerson() {
  let personId = sessionStorage.getItem("personId");
  
  fetch("https://api.jikan.moe/v3/person/" + personId)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    if (result.voice_acting_roles.length === 0) {
      noPageActorPerson();
    }
    CharPage(result);
  })
}


function getPersonGallery() {
  let personId = sessionStorage.getItem("personId");

  fetch("https://api.jikan.moe/v3/person/" + personId + "/pictures")
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.pictures.length === 0) {
        noPageGalleryPerson();
      }
      personGallery(result);
    });
}

function noPageGalleryPerson() {
  const commentDiv = document.createElement('div');
    // !Skapar html
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Person Dosn't have any gallery yet...<h1/>
      <p>Sorry D:<p/>
      <p>Tehee<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".persGallery").appendChild(commentDiv)
}

function noPageActorPerson() {
  const commentDiv = document.createElement('div');
    // !Skapar html
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Person Dosn't have any Roles...<h1/>
      <p>Sorry D:<p/>
      <p>Tehee<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".roles").appendChild(commentDiv)
}



function CharPage(result) {
  const AnimePageSection = document.createElement('section');
  const AnimePageDiv = document.createElement('div');
  AnimePageDiv.classList.add('statePage');
  
  // !roles
  for (let i = 0; i < result.voice_acting_roles.length; i++) {
    const locked = document.createElement('div');

    const personAnime = document.createElement('div');
    const line = document.createElement('div');
    const personChar = document.createElement('div');

    const AnimeThumbnail = result.voice_acting_roles[i].anime.image_url;
    const AnimeTitle = result.voice_acting_roles[i].anime.name;
    const AnimeId = result.voice_acting_roles[i].anime.mal_id;

    const roles = result.voice_acting_roles[i].role;
    const CharThumbnail = result.voice_acting_roles[i].character.image_url;
    const CharTitle = result.voice_acting_roles[i].character.name;
    const CharId = result.voice_acting_roles[i].character.mal_id;

    
    const MovieInnerHTML = 
    `
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
            <h2 class="cardTitle">${truncate(AnimeTitle,35)}</h2>
        </div>
      </div>
    `;    
    
    const CharInnerHTML = 
    `
      <div onclick="charSelect(${CharId})" class="imgCard animeCard">
      <div class="cardImage">
          <img
          src=${CharThumbnail}
          alt=${CharTitle}       
          <div</div>
          <div class="playWrapper">
          </div>          
          </div>
          <div class="cardInfo">
            <h2 class="cardTitle">${truncate(CharTitle, 35)}</h2>
        </div>
      </div>
    `;    
    
    const lineHTML = 
    `
    <div class="lockedText">
      <h1>
      <i class="fas fa-arrow-right"></i>
      ${roles}
      <i class="fas fa-arrow-right"></i>
      </h1>
      <div class="hidden">
        <i class="fas fa-arrow-right"></i>
      </div>
    </div>
    `;
    
    personAnime.innerHTML = MovieInnerHTML;
    personChar.innerHTML = CharInnerHTML;
    line.innerHTML = lineHTML;
    
    locked.classList.add("locked");
    locked.appendChild(personChar);
    locked.appendChild(line);
    locked.appendChild(personAnime);

    document.querySelector(".roles").appendChild(locked);
  }  
  
  const thumbnail = result.image_url;

  const title = result.name;

  const birthday = result.birthday;
  const MalURL = result.url;

  const members = result.member_favorites;
  const synopsis = result.about;

  // !Skapar html
  const PageInnerHTML = 
  `
    <div class="animeTop">
      <div class="animePageFlex">
        <div class="left">
          <img class="AnimePageImg"
          src=${thumbnail}
          alt=${title}/>
        </div>
        
      <div class="right">
        <div class="titleFlex">
          <div class="titles">
            <p class="title">${title}</p>
          </div>
        </div>
      </div>
    </div>
    </div>

    <div class="synopsis">
        <div class="rankInfo">
          <div>
            <span class="beforeState">Favorites: </span>
            <span class="state">${members}</span>
          </div>
          <div>
            <span class="beforeState">Birthday: </span>
            <span class="state">${dateConverser(birthday)}</span>
          </div>
          </div>
          <div>
          <h2 class="beforeState">About: </h2>  
          <p class="state">${synopsis}</p>
      </div>

      <div class="iframe">
        <button>
          <a href=${MalURL} title="MyAnimeList Link" target="_blank">MyAnimeList Link</a> 
        </button>
      </div>
    </div>
    
    </div>
  </div>

    `;

    AnimePageDiv.innerHTML = PageInnerHTML;
    AnimePageSection.appendChild(AnimePageDiv)
    document.querySelector(".personPage").appendChild(AnimePageSection)
    menuBgChange(thumbnail);
}

function dateConverser(date) {
  if (date === null) {
    return false
  }
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  var str = date;

  if (newmounth =  str.slice(5,6) == "0") {
    var mounth =  str.slice(5,7);
  }
  else{
    var mounth =  str.slice(5,8);
  }

  var date =  str.slice(8,10);
  var year =  str.slice(0,4);

  return [date + " " + monthNames[mounth - 1] + " " + year]
}

function truncate(str, n){
  if (str === null || str === undefined) {
    return "Null"
  }
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};

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

function menuBgChange(Imgurl)
{
  const menuBgColor1 = " rgba(2, 49, 90, 0.88),";
  const menuBgColor2 = " rgba(2, 49, 90, 0.78) ";
  const menuBg = "linear-gradient(to bottom," + menuBgColor1 + menuBgColor2 + "), url("+ Imgurl +")";

  document.querySelector(".menuAnimePage").style.backgroundImage = menuBg;
}



function personGallery(result) {
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
    document.querySelector(".persGallery").appendChild(galleryAnimeDiv);
  }
}

getPersonGallery();
getPerson();