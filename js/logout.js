// Get a reference to the button element
const button = document.getElementById("logout");

// Add event listener for click event
button.addEventListener("click", function (event) {
  fetch("https://praecox.future-developers.cloud/api/logoutPatient", {
    method: "POST",
   //  body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Accept": "application/json",
      'AUTHORIZATION': 'Bearer ' + localStorage.getItem('patientToken')
    },
  }).then(async (response) => {
    // console.log(response.json());
    var body = await response.json();
    console.log(body);

    switch (response.status) {
      case 200:
        console.log("Succsesful");
        location.href = "./login.html";
        // location.href="./ResponsibleRegister.html"
        break;

      case 400:
        alert(body.massage);
        break;

      case 422:
        console.log(body);
    }
  });
});

// function logoutPatient() {}
