var native = require( "./native" ),
    navtiveForEach = native.forEach,
    nativeSlice = native.slice;

var extend = function( obj ) {
        navtiveForEach.call( nativeSlice.call( arguments, 1 ), function( source ) {
            if ( source ) {
                for ( var prop in source ) {
                    if ( source.hasOwnProperty( prop ) ) {
                        obj[ prop ] = source[ prop ];
                    }
                }
            }
        } );
        return obj;
    },
    inherits = function( base, init, proto ) {
        var child = function() {
            return base.apply( this, arguments );
        };
        extend( child, base );

        var Surrogate = function() {
            this.constructor = child;
        };

        Surrogate.prototype = base.prototype;
        child.prototype = new Surrogate();

        child.prototype.initialize = init || base.prototype.initialize || function() {};
        if ( proto ) {
            for ( var i in proto ) {
                if ( proto.hasOwnProperty( i ) ) {
                    child.prototype[ i ] = proto[ i ];
                }
            }
        }

        child.__super__ = base.prototype;

        return child;

    },
    defaults = function( obj ) {
        nativeSlice.call( arguments, 1 ).forEach( function( source ) {
            if ( source ) {
                for ( var prop in source ) {
                    if ( obj[ prop ] === void 0 ) {
                        obj[ prop ] = source[ prop ];
                    }
                }
            }
        } );
        return obj;
    },
    extendProto = function( obj, proto ) {
        for ( var p in proto ) {
            if ( proto.hasOwnProperty( p ) ) {
                obj.prototype[ p ] = proto[ p ];
            }
        }
        return obj;
    },
    flattenObject = function( obj ) {
        var result = [];

        for ( var app in obj ) {
            if ( obj.hasOwnProperty( app ) ) {
                result.push( obj[ app ] );
            }
        }
        return result;
    };

module.exports = {
    extend: extend,
    inherits: inherits,
    defaults: defaults,
    extendProto: extendProto,
    flatten: flattenObject
};