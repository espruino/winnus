var winnus = require("winnus");
var devices = null;
var device = null;
var errorCode = 0;

function connected(data){
  console.log("Got data "+JSON.stringify(data));  
}

errorCode++;
try {
  devices = winnus.getDevices();
  console.log(devices);
  device = devices[0];
  console.log(device);  
} catch (error) {
  console.error(error);
  process.exit(errorCode);  
}

errorCode++;
try {
  console.log("Connect");
  winnus.connect(device, function(data) {
    console.log("Got data "+JSON.stringify(data));
    process.exit(0);
  });  
} catch (error) {
  console.error(error);
  process.exit(errorCode);
}
winnus.write("Hello");

errorCode++;
setTimeout(function() {
  console.error("Timeout");
  try {
    winnus.disconnect();   
  } catch (error) {
    console.error(error);
  }
  process.exit(errorCode);
}, 1000);