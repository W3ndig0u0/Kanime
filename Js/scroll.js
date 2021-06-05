window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    
    document.querySelector(".menu-content").classList.add("sticky");
    document.querySelector(".space ").classList.add("big");
  }
  else {
    document.querySelector(".menu-content").classList.remove("sticky");
      document.querySelector(".space ").classList.remove("big");
  }
}