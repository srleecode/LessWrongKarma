/**
 * Rounder Module
 * @module Rounder
 */
define(function() {
  var that = {};
  /**
   * Similar to .toFixed, but it removes 0's from the end.
   * @param {Number} num number to round
   * @param {Number} numDecimals the maximum number of decimals to round to
   * @return {Number} number which is rounded to a maximum of given numDecimals. 0 if num is not a number
   * @memberOf module:Rounder
   */
  that.toAtMostDecimals = function(num, numDecimals) {
    if (isNaN(parseFloat(num))) {
      return 0;
    }
    var numStr = num.toString();
    var numStrSplit = numStr.split('.');
    if (numStrSplit.length < 2 || typeof numDecimals === 'undefined' ||
            isNaN(parseInt(numDecimals, 10)) ||
            numStrSplit[1].length <= numDecimals || numDecimals < 0) {
      return num;
    }
    return parseFloat(num.toFixed(numDecimals));
  };
  return that;
});
