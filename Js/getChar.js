const { stringify } = require("uuid");

function getChar() {
  let charId = sessionStorage.getItem("charId");
  
  fetch("https://api.jikan.moe/v3/character/" + charId)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    CharPage(result);
  })
}

let rank = stringify(sessionStorage.getItem("charRank"));

function capitalizeFirstLetter(string) {
  if (string === null) {
    return undefined;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};

function CharPage(result) {
  const AnimePageSection = document.createElement('section');
  const AnimePageDiv = document.createElement('div');
  AnimePageDiv.classList.add('statePage');

  console.log(rank)
  
  const thumbnail = result.image_url;

  const titleEn = result.name;
  const title = result.name_kanji;

  const type = result.type;
  const MalURL = result.url;

  const genres = result.voice_actors[0]?.name;
  const genres1 = result.voice_actors[1]?.name;
  const genres2 = result.voice_actors[2]?.name;
  
  const genresImg = result.voice_actors[0]?.image_url;
  const genres1Img= result.voice_actors[1]?.image_url;
  const genres2Img = result.voice_actors[2]?.image_url;
  
  const members = result.member_favorites;
  const synopsis = result.about;

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
            <span class="beforeState">Members: </span>
            <span class="state">${members}</span>
          </div>
          <div>
          <h1 class="beforeState">About: </span>  
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
    document.querySelector(".charPage").appendChild(AnimePageSection)
    menuBgChange(thumbnail);
}


function menuBgChange(Imgurl)
{
  const menuBgColor1 = " rgba(2, 49, 90, 0.88),";
  const menuBgColor2 = " rgba(2, 49, 90, 0.98) "
  const menuBg = "linear-gradient(to bottom," + menuBgColor1 + menuBgColor2 + "), url("+ Imgurl +")";
  document.querySelector(".menuAnimePage").style.backgroundImage = menuBg;
}


getChar();