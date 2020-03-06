const resFlight = document.getElementById("res-flight");
const resName = document.getElementById("res-name");
const resEmail = document.getElementById("res-email");
const resSeat = document.getElementById("res-seat");
const resId = document.getElementById("res-id");

const viewResData = {};

// THIS IS FOR THE CONFIRMATION PAGE

fetch('/showReservation')
    .then(res => res.json())
    .then(info => {
        viewResData.data = info;
        console.log(viewResData);


        resFlight.innerText = viewResData.data.body.flight;
        resName.innerText = viewResData.data.body.givenName + " " + viewResData.data.body.surname;
        resEmail.innerText = viewResData.data.body.email;
        resSeat.innerText = viewResData.data.body.seat;
        resId.innerText = viewResData.data.body.id;

    })

