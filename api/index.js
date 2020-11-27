require('dotenv').config();

const bodyParser = require('body-parser')
const app = require('express')()
const axios = require('axios');

var slackUrl = process.env.SLACK_YEET_URL;

const Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
   .base(process.env.AIRTABLE_BASE);

app.use(bodyParser.json())
app.post('/letters', (req, res) => {
    var data = req.body;
    var amount = Math.max(data.amount, 0);

    let fields = {
        Name: data.name,
        Amount: amount,
        Status: "Pending",
        Method: data.method,
        "Method Detail": data.methodDetail,
        Notes: data.notes
    };

    function notifySlackAndFinish() {
        axios.post(slackUrl, { text: 'yeet' })
        .then(() => res.send('Ok!'))
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed (Slack)!')
        });
    }

    base('Requests').create(
        [{ fields }], 
        (err, records) => {
            if (err) {
                console.log(err);
                res.status(500).send('Failed (AirTable)!')
            }
            else
                notifySlackAndFinish(records)
        }
    );
})

module.exports = app