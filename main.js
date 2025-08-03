const modalBackground = document.querySelector('.modal__background');
const modalTitle = document.querySelector('.modal__title');
const modalMessage = document.querySelector('.modal__message');
const modalReplayButton = document.querySelector('.modal__replay-button');
const chanceRemainingCount = document.querySelector('.chance__remaining-count');
const hintMessage = document.querySelector('.hint-message');
const numberField = document.querySelector('.answer-input__number-field');
const confirmButton = document.querySelector('.answer-input__confirm-button');
const resetButton = document.querySelector('.reset-button');

let randomAnswer = 0;
let chanceCount = 5;
const answerRecords = [];

function generateRandomNumber() {
  randomAnswer = Math.floor(Math.random() * 100) + 1;
  console.log('🚀 ~ generateRandomNumber ~ randomAnswer:', randomAnswer);
}

function removeHintMessageClass() {
  hintMessage.classList.remove('hint-message--up');
  hintMessage.classList.remove('hint-message--down');
  hintMessage.classList.remove('hint-message--invalid');
}

function showHintMessage(message, modifier) {
  removeHintMessageClass();
  hintMessage.classList.add(`hint-message--${modifier}`);
  hintMessage.textContent = message;
  numberField.value = '';
  numberField.focus();
}

function handlePlayGame() {
  const userAnswer = numberField.value;

  if (!userAnswer || userAnswer < 1 || userAnswer > 100) {
    showHintMessage('1부터 100 사이 숫자를 입력해 주세요!', 'invalid');
    return;
  }

  if (answerRecords.includes(userAnswer)) {
    showHintMessage('이미 입력한 숫자입니다!', 'invalid');
    return;
  }

  chanceCount--;
  chanceRemainingCount.textContent = chanceCount;

  if (userAnswer > randomAnswer) {
    showHintMessage('DOWN! 더 작은 숫자입니다!', 'down');
  } else if (userAnswer < randomAnswer) {
    showHintMessage('DOWN! 더 큰 숫자입니다!', 'up');
  } else {
    modalBackground.classList.add('modal--visible');
    modalTitle.textContent = '축하합니다!';
    modalMessage.textContent = `정답 ${randomAnswer}을(를) 맞추셨습니다!`;
    confirmButton.disabled = true;
    return;
  }

  if (chanceCount < 1) {
    modalBackground.classList.add('modal--visible');
    modalTitle.textContent = '게임 종료';
    modalMessage.textContent = `정답은 ${randomAnswer}입니다. 다시 도전해 보세요!`;
    confirmButton.disabled = true;
  }

  answerRecords.push(userAnswer);
}

function handleResetGame() {
  chanceCount = 5;
  chanceRemainingCount.textContent = chanceCount;

  modalBackground.classList.remove('modal--visible');
  modalTitle.textContent = '';
  modalMessage.textContent = '';

  confirmButton.disabled = false;

  hintMessage.textContent = '';

  numberField.value = '';

  answerRecords.splice(0);

  removeHintMessageClass();
  generateRandomNumber();
}

generateRandomNumber();

confirmButton.addEventListener('click', handlePlayGame);
resetButton.addEventListener('click', handleResetGame);
modalReplayButton.addEventListener('click', handleResetGame);
