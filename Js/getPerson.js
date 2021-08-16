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
    const personChar = document.createElement('div');
    const AnimeThumbnail = result.voice_acting_roles[i].anime.image_url;
    const AnimeTitle = result.voice_acting_roles[i].anime.name;
    const AnimeId = result.voice_acting_roles[i].anime.mal_id;

    const roles = result.voice_acting_roles[i].role;
    const CharThumbnail = result.voice_acting_roles[i].character.image_url;
    const CharTitle = result.voice_acting_roles[i].character.name;
    const CharId = result.voice_acting_roles[i].character.mal_id;

    const CharInnerHTML = 
    `
      <div onclick="charSelect(${CharId})" class="imgCard animeCard">
      <div class="cardImage">
          <img
          src=${CharThumbnail}
          alt=${CharTitle}>
          <div class="tag">
          <img
          src=${AnimeThumbnail}
          alt=${AnimeTitle}>
          </div>
          <div class="playWrapper">
          </div>          
          </div>
          <div class="cardInfo">
            <h2 class="cardTitle">${truncate(CharTitle, 30)}</h2>
        </div>
      </div>
    `; 

    personChar.innerHTML = CharInnerHTML;
    document.querySelector(".roles").appendChild(personChar);
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


  <div id="main-content">
  <div>
    <input type="checkbox" id="checkbox" class="heart" onclick="favoritesPerson()" />
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