// hello.js
const winnus = require('./build/Release/winnus');

console.log(winnus.getDeviceNames());
var devices = winnus.getDevicePaths();
console.log(devices);
if (devices.length) {
  console.log("Connecting");
  winnus.connect(devices[0].path);
  console.log("Connected");
}
