import * as storage from "./storage.js";

const canvasEl = document.getElementById("canvas");
const canvasContainer = document.getElementById("canvas-container");

const ctx = canvasEl.getContext("2d");

let unit;
let width;
let height;

const resizeCanvas = () => {
  const rect = canvasContainer.getBoundingClientRect();
  canvasEl.width = rect.width;
  canvasEl.height = rect.height;
  unit = canvasEl.width / 20;
  width = canvasEl.width;
  height = canvasEl.height;
};

resizeCanvas();

document.addEventListener("resize", resizeCanvas);

let lastTime = null;
let req = null;
let obstacles = {};
let id = 0;
let speed = 0.1;
let score = 0;
let highscore = parseFloat(storage.getItem("highscore")) || 0;
const gravity = -8;

const heights = [1, 1.75, 2.25];

const groundHeight = () => 8 * unit;

const dinosaurHeight = 1.75 * unit;
const dinosaur = {
  x: unit,
  y: groundHeight() - dinosaurHeight,
  width: unit,
  height: dinosaurHeight,
  velocity: {
    deltaX: 0,
    deltaY: 0
  },
  acceleration: {
    deltaX: 0,
    deltaY: 0
  },
  grounded: true
};

const spawnObstacle = (count=1) => {
  for (let i = 0; i < 1; ++i) {
    const height = heights[Math.floor(Math.random() * heights.length)];

    obstacles[id++] = {
      x: width * 1.25 + (unit * i),
      y: groundHeight() - height * unit,
      width: unit,
      height: height * unit
    };
  }
};

const aabb = (box1, box2) => (
  box1.x < box2.x + box2.width &&
  box1.x + box1.width > box2.x &&
  box1.y < box2.y + box2.height &&
  box1.y + box1.height > box2.y
);

const gameOver = () => {
  highscore = Math.max(score, highscore);
  location.reload();
};

const renderObstacles = (delta) => {
  const keys = Object.keys(obstacles);
  keys.forEach((id) => {
    const obstacle = obstacles[id];

    obstacle.x -= speed * delta;

    if (obstacle.x + obstacle.width < 0) {
      delete obstacles[id];
    } else {
      ctx.save();
      ctx.strokeStyle = "#FF0000";
      ctx.lineWidth = "2";
      ctx.beginPath();
      ctx.rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      ctx.stroke();
      ctx.restore();
    }

    if (aabb(dinosaur, obstacle)) {
      gameOver();
    }
  });
};

const renderGround = () => {
  ctx.save();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = "2";
  ctx.beginPath();
  ctx.moveTo(0, groundHeight());
  ctx.lineTo(width, groundHeight());
  ctx.stroke();
  ctx.restore();
};

const clamp = (val, min=0, max=1) => {
  val = Math.max(val, min);
  val = Math.min(val, max);
  return val;
};

const renderDinosaur = () => {
  dinosaur.acceleration.deltaY -= gravity * speed;
  dinosaur.acceleration.deltaY = clamp(dinosaur.acceleration.deltaY, -60 * speed, 12 * speed);
  dinosaur.velocity.deltaX += dinosaur.acceleration.deltaX;
  dinosaur.velocity.deltaY += dinosaur.acceleration.deltaY;
  dinosaur.x += dinosaur.velocity.deltaX;
  dinosaur.y += dinosaur.velocity.deltaY;
  dinosaur.y = clamp(dinosaur.y, 0, groundHeight() - dinosaur.height);
  
  if (dinosaur.y === groundHeight() - dinosaur.height) {
    dinosaur.grounded = true;
    dinosaur.velocity.deltaY = 0;
    dinosaur.acceleration.deltaY = 0;
  } else {
    dinosaur.grounded = false;
  }

  ctx.save();
  ctx.strokeStyle = "#00FF00";
  ctx.beginPath();
  ctx.rect(dinosaur.x, dinosaur.y, dinosaur.width, dinosaur.height);
  ctx.stroke();
  ctx.restore();
};

document.addEventListener("keypress", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      if (dinosaur.grounded)
        dinosaur.acceleration.deltaY -= 60 * speed;
  }
});

const render = (timestamp) => {
  let delta;

  if (!lastTime) {
    lastTime = timestamp;
    delta = 0;
  } else {
    delta = timestamp - lastTime;
    lastTime = timestamp;
  }

  ctx.clearRect(0, 0, width, height);
  
  renderObstacles(delta);
  renderDinosaur();
  renderGround();

  ctx.font = `${ unit }px sans-serif`;
  ctx.direction = "rtl";
  ctx.fillText(`Score: ${ Math.floor(score) }`, width - unit, unit);
  ctx.fillText(`Highscore: ${ Math.floor(highscore) }`, width - unit, 2 * unit);

  score += delta / 100;
  speed += delta / 1000000;

  req = requestAnimationFrame(render);
};

let timeout = setTimeout(spawnHandler, 1000);

function spawnHandler() {
  spawnObstacle(Math.floor(Math.random() * 3));
  timeout = setTimeout(spawnHandler, Math.random() * 100 / speed + 350 / speed);
}

req = requestAnimationFrame(render);

window.addEventListener("unload", () => {
  cancelAnimationFrame(req);
  clearTimeout(timeout);
  storage.setItem("highscore",  Math.max(score, highscore));
});
