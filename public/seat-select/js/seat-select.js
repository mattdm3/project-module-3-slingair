const flightInput = document.getElementById("flight-list");
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');

const flightSelectRow = document.querySelector(".flight-select");
let warning = document.createElement("h1");
warning.innerText += "Wrong flight number"
warning.style.display = "none";
let flightListDrop = document.getElementById("flight-list")


if (flightSelectRow) {
    flightSelectRow.appendChild(warning);
}



let userData = {};



let selection = '';


//GET FLIGHT LIST FOR DROPDOWN

fetch("https://journeyedu.herokuapp.com/slingair/flights", {
    "method": "GET",
    "headers": {}
})
    .then(res => res.json())
    .then(flightsArray => {
        console.log(flightsArray);

        flightsArray.flights.forEach(flightNumber => {

            const dropdown = document.createElement("option");
            flightListDrop.appendChild(dropdown);

            const availableFlights = `<option name="${flightNumber}">${flightNumber}</option>`

            dropdown.innerHTML = availableFlights;

        })

    })
    .catch(err => {
        console.log(err);
    });

// RENDERS LIST OF SEATS

const renderSeats = (responseBody) => {

    let unavailableSeats = [];

    // CHECKS available seating based on response body. 

    responseBody.forEach(seat => {
        if (seat.isAvailable === false) {
            unavailableSeats.push(seat.id);
        }
    })

    // console.log(unavailableSeats);



    document.querySelector('.form-container').style.display = 'block';

    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
        seatsDiv.appendChild(row);
        for (let s = 1; s < 7; s++) {
            const seatNumber = `${r}${alpha[s - 1]}`;
            const seat = document.createElement('li');

            const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;

            const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;

            seat.innerHTML = seatAvailable;
            row.appendChild(seat);

            unavailableSeats.forEach(notAvSeatId => {
                if (notAvSeatId === seatNumber) {
                    document.getElementById(seatNumber).innerHTML = seatOccupied;
                }
            })
        }


    }

    // availableSeats.forEach(seatId => {
    //     if ()
    // })

    let seatMap = document.forms['seats'].elements['seat'];
    seatMap.forEach(seat => {
        seat.onclick = () => {
            selection = seat.value;
            seatMap.forEach(x => {
                if (x.value !== seat.value) {
                    document.getElementById(x.value).classList.remove('selected');
                }
            })
            document.getElementById(seat.value).classList.add('selected');
            document.getElementById('seat-number').innerText = `(${selection})`;
            confirmButton.disabled = false;
        }
    });
}

// RENDERS THE FORM AND THE SEATS 

const toggleFormContent = () => {

    event.preventDefault();
    console.log(flightListDrop.value);

    if (document.querySelector('.form-container').style.display === 'block') {
        document.getElementById('seats-section').innerHTML = "";
    }
    let flightNumber = flightListDrop.value;

    fetch(`/seat-select/${flightNumber}`
    )
        .then(res => res.json())
        .then(body => {
            renderSeats(body);
        })

}

// TO HANDLE THE CONFRMATION 
const handleConfirmSeat = () => {

    event.preventDefault();
    console.log(event);

    const userInfo = {
        id: Math.floor(Math.random() * 1000),
        givenName: document.getElementById("givenName").value,
        surname: document.getElementById("surname").value,
        email: document.getElementById("email").value,
        seat: document.getElementById("seat-number").innerText.slice(1, 3),
        flight: flightInput.value
    }

    console.log("this is the userInfo " + userInfo);

    fetch('/confirmed', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    })
        .then(() => {
            userData = userInfo;
            console.log(userData);
            window.location.href = `/seat-select/confirmed.html`;
        })

}


// VIEW RES BY EMAIL


const checkReservation = () => {
    event.preventDefault();
    const emailVal = document.getElementById("resInput").value;

    // NEW

    fetch(`/view-reservation/${emailVal}`)
        .then(() => {
            window.location.href = `/seat-select/view-reservation.html`;
        })
    // END OF NEW

    // OLD (JUST FE REQ)

    // fetch(`https://journeyedu.herokuapp.com/slingair/users/${emailVal}`, {
    //     "method": "GET",
    //     "headers": {}
    // })
    //     .then(res => res.json())
    //     .then(response => {

    //         if (response.status === 400) {
    //             document.getElementById("resLabel").innerText = "No Email On File, try again.";
    //         }
    //         else if (response.status === 200) {

    //             window.location.href = "/seat-select/view-reservation.html";

    //             viewResData = response.data;

    //             // NOW YOU WOULD GO TO A VIEW RES PAGE. 
    //             console.log(viewResData);


    //         }

    //     })



}



// flightInput.addEventListener('blur', toggleFormContent);