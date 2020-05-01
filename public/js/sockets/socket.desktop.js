// Establece conexión son socket
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error('Desk is required!');
};

var desk = searchParams.get('desk')

document.querySelector('h1').innerHTML = `Escritorio ${desk}`

document.querySelector('button').addEventListener("click", function() {
    var mysmall = document.querySelector('small')

    socket.emit('attendTicket', {
        desk: desk
    }, function(resp) {
        if (resp === 'No hay tickets') {
            alert(resp)
            mysmall.innerHTML = resp
            return
        }
        mysmall.innerHTML = resp.number
    })
});