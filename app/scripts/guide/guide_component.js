var fs = require('fs');

module.exports = {
  template: fs.readFileSync(__dirname + '/guide.html', 'utf8'),
  controller: 'guideCtrl',
};
