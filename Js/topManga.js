const TOP_MANGA_URL = "https://api.jikan.moe/v3/top/manga/1/bypopularity";

fetch(TOP_MANGA_URL)
  .then(response => response.json())
  .then(result => {
    createTopMangaCard(result);
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
  };

  function mangaSelect(id){
    sessionStorage.setItem("mangaId", id);
    console.log(id)
    window.location = "../Html/Manga.html"
    return false;
  }

  function createTopMangaCard(result) {
    const TopMangaSection = document.createElement('section');
    TopMangaSection.classList.add('imgRow');

    if (undefined !== result.top && result.top.length) {
      // for (let i = 0; i < 10; i++) {
      for (let i = 0; i < result.top.length; i++) {
      
    const TopMangaDiv = document.createElement('div');
    TopMangaDiv.classList.add('imgRow');
    
    const thumbnail = result.top[i].image_url;
    const id = result.top[i].mal_id;
    const title = result.top[i].title;
    const type = result.top[i].type;

    const rank = result.top[i].rank;

    const newTitle = capitalizeFirstLetter(title);
    const newNewTitle = AnimeNameConverter(newTitle);
  
    // !Skapar html
    const recentInnerHTML = 
    `
    <div onclick="mangaSelect(${id})" class="imgCard animeCard ImgCardSlider">
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
            <span class="cardTitle">${truncate(newNewTitle, 35)}</span>
        </div>
      </div>
      `;
          
      TopMangaDiv.innerHTML = recentInnerHTML;
      TopMangaSection.appendChild(TopMangaDiv)
      document.querySelector(".topMangaJs").appendChild(TopMangaSection)
    }
  }
}