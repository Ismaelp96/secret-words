import { useCallback, useEffect, useState } from 'react';

import { wordsList } from './data/words';

import StartScreen from './components/start/StartScreen';
import Game from './components/game/Game';
import GameOver from './components/gameOver/GameOver';

import './App.css';

const guessesQty = 3;
const scorePoints = 0;

function App() {
	const [game, setGame] = useState({
		stage: 'start',
		guesses: guessesQty,
		score: scorePoints,
		words: wordsList,
		pickedWord: '',
		pickedCategory: '',
		letters: [],
		guessedLetters: [],
		wrongLetters: [],
	});

	const clearLetterStates = () => {
		setGame((prevGame) => ({
			...prevGame,
			guessedLetters: [],
			wrongLetters: [],
		}));
	};

	const pickWordAndCategory = useCallback(() => {
		const categories = Object.keys(game.words);
		const category =
			categories[Math.floor(Math.random() * Object.keys(categories).length)];

		const word =
			game.words[category][
				Math.floor(Math.random() * game.words[category].length)
			];

		return { word, category };
	}, [game.words]);

	const startGame = useCallback(() => {
		clearLetterStates();
		const { word, category } = pickWordAndCategory();
		let letters = word.split('');
		letters = letters.map((l) => l.toLowerCase());
		setGame((prevGame) => ({
			...prevGame,
			pickedWord: word,
			pickedCategory: category,
			letters: letters,
			stage: 'game',
		}));
	}, [pickWordAndCategory]);

	const verifyLetter = (letter) => {
		const normalizedLetter = letter.toLowerCase();
		const lettersVerified =
			game.guessedLetters.includes(normalizedLetter) ||
			game.wrongLetters.includes(normalizedLetter);
		if (lettersVerified) return;

		const lettersCorrect = game.letters.includes(normalizedLetter);
		if (lettersCorrect) {
			setGame((prevGame) => ({
				...prevGame,
				guessedLetters: [...prevGame.guessedLetters, normalizedLetter],
				score: prevGame.score + 1,
			}));
		} else {
			setGame((prevGame) => ({
				...prevGame,
				wrongLetters: [...prevGame.wrongLetters, normalizedLetter],
				guesses: prevGame.guesses - 1,
			}));
		}
	};

	useEffect(() => {
		if (game.guesses <= 0) {
			clearLetterStates();
			setGame((prevGame) => ({
				...prevGame,
				stage: 'end',
			}));
		}
	}, [game.guesses]);

	useEffect(() => {
		const uniqueLetters = [...new Set(game.letters)];
		const validateWin = game.guessedLetters.length === uniqueLetters.length;
		if (validateWin) {
			setGame((prevGame) => ({
				...prevGame,
				score: (prevGame.score += 100),
			}));

			startGame();
		}
	}, [game.guessedLetters, game.letters, startGame]);

	const retryGame = () => {
		setGame((prevGame) => ({
			...prevGame,
			stage: 'start',
			score: scorePoints,
			guesses: guessesQty,
		}));
	};

	return (
		<div className='App'>
			{game.stage === 'start' && <StartScreen startGame={startGame} />}
			{game.stage === 'game' && (
				<Game
					verifyLetter={verifyLetter}
					pickedWord={game.pickedWord}
					pickedCategory={game.pickedCategory}
					letters={game.letters}
					guessedLetters={game.guessedLetters}
					wrongLetters={game.wrongLetters}
					guesses={game.guesses}
					score={game.score}
				/>
			)}
			{game.stage === 'end' && (
				<GameOver
					retryGame={retryGame}
					score={game.score}
					pickedWord={game.pickedWord}
				/>
			)}
		</div>
	);
}

export default App;
