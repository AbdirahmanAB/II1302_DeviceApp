exports.allDevices = {
    url: 'https://cl3hm5.internetofthings.ibmcloud.com/api/v0002/bulk/devices?_limit=25',
    auth: {
        'username': 'a-cl3hm5-kuvpyv8zmp',
        'password': 'DjhvwofU*M6BtvJXL8'
    }
  };
  
 exports.addDevice =  {
    url: 'https://cl3hm5.internetofthings.ibmcloud.com/api/v0002/device/types/IBM-KTH/devices',
    method: 'post',
    auth: {
        'username': 'a-cl3hm5-kuvpyv8zmp',
        'password': 'DjhvwofU*M6BtvJXL8'
    },
    data: {
        "deviceId": "",
        "authToken": "DjhvwofU*M6BtvJXL8",
        "deviceInfo": {
          "serialNumber": "",
          "manufacturer": "",
          "model": "",
          "deviceClass": "",
          "description": "",
          "fwVersion": "",
          "hwVersion": "",
          "descriptiveLocation": ""
        },
        "location": {
          "longitude": 0,
          "latitude": 0,
          "elevation": 0,
          "accuracy": 0,
          "measuredDateTime": ""
        },
        "metadata": {}
      }
  };
  
exports.deleteDevice = {
    url: 'https://cl3hm5.internetofthings.ibmcloud.com/api/v0002/device/types/IBM-KTH/devices',
    method: 'delete',
    auth: {
        'username': 'a-cl3hm5-kuvpyv8zmp',
        'password': 'DjhvwofU*M6BtvJXL8'
    }
  };
