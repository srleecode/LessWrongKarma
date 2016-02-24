/**
 * StatsService Module
 * @module StatsService
 */
define(['Q', 'CommentsScraper', 'PostsScraper', 'PostType', 'Rounder'],
function(q, commentsScraper, postsScraper, postType, rounder) {
  var that = {};
  var comments = [];
  var discussionPosts = [];
  var mainPosts = [];
  var commentStats = {};
  var discussionPostStats = {};
  var mainPostStats = {};
  var totalStats = {};
  var cumulativeStats = {};

  that.getComments = function() {
    return comments;
  };

  that.getDiscussionPosts = function() {
    return discussionPosts;
  };

  that.getMainPosts = function() {
    return mainPosts;
  };

  that.getCommentStats = function() {
    return commentStats;
  };

  that.getDiscussionPostStats = function() {
    return discussionPostStats;
  };

  that.getMainPostStats = function() {
    return mainPostStats;
  };

  that.getTotalStats = function() {
    return totalStats;
  };

  that.getCumulativeStats = function() {
    return cumulativeStats;
  };

  function getStats(karmaArray) {
    var totals = {
      positiveTotalScore: 0,
      numPositive: 0,
      negativeTotalScore: 0,
      numNegative: 0,
      numNeutral: 0
    };
    karmaArray.forEach(function(karmaItem) {
      if (karmaItem.y > 0) {
        totals.positiveTotalScore += karmaItem.y;
        totals.numPositive++;
      } else if (karmaItem.y < 0) {
        totals.negativeTotalScore += karmaItem.y;
        totals.numNegative++;
      } else {
        totals.numNeutral++;
      }
    });
    totals.numPercentPositive = rounder.toAtMostDecimals(totals.numPositive / (totals.numPositive + totals.numNegative + totals.numNeutral) * 100, 2);
    totals.numPercentNeutral = rounder.toAtMostDecimals(totals.numNeutral / (totals.numPositive + totals.numNegative + totals.numNeutral) * 100, 2);
    totals.numPercentNegative = rounder.toAtMostDecimals(totals.numNegative / (totals.numPositive + totals.numNegative + totals.numNeutral) * 100, 2);
    totals.points = totals.positiveTotalScore + Math.abs(totals.negativeTotalScore);
    return totals;
  }

  function createCumulativeData(comments, discussionPosts, mainPosts) {
    var data = [];
    var point = {};
    var totalScore = 0;
    comments.forEach(function(comment) {
      point = {
        score: comment.y,
        x: comment.x,
        link: comment.link,
        title: comment.title,
        blurb: comment.blurb,
        type: 'Comment'
      };
      data.push(point);
    });
    discussionPosts.forEach(function(discussionPost) {
      point = {
        score: discussionPost.y,
        x: discussionPost.x,
        link: discussionPost.link,
        title: discussionPost.title,
        type: 'Discussion Post'
      };
      data.push(point);
    });
    mainPosts.forEach(function(mainPost) {
      point = {
        score: mainPost.y,
        x: mainPost.x,
        link: mainPost.link,
        title: mainPost.title,
        type: 'Main Post'
      };
      data.push(point);
    });
    // sorts by the date it was posted
    data.sort(function(a, b) {
      return a.x - b.x;
    });
    data.forEach(function(point) {
      totalScore += point.score;
      point.y = totalScore;
    });
    return data;
  }
  /**
   * Creates a time series scatter chart, column proporitions chart and total pie chart for karma information from a given user
   * @param {String} user user to retrieve comment, discussion post and main post information to create the charts.
   * @memberOf module:StatsService
   */
  that.scrapeData = function(user) {
    return q.all([commentsScraper.scrapeUserComments(user), postsScraper.scrapeUserPosts(user)])
    .then(function(data) {
      comments = [];
      discussionPosts = [];
      mainPosts = [];
      commentStats = {};
      discussionPostStats = {};
      mainPostStats = {};
      totalStats = {};
      cumulativeStats = {}; 
      if (data[0].length !== 0 || data[1].length !== 0) {
        comments = data[0];
        discussionPosts = data[1].filter(function(post) {
          return post.type === postType.Discussion;
        });
        mainPosts = data[1].filter(function(post) {
          return post.type === postType.Main;
        });
        commentStats = getStats(comments);
        discussionPostStats = getStats(discussionPosts);
        mainPostStats = getStats(mainPosts);
        var totalPositivePoints = commentStats.positiveTotalScore +
            discussionPostStats.positiveTotalScore + mainPostStats.positiveTotalScore;
        var totalNegativePoints = Math.abs(commentStats.negativeTotalScore) +
            Math.abs(discussionPostStats.negativeTotalScore) + Math.abs(mainPostStats.negativeTotalScore);
        var totalPoints = commentStats.points + discussionPostStats.points +
            mainPostStats.points;
        totalStats = {
          percentPositive:
            rounder.toAtMostDecimals(totalPositivePoints / totalPoints * 100, 2),
          percentNegative:
            rounder.toAtMostDecimals(totalNegativePoints / totalPoints * 100, 2),
          commentPercentPositive:
            rounder.toAtMostDecimals(commentStats.positiveTotalScore / totalPositivePoints * 100, 2),
          discussionPostPercentPositive:
            rounder.toAtMostDecimals(discussionPostStats.positiveTotalScore / totalPositivePoints * 100, 2),
          mainPostPercentPositive:
            rounder.toAtMostDecimals(mainPostStats.positiveTotalScore / totalPositivePoints * 100, 2),
          commentPercentNegative:
            rounder.toAtMostDecimals(Math.abs(commentStats.negativeTotalScore) / totalPositivePoints * 100, 2),
          discussionPostPercentNegative:
            rounder.toAtMostDecimals(Math.abs(discussionPostStats.negativeTotalScore) / totalPositivePoints * 100, 2),
          mainPostPercentNegative:
            rounder.toAtMostDecimals(Math.abs(mainPostStats.negativeTotalScore) / totalPositivePoints * 100, 2),
          positiveScore: totalPositivePoints,
          negativeScore: commentStats.negativeTotalScore + discussionPostStats.negativeTotalScore + mainPostStats.negativeTotalScore
        };
        cumulativeStats = createCumulativeData(comments, discussionPosts, mainPosts);
      }
    });
  };

  return that;
});
