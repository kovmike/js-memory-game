import { combine, createStore, createDomain, sample, split } from "effector";
import _ from "lodash";
import { getMemoDeck } from "./deck";

const inc = (s) => s + 1;

///////////

const game = createDomain();
export const restartClicked = game.createEvent();
const resetFlippedCardStore = game.createEvent();
game.onCreateStore((store) => {
  if(store.shortName!=='cards')  store.reset(restartClicked)
});

const undoFx = game.createEffect(async ({ first, second }) => {
  return new Promise((r) => {
    setTimeout(() => {
      r([first.id, second.id]);
    }, 500);
  });
});

export const cardClicked = game.createEvent();
export const tick = game.createEvent();

export const $firstCard = game.createStore(null);
export const $secondCard = game.createStore(null);
export const $clickCount = game.createStore(0);
export const $timer = game.createStore(0);

$firstCard.reset([resetFlippedCardStore, undoFx.doneData]);
$secondCard.reset([resetFlippedCardStore, undoFx.doneData]);

export const $cards = game.createStore(getMemoDeck(), {name: 'cards'});
export const $$grid = $cards.map((cards) => _.chunk(cards, 6));

export const $$points = combine($clickCount, $timer, (cc, t) => 1000 - cc - t);
export const $$hasWon = $cards.map((cards) =>
  cards.every(({ isFlipped }) => isFlipped)
);

$clickCount.on(cardClicked, inc);
$cards.on(undoFx.doneData, (cards, flipped) =>
  cards.map((card) =>
    flipped.includes(card.id) ? { ...card, isFlipped: false } : card
  )
).on(restartClicked, ()=>getMemoDeck())

sample({
  source: $cards,
  clock: cardClicked,
  filter: combine($firstCard, $secondCard, (f, s) => !f || !s),
  fn: (cards, clickedCard) =>
    cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    ),
  target: $cards,
});

sample({
  source: $timer,
  clock: tick,
  filter: $$hasWon.map((s) => !s),
  fn: inc,
  target: $timer,
});

split({
  source: cardClicked,
  match: {
    first: $firstCard.map((c) => !c),
    second: combine(
      $firstCard,
      $secondCard,
      (first, second) => !!first && !second
    ),
  },
  cases: {
    first: $firstCard,
    second: $secondCard,
  },
});

split({
  source: combine($firstCard, $secondCard, (first, second) => ({
    first,
    second,
  })),
  match: ({ first, second }) => {
    if (first && second) {
      return first?.rank === second?.rank ? "resetFlippedCardStore" : "undoFx";
    }
  },
  cases: {
    resetFlippedCardStore,
    undoFx,
  },
});
