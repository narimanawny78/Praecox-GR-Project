
function profile() {
  fetch('https://praecox.future-developers.cloud/api/AccountDoctor/show', {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
      AUTHORIZATION: "Bearer " + localStorage.getItem("doctorToken"),
    },
  }).then(async (response) => {
    var body = await response.json();
    console.log(body);
    console.log(localStorage.getItem("doctorToken"))

    switch (response.status) {
      case 200:
        console.log("Successful");

        document.querySelector(".name").value = body.data.name;
        document.querySelector(".email").value = body.data.email;
        document.querySelector(".degree").value = body.data.degree;
        document.querySelector(".phone").value = body.data.phone;
        document.querySelector(".address").value = body.data.address;

        break;

      case 400:
        alert(body.message);
        break;

      case 422:
        console.log(body);
    }
  })
}
profile();



// Function to enable editing
function enableEditing() {
  var inputs = document.querySelectorAll('.data input');
  console.log(inputs);
  inputs.forEach((input) => {
    input.removeAttribute('readonly');
  });

  document.getElementById('doctorupdate').style.display = "none";
  document.getElementById('doctorsave').style.display = "block";
}

// Function to disable editing
function disableEditing() {
  var inputs = document.querySelectorAll('.data input');
  console.log(inputs);
  inputs.forEach((input) => {
    input.setAttribute('readonly', true);
  });

  document.getElementById('doctorupdate').style.display = "block";
  document.getElementById('doctorsave').style.display = "none";
}

// Update button click event handler
const updateButton = document.getElementById("doctorupdate");
updateButton.addEventListener("click", enableEditing);

// Cancel button click event handler
const cancelButton = document.getElementById("doctorcancel");
cancelButton.addEventListener("click", disableEditing);

// Save button click event handler
const saveButton = document.getElementById("doctorsave");
saveButton.addEventListener("click", function (event) {
  // Disable editing
  disableEditing();

  // Make an API call to update the patient data
  fetch('https://praecox.future-developers.cloud/api/AccountDoctor/update', {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Accept": "application/json",
      'AUTHORIZATION': "Bearer " + localStorage.getItem("doctorToken"),
    },
    // Include the updated data in the request body
    body: JSON.stringify({
      // Include the updated values here
    }),
  }).then(async (response) => {
    var body = await response.json();
    console.log(body);

    switch (response.status) {
      case 200:
        console.log("Update successful");
        // Update the HTML elements with the modified data
        // Example:
        // document.querySelector(".data .name").innerHTML = body.data.name;

        document.querySelector(".data .name").innerHTML = body.data.name;
        document.querySelector(".data .email").innerHTML = body.data.email;
        document.querySelector(".data .degree").innerHTML = body.data.degree;
        document.querySelector(".data .phone").innerHTML = body.data.phone;
        document.querySelector(".data .address").innerHTML = body.data.address;

        break;

      case 400:
        alert(body.message);
        break;

      case 422:
        console.log(body);
        break;
    }
  });
});

// delete
const button2 = document.getElementById("doctordelete");
// Function to delete patient data
button2.addEventListener("click", function(event) {
  // Make an API call to delete the patient data
  fetch('https://praecox.future-developers.cloud/api/AccountDoctor/delete', {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
      AUTHORIZATION: "Bearer " + localStorage.getItem("doctorToken"),
    },
  }).then(async (response) => {
    var body = await response.json();
    console.log(body);

    switch (response.status) {
      case 200:
        console.log("Deletion successful");
        // Clear the HTML elements or redirect to a different page
        break;

      case 400:
        alert(body.message);
        break;

      case 422:
        console.log(body);
        break;
    }
  });
});

function deletePatient(){}
