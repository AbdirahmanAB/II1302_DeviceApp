var express = require('express');
var app = express();
var http = require('http').Server(app);
var cfenv = require('cfenv');
var IoTApp  = require('./application/application.js');

/* Variables for running server local */
//var org = "cl3hm5";
//var apiKey = "a-cl3hm5-kuvpyv8zmp";
//var apiToken = "DjhvwofU*M6BtvJXL8";

/* 
  Get the app environment from Cloud Foundry,
  if you are developing locally (VCAP_SERVICES environment variable not set),
  cfenv will use the file defined by vcapFile instead.
  You can export these local json files from IBM Cloud!
*/
var app_env = cfenv.getAppEnv();
const IOT_PLATFORM = "Internet of Things Platform - Test";

/* Retrieve Cloud Foundry environment variables. */
var credentials = app_env.getServiceCreds(IOT_PLATFORM);
var application = new IoTApp(credentials.org, credentials.apiKey, credentials.apiToken);

/* Only when running local*/
//var application = new IoTApp(org, apiKey, apiToken);

/* Listen for a request message event and push new message to device */
application.on('Device requests message', async function(deviceType, deviceID) {
  application.pushMessage(deviceType, deviceID);
});

/* Start server on the specified port and binding host app_env.port */
http.listen(app_env.port || 4096, function() {});
