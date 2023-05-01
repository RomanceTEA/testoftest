const name = localStorage.getItem('name');
const email = localStorage.getItem('email');

const questions = [
  {
    question: "Питання 1",
    answer: ["Варіант 1" , "Варіант 2", "Варіант 3", "Варіант 4"],
    correct: 1,
  },
  {
    question: "Питання 2",
    answer: ["Варіант 1" , "Варіант 2", "Варіант 3", "Варіант 4"],
    correct: 2,
  },
  {
    question: "Питання 3",
    answer: ["Варіант 1" , "Варіант 2", "Варіант 3", "Варіант 4"],
    correct: 3,
  },
  {
    question: "Питання 4",
    answer: ["Варіант 1" , "Варіант 2", "Варіант 3", "Варіант 4"],
    correct: 4,
  },
  {
    question: "Питання 5",
    answer: ["Варіант 1" , "Варіант 2", "Варіант 3", "Варіант 4"],
    correct: [1, 4],
  },
  {
    question: "Питання 6",
    answer: ["Варіант 1" , "Варіант 2", "Варіант 3", "Варіант 4"],
    correct: [2, 3],
  },
  {
    question: "Питання 7",
    answer: ["Варіант 1" , "Варіант 2", "Варіант 3", "Варіант 4"],
    correct: [2, 3, 4],
  },
  {
    question: "Питання 8",
    answer: ["Варіант 1" , "Варіант 2", "Варіант 3", "Варіант 4"],
    correct: [1, 2],
  },
  {
    question: ["Питання 8", "Питання 8"],
    answer: ["Варіант 1" , "Варіант 2", "Варіант 3", "Варіант 4"],
    compliance: {
      "Питання 8" : "Варіант 2",
      "sfsdfsdfsdf": "Варіант 3",
      "dsfdsfsddsfds": "Варіант 1",
      "edfdsfdsfds": "Варіант 4"
    },
  },
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

// clearPage();
checkbox();

function checkbox(){
  if (questions[questionIndex].correct.length > 1) {
    showQuestion2();
  } else if (questions[questionIndex].correct.length = 1){
    showQuestion1();
  } else if (questions[questionIndex].question.length > 1) {
    showQuestion3();
  }
}

function clearPage(){
  headerContainer.innerHTML = '';
  listContainer.innerHTML = '';
}

function showQuestion1(){
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])

  headerContainer.innerHTML = title;

  let answerNumber = 1;
  let answerText;

  for (answerText of questions[questionIndex]['answer']) {
    const questionTemplate = 
    `<li>
        <label>
              <input value="%number%" type="radio" class="answer" name="answer" />
              <span>%answer%</span>
        </label>
  </li>`;

  let answerHTML = questionTemplate.replace('%answer%',answerText);
  answerHTML = answerHTML.replace('%number%', answerNumber);

  listContainer.innerHTML += answerHTML;
  answerNumber++;
  submitBtn.onclick = checkRadioAnswer;
  }
}

function showQuestion2(){
  const headerTemplate2 = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate2.replace('%title%', questions[questionIndex]['question'])

  let answerNumber = 1;
  let answerText;

  headerContainer.innerHTML = title;

  for (answerText of questions[questionIndex]['answer']) {
    const questionTemplate2 = 
    `<li>
    <label>
      <input value="%number%" type="checkbox" class="answer" name="answer" />
      <span>%answer%</span>
    </label>
  </li>`;

  let answerHTML = questionTemplate2.replace('%answer%',answerText);
  answerHTML = answerHTML.replace('%number%', answerNumber);

  listContainer.innerHTML += answerHTML;
  answerNumber++;
  submitBtn.onclick = checkBoxAnswer;
  }
}

function showQuestion3(){

  let answerNumber = 1;
  let questionNumber = 1;
  let answerText;
  let questionText;

  for (questionText of questions[questionIndex]['question']) {
    const questionTemplate3 = 
    `<li><h3 class="title" value="%number%">%question%</h3>
    <select name="answer1">
    <option value="%number%">А</option>
    <option value="%number%">Б</option>
    <option value="%number%">В</option>
    <option value="%number%">Г</option>
    </select>
  </li>`;

  for (answerText of questions[questionIndex]['answer']) {
    const questionTemplate4 = 
    `<li><h3 class="title" value="%number%>%question%</h3>
    <select name="answer1">
    <option value="%number%">%answer%</option>
    <option value="%number%">%answer%</option>
    <option value="%number%">%answer%</option>
    <option value="%number%">%answer%</option>
    </select>
  </li>`;

  let questionHTML = questionTemplate3.replace('%question%',questionText);
  questionHTML = questionHTML.replace('%number%', questionNumber);  

  let answerHTML = questionTemplate4.replace('%answer%',answerText);
  answerHTML = answerHTML.replace('%number%', answerNumber);


  listContainer.innerHTML += questionHTML;
  listContainer.innerHTML += answerHTML;
  answerNumber++;
  questionNumber++;
  submitBtn.onclick = checkBoxAnswer;
  }
}

}
function checklong(){
  if (questionIndex !== questions.length - 1){
    questionIndex++;
    clearPage();
    checkbox();
    return
  } else {
    clearPage();
    showResults();
  }
}

function checkBoxAnswer() {
  const checkboxes = listContainer.querySelectorAll('input[type="checkbox"]:checked');
  let isCorrect = true;

  if (!checkboxes) {
    submitBtn.blur();
      return
  }

  checkboxes.forEach((checkbox) => {
    const userAnswer = parseInt(checkbox.value);
    if (!questions[questionIndex]['correct'].includes(userAnswer)) {
      isCorrect = false;
    }
  });

  if (isCorrect && checkboxes.length === questions[questionIndex]['correct'].length) {
    score++;
  }
  
  checklong();
}


function checkRadioAnswer(){
  const checkRadio = listContainer.querySelector('input[type="radio"]:checked');
  const userAnswer = parseInt(checkRadio.value);
 
  if (!checkRadio) {
    submitBtn.blur();
      return
  }

  if (userAnswer === questions[questionIndex]['correct']) {
    score++;
  }
    console.log(score);
    checklong();
  }

function showResults(){
  const resultsTemplate = 
  `<h2 class="title">%title%</h2>
  <h3 class="summary">%message%</h3>
  <p class="result">%result%</p>`;

  let title , message;

  if (score === questions.length){
    title = 'Вітаємо!';
    message = 'Ви відповіли на всі питання правильно';
  } else if ((score * 100) / questions.length >= 50){
    title = 'Непоганий результат';
    message = 'Ви дали більш ніж половину правильних відповідей';
  } else {
    title = 'Поганий результат';
    message = 'Ви дали меньш ніж половину правильних відповідей';
  }

  let result = `${score} / ${questions.length}`;

  let finalMessage = resultsTemplate.replace('%title%', title);
  finalMessage = finalMessage.replace('%message%', message);
  finalMessage = finalMessage.replace('%result%', result);

  headerContainer.innerHTML = finalMessage;

  submitBtn.blur();
  submitBtn.innerText = 'Відправити результат вчителю';
  submitBtn.onclick = function sendMail() {
    
    emailjs.send("21312312312", "template_efgjwme", {
      name: name,
      score: score,
    })
    emailjs.send("21312312312", "template_1aityip", {
      email: email,
      score: score,
    })
    .then(function(response) {
      alert("Лист успішно відправленно", response.status, response.text);
    }, function(error) {
      alert("Помилка", error);
    });
  }
}
