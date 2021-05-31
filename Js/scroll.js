// window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    
    document.querySelector(".menu").classList.add("sticky");
    document.querySelector(".card ").classList.add("remove");
  } else {
    document.querySelector(".menu").classList.remove("sticky");
      document.querySelector(".card ").classList.remove("remove");
  }
}