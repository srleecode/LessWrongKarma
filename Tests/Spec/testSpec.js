define(['Scripts/App/CommentsScraper'], function(CommentsScraper) {
  describe('myFilter', function() {
    var failTest = function(error) {
      expect(error).toBeUndefined();
    };
    
    beforeEach(function(){
      jasmine.addMatchers({
        toBeEqualComment: function() {
          return {
            compare: function (actual, expected) {
              return {
                pass: actual.author === expected.author && actual.commentType === expected.commentType
                  && actual.link === expected.link && actual.x === expected.x && actual.y === expected.y
              };
            }
          };
        }
      });
      jasmine.getFixtures().fixturesPath = 'base/Tests/Fixtures/';
      loadFixtures('sampleComments.html');
    });
    
    it('should give correct comment object when given correct comment html', function () {
      var expected = {
        author: 'Vaniver',
        commentType: 'Parent',
        link: 'http://lesswrong.com/lw/n93/open_thread_feb_01_feb_07_2016/d2us',
        x: 1454336014000,
        y: 2
      };
      //var employee = CommentsScraper.getCommentObj($('.comment')[0].outerHTML);
      //expect(employee.author).toBeEqualComment('ScottL');
    });
    
    // Our first test!!!!
    it('about greeting says "This is the about message2!"', function () {
      //console.log(CommentsScraper);
      //CommentsScraper.getCommentData($('.comment')[0].outerHTML).then(function(data) {
      //  console.log(data);
      //});
    });
  });
});