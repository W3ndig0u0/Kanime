function dayWeek(){
  var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var d = new Date();
  var dayName = days[d.getDay()];
  return dayName
}

let dayName = dayWeek();

function truncate(str, n){
  return (str?.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};

function animeSelect(id){
  sessionStorage.setItem("AnimeID", id);
  console.log(id)
  // window.location = "../Html/Anime.html"
  return false;
}

fetch("https://api.jikan.moe/v4/schedules/" + dayName)
  .then(response => response.json())
  .then(result => {
    createAnimeHeaderNewsCard(result);

  });

  function dateConverser(date) {
    if (date == null) return;
    return ["Airing Today At: " + date]
  }

  function capitalizeFirstLetter(string) {
    if (string == null) return;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function createAnimeHeaderNewsCard(result) {
    if (result == null) return;

    for (let i = 0; i < result.data.length; i++) {
    
      
    const headerNewsSection = document.createElement('section');
    headerNewsSection.classList.add('newsCards');

    // console.log(result);
  
    const id = result.data[i].mal_id;
    const thumbnail = result.data[i].images.jpg.large_image_url;
    const title = result.data[i].title;
    const scores = result.data[i].score;
    const genre = result.data[i].genres[0]?.name;
    const genre2 = result.data[i].genres[1]?.name;

    const type = result.data[i].type;
    const synopsis = result.data[i].synopsis;

    const pubDate = result.data[i].broadcast.string;
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
          <p><i class="fa fa-calendar"></i> ${pubDate}</p>
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
      var AnimeCards = document.querySelector(".AnimeCardsJs");
      if (AnimeCards != null) {
        AnimeCards.appendChild(headerNewsSection)
      }
    }
  }