var is = require( "sc-is" );
var arrayProto = Array.prototype;

var toArray = function( arrayLike ) {
        var array = [],
            i = arrayLike.length >>> 0; // ensure that length is an Uint32
        while ( i-- ) {
            array[ i ] = arrayLike[ i ];
        }
        return array;
    },
    contains = function( array, obj ) {
        var i = array.length;
        while ( i-- ) {
            if ( array[ i ] === obj ) {
                return true;
            }
        }
        return false;
    },
    flatten = function( all, shallow ) {

        shallow = shallow || [];

        if ( !is.an.array( all ) ) {
            return all;
        }

        all.forEach( function( input ) {
            if ( is.an.array( input ) ) {

                var child = flatten( input );

                if ( is.an.array( child ) ) {
                    shallow = arrayProto.concat( shallow, child );
                } else {
                    shallow.push( input );
                }
            } else {
                shallow.push( input );
            }
        } );

        return shallow;
    },
    find = function( obj, predicate ) {
        var result;

        obj.forEach( function( value, index ) {
            if ( predicate.call( context, value, index, obj ) ) {
                result = value;
            }
        } );

        return result;
    };

module.exports = {
    /**
     * toArray transform an array-like (DOM) to a real Array
     * @param  {Array-like} arrayLike result returned by querySelectorAll
     * @return {[Array]} a real array
     */
    toArray: toArray,
    contains: contains,
    flatten: flatten,
    find: find
};