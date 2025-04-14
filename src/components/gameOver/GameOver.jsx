import React from 'react';

import './GameOver.css';
const GameOver = ({ retryGame, score, pickedWord }) => {
	return (
		<div className='game-over'>
			<h1>Não foi dessa vez!</h1>
			<p>
				Sua pontuação foi: <strong>{score}</strong>
			</p>
			<p>A palavra era: {pickedWord}</p>
			<button onClick={retryGame}>Tentar novamente</button>
		</div>
	);
};

export default GameOver;
