const fsp = require('fs').promises;
const path = require('path');

class ReadThemes {
  static async getThemes() {
    const files = await fsp.readdir('./themes');
    return files.map((file) => ({
      name: path.basename(file, '.json'),
      value: file,
    }));
  }

  static async loadQuestions(themeFile) {
    const content = await fsp.readFile(`./themes/${themeFile}`, 'utf-8');
    return JSON.parse(content);
  }

  static async saveResult(userName, result) {
    const filePath = `./statistics/${userName}-${Date.now()}.json`;
    await fsp.writeFile(filePath, JSON.stringify(result, null, 2));
  }
}

module.exports = ReadThemes;