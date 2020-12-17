const socket = io();

socket.on('message', (message) => {
  console.log(`Message Received:`, message)
})
socket.on('pending_request', (message) => {
  console.log(`Pending Request:`, message)
})
socket.on('chat_accepted', (message) => {
  console.log(`Chat Accepted:`, message)
})
socket.on('chat_rejected', (message) => {
  console.log(`Chat Rejected:`, message)
})
// Add User event
// socket.emit('add_user', {user_id: 3, is_astrologer: false },(error, info)=> {if(error){ alert(error)}else{ console.log(info)} })

// Request chat event
// socket.emit('request_chat', {customer_id: 2, astrologer_id: 1 },(error, info)=> {if(error){ console.log(error)}else{ console.log(info)} })

// Accept Chat Request
// socket.emit('accept_chat', {room_id: "5f551ed930462766abc45468" },(error, info)=> {if(error){ console.log(error)}else{ console.log(info)} })

// Reject Chat Request
// socket.emit('reject_chat', {customer_id: 2, astrologer_id: 1 },(error, info)=> {if(error){ console.log(error)}else{ console.log(info)} })

// Join Room Event
// socket.emit('join', {room_id: "5f551ed930462766abc45468" },(error, info)=> {if(error){ console.log(error)}else{ console.log(info)} })

// Send Message
// { room_id: "5f551ed930462766abc45468", sender_id: 2, receiver_id: 1, message_text: 'I need help!' }