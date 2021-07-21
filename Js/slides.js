let sliderIndex = 1;
let slides = document.getElementsByClassName("newsCard");
let card = document.getElementsByClassName("card");
let menu = document.querySelector(".menu");

function imgUrlHeader(result){
  for (let i = 0; i < 6; i++) {
    imgUrl[i] = result[i].image_url;
  }
}

setTimeout(function() {
  showSlides(sliderIndex += 0);
}, 1400)

function plusSlides(n) {
  showSlides(sliderIndex += n);
}

function showSlides(n) {
  if (n > slides.length) {sliderIndex = 1}
  if (n < 1) {sliderIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      card[i].className = card[i].className.replace(" ani", "");
  }

    slides[sliderIndex-1].style.display = "block";
    card[sliderIndex-1].className += " ani";
}
