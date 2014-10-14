var idCounter = 0;

var capitalize = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    lowerFirstLetter = function(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    },
    uniqueId = function(prefix) {
        var id = ++idCounter + "";
        return prefix ? prefix + id : id;
    };

module.exports = {
    capitalize: capitalize,
    lowerFirstLetter: lowerFirstLetter,
    uniqueId: uniqueId
};