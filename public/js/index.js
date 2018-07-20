var socket = io();
socket.on('connect',() =>{
    console.log('Connected to Server');
});


socket.on('newMessage', (message) =>{
    console.log('Message from the server',message);
    var li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('disconnect',() => {
    console.log('Disconnected from the server');
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){

    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', () =>{
if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
}
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    },() => {
        alert('Unable to fetch location');
    });
});