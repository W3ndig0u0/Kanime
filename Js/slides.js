var sliderIndex = 1;
showSlides(sliderIndex);

function plusSlides(n) {
  showSlides(sliderIndex += n);
}

function showSlides(n) {
  var slides = document.getElementsByClassName("newsCard");
  var card = document.getElementsByClassName("card");
  var menu = document.querySelector(".menu");

  var colorOne = "rgba(5, 131, 242, 0.82)";  
  var colorTwo = "rgba(5, 131, 242, 0.92)";  
  var orientation = "to bottom";

  var imgUrl = ["url(https://i.pinimg.com/originals/5f/12/b9/5f12b974076736afe4bfe170b36b5e89.jpg)", "url(https://wallpaperaccess.com/full/5918531.jpg)", "url(https://www.funimationfilms.com/wp-content/uploads/2021/03/VioletEvergardenMovie_BackgroundwLogo.jpg)", "url(https://i1.wp.com/www.monstersandcritics.com/wp-content/uploads/2020/08/Miss-Kobayashis-Dragon-Maid-Season-2-release-date-2021-Kyoto-Animation-Kobayashi-san-Chi-no-Maid-S.jpg?fit=1200%2C675&ssl=1)"];

  if (n > slides.length) {sliderIndex = 1}
  if (n < 1) {sliderIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      card[i].className = card[i].className.replace(" ani", "");
  }

  menu.style.backgroundImage = "linear-gradient("+ orientation + ", " + colorOne + ", " + colorTwo + ")," + (imgUrl[sliderIndex-1]);
  slides[sliderIndex-1].style.display = "block";  
  card[sliderIndex-1].className += " ani";
}
