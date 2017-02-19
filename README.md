# winnus

Windows NUS BLE (winnus) gives Bluetooth LE Nordic UART for Node.js on Windows, using Windows BLE APIs

Created for the [Espruino and Puck.js](http://www.espruino.com) for Windows versions that support Windows BLE API's (8.1 and above).

## Usage

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

## Developement

Please start with a Nordic Semiconductor device, the puck.js and:

- git clone the repository
- npm install
- node hello.js

Sucess is indicated by finding an advertisement and Got data "Hello", for example:

```
[ { name: 'Puck.js 431b',
    address: 'df:f5:a5:ec:43:1b',
    path: '\\\\?\\bthledevice#{6e400001-b5a3-f393-e0a9-e50e24dcca9e}_dff5a5ec431b#8&17558516&0&000b#{6e400001-b5a3-f393-e0a9-e50e24dcca9e}' } ]
{ name: 'Puck.js 431b',
  address: 'df:f5:a5:ec:43:1b',
  path: '\\\\?\\bthledevice#{6e400001-b5a3-f393-e0a9-e50e24dcca9e}_dff5a5ec431b#8&17558516&0&000b#{6e400001-b5a3-f393-e0a9-e50e24dcca9e}' }
Connect
Got data "Hello"
```
