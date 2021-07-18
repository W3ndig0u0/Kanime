const base_url = "https://api.jikan.moe/v3";
let pageNr = 1;

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
    const searchResults = document.querySelector('#search-results');

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
                    <div class="imgCard">
                        <div class="cardImage">
                            <img src="${anime.image_url}">
                            <div class="${key.toLowerCase()}Tag tag">${key.toUpperCase()}</div>
                        </div>
                    <div class="cardInfo">
                        <span class="cardTitle">${anime.title}</span>
                        <p class="cardSynopsis">${anime.synopsis}</p>
                        <p class="cardScore">${anime.score}/10⭐</p>
                    </div>
                        <div class="cardAction">
                            <a href="${anime.url}">Find out more</a>
                        </div>
                    </div>
                `
            }).join("");


        return `
                <section class="imgSection">
                <h4><span>${key.toUpperCase()}</span></h4>
                    <div class="imgRow">${animesHTML}</div>
                </section>
            `
    }).join("");

    document.querySelector('.airing').style.display = "none";
    document.querySelector('.airingRecent').style.display = "none";
    document.querySelector('.topManga').style.display = "none";
    document.querySelector('.airing').style.display = "none";
    document.querySelector('.upComing').style.display = "none";
    document.querySelector('.reviews').style.display = "none";
    document.querySelector('.shop').style.display = "none";
    document.querySelector('.newsSection').style.display = "none";

    
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');
    
    const paginationInnerHTML = 
    `
      <a href="#" onclick="prev()" class="Prev">&laquo;</a>
      <a href="#" onclick="newPageNr()" class="active" >${pageNr}</a>
      <a href="#" onclick="newPageNr()" > ${pageNr+1}</a>
      <a href="#" onclick="newPageNr()" > ${pageNr+2}</a>
      <a href="#" onclick="newPageNr()" > ${pageNr+3}</a>
      <a href="#" onclick="newPageNr()" > ${pageNr+4}</a>
      <a href="#" onclick="newPageNr()" > ${pageNr+5}</a>
      <a href="#" onclick="newPageNr()" > ${pageNr+6}</a>
      <a href="#" onclick="newPageNr()" > ${pageNr+7}</a>
      <a href="#" onclick="newPageNr()" > ${pageNr+8}</a>
      <a href="#" onclick="next()" class="Next">&raquo;</a>
      `;
      
      pagination.innerHTML = paginationInnerHTML;
      document.querySelector(".center").appendChild(pagination)
}

function pageLoaded() {
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}

window.addEventListener("load", pageLoaded);