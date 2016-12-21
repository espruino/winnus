winnus
======

Nordic UART for Windows, using Windows BLE APIs

Created for the [Espruino and Puck.js](http://www.espruino.com)

Usage:

```
var winnus = require("winnus");

var device = winnus.getDevices()[0];
winnus.connect(device, function(data) {
  console.log("Got data "+JSON.stringify(data));
});
winnus.write("Hello");
setTimeout(function() {
  winnus.disconnect();
}, 1000);
```
