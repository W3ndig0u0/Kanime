const base_url = "https://api.jikan.moe/v3";
let pageNr = 1;

const searchResults = document.getElementById("searchResults");

function searchAnime(event) {
    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    const urls = [
        `${base_url}/search/anime?q=${query}&page=${pageNr}`, 
        `${base_url}/search/manga?q=${query}&page=${pageNr}`, 
        `${base_url}/search/character?q=${query}&page=${pageNr}`,
        `${base_url}/search/person?q=${query}&page=${pageNr}`
    ];

        Promise.all(urls.map(url =>
                    fetch(url)
                        .then(checkStatus)
                        .then(parseJSON)
                        .catch(error => console.log('There was a problem!', error))
                ))
            .then(data => {
                const DATA_ANIME = data[0].results;
                const DATA_MANGA = data[1].results;
                const DATA_CHAR = data[2].results;
                const DATA_PERS = data[3].results;
                const totalData = [...DATA_ANIME,...DATA_MANGA, ...DATA_CHAR, ...DATA_PERS];

                console.log(totalData)
                updateDom(totalData)
            })

        function checkStatus(response) {
            if (response.ok) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        }

        function parseJSON(response) {
            return response.json();
        }

}

function updateDom(data) {
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
        <div class="animeCard" >
            <div onclick="animeSelect(${anime.mal_id})" class="imgCard animeCard">
                <div class="cardImage">
                    <img src="${anime.image_url}">
                    <div class="${key}Tag tag">${key.toUpperCase()}</div>
                    <div class="playWrapper">
                    </div>
                </div>
            <div class="cardInfo">
                <span class="cardTitle">${truncate(anime.title, 35)}</span>
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
        <div class="space2"></div>
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
    console.log("smile2");
}


function truncate(str, n){
    if (str === undefined || null) {
     return "Null"
   }
   return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};
  

function animeSelect(id){
    sessionStorage.setItem("AnimeID", id);
    console.log(id)
    window.location = "../Html/Anime.html"
    return false;
}

function pageLoaded() {
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}

window.addEventListener("load", pageLoaded);