"use strict";

const loginmodal = document.getElementById("login-modal");
const maincontent = document.getElementById("main-content");
const welcomemessage = document.getElementById("welcome-message");
const btnlogout = document.getElementById("btn-logout");

displayHome();
function displayHome() {
  if (currentUser) {
    loginmodal.style.display = "none";
    maincontent.style.display = "block";

    //them thong bao
    welcomemessage.textContent = `Welcome ${currentUser.firstname}`;
  } else {
    loginmodal.style.display = "block";
    maincontent.style.display = "none";
  }
}
btnlogout.addEventListener("click", function () {
  const islogout = confirm("ban chac chan muon thoat ?");
  if (islogout) {
    localStorage.removeItem("currentUser");
    currentUser = null;
    saveToStorage("currentUser", currentUser);
    loginmodal.style.display = "block";
    maincontent.style.display = "none";
  }
});
