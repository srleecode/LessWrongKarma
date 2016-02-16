/**
 * TimeSeriesChart Module
 * @module TimeSeriesLargePointsChart
 */
define(['jquery', 'highcharts'], function($, highcharts) {
  var that = {};
  var chart = null;
  that.getChart = function() {
    return chart;
  };
  /**
   * Adds a scatter chart showing main posts across a time series
   * @param {Number} id id to render the chart to
   * @param {Array} mainData chart points for the main posts
   * @return {TimeSeriesChart_L5.highcharts.Chart} scatter chart
   * @memberOf module:TimeSeriesLargePointsChart
   */
  that.addChart = function(id, mainData) {
    chart = new highcharts.Chart({
      chart: {
        renderTo: id,
        type: 'scatter',
        zoomType: 'xy',
        plotBorderWidth: 2
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
          text: 'Main Posts Score'
        }
      },
      tooltip: {
        snap: 0,
        crosshairs: [true, true],
        backgroundColor: '#FCFFC5',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 3,
        headerFormat: '<b>{series.name} Score : {point.y}</b><br>',
        pointFormat: '{point.title}<br>{point.x:%a %d %b %I:%M:%S %p}'
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
        allowPointSelect: true,
        name: 'Main',
        color: 'rgba(183,20,39, 0.5)',
        data: mainData
      }]
    });
    return chart;
  };
  return that;
});
