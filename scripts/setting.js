"use strict";

const inputpagesize = document.getElementById("input-page-size");
const inputcategory = document.getElementById("input-category");
const btnsubmit = document.getElementById("btn-submit");

btnsubmit.addEventListener("click", function () {
  if (validate) {
    currentUser.pageSize = Number.parseInt(inputpagesize.value);
    currentUser.category = inputcategory.value;
    saveToStorage("todoArr", todoArr);
    // cap nhat lai mang userArr
    const index = userArr.findIndex(
      (item) => item.username === currentUser.username
    );
    userArr[index] = currentUser;
    saveToStorage("userArr", userArr);
    //reset lai va thong bao thanh cong
    alert("cai dat thanh cong");
    inputpagesize.value = "";
    inputpagesize.value = "General";
  }
});
function validate() {
  let isvalidate = true;
  //kiem tra input pagesize
  if (Number.isNaN(Number.parseInt(inputpagesize.value))) {
    alert("khong hop le");
    isvalidate = false;
  }
  if (inputcategory === "") {
    alert("khong dc de trong");
    isvalidate = false;
  }
  return isvalidate;
}
