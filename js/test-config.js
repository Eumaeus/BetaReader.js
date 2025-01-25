/* Requires JQuery! */

/*
    Utilties
*/

function getSuccessAnswer(passed, shouldFail) {
    if (passed) {
        if (shouldFail) {
            // passed, should have failed
            return false; // no success
        } else {
            // passed, should have passed
            return true; // success
        }
    } else {
        if (shouldFail) {
            // failed, should have failed
            return true; // success
        } else {
            // failed, 
            return false; // no success
        }
    }
}

/*
    Prototype a `unittest` function
*/

var unittest = function(
    testString = "mh=nin", 
    expectedValue = "μῆνιν", 
    docString = "A Unit Test", 
    jqSelector = "#confirming_tests",
    shouldFail = false) {

    this.testString = testString;
    //console.log("- testString = " + this.testString);
    if (typeof(this.testString) != "string") {
        throw new Error("Parameter `testString` ='" + this.testString + "' is not of type 'string'!");
    }

    this.docString = docString;
    //console.log("- docString = " + this.docString);
    if (typeof(this.docString) != "string") {
        throw new Error("Parameter `docString` = '" + this.docString + "' is not of type 'string'!");
    }

    this.expectedValue = expectedValue;
    //console.log("- expectedValue = " + this.expectedValue);
    if (typeof(this.expectedValue) != "string") {
        throw new Error("Parameter `expectedValue` = '" + this.expectedValue + "' is not of type 'string'!");
    }

    this.jqSelector = jqSelector;
    //console.log("- jqSelector = " + this.jqSelector);
    if (typeof(this.jqSelector) != "string") {
        throw new Error("Parameter `jqSelector` = '" + this.jqSelector + "' is not of type 'string'!");
    }

    this.shouldFail = shouldFail;
    //console.log("- shouldFail = " + this.shouldFail);
    if (typeof(this.shouldFail) != "boolean") {
        throw new Error("Parameter `shouldFail` = '" + this.shouldFail + "' is not of type 'boolean'!");
    }

    this.testResult = "Pending";
    //console.log("- testResult = " + this.testResult);
    this.testPassed = false;
    //console.log("- testPassed = " + this.testPassed);
    this.shouldFail = shouldFail;
    this.success = false;
}

// Run test first
unittest.prototype.test = function(){
    // The test!!!!
    this.result = this.testString; // Test does nothing!
    this.testPassed = (this.expectedValue == this.result);
    this.success = getSuccessAnswer( this.testPassed, this.shouldFail);
};

// Then return a formated response
unittest.prototype.response = function() {
    var retString = `<li class="testResult success_${this.success}"><em>${this.docString}</em>. ${this.success ? "Success" : "Failed"}. Tested "<strong>${this.testString}</strong>". Expected "<strong>${this.expectedValue}</strong>". Got "<strong>${this.result}</strong>". ${ this.shouldFail ? "<strong>Should have failed!</strong>" : ""}</li>`
    return retString;
}

// Do it! Returns an HTML-formatted response
unittest.prototype.runTest = function() {
    this.test();
    return this.response();
}



/*
    Set up and confirm
*/
    
// Set up and run with default values
var testUnitTest = new unittest();
testUnitTest.runTest();


// Run with custom values
var testUnitTest2 = new unittest(
    testString = "a)/eide",
    expectedValue = "ἄειδε",
    docString = undefined,
    jqSelector = undefined,
    shouldFail = undefined // it defaults to false
)
testUnitTest2.runTest();
