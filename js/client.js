const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messsageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('samsung-s10-spaceline-notification-54088.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }

}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messsageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messsageInput.value = ''
})

const name = prompt("Enter your Name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat `, 'right')
})

socket.on('recieve', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name =>{
    append(`${name} left the chat`, 'left')
})