const ReadThemes = require('./model');
const View = require('./View');

class Controller {
  static async start() {
    await View.greetings();

    const themes = await ReadThemes.getThemes();

    const userData = await View.getUserInfo(themes);

    await View.greetUser(userData.userName);

    const questions = await ReadThemes.loadQuestions(userData.theme);

    let score = 0;
    for (const q of questions) {
      const userAnswer = await View.askQuestion(q);

      const isTrue = userAnswer === q.correct;

      if (isTrue) {
        score++;
      }
      View.showMiddleRes(isTrue, q);
    }

    View.showResult(score, questions.length);

    await model.saveResult(userData.userName, {
      score,
      total: questions.length,
      theme: userData.theme,
      date: new Date().toISOString(),
    });
  }
}

module.exports = Controller;
