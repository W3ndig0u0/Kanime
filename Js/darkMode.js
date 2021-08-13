const nightmode = document.querySelector(".darkmode");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");


if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
  // document.querySelector(".loader").classList.toggle("dark");
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
  // document.querySelector(".loader").classList.toggle("light");
}

nightmode.addEventListener("change", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  
  console.log(theme);
  localStorage.setItem("theme", theme);
  nightmode.classList.toggle("light");
});