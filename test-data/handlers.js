const request = require('request-promise');


const { flights } = require('./flightSeating');

const { reservations } = require('./reservations');

// THIS WILL CHECK THE SEATING AVAILABLE USING THE FLIGHT SEATING 

// LOCAL CHECK 
// const checkReservation = (req, res) => {

//     const responseArray = []

//     flightNumber = req.params.flightNum.toUpperCase();

//     if (flights[flightNumber]) {

//         let seatingInfo = (flights[flightNumber])
//         responseArray.push(seatingInfo);
//         let stringifyArray = JSON.stringify(responseArray);
//         res.send(stringifyArray);
//     }

//     else {
//         responseObject = {};
//         responseObject.status = "error";
//         res.send(responseObject);
//     }

// }

// PUBLIC API CHECK 

const checkReservation = (req, res) => {

    const flightDataArray = []

    flightNumber = req.params.flightNum.toUpperCase();

    const makeRequest = async () => {

        try {

            let flightData = await request({
                uri: `https://journeyedu.herokuapp.com/slingair/flights/${flightNumber}`,
                method: "GET",
                headers: {
                    'Accept': 'application/json'
                }
            })

            let parsedFlightData = JSON.parse(flightData);
            return parsedFlightData[flightNumber];
        }
        catch (err) { console.log(err) }


    }

    makeRequest().then(data => {
        // console.log(data);
        res.send(data)
    });





    // if (flightDataArray[flightNumber]) {

    //     let seatingInfo = (flightDataArray[flightNumber])
    //     responseArray.push(seatingInfo);
    //     let stringifyArray = JSON.stringify(responseArray);
    //     res.send(stringifyArray);
    // }

    // else {
    //     responseObject = {};
    //     responseObject.status = "error";
    //     res.send(responseObject);
    // }

}



// LOCAL VERSION


// const confirmSeat = (req, res) => {

//     // const { id, firstName, lastName, email, selectedSeat, flightNumber } = req.body;
//     reservations.push(req.body);
//     res.redirect("/seat-select/confirmed")
//     // res.json({ status: "success", body: req.body })

// }


// PUBLIC VERSION 
const confirmSeat = (req, res) => {

    const { givenName, surname, email, seat, flight } = req.body;

    // success! ATTEMPT 

    let options = {
        method: 'POST',
        url: 'https://journeyedu.herokuapp.com/slingair/users',
        headers: {
            'content-type': 'application/json'
        },
        body: {
            // id: id,
            givenName: givenName,
            surname: surname,
            email: email,
            seat: seat,
            flight: flight.toUpperCase()
        },
        json: true // Automatically stringifies the body to JSON

    };

    request(options)
        .then(function (parsedBody) {
            // POST succeeded...
            // console.log(parsedBody);
            // res.send(parsedBody);
            console.log(parsedBody);
            reservations.push(parsedBody.reservation);
            res.redirect("/seat-select/confirmed")

        })
        .catch(function (err) {
            // POST failed...
            console.log(err)
        });


}


const sendConfirmation = (req, res) => {

    // let confArray = [];

    // let stringData = JSON.stringify(reservations)
    // confArray.push(stringData)
    // console.log(confArray);
    // res.send(confArray);

    let lastRes = reservations[reservations.length - 1];

    res.send(JSON.stringify(lastRes));

}

let reservation = {};
const confirmReservation = (req, res) => {
    const email = req.params.email;

    let options = {
        method: 'GET',
        url: `https://journeyedu.herokuapp.com/slingair/users/${email}`
    };

    request(options, function (error, res, body) {
        if (error) throw new Error(error);


        let jsonData = JSON.parse(body);
        reservation.body = jsonData.data;

    });
    res.redirect("/seat-select/view-reservation")
}

const showReservation = (req, res) => {

    res.send(reservation)


}

module.exports = { checkReservation, confirmSeat, sendConfirmation, confirmReservation, showReservation };