function getMangaChapter(ID) {
  // let animeId = sessionStorage.getItem("AnimeID");
   const url = "https://api.consumet.org/manga/mangadex/info/";
 
   fetch(url + ID)
   .then(response => response.json())
   .then(result => {
     console.log(result);
     ShowMangainfo(result)
   })
 }

 function readMangaChapterImg(ReadID) {
   const url = "https://api.consumet.org/manga/mangadex/read/";
 
   fetch(url + ReadID)
   .then(response => response.json())
   .then(result => {
     console.log(result);
     ShowMangaChapter(result)
   })
 }
  
function onClickManga(ID){
  getMangaChapter(ID);
}

function onClickChapter(ReadID){
  readMangaChapterImg(ReadID);
}

function ShowMangaChapter(result){
  const mangaChapDiv = document.querySelector(".mangaImg");

  // !Tar bort det gamla infot
  while (mangaChapDiv?.firstChild) {
    mangaChapDiv.removeChild(mangaChapDiv.firstChild);
  }

  // ?Episoder knapp
  for (let i = 0; i < result.length; i++) {
    const chapterBtn = document.createElement("div");
    chapterBtn.classList.add("mangaChap")
    const img = `https://api.consumet.org/utils/image-proxy?url=${result[i].img}&referer=${result[i].img}`
    const chapterBtnInnerHTML =`<img src="${img}">`;

    chapterBtn.innerHTML = chapterBtnInnerHTML;
    mangaChapDiv?.appendChild(chapterBtn);
  }
}


// window.addEventListener("load", getMangaChapter); 


function ShowMangainfo(result){
  const mangaInfoDiv = document.querySelector(".showMangaInfo");
  const mangaChapters = document.querySelector(".mangaChapters");
  // !Tar bort det gamla infot
  while (mangaInfoDiv?.firstChild) {
    mangaInfoDiv.removeChild(mangaInfoDiv.firstChild);
  }   
  
  while (mangaChapters?.firstChild) {
    mangaChapters.removeChild(mangaChapters.firstChild);
  } 
  
  const mangaChapDiv = document.querySelector(".mangaImg");

  // !Tar bort det gamla infot
  while (mangaChapDiv?.firstChild) {
    mangaChapDiv.removeChild(mangaChapDiv.firstChild);
  }


  const mangaInfo = document.createElement("div");
  const buttons= document.createElement("div");
  buttons.classList.add("buttonRow")

  const status = result.status
  const date = result.releaseDate
  const genres = JSON.stringify(result.genres);
  const themes = JSON.stringify(result.themes);

  // ?Episoder knapp
  for (let i = 0; i < result.chapters.length; i++) {
    const chapterBtn = document.createElement("div");
    
    const chapterNumber = result.chapters[i].chapterNumber;
    const volumeNumber = result.chapters[i].volumeNumber;
    const totalPages = result.chapters[i].pages;
    const chapID = result.chapters[i].id;

    const chapterBtnInnerHTML = `
    <div class="epButton">
      <button class="${chapID}" onclick="onClickChapter(this.className)">Chap: ${chapterNumber}</button>
    </div>
    `;

    chapterBtn.innerHTML = chapterBtnInnerHTML;
    buttons.appendChild(chapterBtn);
    mangaChapters?.appendChild(buttons);
  }

  const MangaInfoInnerHTML = `
  <div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <p>${status}</p>
  <p>${date}</p>
  <p>${removeSign(themes)}</p>
  <p>${removeSign(genres)}</p>
  </div>
  `;
  mangaInfo.innerHTML = MangaInfoInnerHTML;
  mangaInfoDiv?.appendChild(mangaInfo);
}