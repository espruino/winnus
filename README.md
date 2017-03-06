# winnus

Windows NUS BLE (winnus) gives access to the Nordic Semiconductor UART Service Bluetooth Low Energy  for Node.js on Windows, using Windows BLE APIs (Windows 8.1 and above).

Created for the [Espruino and Puck.js](http://www.espruino.com).

## Usage

```bash
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

- the [puck.js](http://www.espruino.com/Puck.js), a Nordic Semiconductor Bluetooth Low Energy device.
- [Visual C++ 2015 Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools)
- [Python 2.7](https://www.python.org/downloads/):
- [git](https://git-scm.com/)
- [node](https://nodejs.org/en/)

Clone this repository, then use the simple node example as a start.

Sucess is indicated by finding an advertisement and Got data, for example:

```bash
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
