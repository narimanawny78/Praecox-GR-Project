// validation

var data = {};


var formlogin = document.querySelector("#form-login");
formlogin.addEventListener('submit',(event)=>{

   var valid = validate();
   if(valid){
    RegisterDoctor() ;
   }

   event.preventDefault()


})


function validate(){

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var degree = document.getElementById("degree").value;
    var message = document.getElementById("error");

    data = {
      name ,
      email ,
      password,
      phone,
      address,
      degree ,
     
    }


    message.style.color = "red";
    message.style.textAlign = "center";
   //  message.style.backgroundColor = "red";
    message.style.padding = "10px";
    message.style.transition = "all 1s ease";
    message.style.marginBottom = "10px";
    message.style.marginTop = "10px";

    if(name=="" && email=="" && password=="" && phone=="" && address==""  && degree=="" ){
        message.innerHTML = "Please Enter Data";
        return false;
     }else if (email.indexOf("@")=="-1"){
        message.innerHTML = "Plaese Enter Valid E-mail";
        return false;
     }else if (password.length <8){
        message.innerHTML = "Plaese Enter At Least 8 Character";
        return false;
     }else if (phone.length != 11){
        message.innerHTML = "Phone number should be 11 number"
        return false;
     }else{
        return true;
     }

}

// api
// async function loginPatient() {
// 	try {
// 	  const response = await fetch('https://praecox.future-developers.cloud/api/registerDoctor', {
// 		method: 'POST',
// 		body: JSON.stringify(data),
// 		headers: {
// 		  'Content-type': 'application/json; charset=UTF-8',
// 		},
// 	  }).then(response => response.json()).then(data=>{

//       var token = data.token;
//       localStorage.setItem('patientToken',token)
//       location.href="./Doctor.html"

//      });
  
// 	} catch (error) {
// 	  if (error instanceof SyntaxError) {
// 		console.error('Error: Invalid JSON response');
// 	  } else {
// 		console.error(error);
// 	  }
// 	}
//   }

function RegisterDoctor() {
	 
  fetch('https://praecox.future-developers.cloud/api/registerDoctor', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
 }).then(async (response) => {
         // console.log(response.json());
      var body = await response.json();
      console.log(body);

      switch (response.status){
        case 200 :
           console.log('Succsesful');
           var token = body.token;
           localStorage.setItem('doctorToken',token)
           location.href="./DoctorProfile.html"
           // location.href="./ResponsibleRegister.html"
        break;

        case 400 :
           alert(body.massage)
        break;

        case 422 :
           console.log(body)
      }
 })
}
