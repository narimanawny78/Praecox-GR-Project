
const form = document.querySelector(".fa-cloud-upload-alt"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");


// form click event
form.addEventListener("click", () =>{
  fileInput.click();
});


//api


const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const uploadedRmi = fileInput.files[0];
 console.log(uploadedRmi);

  if(!uploadedRmi){
    alert('Please select an RMI file to upload');
    return;
  }

  const formData = new FormData();
  formData.append('image', uploadedRmi);

  // Assuming you have a function to handle file conversion (if necessary)
  // This function should convert the uploaded file to base64 or another format
  // your AI API expects for the 'rmiImage' property.
  
    fetch('https://praecox.future-developers.cloud/api/Diagnostic/store', {
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data;",
        Accept: "application/json",
        AUTHORIZATION: "Bearer " + localStorage.getItem("patientToken"),
      },
      body: formData
    })
    .then(async (response) => {
      var body = await response.json();
      console.log(body);

      switch (response.status) {
        case 200:
          console.log("Successful recommendation");

          break;

        case 400:
          alert(body.message);
          break;

        default:
          console.error("Unexpected response status:", response.status);
      }
    })
    .catch((error) => {
      console.error("Error fetching recommended plan:", error);
    });
  
});

