const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())
app.post('/letters', (req, res) => {
    var data = req.body;
    console.log(data.name);
    res.send('ok!');
})

module.exports = app