require(['jquery', 'ChartCreator', 'bootstrap', 'drilldown'], function($, chartCreator) {
  $(function() {
    $(document).ready(function() {
      $('#getKarmaStatsBtn').on('click', function() {
        chartCreator.createCharts($('#selectedUser').val());
      });
    });
  });
});
