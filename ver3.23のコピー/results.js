document.addEventListener('DOMContentLoaded', () => {
    const resultsElement = document.getElementById('results');
    const restartButton = document.getElementById('restart-btn');

    // セッションストレージから結果を取得
    const results = JSON.parse(sessionStorage.getItem('quizResults')) || [];

    // 結果をテーブル形式で表示
    resultsElement.innerHTML = results.map((result) => {
        return `
            <tr>
                <td>${result.questionNumber}</td>
                <td>${result.selectedAnswer}</td>
                <td>${result.correctAnswer}</td>
                <td class="${result.isCorrect ? 'correct' : 'wrong'}">${result.isCorrect ? '正解' : '不正解'}</td>
                <td>${result.category}</td>
            </tr>
        `;
    }).join(''); // 改行で区切る

    // もう一度やり直すボタンのクリックイベント
    restartButton.addEventListener('click', () => {
        sessionStorage.removeItem('quizResults'); // 結果をクリア
        window.location.href = 'index.html'; // メインページに戻る
    });
});
