require.config({
  baseUrl: 'Scripts',
  config: {
    moment: {
      noGlobal: true
    }
  },
  paths: {
    jquery: 'Lib/jquery-1.12.0.min',
    bootstrap: 'Lib/bootstrap-3.3.6.min',
    highcharts: 'Lib/highcharts-4.2.1.min',
    drilldown: 'lib/drilldown',
    moment: 'Lib/moment-2.11.2.min',
    Q: 'Lib/Q-1.4.1',
    YQL: 'App/YQL',
    CommentsScraper: 'App/CommentsScraper',
    CommentType: 'App/CommentType',
    PostsScraper: 'App/PostsScraper',
    PostType: 'App/PostType',
    TimeSeriesChart: 'App/TimeSeriesChart',
    ProportionsChart: 'App/ProportionsChart',
    TotalsChart: 'App/TotalsChart',
    Rounder: 'App/Rounder',
    ChartCreator: 'App/ChartCreator'
  },
  shim: {
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
  }
});

// Load the main app module to start the app
requirejs(['App/Main', 'moment']);
