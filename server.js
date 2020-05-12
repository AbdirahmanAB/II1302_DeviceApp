const axios = require('axios');
var express = require('express');
var app = express();
var conf = require('./serverConfig.js');
var bodyParser = require('body-parser');

async function apiCall(destination){
    let myData;
    try {
      const response = await axios.request(destination);
      myData = response.data.results;
    } catch (error) {
      console.error(error);
    }
    return myData;
  };

  /*async function allDevices(config) {
    const data = await apiCall(config);
    //Disect the information
    let devices = data.map(device => ({
      deviceId: device.deviceId, created: device.registration.date}));
      console.log(devices)

    app.get('/devices', (req, res) => {  
      res.status(200).send({
        success: 'true',
        information: 'All devices currently registered',
        result: devices
      })
    });
  }allDevices(conf.allDevices);*/

async function allDevices(req, res, next) {
  const data = await apiCall(conf.allDevices);
  //Disect the information
  let devices = data.map(device => ({
    deviceId: device.deviceId, created: device.registration.date}));

    res.status(200).send({
      success: 'true',
      information: 'All devices currently registered',
      result: devices
    })
};
app.get('/devices', allDevices);
 
  // Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*function updateAddConfig(deviceID, prevConfig){
  // change deviceId in configuration to the new deviceID 
  prevConfig.data.deviceId = deviceID;
  let newConfig = prevConfig;
  return newConfig;
}
function addDevice(config){
  app.post('/devices', (req,res) => {
    let deviceID = req.body.deviceID;
    let axiosConfig = updateAddConfig(deviceID, config);
    axios.request(axiosConfig);
    res.status(201).send({
      success: 'true',
      information: 'Added device ' + deviceID
    });
  });
}addDevice(conf.addDevice);*/

function updateAddConfig(req, res, next){
  let deviceID = req.body.deviceID;
  let newConfig = {...conf.addDevice};
  // change deviceId in configuration to the new deviceID 
  newConfig.data.deviceId = deviceID;
  req.addConfig = newConfig;
  next();
};
function addDevice(req, res, next){
  axios.request(req.addConfig);
  res.status(201).send({
    success: 'true',
    information: 'Added device ' + req.body.deviceID
  });
};
app.post('/devices', updateAddConfig, addDevice);

/*function updateDeleteConfig(deviceID, prevConfig){
  prevConfig.url = prevConfig.url + "/" + deviceID;
  let newConfig = prevConfig;
  return newConfig;
}
function deleteDevice(config){
  app.delete('/devices/:deviceID', (req,res)=> {
    let device = req.params.deviceID;
    let axiosConfig = updateDeleteConfig(device, config);
    axios.request(axiosConfig);
    res.status(200).send({
      success: 'true',
      information: 'Succesfully deleted device: ' + device
    });
  });
}deleteDevice(conf.deleteDevice);*/

function updateDeleteConfig(req, res, next){
  let device = req.params.deviceID;
  let newConfig = {...conf.deleteDevice};
  newConfig.url = newConfig.url + "/" + device;
  req.deleteConfig = newConfig;
  next();
}
function deleteDevice(req, res, next){
  axios.request(req.deleteConfig);
  res.status(200).send({
    success: 'true',
    information: 'Succesfully deleted device: ' + req.params.deviceID
  });
}
app.delete('/devices/:deviceID', updateDeleteConfig, deleteDevice);

module.exports = app