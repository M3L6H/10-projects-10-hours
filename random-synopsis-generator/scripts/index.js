const form = document.getElementById("synopsis-form");
const synopsisEl = document.getElementById("synopsis");

const vowels = ["a", "e", "i", "o", "u"];

const randGenerator = (arr) => () => (
  arr[Math.floor(Math.random() * arr.length)]
);

const randEvil = randGenerator(["evil", "terrible", "horrendous", "horrific", "monstrous", "demonic"]);
const randGreat = randGenerator(["great", "extreme", "abject", "complete", "utter"]);
const randSmall = randGenerator(["small", "tiny", "insignificant", "puny", "microscopic"]);
const randDir = randGenerator(["North", "South", "East", "West"]);
const randDark = randGenerator(["darkness", "despair", "despondency", "evil", "malignency"]);
const randTyranny = randGenerator(["tyranny", `${ randEvil() } deeds`, "cruelty"]);
const randMistake = randGenerator(["mistake", "indiscretion", "slip-up"]);
const randNotorious = randGenerator(["infamous", "notorious", "well-known", "famous"]);
const randRuler = randGenerator(["ruler", "overlord", "emperor", "magnate", "despot"]);
const randDaring = randGenerator(["daring", "foolhardy", "reckless"]);

const aAn = (word) => (vowels.includes(word[0].toLowerCase()) ? `an ${ word }` : `a ${ word }`);

const randFantasyTemplate = randGenerator([
  (hero, villain) => `Once upon a time, there was ${ aAn(randEvil()) } overlord, ${ villain }. This overlord brought ${ randGreat() } destruction to the land. However, unbeknownst to them, a hero arose in a ${ randSmall() } village to the ${ randDir() }. Could this hero, ${ hero }, bring peace and prosperity back to the land? Read on and find out!`,
  (hero, villain) => `In a land filled with ${ randDark() } and ${ randDark() }, hope comes in scarce quantities, and virtue is nonexistent. The great ${ villain } lords over everything. Nobody is safe from their ${ randTyranny() }. But all it took was a little ${ randMistake() }. One slipped by, the ${ randNotorious() } ${ hero }, and piece by piece, ${ villain }'s empire started unwinding.`
]);

const randRomanceTemplate = randGenerator([
  (hero, villain) => `Love has not come easy for ${ hero }. Yet, they pine for the moment where true love becomes reality. But lurking in the shadows, ever jealous and desiring ${ randEvil() } things, ${ villain } has got other plans. Can love truly overcome ${ randGreat() } adversity? ${ hero } is willing to find out.`
]);

const randSciFiTemplate = randGenerator([
  (hero, villain) => `In a galaxy far far away, chaos reigned as the ${ randRuler() } ${ villain } wreaked havoc on isolated star systems. Unbeknownst to them, the resistance, led by ${ hero } has planned a ${ randDaring() } scheme to overthrow ${ villain }. However, time is ticking as ${ villain }'s starships close in. Will the rebels make it in time?`
]);

form.addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(form);

  const hero = formData.get("hero").trim();
  const villain = formData.get("villain").trim();

  if (!hero || !villain) return;
  
  switch (formData.get("genre")) {
    case "Fantasy":
      synopsisEl.innerHTML = randFantasyTemplate()(hero, villain);
      break;
    case "Romance":
      synopsisEl.innerHTML = randRomanceTemplate()(hero, villain);
      break;
    case "Science Fiction":
      synopsisEl.innerHTML = randSciFiTemplate()(hero, villain);
      break;
  }
});
