const todoList = document.querySelector(".todo");
const inProgressList = document.querySelector(".in-progress");
const doneList = document.querySelector(".done");

const dropListHandler = e => {
  e.preventDefault();

  const dropCards = cardsArr[e.target.dataset.id];

  let closest = null;
  let minDist = Infinity;

  e.target.querySelectorAll(".card").forEach(card => {
    const rect = card.getBoundingClientRect();
    const dist = rect.top + rect.height / 2 - e.clientY;
    if (card.dataset.id !== draggingId && dist >= 0 && dist < minDist) {
      closest = card;
      minDist = dist;
    }
  });

  const closestCardId = closest && closest.dataset.id;

  const card = sourceCards[draggingId];
  if (card.next !== null) {
    sourceCards[card.next].prev = card.prev;
  }

  if (card.prev !== null ) {
    sourceCards[card.prev].next = card.next;
  }

  if (closestCardId !== null) {
    card.next = closestCardId;
    dropCards[closestCardId].prev;

    const closestCard = dropCards[closestCardId];

    if (closestCard.prev !== null) {
      dropCards[closestCard.prev].next = draggingId;
    }

    if (closestCard.next !== null) {
      dropCards[closestCard.next].prev = draggingId;
    }

    e.target.insertBefore(card.el, closest);
  } else {
    card.next = null;
    card.prev = null;

    e.target.appendChild(card.el);
  }
  
  delete sourceCards[draggingId];
  dropCards[draggingId] = card;
};

const cardDragStart = e => {
  const rect = e.target.getBoundingClientRect();

  offset = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.y
  };
  
  e.dataTransfer.setData("Text", e.target.dataset.id);
  e.dataTransfer.setDragImage(new Image(), 0, 0);
  
  draggingId = e.target.dataset.id;
  sourceCards = cardsArr[e.target.parentNode.dataset.id];
};

const cardDrag = e => {
  e.target.style.position = "fixed";
  e.target.style.top = "0";
  e.target.style.left = "0";
  e.target.style.transform = `translate3d(${ e.clientX }px, ${ e.clientY }px, 0)`;
  e.target.style.zIndex = "1";
};

const cardDragEnd = (e) => {
  e.target.style.position = "relative";
  e.target.style.transform = "none";
  e.target.style.zIndex = "0";
};

const allowDrop = e => e.preventDefault();

const todoCards = {};
const inProgressCards = {};
const doneCards = {};

const cardsArr = [todoCards, inProgressCards, doneCards];
const listArr = [todoList, inProgressList, doneList];

let offset = {};
let draggingId = null;
let sourceCards = null;

todoList.ondrop = dropListHandler;
todoList.ondragover = allowDrop;
inProgressList.ondrop = dropListHandler;
inProgressList.ondragover = allowDrop;
doneList.ondrop = dropListHandler;
doneList.ondragover = allowDrop;

const todoCardsArr = todoList.querySelectorAll(".card");
todoCardsArr.forEach((card, idx) => {
  const id = card.dataset.id;
  todoCards[id] = {
    el: card,
    prev: idx === 0 ? null : idx - 1,
    next: idx < todoCardsArr.length - 1 ? idx + 1 : null
  };
});

const inProgressCardsArr = inProgressList.querySelectorAll(".card");
inProgressCardsArr.forEach((card, idx) => {
  const id = card.dataset.id;
  inProgressCards[id] = {
    el: card,
    prev: idx === 0 ? null : idx - 1,
    next: idx < inProgressCardsArr.length - 1 ? idx + 1 : null
  };
});

const doneCardsArr = doneList.querySelectorAll(".card");
doneCardsArr.forEach((card, idx) => {
  const id = card.dataset.id;
  doneCards[id] = {
    el: card,
    prev: idx === 0 ? null : idx - 1,
    next: idx < doneCardsArr.length - 1 ? idx + 1 : null
  };
});

let id = 0;

document.querySelectorAll(".card").forEach(card => {
  card.ondragstart = cardDragStart;
  card.ondrag = cardDrag;
  card.ondragend = cardDragEnd;
  id++;
});

const createCard = () => {
  const card = document.createElement("DIV");
  card.classList.add("card");
  card.innerHTML = `Card ${ id }`;
  card.draggable = true;
  card.dataset.id = id;
  card.ondragstart = cardDragStart;
  card.ondrag = cardDrag;
  card.ondragend = cardDragEnd;
  id++;
  return card;
};

document.querySelectorAll(".new-card").forEach(icon => {
  icon.addEventListener("click", () => {
    const cardEl = createCard();
    const list = listArr[icon.dataset.listId];
    const cards = cardsArr[icon.dataset.listId];
    list.appendChild(cardEl);

    let lastCard = cards[Object.keys(cards)[0]];
    while (lastCard && lastCard.next !== null) {
      lastCard = cards[lastCard.next];
    }

    const card = {
      el: cardEl,
      next: null,
      prev: null
    };

    if (lastCard) {
      lastCard.next = cardEl.dataset.id;
      card.prev = lastCard.el.dataset.id;
    } 
    
    cards[cardEl.dataset.id] = card;
  });
});
