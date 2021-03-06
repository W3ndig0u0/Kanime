const TOP_UPCOMING_ANIME_URL = "https://api.jikan.moe/v3/season/later";

fetch(TOP_UPCOMING_ANIME_URL)
  .then(response => response.json())
  .then(result => {
    // console.log(result.anime);
    createTopCommingAnimeCard(result);
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

  function createTopCommingAnimeCard(result) {
    const upCommingSection = document.createElement('section');
    upCommingSection.classList.add('imgRow');

    if (undefined !== result.anime && result.anime.length) {
      // for (let i = 0; i < 25; i++) {
      for (let i = 0; i < result.anime.length; i++) {
      
    const upCommingDiv = document.createElement('div');
    upCommingDiv.classList.add('imgRow');
    
    const thumbnail = result.anime[i].image_url;
    const title = result.anime[i].title;
    const type = result.anime[i].type;
    const id = result.anime[i].mal_id;

    const rank = result.anime[i].rank;
    const score = result.anime[i].score;
    const startDate = result.anime[i].start_date;

    const newTitle = capitalizeFirstLetter(title);
    const newNewTitle = AnimeNameConverter(newTitle);
  
    // !Skapar html
    const recentInnerHTML = 
    `
    <div onclick="animeSelect(${id})" class="imgCard animeCard ImgCardSlider">
      <div class="cardImage">
          <img
          src=${thumbnail}
          alt=${newNewTitle}/>
            <div class="${type}Tag tag">${type}</div>
            <div></div>
            <div class="playWrapper">
            </div>          
          </div>
            <div class="cardInfo">
            <span class="cardTitle">${truncate(newNewTitle, 35)}</span>
              <p class="cardSynopsis"></p>
              <p class="cardScore">/10⭐</p>
        </div>
      </div>
      `;
          
      upCommingDiv.innerHTML = recentInnerHTML;
      upCommingSection.appendChild(upCommingDiv)
      document.querySelector(".upComingAnime").appendChild(upCommingSection)
    }
  }
}