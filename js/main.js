"use strict";

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

function drawText(line) {
  gCtx.lineWidth = 1;
  gCtx.strokeStyle = "black";
  gCtx.fillStyle = `${line.color}`;
  gCtx.font = `${line.size}px Impact`;
  gCtx.textAlign = gAlignment;
  gCtx.strokeStyle = "black";
  gCtx.textBaseline = "middle";
  gCtx.fillText(line.txt, gElCanvas.width / 2, line.pos.y);
  gCtx.strokeText(line.txt, gElCanvas.width / 2, line.pos.y);

  // gMeme.lines.forEach((line) => {
  //   gCtx.lineWidth = 1;
  // });
}

function drawRects(x, y) {
  gCtx.strokeStyle = "black";
  gCtx.lineWidth = 2;

  gCtx.strokeRect(x, y, gElCanvas.width * 0.8, gElCanvas.height * 0.12);

  // gMeme.lines.forEach((line, idx) => {
  //   if (idx === 0) {
  //     if (line.txt) return;
  //     drawRect(line.pos.x, line.pos.y);
  //     //   getLinePos(idx, 30, gElCanvas.height / 15, 200, 15);
  //   } else if (idx === 1) {
  //     if (line.txt) return;
  //     drawRect(line.pos.x, line.pos.y);
  //     //   getLinePos(idx, 30, gElCanvas.height - 30, 200, 15);
  //   }
  // });
}

function renderMeme() {
  const elImg = new Image();
  elImg.src = gMeme.url;
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    drawMeme();
    // drawRects();
    // drawText();
  };
}
function drawMeme() {
  gMeme.lines.forEach((line) => {
    const x = line.pos.x;
    const y = line.pos.y;
    // console.log(x, y);
    if (!line.txt) {
      drawRects(x, y);
    }
    drawText(line);
  });
}

function onTextInput(ev) {
  setLineText(ev);
  //   gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  renderMeme();
}

function onDownload(elLink) {
  const imgContent = gElCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
  console.log(imgContent);
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
function onFilter(elBtn) {
  const val = elBtn.dataset.group;
  if (val === "all") {
    gFilter = "";
    renderGallery();
    return;
  }
  gFilter = gImgs.filter((img) => img.keywords.find((word) => word === val));
  renderGallery();
}
function onAddLine() {
  if (gMeme.lines.length === 2) return;
  addLine();
  renderMeme();
}
function switchLine() {
  setSelectedLine();
}
function searchMemeInput(ev) {
  const val = ev.target.value;
  filterMemes(val);
  renderGallery();
}
function onCanvasClick(ev) {
  console.log(ev);
  const offsetX = ev.offsetX;
  const offsetY = ev.offsetY;

  gMeme.lines.forEach((line) => {
    if (isClickInside(offsetX, offsetY, line)) {
      console.log("clicked on line:", line);
    }
  });
  console.log(offsetX, offsetY);
}
function isClickInside(x, y, line) {
  // const { x: posX, y: posY, lineHeight } = pos;
  const posX = gElCanvas.width / 2;

  const posY = line.pos.y;
  console.log(posX, posY);
  const lineHeight = gCtx.measureText(line.text).width;
  console.log(lineHeight);
  // Check if the click coordinates are inside the rectangle of the text line
  return (
    x >= posX && x <= posX + lineHeight && y >= posY - lineHeight && y <= posY
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
function onRemoveLine() {
  removeLine();
  renderMeme();
}
function onGalleryClick() {
  document.querySelector(".gallery").classList.toggle("hidden");
  document.querySelector(".burger-nav").classList.toggle("hidden");
  document.querySelector(".generator").classList.toggle("hidden");
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

function onUploadImg() {
  // Gets the image from the canvas
  const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

  function onSuccess(uploadedImgUrl) {
    // Handle some special characters
    const url = encodeURIComponent(uploadedImgUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`);
  }

  // Send the image to the server
  doUploadImg(imgDataUrl, onSuccess);
}

// Upload the image to a server, get back a URL
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
  // Pack the image for delivery
  const formData = new FormData();
  formData.append("img", imgDataUrl);

  // Send a post req with the image to the server
  const XHR = new XMLHttpRequest();
  XHR.onreadystatechange = () => {
    // If the request is not done, we have no business here yet, so return
    if (XHR.readyState !== XMLHttpRequest.DONE) return;
    // if the response is not ok, show an error
    if (XHR.status !== 200) return console.error("Error uploading image");
    const { responseText: url } = XHR;
    // Same as
    // const url = XHR.responseText

    // If the response is ok, call the onSuccess callback function,
    // that will create the link to facebook using the url we got
    console.log("Got back live url:", url);
    onSuccess(url);
  };
  XHR.onerror = (req, ev) => {
    console.error(
      "Error connecting to server with request:",
      req,
      "\nGot response data:",
      ev
    );
  };
  XHR.open("POST", "//ca-upload.com/here/upload.php");
  XHR.send(formData);
}
