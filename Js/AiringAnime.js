fetch("https://api.jikan.moe/v4/seasons/now")
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
    window.location.assign("../Html/Anime.html");
    console.log(id)
    return false;
  }

  

  function createSeasonAnimeCard(result) {
    const TopCharSection = document.createElement('section');
    TopCharSection.classList.add('imgRow2');

    for (let i = 0; i < result.data.length; i++) {
    // for (let i = 0; i < result.length; i++) {
      
    const TopCharDiv = document.createElement('div');
    const thumbnail = result.data[i].images.webp.large_image_url;
    const id = result.data[i].mal_id;
    const title = result.data[i].title;
    const type = result.data[i].type;

    const rank = result.data[i].rank;

    const newTitle = capitalizeFirstLetter(title);
    // const newNewTitle = AnimeNameConverter(newTitle);
  
    // !Skapar html
    const recentInnerHTML = 
    `
    <div onclick="animeSelect(${id})" class="imgCard animeCard">
      <div class="cardImage">
          <img
          src=${thumbnail}
          alt=${newTitle}/>
          <div class="${type}Tag tag">${type}</div>
          <div class="epTag">Rank: ${rank}</div>
          <div class="playWrapper">
          </div>          
          </div>
          <div class="cardInfo">
            <span class="cardTitle">${truncate(newTitle,35)}</span>
        </div>
      </div>
      `;
          
      TopCharDiv.innerHTML = recentInnerHTML;
      TopCharSection.appendChild(TopCharDiv);
      var airingAnime = document.querySelector(".airingAnimeJs");
      
      if (airingAnime != null) {
        airingAnime.appendChild(TopCharSection);
      }
    }
  }