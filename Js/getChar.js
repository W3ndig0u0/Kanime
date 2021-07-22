const base_url = "https://api.jikan.moe/v3";
let pageNr = 1;

function searchAnime(event) {
  event.preventDefault();

  const form = new FormData(this);
  const query = form.get("search");

  fetch(base_url + "/search/character?q=" + query + "&page=1")
    .then(response => response.json())
    .then(result => {
      console.log(result);
      updateDom(result);
    })
}

function updateDom(data) {
    const searchResults = document.querySelector('#search-resultsChar');

  const animeByCategories = data
      .reduce((acc, anime) => {
          const { type } = anime;
          if (acc[type] === undefined) acc[type] = [];
          acc[type].push(anime);
          return acc;
      }, {});

searchResults.innerHTML = Object.keys(animeByCategories).map(key => {
    
const animesHTML = animeByCategories[key]
.sort((a, b) => a.episodes - b.episodes)
.map(anime => {
    return `
    <div class="imgRow2">
        <div onclick="charSelect(${anime.mal_id})" class="imgCard animeCard">
            <div class="cardImage">
                <img src="${anime.image_url}">
                <div class="${key}Tag tag">${key.toUpperCase()}</div>
                <div class="playWrapper">
                </div>
            </div>
        <div class="cardInfo">
            <span class="cardTitle">${anime.title}</span>
        </div>
            <div class="cardAction">
                <a href="${anime.url}">Find out more</a>
            </div>
        </div>
    </div>
`
}).join("");

return `
    <section class="imgSection">
    <h3><span>${key.toUpperCase()}</span></h3>
        <div class="imgRow2">${animesHTML}</div>
    </div>
    </section>
    `   
}).join("");

    document.querySelector('.airing').style.display = "none";
    document.querySelector('.shop').style.display = "none";
    document.querySelector('.newsSection').style.display = "none";
    document.querySelector('.genreSelect').style.display = "none";
    document.querySelector('.upComming').style.display = "none";
    document.querySelector('.topAnime').style.display = "none";
    document.querySelector('.topManga').style.display = "none";
    document.querySelector('.topNovel').style.display = "none";
    document.querySelector('.topChar').style.display = "none";
    document.querySelector('.reviews').style.display = "none";
    document.querySelector('.shop').style.display = "none";
}

function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
  };

  function charSelect(id){
    sessionStorage.setItem("charId", id);
    console.log(id)
    window.location = "../Html/Char.html"
    return false;
  }

function pageLoaded() {
    const form = document.getElementById('search_form');
    form?.addEventListener("submit", searchAnime);

}

window.addEventListener("load", pageLoaded);