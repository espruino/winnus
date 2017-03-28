const winnus = require('./build/Release/winnus');
var rxInterval;
var rxCallback;

exports.getDevices = function() {
  // Merge the 2 sets of data we have
  var names = winnus.getDeviceNames();
  var paths = winnus.getDevicePaths();
  var devices = [];
  if (typeof paths[0] === 'undefined') {
    throw new Error("DevicePaths");
  }  
  paths.forEach(function(path) {
    var found;
    names.forEach(function(name) {
      name.mac = name.addr.substr(-12);
      if (path.path.indexOf(name.mac)>=0)
        found = name;
    });
    if (found) {
      var mac = "";
      for (var i=0;i<found.mac.length;i+=2) {
        if (i) mac+=":";
        mac+=found.mac.substr(i,2);
      }
      devices.push({
        name : found.name,
        address : mac,
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
  winnus.disconnect();
};
