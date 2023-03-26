const TOP_ANIME_URL = "https://api.jikan.moe/v4/top/anime";

fetch(TOP_ANIME_URL)
  .then(response => response.json())
  .then(result => {
    createTopAnimeCard(result);
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
    // window.location = "../Html/Anime.html"
    return false;
  }


  function createTopAnimeCard(result) {
    const TopAnimeSection = document.createElement('section');
    TopAnimeSection.classList.add('imgRow');

      // for (let i = 0; i < 10; i++) {
    for (let i = 0; i < 10; i++) {
      
    const TopAnimeDiv = document.createElement('div');
    TopAnimeDiv.classList.add('imgRow');

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
    <div onclick="animeSelect(${id})" class="imgCard animeCard ImgCardSlider">
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
            <span class="cardTitle">${truncate(newTitle, 35)}</span>
        </div>
      </div>
      `;
          
      TopAnimeDiv.innerHTML = recentInnerHTML;
      TopAnimeSection.appendChild(TopAnimeDiv)
      var topAnime = document.querySelector(".topAnimeJs");
      if (topAnime != null) {
        topAnime.appendChild(TopAnimeSection)
    }
  }
}