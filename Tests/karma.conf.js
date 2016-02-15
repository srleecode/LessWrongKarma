// Karma configuration
// Generated on Sat Feb 06 2016 00:24:24 GMT+1100 (AUS Eastern Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'jasmine', 'requirejs' ],


    // list of files / patterns to load in the browser
    files: [
      'Tests/test-main.js',
      {pattern: 'Scripts/Lib/**/jquery-1.12.0.min.js', included: true},
      'Tests/node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      {pattern: 'Scripts/Lib/**/*.js', included: false},
      {pattern: 'Tests/Fixtures/**/*.html', included: false},
      {pattern: 'Tests/Fixtures/**/*.json', watched: true, served:  true, included: false},
      {pattern: 'Tests/Spec/*.js', included: false},
      {pattern: 'Scripts/App/**/*.js', included: false}
      
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'kjhtml'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
