const grid = document.querySelector(".grid");
const easyBtn = document.querySelector(".easy");
const mediumBtn = document.querySelector(".medium");
const hardBtn = document.querySelector(".hard");

let alphabet = [];
let cardA = null;
let flippingAllowed = true;
let score = 0;
let attempts = 0;

const createCard = (val) => {
  const card = document.createElement("DIV");
  card.classList.add("card");
  card.dataset["value"] = val;
  card.addEventListener("click", () => {
    if (card.classList.contains("hidden") || !flippingAllowed) return;

    card.classList.toggle("flipped");

    if (!cardA) {
      cardA = card;  
    } else {
      ++attempts;

      if (cardA.dataset.value === card.dataset.value) {
        score++;
        flippingAllowed = false;
        cardA.classList.add("hidden");
        card.classList.add("hidden");
        setTimeout(() => {
          flippingAllowed = true;
          cardA = null;

          if (score * 2 >= alphabet.length) {
            alert(`You Win! You matched ${ alphabet.length / 2 } pairs in ${ attempts } attempts.`);
            location.reload();
          }
        }, 800);
      } else {
        flippingAllowed = false;
        setTimeout(() => {
          flippingAllowed = true;
          cardA.classList.remove("flipped");
          card.classList.remove("flipped");
          cardA = null;
        }, 800);
      }
    }
  });
  
  const inner = document.createElement("DIV");
  inner.classList.add("card-inner");

  const back = document.createElement("DIV");
  back.classList.add("back");
  back.innerHTML = `<i class="fas fa-meteor"></i>`;
  inner.appendChild(back);

  const front = document.createElement("DIV");
  front.classList.add("front");
  front.innerHTML = val;
  inner.appendChild(front);
  
  card.appendChild(inner);

  grid.appendChild(card);
};

const createAlphabet = (len=10) => {
  alphabet = [];

  for (let i = 65; i <= Math.min(90, 65 + len); ++i) {
    alphabet.push(String.fromCharCode(i));
    alphabet.push(String.fromCharCode(i));
  }

  for (let i = alphabet.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * i);
    const temp = alphabet[i];
    alphabet[i] = alphabet[j];
    alphabet[j] = temp;
  }

  grid.innerHTML = "";
  alphabet.forEach(createCard);
};

createAlphabet();

easyBtn.addEventListener("click", () => createAlphabet());
mediumBtn.addEventListener("click", () => createAlphabet(18));
hardBtn.addEventListener("click", () => createAlphabet(26));
