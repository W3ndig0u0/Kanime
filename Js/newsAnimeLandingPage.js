const RSS_URL = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.livechart.me%2Ffeeds%2Fheadlines";

fetch(RSS_URL)
  .then(response => response.json())
  .then(result => {
    createNewsCard(result);
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

  
function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};
  
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
  
  function createNewsCard(result) {
    for (let i = 0; i < 6; i++) {
    const newsSection2 = document.createElement('section');
    newsSection2.classList.add('newsSection2');
  
    const thumbnail = result.items[i].thumbnail;
    const title = result.items[i].title.toUpperCase();
    const pubDate = result.items[i].pubDate;
    const newPubDate = dateConverser(pubDate);
    const youtubeUrl = result.items[i].link;
    const websiteName = webSiteCheck(result.items[i].link);
  
    // !Skapar html
    const newsInnerHTML = 
    `
      <div class="newsLetter">
        <div class="newsImg">
          <img
          src=${thumbnail}
          alt=${title}/>
        </div>
        <div class="newsCardInfo">
          <a href=${youtubeUrl} target="_blank" rel="noopener" title=${youtubeUrl} aria-label=${youtubeUrl}>
            <h2>${truncate(title,80)}"</h2>
          <a/>
            <p>Source: ${capitalizeFirstLetter(websiteName)}</p>
            <h6><i class="fa fa-calendar"></i> ${newPubDate}</h6>
        </div>
      </div>
      `;
          
      newsSection2.innerHTML = newsInnerHTML;
      document.querySelector(".newsRow").appendChild(newsSection2)
    }
  }