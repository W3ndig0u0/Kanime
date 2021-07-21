const RECENT_ANIME_RSS_URL = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.livechart.me%2Ffeeds%2Fepisodes";

fetch(RECENT_ANIME_RSS_URL)
  .then(response => response.json())
  .then(result => {
    createRecentAnimeCard(result);
  });

  function dateConverser(date) {
    var str = date;
    var hour =  str.slice(11,16);
    return "At " + hour
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function EpConverter(ep) {
      var ep =  ep.split('#')[1]
      return ep
  }
  function AnimeNameConverter(ep) {
      var ep =  ep.split('#')[0]
      return ep
  }

  function createRecentAnimeCard(result) {
    const recentSection = document.createElement('section');
    
    const recentDivContainer = document.createElement('div');
    recentDivContainer.classList.add('container');
        
    const recentDivLeaderboard = document.createElement('div');
    recentDivLeaderboard.classList.add('leaderboard');

    
    const recentDiv = document.createElement('div');
    recentDiv.classList.add('body');
    const recentInnerHTML =
    `
        <div class="head">
          <h1>Recently Added</h1>
        </div>
    `;

    
    recentDivLeaderboard.innerHTML = recentInnerHTML;
    recentDivContainer.appendChild(recentDivLeaderboard)
    recentDivLeaderboard.appendChild(recentDiv);

    for (let i = 0; i < 5; i++) {
    const thumbnail = result.items[i].thumbnail;
    const title = result.items[i].title;
    const id = result.items[i].link;
    const newTitle = capitalizeFirstLetter(title);
    const newNewTitle = AnimeNameConverter(newTitle);
    const ep = EpConverter(newTitle)
    const pubDate = result.items[i].pubDate;
    const newPubDate = dateConverser(pubDate);

    const recentLi = document.createElement('li');

    // !Skapar html
    const recentInnerHTMLLoop =
    `
        <mark>
          <img class="animeCard" src=${thumbnail} alt=${newNewTitle}/>
        </mark>
        <small>
        <a href=${id} target="_blank" title="noopener">
          <h1 class="animeCard">${newNewTitle}</h1>
        <a/>
          <div class="extraInfo">
            <span>Episode ${ep}</span>
            <span class="dot"></span>
            <span>Date: ${newPubDate}</span>
          </div
        </small>
      `;
      recentLi.innerHTML = recentInnerHTMLLoop;
      
      recentDiv.appendChild(recentLi);
      recentSection.appendChild(recentDivContainer);
      document.querySelector(".recentAnime").appendChild(recentSection);
    }
  }