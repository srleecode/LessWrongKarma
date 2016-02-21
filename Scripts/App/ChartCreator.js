/**
 * ChartCreator Module
 * @module ChartCreator
 */
define(['jquery', 'Q', 'StatsService',
  'TimeSeriesSmallPointsChart', 'TimeSeriesLargePointsChart', 'ProportionsChart',
  'TotalsChart', 'TimeSeriesCumulativeChart'],
function($, q, statsService, timeSeriesSmallPointsChart, timeSeriesLargePointsChart,
    proportionsChart, totalsChart, timeSeriesCumulativeChart) {
  var that = {};

  /**
   * Creates a time series scatter chart, column proporitions chart and total pie chart for karma information from a given user
   * @memberOf module:ChartCreator
   */
  that.createCharts = function() {
    if (statsService.getComments().length > 0 || statsService.getDiscussionPosts().length > 0 || statsService.getMainPosts().length > 0) {
      $('#loading').addClass('hidden');
      $('#content').removeClass('hidden');
      timeSeriesSmallPointsChart.addChart('timeSeriesSmallPointsChart',
          statsService.getComments(), statsService.getDiscussionPosts());
      timeSeriesLargePointsChart.addChart('timeSeriesLargePointsChart',
          statsService.getMainPosts());
      proportionsChart.addChart('proportionsChart',
          statsService.getCommentStats(), statsService.getDiscussionPostStats(), statsService.getMainPostStats());
      totalsChart.addChart('totalsChart',
          statsService.getCommentStats(), statsService.getDiscussionPostStats(),
          statsService.getMainPostStats(), statsService.getTotalStats());
      timeSeriesCumulativeChart.addChart('timeSeriesCumulativeChart', statsService.getCumulativeStats());
    } else {
      $('#loading').addClass('hidden');
      $('#userNotFound').removeClass('hidden');
    }
    $('#getKarmaStatsBtn').prop('disabled', false);
    $('#selectedUser').prop('disabled', false);
  };

  return that;
});
