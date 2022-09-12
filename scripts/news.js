"use strict";

const newscontainer = document.getElementById("news-container");
const btnprev = document.getElementById("btn-prev");
const pagenum = document.getElementById("page-num");
const btnnext = document.getElementById("btn-next");

// bien nay tinh so news tra ve tu api
let totalResults = 0;
//getDataNews("us", 1);
getDataNews("us", 1);

async function getDataNews(country, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=816ff649e07c44b3949691dfb6dc620c`
    );
    //`https://newsapi.org/v2/top-headlines?country=${country}&category=business&page=${page}&apiKey=816ff649e07c44b3949691dfb6dc620c`;

    // `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.catetory}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=816ff649e07c44b3949691dfb6dc620c`;

    const data = await res.json();
    console.log(data);

    if (data.status === "error" && data.code === "corsNotAllowed") {
      throw new Error(data.message);
    }
    displayNewList(data);
  } catch {
    alert("loi");
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
