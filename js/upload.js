const form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");

// form click event
form.addEventListener("click", () =>{
  fileInput.click();
});


// Medical Api

function uploadPhoto() {
  const fileInput = document.getElementById('fileInput');
  const notesInput = document.getElementById('medical_history');

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    // Use the file object for further processing or upload
    console.log(file);
  });

  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    const notes = notesInput.value;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('medical_history', notes);

    fetch('https://praecox.future-developers.cloud/api/Patient/store', {
      method: 'POST',
      headers: {
        // "Content-type": "multipart/form-data;",
        Accept: "application/json",
        AUTHORIZATION: "Bearer " + localStorage.getItem("patientToken"),
      },
      body: formData,
    })
      .then(async (response) => {
        const body = await response.json();
        console.log(body);

        switch (response.status) {
          case 200:
            console.log('Successful');
            // Handle successful response
            location.href="./Paient.html"
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
  });
}
uploadPhoto();

