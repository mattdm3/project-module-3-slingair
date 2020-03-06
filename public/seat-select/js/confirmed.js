
let confInfo = [];


// THIS IS FOR THE CONFIRMATION PAGE

fetch('/getConfirmation')
    .then(res => res.json())
    .then(data => {
        confInfo.push(data);
        console.log(confInfo);
        document.getElementById("flight").innerText = confInfo[0].flight;
        document.getElementById("seat").innerText = confInfo[0].seat;
        document.getElementById("name").innerText = confInfo[0].givenName + " " + confInfo[0].surname;
        document.getElementById("email").innerText = confInfo[0].email;
    })










