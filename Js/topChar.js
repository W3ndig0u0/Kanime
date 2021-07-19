const TOP_CHAR_URL = "https://api.jikan.moe/v3/top/characters";

fetch(TOP_CHAR_URL)
  .then(response => response.json())
  .then(result => {
    createTopCharCard(result);
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function createTopCharCard(result) {
    const TopCharSection = document.createElement('section');
    TopCharSection.classList.add('imgRow');

    if (undefined !== result.top && result.top.length) {
      for (let i = 0; i < 10; i++) {
      // for (let i = 0; i < result.top.length; i++) {
      
    const TopCharDiv = document.createElement('div');
    TopCharDiv.classList.add('imgRow');
    
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
            <div class="epTag">Top: ${rank}</div>
          </div>
            <div class="cardInfo">
            <span class="cardTitle">${newNewTitle}</span>
              <p class="cardSynopsis"></p>
              <p class="cardScore">/10⭐</p>
        </div>
      </div>
      `;
          
      TopCharDiv.innerHTML = recentInnerHTML;
      TopCharSection.appendChild(TopCharDiv)
      document.querySelector(".topCharJs").appendChild(TopCharSection)
    }
  }
}