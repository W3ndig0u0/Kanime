function getChar() {
  let charId = sessionStorage.getItem("charId");

  fetch("https://api.jikan.moe/v4/characters/" + charId + "/full")
    .then((response) => response.json())
    .then((result) => {
        CharPage(result);
        CharAnime(result);
        CharManga(result);
        CharVC(result);
    })
}

function getCharGallery() {
  let charId = sessionStorage.getItem("charId");

  fetch("https://api.jikan.moe/v4/characters/" + charId + "/pictures")
    .then((response) => response.json())
    .then((result) => {
        CharPageGallery(result);
    });
}

function CharPage(result) {
  const AnimePageSection = document.createElement("section");
  const AnimePageDiv = document.createElement("div");
  AnimePageDiv.classList.add("statePage");

  const galleryAnimeDiv3 = document.createElement("div");
  galleryAnimeDiv3.classList.add("imgRow2");

  const thumbnail = result.data.images.jpg.image_url;

  const title = result.data?.name_en ?? result.data?.name;
  const titleJp = result.data.name_kanji;
  const MalURL = result.data.url;

  const members = result.data.favorites;
  const synopsis = result.data.about;
  var AnimeTitle = result.data.nicknames[0];

  for (let i = 1; i < result.data.nicknames.length; i++) {
     AnimeTitle += " " + result.data.nicknames[i];  
  }

  // !Skapar html
  const PageInnerHTML = `
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
              <p class="titleJp">${titleJp}</p>

              
            <div id="main-content">
            <div>
              <input type="checkbox" id="checkbox" class="heart" onclick="favoritesChar()" />
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
            <div >
            <span class="beforeState charNickName">NickNames:</span>
            <span class="state"> ${AnimeTitle}</span>
            </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  
      <div class="synopsis">
        <div class="rankInfo">
          <div>
            <span class="beforeState">Favorites:</span>
            <span class="state"> ${members}</span>
          </div>
          <div>
            <span class="beforeState">Birthday:</span>
            <span class="state"> Return Birthday...</span>
          </div>
          </div>
          <div>
          <h2 class="beforeState">About:</h2>  
          <p class="state"> ${synopsis}</p>
      </div>
  
        <div class="iframe">
          <button>
            <a href=${MalURL} title="MyAnimeList Link" target="_blank">MyAnimeList Link</a> 
          </button>
        <div><br></div>
        </div>
      </div>
      
      </div>
    </div>
      `;

  AnimePageDiv.innerHTML = PageInnerHTML;
  AnimePageSection.appendChild(AnimePageDiv);

  var charPage = document.querySelector(".charPage");
  if (charPage == null) return;
  charPage.appendChild(AnimePageSection);

  menuBgChange(thumbnail);
}

function truncate(str, n){
  if (str === null || str === undefined) {
    return "Null"
  }
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};

function cutWord(str, end){
  if (str === null || str === undefined) {
    return "Null"
  }

  // !FIXA SÅ ATT DET RETURNAR FÖDELSE
  var index = str.indexOf("Birthdate:");
  var indexEnds = str.lastIndexOf('(');

  var birthday = str.split(index, indexEnds);

  birthday =   str.split("Birthdate:").pop()[0];

  return birthday;
};


function menuBgChange(Imgurl) {
  const menuBgColor1 = " rgba(2, 49, 90, 0.8), ";
  const menuBgColor2 = " rgba(2, 49, 90, 0.9)";
  const menuBg =
    "linear-gradient(to bottom," +
    menuBgColor1 +
    menuBgColor2 +
    "), url(" +
    Imgurl +
    ")";
    
    var bg = document.querySelector(".menuAnimePage");
    if (bg == null) return
    bg.style.backgroundImage = menuBg
}

function CharPageGallery(result) {
  for (let i = 0; i < result.data.length; i++) {
    const galleryAnime = document.createElement("div");
    galleryAnime.classList.add("vcCard2");

    const galleryImg = result.data[i].jpg.image_url;

    const MovieInnerHTML = `
          <div class="imgCard animeCard">
          <div class="cardImage">
              <img
              src=${galleryImg}
              alt=${galleryImg}       
            </div>
            <div class="doujinshiTag tag">IMG</div>
          </div>
        `;

    galleryAnime.innerHTML = MovieInnerHTML;
    var gallery = document.querySelector(".charGallery");
    if (gallery == null) return
    gallery.appendChild(galleryAnime);
  }
}

function CharAnime(result) {
  const charAnimeDiv = document.createElement("div");
  charAnimeDiv.classList.add("imgRow2");
  console.log(result)

  // for (let i = 0; i < result.data.anime.length; i++) {
  for (let i = 0; i < result.data.anime.length; i++) {
    const charAnime = document.createElement("div");
    charAnime.classList.add("vcCard");
    const resultAnime = result.data.anime[i];

    const AnimeThumbnail = resultAnime.anime.images.webp.large_image_url;
    const AnimeTitle = resultAnime.anime.title;
    const AnimeId = resultAnime.anime.mal_id;
    const role = resultAnime.role
    
    const MovieInnerHTML = `
          <div onclick="animeSelect(${AnimeId})" class="imgCard animeCard">
          <div class="cardImage">
              <img
              src=${AnimeThumbnail}
              alt=${AnimeTitle}       
              <div</div>
              <div class="tvTag tag">TV</div>
              <div class="epTag roleTag">${role.toUpperCase()}</div>

  
              <div class="playWrapper">
              </div>
              </div>
              <div class="cardInfo">
                <h2 class="cardTitle">${truncate(AnimeTitle, 25)}</h2>
            </div>
          </div>
        `;

    charAnime.innerHTML = MovieInnerHTML;
    charAnimeDiv.appendChild(charAnime);
    const charMovies = document.querySelector(".charMovies");
    if (charMovies == null) return;
    charMovies.appendChild(charAnimeDiv);
  }
}

function CharManga(result) {
  const charMangaDiv = document.createElement("div");
  charMangaDiv.classList.add("imgRow2");

  for (let i = 0; i < result.data.manga.length; i++) {
  // for (let i = 0; i < 15; i++) {
    const charManga = document.createElement("div");
    charManga.classList.add("vcCard");
    const resultManga = result.data.manga[i];

    const MangaThumbnail = resultManga.manga.images.webp.large_image_url;
    const MangaTitle = resultManga.manga.title;
    const MangaId = resultManga.manga.mal_id;
    const role = resultManga.role
    
    const MovieInnerHTML = `
          <div onclick="mangaSelect(${MangaId})" class="imgCard MangaCard">
          <div class="cardImage">
              <img
              src=${MangaThumbnail}
              alt=${MangaTitle}       
              <div</div>
              <div class="MangaTag tag">Manga</div>
              <div class="epTag roleTag">${role.toUpperCase()}</div>
              <div class="playWrapper">
              </div>
              </div>
              <div class="cardInfo">
                <h2 class="cardTitle">${truncate(MangaTitle, 25)}</h2>
            </div>
          </div>
        `;

    charManga.innerHTML = MovieInnerHTML;
    charMangaDiv.appendChild(charManga);
    const charMovies = document.querySelector(".charManga");
    if (charMovies == null) return;
    charMovies.appendChild(charMangaDiv);
  }
}

function CharVC(result) {
  const charPersonDiv = document.createElement("div");
  charPersonDiv.classList.add("imgRow2");

  for (let i = 0; i < result.data.voices.length; i++) {
  // for (let i = 0; i < 15; i++) {
    const charPerson = document.createElement("div");
    charPerson.classList.add("vcCard");
    const resultPerson = result.data.voices[i];

    const PersonThumbnail = resultPerson.person.images.jpg.image_url;
    const PersonTitle = resultPerson.person.name;
    const PersonId = resultPerson.person.mal_id;
    const language = resultPerson.language
    
    const MovieInnerHTML = `
          <div onclick="personSelect(${PersonId})" class="imgCard PersonCard">
          <div class="cardImage">
              <img
              src=${PersonThumbnail}
              alt=${PersonTitle}
              <div</div>
              <div class="epTag langTag">${language.toUpperCase()}</div>
              <div class="vaTag tag">VA</div>
              <div class="playWrapper">
              </div>
              </div>
              <div class="cardInfo">
                <h2 class="cardTitle">${truncate(PersonTitle, 25)}</h2>
            </div>
          </div>
        `;

    charPerson.innerHTML = MovieInnerHTML;
    charPersonDiv.appendChild(charPerson);
    const charVoiceActors = document.querySelector(".CharVoiceActors");
    if (charVoiceActors == null) return;
    charVoiceActors.appendChild(charPersonDiv);
  }
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

getChar();
getCharGallery();