var scUtils = require( "../src/" );
var should = require( "should" );

describe( "Given the utility tools for sitecore client-side", function() {
    it( "should be defined", function() {
        scUtils.should.be.defined;
    } );
    it( "should have a is function", function() {
        scUtils.is.should.be.defined;
    } );
    it( "should have a is a function", function() {
        scUtils.is.a.should.be.defined;
    } );
    it( "should have a is an function", function() {
        scUtils.is.an.should.be.defined;
    } );
    it( "should have a string namespace", function() {
        scUtils.string.should.be.defined;
    } );
    it( "should have an object namespace", function() {
        scUtils.object.should.be.defined;
    } );
    it( "should have an function namespace", function() {
        scUtils.function.should.be.defined;
    } );
    it( "should have an async function namespace", function() {
        scUtils.async.should.be.defined;
    } );
    it( "should have an array function namespace", function() {
        scUtils.array.should.be.defined;
    } );
    it( "should have an url function namespace", function() {
        scUtils.url.should.be.defined;
    } );
    describe( "and the is namespace", function() {
        describe( "when I want to know if a string is capitalize", function() {
            it( "should return true when it is the case", function() {
                scUtils.is.capitalize( "Test" ).should.be.true;
            } );
            it( "should return false when it is not the case", function() {
                scUtils.is.capitalize( "test" ).should.be.false;
            } );
        } );
    } );
    describe( "and the string namespace", function() {
        describe( "when I want to create a unique Id", function() {
            it( "should be unique and different compared to a newly created", function() {
                var unique = scUtils.string.uniqueId( "test_" );
                var unique2 = scUtils.string.uniqueId( "test_" );

                unique.should.not.be.equal( unique2 );
            } );
        } );
        describe( "when I want to capitalize a string", function() {
            it( "should be capitalized", function() {
                var test = "test";
                var capitalizedTest = scUtils.string.capitalize( test );

                test.should.not.be.equal( capitalizedTest );
                scUtils.is.capitalize( capitalizedTest ).should.be.true;

            } );
        } );
    } );
    describe( "and the array namespace", function() {
        describe( "when I want to transform a array-like (DOM Node) to an array", function() {
            var testData = [ 1, 2, 3, 4 ];
            var testArray = scUtils.array.toArray( testData );

            it( "number of property in the array-like should be the same as the length of the array", function() {
                testData.length.should.equal( testArray.length );
            } );
        } );
        describe( "when I want to know if an array contain a value, I use the containt method", function() {
            it( "for number", function() {
                var test = [ 1, 2, 3 ];
                scUtils.array.contains( test, 1 ).should.be.true;
                scUtils.array.contains( test, 0 ).should.be.false;
            } );
            it( "for string", function() {
                var test = [ "one", "two", "three" ];
                scUtils.array.contains( test, "one" ).should.be.true;
                scUtils.array.contains( test, "zero" ).should.be.false;
            } );
            it( "for object", function() {
                var testObject = {
                    test: true
                };

                var test = [ {},
                    testObject, {}
                ];

                scUtils.array.contains( test, testObject ).should.be.true;
            } );
        } );
        describe( "when I want to flatten an array which has other array, I use the flatten method", function() {
            it( "should have a flat array even with complex array of array structure", function() {
                var test = [ 1, [ 2, 3, 4 ],
                    [ 5, [ 6, 7 ] ]
                ];

                scUtils.array.flatten( test ).length.should.equal( 7 );
            } );
        } );
        describe( "when I want to find a single object/number/string in an array, I use the find method", function() {
            it( "should retrieve the correct value", function() {
                var test = [ {
                    test: 1
                }, {
                    test: 2
                }, {
                    test: 3
                } ];

                var found = scUtils.array.find( test, function( t ) {
                    return t.test === 2;
                } );

                found.should.exist;
                found.test.should.equal( 2 );

            } );
        } );
        describe( "and the URL namespace", function() {
            describe( "when I want to get the value of a querystring, I use the parameterByName name method", function() {
                //only works in the Browser
                it( "should be defined", function() {
                    scUtils.url.parameterByName.should.exist;
                } );
            } );
        } );
    } );
    describe( "and the function namespace", function() {
        describe( "when I want to be sure I only execute a function once, I use the once method", function() {
            it( "should be defined", function() {
                scUtils.function.once.should.exist;
            } );
            it( "should only call the function once", function() {
                var test = 0;
                var testFunction = function() {
                    test += 1;
                };
                var testFunctionOnlyOnce = scUtils.function.once( testFunction );
                testFunctionOnlyOnce();
                test.should.equal( 1 );
                testFunctionOnlyOnce();
                test.should.equal( 1 );
                testFunctionOnlyOnce();
                test.should.equal( 1 );
            } );
        } );
    } );
} );