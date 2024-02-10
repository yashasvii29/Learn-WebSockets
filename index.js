const express =  require('express');
const app = express();
// socket ko integrate krne ke liye(means use krne ke liye) http server ki need hoti hai so we will require this http
const http = require('http');
// after that we will create a http server using http module
const server = http.createServer(app); // request listener...req is listen by app
// go to the documentation nodejs => docs => http ....now http has many methods we can see in this docs

// if we want to work with socket then we will install this library=> npm insatll socket.io then require in the index.js file
// socket has 2 parts => 1. which works on the server and 2. which works on the client
// socket ko integrate krne ke liye(means use krne ke liye) http server ki need hoti hai so we will require this http and after that we will create a http server

const path = require('path');
const socketio = require('socket.io');
const io = socketio(server);   // io is an object(which stands for input output) which has many methods like io.on() =>  it establsih a connection and accept the event
// socketio fun ke andar http server pass kr rhe hai and it will create a websocket server
app.use('/', express.static(path.join(__dirname,'public')));
// jab hum root route pr req send krenge means localhost:8080 pr req send krnege toh index.html file render hogi

// io ka connection ko establish krne ke liye we will use io.on() method which accepts two arguments connection and callback function
io.on('connection',(socket)=>{
    console.log(`connection established at ${socket.id} `);
    // socket.on() fun is used to listen the event
    socket.on('send-msg',(data)=>{   // listen to some event(client ke msg ko receive krenge)
        // event ko listen kr rhe hai means client side se jo msg aaya hai use server side pr receive kr rhe hai and msg ko as a data callback fun m pass kiya hai (jo msg aaya hai client side se)
        // console.log(data);
        // socket.emit('received-msg',{  //server ne jo msg received kiya hai from client side uss received msg ko again client side pr emit means bhej rhe hai...bcz client ne jo msg send kiya hai wo use bhi show hona chahiye(client ko bhi)
            // received msg ko means uske data ko again client side pr(emit means send kr rhe hai) bhej rhe hai means  script.js file  m data ko again receive krenge
            // io.emit() is used to show the message to both client and server 
            io.emit('received-msg',{ 
            msg: data.msg,
            id:socket.id

        })
    })  
})








const port = process.env.PORT || 8080;
server.listen(port, () => 
        console.log(`Server connected at port ${port}`)
    );




// localhost:8080/socket.io/socket.io.js  => iss url pr req send krne se client side ki file aa jayegi jo server lakar de rha hai and we can use that code in our app
// so we will include this path in the index.html file
