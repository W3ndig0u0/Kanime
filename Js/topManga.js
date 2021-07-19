const TOP_MANGA_URL = "https://api.jikan.moe/v3/top/manga/1/bypopularity";

fetch(TOP_MANGA_URL)
  .then(response => response.json())
  .then(result => {
    createTopMangaCard(result);
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function createTopMangaCard(result) {
    const TopMangaSection = document.createElement('section');
    TopMangaSection.classList.add('imgRow');

    if (undefined !== result.top && result.top.length) {
      // for (let i = 0; i < 10; i++) {
      for (let i = 0; i < result.top.length; i++) {
      
    const TopMangaDiv = document.createElement('div');
    TopMangaDiv.classList.add('imgRow');
    
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
            <div class="epTag">Rank: ${rank}</div>
            <div class="playWrapper">
            </div>
          </div>
            <div class="cardInfo">
            <span class="cardTitle">${newNewTitle}</span>
              <p class="cardSynopsis"></p>
              <p class="cardScore">/10⭐</p>
        </div>
      </div>
      `;
          
      TopMangaDiv.innerHTML = recentInnerHTML;
      TopMangaSection.appendChild(TopMangaDiv)
      document.querySelector(".topMangaJs").appendChild(TopMangaSection)
    }
  }
}