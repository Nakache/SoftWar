var zmq = require('zmq') 
    , sock = zmq.socket('req');


var commands = {
    "forward":"",
    "backward":"",
    "leftfwd":"",
    "rightfwd":"",
    "right":"",
    "left":"",
    "looking":"",
    "gather":"",
    "watch":"",
    "attack":"",
    "selfid":"",
    "selfstats":"",
    "inspect":"",
    "next":"",
    "jump":"",
    "identify":""
};



function randomid(){
    var txt = "#0x";
    var nbr = Math.floor(Math.random() * 100000) + 1
    return txt+nbr;
}

function randomKey(obj) {
    var ret;
    var c = 0;
    for (var key in obj)
        if (Math.random() < 1/++c)
        ret = key;
    return ret;
}

//console.log(rdk+":"+commands[rdk]);

//console.log(commands[Math.floor(Math.random() * 15) + 0  ]);
var x = 0;
sock.connect("tcp://localhost:5555");
sock.on("message", function(reply) {
    console.log("Received reply", x, ": [", reply.toString(), ']');
    x += 1;
    if (x === 10) {
        sock.close();
        process.exit(0);
    }
});

console.log("Sending 10 request...");
for (var i = 0; i < 10; i++) {
    var rdk = randomKey(commands);
    if (rdk == "identify" || rdk == "inspect") {
        sock.send(rdk+"|"+randomid());
    } else {
        sock.send(rdk+"|"+commands[rdk]);
    };
}

process.on('SIGINT', function() {
    sock.close();
    });