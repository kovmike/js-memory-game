import _ from "lodash";

const deck = [
  { rank: "6s", isFlipped: false },
  { rank: "7s", isFlipped: false },
  { rank: "8s", isFlipped: false },
  { rank: "9s", isFlipped: false },
  { rank: "Ts", isFlipped: false },
  { rank: "Js", isFlipped: false },
  { rank: "Qs", isFlipped: false },
  { rank: "Ks", isFlipped: false },
  { rank: "As", isFlipped: false },
  { rank: "6h", isFlipped: false },
  { rank: "7h", isFlipped: false },
  { rank: "8h", isFlipped: false },
  { rank: "9h", isFlipped: false },
  { rank: "Th", isFlipped: false },
  { rank: "Jh", isFlipped: false },
  { rank: "Qh", isFlipped: false },
  { rank: "Kh", isFlipped: false },
  { rank: "Ah", isFlipped: false },
  { rank: "6d", isFlipped: false },
  { rank: "7d", isFlipped: false },
  { rank: "8d", isFlipped: false },
  { rank: "9d", isFlipped: false },
  { rank: "Td", isFlipped: false },
  { rank: "Jd", isFlipped: false },
  { rank: "Qd", isFlipped: false },
  { rank: "Kd", isFlipped: false },
  { rank: "Ad", isFlipped: false },
  { rank: "6c", isFlipped: false },
  { rank: "7c", isFlipped: false },
  { rank: "8c", isFlipped: false },
  { rank: "9c", isFlipped: false },
  { rank: "Tc", isFlipped: false },
  { rank: "Jc", isFlipped: false },
  { rank: "Qc", isFlipped: false },
  { rank: "Kc", isFlipped: false },
  { rank: "Ac", isFlipped: false },
];

export const getMemoDeck = () => {
  const shuffledDeck = _.shuffle(deck);
  const slicedDeck = _.slice(shuffledDeck, 0, 15);
  return _.shuffle([...slicedDeck, ...slicedDeck]).map((card, index) => ({
  ...card,
  id: `${card.rank}-${index}`,
}));
};


