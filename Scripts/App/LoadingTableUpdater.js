/**
 * LoadingTableUpdater Module
 * @module LoadingTableUpdater
 */
define('LoadingTableUpdater', ['jquery', 'moment'], function($, moment) {
  var that = {};
  that.resetTable = function() {
      resetRow('commentRow');
      resetRow('postRow');
  };
  function resetRow (id) {
    var commentRowElement = $('#' + id);
    $('#lastScraped', commentRowElement).text('N/A');
    $('#currScore', commentRowElement).text(0);
    $('#numScraped', commentRowElement).text(0);
      
    $('#' + id).removeClass('success').addClass('active');
    $('#' + id + ' i').removeClass('fa-check').addClass('fa-cog').addClass('fa-spin');
  }
  that.updateTable = function(id, comments) {
    var totalCommentScore = 0;
    var lastDate = '';
    var commentRowElement = $('#' + id);
    var currScoreElement = $('#currScore', commentRowElement);
    var currScore = parseInt(currScoreElement.text(), 10);
    var numScrapedElement = $('#numScraped', commentRowElement);
    var currNumScraped = parseInt(numScrapedElement.text(), 10);

    if (comments.length > 0) {
      lastDate = comments[comments.length - 1].x;
      comments.forEach(function(comment) {
        totalCommentScore += comment.y;
      });
      $('#lastScraped', commentRowElement).text(moment.utc(lastDate).format('DD MMMM YYYY hh:mm:ssA'));
      currScoreElement.text(currScore + totalCommentScore);
      numScrapedElement.text(currNumScraped + comments.length);
    }
  };
  that.updateTableToCompleted = function(id) {
    $('#' + id).removeClass('active').addClass('success');
    $('#' + id + ' i').removeClass('fa-spin').removeClass('fa-cog').addClass('fa-check');
  };
  return that;
});
