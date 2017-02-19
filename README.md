# winnus

Windows NUS BLE (winnus) gives Bluetooth LE Nordic UART for Node.js on Windows, using Windows BLE APIs

Created for the [Espruino and Puck.js](http://www.espruino.com) and Windows versions that support Windows BLE API's (8.1 and above).

## Usage

```
var winnus = require("winnus");

var device = winnus.getDevices()[0];
winnus.connect(device, function(data) {
  console.log("Got data "+JSON.stringify(data));
});
winnus.write("Hello\r");
setTimeout(function() {
  winnus.disconnect();
}, 1000);
```

## Developement

Please start with:
- the puck.js, a Nordic Semiconductor device.
- [Visual C++ 2015 Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools) 
- [Python 2.7](https://www.python.org/downloads/):
- [git](https://git-scm.com/)

Clone this repository, then use the simple node example as a start.

Sucess is indicated by finding an advertisement and Got data, for example:

```
winnus\examples\hellowinnusnode>node hellowinnus.js
[ { name: 'Puck.js 431b',
    address: 'df:f5:a5:ec:43:1b',
    path: '\\\\?\\bthledevice#{6e400001-b5a3-f393-e0a9-e50e24dcca9e}_dff5a5ec431b#8&17558516&0&000b#{6e400001-b5a3-f393-e0a9-e50e24dcca9e}' } ]
{ name: 'Puck.js 431b',
  address: 'df:f5:a5:ec:43:1b',
  path: '\\\\?\\bthledevice#{6e400001-b5a3-f393-e0a9-e50e24dcca9e}_dff5a5ec431b#8&17558516&0&000b#{6e400001-b5a3-f393-e0a9-e50e24dcca9e}' }
Connect
Got data "Hello\r\nUncaught Refe"
```
