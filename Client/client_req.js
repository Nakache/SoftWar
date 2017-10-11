var zmq = require('zmq') 
    , sock = zmq.socket('req');


// var commands = {
//     "forward":"",
//     "backward":"",
//     "leftfwd":"",
//     "rightfwd":"",
//     "right":"",
//     "left":"",
//     "looking":"",
//     "gather":"",
//     "watch":"",
//     "attack":"",
//     "selfid":"",
//     "selfstats":"",
//     "inspect":"#0x01",
//     "next":"",
//     "jump":"",
//     "identify":"#0x1"
// };

var commands = {
    "identify":"#0x1",
    "identify":"#0x2",
    "identify":"#0x3",
    "identify":"#0x4"
};


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

for (var i = 0; i < 10; i++) {
    var rdk = randomKey(commands);
    console.log("Sending request", i, '…');
    sock.send(rdk+"|"+commands[rdk]);
}

// function myFunction() {
//     setTimeout(function(){ 
//         var rdk = randomKey(commands);
//         console.log("Sending request…");
//         sock.send(rdk+"|"+commands[rdk]);
//         myFunction(); 
//     }, 1000);
// }
// myFunction();

process.on('SIGINT', function() {
	sock.close();
	});