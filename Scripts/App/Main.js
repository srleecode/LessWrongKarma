require(['jquery', 'ChartCreator', 'bootstrap', 'drilldown'], function($, chartCreator) {
  $(function() {
    $(document).ready(function() {
      $('#getKarmaStatsBtn').on('click', function() {
        chartCreator.createCharts($('#selectedUser').val());
      });
      $('#selectedUser').keydown(function(event) {
        if (event.keyCode === 13) {
          chartCreator.createCharts($('#selectedUser').val());
        }
      });
    });
  });
});
