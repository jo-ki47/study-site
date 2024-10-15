const questions = [
    {
        question: "臨床工学技士の主な業務は何ですか？",
        category: "業務",
        answers: [
            { text: "医療機器の操作", correct: true, explanation: "臨床工学技士は、医療機器を操作し、メンテナンスや管理を行う専門家です。" },
            { text: "診断", correct: false, explanation: "診断は医師が行う業務です。" },
            { text: "看護", correct: false, explanation: "看護は看護師の業務です。" },
            { text: "薬の処方", correct: false, explanation: "薬の処方は医師の業務です。" },
            { text: "手術", correct: false, explanation: "手術は外科医の業務です。" }
        ]
    },
    {
        question: "心電図検査で使用する装置は？",
        category: "機器",
        answers: [
            { text: "CTスキャナー", correct: false, explanation: "CTスキャナーは画像診断に使用されます。" },
            { text: "心電計", correct: true, explanation: "心電計は、心電図を測定するために使用される機器です。" },
            { text: "MRI", correct: false, explanation: "MRIは主に脳や筋肉の診断に使用されます。" },
            { text: "超音波診断装置", correct: false, explanation: "超音波診断装置は体の内部を画像化するために使用されます。" },
            { text: "内視鏡", correct: false, explanation: "内視鏡は体内を直接観察するための装置です。" }
        ]
    }
];

let currentQuestionIndex = 0;
let results = []; // 結果を保存する配列

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultsButton = document.getElementById('results-btn');
const explanationElement = document.getElementById('explanation');
const resultMessageElement = document.getElementById('result-message'); // 正解/不正解メッセージの要素を取得

function startGame() {
    currentQuestionIndex = 0;
    nextButton.classList.add('hide');
    resultsButton.classList.add('hide'); // 初期状態では隠す
    explanationElement.innerText = '';
    resultMessageElement.innerText = ''; // メッセージを初期化
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = `${index + 1}: ${answer.text}`;  // 番号を追加
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    const selectedAnswerText = selectedButton.innerText; // 選択された回答のテキストを取得
    const correctAnswerIndex = questions[currentQuestionIndex].answers.findIndex(answer => answer.correct); // 正解のインデックスを取得
    const correctAnswerText = questions[currentQuestionIndex].answers[correctAnswerIndex].text; // 正解のテキストを取得

    // 結果を保存
    results.push({
        questionNumber: currentQuestionIndex + 1,
        selectedAnswer: selectedAnswerText,
        correctAnswer: correctAnswerText,
        isCorrect: correct,
        category: questions[currentQuestionIndex].category // 出題分野を保存
    });

    setStatusClass(selectedButton, correct);
    
    // 全てのボタンに解説を表示
    Array.from(answerButtonsElement.children).forEach((button, index) => {
        const isCorrect = button.dataset.correct === "true";
        setStatusClass(button, isCorrect);
        button.disabled = true;  // 選択後に他の選択肢を選べないようにする
        
        // 解説を表示
        explanationElement.innerHTML += `<strong>${index + 1}:</strong> ${questions[currentQuestionIndex].answers[index].explanation}<br>`;
    });
    
    explanationElement.innerHTML += `<strong>正解は: ${correctAnswerIndex + 1} 番です。</strong>`; // 正解の番号を表示

    // 正解・不正解メッセージの表示
    resultMessageElement.innerText = correct ? '正解' : '不正解'; // メッセージを設定
    resultMessageElement.className = correct ? 'correct' : 'wrong'; // CSSクラスを設定

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        resultsButton.classList.remove('hide'); // 最後の問題の後に結果ボタンを表示
        nextButton.innerText = 'もう一度やり直す';
        nextButton.classList.remove('hide');
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

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    explanationElement.innerText = '';
    resultMessageElement.innerText = ''; // メッセージを初期化
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hide');
    } else {
        showResults();
    }
});

resultsButton.addEventListener('click', () => {
    sessionStorage.setItem('quizResults', JSON.stringify(results)); // 結果をセッションストレージに保存
    window.location.href = 'results.html'; // 結果ページに移動
});

startGame();
