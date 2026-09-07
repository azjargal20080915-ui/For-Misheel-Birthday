const gameScore = document.getElementById('gameScore');
const gameMessage = document.getElementById('gameMessage');
let score = 0;
const funnyMessages = [
	'The birthday committee approves.',
	'That was suspiciously impressive.',
	'The cake is cheering for you.',
	'Professional cousin energy detected.',
	'Your score is wearing sparkles.'
];

function addScore(points) {
	score += points;
	if (gameScore) gameScore.textContent = score;
	if (gameMessage) gameMessage.textContent = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
}

const starGame = document.getElementById('starGame');
const starTarget = document.getElementById('starTarget');
const startStar = document.getElementById('startStar');
const starStatus = document.getElementById('starStatus');
let starTimer;
let starCount = 0;

function moveStar() {
	const maxLeft = Math.max(0, starGame.clientWidth - starTarget.offsetWidth);
	const maxTop = Math.max(0, starGame.clientHeight - starTarget.offsetHeight);
	starTarget.style.left = `${Math.random() * maxLeft}px`;
	starTarget.style.top = `${Math.random() * maxTop}px`;
}

if (startStar) {
	startStar.addEventListener('click', () => {
		starCount = 0;
		starTarget.disabled = false;
		starStatus.textContent = 'Go!';
		moveStar();
		clearTimeout(starTimer);
		starTimer = setTimeout(() => {
			starTarget.disabled = true;
			starStatus.textContent = `Time! You caught ${starCount} stars.`;
		}, 15000);
	});
}

if (starTarget) {
	starTarget.addEventListener('click', () => {
		starCount += 1;
		addScore(1);
		starStatus.textContent = `Stars caught: ${starCount}`;
		moveStar();
	});
}

const memoryCards = Array.from(document.querySelectorAll('.memory-card-game'));
let firstMemoryCard = null;
let memoryLocked = false;

function resetMemoryCards() {
	firstMemoryCard = null;
	memoryLocked = false;
	memoryCards.forEach((card) => {
		card.textContent = '?';
		card.classList.remove('revealed', 'matched');
	});
	const memoryStatus = document.getElementById('memoryStatus');
	if (memoryStatus) memoryStatus.textContent = 'Find a pair.';
}

memoryCards.forEach((card) => {
	card.addEventListener('click', () => {
		if (memoryLocked || card.classList.contains('revealed') || card.classList.contains('matched')) return;

		card.textContent = card.dataset.card === 'cake' ? '🎂' : '⭐';
		card.classList.add('revealed');

		if (!firstMemoryCard) {
			firstMemoryCard = card;
			return;
		}

		if (firstMemoryCard.dataset.card === card.dataset.card) {
			firstMemoryCard.classList.add('matched');
			card.classList.add('matched');
			addScore(3);
			document.getElementById('memoryStatus').textContent = 'Great match!';
			firstMemoryCard = null;
		} else {
			memoryLocked = true;
			document.getElementById('memoryStatus').textContent = 'Try again!';
			setTimeout(() => {
				firstMemoryCard.textContent = '?';
				card.textContent = '?';
				firstMemoryCard.classList.remove('revealed');
				card.classList.remove('revealed');
				firstMemoryCard = null;
				memoryLocked = false;
			}, 700);
		}
	});
});

const colorChoices = ['pink', 'blue', 'yellow'];
document.querySelectorAll('#colorChoices button').forEach((button) => {
	button.addEventListener('click', () => {
		const answer = colorChoices[Math.floor(Math.random() * colorChoices.length)];
		const colorStatus = document.getElementById('colorStatus');
		if (button.dataset.color === answer) {
			colorStatus.textContent = `Yes! It was ${answer}.`;
			addScore(2);
		} else {
			colorStatus.textContent = `Not this time. It was ${answer}.`;
		}
	});
});

let numberTries = 0;
const secretNumber = Math.floor(Math.random() * 10) + 1;
const numberGuess = document.getElementById('numberGuess');
const numberStatus = document.getElementById('numberStatus');
const guessNumber = document.getElementById('guessNumber');

if (guessNumber) {
	guessNumber.addEventListener('click', () => {
		const guess = Number(numberGuess.value);
		numberTries += 1;
		if (guess === secretNumber) {
			numberStatus.textContent = 'Correct! You got it!';
			addScore(3);
		} else if (numberTries >= 3) {
			numberStatus.textContent = `The number was ${secretNumber}.`;
			guessNumber.disabled = true;
		} else {
			numberStatus.textContent = guess < secretNumber ? 'Try a bigger number.' : 'Try a smaller number.';
		}
	});
}

const rpsChoices = ['rock', 'paper', 'scissors'];
document.querySelectorAll('#rpsChoices button').forEach((button) => {
	button.addEventListener('click', () => {
		const playerChoice = button.dataset.choice;
		const computerChoice = rpsChoices[Math.floor(Math.random() * rpsChoices.length)];
		const didWin = (playerChoice === 'rock' && computerChoice === 'scissors')
			|| (playerChoice === 'paper' && computerChoice === 'rock')
			|| (playerChoice === 'scissors' && computerChoice === 'paper');
		const rpsStatus = document.getElementById('rpsStatus');
		if (playerChoice === computerChoice) {
			rpsStatus.textContent = `It was a draw. We both chose ${computerChoice}.`;
		} else if (didWin) {
			rpsStatus.textContent = `You win! I chose ${computerChoice}.`;
			addScore(2);
		} else {
			rpsStatus.textContent = `I win this time. I chose ${computerChoice}.`;
		}
	});
});

document.querySelectorAll('#quizChoices button').forEach((button) => {
	button.addEventListener('click', () => {
		const quizStatus = document.getElementById('quizStatus');
		if (button.dataset.answer === 'yes') {
			quizStatus.textContent = 'Correct! Happy birthday, Misheel!';
			addScore(2);
		} else {
			quizStatus.textContent = 'Not quite. Try again!';
		}
	});
});

const resetMemory = document.getElementById('resetMemory');
if (resetMemory) resetMemory.addEventListener('click', resetMemoryCards);
