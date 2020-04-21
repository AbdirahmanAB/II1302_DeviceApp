var iotf = require("ibmiotf");
const axios = require('axios');
var EventEmitter = require('events');

class Application extends EventEmitter {
  constructor(org, key, token) {
    /* Call super to define this. */
    super();
    
    /* that is used to access this in other scopes below this one. */
    var that = this;
    
    /* This is our config for Watson IoT! */
    const app_config = {
      "org": org,
      "id": "0",
      "domain": "internetofthings.ibmcloud.com",
      "auth-key": key,
      "auth-token": token
    };
    
    /* Application (Your front-end) */
    this.app_client = new iotf.IotfApplication(app_config);
    this.app_client.connect();

    /* When your application has connected, setup listeners and callbacks. */
    this.app_client.on("connect", function () {
      console.log("Connected the application.");
      
      /* Subscribe to all getCurrrentMessage event from all devices*/
      that.app_client.subscribeToDeviceEvents("+", "+", "getCurrentMessage");
      
      /* On a data recieved, emit event. */
      that.app_client.on("deviceEvent", async function (deviceType, deviceId, eventType, format, payload) {
        that.emit('Device requests message', deviceType, deviceId);
      });
    });
  }

  async pushMessage(deviceType, deviceID){
    try {
      const url = 'https://iot-display.herokuapp.com/display/get/5e8c8382c5c0f600242851f4';
      const response = await axios.get(url);
      var myData = response.data.display.message.text;
      myData = JSON.stringify(myData);
      this.app_client.publishDeviceCommand(deviceType, deviceID, "currentMessage", "json", myData);
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = Application;






