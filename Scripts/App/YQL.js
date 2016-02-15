/**
 * YQL Module.
 * YQL is used to get cross domain html and avoid the same-origin policy. As this is hosted on Github Pages I don't have access to a backend
 * @module YQL
 */
define(['jquery', 'Q'], function($, q) {
  var that = {};
  /**
   * @param {String} url of which to parse html
   * @return {Promise} with li div having class active.
   * @memberOf module:YQL
   */
  that.getPostType = function(url) {
    var yqlQuery = 'select * from html where url="' + url +
            '" and xpath="//li[@class=\'active\']/*[1]"';
    return q($.getJSON('http://query.yahooapis.com/v1/public/yql?q=' +
              encodeURIComponent(yqlQuery) + '&format=xml&callback=?', null));
  };
    /**
   * @param {String} url of which to parse html
   * @return {Promise} with divs either header,i.e. title, information or post meta data
   * @memberOf module:YQL
   */
  that.getPosts = function(url) {
    var yqlQuery = 'select * from html where url="' + url +
            '" and xpath="//div[contains(@class, \'post\')]/*[@class=\'meta clear\' or name()=\'h2\']"';
    return q($.getJSON('http://query.yahooapis.com/v1/public/yql?q=' +
              encodeURIComponent(yqlQuery) + '&format=xml&callback=?', null));
  };
  /**
   * @param {String} url of which to parse html
   * @return {Promise} with divs containing comment data
   * @memberOf module:YQL
   */
  that.getComments = function(url) {
    var yqlQuery = 'select * from html where url="' + url +
            '" and xpath="//div[@class=\'comment\']"';
    return q($.getJSON('http://query.yahooapis.com/v1/public/yql?q=' +
              encodeURIComponent(yqlQuery) + '&format=xml&callback=?', null));
  };
  return that;
});
