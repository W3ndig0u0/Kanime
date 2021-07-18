fetch("https://api.jikan.moe/v3/top/anime/1/airing")
  .then(response => response.json())
  .then(result => {
    createSeasonAnimeCard(result);
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function createSeasonAnimeCard(result) {
    const TopCharSection = document.createElement('section');
    TopCharSection.classList.add('imgRow');

    if (undefined !== result.top && result.top.length) {
      for (let i = 0; i < result.top.length; i++) {
      
    const TopCharDiv = document.createElement('div');
    TopCharDiv.classList.add('imgRow');
    
    const thumbnail = result.top[i].image_url;
    const title = result.top[i].title;
    const type = result.top[i].type;

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
          
      TopCharDiv.innerHTML = recentInnerHTML;
      TopCharSection.appendChild(TopCharDiv)
      document.querySelector(".airingAnimeJs").appendChild(TopCharSection)
    }
  }
}