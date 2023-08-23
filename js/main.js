"use strict";

var gElCanvas;
var gCtx;

gElCanvas = document.querySelector("canvas");
gCtx = gElCanvas.getContext("2d");

renderGallery();

function renderGallery() {
  const imgs = getImgs();

  const imgHtml = imgs.map(
    (img) => `
    <img onclick="onImgClick(event)" src="${img.url}" alt="" /> `
  );
  const elGallery = document.querySelector(".images");

  elGallery.innerHTML = imgHtml.join("");
}

function onImgClick(ev) {
  const imgUrl = ev.target.currentSrc;
  document.querySelector(".gallery").classList.toggle("hidden");
  document.querySelector(".generator").classList.toggle("hidden");
  drawImg(imgUrl);
}

function drawImg(url) {
  const elImg = new Image();
  elImg.src = url;
  // elImg.src = 'img/wide.jpg'
  // elImg.src = 'img/tall.jpg'
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
  };
}
