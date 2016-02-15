define(['Scripts/App/PostsScraper', 'Q'], function(postsScraper, q) {
  describe('PostsScraper Tests', function() {
    beforeEach(function(){
      jasmine.getFixtures().fixturesPath = 'base/Tests/Fixtures/';
      jasmine.addMatchers({ 
        toBeEqualPost: function() {
          return {
            compare: function (actual, expected) {
              return {
                pass: actual.type === expected.type
                  && actual.link === expected.link && actual.x === expected.x 
                  && actual.y === expected.y && actual.id === expected.id
              };
            }
          };
        }
      });
    });
    
    it('should process a first post correctly when given post divs', function (done) {
      loadFixtures('postsPage.html');
      var metaNodes = $('div[class*=post] > .meta.clear');
      var titleNodes = $('div[class*=post] > h2');
      var resultsJson = readFixtures("expectedPostsFromPostsPage.json");
      var resultsParsedJson = JSON.parse(resultsJson);
      expect(resultsParsedJson).toBeDefined();
      postsScraper.getPostObj(titleNodes[0].outerHTML, metaNodes[0].outerHTML).then(function(result){
        expect(result).toBeEqualPost(resultsParsedJson[0]);
      }).finally(done);
    });
  });
});