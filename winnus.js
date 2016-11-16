// hello.js
const winnus = require('./build/Release/winnus');

/// Merge the 2 sets of data we have
function getDevices() {
  var names = winnus.getDeviceNames();
  var paths = winnus.getDevicePaths();
  var devices = [];
  paths.forEach(function(path) {
    var found;
    names.forEach(function(name) {
      name.mac = name.addr.substr(-12);
      if (path.path.indexOf(name.mac)>=0)
        found = name;
    });
    if (found) {
      devices.push({
        name : found.name,
        address : found.mac,
        path : path.path
      });
    }
  });
  return devices;
}

var devices = getDevices();
console.log(devices);

if (devices.length) {
  console.log("Connecting");
  winnus.connect(devices[0].path);
  var rxInterval = setInterval(function() {
    var d = winnus.read();
    while (d !== undefined) {
      console.log("RX>"+JSON.stringify(d));
      d = winnus.read();
    }
  }, 50);
  console.log("Connected");
  winnus.write("LED2.set()\n");
  setTimeout(function() {
    winnus.write("LED2.reset()\n");
  }, 1000);
  setTimeout(function() {
    console.log("Disconnecting");
    winnus.disconnect();
    clearInterval(rxInterval);
    console.log("Done!");
  }, 2000);
}
