/**
 * CSVExporter Module
 * @module CSVExporter
 */
define(['StatsService', 'moment'],
function(statsService, moment) {
  var that = {};

  that.getCommentAndDiscussionPointsCSV = function() {
    var csv = '';
    csv += 'Type, Date Posted, Score, Title, Blurb, Link\n';
    statsService.getComments().sort(function(a, b) {
      return a.x - b.x;
    }).forEach(function(comment) {
      csv += 'Comment,"' + moment.utc(comment.x).format('DD MMMM YYYY hh:mm:ssA') +
              '","' + comment.y + '","' + comment.title.replace(/(\r\n|\n|\r|,)/gm,'') + '","' + comment.blurb.replace(/(\r\n|\n|\r|,)/gm,'') + '","' +
              comment.link + '"\n';
    });
    statsService.getDiscussionPosts().sort(function(a, b) {
      return a.x - b.x;
    }).forEach(function(discussionPost) {
      csv += 'Discussion Post,"' + moment.utc(discussionPost.x).format('DD MMMM YYYY hh:mm:ssA') +
            '","' + discussionPost.y + '","' + discussionPost.title.replace(/(\r\n|\n|\r|,)/gm,'') + '","","' +
            discussionPost.link + '"\n';
    });
    return csv;
  };

  that.getMainPointsCSV = function() {
    var csv = '';
    csv += 'Date Posted, Score, Title, Link\n';
    statsService.getMainPosts().sort(function(a, b) {
      return a.x - b.x;
    }).forEach(function(discussionPost) {
      csv += '"' + moment.utc(discussionPost.x).format('DD MMMM YYYY hh:mm:ssA') +
              '","' + discussionPost.y + '","' + discussionPost.title.replace(/(\r\n|\n|\r|,)/gm,'') + '","' +
              discussionPost.link + '"\n';
    });
    return csv;
  };
  that.getCumulativeCSV = function() {
    var csv = '';
    var blurb = '';
    csv += 'Type, Date Posted, Total Score, Score, Title, Blurb, Link\n';
    statsService.getCumulativeStats().forEach(function(point) {
      blurb = point.blurb || '';
      csv += '"' + point.type + '",' + moment.utc(point.x).format('DD MMMM YYYY hh:mm:ssA') +
              '",' + point.y + ',' + point.score + ',"' + point.title.replace(/(\r\n|\n|\r|,)/gm,'') + '","' + blurb.replace(/(\r\n|\n|\r|,)/gm,'') + '","' +
              point.link + '"\n';
    });
    return csv;
  };
  return that;
});
