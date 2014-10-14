var is = require("./is"),
  ensureTwoDigits = function(number) {
    return (number < 10) ? "0" + number.toString() : number.toString();
  };

var dateHelper = {
  //TODO: Not sure about that logic, just trying to port it from 1.1
  toISO: function(date) {

    if (!is.a.date(date)) {
      return false;
    }

    var y = ensureTwoDigits(date.getFullYear()),
      m = ensureTwoDigits(date.getMonth() + 1),
      d = ensureTwoDigits(date.getDate());

    return y + m + d;
  },
  parseISO: function(dateString) {
    var year,
      month,
      day,
      hours,
      minutes,
      seconds;

    if (!is.a.string(dateString)) {
      return null;
    }

    year = parseInt(dateString.substr(0, 4), 10);
    // month should start from 0 !!!
    // minus one in order to have the right month
    month = parseInt(dateString.substr(4, 2), 10) - 1;
    day = parseInt(dateString.substr(6, 2), 10);

    if (dateString.indexOf("T") !== 8) {
      return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
    }

    hours = parseInt(dateString.substr(9, 2), 10);
    minutes = parseInt(dateString.substr(11, 2), 10);
    seconds = parseInt(dateString.substr(13, 2), 10);

    return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
  },
  isISO: function(date) {
    var dateValue;

    if (is.a.date(date)) {
      date = date.toString();
    }

    if (!is.a.string(date)) {
      return false;
    }

    // Removes the ticks
    if (date.charAt(15) === ":") {
      date = date.substr(0, 15);
    }

    if (!(date.length == 8 || date.length == 15)) {
      return false;
    }

    dateValue = this.parseISO(date);

    if (is.a.date(dateValue)) {
      // it is a date
      if (isNaN(dateValue.getYear())) { // d.valueOf() could also work
        return false;
      }
      return true;
    }

    return false;
  }
};

module.exports = dateHelper;