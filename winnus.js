// hello.js
const winnus = require('./build/Release/winnus');

console.log(winnus.getDeviceNames());
var devices = winnus.getDevicePaths();
console.log(devices);
if (devices.length) {
  console.log("Connecting");
  winnus.connect(devices[0].path);
  console.log("Connected");
  winnus.write("LED2.set()\n");
  setTimeout(function() {
    winnus.write("LED2.reset()\n");
  }, 1000);
  setTimeout(function() {
    winnus.disconnect();
  }, 2000);
}
