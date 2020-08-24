const express = require('express');
const cors =  require('cors')
const routes =  require('./routes/routes');
const path = require('path')

const localStorage = require('./storage')
const morgan = require('morgan')

const socket = require('socket.io')
const http =  require('http')

const mongoose =  require('mongoose');
const { connected } = require('process');
const app = express();
const server = http.Server(app)
const io = socket(server)

// mongoose.connect('mongodb+srv://ad_aircnc:rocket2019@tindev-0sp8v.mongodb.net/bd_aircnc?retryWrites=true&w=majority',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })
mongoose.connect('mongodb://localhost:27017',{
    dbName:'Aircnc',
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const connectedUsers = {}
io.on('connection', socket => {
    const { user_id } = socket.handshake.query
    connectedUsers[user_id] = socket.id
    localStorage.setItem('users', JSON.stringify(connectedUsers))
})
app.use((req, res, next) => {
    try {
        req.io = io
        req.connectedUsers = localStorage.getItem('users')
        next()
    }
    catch (err) {
        console.log(err)
    }
})
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))  
app.use('/v1/api',routes);
app.use('/v1/api/files',express.static(path.resolve(__dirname,'..','uploads')))
// req.params para router params

server.listen(3333, err => {
    if(err){
       console.log(err.message)
        return;
    }
    console.log('servidor rodando na http://localhost:3333/v1/api')
});
