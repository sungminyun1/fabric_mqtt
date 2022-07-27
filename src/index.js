


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
        //    draw.interval = setInterval(()=>{
        //         draw.ws.send(`${options.e.clientX} ${options.e.clientY}`)
        //    },500)
        }
    });

    draw.canvas.on('mouse:up', function(options) {
        if(options.target){
           draw.mouseFlag = false;
        //    clearInterval(draw.interval)
        }
        // draw.canvas.renderAll();
    });

    draw.canvas.on('mouse:move', function(options) {
        if (options.target && draw.mouseFlag) {
        //   console.log('an object was clicked! ', options.target.type);
        //   console.log(options.e.clientX, options.e.clientY);
        draw.ws.send(`${options.e.clientX} ${options.e.clientY}`)
        }
    });

    draw.ws = new WebSocket("ws://localhost:30001");

    document.getElementById("cli2").onclick = function(){
        draw.ws.onmessage = function (event) {
            // console.log(`서버 웹소켓에게 받은 데이터: ${JSON.stringify(event.data)}`);
            const [x,y] = event.data.split(' ').map(Number)
            console.log(x,y)
            draw.canvas._objects[0].set({ left: x, top: y });
            draw.canvas.renderAll();
        }
    }
}