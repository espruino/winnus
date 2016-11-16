const winnus = require('./build/Release/winnus');
var rxInterval;
var rxCallback;

exports.getDevices = function() {
  // Merge the 2 sets of data we have
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
};
exports.connect = function(device, dataCallback) {
  rxCallback = dataCallback;
  winnus.connect(device.path);
  rxInterval = setInterval(function() {
    var d = winnus.read();
    while (d !== undefined) {
      if (rxCallback) rxCallback(d);
      d = winnus.read();
    }
  }, 50);
};
exports.write = function(data) {
  winnus.write(data);
};
exports.disconnect = function(device) {
  if (rxInterval) {
    clearInterval(rxInterval);
    rxInterval=undefined;
  }
  rxCallback = undefined;
  winnus.disconnect()
};
