var is = require( "sc-is" );

var isCapitalize = function( str ) {
    return str.charAt( 0 ) === str.charAt( 0 ).toUpperCase();
};

is.capitalize = isCapitalize;

module.exports = is;