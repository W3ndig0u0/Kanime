// const UPCOMING_ANIME_URL = "https://api.jikan.moe/v3/season/later";
const TOP_UPCOMING_ANIME_URL = "https://api.jikan.moe/v3/top/anime/1/upcoming";

fetch(TOP_UPCOMING_ANIME_URL)
  .then(response => response.json())
  .then(result => {
    createTopCommingAnimeCard(result);
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function createTopCommingAnimeCard(result) {
    const upCommingSection = document.createElement('section');
    upCommingSection.classList.add('imgRow');

    if (undefined !== result.top && result.top.length) {
      for (let i = 0; i < result.top.length; i++) {
      
    const upCommingDiv = document.createElement('div');
    upCommingDiv.classList.add('imgRow');
    
    const thumbnail = result.top[i].image_url;
    const title = result.top[i].title;
    const type = result.top[i].type;

    const rank = result.top[i].rank;
    const score = result.top[i].score;
    const startDate = result.top[i].start_date;

    const newTitle = capitalizeFirstLetter(title);
    const newNewTitle = AnimeNameConverter(newTitle);
  
    // !Skapar html
    const recentInnerHTML = 
    `
    <div class="imgCard">
      <div class="cardImage">
          <img
          src=${thumbnail}
          alt=${newNewTitle}/>
            <div class="${type}Tag tag">${type}</div>
          </div>
            <div class="cardInfo">
            <span class="cardTitle">${newNewTitle}</span>
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