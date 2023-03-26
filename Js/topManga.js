const TOP_MANGA_URL = "https://api.jikan.moe/v4/top/manga";

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
    // window.location = "../Html/Manga.html"
    return false;
  }

  function createTopMangaCard(result) {
    const TopMangaSection = document.createElement('section');
    TopMangaSection.classList.add('imgRow');

      for (let i = 0; i < 15; i++) {
      // for (let i = 0; i < result.top.length; i++) {
      
    const TopMangaDiv = document.createElement('div');
    TopMangaDiv.classList.add('imgRow');
    // console.log(result)
    
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
    <div onclick="mangaSelect(${id})" class="imgCard animeCard ImgCardSlider">
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
          
      TopMangaDiv.innerHTML = recentInnerHTML;
      TopMangaSection.appendChild(TopMangaDiv)
      var topMangaSection = document.querySelector(".topMangaJs");
      if (topMangaSection != null) {
        topMangaSection.appendChild(TopMangaSection)
    }
  }
}