const animeStorage = document.createElement('div');
const mangaStorage = document.createElement('div');
const charStorage = document.createElement('div');

function anime() {
  Object.keys(localStorage).forEach(function(key){
    if (key.includes("Favorite Animes ")) {
      animeNr = localStorage.getItem(key);
      animeStorage.innerHTML = animeNr;
      fetch("https://api.jikan.moe/v3/anime/" + animeStorage.innerHTML)
      .then(response => response.json())
      .then(result => {
        console.log(result);
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
      fetch("https://api.jikan.moe/v3/manga/" + mangaStorage.innerHTML)
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
      fetch("https://api.jikan.moe/v3/character/" + charStorage.innerHTML)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        CharCommentPage(result);          
      })
    }
  }); 
}

function AnimeCommentsPage(result) {
    const commentDiv = document.createElement('div');
    const content = result.title;
    const type = result.type;
    const premiered = result.premiered;

    const img = result.image_url;
    const animeID = result.mal_id;
    
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
    const content = result.name;

    const img = result.image_url;
    const animeID = result.mal_id;
    
    // !Skapar html
    const CommentsReviewInnerHTML = 
    `
    <div onclick="charSelect(${animeID})">
      <img class="reviewerImg" src=${img} alt=${content}>
        <p>${truncate(content, 30)}</p>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.getElementsByClassName("charFavo")[0].appendChild(commentDiv);
}


function animeSelect(id){
  sessionStorage.setItem("AnimeID", id);
  console.log(id)
  window.location = "../Html/Anime.html"
  return false;
}

function mangaSelect(id){
  sessionStorage.setItem("mangaId", id);
  console.log(id)
  window.location = "../Html/Manga.html"
  return false;
}

function charSelect(id){
  sessionStorage.setItem("charId", id);
  console.log(id)
  window.location = "../Html/Char.html"
  return false;
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