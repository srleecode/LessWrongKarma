define(['Scripts/App/Rounder'], function(rounder) {
  describe('Rounder tests', function() {
    
    it('should give correct numbers and no decimal places ' +
            'when 0 decimal places ad a correct number is provided', function () {
      expect(rounder.toAtMostDecimals(5, 0)).toBe(5);
      expect(rounder.toAtMostDecimals(154314, 0)).toBe(154314);
    });
    
    it('should give 0 when a number is not provided', function () {
      expect(rounder.toAtMostDecimals('test', 0)).toBe(0);
      expect(rounder.toAtMostDecimals(null, 0)).toBe(0);
    });
    
    it('should give back number unchanged when no decimal is provided', function () {
      expect(rounder.toAtMostDecimals(100.34)).toBe(100.34);
      expect(rounder.toAtMostDecimals(100.56)).toBe(100.56);
    });
    
    it('should round correctly with positive numbers', function () {
      expect(rounder.toAtMostDecimals(100.567, 2)).toBe(100.57);
      expect(rounder.toAtMostDecimals(100.4343, 3)).toBe(100.434);
      expect(rounder.toAtMostDecimals(100.01, 1)).toBe(100);
    });
    
    it('should round correctly with negative numbers', function () {
      expect(rounder.toAtMostDecimals(-100.567, 2)).toBe(-100.57);
      expect(rounder.toAtMostDecimals(-100.4343, 3)).toBe(-100.434);
      expect(rounder.toAtMostDecimals(-100.01, 1)).toBe(-100);
    });
    
    it('should round correctly with negative numbers', function () {
      expect(rounder.toAtMostDecimals(-100.567, 2)).toBe(-100.57);
      expect(rounder.toAtMostDecimals(-100.4343, 3)).toBe(-100.434);
      expect(rounder.toAtMostDecimals(-100.01, 1)).toBe(-100);
    });
    
    it('should return unchanged number when a whole number is provided', function () {
      expect(rounder.toAtMostDecimals(0, 99)).toBe(0);
      expect(rounder.toAtMostDecimals(27, 3)).toBe(27);
      expect(rounder.toAtMostDecimals(-2, 0)).toBe(-2);
    });
  });
});