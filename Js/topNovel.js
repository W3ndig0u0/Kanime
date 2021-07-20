const TOP_NOVEL_URL = "https://api.jikan.moe/v3/top/manga/1/novels";

fetch(TOP_NOVEL_URL)
  .then(response => response.json())
  .then(result => {
    createTopNovelCard(result);
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function createTopNovelCard(result) {
    const TopNovelSection = document.createElement('section');
    TopNovelSection.classList.add('imgRow');

    if (undefined !== result.top && result.top.length) {
      // for (let i = 0; i < 10; i++) {
      for (let i = 0; i < result.top.length; i++) {
      
    const TopNovelDiv = document.createElement('div');
    TopNovelDiv.classList.add('imgRow');
    
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
    <div class="imgCard animeCard">
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
          
      TopNovelDiv.innerHTML = recentInnerHTML;
      TopNovelSection.appendChild(TopNovelDiv)
      document.querySelector(".topNovelJs").appendChild(TopNovelSection)
    }
  }
}