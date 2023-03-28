const TOP_CHAR_URL = "https://api.jikan.moe/v4/top/characters";

function ShowTopCharacter(){
  fetch(TOP_CHAR_URL)
  .then(response => response.json())
  .then(result => {
    createTopCharCard(result);
  });
}

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function charSelect(id){
    sessionStorage.setItem("charId", id);
    console.log(id)
    // window.location = "../Html/Char.html"
    return false;
  }  
  
  function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
  };

  function createTopCharCard(result) {
    const TopCharSection = document.createElement('section');
    TopCharSection.classList.add('imgRow2');

      // for (let i = 0; i < 10; i++) {
    for (let i = 0; i < result.data.length; i++) {
      // console.log(result.data[i])
      
    const TopCharDiv = document.createElement('div');

    const thumbnail = result.data[i].images.webp.image_url;
    const id = result.data[i].mal_id;
    const title = result.data[i].name;

    const favorites = result.data[i].favorites;
    // const rank = i;

    const newTitle = capitalizeFirstLetter(title);
    // const newNewTitle = AnimeNameConverter(newTitle);
  
    // !Skapar html
    const recentInnerHTML = 
    `
    <div onclick="charSelect(${id})" class="imgCard animeCard">
      <div class="cardImage">
          <img
          src=${thumbnail}
          alt=${newTitle}/>
            <div class="epTag">❤️ ${favorites}</div>
            <div class="playWrapper">
            </div>
          </div>
            <div class="cardInfo">
            <span class="cardTitle">${truncate(newTitle, 30)}</span>
        </div>
      </div>
      `;
          
      TopCharDiv.innerHTML = recentInnerHTML;
      TopCharSection.appendChild(TopCharDiv)
      var topChar = document.querySelector(".topCharJs");
      if (topChar != null) {
        topChar.appendChild(TopCharSection)
    }
  }
}


setTimeout(function(){
  ShowTopCharacter();
}, 120);