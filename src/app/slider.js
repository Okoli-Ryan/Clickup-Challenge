const cards = document.querySelectorAll(".testimonials__card");
const buttons = document.querySelectorAll(".left, .right");
const indexButtonsContainer = document.querySelector(
  ".testimonials__control-container__index"
);

let index = 0;

console.log(cards[0].clientWidth);

let indexElements = "";
for (let el of cards) {
  indexElements += `<span class="index"></span>`;
}

indexButtonsContainer.innerHTML = indexElements;
const indexButtonList = indexButtonsContainer.childNodes;
setArrows();

for (let [i, v] of indexButtonList.entries()) {
  v.addEventListener("click", function (e) {
    index = i;
    for (let card of cards) {
      card.style.transform = `translateX(${
        (card.clientWidth + 16) * -index
      }px)`;
    }
    setArrows();
  });
}

buttons[0].addEventListener("click", function (e) {
  if (index > 0) {
    index -= 1;
    for (let card of cards) {
      card.style.transform = `translateX(${
        (card.clientWidth + 16) * -index
      }px)`;
    }
    setArrows();
  }
});

buttons[1].addEventListener("click", function (e) {
  if (index < cards.length - 1) {
    index += 1;
    for (let card of cards) {
      card.style.transform = `translateX(${
        (card.clientWidth + 16) * -index
      }px)`;
    }
    setArrows();
  }
});

function setArrows() {
  for (const [i, v] of indexButtonList.entries()) {
    if (i === index) v.classList.add("active");
    else v.classList.remove("active");
  }
  if (index === cards.length - 1) {
    buttons[1].classList.remove("available");
    buttons[0].classList.add("available");
  } else if (index === 0) {
    buttons[0].classList.remove("available");
    buttons[1].classList.add("available");
  } else {
    buttons[0].classList.add("available");
    buttons[1].classList.add("available");
  }
}
