const modalBackground = document.querySelector('.modal__background');
const modalTitle = document.querySelector('.modal__title');
const modalMessage = document.querySelector('.modal__message');
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

  numberField.value = '';
  numberField.focus();
}

generateRandomNumber();

confirmButton.addEventListener('click', handlePlayGame);
