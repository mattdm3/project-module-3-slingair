'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;


const { showReservation, checkReservation, confirmSeat, sendConfirmation, confirmReservation } = require('./test-data/handlers');



express()
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))

    // endpoints

    .get("/", (req, res) => {
        res.redirect("/seat-select")
    })

    .get("/seat-select/:flightNum", checkReservation)

    .post("/confirmed", confirmSeat)


    // .use((req, res) => res.send('Not Found'))

    .get("/getConfirmation", sendConfirmation)

    .get("/view-reservation/:email", confirmReservation)
    .get("/showReservation", showReservation)




    .listen(PORT, () => console.log(`Listening on port ${PORT}`));