"use strict";
const navpagenum = document.getAnimations("nav-page-num");
const inputquery = document.getElementById("input-query");
const btnsubmit = document.getElementById("btn-submit");
const newscontainer = document.getElementById("news-container");
const btnprev = document.getElementById("btn-prev");
const pagenum = document.getElementById("page-num");
const btnnext = document.getElementById("btn-next");

let totalResults = 0;
let keywords = "";
//navpagenum.style.display = "none";

btnsubmit.addEventListener("click", function () {
  pagenum.textContent = "1";
  newscontainer.innerHTML = "";
  //kiem tra nguoi dung da nhap chua
  if (inputquery.value.trim().length === 0) {
    //navpagenum.style.display = "none";
    alert("vui long nhap tu khoa");
  } else {
    keywords = inputquery.value;
    getDataNewskeywords(keywords, 1);
  }
});

async function getDataNewskeywords(keywords, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy
        &pageSize=${currentUser.pageSize}&page=${page}&apiKey=816ff649e07c44b3949691dfb6dc620c`
    );

    const data = await res.json();
    console.log(data);

    if (data.totalResults == 0) {
      //navpagenum.style.display = "none";
      throw new Error("tim tim thay tu khoa phu hop");
    }
    //navpagenum.style.display = "block";
    displayNewList(data);
  } catch (err) {
    alert(err.message);
  }
}
function checkbtnprev() {
  if (pagenum.textContent == 1) {
    btnprev.style.display = "none";
  } else {
    btnprev.style.display = "block";
  }
}
function checkbtnnext() {
  if (pagenum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
    btnnext.style.display = "none";
  } else {
    btnnext.style.display = "block";
  }
}
btnprev.addEventListener("click", function () {
  getDataNews("us", --pagenum.textContent);
});
btnnext.addEventListener("click", function () {
  getDataNews("us", ++pagenum.textContent);
});
function displayNewList(data) {
  totalResults = data.totalResults;

  checkbtnprev();
  checkbtnnext();

  let html = "";
  data.articles.forEach((article) => {
    html += `<div class="new-content">
      <div class="img-banner">
          <img src = ${
            article.urlToImage ? article.urlToImage : "no_image_available.jpg"
          } alt="img"> </div>
          <div class="content">
          <h4> ${article.title}</h4>
          <p> ${article.description} </p>
          <buton><a href =${article.url} taget="_blank">View</a></buton> </div>
      </div`;
  });
  newscontainer.innerHTML = html;
}
