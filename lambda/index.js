var AWS = require("aws-sdk");
const request = require('superagent');

AWS.config.update({
  region: "eu-west-2",
  endpoint: "dynamodb.eu-west-2.amazonaws.com"
});

exports.handler = (event, context, callback) => {
    read();
    //warning email
    //replace null with   'CR UK TFD RM_PX_G.2.1'
    getCalendar(process.env.MS_ACCESS_TOKEN, '', function (err, res){
      if(!err){
        var myobject = data.text;
        for(var attributename in myobject){
          console.log(attributename+": "+myobject[attributename]);
        }
      } else {
        console.log(err);
      }
    });
    // not withing 15
    //cancel

    callback(null, 'Hello from Lambda');
};

function read(){
    var docClient = new AWS.DynamoDB.DocumentClient()

    var table = "motionpi-rooms";

    var roomID = "2.2";
    var params = {
        TableName: table,
        Key:{
            "room_id": roomID
        }
    };
    console.log("getting date of room");
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            console.log(data.Item.message_data.detect_dt);
        }
    });
}

function getCalendar(accessToken, calName, callback){
  request
   .get('https://graph.microsoft.com/v1.0/me/events?$select=subject,organizer,start,end')
   .set('Authorization', 'Bearer ' + accessToken)
   .end((err, res) => {
     //console.log(res);
     callback(err, res);
   });
}
