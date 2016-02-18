/**
 * CommentScraper Module
 * @module CommentScraper
 */
define(['jquery', 'YQL', 'CommentType', 'Q', 'moment', 'LoadingTableUpdater'], function($, yql, CommentType, q, moment, loadingTableUpdater) {
  var that = {};
  var commentsKarma = [];
  var commentsTableRowId = 'commentRow';
  /**
   * Parses and retrieves information from a comment div html string
   * @param  {String} commentHtml - div from lesswrong submitted comments page which contains comment information
   * @return {Object} commentObj - contains comment: score, date, link, author, id and {@link CommentType}
   * @memberOf module:CommentScraper
   */
  that.getCommentObj = function(commentHtml) {
    // remove image tags so that they don't try to loaded when parsing
    var filteredCommentHtml = commentHtml.replace(/<img[^>]*>/g, '');
    var domSelector = $(filteredCommentHtml);
    var commentNode = domSelector[0];
    var id = commentNode.id.replace('thingrow_', '');
    var authorNodes = $('#author_' + id, commentNode);
    var author = authorNodes.last().text();
    var score = parseInt($('#score_' + id, commentNode).first().text(), 10);
    var link = $('#permalink_' + id, commentNode).first().attr('href');
    var title = $('a.title', commentNode).first().text();
    var blurb = $('.md', commentNode).first().text();
    // lines up the blurb length somewhat with the title or at least the date if it's longer than the title.
    if (title.length >= 26) {
      blurb = blurb.substring(0, title.length - 4) + ' ...';
    } else {
      blurb = blurb.substring(0, 26) + ' ...';
    }
    var date = $('.comment-date', commentNode).first().text().replace('*', '').trim();
    var type = '';
    // finds out if the comment is being replied to by the user, i.e. a parent comment, or not (a leaf)
    if (domSelector.find('.comment').length === 0) {
      type = CommentType.Leaf;
    } else {
      type = CommentType.Parent;
    }

    return {
      y: score,
      x: moment.utc(date, 'DD MMMM YYYY hh:mm:ssA').valueOf(),
      link: link,
      title: title,
      blurb: blurb,
      author: author,
      id: id,
      commentType: type
    };
  };
  /**
   * Recursive function that retrieves information on all of a given users comments starting after an optional comment id
   * Each call processes a page with at most ten of the users comments
   * @param {String} user - the user whose comments will be processed
   * @param {String} [lastCommentId] - gets a page of comments after this comment id. If lastCommendId is not provided, the array that is retruned is reset to be empty. If it is provided, it is added to
   * @return {Array} commentsKarma - information extracted from all of the processed comments
   * @memberOf module:CommentScraper
   */
  that.scrapeUserComments = function(user, lastCommentId) {
    var url = 'http://lesswrong.com/user/' + encodeURIComponent(user) + '/comments/';
    if (lastCommentId) {
      url += '?count=' + commentsKarma.length + '&after=' + lastCommentId;
    } else {
      commentsKarma = [];
    }
    return yql.getComments(url)
      .then(function(data) {
        if (data.results && data.results.length > 0) {
          return q.all(data.results.map(function(commentHtml) {
            return that.getCommentObj(commentHtml);
          })).then(function(results) {
            var filteredResults = results.filter(function(result) {
              return result.author === user && result.commentType === CommentType.Leaf;
            });
            commentsKarma = commentsKarma.concat(filteredResults);
            loadingTableUpdater.updateTable(commentsTableRowId, filteredResults);
            return that.scrapeUserComments(user, filteredResults[filteredResults.length - 1].id);
          });
        }
        loadingTableUpdater.updateTableToCompleted(commentsTableRowId);
        return commentsKarma;
      });
  };
  return that;
});
