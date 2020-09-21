const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");

const padNum = (n, len=2, z="0")  => {
  n = n + ""; // Turn n into a string for ease of processing
  return `${ n.length >= len ? "" : new Array(len - n.length + 1).join(z) }${ n }`;
};

const tick = () => {
  const today = new Date();
  secondsEl.innerText = padNum(today.getSeconds());
  minutesEl.innerText = padNum(today.getMinutes());
  hoursEl.innerText = padNum((today.getHours() - 1) % 12 + 1);
};

const interval = setInterval(tick, 1000);

window.addEventListener("unload", () => clearInterval(interval));
