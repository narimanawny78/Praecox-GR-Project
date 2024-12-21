// validation
const inputs = document.querySelectorAll(".input");

var data = {};


var formlogin = document.querySelector("#form-login");
formlogin.addEventListener('submit',(event)=>{

   var valid = validate();
   if(valid){
    RegisterRESPO() ;
   }
   event.preventDefault()

})


function validate(){

    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var ssn = document.getElementById("ssn").value;
    var message = document.getElementById("error");

    data = {
      name ,
      phone,
      ssn,
     
    }


    message.style.color = "red";
    message.style.textAlign = "center";
   //  message.style.backgroundColor = "red";
    message.style.padding = "10px";
    message.style.transition = "all 1s ease";
    message.style.marginBottom = "10px";
    message.style.marginTop = "10px";

    if(name=="" && phone=="" && ssn==""){
      message.innerHTML = "Please Enter Data";
      return false;
   }else if (phone.length != 11){
      message.innerHTML = "Phone number should be 11 number"
      return false;
   }else if (ssn.length != 14){
      message.innerHTML = "ssn number should be 14 number"
      return false;
   }else{
      return true;
   }



}



function RegisterRESPO() {
   fetch('https://praecox.future-developers.cloud/api/Responsible/', {
     method: 'POST',
     body: JSON.stringify(data),
     headers: {
       'Content-type': 'application/json; charset=UTF-8',
     },
   })
   .then(async (response) => {
     // Check for successful HTTP status code (usually 200)
     if (!response.ok) {
       throw new Error(`API request failed with status: ${response.status}`);
     }
     // Parse the JSON response
     return await response.json();
   })
   .then((body) => {
     console.log(body);
     switch (body.status) {
       case 200:
         console.log('Successful');
         // var token = body.data.token;
         localStorage.setItem('patientToken', token);
         // location.href="./RespoRegistration.html"
         // You can redirect to a success page here (optional)
         break;
       case 400:
         alert(body.message);
         break;
       case 422:
         console.log(body);
         break;
       default:
         console.warn(`Unhandled status code: ${body.status}`);
     }
   })
   // .catch((error) => {
   //   console.error('Error:', error);
   //   // Handle any errors during the API call or parsing
   // });
 }
 