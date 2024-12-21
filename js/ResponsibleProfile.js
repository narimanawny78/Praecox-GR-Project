
function profileResponsible() {
  fetch('https://praecox.future-developers.cloud/api/Responsible/', {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
      AUTHORIZATION: "Bearer " + localStorage.getItem("patientToken"),
    },
  }).then(async (response) => {
    var body = await response.json();
    console.log(body);
    console.log(localStorage.getItem("patientToken"))

    switch (response.status) {
      case 200:
        console.log("Successful");

        document.querySelector(".name").value = body.data[0].name;
        document.querySelector(".phone").value = body.data[0].phone;
        document.querySelector(".ssn").value = body.data[0].ssn;

        break;

      case 400:
        alert(body.message);
        break;

      case 422:
        console.log(body);
    }
  })
}
profileResponsible();
