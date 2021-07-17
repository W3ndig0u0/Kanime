const Recent_URL = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.livechart.me%2Ffeeds%2Fepisodes";

fetch(Recent_URL)
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result.items[0]);
    createAnimeCard(result);
  });
  
  function createAnimeCard(result) {
    const recentSection = document.createElement('section');
    recentSection.classList.add('imgRow');

    for (let i = 0; i < 10; i++) {
    const recentDiv = document.createElement('div');
    recentDiv.classList.add('imgRow');
  
    const thumbnail = result.items[i].thumbnail;
    const title = result.items[i].title.toUpperCase();
    const animeUrl = result.items[i].link;
  
    // !Skapar html
    const recentInnerHTML = 
    `
      <div class="imgCard">
        <div class="cardImage">
          <img
          src=${thumbnail}
          alt=${title}/>
          <div class="tvTag tag">TV</div>
        </div>
        <div class="cardInfo">
          <span class="cardTitle">${title}</span>
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