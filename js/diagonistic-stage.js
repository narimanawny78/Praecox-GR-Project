
function showDiagonstic() {
  fetch('https://praecox.future-developers.cloud/api/Diagnostic/show', {
  method: "GET",
  // body: JSON.stringify(data),
  // Add the diagnosticId to the URL as a query parameter
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
      AUTHORIZATION: "Bearer " + localStorage.getItem("patientToken"),
    },
  }).then(async (response) => {
    var body = await response.json();
    console.log(body);
  
    switch (response.status) {
      case 200:
        console.log("Succsesful");
  
  
   // Assuming you want to display the first image from the response
  // Assuming you want to display the first image from the response
  const imagePath = body.data[0].image;
  
  document.querySelector(".medical-results .image").src = imagePath;
  console.log(imagePath);
  const imageElement = document.querySelector(".medical-results .image");
  const imageURL = 'https://praecox.future-developers.cloud/' + imagePath;
  imageElement.src = imageURL;
  console.log(imageURL);
  document.querySelector(".medical-results .Date_Diagnosis").textContent = body.data[0].Date_Diagnosis;
  document.querySelector(".medical-results .Diagnostic_stage").textContent = body.data[0].Diagnostic_stage;
  document.querySelector(".medical-results .Description_Diagnosis").textContent = body.data[0].Description_Diagnosis;
       break;
  
      case 400:
        alert(body.massage);
        break;
  
      case 422:
        console.log(body);
    }
  })
  }
  
  showDiagonstic();
