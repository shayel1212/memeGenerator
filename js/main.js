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
    <img data-id="${img.id}" onclick="onImgClick(event)" src="${img.url}" alt="" /> `
  );
  const elGallery = document.querySelector(".images");

  elGallery.innerHTML = imgHtml.join("");
}

function onImgClick(ev) {
  const imgUrl = ev.target.currentSrc;
  const imgId = ev.target.dataset.id;
  document.querySelector(".gallery").classList.toggle("hidden");
  document.querySelector(".generator").classList.toggle("hidden");
  gMeme = getMem(imgId);
  console.log(gMeme);
  renderMeme(ev);
}

function drawText(text) {
  var x = gElCanvas.width / 2;
  var y;
  if (gMeme.selectedLineIdx === 0) {
    y = gElCanvas.height / 8;
  }
  gCtx.lineWidth = 1;
  gCtx.strokeStyle = "black";
  gCtx.fillStyle = "white";
  gCtx.font = "20px Arial";
  gCtx.textAlign = "center";
  gCtx.textBaseline = "middle";

  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function renderMeme() {
  const elImg = new Image();
  const currImg = gImgs.find((img) => img.id === +gMeme.selectedImgId);
  elImg.src = currImg.url;
  // elImg.src = 'img/wide.jpg'
  // elImg.src = 'img/tall.jpg'
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText(gMeme.lines[gMeme.selectedLineIdx].txt);
  };
}

function onTextInput(ev) {
  gMeme.lines[gMeme.selectedLineIdx].txt = ev.target.value;
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  renderMeme();
}
