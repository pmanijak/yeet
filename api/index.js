require('dotenv').config();

const bodyParser = require('body-parser')
const app = require('express')()
const axios = require('axios');

const slackUrl = process.env.SLACK_YEET_URL;
const maxAmount = 50;

const Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
   .base(process.env.AIRTABLE_BASE);

app.use(bodyParser.json())
app.post('/letters', (req, res) => {
    var data = req.body;
    var amount = Math.max(data.amount, 0);
    amount = Math.min(amount, maxAmount);

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
});

app.get('/summary', (req, res) => {
    var requestsAmountSum = 0;
    base('Requests')
    .select({
        view: 'Grid view',
        fields: ['Amount']
    })
    .eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            requestsAmountSum += record.get('Amount');
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    }, 
    function done(err) {
        if (err) { 
            console.error(err); 
            res.status(500).send('Failed! (AirTable)')
        }
        else {
            let budget = parseInt(process.env.BUDGET) || 0;
            res.send({
                budget,
                available: Math.max(0, budget - requestsAmountSum)
            });
        }
    });
});

module.exports = app