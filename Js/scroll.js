window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    
    document.querySelector(".menu").style.backgroundColor = "white";
  } else {
    document.querySelector(".menu").style.backgroundColor = "#0583f2";
  }
}