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
  const imgId = ev.target.dataset.id;
  gMeme = getMem(imgId);
  setImg(ev.target.currentSrc);
  document.querySelector(".gallery").classList.toggle("hidden");
  document.querySelector(".generator").classList.toggle("hidden");
  renderMeme();
}
function drawRect(x, y) {
  gCtx.strokeStyle = "black";
  gCtx.strokeRect(x, y, 200, 15);
}

function drawText() {
  gMeme.lines.forEach((line) => {
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = "black";
    gCtx.fillStyle = `${line.color}`;
    gCtx.font = `${line.size}px Impact`;
    gCtx.textAlign = gAlignment;
    gCtx.textBaseline = "middle";

    gCtx.fillText(line.txt, gElCanvas.width / 2, line.pos.y);
    gCtx.strokeText(line.txt, gElCanvas.width / 2, line.pos.y);
  });
}

function drawRects() {
  gMeme.lines.forEach((line, idx) => {
    if (idx === 0) {
      if (line.txt) return;
      drawRect(line.pos.x, line.pos.y);
      //   getLinePos(idx, 30, gElCanvas.height / 15, 200, 15);
    } else if (idx === 1) {
      if (line.txt) return;
      drawRect(line.pos.x, line.pos.y);
      //   getLinePos(idx, 30, gElCanvas.height - 30, 200, 15);
    }
  });
}

function renderMeme() {
  const elImg = new Image();
  elImg.src = gMeme.url;
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    drawRects();
    drawText();
  };
}

function onTextInput(ev) {
  setLineText(ev);
  //   gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  renderMeme();
}

function onDownload(elLink) {
  const imgContent = gElCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
  elLink.href = imgContent;
}

function onColorInput(ev) {
  setColor(ev.target.value);
  renderMeme();
}

function onSmallerFont() {
  decreaseFont();
  renderMeme();
}
function onBiggerFont() {
  increaseFont();
  renderMeme();
}
function onAddLine() {
  if (gMeme.lines.length === 2) return;
  addLine();
  renderMeme();
}
function switchLine() {
  setSelectedLine();
}
function onCanvasClick(ev) {
  //   const lineX = gMeme.line.pos.x;
  //   console.log(lineX);
  const offsetX = ev.offsetX;
  const offsetY = ev.offsetY;
  console.log(offsetX, offsetY);
  var lineSelected = gMeme.lines.find((line) =>
    isClickInside(offsetX, offsetY, line.pos)
  );

  console.log(lineSelected);
}
function isClickInside(x, y, pos) {
  return (
    x >= pos.x &&
    x <= pos.x + pos.width &&
    y >= pos.y &&
    y <= pos.y + pos.height
  );
}
function onHamburger() {
  document.querySelector(".burger-nav").classList.toggle("hidden");
}

function onAlignCenter() {
  setAlignment("center");
}
function onAlignLeft() {
  setAlignment("left");
}
function onAlignRight() {
  setAlignment("right");
}
function onFlexClick() {
  const randomId = getRandomInt(gImgs.length);

  gMeme = getMem(gImgs[randomId].id);
  setImg(gImgs[randomId].url);
  document.querySelector(".gallery").classList.toggle("hidden");
  document.querySelector(".generator").classList.toggle("hidden");
  renderMeme();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
