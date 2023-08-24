"use strict";
var gImgs = [
  { id: 1, url: "imgs/1.jpg", keywords: ["celebrity", "men", "funny"] },
  { id: 2, url: "imgs/2.jpg", keywords: ["animal", "dog"] },
  { id: 3, url: "imgs/3.jpg", keywords: ["funny", "pet", "children"] },
  { id: 4, url: "imgs/4.jpg", keywords: ["funny", "cat", "animal"] },
  { id: 5, url: "imgs/5.jpg", keywords: ["funny", "children"] },
  { id: 6, url: "imgs/6.jpg", keywords: ["men", "funny", "smile"] },
  { id: 7, url: "imgs/7.jpg", keywords: ["funny", "children"] },
  { id: 8, url: "imgs/8.jpg", keywords: ["funny", "men"] },
  { id: 9, url: "imgs/9.jpg", keywords: ["funny", "children"] },
  { id: 10, url: "imgs/10.jpg", keywords: ["funny", "men", "celebrity"] },
  { id: 11, url: "imgs/11.jpg", keywords: ["funny", "men", "sport"] },
  { id: 12, url: "imgs/12.jpg", keywords: ["men", "celebrity"] },
  { id: 13, url: "imgs/13.jpg", keywords: ["men", "party", "celebrity"] },
  { id: 14, url: "imgs/14.jpg", keywords: ["men", "movie"] },
  { id: 15, url: "imgs/15.jpg", keywords: ["men", "movie"] },
  { id: 16, url: "imgs/16.jpg", keywords: ["men", "funny", "movie"] },
  { id: 17, url: "imgs/17.jpg", keywords: ["men", "celebrity"] },
  { id: 18, url: "imgs/18.jpg", keywords: ["funny", "cartoon", "movie"] },
];
var gAlignment = "center";
var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "I sometimes eat Falafel",
      size: 20,
      color: "red",
    },
  ],
};
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };

function getImgs() {
  return gImgs;
}

function getLinePos(idx, x, y, width, height) {
  gMeme.lines[idx].pos = {
    x,
    y,
    width,
    height,
  };
  console.log(gMeme);
}

function getMem(id) {
  return {
    url: "",
    selectedImgId: id,
    selectedLineIdx: 0,
    lines: [{ txt: "", size: 20, color: "red", pos: { x: 30, y: 10 } }],
  };
}

function addLine() {
  const newLine = {
    txt: "",
    size: 20,
    color: "red",
    pos: { x: 30, y: gElCanvas.height - 30 },
  };
  gMeme.lines.push(newLine);
}
function setAlignment(val) {
  gAlignment = val;
}

function setLineText(ev) {
  gMeme.lines[gMeme.selectedLineIdx].txt = ev.target.value;
}
function setImg(url) {
  gMeme.url = url;
}
function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}
function decreaseFont() {
  gMeme.lines[gMeme.selectedLineIdx].size--;
}
function increaseFont() {
  gMeme.lines[gMeme.selectedLineIdx].size++;
}
function setSelectedLine() {
  if (gMeme.lines.length === 1) return;
  if (gMeme.selectedLineIdx === 0) {
    gMeme.selectedLineIdx = 1;
  } else gMeme.selectedLineIdx = 0;
  console.log(gMeme.selectedLineIdx);
}
