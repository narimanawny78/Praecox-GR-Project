
// Function to delete medical history
const deleteMedicalHistory = async (medicalHistoryId) => {
  try {
    const response = await fetch(`https://praecox.future-developers.cloud/api/Doctor/destroy/${medicalHistoryId}/1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
      },
    });

    const body = await response.json();
    console.log(body);

    switch (response.status) {
      case 200:
        console.log('Deletion successful');
        // Clear the HTML elements or perform any other necessary actions
        break;
      case 400:
        alert(body.message);
        break;
      case 422:
        console.log(body);
        break;
      default:
        console.error('Unexpected error:', response.status);
        // Handle other potential error codes here
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle errors that might occur during the fetch operation
    alert('An error occurred while deleting the data. Please try again.');
  }
};

// Function to update medical history
const updateMedicalHistory = async (medicalHistoryId, updatedMedicalHistory) => {
  try {
    const response = await fetch(`https://praecox.future-developers.cloud/api/Doctor/update/${medicalHistoryId}/1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
      },
      body: JSON.stringify({ medical_history: updatedMedicalHistory }),
    });

    const body = await response.json();
    console.log(body);

    switch (response.status) {
      case 200:
        console.log('Update successful');
        // Update the displayed medical history (optional)
        break;
      case 400:
        alert(body.message);
        break;
      case 422:
        console.log(body);
        break;
      default:
        console.error('Unexpected error:', response.status);
        // Handle other potential error codes here
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while updating the data. Please try again.');
  }
};

// Function to display medical history
function displayMedicalHistory() {
  const medicalHistoryId = document.querySelector('#medicalHistoryIdInput').value;

  fetch(`https://praecox.future-developers.cloud/api/Doctor/show/${medicalHistoryId}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
    },
  })
    .then(async (response) => {
      const body = await response.json();
      console.log(body);

      switch (response.status) {
        case 200:
          console.log('Successful');
          const medicalHistoryData = body.data[0];

          const imageElement = document.querySelector('.medical-history-image');
          const imageURL = `https://praecox.future-developers.cloud${medicalHistoryData.file}`;

          imageElement.src = imageURL;
          document.querySelector('.medical_history').value = medicalHistoryData.medical_history;

          // Call the function to fetch and display diagnostic information
          showDiagnostic(medicalHistoryId);

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

function showDiagnostic(medicalHistoryId) {
  fetch(`https://praecox.future-developers.cloud/api/Diagnostic/Doctor/show/${medicalHistoryId}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
    },
  })
    .then(async (response) => {
      const body = await response.json();
      console.log(body);

      switch (response.status) {
        case 200:
          console.log('Successful');
          const diagnosticData = body.data[0];

          const imageElement = document.querySelector('.diagnostic-image');
          const imagePath = diagnosticData.image;
          const imageURL = 'https://praecox.future-developers.cloud/' + imagePath;

          imageElement.src = imageURL;

          document.querySelector('.medical-results .Date_Diagnosis').textContent = diagnosticData.Date_Diagnosis;
          document.querySelector('.medical-results .Diagnostic_stage').textContent = diagnosticData.Diagnostic_stage;
          document.querySelector('.medical-results .Description_Diagnosis').textContent = diagnosticData.Description_Diagnosis;
//           Please note that the code provided above is just a partial example, 
//           and it assumes the existence of certain HTML elements and a functioning API. 
//           You may need to adapt the code to your specific use case and make sure you have 
//           the necessary HTML elements and API endpoints in place.

// Also, please keep in mind that this code does not include any form of input validation or error handling.
//  It is important to validate user input and handle potential errors appropriately in a production environment.

         break;
          case 400:
            alert(body.message);
            break;
          case 422:
            console.log(body);
            break;
        }
      });
  }

  // Call the function to display medical history when the button is clicked
  document.querySelector('#displayHistoryButton').addEventListener('click', displayMedicalHistory);