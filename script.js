let level = 1;
let currentExpression = '';
let score = 0;
let timeLeft = 15;
let timer;
let bestScores = JSON.parse(localStorage.getItem('bestScores')) || {};

const levelSpan = document.getElementById("level");
const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("bestScore");

function generateExpression(level) {
  const ops = ['+', '-'];
  let parts = [];
  let count = 3 + level;

  for (let i = 0; i < count; i++) {
    let num = generateNumber(level);
    const op = ops[Math.floor(Math.random() * ops.length)];
    parts.push(num);
    parts.push(op);
  }

  let lastNum = generateNumber(level);
  parts.push(lastNum);
  return parts.join(' ');
}

function generateNumber(level) {
  let max;
  if (level <= 3) max = 50;
  else if (level <= 6) max = 300;
  else if (level <= 9) max = 999;
  else max = 9999;

  let num = Math.floor(Math.random() * max) + 1;
  if (level >= 4 && Math.random() < 0.4) num *= -1;
  return num;
}

function updateExpression() {
  currentExpression = generateExpression(level);
  expressionEl.textContent = currentExpression;
  resultEl.textContent = '';
  document.getElementById("answer").value = '';
  levelSpan.textContent = level;
  updateBestScore();
  resetTimer();
}

function checkAnswer(auto = false) {
  const userInput = document.getElementById("answer").value;
  const userAnswer = Number(userInput);
  const correct = eval(currentExpression);

  if (userAnswer === correct) {
    score++;
    scoreEl.textContent = score;
    resultEl.textContent = "Correct!";
  } else {
    resultEl.textContent = `Wrong. Correct answer is ${correct}`;
  }

  saveBestScore();
  stopTimer();
}

function tryAgain() {
  resultEl.textContent = '';
  document.getElementById("answer").value = '';
  resetTimer();
}

function changeLevel(change) {
  if (change === 1 && !canUnlockLevel(level + 1)) {
    resultEl.textContent = "Unlock the next level by completing this one!";
    return;
  }

  level = Math.max(1, Math.min(10, level + change));
  updateExpression();
}

function canUnlockLevel(nextLevel) {
  return score >= nextLevel * 5;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 15 - Math.floor(level / 2); // Timer gets shorter as level increases
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      checkAnswer(true);
      clearInterval(timer);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function updateBestScore() {
  const levelBest = bestScores[level] || 0;
  bestScoreEl.textContent = levelBest;
}

function saveBestScore() {
  if (score > (bestScores[level] || 0)) {
    bestScores[level] = score;
    localStorage.setItem('bestScores', JSON.stringify(bestScores));
    updateBestScore();
  }
}

updateExpression();
