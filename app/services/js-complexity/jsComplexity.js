'use strict';


angular.module('myApp')
.service('jsComplexity', function() {

  function parseInput (jsCode) {
    var elseIfCollection = [];
    var newString = [];
    jsCode = jsCode.split(';');
    for (var i = 0; i < jsCode.length; i++ ) {
      var string = jsCode[i];
      if (string.includes("else if")) {
       string = string.replace(/else if/i, 'if');
     }
     newString.push(string);
   }
   return newString.join("")
 };

  //CALLBACK FUNCTIONS TO FILTER FOR KEYWORDS//
  function validatePath (node) {
  	if (node.value === "else" && node.type ===  "Keyword" 
      || node.value === "if" && node.type ===  "Keyword"
      || node.value === "else" && node.type ===  "Keyword" 
      || node.value === "if" && node.type ===  "Keyword"
      || node.value === "?" && node.type === "Punctuator" 
      || node.value === ":" && node.type === "Punctuator"
      || node.value === "||" && node.type === "LogicalExpression") {
  		return node;
  }
}

function validateLoops (node) {
  if (node.value === "for" && node.type ===  "Keyword"
    || node.value === "while" && node.type ===  "Keyword") {
    return node;
}
}

  function tokenizeInputCode(jsCode, node) {
    var tokenResults = esprima.tokenize(parseInput(jsCode));
    var loopsCount = (tokenResults.filter(validateLoops)).length;
    var pathCounts = (tokenResults.filter(validatePath)).length;
    var result = loopsCount > 0 ? loopsCount : 1;
    if (pathCounts < 2 && !loopsCount || loopsCount && pathCounts > 1) {
      result = result + pathCounts;
    }
    if (loopsCount && pathCounts && pathCounts < 2) {
      result = 2;
      result = result + pathCounts;
    }
    if (!loopsCount && pathCounts >= 2) {
      result = pathCounts;
    }
    return result;
  };


  function parseCode (jsCode) {
    var elseIfArray = [];
    jsCode = jsCode.split(';');
    console.log('split====>',jsCode)
    for (var i = 0; i < jsCode.length; i++ ) {
      var string = jsCode[i];
      if (string.includes("else if" )) {

      }
    }
    return {
      fnWithoutElseIf: jsCode.join(""),
      elseIfArray : elseIfArray
    }
  };

  // END OF HELPER FUNCTIONS
  
  this.evaluate = function(jsCode) {  
    var validataInput = esprima.tokenize(parseInput(jsCode));
    if (validataInput) {
     return tokenizeInputCode(jsCode);   		
   }
   else {
    return "Please enter a valid function"
  }
}


});