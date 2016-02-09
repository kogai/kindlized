module.exports = (config)=> {
  config.set({
    basePath: './',
    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/*.js',
      'test/**/*.js',
    ],
    preprocessors: {
      ['test/*']: ['browserify'],
      ['test/**/*']: ['browserify'],
    },
    browserify: {
      debug: !process.env.CI,
      transform: ['babelify'],
    },
    singleRun: process.env.CI,
    frameworks: ['mocha', 'browserify'],
    autoWatch: !process.env.CI,
    reporters: ['mocha'],
    browsers: process.env.CI ? ['PhantomJS', 'Chrome', 'Firefox'] : ['PhantomJS'],
    plugins: [
      require('karma-browserify'),
      require('karma-mocha'),
      require('karma-coverage'),
      require('karma-firefox-launcher'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter'),
      require('karma-mocha-reporter'),
      require('karma-sinon'),
    ],
  });
};
