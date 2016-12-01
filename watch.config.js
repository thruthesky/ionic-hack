var watch = require('./node_modules/@ionic/app-scripts/dist/watch');
var copy = require('./node_modules/@ionic/app-scripts/dist/copy');
var copyConfig = require('./copy.config');
module.exports = {
  watchers: [
    {
      paths: [
        '{{SRC}}/**/*.(ts|html|scss)'
      ],
      options: { ignored: ['{{SRC}}/**/*.spec.ts', '**/*.DS_Store'] },
      callback: watch.buildUpdate
    },
    {
      paths: copyConfig.include.map(f => f.src),
      options: { ignored: '**/*.DS_Store' },
      callback: copy.copyUpdate
    }
  ]
};