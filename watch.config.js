var watch = require('./node_modules/@ionic/app-scripts/dist/watch');
var copy = require('./node_modules/@ionic/app-scripts/dist/copy');
var copyConfig = require('./copy.config');

module.exports = {
  srcFiles: {
    paths: ['{{SRC}}/**/*.(ts|html|scss)'],
    options: { ignored: ['{{SRC}}/**/*.spec.ts', '**/*.DS_Store'] },
    callback: watch.buildUpdate
  },
  copyConfig: copy.copyConfigToWatchConfig()
};
