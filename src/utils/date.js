var is = require("./is"),
  ensureTwoDigits = function(number) {
    return (number < 10) ? "0" + number.toString() : number.toString();
  };
var formats = {
  mmss: {
    expression: "(\\W|^)mm(\\W+s{1,2}\\W|\\W+s{1,2}$)",
    value: function(date) {
      return ensureTwoDigits(date.getUTCMinutes())
    }
  },
  mss: {
    expression: "(\\W|^)m(\\W+s{1,2}\\W|\\W+s{1,2}$)",
    value: function(date) {
      return date.getUTCMinutes().toString();
    }
  },
  hmm: {
    expression: "(\\Wh{1,2}\\W+|^h{1,2}\\W+)mm(\\W|$)",
    value: function(date) {
      return ensureTwoDigits(date.getUTCMinutes());
    }
  },
  hm: {
    expression: "(\\Wh{1,2}\\W+|^h{1,2}\\W+)m(\\W|$)",
    value: function(date) {
      return date.getUTCMinutes().toString();
    }
  },
  ms: {
    expression: "(\\Wss\\W|^ss\\W)00(\\W|$)",
    value: function(date) {
      return ensureTwoDigits(date.getUTCMilliseconds())
    }
  },
  ampm: {
    expression: "(\\W|^)AM/PM(\\W|$)",
    value: function(date) {
      return ((date.getUTCHours() >= 12) ? "PM" : "AM");
    }
  },
  ap: {
    expression: "(\\W|^)A/P(\\W|$)",
    value: function(date) {
      return ((date.getUTCHours() >= 12) ? "P" : "A");
    }
  },
  yyyy: {
    expression: "(\\W|^)yyyy(\\W|$)",
    value: function(date) {
      return date.getUTCFullYear().toString();
    }
  },
  yy: {
    expression: "(\\W|^)yy(\\W|$)",
    value: function(date) {
      return ensureTwoDigits(date.getUTCFullYear() % 100);
    }
  },
  mm: {
    expression: "(\\W|^)mm(\\W|$)",
    value: function(date) {
      return ensureTwoDigits(date.getUTCMonth() + 1);
    }
  },
  m: {
    expression: "(\\W|^)m(\\W|$)",
    value: function(date) {
      return (date.getUTCMonth() + 1).toString();
    }
  },
  dd: {
    expression: "(\\W|^)dd(\\W|$)",
    value: function(date) {
      return ensureTwoDigits(date.getUTCDate());
    }
  },
  d: {
    expression: "(\\W|^)d(\\W|$)",
    value: function(date) {
      return date.getUTCDate().toString();
    }
  },
  hh: {
    expression: "(\\W|^)hh(\\W|$)",
    value: function(date) {
      return ensureTwoDigits(date.getUTCHours());
    }
  },
  h: {
    expression: "(\\W|^)h(\\W|$)",
    value: function(date) {
      return (date.getUTCHours() > 12) ? (date.getUTCHours() - 12).toString() : ((date.getUTCHours() == 0) ? 12 : date.getUTCHours()).toString();
    }
  },
  ss: {
    expression: "(\\W|^)ss(\\W|$)",
    value: function(date) {
      return ensureTwoDigits(date.getUTCSeconds());
    }
  },
  s: {
    expression: "(\\W|^)s(\\W|$)",
    value: function(date) {
      return date.getUTCSeconds().toString();
    }
  }
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
  },
  toStringWithFormat: function(value, format) {
    if (this.isISO(value)) {
      try {
        var date = this.parseISO(value);

        for (var step in formats) {
          var find = (formats[step]) ? formats[step].expression : "";
          var replace = "$1" + formats[step].value(date) + "$2";
          if (find != "") {
            var expression = new RegExp(find, 'g');

            format = format.replace(expression, replace);
          }
        }

        return format;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
};

module.exports = dateHelper;