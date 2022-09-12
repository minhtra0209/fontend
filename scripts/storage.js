"use strict";

// ham lay du lieu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// ham luu du lieu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// lay du lieu userArr tu Localstorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
console.log(users);
//chuyen doi ve dang Class Instance
const userArr = users.map((user) => parseUser(user));

//console.log(userArr);

// lay du lieu userArr tu Localstorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
console.log(todos);
//chuyen doi ve dang Class Instance
const todoArr = todos.map((todo) => parseTask(todo));

//lay du lieu user dang dang nhap
let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    userData.pageSize
  );
  return user;
}
// ham chuyen doi tu Js obj sang class Instance cua Task class
function parseTask(todoData) {
  const todo = new Task(todoData.task, todoData.owner, todoData.isDone);
  return todo;
}
