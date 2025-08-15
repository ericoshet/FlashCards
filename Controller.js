const ReadThemes = require("./model");
const GameView = require("./GameView");

class Controller {
  static async startGame() {
    GameView.greetings();

    const themes = await GameModel.getThemes();

    const userData = await GameView.getUserInfo(themes);

    GameView.greetUser(userData.userName);

    const questions = await GameModel.loadQuestions(userData.theme);

    let score = 0;
    for (const q of questions) {
      const userAnswer = await GameView.askQuestion(q);

      const isTrue = userAnswer === q.correct;

      if (isTrue) {
        score++;
      }
      GameView.showMiddleRes(isTrue, q);
    }

    GameView.showResult(score, questions.length);

    await GameModel.saveResult(userData.userName, {
      score,
      total: questions.length,
      theme: userData.theme,
      date: new Date().toISOString(),
    });
  }
}

module.exports = Controller;