window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    
    document.querySelector(".menu-content").classList.add("sticky");
  }
  else {
    document.querySelector(".menu-content").classList.remove("sticky");
  }
}