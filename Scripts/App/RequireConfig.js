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
    drilldown: 'Lib/drilldown',
    moment: 'Lib/moment-2.11.2.min',
    datetimepicker: 'Lib/bootstrap-datepicker',
    Q: 'Lib/Q-1.4.1',
    YQL: 'App/YQL',
    CommentsScraper: 'App/CommentsScraper',
    CommentType: 'App/CommentType',
    PostsScraper: 'App/PostsScraper',
    PostType: 'App/PostType',
    StatsService: 'App/StatsService',
    CSVExporter: 'App/CSVExporter',
    LoadingTableUpdater: 'App/LoadingTableUpdater',
    TimeSeriesSmallPointsChart: 'App/TimeSeriesSmallPointsChart',
    TimeSeriesLargePointsChart: 'App/TimeSeriesLargePointsChart',
    TimeSeriesCumulativeChart: 'App/TimeSeriesCumulativeChart',
    ProportionsChart: 'App/ProportionsChart',
    TotalsChart: 'App/TotalsChart',
    Rounder: 'App/Rounder',
    ChartCreator: 'App/ChartCreator'
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    datetimepicker: {
      deps: ['jquery', 'bootstrap'],
      exports: '$.fn.datepicker'
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
