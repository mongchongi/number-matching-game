const chanceRemainingCount = document.querySelector('.chance__remaining-count');
const hintMessage = document.querySelector('.hint-message');
const numberField = document.querySelector('.answer-input__number-field');
const confirmButton = document.querySelector('.answer-input__confirm-button');

let randomAnswer = 0;
let chanceCount = 5;

function generateRandomNumber() {
  randomAnswer = Math.floor(Math.random() * 100) + 1;
  console.log('🚀 ~ generateRandomNumber ~ randomAnswer:', randomAnswer);
}

function handlePlayGame() {
  const userAnswer = numberField.value;

  chanceCount--;
  chanceRemainingCount.textContent = chanceCount;

  if (userAnswer > randomAnswer) {
    hintMessage.classList.remove('hint-message--up');
    hintMessage.classList.add('hint-message--down');
    hintMessage.textContent = 'DOWN! 더 작은 숫자입니다!';
  } else if (userAnswer < randomAnswer) {
    hintMessage.classList.remove('hint-message--down');
    hintMessage.classList.add('hint-message--up');
    hintMessage.textContent = 'DOWN! 더 큰 숫자입니다!';
  }

  numberField.value = '';
  numberField.focus();
}

generateRandomNumber();

confirmButton.addEventListener('click', handlePlayGame);
