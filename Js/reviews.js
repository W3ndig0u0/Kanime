var reviewIndex = 1;

function plusReview(n) {
  showReview(reviewIndex += n);
}

setTimeout(plusReview(0),1000)

function showReview(n) {
  var review = document.getElementsByClassName("reviewGrid");

  if (n > review.length) {reviewIndex = 1}
  if (n < 1) {reviewIndex = review.length}
  
  for (i = 0; i < review.length; i++) {
    review[i].style.display = "none";
  }
  
    let screenSizex = window.matchMedia("(min-width: 720px)")
  
    if (screenSizex.matches) {
      review[reviewIndex-1].style.display = "flex";
      
    } else
    review[reviewIndex-1].style.display = "unset";
}
