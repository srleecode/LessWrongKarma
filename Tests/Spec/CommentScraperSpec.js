define(['Scripts/App/CommentsScraper'], function(commentsScraper) {
  describe('CommentsScraper Tests', function() {
    beforeEach(function(){
      jasmine.getFixtures().fixturesPath = 'base/Tests/Fixtures/';
      jasmine.addMatchers({ 
        toBeEqualComment: function() {
          return {
            compare: function (actual, expected) {
              return {
                pass: actual.author === expected.author && actual.commentType === expected.commentType
                  && actual.link === expected.link && actual.x === expected.x 
                  && actual.y === expected.y && actual.id === expected.id
              };
            }
          };
        }
      });
    });
    
    it('should process a page of commments correctly when no comments are replying to itself', function () {
      loadFixtures('simpleSampleCommentsPage.html');
      var resultsJson = readFixtures("expectedSimpleSampleComments.json");
      var resultsParsedJson = JSON.parse(resultsJson);
      expect(resultsParsedJson).toBeDefined();
      var commentNodes = $('.comment');
      resultsParsedJson.forEach(function(result, idx) {
        expect(result).toBeEqualComment(commentsScraper.getCommentObj(commentNodes[idx].outerHTML));
      });
    });
    
    it('should process a page of commments correctly when some comments are replying to itself', function () {
      loadFixtures('commentsReplyingToItselfPage.html');
      var resultsJson = readFixtures("expectedCommentsReplyingToItself.json");
      var resultsParsedJson = JSON.parse(resultsJson);
      expect(resultsParsedJson).toBeDefined();
      var commentNodes = $('.comment');
      resultsParsedJson.forEach(function(result, idx) {
        expect(result).toBeEqualComment(commentsScraper.getCommentObj(commentNodes[idx].outerHTML));
      });
    });
  });
});