// Establece conexión son socket
var socket = io();
var label

window.onload = function() {
    label = document.getElementById('lblNuevoTicket');
};

socket.on('connect', function() {
    console.log("Conectado al servidor");
})

socket.on('disconnect', function() {
    console.log("Desconectado del servidor");
})

// evento onclick
function createNewTicket() {

    socket.emit('nextTicket', null, function(ticket) {
        label.textContent = ticket;
    })
}

socket.on('ticketstatus', function(resp) {
    label.textContent = resp.lastTicket
})