
// Creates a timer that is limited to calling on fixed minutes
// on the hourly cycle. Must be a divisible of 60, so it fits
// into the hourly cleanly.
// Example:

/*
var Timer = require('timer')
var someFunction = function() {
  var interval = 5
  console.log('Repeating this function, time: ' + Date.now())
  Timer(interval, someFunction)
}
 */

function fixedTimeout(interval, callback) {
  if ((60 % interval) === 0) {
    var currentminute = new Date().getMinutes();
    var nextminutes = 0;
    while (nextminutes <= currentminute) {
      nextminutes += interval;
    }

    var nextinterval = new Date();
    nextinterval.setMinutes(nextminutes);
    nextinterval.setSeconds(0);
    nextinterval.setMilliseconds(0);

    var now = new Date();
    setTimeout(callback, nextinterval.getTime() - now.getTime(), interval);
  }
  else {
    console.log('Error: <' + interval + '> is not a divisible of 60');
  }
}

module.exports = fixedTimeout;