const express = require('express');
const path = require('path');
const app = express();
const { setupLogging } = require('./utils/logging')
const { send_mail } = require('./utils/mail');
require('dotenv').config();

const post = process.env.PORT 

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files


setupLogging(app)

app.get('/', function (req, res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.post('/send-email', send_mail);


app.listen(post, () =>{
    console.log(`Server running on http://localhost:${post}/`);
})