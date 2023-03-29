const TOP_UPCOMING_ANIME_URL = "https://api.jikan.moe/v4/seasons/upcoming";

function ShowUpcoming() {
fetch(TOP_UPCOMING_ANIME_URL)
  .then(response => response.json())
  .then(result => {
    createTopCommingAnimeCard(result);
  });
}

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
  };

  function animeSelect(id){
    sessionStorage.setItem("AnimeID", id);
    console.log(id)
    window.location.assign("../Html/Anime.html");
  }

  function createTopCommingAnimeCard(result) {
    const upCommingSection = document.createElement('section');
    upCommingSection.classList.add('imgRow');

      for (let i = 0; i < result.data.length; i++) {
      // for (let i = 0; i < result.anime.length; i++) {
      
    const upCommingDiv = document.createElement('div');
    upCommingDiv.classList.add('imgRow');
    
    const thumbnail = result.data[i].images.webp.large_image_url;
    const id = result.data[i].mal_id;
    const title = result.data[i].title;
    const type = result.data[i].type;
    const rank = result.data[i].popularity;
  

    const newTitle = capitalizeFirstLetter(title);
    // const newNewTitle = AnimeNameConverter(newTitle);
  
    // !Skapar html
    const recentInnerHTML = 
    `
    <div onclick="animeSelect(${id})" class="imgCard animeCard  ImgCardSlider">
      <div class="cardImage">
          <img
          src=${thumbnail}
          alt=${newTitle}/>
            <div class="${type}Tag tag">${type}</div>
            <div class="epTag">Rank: ${rank}</div>
            <div class="playWrapper"></div>          
          </div>
            <div class="cardInfo">
            <span class="cardTitle">${truncate(newTitle, 35)}</span>
        </div>
      </div>
      `;
          
      upCommingDiv.innerHTML = recentInnerHTML;
      upCommingSection.appendChild(upCommingDiv);
      var upComingAnime = document.querySelector(".upComingAnime");
      if (upComingAnime != null) {
        upComingAnime.appendChild(upCommingSection)
    }
  }
}

ShowUpcoming();