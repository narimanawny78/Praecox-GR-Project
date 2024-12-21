

function displayMedicalHistory() {
  const imageElement = document.querySelector('.image2');
  const medicalHistoryElement = document.querySelector('.medical_history');

  fetch('https://praecox.future-developers.cloud/api/Patient/show', {
    method: 'GET',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("patientToken"),
    },
  })
    .then(async (response) => {
      const body = await response.json();
      console.log(body);

      switch (response.status) {
        case 200:
          console.log('Successful');
          const medicalHistoryData = body.data[0]; // Assuming the first element is displayed
          

          const imageURL = `https://praecox.future-developers.cloud${medicalHistoryData.file}`;
          const medicalHistoryId = medicalHistoryData.id; // Capture the ID for deletion

          imageElement.src = imageURL;
          medicalHistoryElement.innerHTML = medicalHistoryData.medical_history;
          document.querySelector(".medical_history").value = medicalHistoryData.medical_history;

          // Assuming the ID is stored in a data attribute on the container element
          document.querySelector('.medicalhistory-results').dataset.id = medicalHistoryId;
          // location.href="./Paient.html"

          break;
        case 400:
          alert(body.message);
          break;
        case 422:
          console.log(body);
          break;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

displayMedicalHistory();


const button3 = document.getElementById("medicaldelete");

// Function to delete patient data
button3.addEventListener("click", async function (event) {
  event.preventDefault();

  // Assuming the ID is stored in the data attribute
  const dataId = document.querySelector('.medicalhistory-results').dataset.id;

  try {
    const response = await fetch('https://praecox.future-developers.cloud/api/Patient/destroy/' + dataId, {
      method: "POST", // Assuming POST is still the correct method
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("patientToken"),
      },
    });

    const body = await response.json();
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
      default:
        console.error("Unexpected error:", response.status);
        // Handle other potential error codes here
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle errors that might occur during the fetch operation
    alert("An error occurred while deleting the data. Please try again.");
  }
});

const updateButton2 = document.querySelector('.medicalupdate');
const saveButton2 = document.querySelector('.save2');
const cancelButton2 = document.querySelector('.cancel2');
const medicalHistoryInput = document.querySelector('.medical_history');

// Function to handle the update operation
const updateMedicalHistory = async () => {
  // Make the input field editable
  medicalHistoryInput.removeAttribute('readonly');

  // Display the save and cancel buttons
  saveButton2.style.display = 'inline-block';
  cancelButton2.style.display = 'inline-block';
};

// Function to handle the cancel operation
const cancelUpdate = () => {
  // Reset the input field to readonly
  medicalHistoryInput.setAttribute('readonly', true);

  // Hide the save and cancel buttons
  saveButton2.style.display = 'none';
  cancelButton2.style.display = 'none';
};

// Function to handle the save operation
const saveMedicalHistory = async () => {
  try {
    // Get the updated medical history value
    const updatedMedicalHistory = medicalHistoryInput.value;

    // Fetch request to update the medical history
    const response = await fetch('https://praecox.future-developers.cloud/api/Patient/update/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('patientToken'),
      },
      body: JSON.stringify({
        medical_history: updatedMedicalHistory,
      }),
    });

    if (response.ok) {
      // Update successful, update UI or perform any other necessary actions
      console.log('Medical history updated successfully');
      // Make the input field readonly again
      medicalHistoryInput.setAttribute('readonly', true);
      // Hide the save and cancel buttons
      saveButton2.style.display = 'none';
      cancelButton2.style.display = 'none';
    } else {
      // Handle update error response
      console.error('Update request failed');
    }
  } catch (error) {
    console.error(error);
  }
};

// Add event listener for the update button
updateButton2.addEventListener('click', updateMedicalHistory);

// Add event listener for the cancel button
cancelButton2.addEventListener('click', cancelUpdate);

// Add event listener for the save button
saveButton2.addEventListener('click', saveMedicalHistory);



