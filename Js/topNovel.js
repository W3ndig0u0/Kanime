const TOP_NOVEL_URL = "https://api.jikan.moe/v3/top/manga/1/novels";

fetch(TOP_NOVEL_URL)
  .then(response => response.json())
  .then(result => {
    createTopNovelCard(result);
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }  
  
  function mangaSelect(id){
    sessionStorage.setItem("mangaId", id);
    console.log(id)
    window.location = "../Html/Manga.html"
    return false;
  }

  function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
  };



  function createTopNovelCard(result) {
    const TopNovelSection = document.createElement('section');
    TopNovelSection.classList.add('imgRow');

    if (undefined !== result.top && result.top.length) {
      // for (let i = 0; i < 10; i++) {
      for (let i = 0; i < result.top.length; i++) {
      
    const TopNovelDiv = document.createElement('div');
    TopNovelDiv.classList.add('imgRow');
    
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
            <span class="cardTitle">${truncate(newNewTitle, 30)}</span>
        </div>
      </div>
      `;
          
      TopNovelDiv.innerHTML = recentInnerHTML;
      TopNovelSection.appendChild(TopNovelDiv)
      document.querySelector(".topNovelJs").appendChild(TopNovelSection)
    }
  }
}