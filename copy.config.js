module.exports = {
  include: [
    {
      src: '{{SRC}}/assets/',
      dest: '{{WWW}}/assets/'
    },
    {
      src: '{{SRC}}/index.html',
      dest: '{{WWW}}/index.html'
    },
    {
      src: '{{SRC}}/etc/hack/polyfills/polyfills.js',
      dest: '{{BUILD}}/polyfills.js'
    }
  ]
};