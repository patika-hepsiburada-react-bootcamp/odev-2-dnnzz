import React, { useEffect, useState, useCallback } from "react";
import { generateRandomWord } from "../words";
import "./Hangman.scss";
import step0 from "../images/0.jpg";
import step1 from "../images/1.jpg";
import step2 from "../images/2.jpg";
import step3 from "../images/3.jpg";
import step4 from "../images/4.jpg";
import step5 from "../images/5.jpg";

export const Hangman = () => {
  const images = [step0, step1, step2, step3, step4, step5];
  const maxMistakes = 5;
  const [mistakes, setMistakes] = useState(0);
  const [guesses, setGuesses] = useState(new Set());
  const [answer, setAnswer] = useState(generateRandomWord());
  const [gameStatus, setGameStatus] = useState("playing");

  // Handle keyboard events with keycodes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyPress = (event) => {
    if (gameStatus === "YOU WON" || gameStatus === "YOU LOST") {
      if (event.keyCode === 8 || event.keyCode === 13 || event.keyCode === 32) {
        handleReset();
      }
    } else if (event.keyCode >= 65 && event.keyCode <= 222) {
      handleGuesses(event.key);
    } else if (event.keyCode === 8 || event.keyCode === 13 || event.keyCode === 32) {
      handleReset();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  // tracks game status according to mistakes..
  useEffect(() => {
    if (mistakes >= maxMistakes) {
      setGameStatus("YOU LOST");
    }
    if (currentWord().join("") === answer) {
      setGameStatus("YOU WON");
    }
  }, [mistakes, guesses]);
  //Arranging _ and correct guessed letters
  const currentWord = () => answer.split("").map((c) => (guesses.has(c) ? c : "_"));
  // handling guess action if user guessed right it'll remove underscore from word section
  // if guess is wrong it add mistakes + 1
  const handleGuesses = (key) => {
    let letter = key;
    console.log(letter);
    let tmpGuess = guesses.add(key);
    setGuesses(new Set(tmpGuess));
    setMistakes(mistakes + (answer.includes(letter) ? 0 : 1));
  };

  // Generating letter buttons for user
  const generateButtons = () => {
    return "abcdefghijklmonpqrstuvwxyz".split("").map((letter) => (
      <button
        key={letter}
        value={letter}
        onClick={(e) => handleGuesses(e.target.value)}
        className='btn'
      >
        {letter}
      </button>
    ));
  };
  //Handles reset situation
  const handleReset = () => {
    setMistakes(0);
    setAnswer(generateRandomWord());
    setGuesses(new Set());
    setGameStatus("playing");
  };
  return (
    <div className='Hangman'>
      <nav className='top'>
        <a href='https://github.com/dnnzz' className='title'>
          Hangman Bootcamp Task
        </a>
        <div className='wrong-guesses'>Guessed wrong: {mistakes}</div>
      </nav>
      <div className='main'>
        <div className='left'>
          <div className='showimg'>
            <img src={images[mistakes]} alt={"hangman-img"} />
          </div>
          <div className='output-area'>
            <p>Guess the word</p>
            {/* Changes text section according to gameStatus state*/}
            <p className='letters'>{gameStatus === "YOU LOST" ? answer : currentWord()}</p>
          </div>
        </div>
        <div className='right'>
          {/* Changes color of text according to gameStatus state*/}
          <div style={gameStatus === "YOU WON" ? { color: "green" } : {}}>
            {gameStatus === "playing" ? generateButtons() : gameStatus}
          </div>
          <button className='btn-reset' onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hangman;
