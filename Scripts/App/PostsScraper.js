/**
 * PostScraper Module
 * @module PostScraper
 */
define(['jquery', 'YQL', 'PostType', 'Q', 'moment', 'LoadingTableUpdater'], function($, yql, PostType, q, moment, loadingTableUpdater) {
  var that = {};
  var postsKarma = [];
  var postsTableRowId = 'postRow';
  /**
   * Parses and retrieves post information from apost head div and meta div
   * @param  {String} header - div from lesswrong submitted posts page which contains the link to the post
   * @param  {String} meta - div from lesswrong submitted posts page which contains the date post was submitted, score it has and id
   * @return {Object} postObj - contains post: score, date, link, id and {@link PostType}
   * @memberOf module:PostScraper
   */
  that.getPostObj = function(header, meta) {
    var postLink = 'http://lesswrong.com/r/discussion' + $('a', header).attr('href');
    var postType = '';
    var title = $('a', header).text();
    var metaNode = $(meta)[0];
    var date = $('.date', metaNode).text();
    var scoreNode = $('.votes > :nth-child(1)', metaNode);
    var id = scoreNode.first().attr('id').replace('score_', '').trim();
    var score = parseInt(scoreNode.text(), 10);

    return yql.getPostType(postLink)
      .then(function(data) {
        if (data.results && data.results.length > 0) {
          postType = PostType.Discussion;
        } else {
          postType = PostType.Main;
          score *= 10;
        }
        var karma = {
          y: score,
          x: moment.utc(date, 'DD MMMM YYYY hh:mm:ssA').valueOf(),
          id: id,
          link: postLink,
          title: title,
          type: postType
        };
        return karma;
      });
  };
  /**
   * Recursive function that retrieves information on all of a given users post starting after an optional given post id
   * Each call processes a page with at most ten of the users post
   * @param {String} user - the user whose psots will be processed
   * @param {String} [lastPostId] - gets a page of posts after this comment id. If lastPostId is not provided, the array that is retruned is reset to be empty. If it is provided, it is added to
   * @return {Array} postsKarma - information extracted from all of the processed comments
   * @memberOf module:CommentScraper
   */
  that.scrapeUserPosts = function(user, lastPostId) {
    var url = 'http://lesswrong.com/user/' + encodeURIComponent(user) + '/submitted/';
    if (lastPostId) {
      url += '?after=' + lastPostId;
    } else {
      postsKarma = [];
    }

    return yql.getPosts(url)
      .then(function(data) {
        if (data.results && data.results.length > 0) {
          var header = '';
          var promises = [];
          data.results.forEach(function(postItem, idx) {
            if (idx % 2 === 0) {
              header = postItem;
            } else {
              promises.push(that.getPostObj(header, postItem));
            }
          });
          return q.all(promises)
            .then(function(results) {
              postsKarma = postsKarma.concat(results);
              loadingTableUpdater.updateTable(postsTableRowId, results);
              return that.scrapeUserPosts(user, results[results.length - 1].id);
            });
        }
        loadingTableUpdater.updateTableToCompleted(postsTableRowId);
        return postsKarma;
      });
  };
  return that;
});
