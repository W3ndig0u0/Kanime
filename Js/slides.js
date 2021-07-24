let sliderIndex = 1;
let slides = document.getElementsByClassName("newsCard");
let card = document.getElementsByClassName("card");

function plusSlides(n) {
  showSlides(sliderIndex += n);
}

window.addEventListener('DOMContentLoaded', (event) => {
  setTimeout(function(){
    plusSlides(sliderIndex += 1);
  },
  1500);

  while(slides[sliderIndex-1] === undefined){
    plusSlides(sliderIndex += 1);
  }
});

while(slides[sliderIndex-1] === undefined){
  plusSlides(sliderIndex += 1);
}
setTimeout(function(){
  plusSlides(sliderIndex += 1);
},
1500);

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