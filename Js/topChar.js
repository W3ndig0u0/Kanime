const TOP_CHAR_URL = "https://api.jikan.moe/v3/top/characters";

fetch(TOP_CHAR_URL)
  .then(response => response.json())
  .then(result => {
    createTopCharCard(result);
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function charSelect(id){
    sessionStorage.setItem("charId", id);
    console.log(id)
    window.location = "../Html/Char.html"
    return false;
  }

  function createTopCharCard(result) {
    const TopCharSection = document.createElement('section');
    TopCharSection.classList.add('imgRow2');

    if (undefined !== result.top && result.top.length) {
      // for (let i = 0; i < 10; i++) {
      for (let i = 0; i < result.top.length; i++) {
      
    const TopCharDiv = document.createElement('div');
    TopCharDiv.classList.add('imgRow2');
    
    const thumbnail = result.top[i].image_url;
    const id = result.top[i].mal_id;
    const title = result.top[i].title;

    const rank = result.top[i].rank;

    const newTitle = capitalizeFirstLetter(title);
    const newNewTitle = AnimeNameConverter(newTitle);
  
    // !Skapar html
    const recentInnerHTML = 
    `
    <div onclick="charSelect(${id})" class="imgCard animeCard">
      <div class="cardImage">
          <img
          src=${thumbnail}
          alt=${newNewTitle}/>
            <div class="epTag">Rank: ${rank}</div>
            <div class="playWrapper">
            </div>
          </div>
            <div class="cardInfo">
            <span class="cardTitle">${newNewTitle}</span>
        </div>
      </div>
      `;
          
      TopCharDiv.innerHTML = recentInnerHTML;
      TopCharSection.appendChild(TopCharDiv)
      document.querySelector(".topCharJs").appendChild(TopCharSection)
    }
  }
}