var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',
  paths: {
        jquery: 'Scripts/Lib/jquery-1.12.0.min',
        highcharts: "Scripts/Lib/highcharts-4.2.1.min",
        moment: "Scripts/Lib/moment-2.11.2.min",
        Q: "Scripts/Lib/Q-1.4.1",
	CommentsScraper: "Scripts/App/CommentsScraper",
        CommentType: "Scripts/App/CommentType",
        PostsScraper: "Scripts/App/PostsScraper",
        PostType: "Scripts/App/PostType",
        YQL: "Scripts/App/YQL",
        LoadingTableUpdater: 'Scripts/App/LoadingTableUpdater',
        TimeSeriesSmallPointsChart: 'App/TimeSeriesSmallPointsChart',
        TimeSeriesLargePointsChart: 'App/TimeSeriesLargePointsChart',
        TimeSeriesCumulativeChart: 'App/TimeSeriesCumulativeChart',
        ProportionsChart: 'Scripts/App/ProportionsChart',
        TotalsChart: 'Scripts/App/TotalsChart',
        Rounder: 'Scripts/App/Rounder',
        ChartCreator: 'Scripts/App/ChartCreator'
    },
    shim : {
        bootstrap: {
            deps: ['jquery']
        },
        highcharts: {
            exports: 'Highcharts',
            deps: ['jquery']
        },
        drilldown: {
            deps: ['highcharts']
        },
        Q: {
            exports: 'Q',
            init: function(q) {
                window.Q = q;
            }
        }
      },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
