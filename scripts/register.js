"use strict";

const inputfirstname = document.getElementById("input-firstname");
const inputlastname = document.getElementById("input-lastname");
const inputusername = document.getElementById("input-username");
const inputpassword = document.getElementById("input-password");
const inputpasswordconfirm = document.getElementById("input-password-confirm");
const btnsubmit = document.getElementById("btn-submit");

btnsubmit.addEventListener("click", function () {
  // lay du lieu tu nguoi dung nhap vao form
  const user = new User(
    inputfirstname.value,
    inputlastname.value,
    inputusername.value,
    inputpassword.value
  );
  //console.log(user);
  const isValidate = validate(user);

  if (isValidate) {
    userArr.push(user);
    saveToStorage("userArr", userArr);
    alert("dang ky thanh cong");
    //Sử dụng window.location.href để chuyển trang.
    window.location.href = "../pages/login.html";
  }
});

function validate(user) {
  let isValidate = true;
  if (inputfirstname.value === "") {
    alert("firstname error ");
    isValidate = false;
  }
  if (user.lastname === "") {
    alert("lastname error");
    isValidate = false;
  }
  if (user.username === "") {
    alert("lastname error");
    isValidate = false;
  }
  if (user.password === "") {
    alert("password error");
    isValidate = false;
  }
  if (inputpasswordconfirm.value === "") {
    alert("passwordconfirm error");
    isValidate = false;
  }
  // Username không được trùng với Username của các người dùng trước đó.
  //   if (
  //     !userArr.every((item) => (item.username !== user.username ? true : false))
  //   ) {
  //     alert("username da ton tai !!");
  //     isValidate = false;
  //   }
  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].username === user.username) {
      alert("username da ton tai !!");
      isValidate = false;
      break;
    }
  }
  // Password và Confirm Password phải giống nhau
  if (user.password !== inputpasswordconfirm.value) {
    alert("Password và Confirm Password phải giống nhau");
    isValidate = false;
  }
  if (user.password.length <= 8) {
    alert("Password phải có nhiều hơn 8 ký tự");
    isValidate = false;
  }

  return isValidate;
}
