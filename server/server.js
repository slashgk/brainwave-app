require('./config/config');

// const _ = require('lodash');
const express = require('express');
const bodyPraser = require('body-parser'); 
const {ObjectID} = require('mongodb');
const moment = require('moment');

var {mongoose} = require('./db/mongoose');
var {Stock} = require('./models/stock');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyPraser.json());

app.post('/stocks', (req, res) => {
    console.log(req.body);
    req.body.date = `ISO(${req.body.date})`;
    var stock = new Stock(req.body);

    stock.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/stocks/',(req, res) => {
    var fromDate = req.query.fromDate;
    var toDate = req.query.toDate;

    if(fromDate&&toDate){
        var fromDate = `ISO(${fromDate})`;
        var toDate = `ISO(${toDate})`;
        console.log(fromDate);

        Stock.find({
            date: {
                $gte: fromDate,
                $lt: toDate
            }
        }).then((stock) => {
            if(!stock){
                console.log('check'); 
                return res.status(404).send();
            }
            res.send({stock});
        }).catch((e) => res.status(400).send());
    }
    else{
        res.status(400).send();
    }
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
})

module.exports = {app};