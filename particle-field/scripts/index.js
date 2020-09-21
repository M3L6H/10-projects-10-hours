const canvasEl = document.getElementById("canvas");
const canvasContainer = document.getElementById("canvas-container");

const ctx = canvasEl.getContext("2d");

let width;
let height;

const resizeCanvas = () => {
  const rect = canvasContainer.getBoundingClientRect();
  canvasEl.width = rect.width;
  canvasEl.height = rect.height;
  width = canvasEl.width;
  height = canvasEl.height;
};

resizeCanvas();

document.addEventListener("resize", resizeCanvas);

let lastTime;
const edgeForce = 0.0000001;
const particleForce = 0.00000001;
const dragConst = 0.5;
const maxForce = 1;
const maxVel = 5;
const particleSize = 3;
const initialVelocity = 1;
const particles = [];

const spawnParticles = (num=10) => {
  for (let i = 0; i < num; ++i) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      mass: Math.random() * 10,
      vel: {
        x: 0,
        y: 0
      },
      acc: {
        x: 0,
        y: 0
      }
    });
  }
};

const clamp = (val, min=-maxForce, max=maxForce) => {
  val = Math.max(val, min);
  val = Math.min(val, max);
  return val;
};

const clampVec = (vec, min=-maxVel, max=maxVel) => ({
  x: clamp(vec.x, min, max),
  y: clamp(vec.y, min, max)
});

const vecSum = (a, b) => ({
  x: a.x + b.x,
  y: a.y + b.y
});

const vecDiff = (a, b) => ({
  x: a.x - b.x,
  y: a.y - b.y
});

const magSq = (v) => v.x * v.x + v.y * v.y;

const mag = (v) => Math.sqrt(magSq(v));

const unit = (v) => {
  const m = mag(v);
  return {
    x: v.x / m,
    y: v.y / m
  };
};

const scale = (v, c) => ({
  x: v.x * c,
  y: v.y * c
});

const dot = (a, b) => (a.x * b.x + a.y * b.y);

const renderParticles = (delta) => {
  const center = { x: width / 2, y: height / 2 };

  particles.forEach(p => {
    const dCenter = vecDiff(center, p);
    p.acc = scale(unit(dCenter), delta * edgeForce * magSq(dCenter));
    if (magSq(p.vel) !== 0) {
      p.acc = vecSum(p.acc, scale(unit(p.vel), -dragConst * delta * magSq(p.vel)));
    }

    particles.forEach(o => {
      if (p !== o) {
        const diff = vecDiff(p, o);
        p.acc = vecSum(p.acc, scale(unit(diff), delta * particleForce / mag(diff)));
      }
    });
    
    p.vel = vecSum(p.vel, p.acc);
    p.x += p.vel.x * delta;
    p.y += p.vel.y * delta;

    ctx.save();
    ctx.beginPath();
    const radius = p.mass * particleSize;
    ctx.fillStyle = "#FFFFFF";
    ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  });
};

const render = (timestamp) => {
  let delta;

  if (!lastTime) {
    lastTime = timestamp;
    delta = 0;
  } else {
    delta = timestamp - lastTime;
    lastTime = timestamp;
  }

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);
  
  renderParticles(delta);

  req = requestAnimationFrame(render);
};

let req = requestAnimationFrame(render);

spawnParticles(2);
console.log(particles);

window.addEventListener("unload", () => {
  cancelAnimationFrame(req);
});
