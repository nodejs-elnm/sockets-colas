const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketcontrol = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        callback(ticketcontrol.getNextTicket());
    })

    client.emit('ticketstatus', {
        lastTicket: ticketcontrol.getLastTicket(),
        last4tickets: ticketcontrol.getLast4tickets()
    })

    client.on('attendTicket', (data, callback) => {
        if (!data.desk) {
            return callback({
                err: true,
                msg: 'desk is required'
            })
        }

        callback(ticketcontrol.attendTicket(data.desk))

        client.broadcast.emit('last4Tickets', {
            last4tickets: ticketcontrol.getLast4tickets()
        })
    })

});