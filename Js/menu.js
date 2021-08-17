const auth = firebase.auth();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInBtnGoogle = document.getElementById('signInBtnGoogle');

const userDetails = document.getElementById('userDetails');
const userImg = document.getElementById('userImg');
const googleProvider = new firebase.auth.GoogleAuthProvider();

/// Sign in event handlers

signInBtnGoogle.onclick = () => auth.signInWithPopup(googleProvider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.className = "not-hidden";
        whenSignedOut.className = "hidden";
        userImg.innerHTML = `<img class="user-img" src="${user.photoURL}">`;
        userDetails.innerHTML = `<h3 class="name">Welcome ${user.displayName}!</h3>`;
    } 
    else {
        // not signed in
        whenSignedIn.className = "hidden";
        whenSignedOut.className = "not-hidden";
        userDetails.innerHTML = '';
        userImg.innerHTML = '';
    }
});

userImg.onclick = () => {
    document.querySelector(".dropdown-item").classList.toggle("active");
}
// !menu

function openNavbar() {
    document.getElementById("hamburgerNavbarLinks").style.width = "100%";
    document.querySelector("body").classList.toggle("active");
  }
  
  function closeNavbar() {
    document.getElementById("hamburgerNavbarLinks").style.width = "0%";
    document.querySelector("body").classList.toggle("active");
  }

document.querySelector(".search-btn").onclick = function() {
    document.getElementById("myModal").style.display = "block";
    document.querySelector("body").style.overflowY = "hidden";
}

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
        document.querySelector("body").style.overflowY = "auto";
    }
}
