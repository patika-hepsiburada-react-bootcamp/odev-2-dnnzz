const words = [
  "derive",
  "obey",
  "yield",
  "pack",
  "term",
  "sponsor",
  "reinforce",
  "attack",
  "motivate",
  "restore",
  "hand",
  "touch",
  "differentiate",
  "build",
  "sue",
  "dig",
  "train",
  "store",
  "plunge",
  "bear",
];

// Generates random word from words array
export const generateRandomWord = () => words[Math.floor(Math.random() * words.length)];
