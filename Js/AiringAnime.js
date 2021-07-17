var request = new XMLHttpRequest();

request.open('GET', 'https://kitsu.io/api/edge/trending/anime?filter[seasonYear]=2021?filter[season]=summer');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    // console.log(this.responseText);
    // console.log('titles:', this.responseText.ratingRank);
  }
};

request.send();