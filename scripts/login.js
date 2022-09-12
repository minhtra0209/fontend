"use strict";

const inputusername = document.getElementById("input-username");
const inputpassword = document.getElementById("input-password");
const btnsubmit = document.getElementById("btn-submit");

btnsubmit.addEventListener("click", function () {
  // lay du lieu tu nguoi dung nhap vao form

  //console.log(user);
  // kiem tra nguoi dung co nhap du username va password chua
  const isValidate = validate();

  if (isValidate) {
    const user = userArr.find(
      (item) =>
        item.username === inputusername.value &&
        item.password === inputpassword.value
    );
    if (user) {
      alert("dang nhap thanh cong");
      saveToStorage("currentUser", user);
      window.location.href = "../index.html";
    } else {
      alert("nhap sai vui long nhap lai");
    }

    //Sử dụng window.location.href để chuyển trang.
    //window.location.href = "../pages/login.html";
  }
});

function validate() {
  let isValidate = true;
  if (inputusername.value === "") {
    alert("lastname error");
    isValidate = false;
  }
  if (inputpassword === "") {
    alert("password error");
    isValidate = false;
  }

  return isValidate;
}
