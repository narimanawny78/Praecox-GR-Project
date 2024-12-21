



function profilePatient() {
  fetch('https://praecox.future-developers.cloud/api/AccountPatient/show', {
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

        document.querySelector(".name").value = body.data.name;
        document.querySelector(".email").value = body.data.email;
        document.querySelector(".date").value = body.data.date;
        document.querySelector(".age").value = body.data.age;
        document.querySelector(".gender").value = body.data.Gender;
        document.querySelector(".phone").value = body.data.phone;
        document.querySelector(".address").value = body.data.address;
        document.querySelector(".ssn").value = body.data.ssn;

        break;

      case 400:
        alert(body.message);
        break;

      case 422:
        console.log(body);
    }
  })
}
profilePatient();

// Function to enable editing
function enableEditing() {
  var inputs = document.querySelectorAll('.data input');
  inputs.forEach((input) => {
    input.removeAttribute('readonly');
  });

  document.getElementById('paientupdate').style.display = "none";
  document.getElementById('paientsave').style.display = "block";
  document.getElementById('paientcancel').style.display = "block";
}

// Function to disable editing
function disableEditing() {
  var inputs = document.querySelectorAll('.data input');
  inputs.forEach((input) => {
    input.setAttribute('readonly', true);
  });

  document.getElementById('paientupdate').style.display = "block";
  document.getElementById('paientsave').style.display = "none";
  document.getElementById('paientcancel').style.display = "none";
}

// Update button click event handler
const updateButton = document.getElementById("paientupdate");
updateButton.addEventListener("click", enableEditing);

// Cancel button click event handler
const cancelButton = document.getElementById("paientcancel");
cancelButton.addEventListener("click", disableEditing);

// Save button click event handler
const saveButton = document.getElementById("paientsave");
saveButton.addEventListener("click", function (event) {
  // Disable editing
  disableEditing();

  // Call the updatePatient function
  updatePatient();
});

function updatePatient() {
  // Get the updated data from the input fields
  var updatedData = {
    name: document.querySelector(".data .name").value,
    email: document.querySelector(".data .email").value,
    date: document.querySelector(".data .date").value,
    age: document.querySelector(".data .age").value,
    gender: document.querySelector(".data .gender").value,
    phone: document.querySelector(".data .phone").value,
    address: document.querySelector(".data .address").value,
    ssn: document.querySelector(".data .ssn").value
  };

  // Validate if all required fields are filled
  var requiredFields = ["name", "email", "date", "age", "gender", "phone", "address", "ssn"];
  var missingFields = requiredFields.filter(function(field) {
    return !updatedData[field];
  });

  if (missingFields.length > 0) {
    alert("Please fill in all required fields: " + missingFields.join(", "));
    return;
  }

  // Make an API call to update the patient data
  fetch("https://praecox.future-developers.cloud/api/AccountPatient/update", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
      AUTHORIZATION: "Bearer " + localStorage.getItem("patientToken")
    },
    // Include the updated data in the request body
    body: JSON.stringify(updatedData)
  })
    .then(async (response) => {
      var body = await response.json();
      console.log(body);

      switch (response.status) {
        case 200:
          console.log("Update successful");
          // Update the HTML elements with the modified data
          document.querySelector(".data .name").value = body.data.name;
          document.querySelector(".data .email").value = body.data.email;
          document.querySelector(".data .date").value = body.data.date;
          document.querySelector(".data .age").value = body.data.age;
          document.querySelector(".data .gender").value = body.data.gender;
          document.querySelector(".data .phone").value = body.data.phone;
          document.querySelector(".data .address").value = body.data.address;
          document.querySelector(".data .ssn").value = body.data.ssn;

          // Disable editing of the input fields
          document.querySelectorAll(".data input").forEach(function(input) {
            input.setAttribute("disabled", true);
          });

          break;

        case 400:
          if (body && body.errors) {
            var errorMessages = Object.values(body.errors).flat();
            alert("Update failed. Error: " + errorMessages.join(", "));
          } else {
            alert("Update failed. Please try again later.");
          }
          break;

        case 422:
          console.log(body);
          break;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Perform error handling or display error message
    });
}

const button2 = document.getElementById("paientdelete");
button2.addEventListener("click", function(event) {
  const confirmation = window.confirm("Are you sure you want to delete your profile data?");

  if (confirmation) {
    fetch('https://praecox.future-developers.cloud/api/AccountPatient/delete', {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        AUTHORIZATION: "Bearer " + localStorage.getItem("patientToken"),
      },
    })
    .then(async (response) => {
      var body = await response.json();
      console.log(body);

      if (response.status === 200) {
        console.log("Deletion successful");
        // Redirect to registration page after confirmed deletion
        location.href = "./patientregister.html";
      } else {
        alert(body.message); // Show error message on failure
      }
    })
    .catch(error => {
      console.error("Error deleting data:", error);
      alert("An error occurred while deleting data. Please try again.");
    });
  }
});
