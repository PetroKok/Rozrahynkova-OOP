let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let log4js = require('log4js');
let sugar = require('sugar');
let fs = require('fs');
let logger = log4js.getLogger();
let port = 3000;

class Server
    {
        constructor()
        {
            let sum = 10;
        }

        static sendToConsole(arr)
        {
            console.log("Socket emit: ");
            console.log(arr);
        }

         static generateArr(arr)
            {
                let sum = 10;
                console.log("Socket on: ");
                console.log(arr);

                    if(arr[0][2] === null)
                    {
                        arr[0][2] = sum - arr[0][0] - arr[0][1];
                        arr[1][2] = sum - arr[0][2] - arr[2][2];
                        arr[1][1] = sum - arr[1][0] - arr[1][2];
                        arr[2][1] = sum - arr[2][2] - arr[2][0];
                    } else if(arr[0][0] === null)
                    {
                        arr[0][0] = sum - arr[2][0] - arr[1][0];
                        arr[1][2] = sum - arr[0][2] - arr[2][2];
                        arr[0][1] = sum - arr[0][0] - arr[0][2];
                        arr[1][1] =  sum - arr[0][1] - arr[2][1];
                    } else if(arr[2][0] === null)
                    {
                        arr[0][1] = sum - arr[0][0] - arr[0][2];
                        arr[1][1] = sum - arr[0][1] - arr[2][1];
                        arr[1][0] =  sum - arr[1][1] - arr[1][2];
                        arr[2][0] = sum - arr[1][0] - arr[0][0];
                    } else if(arr[2][2] === null)
                    {
                        arr[1][0] = sum - arr[0][0] - arr[2][0];
                        arr[1][1] = sum - arr[1][0] - arr[1][2];
                        arr[2][2] = sum - arr[0][2] - arr[1][2];
                        arr[2][1] = sum - arr[2][0] - arr[2][2];
                    }

            }
    }

io.on('connection', (socket)=>
    {
        socket.on('generate', (arr)=>
        {
            Server.generateArr(arr);
            Server.sendToConsole(arr);
            socket.emit('sendArr', arr);
        });
    });

app.use(express.static(__dirname + '/public'));
server.listen(port, ()=>
    {
        console.log("Server is running on " + port);
    });
