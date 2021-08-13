function dayWeek(){
  var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var d = new Date();
  var dayName = days[d.getDay()];
  return dayName
}

let dayName = dayWeek();

function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};

function animeSelect(id){
  sessionStorage.setItem("AnimeID", id);
  console.log(id)
  window.location = "../Html/Anime.html"
  return false;
}

fetch("https://api.jikan.moe/v3/schedule/" + dayName)
  .then(response => response.json())
  .then(result => {
    // !INTE BRA!!! HITTA ETT Bättre SÄTT
    switch (dayName) {
      case "sunday":
        createAnimeHeaderNewsCard(result.sunday);
      break;
      case "monday":
        createAnimeHeaderNewsCard(result.monday);
      break;
      case "tuesday":
        createAnimeHeaderNewsCard(result.tuesday);
      break;
      case "wednesday":
        createAnimeHeaderNewsCard(result.wednesday);
      break;
      case "thursday":
        createAnimeHeaderNewsCard(result.thursday);
      break;
      case "friday":
        createAnimeHeaderNewsCard(result.friday);
      break;
      case "saturday":
        createAnimeHeaderNewsCard(result.saturday);
      break;
    }
  });

  function dateConverser(date) {
    var str = date;
    var hour =  str.slice(11,16);
    
    return ["Airing Today At: " + hour]
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function createAnimeHeaderNewsCard(result) {
    for (let i = 0; i < result.length; i++) {
    const headerNewsSection = document.createElement('section');
    headerNewsSection.classList.add('newsCards');
    
  
    const id = result[i].mal_id;
    const thumbnail = result[i].image_url;
    const title = result[i].title;
    const scores = result[i].score;
    const genre = result[i].genres[0]?.name;
    const genre2 = result[i].genres[1]?.name;

    const type = result[i].type;
    const synopsis = result[i].synopsis;

    const pubDate = result[i].airing_start;
    const newPubDate = dateConverser(pubDate);
  
    // !Skapar html
    const newsInnerHTML = 
    `
      <div class="newsCard">
      <div class="card">
        <div class="img">
        <img
        src=${thumbnail}
        alt=${capitalizeFirstLetter(title)}/>
        </div>
        <div class="card-info">
        <div class="featured">
        <h6 class="news">${type}</h6>
            <h6 class="tv">${genre}</h6>
            <h6 class="movie">${genre2}</h6>
          </div>
          <h2>${title}</h2>
          <img class="mobileImgHeader"
          src=${thumbnail}
          alt=${capitalizeFirstLetter(title)}/>
          <p onclick="animeSelect(${id})" class="animeCard source">Learn More</p>
          <p><i class="fa fa-calendar"></i> ${newPubDate}</p>
          <h5>${truncate(capitalizeFirstLetter(synopsis), 170)}</h5>

          <div>
            <span class="dot dotActive"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
      <a class="prev cardPrev" onclick="plusSlides(-1)">&#10094;</a>
      <a class="next cardNext" onclick="plusSlides(1)">&#10095;</a>
    </div>
      `;
          
      headerNewsSection.innerHTML = newsInnerHTML;
      document.querySelector(".AnimeCardsJs").appendChild(headerNewsSection)
    }
  }