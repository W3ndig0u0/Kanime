const searchResults = document.getElementById("searchResults");

function searchAnime(event) {
    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    const urls = [
        `https://api.jikan.moe/v4/anime?q=${query}`, 
        `https://api.jikan.moe/v4/manga?q=${query}`, 
        `https://api.jikan.moe/v4/characters?q=${query}`
        ];

        Promise.all(urls.map(url =>
             fetch(url)
             .then(parseJSON)))
            .then(data => {
                console.log(data);
                const DATA_ANIME = data[0].data;
                const DATA_MANGA = data[1].data;
                const DATA_CHAR = data[2].data;
                const totalData = [...DATA_ANIME,...DATA_MANGA, ...DATA_CHAR];
                console.log(totalData);
                updateDom(totalData)
                clickCard();
            })

        function parseJSON(response) {
            return response.json();
        }

}

function typeToSelectFn(genre, id){
    console.log(id);
    // if (genre === "TV") {
    //     animeSelect(id)
    // }  else if (genre === "Movie") {
    //     animeSelect(id)
    // }  else if (genre === "OVA") {
    //     animeSelect(id)
    // }  else if (genre === "ONA") {
    //     animeSelect(id)
    // }  
    // if (genre === "Manga") {
    //     mangaSelect(id)
    // }  else if (genre === "Manhwa") {
    //     mangaSelect(id)
    // }  else if (genre === "Light Novel") {
    //     mangaSelect(id)
    // }  else if (genre === "One-shot") {
    //     mangaSelect(id)
    // }  
    //  if (genre === "char") {
    //     charSelect(id)
    // }
  }

function updateDom(data) {
    const animeByCategories = data.reduce((acc, anime) => {
            let { type } = anime;
            if (!type || typeof type !== "string") {
                type = "char";
            }
            
            if (acc[type] === undefined) acc[type] = [];
            acc[type].push(anime);
            return acc;
            
        }, {});
        

    searchResults.innerHTML = Object.keys(animeByCategories).map(key => {
        
    const animesHTML = animeByCategories[key]
    .sort((a, b) => b.name - a.name)
    .map(anime => {

        let title = anime.title ?? anime.name;
        let animeImg = anime.images?.jpg.large_image_url ?? anime.images?.jpg.image_url;
        let rank = anime.rank;
        let id = anime.mal_id;
        let rankTitle = "Rank"
        
        return `
        <div class="imgRow" >
        <div class="imgCard animeCard">
        <div class="cardImage">
                    <img src="${animeImg}">
                    <div class="epTag key id">${rankTitle}: ${rank}</div>
                    <div class="${key}Tag tag">${key.toUpperCase()}</div>
                    <div class="playWrapper">
                    </div>
                </div>
            <div class="cardInfo">
                <span class="cardTitle">${truncate(title, 35)}</span>
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
    
    document.querySelector('.main').style.display = "none";
    document.querySelector('.specialPage').style.display = "none";


    const menuBgColor1 = " rgba(5, 131, 242, 0.85),";
    const menuBgColor2 = " rgba(5, 131, 242, 0.98) ";
    const Imgurl = "https://i.pinimg.com/originals/5f/12/b9/5f12b974076736afe4bfe170b36b5e89.jpg";
    const menuBg = "linear-gradient(to bottom," + menuBgColor1 + menuBgColor2 + "), url("+ Imgurl +")";

    const menuAnimePage = document.querySelector(".menuAnimePage");

    if (menuAnimePage !== null|| menuAnimePage !== undefined) {
        menuAnimePage.style.backgroundImage = menuBg;
        menuAnimePage.style.background = menuBg;
    }
}

function animeSelect(id){
    sessionStorage.setItem("AnimeID", id);
    console.log(id)
    window.location.assign("../Html/Anime.html");
  }
  
  function mangaSelect(id){
    sessionStorage.setItem("mangaId", id);
    console.log(id)
    window.location.assign("../Html/Manga.html");
  }
  
  function charSelect(id){
    sessionStorage.setItem("charId", id);
    console.log(id)
    window.location.assign("../Html/Char.html");
  }


function truncate(str, n){
    if (str === null || str === undefined) {
      return "Null"
    }
    return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};

function pageLoaded() {
    const form = document.getElementById('search_form');
    form?.addEventListener("submit", searchAnime);
}

function clickCard(){
const imgCard = document.querySelectorAll('.imgRow');

for (let i = 0; i < animeCards.length; i++) {
    imgCard[i].addEventListener('onclick', hoverCardIn)
  }
    // typeToSelectFn(key, id);
}

function hoverCardIn(event) {

}



window.addEventListener("load", pageLoaded);