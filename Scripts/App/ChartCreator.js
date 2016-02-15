/**
 * ChartCreator Module
 * @module ChartCreator
 */
define(['jquery', 'Q', 'CommentsScraper', 'PostsScraper', 'PostType',
  'TimeSeriesChart', 'ProportionsChart', 'TotalsChart', 'Rounder'],
function($, q, commentsScraper, postsScraper, postType, timeSeriesChart,
proportionsChart, totalsChart, rounder) {
  var that = {};
  function getStats(karmaArray) {
    var totals = {
      positiveTotalScore: 0,
      numPositive: 0,
      negativeTotalScore: 0,
      numNegative: 0,
      numNeutral: 0
    };
    karmaArray.forEach(function(karmaItem) {
      if (karmaItem.y > 0) {
        totals.positiveTotalScore += karmaItem.y;
        totals.numPositive++;
      } else if (karmaItem.y < 0) {
        totals.negativeTotalScore += karmaItem.y;
        totals.numNegative++;
      } else {
        totals.numNeutral++;
      }
    });
    totals.numPercentPositive = rounder.toAtMostDecimals(totals.numPositive / (totals.numPositive + totals.numNegative + totals.numNeutral) * 100, 2);
    totals.numPercentNeutral = rounder.toAtMostDecimals(totals.numNeutral / (totals.numPositive + totals.numNegative + totals.numNeutral) * 100, 2);
    totals.numPercentNegative = rounder.toAtMostDecimals(totals.numNegative / (totals.numPositive + totals.numNegative + totals.numNeutral) * 100, 2);
    totals.points = totals.positiveTotalScore + Math.abs(totals.negativeTotalScore);
    return totals;
  }
  /**
   * Creates a time series scatter chart, column proporitions chart and total pie chart for karma information from a given user
   * @param {String} user user to retrieve comment, discussion post and main post information to create the charts.
   * @memberOf module:ChartCreator
   */
  that.createCharts = function(user) {
    $('#getKarmaStatsBtn').prop('disabled', true);
    $('#selectedUser').prop('disabled', true);
    $('#loading').removeClass('hidden');
    $('#userNotFound').addClass('hidden');
    $('#content').addClass('hidden');
    q.all([commentsScraper.scrapeUserComments(user), postsScraper.scrapeUserPosts(user)])
    .then(function(data) {
      if (data[0].length === 0 && data[1].length === 0) {
        $('#loading').addClass('hidden');
        $('#userNotFound').removeClass('hidden');
      } else {
        var comments = data[0];
        var mainPosts = data[1].filter(function(post) {
          return post.type === postType.Main;
        });
        var discussionPosts = data[1].filter(function(post) {
          return post.type === postType.Discussion;
        });
        var commentStats = getStats(comments);
        var discussionPostStats = getStats(discussionPosts);
        var mainPostStats = getStats(mainPosts);
        var totalPositivePoints = commentStats.positiveTotalScore +
            discussionPostStats.positiveTotalScore + mainPostStats.positiveTotalScore;
        var totalNegativePoints = Math.abs(commentStats.negativeTotalScore) +
            Math.abs(discussionPostStats.negativeTotalScore) + Math.abs(mainPostStats.negativeTotalScore);
        var totalPoints = commentStats.points + discussionPostStats.points +
            mainPostStats.points;
        var totalStats = {
          percentPositive:
            rounder.toAtMostDecimals(totalPositivePoints / totalPoints * 100, 2),
          percentNegative:
            rounder.toAtMostDecimals(totalNegativePoints / totalPoints * 100, 2),
          commentPercentPositive:
            rounder.toAtMostDecimals(commentStats.positiveTotalScore / totalPositivePoints * 100, 2),
          discussionPostPercentPositive:
            rounder.toAtMostDecimals(discussionPostStats.positiveTotalScore / totalPositivePoints * 100, 2),
          mainPostPercentPositive:
            rounder.toAtMostDecimals(mainPostStats.positiveTotalScore / totalPositivePoints * 100, 2),
          commentPercentNegative:
            rounder.toAtMostDecimals(Math.abs(commentStats.negativeTotalScore) / totalPositivePoints * 100, 2),
          discussionPostPercentNegative:
            rounder.toAtMostDecimals(Math.abs(discussionPostStats.negativeTotalScore) / totalPositivePoints * 100, 2),
          mainPostPercentNegative:
            rounder.toAtMostDecimals(Math.abs(mainPostStats.negativeTotalScore) / totalPositivePoints * 100, 2),
          positiveScore: totalPositivePoints,
          negativeScore: commentStats.negativeTotalScore + discussionPostStats.negativeTotalScore + mainPostStats.negativeTotalScore
        };
        $('#loading').addClass('hidden');
        $('#content').removeClass('hidden');

        timeSeriesChart.addChart('timeSeriesChart', comments, discussionPosts, mainPosts);
        proportionsChart.addChart('proportionsChart', commentStats, discussionPostStats, mainPostStats);
        totalsChart.addChart('totalsChart', commentStats, discussionPostStats, mainPostStats, totalStats);
      }
      $('#getKarmaStatsBtn').prop('disabled', false);
      $('#selectedUser').prop('disabled', false);
    });
  };
  return that;
});
