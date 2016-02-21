/**
 * TimeSeriesCumulativeChart Module
 * @module TimeSeriesCumulativeChart
 */
define(['jquery', 'highcharts', 'moment', 'StatsService'], function($, highcharts, moment, statsService) {
  var that = {};
  var chart = null;
  that.getChart = function() {
    return chart;
  };

  function getDateFilteredCummulativeStats(startDate, endDate) {
    var totalScore = 0;
    var stats = statsService.getCumulativeStats().filter(function(stat) {
      return stat.x >= startDate && stat.x <= endDate;
    });
    stats.sort(function(a, b) {
      return a.x - b.x;
    });
    stats.forEach(function(point) {
      totalScore += point.score;
      point.y = totalScore;
    });
    return stats;
  }
  /**
   * Adds a line chart showing total score overtime
   * @param {Number} id id to render the chart to
   * @param {Array} data chart points for the main posts
   * @return {TimeSeriesChart_L5.highcharts.Chart} scatter chart
   * @memberOf module:TimeSeriesCumulativeChart
   */
  that.addChart = function(id, data) {
    var firstDate = moment.utc(data[0].x).toDate();
    var lastDate = moment.utc(data[data.length - 1].x).toDate();
    var startLimit = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate(), 0, 0, 0, 0);
    var endLimit = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate(), 0, 0, 0, 0);
    var startDate = $('#startDate').datepicker({
      onRender: function(date) {
        return date.valueOf() < startLimit.valueOf() || date.valueOf() > endLimit.valueOf() ? 'disabled' : '';
      }
    }).on('changeDate', function() {
      startDate.hide();
      chart.series[0].update({
        data: getDateFilteredCummulativeStats(startDate.date, endDate.date)
      }, true);
    }).data('datepicker');
    var endDate = $('#endDate').datepicker({
      onRender: function(date) {
        return date.valueOf() < startDate.date.valueOf() || date.valueOf() > endLimit.valueOf() ? 'disabled' : '';
      }
    }).on('changeDate', function() {
      endDate.hide();
      chart.series[0].update({
        data: getDateFilteredCummulativeStats(startDate.date, endDate.date)
      }, true);
    }).data('datepicker');
    startDate.setValue(firstDate);
    endDate.setValue(lastDate);
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
