
const draw = {};


draw.init = () => {
    
    draw.canvas = new fabric.Canvas('canvas');
    draw.mouseFlag = false;

    // create a rectangle object
    var rect = new fabric.Rect({
    left: 391,
    top: 244,
    fill: 'red',
    width: 20,
    height: 20
    });
    
    // "add" rectangle onto canvas
    draw.canvas.add(rect);

    draw.canvas.on('mouse:down', function(options) {
        if(options.target){
           draw.mouseFlag = true;
        }
    });

    draw.canvas.on('mouse:up', function(options) {
        if(options.target){
           draw.mouseFlag = false;
        }
        draw.canvas.renderAll();
    });

    draw.canvas.on('mouse:move', function(options) {
        if (options.target && draw.mouseFlag) {
        //   console.log('an object was clicked! ', options.target.type);
          console.log(options.e.clientX, options.e.clientY);
        }
    });

    const client = new Paho.MQTT.Client('127.0.0.1', 1883 , "clientId");
    client.connect({onSuccess:onConnect});
}

function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("World");
    message = new Paho.MQTT.Message("Hello");
    message.destinationName = "World";
    client.send(message);
  }

// module.exports = draw