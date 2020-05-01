const fs = require('fs')

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}


class TicketControl {

    constructor() {

        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4tickets = []

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last
            this.tickets = data.tickets
            this.last4tickets = data.last4tickets
        } else {
            this.rebootCounts();
        }
    }

    getNextTicket() {
        this.last += 1;
        this.tickets.push(new Ticket(this.last, null))

        this.saveFile();

        return `Ticket ${ this.last }`
    }

    getLastTicket() {
        return `Ticket ${ this.last }`
    }

    getLast4tickets() {
        return this.last4tickets
    }

    saveFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4tickets: this.last4tickets
        };

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData))
    }

    rebootCounts() {
        this.last = 0
        this.tickets = [];
        this.last4tickets = [];
        this.saveFile();
    }

    attendTicket(desk) {
        if (this.tickets.length === 0) {
            return 'No hay tickets'
        }

        let numTicket = this.tickets.shift();

        let attendTicket = new Ticket(numTicket.number, desk);
        this.last4tickets.unshift(attendTicket)

        if (this.last4tickets.length > 4) {
            this.last4tickets.pop()
        }

        this.saveFile();

        return attendTicket;
    }

}


module.exports = {
    TicketControl
}