import * as storage from './storage.js';

const cookieEl = document.getElementById("cookie-img");
const clicksEl = document.getElementById("clicks");
const grandmaEl = document.getElementById("grandma");
const grandmaCountEl = document.getElementById("grandma-count");
const bakerEl = document.getElementById("baker");
const bakerCountEl = document.getElementById("baker-count");
const factoryEl = document.getElementById("factory");
const factoryCountEl = document.getElementById("factory-count");

const resetBtn = document.getElementById("reset");

let lastOpened = storage.getItem("lastOpened");
lastOpened = lastOpened ? parseInt(lastOpened) : Date.now();

let passiveProduction = parseFloat(storage.getItem("passiveProduction")) || 0;

let clicks = parseFloat(storage.getItem("clicks")) || 0;
clicks += (Date.now() - lastOpened) * passiveProduction;
clicksEl.innerText = Math.floor(clicks);

let grandmas = parseInt(storage.getItem("grandmas")) || 0;
grandmaCountEl.innerText = grandmas;

let bakers = parseInt(storage.getItem("bakers")) || 0;
bakerCountEl.innerText = bakers;

let factories = parseInt(storage.getItem("factories")) || 0;
factoryCountEl.innerText = factories;

cookieEl.addEventListener("click", () => {
  clicks += 1;
  clicksEl.innerText = Math.floor(clicks);
});

grandmaEl.addEventListener("click", () => {
  if (clicks < 100) return;

  clicks -= 100;
  grandmas += 1;
  passiveProduction += 0.001;
  clicksEl.innerText = Math.floor(clicks);
  grandmaCountEl.innerText = grandmas;
});

bakerEl.addEventListener("click", () => {
  if (clicks < 1000) return;

  clicks -= 1000;
  bakers += 1;
  passiveProduction += 0.005;
  clicksEl.innerText = Math.floor(clicks);
  bakerCountEl.innerText = bakers;
});

factoryEl.addEventListener("click", () => {
  if (clicks < 50000) return;

  clicks -= 50000;
  factories += 1;
  passiveProduction += 0.05;
  clicksEl.innerText = Math.floor(clicks);
  factoryCountEl.innerText = factories;
});

resetBtn.addEventListener("click", () => {
  if (window.confirm("Are you sure? This will delete ALL your progress!")) {
    storage.clear();
    clicks = 0;
    passiveProduction = 0;
    grandmas = 0;
    bakers = 0;
    factories = 0;
    location.reload();
  }
});

const interval = setInterval(() => {
  clicks += passiveProduction;
  clicksEl.innerText = Math.floor(clicks);
}, 1);

window.addEventListener("unload", () => {
  storage.setItem("clicks", clicks);
  storage.setItem("grandmas", grandmas);
  storage.setItem("bakers", bakers);
  storage.setItem("factories", factories);
  storage.setItem("passiveProduction", passiveProduction);
  storage.setItem("lastOpened", Date.now());
  clearInterval(interval);
});
