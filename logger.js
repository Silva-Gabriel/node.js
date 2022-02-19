const EventEmissor = require('events')
const fs = require('fs')
const path = require('path')

const emissor = new EventEmissor()

emissor.on('log',(message) => {
    fs.appendFile(path.join(__dirname, './log.txt'),message,err => {
        if(err) throw err
    })
})

function log(message){
    emissor.emit('log',message)
}

module.exports = log