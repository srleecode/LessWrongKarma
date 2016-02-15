/**
 * PostType Module
 * @module PostType
 */
define(function() {
  /**
   * Enum for post types
   * @readonly
   * @enum {String}
   * @memberOf module:PostType
   */
  var that = Object.freeze({
    /** Main post */
    Main: 'Main',
    /** Discussion post */
    Discussion: 'Discussion'
  });
  return that;
});
