let level = 1;
let currentExpression = '';
const levelSpan = document.getElementById("level");
const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");

function generateExpression(level) {
  const ops = ['+', '-'];
  let parts = [];
  let count = 3 + level; // More terms per level

  for (let i = 0; i < count; i++) {
    let num = generateNumber(level);
    const op = ops[Math.floor(Math.random() * ops.length)];
    parts.push(num);
    parts.push(op);
  }

  // Final number
  let lastNum = generateNumber(level);
  parts.push(lastNum);

  return parts.join(' ');
}

function generateNumber(level) {
  let max;
  if (level <= 3) {
    max = 50;
  } else if (level <= 6) {
    max = 300;
  } else if (level <= 9) {
    max = 999;
  } else {
    max = 9999; // Level 10: 4-digit numbers
  }

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
}

function checkAnswer() {
  const userAnswer = Number(document.getElementById("answer").value);
  const correct = eval(currentExpression);
  resultEl.textContent = userAnswer === correct ? "Correct!" : `Wrong. Correct answer is ${correct}`;
}

function changeLevel(change) {
  level = Math.max(1, Math.min(10, level + change));
  updateExpression();
}

updateExpression();
