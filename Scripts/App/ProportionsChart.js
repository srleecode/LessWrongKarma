/**
 * ProportionsChart Module
 * @module ProportionsChart
 */
define(['jquery', 'highcharts'], function($, highcharts) {
  var that = {};
  var chart = null;

  that.getChart = function() {
    return chart;
  };
  /**
   * Adds a column chart showing total negative and positive karma points
   * @param {type} id id to render the chart to
   * @param {type} commentsStats statistics for the comments, e.g. total points
   * @param {type} discussionPostStats statistics for the discussion posts, e.g. total points
   * @param {type} mainPostStats statisticsfor the main posts, e.g. total points
   * @return {ProportionsChart_L5.highcharts.Chart} column chart
   * @memberOf module:ProportionsChart
   */
  that.addChart = function(id, commentsStats, discussionPostStats, mainPostStats) {
    chart = new highcharts.Chart({
      chart: {
        renderTo: id,
        type: 'column',
        plotBorderWidth: 2
      },
      title: {
        text: null,
        style: {
          display: 'none'
        }
      },
      xAxis: {
        categories: ['Comments', 'Discussion Posts', 'Main Posts']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Score'
        }
      },
      tooltip: {
        snap: 0,
        shared: true,
        backgroundColor: '#FCFFC5',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 3,
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.num} which is <b>{point.y}%</b> of total<br/>'
      },
      plotOptions: {
        column: {
          stacking: 'percent'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Positive',
        color: 'rgb(34, 139, 34)',
        data: [
          {
            y: commentsStats.numPercentPositive,
            num: commentsStats.numPositive,
            name: 'Comments'
          },
          {
            y: discussionPostStats.numPercentPositive,
            num: discussionPostStats.numPositive,
            name: 'Discussion Posts'
          },
          {
            y: mainPostStats.numPercentPositive,
            num: mainPostStats.numPositive,
            name: 'Main Posts'
          }]
      }, {
        name: 'Neutral',
        color: 'rgb(128, 128, 128)',
        data: [
          {
            y: commentsStats.numPercentNeutral,
            num: commentsStats.numNeutral,
            name: 'Comments'
          },
          {
            y: discussionPostStats.numPercentNeutral,
            num: discussionPostStats.numNeutral,
            name: 'Discussion Posts'
          },
          {
            y: mainPostStats.numPercentNeutral,
            num: mainPostStats.numNeutral,
            name: 'Main Posts'
          }]
      }, {
        name: 'Negative',
        color: 'rgb(178, 34, 34)',
        data: [
          {
            y: commentsStats.numPercentNegative,
            num: commentsStats.numNegative,
            name: 'Comments'
          },
          {
            y: discussionPostStats.numPercentNegative,
            num: discussionPostStats.numNegative,
            name: 'Discussion Posts'
          },
          {
            y: mainPostStats.numPercentNegative,
            num: mainPostStats.numNegative,
            name: 'Main Posts'
          }]
      }]
    });
    return chart;
  };
  return that;
});
