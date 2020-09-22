const tabHeader = document.querySelector(".tab-header");
const tabContainer = document.querySelector(".tab-container");
const newTab = document.querySelector(".new-tab");
const tabArr = document.querySelectorAll(".tab");
const tabContentsArr = document.querySelectorAll(".tab-content");

const tabs = {};
let id = 0;

tabArr.forEach(tab => {
  tabs[tab.dataset["tab"]] = tab;
  id = parseInt(tab.dataset["tab"]);
});

const tabContents = {};

tabContentsArr.forEach(content => {
  tabContents[content.dataset["tab"]] = content;
});

let selected = tabs[0].dataset["tab"];

const updateSelected = (id) => {
  if (tabs[selected]) {
    tabs[selected].classList.remove("selected");
    tabContents[selected].classList.remove("selected");
  }

  tabs[id].classList.add("selected");
  tabContents[id].classList.add("selected");

  selected = id;
};

const createTabDelHandler = (tab) => e => {
  e.stopPropagation();
  const tabId = tab.dataset["tab"];
  tabContainer.removeChild(tabContents[tabId]);
  tabHeader.removeChild(tabs[tabId]);
  delete tabContents[tabId];
  delete tabs[tabId];

  if (selected === tabId) {
    updateSelected(Object.keys(tabs)[0]);
  }
};

tabArr.forEach(tab => {
  tab.querySelector(".del").addEventListener("click", createTabDelHandler(tab));

  tab.addEventListener("click", () => {
    updateSelected(tab.dataset["tab"]);
  });
});

newTab.addEventListener("click", () => {
  const tab = document.createElement("DIV");
  tab.classList.add("tab");
  tab.dataset["tab"] = ++id;

  const delIcon = document.createElement("I");
  delIcon.classList.add("del", "fas", "fa-times");
  delIcon.addEventListener("click", createTabDelHandler(tab));

  tab.appendChild(delIcon);
  tab.appendChild(document.createTextNode(`Tab ${ id + 1 }`));

  tab.addEventListener("click", () => updateSelected(tab.dataset["tab"]));
  
  tabHeader.appendChild(tab);
  tabs[id] = tab;

  const tabContent = document.createElement("DIV");
  tabContent.classList.add("tab-content");
  tabContent.dataset["tab"] = id;
  tabContent.innerHTML = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam veniam perspiciatis eveniet dolores, possimus sint blanditiis temporibus earum quae explicabo laudantium, facilis vero! Veritatis corporis totam accusamus sequi minus eaque!
  Sit tenetur ipsa repellat ut eligendi? Quo fugit dolore quod eius. Omnis, sapiente reprehenderit cupiditate ipsum officia pariatur natus sit impedit quibusdam illum repellat reiciendis quo autem consequuntur aliquam blanditiis.
  Laboriosam est, porro mollitia officiis autem voluptatem recusandae explicabo enim earum veritatis odio consectetur, esse rem, ipsam qui omnis itaque aspernatur eius aliquid ratione ipsum molestiae voluptate? Rem, dolorum a?
  Veniam, quam? Recusandae iusto quae sequi hic, dicta fugiat minus voluptatem esse labore amet a aliquam quisquam. Placeat esse aliquam minima, sint earum omnis error tempore. Perspiciatis, rerum impedit. Exercitationem.
  Voluptate quam voluptas et numquam corporis!`;
  tabContainer.appendChild(tabContent);
  tabContents[id] = tabContent;

  updateSelected(id.toString());
});
