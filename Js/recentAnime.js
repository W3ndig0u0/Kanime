const RECENT_ANIME_RSS_URL = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.livechart.me%2Ffeeds%2Fepisodes";

fetch(RECENT_ANIME_RSS_URL)
  .then(response => response.json())
  .then(result => {
    createAnimeCard(result);
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function EpConverter(ep) {
      var ep =  ep.split('#')[1]
      return ep
  }
  function AnimeNameConverter(ep) {
      var ep =  ep.split('#')[0]
      return ep
  }

  function createAnimeCard(result) {
    const recentSection = document.createElement('section');
    recentSection.classList.add('imgRow');


    for (let i = 0; i < 10; i++) {
    const recentDiv = document.createElement('div');
    recentDiv.classList.add('imgRow');
  
    const thumbnail = result.items[i].thumbnail;
    const title = result.items[i].title;
    const newTitle = capitalizeFirstLetter(title);
    const nweNewTitle = AnimeNameConverter(newTitle);
    const ep = EpConverter(newTitle)
    const animeUrl = result.items[i].link;

  
    // !Skapar html
    const recentInnerHTML = 
    `
    <div class="imgCard">
      <div class="cardImage">
          <img
          src=${thumbnail}
          alt=${nweNewTitle}/>
            <div class="tvTag tag">TV</div>
            <div class="epTag">Ep ${ep}</div>
          </div>
            <div class="cardInfo">
            <span class="cardTitle">${nweNewTitle}</span>
              <p class="cardSynopsis"></p>
              <p class="cardScore">/10⭐</p>
        </div>
      </div>
      `;
          
      recentDiv.innerHTML = recentInnerHTML;
      recentSection.appendChild(recentDiv)
      document.querySelector(".recentAnime").appendChild(recentSection)
    }
  }