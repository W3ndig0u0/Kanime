fetch("https://api.jikan.moe/v3/top/anime/1/airing")
  .then(response => response.json())
  .then(result => {
    createSeasonAnimeCard(result);
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


  function createSeasonAnimeCard(result) {
    const TopCharSection = document.createElement('section');
    TopCharSection.classList.add('imgRow2');

    // if (undefined !== result.top && result.top.length) {
    for (let i = 0; i < 23; i++) {
      // for (let i = 0; i < result.top.length; i++) {
      
    const TopCharDiv = document.createElement('div');
    TopCharDiv.classList.add('imgRow2');
    
    const thumbnail = result.top[i].image_url;
    const id = result.top[i].mal_id;
    const title = result.top[i].title;
    const type = result.top[i].type;

    const newTitle = capitalizeFirstLetter(title);
    const newNewTitle = AnimeNameConverter(newTitle);
  
    // !Skapar html
    const recentInnerHTML = 
    `
    <div onclick="animeSelect(${id})" class="imgCard">
      <div class="cardImage">
          <img
          src=${thumbnail}
          alt=${newNewTitle}/>
          <div class="${type}Tag tag">${type}</div>
          <div class="playWrapper">
          </div>          
          </div>
          <div class="cardInfo">
            <span class="cardTitle">${truncate(newNewTitle,35)}</span>
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