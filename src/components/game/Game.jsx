import React, { useState, useRef } from 'react';

import './Game.css';
const Game = ({
	verifyLetter,
	pickedWord,
	pickedCategory,
	letters,
	guesses,
	score,
	wrongLetters,
	guessedLetters,
}) => {
	const [letter, setLetter] = useState('');
	const letterInputRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		verifyLetter(letter);
		setLetter('');
		letterInputRef.current.focus();
	};
	return (
		<div className='game'>
			<div className='points'>
				<span>Pontos:{score}</span>
			</div>
			<h1>Advinhe a palavra:</h1>
			<p className='tip'>
				Dica sobre a palavra: <span>{pickedCategory}</span>
			</p>
			<p>Voce ainda tem {guesses} tentativas.</p>
			<div className='word-container'>
				{letters?.map((letter, i) =>
					guessedLetters.includes(letter) ? (
						<span key={i} className='letter'>
							{letter}
						</span>
					) : (
						<span key={i} className='blank-square'></span>
					),
				)}
			</div>
			<div className='letter-container'>
				<p>Tente adivinhar uma letra da palavra:</p>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						name='letter'
						maxLength='1'
						required
						onChange={(e) => setLetter(e.target.value)}
						value={letter}
						ref={letterInputRef}
					/>
					<button>Jogar</button>
				</form>
			</div>
			<div className='wrong-letters-container'>
				<p>Letras erradas:</p>
				{wrongLetters.map((letter, i) => (
					<span key={i} className='wrong-letter'>
						{letter},
					</span>
				))}
			</div>
		</div>
	);
};

export default Game;
