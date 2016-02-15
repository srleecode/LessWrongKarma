/**
 * CommentType Module
 * @module CommentType
 */
define(function() {
  /**
   * Enum for comment types
   * @readonly
   * @enum {String}
   * @memberOf module:CommentType
   */
  var that = Object.freeze({
    /** A comment that is being replied to in the submitted comments page */
    Parent: 'Parent',
    /** A comment that has no comments replying to it in the submitted comments page */
    Leaf: 'Leaf'
  });
  return that;
});
