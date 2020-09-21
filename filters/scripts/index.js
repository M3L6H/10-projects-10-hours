const blueEl = document.querySelector(".blue");
const greenEl = document.querySelector(".green");
const yellowEl = document.querySelector(".yellow");
const redEl = document.querySelector(".red");
const brownEl = document.querySelector(".brown");
const purpleEl = document.querySelector(".purple");

const allFilter = document.getElementById("all");
const primaryFilter = document.getElementById("primary");
const secondaryFilter = document.getElementById("secondary");
const miscFilter = document.getElementById("misc");

const data = [
  {
    el: blueEl,
    filter: 0b100
  },
  {
    el: redEl,
    filter: 0b100
  },
  {
    el: yellowEl,
    filter: 0b100
  },
  {
    el: greenEl,
    filter: 0b10
  },
  {
    el: brownEl,
    filter: 0b1
  },
  {
    el: purpleEl,
    filter: 0b110
  }
];

let filter = 0b1000;

const filterCards = () => {
  data.forEach(datum => {
    console.log((datum.filter & filter).toString(2));
    if (filter >> 3 === 1 || (filter & datum.filter) !== 0) {
      datum.el.classList.remove("hidden");
    } else {
      datum.el.classList.add("hidden");
    }
  });
};

filterCards();

const showAll = () => {
  filter = 0b1000;

  allFilter.classList.add("selected");
  primaryFilter.classList.remove("selected");
  secondaryFilter.classList.remove("selected");
  miscFilter.classList.remove("selected");
  filterCards();
};

allFilter.addEventListener("click", showAll);

const createFilterHandler = (filterEl, mask) => {
  return () => {
    filter = filter ^ mask;

    if ((filter & mask) === 0) {
      filterEl.classList.remove("selected");
    } else {
      filterEl.classList.add("selected");
      filter = filter & 0b0111;
    }
  
    if (filter === 0) {
      showAll();
    } else {
      allFilter.classList.remove("selected");
      filterCards();
    }
  };
}

primaryFilter.addEventListener("click", createFilterHandler(primaryFilter, 0b0100));
secondaryFilter.addEventListener("click", createFilterHandler(secondaryFilter, 0b0010));
miscFilter.addEventListener("click", createFilterHandler(miscFilter, 0b0001));
