const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('score-value');

let shuffledQuestions, currentQuestionIndex, score, timerInterval;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startQuiz() {
  score = 0;
  scoreElement.innerText = score;
  document.getElementById('score').classList.remove('hide');
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  startTimer();
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearInterval(timerInterval);
  document.getElementById('timer').classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  nextButton.classList.add('hide');
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) {
    score++;
    scoreElement.innerText = score;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === "true");
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    showFinalResult();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function startTimer() {
  let timeLeft = 10;
  document.getElementById('timer').classList.remove('hide');
  timerElement.innerText = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  Array.from(answerButtonsElement.children).forEach(button => {
    button.disabled = true; // Disable buttons when time runs out
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    showFinalResult();
  }
}

function showFinalResult() {
  questionContainer.innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
  nextButton.classList.add('hide');
  startButton.innerText = 'Restart Quiz';
  startButton.classList.remove('hide');
}

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'Berlin', correct: false },
      { text: 'Paris', correct: true }
    ]
  },
  {
    question: 'Who is the CEO of Tesla?',
    answers: [
      { text: 'Elon Musk', correct: true },
      { text: 'Jeff Bezos', correct: false }
    ]
  },
  {
    question: 'What is the largest mammal?',
    answers: [
      { text: 'Elephant', correct: false },
      { text: 'Blue Whale', correct: true }
    ]
  },
  {
    question: 'What is the largest planet in our solar system?',
    answers: [
      { text: 'Earth', correct: false },
      { text: 'Jupiter', correct: true }
    ]
  },
  {
    question: 'What is the smallest planet in our solar system?',
    answers: [
      { text: 'Mercury', correct: true },
      { text: 'Mars', correct: false }
    ]
  },
  {
    question: 'What is the capital of India?',
    answers: [
      { text: 'Mumbai', correct: false },
      { text: 'New Delhi', correct: true }
    ]
  },
  {
    question: 'What is the capital of Australia?',
    answers: [
      { text: 'Sydney', correct: false },
      { text: 'Canberra', correct: true }
    ]
  }
];