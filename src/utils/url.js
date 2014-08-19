var getParameterByName = function( name ) {
    name = name.replace( /[\[]/, "\\[" ).replace( /[\]]/, "\\]" );

    var regexS = "[\\?&]" + name + "=([^&#]*)",
        regex = new RegExp( regexS ),
        results = regex.exec( window.location.href );

    if ( results == null ) {
        return "";
    } else {
        return decodeURIComponent( results[ 1 ].replace( /\+/g, " " ) );
    }
};

module.exports = {
    parameterByName: getParameterByName
};