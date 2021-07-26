let animeId = 1;


function getReviews() {
  fetch("https://api.jikan.moe/v3/anime/" + animeId + "/reviews/1")
  .then(response => response.json())
  .then(resultReview =>  {
    console.log(resultReview);
    if (resultReview.reviews.length === 0) {
      noReviews();
    }
    else{
      Reviews(resultReview.reviews);
    }
  })
}

let getReviewsAnime = function() {
  fetch("https://api.jikan.moe/v3/anime/" + animeId)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    ReviewsAnime(result);
  })
}

function dateConverser(dates) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  var str = dates;
  var newDate =  str.slice(5);
  var mounth =  12;

  if (newmounth =  newDate.slice(0,1) == "0") {
    var mounth =  newDate.slice(1,2);
  }
  else{
    var mounth =  newDate.slice(0,2);
  }
  var date =  newDate.slice(3,5);
  var hour =  newDate.slice(6,11);

  return [date + " " +  monthNames[mounth - 1] + ", " + hour]
}

function truncate(str, n){
  if (str === null || str === undefined) {
    return "Null"
  }
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};

function Reviews(result) {
  // ReviewsAnime();
  for (let i = 0; i < result.length; i++) {    

    const commentDiv = document.createElement('div');
    commentDiv.classList.add("slideshow");
    
    const content = result[i].content;
    const date = result[i].date;
    const reviewerImg = result[i].reviewer.image_url;
    const reviewerName = result[i].reviewer.username;
    const animation = result[i].reviewer.scores.animation;
    const character = result[i].reviewer.scores.character;
    const enjoyment = result[i].reviewer.scores.enjoyment;
    const sound = result[i].reviewer.scores.sound;
    const story = result[i].reviewer.scores.story;
    const overall = result[i].reviewer.scores.overall;
    
    // !Skapar html
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewGrid">
      <div class="right">
        <p class="reviewDesc">aaa</p>
        <img class="reviewCover" src=${reviewerImg} alt=${reviewerImg}>
      </div>

        <div class="left reviewContentAll">
          <img class="thumbnail" src=${reviewerImg} alt=${reviewerName + date}"
            alt="profile-img" />
          <p class="reviewName">${reviewerName}</p>
          <p class="reviewDate">${dateConverser(date)}</p>

          <div class="reviewScroll">
            <h1 class="reviewText">
            ${truncate(content, 900)}
            </h1> 
          </div>

        <div class="score">
          <div class="story">
            <h1>${story}</h1>
            <p>Story</p>
            </div>

            <div class="animation">
              <h1>${animation}</h1>
              <p>Animation</p>
            </div>

            <div class="sound">
              <h1>${sound}</h1>
              <p>Sound</p>
            </div>

            <div class="characters">
              <h1>${character}</h1>
              <p>characters</p>
            </div>
            
            <div class="enjoyment">
              <h1>${enjoyment}</h1>
              <p>Enjoyment</p>
            </div>
            
            <div class="overall">
              <h1>${overall}</h1>
              <p>Overall</p>
            </div>

          </div>
        </div>
      </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".reviewsJs").appendChild(commentDiv)
  }
}


function ReviewsAnime(result) {
  for (let i = 0; i < result.length; i++) {
    const title = result[i].title;
    const reviewerImg = result[i].image_url;
    console.log([reviewerImg, title])
    // return [reviewerImg, title]
  }
}

function noPageComments() {
  const commentDiv = document.createElement('div');
    const CommentsReviewInnerHTML = 
    `
    <div class="reviewerImgDiv">
      <h1>This Anime Dosn't have any Comments yet...<h1/>
      <p>Sorry D:<p/>
      <p>Tehee<p/>
    </div>
    `;
    commentDiv.innerHTML = CommentsReviewInnerHTML;
    document.querySelector(".animePageComments").appendChild(commentDiv)
}

getReviewsAnime();
getReviews();