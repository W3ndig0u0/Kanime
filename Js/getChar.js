function getChar() {
    let charId = sessionStorage.getItem("charId");
    
    fetch("https://api.jikan.moe/v3/character/" + charId)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      CharPage(result);
    })
  }
  
  function CharPage(result) {
    const AnimePageSection = document.createElement('section');
    const AnimePageDiv = document.createElement('div');
    AnimePageDiv.classList.add('statePage');
    
    // !vc
    for (let i = 0; i < result.voice_actors.length; i++) {
      const personAnime = document.createElement('div');
      personAnime.classList.add("vcCard")

      const AnimeThumbnail = result.voice_actors[i].image_url;
      const AnimeTitle = result.voice_actors[i].name;
      const AnimeId = result.voice_actors[i].mal_id;
      const language = result.voice_actors[i].language;
      
      const MovieInnerHTML = 
      `
        <div onclick="personSelect(${AnimeId})" class="imgCard animeCard">
        <div class="cardImage">
            <img
            src=${AnimeThumbnail}
            alt=${AnimeTitle}       
            <div</div>
            <div class="playWrapper">
            </div>          
            </div>
            <div class="cardInfo">
              <h2 class="cardTitle">${truncate(AnimeTitle,25)}</h2>
              <p> ${language} Role</p>
          </div>
        </div>
      `;
    
      personAnime.innerHTML = MovieInnerHTML;
      document.querySelector(".CharVoiceActors").appendChild(personAnime);
    }

    //!manga 
    for (let i = 0; i < result.mangaography.length; i++) {
        const personAnime = document.createElement('div');
        personAnime.classList.add("vcCard")
  
        const AnimeThumbnail = result.mangaography[i].image_url;
        const AnimeTitle = result.mangaography[i].name;
        const AnimeId = result.mangaography[i].mal_id;

        const role = result.mangaography[i].role;
        
        const MovieInnerHTML = 
        `
          <div onclick="mangaSelect(${AnimeId})" class="imgCard animeCard">
          <div class="cardImage">
              <img
              src=${AnimeThumbnail}
              alt=${AnimeTitle}       
              <div</div>
              <div class="playWrapper">
              </div>          
              </div>
              <div class="cardInfo">
                <h2 class="cardTitle">${truncate(AnimeTitle,25)}</h2>
                <p> ${role} Role</p>
            </div>
          </div>
        `;
      
        personAnime.innerHTML = MovieInnerHTML;
        document.querySelector(".charManga").appendChild(personAnime);
    }

    // !anime
    for (let i = 0; i < result.animeography.length; i++) {
        const personAnime = document.createElement('div');
        personAnime.classList.add("vcCard")
  
        const AnimeThumbnail = result.animeography[i].image_url;
        const AnimeTitle = result.animeography[i].name;
        const AnimeId = result.animeography[i].mal_id;
        const role = result.animeography[i].role;
        
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
                <h2 class="cardTitle">${truncate(AnimeTitle,25)}</h2>
                <p> ${role} Role</p>
            </div>
          </div>
        `;
      
        personAnime.innerHTML = MovieInnerHTML;
        document.querySelector(".charMovies").appendChild(personAnime);
    }
    
    const thumbnail = result.image_url;
  
    const title = result.name;
    const titleJp = result.name_kanji;
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
              <p class="titleEn">${titleJp}</p>
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
            <h1 class="beforeState">About: </span>  
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
      document.querySelector(".charPage").appendChild(AnimePageSection)
      menuBgChange(thumbnail);
  }
  
  function truncate(str, n){
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
  
  
  function menuBgChange(Imgurl)
  {
    const menuBgColor1 = " rgba(2, 49, 90, 0.88),";
    const menuBgColor2 = " rgba(2, 49, 90, 0.98) "
    const menuBg = "linear-gradient(to bottom," + menuBgColor1 + menuBgColor2 + "), url("+ Imgurl +")";
    document.querySelector(".menuAnimePage").style.backgroundImage = menuBg;
  }
  
  getChar();