const displayContainer = document.querySelector(".display-container");
const buttonRight = document.querySelector(".button-right");
const buttonLeft = document.querySelector(".button-left");
const dotsContainer = document.querySelector(".dots-container");

const displays = [
  "./imgs/ocean.jpg",
  "./imgs/stars.jpg",
  "./imgs/sunset.jpg"
].map((path, i) => {
  const display = document.createElement("DIV");
  display.classList.add("display");
  const img = document.createElement("IMG");
  img.src = path;
  display.appendChild(img);

  if (i > 0) {
    display.classList.add("right");
  }

  displayContainer.appendChild(display);
  
  return display;
});

let index = 0;

const dots = displays.map((_, i) => {
  const icon = document.createElement("I");
  icon.classList.add("fas", "fa-circle");
  if (index === i) {
    icon.classList.toggle("selected");
  }
  return icon;
});

dots.forEach(dot => dotsContainer.appendChild(dot));

const updateDots = (prevIndex, index) => {
  dots[prevIndex].classList.toggle("selected");
  dots[index].classList.toggle("selected");
};

let interval = setInterval(goRight, 3000);

const resetInterval = () => {
  clearInterval(interval);
  interval = setInterval(goRight, 3000);
}

function goRight() {
  const prevIndex = index;
  index = (index + 1) % displays.length;

  displays[prevIndex].classList.remove("animate");
  displays[index].classList.remove("animate");
  displays[index].classList.remove("left");
  displays[index].classList.add("right");

  updateDots(prevIndex, index);
  resetInterval();

  setTimeout(() => {
    displays[prevIndex].classList.add("animate");
    displays[index].classList.add("animate");
    displays[index].classList.remove("right");
    displays[prevIndex].classList.add("left");
  }, 1);
};

buttonRight.addEventListener("click", goRight);

buttonLeft.addEventListener("click", () => {
  const prevIndex = index;
  index = ((index - 1) % displays.length + displays.length) % displays.length;

  displays[prevIndex].classList.remove("animate");
  displays[index].classList.remove("animate");
  displays[index].classList.remove("right");
  displays[index].classList.add("left");

  updateDots(prevIndex, index);
  resetInterval();

  setTimeout(() => {
    displays[prevIndex].classList.add("animate");
    displays[index].classList.add("animate");
    displays[index].classList.remove("left");
    displays[prevIndex].classList.add("right");
  }, 1);
});
