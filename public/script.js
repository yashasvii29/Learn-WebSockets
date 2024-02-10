// client ka code script.js file m likhenge
const socket = io();
// send-btn is a id of send button and inp is a if of textarea
// $ is used for evaluate..means to solve the expression
$('#send-btn').on('click',()=>{  // send btn pr click event lagaya hai
    const msgText = $('#inp').val(); // textarea m jo msg likha hai vo msgText var m assign ho jayega then we can console it 
    // chat app se jo msg send kr rhe hai wo display hoga console pr
    // console.log(msgText);
    // socket.emit() fun is used to send the from client side to server side or from server to client side
    socket.emit('send-msg',{
        msg:msgText  //client side se  msg toh bhej diya ...ab y server side pr receive hoga toh index.js file m event ko listen krenge
    })
    $('#inp').val("");  // isse textarea empty ho jayega after sending the message 


    // received-msg ia a event and hum event ka name kuch bhi de sakte hai
    socket.on('received-msg',(data)=>{   // server side se jo received-msg client side pr emit kiya hai (means bheja hai)  use listen krenge by using socket.on()
        console.log(data);
        $('#chat').append(`<li class="border mb-2 p-2 rounded-pill"><span class="fw-bold">${data.id}:</span>->${data.msg}</li>`)  // ul ke andar uss msg ko append kr rhe hai
    })
})