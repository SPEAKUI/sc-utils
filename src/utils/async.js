var native = require( "./native" ),
    nativeSlice = native.slice;

var doParallel = function( fn ) {
        return function() {
            var args = nativeSlice.call( arguments );
            return fn.apply( null, [ _asyncEach ].concat( args ) );
        };
    },
    only_once = function( fn ) {
        var called = false;
        return function() {
            if ( called ) {
                throw new Error( "Callback was already called." );
            }
            called = true;
            fn.apply( window, arguments );
        };
    },
    _asyncEach = function( arr, iterator, callback ) {
        callback = callback || function() {};
        if ( !arr.length ) {
            return callback();
        }
        var completed = 0;
        arr.forEach( function( x ) {
            iterator( x, only_once( function( err ) {
                if ( err ) {
                    callback( err );
                    callback = function() {};
                } else {
                    completed += 1;
                    if ( completed >= arr.length ) {
                        callback( null );
                    }
                }
            } ) );
        } );
    },
    _asyncMap = function( eachfn, arr, iterator, callback ) {
        var results = [];
        //!!! Verify - wierd !!!
        arr = arr.map( function( x, i ) {
            return {
                index: i,
                value: x
            };
        } );
        eachfn( arr, function( x, callback ) {
            iterator( x.value, function( err, v ) {
                results[ x.index ] = v;
                callback( err );
            } );
        }, function( err ) {
            callback( err, results );
        } );
    };

module.exports = {
    each: _asyncEach,
    map: doParallel( _asyncMap )
};