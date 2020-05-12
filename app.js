/*var express = require('express');
var app = express();
var http = require('http').Server(app);*/
const server = require('./server.js')
var http = require('http').Server(server);
var cfenv = require('cfenv');
var IoTApp  = require('./application/application.js');

/* Variables for running server local */
var org = "cl3hm5";
var apiKey = "a-cl3hm5-kuvpyv8zmp";
var apiToken = "DjhvwofU*M6BtvJXL8";

/* 
  Get the app environment from Cloud Foundry,
  if you are developing locally (VCAP_SERVICES environment variable not set),
  cfenv will use the file defined by vcapFile instead.
  You can export these local json files from IBM Cloud!
*/
var app_env = cfenv.getAppEnv();
const IOT_PLATFORM = "Internet of Things Platform - Test";

/* Retrieve Cloud Foundry environment variables. */
/*var credentials = app_env.getServiceCreds(IOT_PLATFORM);
var application = new IoTApp(credentials.org, credentials.apiKey, credentials.apiToken);*/

/* Only when running local*/
var application = new IoTApp(org, apiKey, apiToken);


/* Listen for a request message event and push new message to device */
application.on('Device requests message', async function(deviceType, deviceID) {
  const url = 'https://iot-display.herokuapp.com/display/get/5e8c8382c5c0f600242851f4';

  /*application.fet(url)
  .then(data => JSON.stringify(data))
  .then(data => application.pushMessage(data, deviceType, deviceID)).catch(console.error);*/
  application.forwardMessage(url, deviceType, deviceID);
});

/* Start server on the specified port and binding host app_env.port */
//http.listen(app_env.port || 4096, function() {});
server.listen(3000, () => {
  console.log("Server running on port 3000");
 });
 // // start server on the specified port and binding host
/*server.listen(app_env.port, '0.0.0.0', function() {

//  // print a message when the server starts listening
 console.log("server starting on " + app_env.url);
});*/