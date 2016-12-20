'use strict';
describe('myApp.jsComplexity Service', function() {
  beforeEach(module('myApp'));
  describe('jsComplexity Service', function(){
    it('should exist', inject(function(jsComplexity) {
      expect(jsComplexity).toBeDefined();
      expect(jsComplexity.evaluate).toBeDefined();
    }));

    //*******************  IF statements   *******************//
    it('should evaluate a single if correctly', inject(function(jsComplexity) {
     expect(jsComplexity.evaluate('function check(a){ if(a){return a;}}')).toEqual(2);
   }));
    it('should evaluate an if, else correctly', inject(function(jsComplexity) {
      expect(jsComplexity.evaluate('function check(a){ if(a){return a;}else{return 0;}}')).toEqual(2);
    }));
    it('should evaluate an if, else if, else correctly', inject(function(jsComplexity) {
      expect(jsComplexity.evaluate('function check(a){ if(a=1){return a;}else if(a=0){return 2;}else{return 0;}}')).toEqual(3);
    }));
    it('should evaluate an if, else if (2), else correctly', inject(function(jsComplexity) {
      expect(jsComplexity.evaluate('function check(a){ if(a=1){return a;}else if(a=-1){return 1;}else if(a=0){return 2;}else{return 0;}}')).toEqual(4);
    }));
    it('should ignore conditions in strings', inject(function(jsComplexity) {
      expect(jsComplexity.evaluate('function check(a){ if(a=1){return "if";}else{return "else";}}')).toEqual(2);
    }));
    it('should evaluate a single without any path', inject(function(jsComplexity) {
     expect(jsComplexity.evaluate('function check(a){ return a };')).toEqual(1);
   }));

    //*******************  Switch Cases  *******************//
    it('should evaluate each case switch and default as an additional path', inject(function(jsComplexity) {
      expect(jsComplexity.evaluate('function theTest(val) {var answer = ""; switch( val ) {case 1: case 2: case 3: answer = "Low"; break; case 4: case 5: case 6: answer = "Mid"; break; case 7: case 8: case 9: answer = "High"; break; default: answer = "Massive or Tiny?"; } return answer; }')).toEqual(10);
    }));
    it('should evaluate each case switch and default as an additional path', inject(function(jsComplexity) {
     expect(jsComplexity.evaluate('function theTest(val) {var answer = ""; switch( val ) {case 1: answer = "Low"; break; default: answer = "Massive or Tiny?"; } return answer; }')).toEqual(2);
   }));

    //*******************  Loop statements   *******************//
    it('should evaluate each loop as additional path', inject(function(jsComplexity) {
     expect(jsComplexity.evaluate('function check(a){for (var i=0; i<7; i++) {if(i===1) {return i } else if(a=-1){return 1;} else if(a=0){return 2;} else{return 0;}} return i };')).toEqual(5);
   }));
    it('should evaluate each each as additional path to switch cases', inject(function(jsComplexity) {
     expect(jsComplexity.evaluate('function check () { for(i=1; i<=10; ++i) {switch (i) {case 1: val = "one"break; case 2: val = "two"break; case 3: break; default: val = "unknown"}}}')).toEqual(5);
   }));

  //*******************  Ternary Operators *******************//
  it('should evaluate each loop as additional path', inject(function(jsComplexity) {
    expect(jsComplexity.evaluate('tmp = (foo==1 ? true : false);')).toEqual(2);
  })); 
  it('should evaluate each operator as additional path and ignore conditions in strings ', inject(function(jsComplexity) {
    expect(jsComplexity.evaluate('var operator = true ? 1 : "?";')).toEqual(2);
  }));
  it('should evaluate each loop as additional path', inject(function(jsComplexity) {
    expect(jsComplexity.evaluate('function check (voteable) {return voteable = (age < 18) ? "Too young":"Old enough"; };')).toEqual(2);
  }));

  it('should handle multiple and nested operators correctly', inject(function(jsComplexity) {
    expect(jsComplexity.evaluate('function checkTernary () {return audience = (countrycode == "eu") ? "audienceEU" : (countrycode == "jp") ? "audienceJP" : (countrycode == "cn") ? "audienceCN" : "audienceUS"; };')).toEqual(6);
  }));

});
});
