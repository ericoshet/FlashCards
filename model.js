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
}
