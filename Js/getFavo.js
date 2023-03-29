const animeStorage = document.createElement('div');
const mangaStorage = document.createElement('div');
const charStorage = document.createElement('div');

function anime() {
  Object.keys(localStorage).forEach(function(key){
    if (key.includes("Favorite Animes ")) {
      animeNr = localStorage.getItem(key);
      animeStorage.innerHTML = animeNr;

      fetch("https://api.jikan.moe/v4/anime/" + animeNr)
      .then(response => response.json())
      .then(result => {
          AnimeCommentsPage(result);
      })
    }
  }); 
}

console.log(localStorage)

function manga() {
  Object.keys(localStorage).forEach(function(key){
    if (key.includes("Favorites Manga ")) {
      mangaNr = localStorage.getItem(key);
      mangaStorage.innerHTML = mangaNr;
      fetch("https://api.jikan.moe/v4/manga/" + mangaStorage.innerHTML)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        MangaCommentsPage(result);          
      })
    }
  }); 
}

function char() {
  Object.keys(localStorage).forEach(function(key){
    if (key.includes("Favorites Char ")) {
      charNr = localStorage.getItem(key);
      charStorage.innerHTML = charNr;
      fetch("https://api.jikan.moe/v4/characters/" + charStorage.innerHTML)
      .then(response => response.json())
      .then(result => {
        CharCommentPage(result);          
      })
    }
  }); 
}

function AnimeCommentsPage(result) {
    const commentDiv = document.createElement('div');
    const type = result.data.type;
    const premiered = result.data.year ?? "Not Released Yet";
    const img = result.data.images.webp.large_image_url;
    const animeID = result.data.mal_id;
    const content = result.data.title_english ?? result.data.title;
    
    // !Skapar html
    const CommentsReviewInnerHTML = 
    `
    <div onclick="animeSelect(${animeID})">
      <img class="reviewerImg" src=${img} alt=${content}>
      <p>${truncate(content, 35)}</p>
        <span>${premiered}</span>
        <span>${type}</span>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.getElementsByClassName("animeFavo")[0].appendChild(commentDiv);
}

function MangaCommentsPage(result) {
    const commentDiv = document.createElement('div');
    const content = result.title;
    const type = result.type;
    const premiered = result.published.from;
    const premieredYear = premiered.substring(0, 4);

    const img = result.image_url;
    const animeID = result.mal_id;
    const message = result.message;
    
    // !Skapar html
    const CommentsReviewInnerHTML = 
    `
    <div onclick="mangaSelect(${animeID})">
      <img class="reviewerImg" src=${img} alt=${content}>
        <p>${truncate(content, 35)}</p>
        <span>${premieredYear}</span>
        <span>${type}</span>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.getElementsByClassName("mangaFavo")[0].appendChild(commentDiv);
}

function CharCommentPage(result) {
    const commentDiv = document.createElement('div');


    const favorites = result.data.favorites;
    const animeID = result.data.mal_id;
    const content = result.data.name_kanji;
    const img = result.data.images.jpg.image_url;
    const title = result.data?.name_en ?? result.data?.name;

    // !Skapar html
    const CommentsReviewInnerHTML = 
    `
    <div onclick="charSelect(${animeID})">
      <img class="reviewerImg" src=${img} alt=${title}>
        <p>${truncate(title, 30)}</p>
        <span>${content}</span>
        <br>
        <span>❤️: ${favorites}</span>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.getElementsByClassName("charFavo")[0].appendChild(commentDiv);
}



function animeSelect(id){
  sessionStorage.clear();
  sessionStorage.setItem("AnimeID", id);
  window.location.assign("../Html/Anime.html");
}

function mangaSelect(id){
  sessionStorage.clear();
  sessionStorage.setItem("mangaId", id);
  window.location.assign("../Html/Manga.html");
}

function charSelect(id){
  sessionStorage.clear();
  sessionStorage.setItem("charId", id);
  window.location.assign("../Html/Char.html");
}


function truncate(str, n){
  if (str === null || str === undefined) {
    return "Null"
  }
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};


anime();
manga();
char();