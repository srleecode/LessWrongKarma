require(['jquery', 'ChartCreator', 'LoadingTableUpdater', 'StatsService', 'CSVExporter', 'bootstrap', 'drilldown', 'datetimepicker'],
function($, chartCreator, loadingTableUpdater, statsService, CSVExporter) {
  $(function() {
    $(document).ready(function() {
      $('#getKarmaStatsBtn').on('click', function() {
        loadingTableUpdater.resetTable();
        $('#getKarmaStatsBtn').prop('disabled', true);
        $('#selectedUser').prop('disabled', true);
        $('#loading').removeClass('hidden');
        $('#userNotFound').addClass('hidden');
        $('#content').addClass('hidden');
        statsService.scrapeData($('#selectedUser').val()).then(function() {
          chartCreator.createCharts();
        });
      });
      $('#selectedUser').keydown(function(event) {
        if (event.keyCode === 13) {
          chartCreator.createCharts($('#selectedUser').val());
        }
      });
      $('#timeSeriesSmallPointsDownloadLink').on('click', function() {
        var $link = $('#timeSeriesSmallPointsDataLink');
        var csv = CSVExporter.getCommentAndDiscussionPointsCSV();
        $link.attr('href', 'data:Application/octet-stream,' + encodeURIComponent(csv))[0].click();
      });

      $('#timeSeriesSmallPointsDownloadLink').on('click', function() {
        var $link = $('#timeSeriesSmallPointsDataLink');
        var csv = CSVExporter.getCommentAndDiscussionPointsCSV();
        $link.attr('href', 'data:Application/octet-stream,' + encodeURIComponent(csv))[0].click();
      });

      $('#timeSeriesLargePointsDownloadLink').on('click', function() {
        var $link = $('#timeSeriesLargePointsDataLink');
        var csv = CSVExporter.getMainPointsCSV();
        $link.attr('href', 'data:Application/octet-stream,' + encodeURIComponent(csv))[0].click();
      });

      $('#timeSeriesCumulativeDownloadLink').on('click', function() {
        var $link = $('#timeSeriesCumulativeDataLink');
        var csv = CSVExporter.getCumulativeCSV();
        $link.attr('href', 'data:Application/octet-stream,' + encodeURIComponent(csv))[0].click();
      });
    });
  });
});
