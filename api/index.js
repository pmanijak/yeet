require('dotenv').config();

const bodyParser = require('body-parser')
const app = require('express')()
const axios = require('axios');

var slackUrl = process.env.SLACK_YEET_URL;

app.use(bodyParser.json())
app.post('/letters', (req, res) => {
    var data = req.body;
    axios.post(slackUrl, { text: 'yeet' })
        .then(() => res.send('Ok!'))
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed!')
        });
})

module.exports = app