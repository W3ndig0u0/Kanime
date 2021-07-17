const base_url = "https://api.jikan.moe/v3";

function searchAnime(event) {
    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");
    const query2 = form.get("searchMobile");

    // !kollar om det e mobil eller vanlig som e tom
    if (query === undefined || query === null) {
        fetch(`${base_url}/search/anime?q=${query2}&page=1`)
            .then(res => res.json())
            .then(updateDom)
            .catch(err => console.warn(err.message));
    }

    else if (query2 === undefined || query2 === null) {
        fetch(`${base_url}/search/anime?q=${query}&page=1`)
            .then(res => res.json())
            .then(updateDom)
            .catch(err => console.warn(err.message));
    }

    else {
        fetch(`${base_url}/search/anime?q=${query}&page=1`)
            .then(res => res.json())
            .then(updateDom)
            .catch(err => console.warn(err.message));
    }
}

function updateDom(data) {
    const searchResults = document.querySelector('#search-results');

    const animeByCategories = data.results
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

    document.querySelector('.topManga').style.display = "none";
    document.querySelector('.airing').style.display = "none";
    document.querySelector('.upComing').style.display = "none";
    document.querySelector('.reviews').style.display = "none";
    document.querySelector('.shop').style.display = "none";
    document.querySelector('.newsSection').style.display = "none";
    document.querySelector('.miss').style.display = "none";
}

function pageLoaded() {
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);

    const formMobile = document.getElementById('searchFormMobil');
    formMobile.addEventListener("submit", searchAnime);
}

window.addEventListener("load", pageLoaded);