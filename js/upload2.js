
const fileInput = document.querySelector("#file");
const imgArea = document.querySelector(".img-area");
const selectBtn = document.querySelector(".select-image");
const submitBtn = document.querySelector(".submit-image");

// Select Image button click event
selectBtn.addEventListener("click", () => {
  fileInput.click();
});

// File input change event
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    const fileSize = ((file.size / 1024) / 1024).toFixed(2); // in MB
    if (fileSize <= 2) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imgArea.style.backgroundImage = `url(${e.target.result})`;
        imgArea.setAttribute("data-img", e.target.result);
        console.log("data-img attribute set:", e.target.result); // Added console.log
        submitBtn.hidden = false;
        document.querySelector(".img-area .icon").style.display="none";
        document.querySelector("h3").style.display="none";
        document.querySelector("p").style.display="none";
      };
      reader.readAsDataURL(file);
    } else {
      alert("Image size must be less than 2MB");
      fileInput.value = "";
      imgArea.style.backgroundImage = "";
      imgArea.setAttribute("data-img", "");
      console.log("data-img attribute cleared"); // Added console.log
      submitBtn.hidden = true;
    }
  }
});

// Submit Image button click event
submitBtn.addEventListener("click", () => {
  const imageData = imgArea.getAttribute("data-img");
  if (!imageData) {
    alert("Please select an image to upload");
    return;
  }

  const formData = new FormData();
  formData.append("image", dataURItoBlob(imageData));

  // Your API code here
  fetch("https://praecox.future-developers.cloud/api/Diagnostic/store", {
    method: "POST",
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
          console.log("Successful recommendation");
          location.href="./medicalhistory.html"
          // Pass the photo identifier to the showDiagnostic function
          // showDiagnostic(body.photo_id);
          
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

// Helper function to convert data URI to Blob
function dataURItoBlob(dataURI) {
  const arr = dataURI.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}


