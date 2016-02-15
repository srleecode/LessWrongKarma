/**
 * TimeSeriesChart Module
 * @module TimeSeriesChart
 */
define(['jquery', 'highcharts'], function($, highcharts) {
  var that = {};
  var chart = null;
  that.getChart = function() {
    return chart;
  };
  /**
   * Adds a scatter chart showing comments, discussion posts and main posts across a time series
   * @param {Number} id id to render the chart to
   * @param {Array} commentsData chart points for the comments
   * @param {Array} discussionPostData chart points for the discussion posts
   * @param {Array} mainPostData chart points for the main posts
   * @return {TimeSeriesChart_L5.highcharts.Chart} scatter chart
   * @memberOf module:TimeSeriesChart
   */
  that.addChart = function(id, commentsData, discussionPostData, mainPostData) {
    chart = new highcharts.Chart({
      chart: {
        renderTo: id,
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: null,
        style: {
          display: 'none'
        }
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: [{
        title: {
          text: 'Main Posts  Score'
        },
        opposite: true
      }, {
        title: {
          text: 'Comments & Discussion Posts Score'
        }
      }],
      tooltip: {
        snap: 0,
        crosshairs: [true, true],
        backgroundColor: '#FCFFC5',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 3,
        headerFormat: '<b>{series.name} Score : {point.y}</b><br>',
        pointFormat: '{point.x:%a %d %b %I:%M:%S %p}'
      },
      plotOptions: {
        series: {
          turboThreshold: 0,
          stickyTracking: false,
          point: {
            events: {
              select: function() {
                var link = this.link;
                window.open(link, '_blank');
              }
            }
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        color: 'rgba(64,64,64, 0.5)',
        allowPointSelect: true,
        name: 'Comment',
        data: commentsData,
        yAxis: 1
      },
      {
        color: 'rgba(109,189,214, 0.5)',
        allowPointSelect: true,
        name: 'Discussion Post',
        data: discussionPostData,
        yAxis: 1
      },
      {
        color: 'rgba(183,20,39, 0.5)',
        allowPointSelect: true,
        name: 'Main Post',
        data: mainPostData,
        yAxis: 0
      }]
    });
    return chart;
  };
  return that;
});
