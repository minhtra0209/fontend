"use strict";

const todolist = document.getElementById("todo-list");
const btnadd = document.getElementById("btn-add");
const inputtask = document.getElementById("input-task");

displaytodolist();
// ham hien thi todo list
function displaytodolist() {
  let html = "";
  todoArr
    .filter((todo) => todo.owner === currentUser.username)
    .forEach((todo) => {
      html += `<li class=${todo.isDone ? "checked" : ""}>${
        todo.task
      }<span class="close">×</span></li>`;
    });

  todolist.innerHTML = html;

  eventtoggleTask();
  eventdeleteTask();
}

btnadd.addEventListener("click", function () {
  if (inputtask.value.trim().length === 0) {
    alert("vui long nhap nhiem vu");
  } else {
    const todo = new Task(inputtask.value, currentUser.username, false);

    todoArr.push(todo);
    saveToStorage("todoArr", todoArr);
    displaytodolist();
    inputtask.value = "";
  }
});

function eventtoggleTask() {
  //lay tat ca phan tu li chua thong tinh cua cac task va bat su kien
  document.querySelectorAll("#todo-list li").forEach(function (liel) {
    liel.addEventListener("click", function (e) {
      // tranh nut delete => de khong bi chong su kien
      if (e.target != liel.children[0]) {
      }
      liel.classList.toggle("checked");
      // tim lai task vua list
      const todo = todoArr.find(
        (todoItem) =>
          todoItem.owner === currentUser.username &&
          todoItem.task === liel.textContent.slice(0, -1)
        // lay noi dung task loai bo dau x
      );
      // thay doi thuoc tinh isDone cua no
      todo.isDone = liel.classList.contains("checked") ? true : false;
      // luu lai
      saveToStorage("todoArr", todoArr);
    });
  });
}
function eventdeleteTask() {
  document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
    closeEl.addEventListener("click", function () {
      const isdelete = confirm("ban chac chan muon xoa chu");
      if (isdelete) {
        const index = todoArr.findIndex(
          (item) =>
            item.owner === currentUser.username &&
            item.task === closeEl.parentElement.textContent.slice(0, -1)
        );
        // xoas task do ra khoi mang
        todoArr.splice(index, 1);
        saveToStorage("todoArr", todoArr);
        displaytodolist();
      }
    });
  });
}
