// client ka code script.js file m likhenge
const socket = io();
// send-btn is a id of send button and inp is a if of textarea
// $ is used for evaluate..means to solve the expression
$('#chat-box').hide();
// chat-box ko hide kr diya hai by using hide class bcz jab tak user login nhi krega he cannot see chatting app...he cannot text to someone
$('#send-btn').on('click',()=>{  // send btn pr click event lagaya hai
    const msgText = $('#inp').val(); // textarea m jo msg likha hai vo msgText var m assign ho jayega then we can console it 
    // chat app se jo msg send kr rhe hai wo display hoga console pr
    // console.log(msgText);
    // socket.emit() fun is used to send the from client side to server side or from server to client side
    if(!msgText){
        return ;
    }
    else{
        socket.emit('send-msg',{
            msg:msgText  //client side se  msg toh bhej diya ...ab y server side pr receive hoga toh index.js file m event ko listen krenge
        })
    }
   
    $('#inp').val("");  // isse textarea empty ho jayega after sending the message 


    // received-msg ia a event and hum event ka name kuch bhi de sakte hai
    socket.on('received-msg',(data)=>{   // server side se jo received-msg client side pr emit kiya hai (means bheja hai)  use listen krenge by using socket.on()
        console.log(data);
        $('#chat').append(`<li class="border mb-2 p-2 rounded-pill"><span class="fw-bold">${data.username}:</span>->${data.msg}</li>`)  // ul ke andar uss msg ko append kr rhe hai
    })
})

// socket.id ke place pr user ka name aana chhaiye jisne login kiya hai 
$('#login-btn').on('click',()=>{
    console.log('clicked');
    const username = $('#username').val();
    socket.emit('login',{  // client se server pr login event bhej rhe hai
        username:username
    })
    $('#login').hide();
    $('#chat-box').show();
    $('#username').val("");
})