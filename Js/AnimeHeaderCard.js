fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.livechart.me%2Ffeeds%2Fheadlines")
  .then(response => response.json())
  .then(result => {
    createHeaderNewsCard(result);
  });

  function webSiteCheck(url) {
    var str = url;
    if (str.includes("twitter")) {
      return "twitter"
    }
    else{
      var res =  str.split('.')[1]
      return res
    }
  }

  function formatAMPM(date) {
    var hours = date.slice(0,2);
    var minutes = date.slice(3,5);
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
  function dateConverser(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    var str = date;
    var newDate =  str.slice(5);
    var newNewDate =  newDate.slice(0,5)
    var mounth =  12;

    if (newmounth =  newDate.slice(0,1) == "0") {
      var mounth =  newDate.slice(1,2);
    }
    else{
      var mounth =  newDate.slice(0,2);
    }
    var date =  newDate.slice(3,6);
    var hour =  newDate.slice(7,11);
    const today = new Date();

    if (date == today.getDate()) {
      return "At " + formatAMPM(hour)
    }
    else
    {
      return [date +  monthNames[mounth - 1]]
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function createHeaderNewsCard(result) {
    for (let i = 0; i < 4; i++) {
    const headerNewsSection = document.createElement('section');
    headerNewsSection.classList.add('newsCards');
  
    const thumbnail = result.items[i].thumbnail;
    const title = result.items[i].title;
    const pubDate = result.items[i].pubDate;
    const newPubDate = dateConverser(pubDate);
    const youtubeUrl = result.items[i].link;
    const websiteName = webSiteCheck(result.items[i].link);
  
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
            <h6>Featured</h6>
            <h6 class="news">News</h6>
          </div>
          <h2>${title}</h2>
          <img class="mobileImgHeader"
          src=${thumbnail}
          alt=${capitalizeFirstLetter(title)}/>
          <p><i class="fa fa-calendar"></i> ${newPubDate}</p>
          <a href=${youtubeUrl} target="_blank" rel="noopener" title=${youtubeUrl} aria-label=${youtubeUrl}>
          <p class="source"> Source: ${capitalizeFirstLetter(websiteName)}</p>
          </a>

          <div>
            <span class="dot dotActive"></span>
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