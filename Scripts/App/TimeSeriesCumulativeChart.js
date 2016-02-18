/**
 * TimeSeriesCumulativeChart Module
 * @module TimeSeriesCumulativeChart
 */
define(['jquery', 'highcharts'], function($, highcharts) {
  var that = {};
  var chart = null;
  that.getChart = function() {
    return chart;
  };
  /**
   * Adds a line chart showing total score overtime
   * @param {Number} id id to render the chart to
   * @param {Array} mainData chart points for the main posts
   * @return {TimeSeriesChart_L5.highcharts.Chart} scatter chart
   * @memberOf module:TimeSeriesCumulativeChart
   */
  that.addChart = function(id, data) {
    chart = new highcharts.Chart({
      chart: {
        renderTo: id,
        zoomType: 'x',
        type: 'area'
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
      yAxis: {
        title: {
          text: 'Total Score'
        }
      },
      tooltip: {
        snap: 0,
        crosshairs: [true, true],
        backgroundColor: '#FCFFC5',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 3,
        headerFormat: '<b>Total Score : {point.y}</b><br>',
        pointFormat: '{point.title}<br>{point.x:%a %d %b %Y %I:%M:%S %p}<br>{point.type} Score:{point.score}<br>{point.blurb}'
      },
      plotOptions: {
        series: {
          turboThreshold: 0,
          stickyTracking: false,
          marker: {
            enabled: true
          },
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
        allowPointSelect: true,
        name: 'Score',
        data: data
      }]
    });
    return chart;
  };
  return that;
});
