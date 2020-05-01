// Establece conexión son socket
var socket = io();

var lblTicket1 = document.getElementById('lblTicket1')
var lblTicket2 = document.getElementById('lblTicket2')
var lblTicket3 = document.getElementById('lblTicket3')
var lblTicket4 = document.getElementById('lblTicket4')
var lblTickes = [lblTicket1, lblTicket2, lblTicket3, lblTicket4]

var lblDesk1 = document.getElementById('lblEscritorio1')
var lblDesk2 = document.getElementById('lblEscritorio2')
var lblDesk3 = document.getElementById('lblEscritorio3')
var lblDesk4 = document.getElementById('lblEscritorio4')
var lblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4]

function updateHTML(last4) {
    for (let i = 0; i < last4.length; i++) {

        lblTickes[i].innerHTML = `Ticket ${last4[i].number}`
        lblDesks[i].innerHTML = `Ticket ${last4[i].desk}`

    }
}

socket.on('ticketstatus', function(data) {
    updateHTML(data.last4tickets)
})

socket.on('last4Tickets', function(data) {
    var audio = new Audio('audio/new-ticket.mp3')
    audio.play()

    updateHTML(data.last4tickets)
})